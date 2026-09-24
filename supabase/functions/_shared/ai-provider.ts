/**
 * Which model provider answers, and with what key (addendum §H).
 *
 * Portable: Web APIs only, no Deno globals, no SDK. Both the environment and
 * the Vault reader are injected, so every branch runs under Jest with no
 * network and no key.
 *
 * WHY THIS EXISTS: there is no Anthropic key and there will not be one. The
 * human has a Google AI Studio key and an NVIDIA NIM key, already in Vault as
 * `aigundem_gemini_api_key` and `aigundem_nvidia_api_key`. The enrichment
 * pipeline does not care which model wrote the three bullets, so the provider
 * became configuration rather than a rewrite: same prompt, same validator, same
 * failure codes, same rows.
 *
 * THE ONE INVARIANT THAT MATTERS: `request-enrichment` and
 * `process-enrichments` must resolve the SAME model string. The summary cache
 * key is `(article_id, content_hash, prompt_version, model)`; if the handler
 * enqueued `gemini-2.5-flash` and the worker wrote `claude-opus-5`, every
 * lookup would miss forever and the client would poll a job that is already
 * done. Both call `resolveAiProvider`, and a test asserts they agree.
 */

import type { SummariseClient, SummariseInput, SummariseOutcome } from './anthropic.ts';
import { DEFAULT_MODEL as ANTHROPIC_DEFAULT_MODEL } from './anthropic-config.ts';
import {
  createGeminiClient,
  GEMINI_DEFAULT_MODEL,
  type GeminiConfig,
} from './providers/gemini.ts';
import {
  createNvidiaClient,
  NVIDIA_DEFAULT_MODEL,
  type NvidiaConfig,
} from './providers/nvidia.ts';
import type { FetchImpl } from './providers/http.ts';
import type { SecretEnv } from './secret.ts';

export type AiProviderName = 'gemini' | 'nvidia' | 'anthropic';

/**
 * Preference order for `auto`, and the order the fallback chain is built in.
 *
 * Gemini first because `gemini-2.5-flash` is the cheapest of the three per
 * article and answered a schema'd call correctly when measured. NVIDIA second
 * because it is OpenAI-compatible. Anthropic last because no key for it exists.
 */
export const PROVIDER_ORDER: readonly AiProviderName[] = ['gemini', 'nvidia', 'anthropic'];

/**
 * More free Gemini capacity behind the same key.
 *
 * Google counts free-tier quota per MODEL per project, and the free
 * `gemini-2.5-flash` quota is about twenty requests a day — measured, not
 * documented: two days running it answered ~20 calls after the reset and then
 * 429'd everything, while ~30 articles a day arrive. Each of these models has a
 * quota of its own, so the chain multiplies the free budget instead of waiting
 * for tomorrow.
 *
 * Measured on 2026-09-24 with the exact request `buildGeminiRequest` sends
 * (response schema + `thinkingBudget: 0`): all three returned valid JSON with
 * Turkish bullets and a Turkish translation. Left out, and why:
 * `gemini-2.5-flash-lite` is closed to new users (404), `gemini-3.5-flash-lite`
 * and the Gemma 4 models reject `thinkingBudget` (400).
 *
 * The job row keeps the primary's model whichever of these answers, so none of
 * them touches the cache key.
 */
export const GEMINI_FALLBACK_MODELS: readonly string[] = [
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
];

export const AI_PROVIDER_ENV = 'AI_PROVIDER';

/** Vault entry names. The values never appear in code, logs or files. */
export const GEMINI_SECRET_NAME = 'aigundem_gemini_api_key';
export const NVIDIA_SECRET_NAME = 'aigundem_nvidia_api_key';

export const GEMINI_KEY_ENV = 'GEMINI_API_KEY';
export const NVIDIA_KEY_ENV = 'NVIDIA_API_KEY';
export const ANTHROPIC_KEY_ENV = 'ANTHROPIC_API_KEY';

export const GEMINI_MODEL_ENV = 'GEMINI_MODEL';
export const NVIDIA_MODEL_ENV = 'NVIDIA_MODEL';
export const ANTHROPIC_MODEL_ENV = 'ANTHROPIC_MODEL';

export const GEMINI_THINKING_BUDGET_ENV = 'GEMINI_THINKING_BUDGET';

/** Reads one allow-listed Vault secret by name; null when absent. */
export type GetSetting = (name: string) => Promise<string | null>;

export type ResolvedAiProvider = {
  provider: AiProviderName;
  /** Goes into the job row and the cache key. */
  model: string;
  client: SummariseClient;
  /** The rest of the chain, in the order it is tried. Absent when there is none. */
  fallbacks?: Array<{ provider: AiProviderName; model: string }>;
};

export type AiProviderResolution = ResolvedAiProvider | { provider: null };

export type ResolveOptions = {
  fetchImpl: FetchImpl;
  timeoutMs?: number;
  now?: () => number;
  /**
   * Anthropic needs its SDK, which cannot be imported here without dragging a
   * npm specifier into a module Jest has to load. The Deno boundary passes a
   * factory; leaving it out simply makes `anthropic` unavailable, which is the
   * correct behaviour everywhere except inside `process-enrichments`.
   */
  createAnthropicClient?: (model: string) => SummariseClient;
};

function readEnv(env: SecretEnv, name: string): string | null {
  const value = (env.get(name) ?? '').trim();
  return value === '' ? null : value;
}

/**
 * Environment first, Vault second — the same precedence `secret.ts` uses.
 *
 * An env var wins because it costs no round trip and is how a deploy pins a
 * key; Vault is where the keys actually live today, because no Edge secret
 * could be set for this project.
 */
async function resolveKey(
  env: SecretEnv,
  getSetting: GetSetting,
  envName: string,
  secretName: string | null,
): Promise<string | null> {
  const fromEnv = readEnv(env, envName);
  if (fromEnv !== null) return fromEnv;
  if (secretName === null) return null;

  try {
    const fromVault = (await getSetting(secretName)) ?? '';
    return fromVault.trim() === '' ? null : fromVault.trim();
  } catch {
    // A Vault hiccup means "no key", never an unhandled rejection that could
    // surface as a different failure.
    return null;
  }
}

function parseProviderName(raw: string | null): AiProviderName | 'auto' {
  if (raw === 'gemini' || raw === 'nvidia' || raw === 'anthropic') return raw;
  return 'auto';
}

function modelFor(env: SecretEnv, provider: AiProviderName): string {
  switch (provider) {
    case 'gemini':
      return readEnv(env, GEMINI_MODEL_ENV) ?? GEMINI_DEFAULT_MODEL;
    case 'nvidia':
      return readEnv(env, NVIDIA_MODEL_ENV) ?? NVIDIA_DEFAULT_MODEL;
    case 'anthropic':
      return readEnv(env, ANTHROPIC_MODEL_ENV) ?? ANTHROPIC_DEFAULT_MODEL;
  }
}

/**
 * `0` disables Gemini's reasoning tokens and is the default: summarising an
 * article into three bullets does not need them, and the coordinator measured
 * flash spending 42 of them per call by default. A negative value means
 * "omit the field", for a model that rejects it.
 */
function thinkingBudgetFor(env: SecretEnv): number | null {
  const raw = readEnv(env, GEMINI_THINKING_BUDGET_ENV);
  if (raw === null) return 0;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) return 0;
  return parsed < 0 ? null : parsed;
}

function buildClient(
  provider: AiProviderName,
  model: string,
  apiKey: string,
  options: ResolveOptions,
  env: SecretEnv,
): SummariseClient | null {
  switch (provider) {
    case 'gemini': {
      const config: GeminiConfig = {
        apiKey,
        model,
        fetchImpl: options.fetchImpl,
        timeoutMs: options.timeoutMs,
        thinkingBudget: thinkingBudgetFor(env),
        now: options.now,
      };
      return createGeminiClient(config);
    }
    case 'nvidia': {
      const config: NvidiaConfig = {
        apiKey,
        model,
        fetchImpl: options.fetchImpl,
        timeoutMs: options.timeoutMs,
        now: options.now,
      };
      return createNvidiaClient(config);
    }
    case 'anthropic':
      return options.createAnthropicClient ? options.createAnthropicClient(model) : null;
  }
}

type Candidate = { provider: AiProviderName; model: string; client: SummariseClient };

/**
 * Resolve the provider that will answer, and the one that covers for it.
 *
 * Returns `{provider: null}` when no key resolves anywhere — the caller turns
 * that into `skipped: 'no_api_key'`, exactly as the Anthropic-only version did.
 */
export async function resolveAiProvider(
  env: SecretEnv,
  getSetting: GetSetting,
  options: ResolveOptions,
): Promise<AiProviderResolution> {
  const requested = parseProviderName(readEnv(env, AI_PROVIDER_ENV));

  // Vault is asked at most once per name per resolution, even when `auto` walks
  // the whole order.
  const cache = new Map<string, Promise<string | null>>();
  const keyFor = (provider: AiProviderName): Promise<string | null> => {
    const cached = cache.get(provider);
    if (cached) return cached;
    const pending =
      provider === 'gemini'
        ? resolveKey(env, getSetting, GEMINI_KEY_ENV, GEMINI_SECRET_NAME)
        : provider === 'nvidia'
          ? resolveKey(env, getSetting, NVIDIA_KEY_ENV, NVIDIA_SECRET_NAME)
          : // Anthropic stays env-only: its key is not in Vault and adding it to
            // the allow-list would widen a read-any-secret surface for nothing.
            resolveKey(env, getSetting, ANTHROPIC_KEY_ENV, null);
    cache.set(provider, pending);
    return pending;
  };

  const candidateFor = async (provider: AiProviderName): Promise<Candidate | null> => {
    const apiKey = await keyFor(provider);
    if (apiKey === null) return null;
    const model = modelFor(env, provider);
    const client = buildClient(provider, model, apiKey, options, env);
    return client === null ? null : { provider, model, client };
  };

  // An explicit choice is honoured exactly: if that provider has no key, the
  // answer is "no provider", not "something else". Silently answering with a
  // different model than the operator asked for would put a model string in the
  // cache key that nobody chose.
  const order: readonly AiProviderName[] =
    requested === 'auto' ? PROVIDER_ORDER : [requested];

  let primary: Candidate | null = null;
  for (const provider of order) {
    primary = await candidateFor(provider);
    if (primary) break;
  }
  if (!primary) return { provider: null };

  // The chain: the primary, the extra Gemini models behind the same key, then
  // every other provider that has a key — whether or not the primary was
  // explicit. Removing a key is how you opt a provider out.
  const chain: Candidate[] = [primary];
  const withGeminiExtras = async (head: Candidate) => {
    if (head.provider !== 'gemini') return;
    const apiKey = await keyFor('gemini');
    if (apiKey === null) return;
    for (const model of GEMINI_FALLBACK_MODELS) {
      if (model === head.model) continue;
      const client = buildClient('gemini', model, apiKey, options, env);
      if (client) chain.push({ provider: 'gemini', model, client });
    }
  };
  await withGeminiExtras(primary);
  for (const provider of PROVIDER_ORDER) {
    if (provider === primary.provider) continue;
    const next = await candidateFor(provider);
    if (!next) continue;
    chain.push(next);
    await withGeminiExtras(next);
  }

  if (chain.length === 1) {
    return { provider: primary.provider, model: primary.model, client: primary.client };
  }

  return {
    provider: primary.provider,
    model: primary.model,
    client: withFallbacks(chain),
    fallbacks: chain.slice(1).map((c) => ({ provider: c.provider, model: c.model })),
  };
}

/** The article is the problem: another model is not asked, the job fails. */
function isContentFailure(outcome: SummariseOutcome): boolean {
  return (
    !outcome.ok &&
    (outcome.code.startsWith('schema_') ||
      outcome.code === 'refusal' ||
      outcome.code === 'no_text_block' ||
      outcome.code === 'unexpected_stop')
  );
}

/**
 * Walk the chain until one link answers.
 *
 * Inside the same job, before backoff: a 429 from Google's free tier is exactly
 * the case where the next link earns its keep, and waiting an hour to discover
 * it would have answered immediately is the wrong trade.
 *
 * A CONTENT failure of the primary (`refusal`, `schema_*`, `no_text_block`,
 * `unexpected_stop`) is final: the article is the problem and a second model
 * produces the same answer — and a second opinion on a safety stop is a policy
 * nobody has chosen. Everything else moves on, including the primary's `auth`,
 * `not_found` and `bad_request`: those describe the provider, not the article,
 * and a retired model is exactly how the NVIDIA fallback died (410, a month,
 * unnoticed).
 *
 * When every link fails, the report decides what happens to the job:
 * - a link failed on content → that failure, so the job ends instead of
 *   circling forever as "busy";
 * - the primary truncated → `output_truncated`, so the retry escalates;
 * - otherwise nobody had capacity → `rate_limited`. The database treats that as
 *   the providers' state, not the article's: no attempt spent, queue paused.
 *
 * Every failed link is logged with its own code. The old wrapper reported only
 * the primary's, which is why nobody saw the fallback answering 410.
 *
 * A success carries the model that answered; the worker logs it as `usedModel`.
 * It is not what lands in the row: the row keeps the job's model so the cache
 * key stays the one `request-enrichment` looks up.
 */
export function withFallbacks(
  chain: readonly Candidate[],
  warn: (line: string) => void = console.warn,
): SummariseClient {
  const [primary, ...rest] = chain;
  const logFailure = (link: Candidate, outcome: SummariseOutcome) => {
    if (outcome.ok) return;
    warn(
      JSON.stringify({
        event: 'provider_failed',
        provider: link.provider,
        model: link.model,
        code: outcome.code,
        ...(outcome.detail ? { detail: outcome.detail } : {}),
      }),
    );
  };

  return {
    async summarise(input: SummariseInput): Promise<SummariseOutcome> {
      const first = await primary.client.summarise(input);
      if (first.ok || isContentFailure(first)) return first;
      logFailure(primary, first);

      let content: SummariseOutcome | null = null;
      for (const link of rest) {
        const outcome = await link.client.summarise(input);
        if (outcome.ok) return outcome;
        logFailure(link, outcome);
        if (content === null && isContentFailure(outcome)) content = outcome;
      }

      if (content !== null) return content;
      if (!first.ok && first.code === 'output_truncated') return first;
      return {
        ok: false,
        code: 'rate_limited',
        retryable: true,
        ...(!first.ok && first.retryAfterSeconds !== undefined
          ? { retryAfterSeconds: first.retryAfterSeconds }
          : {}),
      };
    },
  };
}

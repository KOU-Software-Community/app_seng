-- AI Gündem: özet işini SUNUCU yaratsın, telefon değil.
--
-- SORUN. `sync-feeds` haberi ekliyor ama özet işini kuyruğa KOYMUYOR; işi
-- yaratan tek şey bir istemcinin `request-enrichment` çağırması. Sonuç
-- ölçüldü (2026-09-22): 2473 haberin 294'ünde (%12) özet vardı, kuyrukta
-- 0 iş bekliyordu, worker ise günde 2160 iş kapasiteyle boş oturuyordu.
-- Akışın ilk 20 haberinden yalnızca 11'i özetliydi, ilk 200'ünden 30'u.
-- Yani haberi ilk açan kişi HER ZAMAN bekliyordu.
--
-- NEDEN BURAYA YAZILIYOR. Deponun defteri "backend deposu emekliye ayrıldı,
-- bu düzeltme oraya yazılamıyor" diyordu. Bu, Edge fonksiyonu DEPOSU için
-- doğru — ama kuyruğa koyma bir VERİTABANI fonksiyonu
-- (`aigundem.internal_enqueue_ai_job`) ve veritabanı canlı ve yazılabilir.
-- Eksik olan şey bir cron işiydi, bir Edge dağıtımı değil.

-- ---------------------------------------------------------------------------
-- Süpürme
-- ---------------------------------------------------------------------------
create or replace function aigundem.internal_sweep_enqueue(
  p_limit          integer default 10,
  p_prompt_version text    default 'v1',
  p_model          text    default 'gemini-2.5-flash'
)
returns integer
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_row   record;
  v_count integer := 0;
begin
  if p_limit is null or p_limit < 1 or p_limit > 200 then
    raise exception 'sweep_enqueue: p_limit must be between 1 and 200'
      using errcode = '22023';
  end if;

  for v_row in
    select a.id, encode(a.content_hash, 'hex') as hash
      from aigundem.articles a
      join aigundem.sources s
        on s.id = a.source_id
       and s.status::text = 'active'
      left join aigundem.article_summaries sm
        on sm.article_id = a.id
       and sm.content_hash = a.content_hash
     where sm.article_id is null
       -- Gövdesi olmayan haberin özeti HİÇBİR ZAMAN üretilemiyor: sunucu
       -- `unavailable` diyor ve `summary_ready` sonsuza kadar false kalıyor.
       -- Ölçüm anında 151 haber böyleydi. Kuyruğa koymak her turda AI kotası
       -- yakmak ve aynı işi sonsuza kadar yeniden denemek olurdu.
       and coalesce(nullif(a.content_text, ''), a.excerpt, '') <> ''
       -- O içerik için zaten bir iş varsa (kuyrukta, bitmiş ya da ölü)
       -- dokunulmuyor. `internal_enqueue_ai_job` zaten `on conflict do
       -- nothing` ile idempotent; buradaki eleme worker'ı meşgul etmemek için.
       and not exists (
             select 1
               from private.ai_jobs j
              where j.article_id = a.id
                and j.content_hash = a.content_hash
           )
     order by a.published_at desc nulls last
     limit p_limit
  loop
    perform aigundem.internal_enqueue_ai_job(
      v_row.id, v_row.hash, p_prompt_version, p_model
    );
    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$function$;

comment on function aigundem.internal_sweep_enqueue(integer, text, text) is
$$Özeti olmayan haberleri AI kuyruğuna koyar. Yalnızca pg_cron çağırıyor.

MODEL DİZESİ ÖNEMLİ, ve gerekçesi emekli backend'in kendi kaynağında yazılı
(`_shared/ai-provider.ts`): özet önbellek anahtarı
`(article_id, content_hash, prompt_version, model)` ve kuyruğa koyan ile
worker AYNI model dizesini çözmek zorunda. Worker `resolveAiProvider()` ile
çözüyor; bugünkü değerler ölçüldü ve kaynakta doğrulandı:
`PROMPT_VERSION = 'v1'`, `GEMINI_DEFAULT_MODEL = 'gemini-2.5-flash'`.

Kayması hâlinde ne OLUR ve ne OLMAZ: akış görünümünün `summary_ready` alanı
yalnızca `(article_id, content_hash)` join ediyor, yani ÖZET YİNE GÖRÜNÜR.
Kayan tek şey `internal_find_summary`'nin kullandığı istemci önbellek
isabeti. Yani drift sessiz ve akışı bozmuyor — bu yüzden parametre, sabit
değil: Edge tarafının `GEMINI_MODEL` ortam değişkeni değişirse cron satırı
güncellenir.

`public.` sarmalayıcısı BİLEREK yok: sarmalayıcısı olmayan fonksiyon
PostgREST'ten çağrılamıyor, yani bu kapı yalnızca pg_cron'a açık.$$;

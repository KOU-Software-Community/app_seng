-- Kuyruk: en yeni haber önce, sağlayıcı yoğunluğu işi öldürmez, eski birikme
-- kuyruğu tıkamaz. (AGENTS.md -> "Kuyruk bir gün geride kaldı")
--
-- NE OLDU. Akış 24 Eylül boyunca 23 Eylül'de kaldı. Gemini'nin ücretsiz
-- kotası günde ~20 istekte doluyor; NVIDIA yedeğinin modeli 26 Ağustos'ta
-- emekli olmuştu (410). Worker 00:00 UTC'de başlayıp iki saatte 200'lük günlük
-- tavanı 429'larla yaktı, sonra 462 işin hepsini ertesi geceye erteledi. Sıra da
-- rastgeleydi: ertelenen işler "gece yarısı + birkaç milisaniye"ye göre dizildi,
-- bugünün 26 haberi 22-23 Eylül'ün 430 eski işinin arasına karıştı. Her 429 bir
-- işin 5 hakkından birini yedi ve hakkı biten iş kalıcı öldü.
--
-- Worker tarafı ayrı: zincir artık 2.5-flash'tan sonra üç ücretsiz Gemini
-- modeli ve çalışan bir NVIDIA modeli deniyor, hiçbiri cevap veremezse
-- `rate_limited` raporluyor. Bu dosya o raporun ne demek olduğunu belirliyor.

-- 1) Kira: vadesi gelmiş işler arasından yayını EN YENİ olan önce.
--    Eskisi, yeni iş kalmayınca alınıyor. İçeriği sonradan değişmiş bir haberin
--    eski içerik işi hiç alınmıyor: özeti akışta görünmeyecek bir hash'e yazılır.
create or replace function private.lease_ai_jobs(n integer)
 returns setof private.ai_jobs
 language plpgsql
 security definer
 set search_path to ''
as $function$
declare
  v_n integer := least(greatest(coalesce(n, 1), 1), 3);
begin
  return query
  with due as (
    select j.id
      from private.ai_jobs j
      join aigundem.articles a
        on a.id = j.article_id
       and a.content_hash = j.content_hash
     where j.status in ('queued', 'leased')
       and j.available_at <= now()
       and (j.leased_until is null or j.leased_until < now())
       and j.attempt_count < j.max_attempts
     order by a.published_at desc, j.available_at asc
     limit v_n
     for update of j skip locked
  )
  update private.ai_jobs t
     set status = 'leased',
         attempt_count = t.attempt_count + 1,
         leased_until = now() + interval '5 minutes',
         lease_token = pg_catalog.gen_random_uuid(),
         updated_at = now()
    from due
   where t.id = due.id
  returning t.*;
end;
$function$;

-- 2) `rate_limited` artık "zincirin hiçbir halkasında kapasite yok" demek:
--    sağlayıcıların durumu, makalenin değil. Bu yüzden
--    - işin deneme hakkı geri veriliyor (hakkı biten iş kalıcı ölüyordu);
--    - iş en az 15 dakika, yaşlandıkça daha seyrek deneniyor (yaşının dörtte
--      biri, en çok 12 saat) — hiçbir modelin işleyemediği bir haber de
--      "meşgul" görünürse sonsuza kadar sık sık denenmesin diye;
--    - kuyruğun geri kalanı da 15 dakika duruyor: bütün işler aynı duvara
--      toslayacak, her biri ayrı ayrı toslayıp günlük tavanı yakmasın.
--    Diğer kodlar eskisi gibi hak yiyor.
create or replace function aigundem.internal_retry_ai_job(p_job_id uuid, p_lease_token uuid, p_available_at timestamp with time zone, p_error_code text)
 returns boolean
 language plpgsql
 security definer
 set search_path to ''
as $function$
declare
  v_rows integer := 0;
  v_throttled boolean := p_error_code = 'rate_limited';
begin
  if p_job_id is null or p_lease_token is null then
    raise exception 'retry_ai_job: job id and lease token are required'
      using errcode = '22023';
  end if;
  if p_available_at is null then
    raise exception 'retry_ai_job: available_at is required' using errcode = '22023';
  end if;

  update private.ai_jobs j
     set status          = 'queued',
         available_at    = case when v_throttled
                             then greatest(p_available_at,
                                           now() + least(greatest(interval '15 minutes', (now() - j.created_at) / 4),
                                                         interval '12 hours'))
                             else p_available_at
                           end,
         attempt_count   = case when v_throttled then greatest(j.attempt_count - 1, 0)
                                else j.attempt_count end,
         leased_until    = null,
         lease_token     = null,
         last_error_code = left(p_error_code, 128),
         updated_at      = now()
   where j.id = p_job_id
     and j.lease_token = p_lease_token
     and j.status = 'leased';

  get diagnostics v_rows = row_count;

  if v_rows > 0 and v_throttled then
    update private.ai_jobs j
       set available_at = now() + interval '15 minutes',
           updated_at   = now()
     where j.status = 'queued'
       and j.available_at < now() + interval '15 minutes';
  end if;

  return v_rows > 0;
end;
$function$;

-- 3) Süpürme yalnızca son 48 saatin haberine iş açıyor; kuyruk böylece sınırlı
--    kalıyor ve günlük kapasite her zaman günlük işten büyük. Daha eski bir
--    haberi biri açarsa `request-enrichment` işi yine açıyor, taze işlerden sonra
--    işleniyor. İçeriği değişmiş haberin bekleyen eski içerik işi de burada
--    siliniyor: sonucu akışta hiç görünmeyecek.
create or replace function aigundem.internal_sweep_enqueue(p_limit integer default 10, p_prompt_version text default 'v1'::text, p_model text default 'gemini-2.5-flash'::text)
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

  delete from private.ai_jobs j
   using aigundem.articles a
   where a.id = j.article_id
     and j.status = 'queued'
     and j.content_hash <> a.content_hash;

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
       and a.published_at > now() - interval '48 hours'
       and coalesce(nullif(a.content_text, ''), a.excerpt, '') <> ''
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

-- 4) TEK SEFERLİK, 2026-09-24 durumu için. Yeniden koşturulması zararsız.
--    Geçmiş silinip yeniden çekildiğinde kuyruğa giren 48 saatten eski işler
--    ve eski içerik işleri gidiyor; kalanların 429'larla yenen hakları ve
--    ertesi geceye ertelemeleri geri alınıyor. Günün sayacı 200'ün 176'sını
--    429'lara harcamıştı; gerçekten cevap alınan çağrı 24.
delete from private.ai_jobs j
 using aigundem.articles a
 where a.id = j.article_id
   and j.status = 'queued'
   and (a.published_at <= now() - interval '48 hours' or j.content_hash <> a.content_hash);

update private.ai_jobs
   set attempt_count = 0, available_at = now(), updated_at = now()
 where status = 'queued';

update private.rate_limit_buckets
   set count = 24, updated_at = now()
 where subject = 'global' and action = 'ai_call' and window_start = '2026-09-24 00:00:00+00';

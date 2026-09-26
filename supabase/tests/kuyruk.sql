-- Kuyruğun kararlarını CANLI veritabanında sınar ve her zaman geri alır.
--
-- Nasıl koşulur: dosyanın tamamını SQL Editor'da ya da MCP `execute_sql` ile
-- çalıştırın. Blok sonunda bilerek hata fırlatıyor, dolayısıyla kurduğu test
-- verisi de, kiraladığı gerçek işler de geri alınıyor — hiçbir şey kalmıyor.
-- Hata mesajı "KUYRUK TESTİ GEÇTİ" ise geçti; başka bir mesaj, düşen
-- kontrollerin adlarıdır.
--
-- Test haberleri GELECEKTE yayımlanmış sayılıyor ki kuyruğun en yenisi onlar
-- olsun; gerçek işlerle karışmadan sıralama ölçülebilsin.
do $$
declare
  v_src uuid;
  v_new uuid; v_old uuid; v_stale uuid; v_recent uuid; v_ancient uuid; v_fresh_art uuid;
  v_job_new uuid; v_job_old uuid; v_job_stale uuid; v_job_fresh uuid;
  v_row record;
  v_token uuid;
  v_fail text := '';
  v_tag text := substr(md5(random()::text), 1, 8);
begin
  insert into aigundem.sources (slug, name, feed_url, feed_url_hash, language, category, status)
  values ('kuyruk-testi-' || v_tag, 'Kuyruk testi', 'https://ornek.invalid/' || v_tag,
          decode(md5(v_tag) || md5(v_tag || 'f'), 'hex'), 'en', 'Araştırma', 'active')
  returning id into v_src;

  -- a: başlık, yayın zamanı -> haber
  insert into aigundem.articles (source_id, external_id, canonical_url, url_hash, title, category,
                                 published_at, language, content_quality, content_hash, excerpt)
  select v_src, v_tag || x.k, 'https://ornek.invalid/' || v_tag || x.k,
         decode(md5(v_tag || x.k || 'u') || md5(v_tag || x.k || 'v'), 'hex'), x.k, 'Araştırma',
         x.yayin, 'en', 'excerpt', decode(md5(v_tag || x.k || 'c') || md5(v_tag || x.k || 'd'), 'hex'), 'Gövde metni.'
    from (values ('yeni',   now() + interval '2 hours'),
                 ('eski',   now() + interval '1 hour'),
                 ('bayat',  now() + interval '3 hours'),
                 ('taze',   now() - interval '1 hour'),
                 ('antika', now() - interval '3 days'),
                 ('bekleyen', now() + interval '30 minutes')) as x(k, yayin);

  select id into v_new     from aigundem.articles where external_id = v_tag || 'yeni';
  select id into v_old     from aigundem.articles where external_id = v_tag || 'eski';
  select id into v_stale   from aigundem.articles where external_id = v_tag || 'bayat';
  select id into v_recent  from aigundem.articles where external_id = v_tag || 'taze';
  select id into v_ancient from aigundem.articles where external_id = v_tag || 'antika';
  select id into v_fresh_art from aigundem.articles where external_id = v_tag || 'bekleyen';

  -- Eski sıralama (available_at) bayat → eski → yeni derdi; doğrusu yeni → eski,
  -- bayat hiç. "bayat"ın işi haberin şimdiki içeriğine değil eskisine ait.
  insert into private.ai_jobs (article_id, content_hash, prompt_version, model, available_at)
  select v_new, content_hash, 'v1', 'gemini-2.5-flash', now() - interval '1 minute' from aigundem.articles where id = v_new
  returning id into v_job_new;
  insert into private.ai_jobs (article_id, content_hash, prompt_version, model, available_at)
  select v_old, content_hash, 'v1', 'gemini-2.5-flash', now() - interval '10 minutes' from aigundem.articles where id = v_old
  returning id into v_job_old;
  insert into private.ai_jobs (article_id, content_hash, prompt_version, model, available_at)
  values (v_stale, decode(md5(v_tag || 'eski-icerik') || md5(v_tag || 'eski-icerik2'), 'hex'), 'v1', 'gemini-2.5-flash',
          now() - interval '20 minutes')
  returning id into v_job_stale;

  -- 1) En yeni önce.
  select * into v_row from private.lease_ai_jobs(1);
  if v_row.id is distinct from v_job_new then
    v_fail := v_fail || 'en yeni haber önce alınmadı; ';
  end if;
  v_token := v_row.lease_token;

  -- 2) Eski içerik işi hiç alınmıyor.
  perform private.lease_ai_jobs(3);
  if (select status from private.ai_jobs where id = v_job_stale) <> 'queued' then
    v_fail := v_fail || 'eski içerik işi kiralandı; ';
  end if;
  if (select status from private.ai_jobs where id = v_job_old) <> 'leased' then
    v_fail := v_fail || 'yeni iş bitince eskisi alınmadı; ';
  end if;

  -- 3) rate_limited: hak geri, iş ve kuyruk en az 15 dakika bekliyor.
  insert into private.ai_jobs (article_id, content_hash, prompt_version, model, available_at)
  select v_fresh_art, content_hash, 'v1', 'gemini-2.5-flash', now() from aigundem.articles where id = v_fresh_art
  returning id into v_job_fresh;
  perform aigundem.internal_retry_ai_job(v_job_new, v_token, now() + interval '1 minute', 'rate_limited');
  select * into v_row from private.ai_jobs where id = v_job_new;
  if v_row.attempt_count <> 0 then
    v_fail := v_fail || 'rate_limited deneme hakkı yedi; ';
  end if;
  if v_row.available_at < now() + interval '15 minutes' then
    v_fail := v_fail || 'rate_limited iş 15 dakikadan önce dönüyor; ';
  end if;
  if (select available_at from private.ai_jobs where id = v_job_fresh) < now() + interval '15 minutes' then
    v_fail := v_fail || 'rate_limited kuyruğu duraklatmadı; ';
  end if;

  -- 4) Başka bir hata eskisi gibi hak yiyor ve kuyruğu durdurmuyor.
  update private.ai_jobs set available_at = now() where id = v_job_fresh;
  perform aigundem.internal_retry_ai_job(v_job_old, (select lease_token from private.ai_jobs where id = v_job_old),
                                          now() + interval '1 minute', 'server_error');
  if (select attempt_count from private.ai_jobs where id = v_job_old) <> 1 then
    v_fail := v_fail || 'server_error hak yemedi; ';
  end if;
  if (select available_at from private.ai_jobs where id = v_job_fresh) > now() + interval '1 minute' then
    v_fail := v_fail || 'server_error kuyruğu durdurdu; ';
  end if;

  -- 5) Süpürme: 48 saatten eski habere iş açmıyor, eski içerik işini siliyor.
  perform aigundem.internal_sweep_enqueue(200);
  if not exists (select 1 from private.ai_jobs where article_id = v_recent) then
    v_fail := v_fail || 'süpürme taze habere iş açmadı; ';
  end if;
  if exists (select 1 from private.ai_jobs where article_id = v_ancient) then
    v_fail := v_fail || 'süpürme 3 günlük habere iş açtı; ';
  end if;
  if exists (select 1 from private.ai_jobs where id = v_job_stale) then
    v_fail := v_fail || 'süpürme eski içerik işini silmedi; ';
  end if;

  if v_fail = '' then
    raise exception 'KUYRUK TESTİ GEÇTİ (hepsi geri alındı)';
  end if;
  raise exception 'KUYRUK TESTİ DÜŞTÜ: %', v_fail;
end
$$;

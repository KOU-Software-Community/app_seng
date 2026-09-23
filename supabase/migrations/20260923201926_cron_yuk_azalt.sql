-- Proje Nano (en fazla 0,5 GB RAM) ve boştayken bile swap'ta. 2026-09-23
-- 17:44 UTC'de bir dakika içinde kilitlendi, restart'a kadar açılmadı
-- (AGENTS.md -> "Fotoğraf yüklerken 502"). Bu iki değişiklik kökü çözmüyor;
-- kök bellek, kalıcı çözüm Micro. Yaptıkları: makineye binen işi azaltmak.

-- 1) Süpürme her dakikadan 10 dakikada bire. Her pg_cron çalışması ayrı bir
--    bağlantı açıyor: günde 1.440 yerine 144. Kilitlenmede her dakika yeni iş
--    başlatıp üst üste bindi (en uzunu 374 sn). Dakika 3'ten başlıyor ki işçiyle
--    (çift dakikalar) ve çekimle (:00/:15/:30/:45) aynı ana düşmesin. İlk
--    tasarımdaki değer de 10 dakikaydı (20260922175500). Haber kuyruğa en
--    geç 10 dk geç giriyor; darboğaz zaten işçi (2 dakikada 3 iş) ve günlük AI
--    tavanı. GERİ 1 DAKİKAYA ÇEKMEYİN: kazancı yok, bedeli Nano'da.
select cron.schedule(
  'ai-gundem-sweep-enqueue',
  '3-59/10 * * * *',
  $cron$select aigundem.internal_sweep_enqueue(50);$cron$
);

-- 2) cron.job_run_details'i 7 günde budamak. pg_cron geçmişi kendiliğinden
--    silmiyor (Supabase belgesi: "does not automatically clean up historical
--    records"); tablo veritabanının yarısıydı (32 MB, ~29 bin satır, günde
--    ~2.250). 03:17 UTC hiçbir işle çakışmıyor: işçi çift dakikalarda, çekim
--    :00/:15/:30/:45'te, süpürme x3'te, digest 02:45 ve 03:30-03:50'de.
select cron.schedule(
  'cron-gecmisi-temizlik',
  '17 3 * * *',
  $cron$delete from cron.job_run_details where end_time < now() - interval '7 days'$cron$
);

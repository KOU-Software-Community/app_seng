-- DEPODAKİ KOPYA CANLIYI YANLIŞ ANLATIYORDU — bu dosya eksik kalan adım.
--
-- 20260922175500_sweep_enqueue_cron işçiyi `max_jobs: 10`, süpürmeyi 10
-- dakikada bir diye yazıyor. Canlıda (2026-09-23 ölçüldü) işçi 3, süpürme
-- her dakika. 10'u `process-enrichments` Edge fonksiyonu reddediyor
-- ("max_jobs must be an integer between 1 and 3"): her tur 400 döndü ve ~45
-- dakika tek haber işlenmedi. Üretimde SQL ile 3'e geri alındı, ama geri alma
-- depoya hiç yazılmadı. Eski dosyayı yeniden uygulayan biri işçiyi yine
-- durdururdu; bu dosya ondan SONRA sıralanıp değerleri canlıya eşitliyor.
--
-- Canlıya uygulanmadı, gerekmiyor: iki işin komutu da bu metinle birebir
-- aynı (boşluk farkı dışında, md5 ile karşılaştırıldı), zamanlamalar da.
-- `cron.schedule` aynı adlı işi güncelliyor, yani yeniden uygulamak zararsız.
select cron.schedule(
  'ai-gundem-sweep-enqueue',
  '* * * * *',
  $cron$select aigundem.internal_sweep_enqueue(50);$cron$
);

-- İşçinin tavanı 3: Edge fonksiyonunun kabul ettiği en yüksek değer.
select cron.schedule(
  'ai-gundem-ai-worker',
  '*/2 * * * *',
  $cron$
    select net.http_post(
      url := coalesce(
               current_setting('app.settings.functions_url', true),
               'https://eglxzbsrewbleqlstefd.supabase.co/functions/v1'
             ) || '/process-enrichments',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'X-Internal-Secret', (
          select v.decrypted_secret
            from vault.decrypted_secrets v
           where v.name = 'aigundem_automations_secret'
        )
      ),
      body := jsonb_build_object('max_jobs', 3),
      timeout_milliseconds := 55000
    );
  $cron$
);

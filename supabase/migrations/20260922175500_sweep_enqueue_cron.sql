-- DİKKAT: aşağıdaki `max_jobs: 10` ve 10 dakikalık süpürme canlıda kalmadı
-- (10'u Edge fonksiyonu reddediyor). Canlıyla eşleşen hâl:
-- 20260923103132_cron_canliya_esitle.sql.
--
-- Süpürmeyi zamanlayan beşinci cron işi + işçinin hızlandırılması.
--
-- Fonksiyon ayrı bir migration'da (20260922174500_sweep_enqueue_function.sql)
-- ve BİLEREK ayrı: cron açılmadan önce fonksiyon elle küçük bir limitle
-- çağrılıp sonucu ölçüldü. Bir zamanlayıcıyı, çağırdığı şeyin çalıştığını
-- görmeden açmak, ilk hatayı on dakika sonra ve sebepsiz görmek demek.
--
-- HIZ — ölçülerek iki kez ayarlandı, ve ilk gerekçem YANLIŞTI.
--
-- Önce "işçi kapasitesinin (90/saat) altında kalalım ki hız limitine
-- çarpmayalım" diye 60/saat seçildi. Yanlış: AI çağrılarını yapan taraf işçi
-- ve onun tavanı kendi cron satırındaki `max_jobs`. Süpürme hızı yalnızca
-- KUYRUK DERİNLİĞİNİ belirliyor, AI baskısını değil. Yani gerçek darboğaz
-- `max_jobs: 3` idi ve ona hiç dokunulmamıştı.
--
-- İkisi birden ayarlandı ve eşitlendi:
--   işçi    : 2 dakikada 10 iş  = 300/saat
--   süpürme : 10 dakikada 50    = 300/saat
--
-- 328 haberlik ilk dolum böylece ~1 saatte bitiyor (60/saat ile 5,5 saatti).
--
-- İKİ ANAHTAR ZATEN VAR ve yük bölüşümü onlarda: Gemini birincil, NVIDIA
-- yedek (`_shared/ai-provider.ts` `withFallback`). Biri 429 verince öteki
-- deneniyor. Bu hızda `private.ai_jobs`'taki `failed` sayısı izlenmeli:
-- artıyorsa iki sayı da düşürülmeli, çünkü ÖLÜ İŞ GERİ GELMİYOR — beş
-- denemesini tüketen işin satırı kalıyor ve süpürme onu bir daha kuyruğa
-- koyamıyor (`on conflict do nothing`).
select cron.schedule(
  'ai-gundem-sweep-enqueue',
  '*/10 * * * *',
  $cron$select aigundem.internal_sweep_enqueue(50);$cron$
);

-- İşçinin kendi tavanı: 3 -> 10. Satırın geri kalanı olduğu gibi korunuyor.
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
      body := jsonb_build_object('max_jobs', 10),
      timeout_milliseconds := 55000
    );
  $cron$
);

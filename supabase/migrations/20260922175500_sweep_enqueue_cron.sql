-- AI Gündem: süpürmeyi zamanlayan beşinci cron işi.
--
-- Fonksiyon ayrı bir migration'da (20260922174500_sweep_enqueue_function.sql)
-- ve BİLEREK ayrı: cron açılmadan önce fonksiyon elle küçük bir limitle
-- çağrılıp sonucu ölçüldü. Bir zamanlayıcıyı, çağırdığı şeyin çalıştığını
-- görmeden açmak, ilk hatayı on dakika sonra ve sebepsiz görmek demek.

-- ---------------------------------------------------------------------------
-- Beşinci cron işi
-- ---------------------------------------------------------------------------
-- Mevcut dördü Edge'e `net.http_post` atıyor; bu doğrudan SQL, ağ yok.
--
-- HIZ: 10 dakikada 10 = 60/saat. Worker kapasitesi 90/saat (3 iş / 2 dk) ve
-- bilerek ALTINDA kalınıyor, çünkü ÖLÜ İŞ GERİ GELMİYOR: hız limitinden 5
-- denemesini tüketen bir işin satırı kalıyor ve süpürme onu bir daha kuyruğa
-- koyamıyor. Sağlayıcının limitinin üstünde sürmek, kalıcı olarak özetsiz
-- kalacak haberler üretir. İlk saatte `private.ai_jobs` içindeki `failed`
-- sayısı izlenip bu sayı ayarlanacak.
select cron.schedule(
  'ai-gundem-sweep-enqueue',
  '*/10 * * * *',
  $cron$select aigundem.internal_sweep_enqueue(10);$cron$
);

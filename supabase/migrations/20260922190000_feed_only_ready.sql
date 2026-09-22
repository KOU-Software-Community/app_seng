-- Özeti ve çevirisi olmayan haber uygulamaya HİÇ gitmesin.
--
-- SORUN. Uygulamadaki kapı (`src/gundem/enrichment/gate.ts`) "özetsiz haber
-- akışa girmesin" diyordu ama gerçekte yalnızca **30 dakikadan taze** haberi
-- tutuyor; daha eskisini özetsiz hâliyle gösteriyor. Tavanın gerekçesi
-- sağlamdı (gövdesi olmayan haber sonsuza kadar saklanmasın), ama sonucu şu:
-- ölçüldü, 457 haberin **447'si** kapıdan boş geçiyordu ve kullanıcı akışın
-- en üstünde ne özeti ne çevirisi olan haber görüyordu.
--
-- Kapının 30 dakikası, "iş birazdan biter" varsayımına dayanıyor. O varsayım
-- normal akışta doğru (günde ~30 haber, kapasite saatte ~90), ama toplu bir
-- dolumda ya da AI tarafı tıkandığında yanlış — ve yanlış olduğunda sessizce
-- boş haber gösteriyor.
--
-- ÇÖZÜM BURADA, UYGULAMADA DEĞİL. Filtre görünümde olunca veri kabloya hiç
-- çıkmıyor: mağazadaki eski sürüm dâhil HER istemci düzelmiş oluyor, EAS
-- derlemesi beklemeden. Uygulama tarafındaki kapı yerinde kalıyor — artık
-- ikinci savunma hattı, tek hat değil.
--
-- BEDELİ AÇIK: hat tıkanırsa akış boşalır. Eski davranış tersini seçiyordu
-- (geç gelen özet, hiç görünmeyen haberden iyidir). Operatör bunu görüp
-- açıkça öbür tarafı seçti: boş haber göstermektense az haber göstermek.
-- Uygulandığı an akış 457'den 10'a düştü ve kuyruk boşaldıkça doluyor.
--
-- `translation_state = 'not_required'` şart: Türkçe kaynaklarda (Webrazzi)
-- çeviri hiç üretilmiyor ve üretilmemeli. O satır olmasaydı Türkçe haberlerin
-- tamamı gizlenirdi.
--
-- GERİ ALMA: aynı sorgu, `where` bloğu silinmiş hâli.
create or replace view public.aigundem_feed_articles_v1 as
select article_id, source_id, source_slug, source_name, source_site_url,
       category, title, author, canonical_url, published_at, fetched_at,
       language, excerpt, content_text, content_quality,
       summary_tr, translation_tr, translation_state,
       summary_model, summary_generated_at, summary_ready
  from aigundem.feed_articles_v1
 where summary_ready
   and (translation_state = 'not_required' or coalesce(translation_tr, '') <> '');

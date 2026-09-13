import { CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { YoklamaHatasi, yoklamaMesaji, yoklamaVer, type YoklamaSonucu } from '../src/attendance';
import { useAuth } from '../src/authStore';
import { GlassButton, GradientHeader, PixelTxt, PrimaryButton, Txt } from '../src/components/ui';
import { useContent } from '../src/content';
import { bekleyeniOku, bekleyeniSil, bekleyeniYaz } from '../src/pendingScan';
import { parseQrPayload, type QrOkuma } from '../src/qrSchema';
import { taramaKarari } from '../src/scanGate';
import { useAppStore } from '../src/store';
import { colors, gradients, radius } from '../src/theme';

type Durum =
  | { tur: 'tarama' }
  | { tur: 'gonderiliyor' }
  | { tur: 'bitti'; sonuc: YoklamaSonucu; eventId: string }
  | { tur: 'kayit-gerek'; okuma: QrOkuma }
  | { tur: 'hata'; mesaj: string; tekrar?: QrOkuma };

/**
 * QR ile yoklama.
 *
 * Kamera yalnızca bu ekranda ve yalnızca QR için açılıyor; okunan kare hiçbir
 * yere yazılmıyor, gönderilmiyor, saklanmıyor. `app.json`'daki izin metni de
 * bunu söylüyor.
 */
export default function QrRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { events, archive } = useContent();
  const { registrationFor } = useAppStore();
  const { eventId: hedefEtkinlik } = useLocalSearchParams<{ eventId?: string }>();

  const [izin, izinIste] = useCameraPermissions();
  const [durum, setDurum] = useState<Durum>({ tur: 'tarama' });

  // Kamera saniyede onlarca kare veriyor ve her biri `onBarcodeScanned`
  // tetikliyor. Kilit olmadan tek okutma onlarca Firestore yazması demek.
  const mesgul = useRef(false);

  const adiniBul = useCallback(
    (id: string) => [...events, ...archive].find((e) => e.id === id)?.title ?? id,
    [events, archive],
  );

  const gonder = useCallback(
    async (okuma: QrOkuma) => {
      setDurum({ tur: 'gonderiliyor' });
      try {
        const sonuc = await yoklamaVer(okuma);
        await bekleyeniSil();
        setDurum({ tur: 'bitti', sonuc, eventId: okuma.eventId });
      } catch (err) {
        const kod = err instanceof YoklamaHatasi ? err.kod : 'aglar';
        if (kod === 'oturum-yok') {
          // Jeton bekletiliyor: giriş bitince bu ekrana dönünce kendiliğinden
          // gönderilecek. Aksi hâlde kullanıcı kapı önünde QR'ı ikinci kez arar.
          await bekleyeniYaz(okuma);
          router.push('/giris?next=/qr');
          return;
        }
        // Ağ hatasında jeton saklanıyor — pencere gün sonuna kadar açık, yani
        // bir sonraki deneme hâlâ geçerli. Kural reddinde saklanmıyor: aynı
        // cevap her denemede aynı olur (defterdeki "yalnızca düzelebilecek
        // şeyi yeniden dene" maddesi).
        if (kod === 'aglar') await bekleyeniYaz(okuma);
        setDurum({
          tur: 'hata',
          mesaj: yoklamaMesaji(kod),
          tekrar: kod === 'aglar' ? okuma : undefined,
        });
      } finally {
        mesgul.current = false;
      }
    },
    [router],
  );

  /**
   * Okunan bir jetonu karara bağlar ve kararı uygular.
   *
   * Taze okutma da, girişten/kayıttan dönünce diskten gelen bekleyen okutma da
   * BURADAN geçiyor. Ayrı geçselerdi kayıt şartı yalnızca taze okutmada
   * uygulanırdı: kaydı olmayan biri "önce kaydol" görür, kaydolmadan geri
   * gelir, ve bekleyen jeton kapıyı atlayıp gönderilirdi.
   */
  const isle = useCallback(
    (okuma: QrOkuma) => {
      const karar = taramaKarari({
        okunanEtkinlik: okuma.eventId,
        hedefEtkinlik,
        kayitliMi: Boolean(registrationFor(okuma.eventId)),
      });
      if (karar.tur === 'yanlis-etkinlik') {
        setDurum({
          tur: 'hata',
          mesaj: `Bu kod "${adiniBul(okuma.eventId)}" etkinliğine ait. Doğru kodu okuttuğundan emin ol.`,
        });
        return;
      }
      if (karar.tur === 'kayit-gerek') {
        // Jeton saklanıyor: kayıttan dönen kullanıcı QR'ı ikinci kez aramasın.
        // Pencere gün sonuna kadar açık, yani saklanan jeton hâlâ geçerli.
        void bekleyeniYaz(okuma);
        setDurum({ tur: 'kayit-gerek', okuma });
        return;
      }
      void gonder(okuma);
    },
    [gonder, hedefEtkinlik, adiniBul, registrationFor],
  );

  // Ekran açılınca bekleyen bir okutma varsa kendiliğinden gönderiliyor:
  // girişten dönen ya da internetsiz kalıp geri gelen kullanıcı QR'ı tekrar
  // aramak zorunda kalmasın.
  const denendi = useRef(false);
  useEffect(() => {
    if (denendi.current || !user) return;
    denendi.current = true;
    void (async () => {
      const bekleyen = await bekleyeniOku();
      if (bekleyen) {
        mesgul.current = true;
        isle(bekleyen);
      }
    })();
  }, [user, isle]);


  /*
    Kayıt kapısında bekleyen ekran, kayıt gelir gelmez kendiliğinden gönderiyor.

    Açılış efekti buna yetmiyor ve sebebi ince: kullanıcı "Etkinliğe kaydol"a
    bastığında bu ekran YIĞINDA KALIYOR, geri dönüldüğünde yeniden mount
    olmuyor — `denendi` hâlâ true, efekt bir daha koşmuyor ve ekranda "önce
    kaydol" kartı durmaya devam ediyor. Yani ekrandaki "döndüğünde otomatik
    gönderilecek" cümlesi, bu efekt olmadan tutulmayan bir söz olurdu.

    Tetikleyen şey kaydın kendisi: `registrationFor` mağazadan geliyor ve kayıt
    yazıldığı an bu bileşen yeniden çiziliyor.
  */
  const kapidaki = durum.tur === 'kayit-gerek' ? durum.okuma : null;
  useEffect(() => {
    if (!kapidaki) return;
    if (!registrationFor(kapidaki.eventId)) return;
    mesgul.current = true;
    void gonder(kapidaki);
  }, [kapidaki, registrationFor, gonder]);

  const okundu = useCallback(
    ({ data }: { data: string }) => {
      if (mesgul.current) return;
      const okuma = parseQrPayload(data);
      mesgul.current = true;
      if (!okuma) {
        setDurum({
          tur: 'hata',
          mesaj: 'Bu QR kulübün yoklama kodu değil. Etkinlik ekranındaki kodu okut.',
        });
        return;
      }
      isle(okuma);
    },
    [isle],
  );

  const tekrarTara = () => {
    mesgul.current = false;
    setDurum({ tur: 'tarama' });
  };

  return (
    <View style={styles.screen}>
      <GradientHeader gradient={gradients.section}>
        <View style={styles.headerRow}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
          <Txt weight="extrabold" size={20} color="#fff" style={{ marginLeft: 12 }}>
            QR ile yoklama
          </Txt>
        </View>
      </GradientHeader>

      <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 32 }]}>
        {!izin ? (
          <View style={styles.kart}>
            <PixelTxt size={10} color={colors.muted}>
              KAMERA HAZIRLANIYOR
            </PixelTxt>
          </View>
        ) : !izin.granted ? (
          <View style={styles.kart}>
            <Txt weight="bold" size={15} color={colors.text}>
              Kamera izni gerekiyor
            </Txt>
            <Txt size={13} leading={1.55} color={colors.muted} style={{ marginTop: 6 }}>
              Yoklama için etkinlikteki QR kodunu okutman gerekiyor. Kamera yalnızca
              bu ekranda açılıyor; görüntü hiçbir yere kaydedilmiyor.
            </Txt>
            <View style={{ marginTop: 14 }}>
              {izin.canAskAgain ? (
                <PrimaryButton label="Kamera iznini ver" onPress={() => void izinIste()} />
              ) : (
                <PrimaryButton label="Ayarları aç" onPress={() => void Linking.openSettings()} />
              )}
            </View>
          </View>
        ) : durum.tur === 'tarama' ? (
          <>
            <View style={styles.kamera}>
              <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                onBarcodeScanned={okundu}
              />
            </View>
            <Txt size={13} leading={1.55} color={colors.muted} style={{ marginTop: 14 }}>
              Etkinlikteki QR kodunu çerçeveye al. Yoklama, etkinliğin başlamasına bir
              saat kala açılır ve gün sonunda kapanır.
            </Txt>
          </>
        ) : durum.tur === 'gonderiliyor' ? (
          <View style={styles.kart}>
            <PixelTxt size={10} color={colors.muted}>
              YOKLAMA GONDERILIYOR
            </PixelTxt>
          </View>
        ) : durum.tur === 'bitti' ? (
          <View style={[styles.kart, { borderColor: colors.blue500 }]}>
            <Txt weight="extrabold" size={17} color={colors.text}>
              {durum.sonuc === 'zaten-kayitli' ? 'Zaten kayıtlısın' : 'Yoklaman alındı'}
            </Txt>
            <Txt size={13.5} leading={1.55} color={colors.textBody} style={{ marginTop: 6 }}>
              {adiniBul(durum.eventId)}
            </Txt>
            <Txt size={13} leading={1.55} color={colors.muted} style={{ marginTop: 10 }}>
              {yoklamaMesaji(durum.sonuc)}
            </Txt>
            <View style={{ marginTop: 16 }}>
              <PrimaryButton label="Tamam" onPress={() => router.back()} />
            </View>
          </View>
        ) : durum.tur === 'kayit-gerek' ? (
          /*
            Kaydı olmayan kişi burada durduruluyor — sunucuya hiç gidilmiyor.

            Alternatif, yoklamayı almak ve sertifika aşamasında reddetmekti:
            öğrenci salonda "yoklaman alındı" görür, haftalar sonra belge
            gelmez, ve sebebini kimse söyleyemez. Ret kapıda ve düzeltmesi
            ELDE: aynı ekrandan kaydol, geri dön, jeton zaten saklı.
          */
          <View style={[styles.kart, { borderColor: colors.blue500 }]}>
            <Txt weight="extrabold" size={17} color={colors.text}>
              Önce etkinliğe kaydol
            </Txt>
            <Txt size={13.5} leading={1.55} color={colors.textBody} style={{ marginTop: 6 }}>
              {adiniBul(durum.okuma.eventId)}
            </Txt>
            <Txt size={13} leading={1.55} color={colors.muted} style={{ marginTop: 10 }}>
              Bu etkinlik için kaydın görünmüyor. Katılım sertifikası yalnızca
              kayıtlı katılımcılara veriliyor. Kaydını tamamlayıp bu ekrana
              döndüğünde yoklaman otomatik gönderilecek — kodu tekrar okutmana
              gerek yok.
            </Txt>
            <View style={{ marginTop: 16, gap: 10 }}>
              <PrimaryButton
                label="Etkinliğe kaydol"
                onPress={() => router.push(`/kayit/${encodeURIComponent(durum.okuma.eventId)}`)}
              />
              <Pressable onPress={tekrarTara} style={{ paddingVertical: 10, alignItems: 'center' }}>
                <Txt weight="semibold" size={13} color={colors.blue500}>
                  Başka kod okut
                </Txt>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={[styles.kart, { borderColor: colors.dangerBorder }]}>
            <Txt weight="bold" size={15} color={colors.danger}>
              Yoklama alınamadı
            </Txt>
            <Txt size={13} leading={1.55} color={colors.textBody} style={{ marginTop: 6 }}>
              {durum.mesaj}
            </Txt>
            <View style={{ marginTop: 16, gap: 10 }}>
              {durum.tekrar ? (
                <PrimaryButton label="Tekrar dene" onPress={() => void gonder(durum.tekrar!)} />
              ) : null}
              <Pressable onPress={tekrarTara} style={{ paddingVertical: 10, alignItems: 'center' }}>
                <Txt weight="semibold" size={13} color={colors.blue500}>
                  Yeniden okut
                </Txt>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  body: { paddingHorizontal: 20, paddingTop: 22 },
  kamera: {
    aspectRatio: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.navy900,
  },
  kart: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 18,
  },
});

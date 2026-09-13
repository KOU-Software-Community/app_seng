import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../src/authStore';
import {
  sertifikaPdfUrl,
  sertifikaUrl,
  sertifikalarimiGetir,
  type Sertifikam,
} from '../src/certificates';
import { GlassButton, GradientHeader, GroupLabel, PixelTxt, Txt } from '../src/components/ui';
import { useContent } from '../src/content';
import { colors, gradients, radius } from '../src/theme';

/**
 * Sertifikalarım.
 *
 * Belge burada ÜRETİLMİYOR, yalnızca gösteriliyor: PDF'i ve doğrulama sayfasını
 * panel basıyor ve ikisi de aynı HTML tanımından çıkıyor. Uygulama kendi
 * çizimini yapsaydı belgenin ikinci bir tanımı olurdu ve ikisi ayrışırdı — bu
 * defterin "aynı kararı iki yerde uygulamak" maddesi.
 *
 * Ekran giriş İSTİYOR, ve hesap sekmesinin aksine bu doğru: sertifika hesaba
 * bağlı bir şey (yoklama `uid` ile yazılıyor), yani oturumsuz gösterilecek bir
 * içerik yok. Guideline 5.1.1(v) hesaba bağlı OLMAYAN içeriğin duvar arkasına
 * konmasını yasaklıyor; bu içerik hesaba bağlı.
 */
export default function CertificatesRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { events, archive } = useContent();
  const tumEtkinlikler = React.useMemo(() => [...events, ...archive], [events, archive]);

  const [liste, setListe] = useState<Sertifikam[] | null>(null);
  const [hata, setHata] = useState<string | null>(null);

  const yukle = useCallback(async () => {
    if (!user) {
      setListe([]);
      return;
    }
    setHata(null);
    try {
      setListe(await sertifikalarimiGetir());
    } catch {
      // `.catch`i olmayan bir `.then` bitmeyen bir iskelet demek — bu defterde
      // yazılı. Hata durumunda liste boş değil, HATALI.
      setListe([]);
      setHata('Sertifikaların yüklenemedi. İnternetini kontrol edip tekrar dene.');
    }
  }, [user]);

  useEffect(() => {
    void yukle();
  }, [yukle]);

  // `PANEL_BASE_URL` boşsa adres üretilemiyor ve düğme HİÇBİR ŞEY yapmıyordu:
  // basılıyor, hiçbir şey olmuyor, hata da yok — bu defterde "en geç fark
  // edilen sınıf" diye yazılı. Sebep ekrana yazılıyor; kullanıcının
  // düzeltebileceği bir şey değil ama bildiği bir şey olmalı.
  const ac = (url: string) => {
    if (!url) {
      setHata('Uygulama yapılandırması eksik; bu sürümde belge açılamıyor.');
      return;
    }
    void Linking.openURL(url).catch(() =>
      setHata('Belge açılamadı. İnternetini kontrol edip tekrar dene.'),
    );
  };

  return (
    <View style={styles.screen}>
      <GradientHeader gradient={gradients.section}>
        <View style={styles.headerRow}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
          <Txt weight="extrabold" size={20} color="#fff" style={{ marginLeft: 12 }}>
            Sertifikalarım
          </Txt>
        </View>
        <Txt size={13} leading={1.5} color="rgba(255,255,255,0.82)" style={{ marginTop: 12 }}>
          QR ile yoklaman alınan etkinliklerin katılım belgeleri.
        </Txt>
      </GradientHeader>

      <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 32 }]}>
        {!user ? (
          <View style={styles.card}>
            <Txt size={13.5} leading={1.6} color={colors.textBody}>
              Sertifikalar hesabına bağlı. Giriş yaptığında etkinliklerde alınan
              yoklamalardan çıkan belgelerin burada görünür.
            </Txt>
            <Pressable onPress={() => router.push('/giris')} style={{ paddingTop: 12 }}>
              <Txt weight="semibold" size={13.5} color={colors.blue500}>
                Giriş yap
              </Txt>
            </Pressable>
          </View>
        ) : liste === null ? (
          <View style={styles.card}>
            <PixelTxt size={10} color={colors.muted}>
              YÜKLENİYOR
            </PixelTxt>
          </View>
        ) : hata ? (
          <View style={styles.card}>
            <Txt size={13.5} leading={1.6} color={colors.textBody}>
              {hata}
            </Txt>
            <Pressable onPress={() => void yukle()} style={{ paddingTop: 12 }}>
              <Txt weight="semibold" size={13.5} color={colors.blue500}>
                Tekrar dene
              </Txt>
            </Pressable>
          </View>
        ) : liste.length === 0 ? (
          <View style={styles.card}>
            <PixelTxt size={10} color={colors.muted}>
              HENÜZ SERTİFİKA YOK
            </PixelTxt>
            <Txt size={13} leading={1.6} color={colors.muted} style={{ marginTop: 10 }}>
              Bir etkinlikte QR ile yoklaman alındıktan sonra kulüp sertifikanı
              yayınlıyor. Yayınlandığında hem buraya düşüyor hem de e-posta
              adresine PDF olarak geliyor.
            </Txt>
          </View>
        ) : (
          <>
            <GroupLabel style={styles.groupLabel}>{`${liste.length} BELGE`}</GroupLabel>
            {liste.map((s) => {
              const event = tumEtkinlikler.find((e) => e.id === s.eventId);
              return (
                <View key={s.no} style={styles.card}>
                  <Txt weight="extrabold" size={16} color={colors.text}>
                    {event?.title ?? 'Etkinlik bilgisi yüklenemedi'}
                  </Txt>
                  <Txt size={13} leading={1.5} color={colors.muted} style={{ marginTop: 4 }}>
                    {s.adSoyad} adına · belge no {s.no}
                  </Txt>
                  <View style={styles.butonlar}>
                    <Pressable onPress={() => ac(sertifikaPdfUrl(s.no))} style={styles.birincil}>
                      <Txt weight="bold" size={13.5} color="#fff">
                        PDF olarak aç
                      </Txt>
                    </Pressable>
                    <Pressable onPress={() => ac(sertifikaUrl(s.no))} style={styles.ikincil}>
                      <Txt weight="semibold" size={13.5} color={colors.blue500}>
                        Doğrulama sayfası
                      </Txt>
                    </Pressable>
                  </View>
                </View>
              );
            })}
            <Txt size={12.5} leading={1.55} color={colors.muted} style={styles.not}>
              Doğrulama sayfası herkese açık: belgeyi soran kişiye adresi
              gönderebilirsin, belgenin gerçek olduğunu oradan görüyor.
            </Txt>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  body: { paddingHorizontal: 20, paddingTop: 18, gap: 12 },
  groupLabel: { marginTop: 4 },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  butonlar: { flexDirection: 'row', gap: 10, marginTop: 14, flexWrap: 'wrap' },
  birincil: {
    backgroundColor: colors.blue500,
    borderRadius: radius.sm,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  ikincil: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  not: { paddingHorizontal: 4, paddingTop: 6 },
});

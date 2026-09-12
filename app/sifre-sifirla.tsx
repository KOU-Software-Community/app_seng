import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MIN_PASSWORD, digits } from '../src/accountSchema';
import { signIn } from '../src/auth';
import { ErrorBanner, Field, Input } from '../src/components/AuthForm';
import { GlassButton, GradientHeader, PrimaryButton, Txt } from '../src/components/ui';
import { OtpHata, otpMesaj, sifreDegistir, sifreKodIste } from '../src/otp';
import { colors, gradients, radius } from '../src/theme';

/** Kod uzunluğu — `admin/otp.ts` altı hane üretiyor. */
const UZUNLUK = 6;

/**
 * Parola sıfırlama — tek ekran, iki adım.
 *
 * `/dogrula` da tek dosyada iki iş yapıyor; aynı kalıp. İki ayrı rota olsaydı
 * ikinci adıma e-posta olmadan derin bağlantı anlamsız olurdu ve adres
 * navigasyon parametresinde dolaşırdı.
 *
 * **Adım geçişi sunucu cevabına BAĞLANMIYOR, ve bu tasarımın kilit noktası.**
 * Sunucu adres kayıtlı olsun olmasın aynı cevabı veriyor; ekran yalnızca
 * "kullanıcı var" cevabında kod adımına geçseydi, sunucu tarafı kusursuz
 * görünürken oracle tam burada olurdu. Kayıtlı olmayan adresi yazan kişi kod
 * ekranını görüyor ve yazdığı her kod "hatalı" diyor — kabul edilen maliyet bu.
 *
 * `/dogrula`'daki `useRef` koruması burada GEREKMİYOR: kod isteği düğmeye
 * basınca oluyor, ekran açılışında değil, yani React 19'un çift efekti devrede
 * değil.
 */
export default function ResetPasswordRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { email: gelenEmail, next } = useLocalSearchParams<{ email?: string; next?: string }>();

  const [adim, setAdim] = useState<'eposta' | 'kod'>('eposta');
  const [email, setEmail] = useState(gelenEmail ?? '');
  const [kod, setKod] = useState('');
  const [parola, setParola] = useState('');
  const [parolaTekrar, setParolaTekrar] = useState('');

  const [bekleme, setBekleme] = useState(0);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [bilgi, setBilgi] = useState<string | null>(null);

  useEffect(() => {
    if (bekleme <= 0) return;
    const t = setTimeout(() => setBekleme((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [bekleme]);

  const kodIste = async () => {
    if (!email.trim()) {
      setHata('E-posta adresini yaz.');
      return;
    }
    setGonderiliyor(true);
    setHata(null);
    try {
      await sifreKodIste(email.trim());
      setBilgi('Adres kayıtlıysa altı haneli kodu gönderdik. Gelmediyse spam klasörüne de bak.');
      setBekleme(60);
      setAdim('kod');
    } catch (err) {
      // "Bekle" bir hata değil, sayaç — ve kod adımına yine geçiliyor:
      // kullanıcının elinde zaten geçerli bir kod var.
      if (err instanceof OtpHata && err.kod === 'bekle') {
        setBekleme(err.saniye ?? 60);
        setAdim('kod');
      } else {
        setHata(otpMesaj(err));
      }
    } finally {
      setGonderiliyor(false);
    }
  };

  const degistir = async () => {
    if (kod.length !== UZUNLUK) {
      setHata(`Kod ${UZUNLUK} haneli.`);
      return;
    }
    if (parola.length < MIN_PASSWORD) {
      setHata(`Parola en az ${MIN_PASSWORD} karakter olmalı.`);
      return;
    }
    if (parola !== parolaTekrar) {
      setHata('Parolalar birbirini tutmuyor.');
      return;
    }
    setGonderiliyor(true);
    setHata(null);
    try {
      await sifreDegistir(email.trim(), kod, parola);
      // Yeni parola elimizde: kullanıcıyı giriş formuna geri yollamak
      // gereksiz bir adım olurdu. Sunucu bütün oturumları düşürdüğü için
      // bu cihazın da yeniden giriş yapması gerekiyor, zaten burada oluyor.
      try {
        await signIn(email.trim(), parola);
        router.replace(next ? (next as never) : '/(tabs)/hesap');
      } catch {
        router.replace('/giris');
      }
    } catch (err) {
      setHata(otpMesaj(err));
    } finally {
      setGonderiliyor(false);
    }
  };

  return (
    <View style={styles.screen}>
      <GradientHeader gradient={gradients.section}>
        <View style={styles.headerRow}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
          <Txt weight="extrabold" size={20} color="#fff" style={{ marginLeft: 12 }}>
            Parolamı unuttum
          </Txt>
        </View>
        <Txt size={13} leading={1.5} color="rgba(255,255,255,0.82)" style={{ marginTop: 12 }}>
          {adim === 'eposta'
            ? 'Hesabının e-posta adresine altı haneli bir kod göndereceğiz.'
            : 'Kodu ve yeni parolanı yaz.'}
        </Txt>
      </GradientHeader>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.form, { paddingBottom: insets.bottom + 120 }]}
          keyboardShouldPersistTaps="handled"
        >
          <ErrorBanner message={hata} />

          {bilgi ? (
            <View style={styles.info}>
              <Txt size={13} leading={1.45} color={colors.textBody}>
                {bilgi}
              </Txt>
            </View>
          ) : null}

          <Field label="E-posta">
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="elif@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              editable={adim === 'eposta'}
            />
          </Field>

          {adim === 'kod' ? (
            <>
              <Field label="Sıfırlama kodu">
                <Input
                  value={kod}
                  onChangeText={(v) => setKod(digits(v, UZUNLUK))}
                  placeholder="000000"
                  keyboardType="number-pad"
                  maxLength={UZUNLUK}
                  autoComplete="one-time-code"
                  textContentType="oneTimeCode"
                  style={styles.kod}
                />
              </Field>

              <Field label="Yeni parola">
                <Input
                  value={parola}
                  onChangeText={setParola}
                  placeholder={`En az ${MIN_PASSWORD} karakter`}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="new-password"
                />
              </Field>

              <Field label="Yeni parola (tekrar)">
                <Input
                  value={parolaTekrar}
                  onChangeText={setParolaTekrar}
                  placeholder="Aynısını bir daha yaz"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="new-password"
                  onSubmitEditing={degistir}
                />
              </Field>

              <Pressable onPress={() => void kodIste()} disabled={bekleme > 0} style={styles.tekrar}>
                <Txt weight="semibold" size={13} color={bekleme > 0 ? colors.faint : colors.blue500}>
                  {bekleme > 0 ? `Tekrar gönder (${bekleme})` : 'Kodu tekrar gönder'}
                </Txt>
              </Pressable>

              <Txt size={12.5} leading={1.55} color={colors.muted}>
                Kod on dakika geçerli. Parolanı değiştirdiğinde diğer
                cihazlardaki oturumların da kapanıyor.
              </Txt>
            </>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.submitBar, { paddingBottom: insets.bottom + 16 }]}>
        <PrimaryButton
          label={
            gonderiliyor
              ? 'Gönderiliyor…'
              : adim === 'eposta'
                ? 'Kod gönder'
                : 'Parolayı değiştir'
          }
          onPress={adim === 'eposta' ? kodIste : degistir}
          disabled={gonderiliyor}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  form: { paddingHorizontal: 20, paddingTop: 22, gap: 18 },
  kod: { fontSize: 24, letterSpacing: 8, textAlign: 'center' },
  tekrar: { paddingVertical: 6 },
  info: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  submitBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
});

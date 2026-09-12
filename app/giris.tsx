import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { authErrorMessage, signIn } from '../src/auth';
import { ErrorBanner, Field, Input } from '../src/components/AuthForm';
import { GlassButton, GradientHeader, PrimaryButton, Txt } from '../src/components/ui';
import { colors, gradients } from '../src/theme';

export default function LoginRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Katılma düğmesinden gelindiyse girişten sonra oraya dönülüyor; kullanıcıyı
  // giriş yaptıktan sonra ana ekrana bırakmak, başladığı işi unutturuyor.
  const { next } = useLocalSearchParams<{ next?: string }>();

  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  const submit = async () => {
    if (!email.trim() || !parola) {
      setHata('E-posta ve parolanızı yazın.');
      return;
    }
    setGonderiliyor(true);
    setHata(null);
    try {
      await signIn(email, parola);
      router.replace(next ? (next as never) : '/(tabs)/hesap');
    } catch (err) {
      setHata(authErrorMessage(err));
    } finally {
      setGonderiliyor(false);
    }
  };

  // Sıfırlama kendi ekranında: bağlantı yerine altı haneli kod, ve postayı
  // Firebase değil panel gönderiyor (bkz. `src/auth.ts`'teki not). `next`
  // taşınıyor — kullanıcı "katıl" düğmesinden geldiyse parolayı sıfırlayıp
  // girdikten sonra da oraya dönmeli, yoksa başladığı işi unutuyor.
  const sifremiUnuttum = () => {
    setHata(null);
    router.push({
      pathname: '/sifre-sifirla',
      params: { email: email.trim(), ...(next ? { next: String(next) } : {}) },
    });
  };

  return (
    <View style={styles.screen}>
      <GradientHeader gradient={gradients.section}>
        <View style={styles.headerRow}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
          <Txt weight="extrabold" size={20} color="#fff" style={{ marginLeft: 12 }}>
            Giriş yap
          </Txt>
        </View>
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

          <Field label="E-posta">
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="elif@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
            />
          </Field>

          <Field label="Parola">
            <Input
              value={parola}
              onChangeText={setParola}
              placeholder="Parolanız"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="current-password"
              onSubmitEditing={submit}
            />
          </Field>

          <Pressable onPress={sifremiUnuttum} style={styles.forgot}>
            <Txt weight="semibold" size={13} color={colors.blue500}>
              Parolamı unuttum
            </Txt>
          </Pressable>

          <Pressable onPress={() => router.replace('/kayit-ol')} style={styles.altLink}>
            <Txt size={13} color={colors.muted}>
              Hesabın yok mu?{' '}
              <Txt weight="semibold" size={13} color={colors.blue500}>
                Hesap oluştur
              </Txt>
            </Txt>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.submitBar, { paddingBottom: insets.bottom + 16 }]}>
        <PrimaryButton
          label={gonderiliyor ? 'Giriş yapılıyor…' : 'Giriş yap'}
          onPress={submit}
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
  forgot: { paddingVertical: 4 },
  altLink: { paddingVertical: 12, alignItems: 'center' },
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

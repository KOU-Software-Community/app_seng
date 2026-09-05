import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card, GlassButton, GradientHeader, PixelTxt, Txt } from '../src/components/ui';
import { PRIVACY_POLICY_URL } from '../src/data';
import { OFFICIAL_RULES, RAFFLE_CONTACT_EMAIL } from '../src/raffleLegal';
import { colors, gradients } from '../src/theme';

/**
 * Resmî Çekiliş Kuralları.
 *
 * Guideline 5.3.1 çekilişin kurallarının uygulama içinden ulaşılabilir olmasını
 * istiyor. Bir web bağlantısı yeterli sayılmayabiliyor — sayfa uygulamanın
 * içinde, çevrimdışıyken de açılıyor.
 *
 * İçerik burada değil `src/raffleLegal.ts`'te: aynı cümlelerin bir kısmı
 * çekiliş kartında da geçiyor ve iki kopya ayrışırdı.
 */
export default function RaffleRulesRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <GradientHeader gradient={gradients.section} bottomRadius={20} style={{ paddingBottom: 20 }}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
          <Txt weight="extrabold" size={23} color="#fff" tracking={-0.4} style={{ marginTop: 16 }}>
            Resmî Çekiliş Kuralları
          </Txt>
          <Txt size={13} color={colors.blue200} style={{ marginTop: 4 }}>
            Uygulamadaki bütün çekilişler için geçerlidir
          </Txt>
        </GradientHeader>

        <View style={styles.body}>
          {OFFICIAL_RULES.map((section) => (
            <Card key={section.heading} style={styles.card}>
              <PixelTxt size={8}>{section.heading.toLocaleUpperCase('tr')}</PixelTxt>
              {section.paragraphs.map((paragraph, index) => (
                <Txt
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  size={13.5}
                  leading={1.62}
                  color={colors.textBody}
                  style={{ marginTop: index === 0 ? 11 : 10 }}
                >
                  {paragraph}
                </Txt>
              ))}

              {section.heading === 'Kişisel veriler' ? (
                <Pressable
                  onPress={() => {
                    Linking.openURL(PRIVACY_POLICY_URL).catch(() => {});
                  }}
                  accessibilityRole="link"
                  style={({ pressed }) => [styles.link, pressed && { opacity: 0.6 }]}
                >
                  <Txt weight="bold" size={13} color={colors.blue500}>
                    Gizlilik politikası ve KVKK aydınlatma metni →
                  </Txt>
                </Pressable>
              ) : null}

              {section.heading === 'İletişim' ? (
                <Pressable
                  onPress={() => {
                    Linking.openURL(`mailto:${RAFFLE_CONTACT_EMAIL}`).catch(() => {});
                  }}
                  accessibilityRole="link"
                  style={({ pressed }) => [styles.link, pressed && { opacity: 0.6 }]}
                >
                  <Txt weight="bold" size={13} color={colors.blue500}>
                    E-posta gönder →
                  </Txt>
                </Pressable>
              ) : null}
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: 20, paddingTop: 18, gap: 12 },
  card: { padding: 16 },
  link: { paddingTop: 11, paddingBottom: 2 },
});

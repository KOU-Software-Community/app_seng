import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PhotoSlot } from '../src/components/PhotoSlot';
import {
  Card,
  ContentNotice,
  DottedRule,
  EmptyState,
  GlassButton,
  GradientHeader,
  PixelTxt,
  Txt,
} from '../src/components/ui';
import { SPONSOR_CONTACT_EMAIL } from '../src/data';
import { useSponsors } from '../src/sponsors';
import { colors, gradientDirection, gradients } from '../src/theme';

/**
 * Sponsorlarımız — tek liste, kademe yok; sıra panelden (büyük sponsorlar üstte).
 *
 * "Sponsor ol" kartı her durumda en altta: liste boşken de, okunamazken de —
 * kulübe ulaşmanın yolu listenin durumuna bağlı olmamalı.
 */
export default function SponsorsRoute() {
  const router = useRouter();
  const { sponsors, loading, error, refresh } = useSponsors();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      <GradientHeader gradient={gradients.section}>
        <View style={styles.titleRow}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
          <Txt weight="extrabold" size={20} color={colors.white}>
            Sponsorlarımız
          </Txt>
        </View>
        <Txt size={13} color={colors.white} style={{ opacity: 0.82, marginTop: 10 }}>
          Kulübün etkinliklerini destekleyen kurumlar.
        </Txt>
        <DottedRule style={{ marginTop: 14 }} />
      </GradientHeader>

      {error ? <ContentNotice onRetry={refresh} retrying={loading} /> : null}

      <View style={styles.body}>
        {sponsors.length ? (
          sponsors.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => router.push(`/sponsor/${s.id}`)}
              accessibilityRole="button"
              accessibilityLabel={s.sector ? `${s.name}, ${s.sector}` : s.name}
            >
              <Card style={styles.row}>
                <PhotoSlot uri={s.logo} resizeMode="contain" showLabel={false} style={styles.logo} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt weight="bold" size={15} numberOfLines={1}>
                    {s.name}
                  </Txt>
                  {s.sector ? (
                    <Txt size={12.5} color={colors.muted} style={{ marginTop: 3 }}>
                      {s.sector}
                    </Txt>
                  ) : null}
                </View>
                <Txt size={16} color={colors.faint}>
                  ›
                </Txt>
              </Card>
            </Pressable>
          ))
        ) : loading ? (
          <EmptyState title="Yükleniyor" body="Sponsorlar getiriliyor." />
        ) : error ? null : (
          <EmptyState title="Henüz sponsor yok" body="Kulübü destekleyen kurumlar burada listelenecek." />
        )}

        <JoinCard />
      </View>
    </ScrollView>
  );
}

function JoinCard() {
  return (
    <LinearGradient
      colors={gradients.home}
      start={gradientDirection.diagonal.start}
      end={gradientDirection.diagonal.end}
      style={styles.join}
    >
      <PixelTxt size={7} color={colors.blue200}>
        SPONSOR OL
      </PixelTxt>
      <Txt weight="extrabold" size={16} color={colors.white} style={{ marginTop: 10 }}>
        Kulübü desteklemek ister misin?
      </Txt>
      <Txt size={13} leading={1.5} color={colors.blue100} style={{ marginTop: 6 }}>
        Atölye, hackathon ya da teknik gezi için destek olabilirsin. Ekibimiz seninle iletişime geçer.
      </Txt>
      <Pressable
        onPress={() =>
          void Linking.openURL(`mailto:${SPONSOR_CONTACT_EMAIL}?subject=Sponsorluk`).catch(() => {})
        }
        accessibilityRole="button"
        accessibilityLabel="İletişime geç, e-posta yaz"
        style={({ pressed }) => [styles.joinButton, pressed && { opacity: 0.85 }]}
      >
        <Txt weight="bold" size={14} color={colors.navy900}>
          İletişime geç
        </Txt>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  body: { paddingHorizontal: 20, paddingTop: 16, gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { width: 56, height: 56, borderRadius: 12, backgroundColor: colors.bg },
  join: { borderRadius: 16, padding: 18, marginTop: 6 },
  joinButton: {
    marginTop: 14,
    backgroundColor: colors.white,
    borderRadius: 11,
    paddingVertical: 12,
    alignItems: 'center',
  },
});

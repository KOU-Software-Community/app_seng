import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PhotoSlot } from '../../src/components/PhotoSlot';
import {
  Card,
  ContentNotice,
  EmptyState,
  GlassButton,
  GradientHeader,
  PrimaryButton,
  Tag,
  Txt,
} from '../../src/components/ui';
import { useContent } from '../../src/content';
import { useSponsors } from '../../src/sponsors';
import { colors, gradients, radius, shadow } from '../../src/theme';
import { useOpenEvent } from '../../src/useOpenEvent';
import { sponsorEvents } from '../../src/vitrinSchema';

/**
 * Kurum detayı. Sayfanın başlığı kurumun adı; bulunduğunda görünen hiçbir
 * metin "sponsor" kelimesini taşımıyor. Çekiliş etkinliğinden "Ödülü sağlayan"
 * etiketiyle buraya gelinebiliyor ve Apple 5.3.2 çekilişin sponsorunun
 * geliştirici olmasını istiyor — `raffleLegal.ts`.
 */
export default function SponsorRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { get, loading, error, refresh } = useSponsors();
  const { events, archive, getRaffle } = useContent();
  const openEvent = useOpenEvent();
  const sponsor = get(id);

  const header = (
    <GradientHeader gradient={gradients.form} style={{ paddingBottom: 64 }}>
      <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
    </GradientHeader>
  );

  if (!sponsor) {
    return (
      <View style={styles.screen}>
        {header}
        {loading ? (
          <EmptyState title="Yükleniyor" body="Kurum bilgileri getiriliyor." />
        ) : error ? (
          <ContentNotice onRetry={refresh} retrying={loading} />
        ) : (
          <EmptyState
            title="Sponsor bulunamadı"
            body="Bu kurum listeden kaldırılmış ya da bağlantı eskimiş olabilir."
            ctaLabel="Geri dön"
            onPress={() => router.back()}
          />
        )}
      </View>
    );
  }

  const rows = sponsorEvents(sponsor, events, archive, (eventId) => !!getRaffle(eventId));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      {header}

      <Card style={styles.hero}>
        <PhotoSlot uri={sponsor.logo} resizeMode="contain" showLabel={false} style={styles.logo} />
        <Txt weight="extrabold" size={22} color={colors.navy900} style={{ marginTop: 14 }}>
          {sponsor.name}
        </Txt>
        {sponsor.sector ? <Tag label={sponsor.sector} style={{ alignSelf: 'flex-start', marginTop: 10 }} /> : null}
        {sponsor.description ? (
          <Txt size={14.5} leading={1.68} color={colors.textBody} style={{ marginTop: 12 }}>
            {sponsor.description}
          </Txt>
        ) : null}
      </Card>

      {rows.length ? (
        <View style={styles.block}>
          <Txt weight="extrabold" size={16} color={colors.navy900} style={{ marginBottom: 10 }}>
            Desteklediği etkinlikler
          </Txt>
          <View style={{ gap: 10 }}>
            {rows.map(({ event, upcoming, prize }) => (
              <Pressable
                key={event.id}
                onPress={() => openEvent(event.id)}
                accessibilityRole="button"
                accessibilityLabel={[event.title, upcoming ? null : 'geçmiş etkinlik', prize ? 'ödülü sağlayan' : null]
                  .filter(Boolean)
                  .join(', ')}
                style={({ pressed }) => [styles.eventRow, pressed && { borderColor: colors.blue200 }]}
              >
                <View style={[styles.bar, { backgroundColor: upcoming ? colors.blue500 : colors.blue200 }]} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt weight="bold" size={14.5} color={colors.text}>
                    {event.title}
                  </Txt>
                  <Txt size={12.5} color={colors.muted} style={{ marginTop: 3 }}>
                    {event.short}
                  </Txt>
                  {prize ? <Tag label="Ödülü sağlayan" style={{ alignSelf: 'flex-start', marginTop: 8 }} /> : null}
                </View>
                <Txt size={16} color={colors.faint}>
                  ›
                </Txt>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      {sponsor.url ? (
        <View style={styles.block}>
          <PrimaryButton label="Web sitesine git" onPress={() => void Linking.openURL(sponsor.url!).catch(() => {})} />
          {sponsor.host ? (
            <Txt size={12} color={colors.faint} style={{ textAlign: 'center', marginTop: 8 }}>
              {sponsor.host}
            </Txt>
          ) : null}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: { marginTop: -48, marginHorizontal: 20, padding: 18, ...shadow.card },
  logo: { width: 88, height: 88, borderRadius: 16, backgroundColor: colors.bg },
  block: { paddingHorizontal: 20, paddingTop: 22 },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 14,
  },
  bar: { width: 4, alignSelf: 'stretch', borderRadius: 2 },
});

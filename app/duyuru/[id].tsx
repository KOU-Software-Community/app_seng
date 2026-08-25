import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Announcement,
  fetchAnnouncement,
  formatAnnouncementDate,
  useAnnouncements,
} from '../../src/announcements';
import { RichText } from '../../src/components/RichText';
import { EmptyState, GlassButton, GradientHeader, Txt } from '../../src/components/ui';
import { colors, gradients } from '../../src/theme';

export default function AnnouncementRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { get } = useAnnouncements();

  const fromList = get(id);
  const [fetched, setFetched] = useState<Announcement | null>(null);
  const [missing, setMissing] = useState(false);

  // The list already carries the full body, so the common path needs no request.
  // A link from outside it — an old notification, a shared URL — falls back to
  // the by-id endpoint rather than showing "not found" for something that exists.
  useEffect(() => {
    if (fromList || !id) return;
    let cancelled = false;
    fetchAnnouncement(String(id))
      .then((result) => {
        if (cancelled) return;
        if (result) setFetched(result);
        else setMissing(true);
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [fromList, id]);

  const announcement = fromList ?? fetched;

  if (!announcement) {
    return (
      <View style={styles.screen}>
        <GradientHeader gradient={gradients.section} style={{ paddingBottom: 20 }}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
        </GradientHeader>
        {missing ? (
          <EmptyState
            title="Duyuru bulunamadı"
            body="Bu duyuru kaldırılmış ya da bağlantı eskimiş olabilir."
            ctaLabel="Ana sayfaya dön"
            onPress={() => router.replace('/(tabs)')}
          />
        ) : (
          <EmptyState title="Yükleniyor" body="Duyuru getiriliyor." />
        )}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <GradientHeader gradient={gradients.section} style={{ paddingBottom: 22 }}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />

          <View style={styles.kicker}>
            <Txt weight="bold" size={10.5} color={colors.blue200} tracking={0.6}>
              {announcement.category.toLocaleUpperCase('tr')}
            </Txt>
          </View>

          <Txt weight="extrabold" size={23} leading={1.25} color="#fff" tracking={-0.4}>
            {announcement.title}
          </Txt>

          <Txt size={12.5} color={colors.blue200} style={{ marginTop: 8 }}>
            {[announcement.author, formatAnnouncementDate(announcement.createdAt)]
              .filter(Boolean)
              .join(' · ')}
          </Txt>
        </GradientHeader>

        <View style={styles.body}>
          {/* The body is HTML from the club's web editor; RichText turns it into
              text the app can actually draw. */}
          <RichText html={announcement.content} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  kicker: { marginTop: 16, marginBottom: 6 },
  body: { paddingHorizontal: 20, paddingTop: 22 },
});

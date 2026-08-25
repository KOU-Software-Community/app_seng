import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Modal, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PhotoSlot } from '../../src/components/PhotoSlot';
import {
  ContentNotice,
  DottedRule,
  EmptyState,
  FilterChip,
  GlassButton,
  GradientHeader,
  PixelTxt,
  Txt,
} from '../../src/components/ui';
import { useContent } from '../../src/content';
import { ARCHIVE_CATEGORIES, ARCHIVE_TOTALS, ArchiveEntry } from '../../src/data';
import { colors, gradients, radius } from '../../src/theme';

/** Photos per archived event in the viewer. */
const PHOTOS_PER_ENTRY = 4;

export default function ArsivRoute() {
  const router = useRouter();
  const { archive, error, loading, refresh } = useContent();
  const [category, setCategory] = useState('Tümü');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [photo, setPhoto] = useState(0);

  const entries = useMemo(
    () =>
      archive.map((a, i) => ({ ...a, index: i })).filter(
        (a) => category === 'Tümü' || a.cat === category,
      ),
    [archive, category],
  );

  const open = openIndex !== null ? (archive[openIndex] ?? null) : null;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.blue500} />
        }
      >
        <GradientHeader gradient={gradients.section} style={{ paddingBottom: 16 }}>
          <Txt weight="extrabold" size={24} color="#fff" tracking={-0.5}>
            Etkinlik Arşivi
          </Txt>
          <Txt size={12.5} color={colors.blue200} style={{ marginTop: 4 }}>
            2023&apos;ten bugüne {ARCHIVE_TOTALS.events} etkinlik · {ARCHIVE_TOTALS.photos} fotoğraf
          </Txt>
          <DottedRule style={{ marginTop: 12 }} />
        </GradientHeader>

        {error ? <ContentNotice onRetry={refresh} retrying={loading} /> : null}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {ARCHIVE_CATEGORIES.map((c) => (
            <FilterChip key={c} label={c} active={c === category} onPress={() => setCategory(c)} />
          ))}
        </ScrollView>

        {entries.length === 0 ? (
          <EmptyState
            title="Bu kategoride henüz arşiv yok"
            body={`İlk ${category.toLocaleLowerCase('tr')} etkinliğimiz bu dönem planlanıyor. Bildirimleri açarsan duyurulduğunda haber veririz.`}
            ctaLabel="Bildirimleri aç"
            onPress={() => router.navigate('/(tabs)/bildirim')}
          />
        ) : (
          <View style={styles.grid}>
            {entries.map((entry) => (
              <ArchiveCard
                key={entry.title}
                entry={entry}
                onPress={() => {
                  setOpenIndex(entry.index);
                  setPhoto(0);
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <Lightbox
        entry={open}
        photo={photo}
        onPrev={() => setPhoto((p) => (p + PHOTOS_PER_ENTRY - 1) % PHOTOS_PER_ENTRY)}
        onNext={() => setPhoto((p) => (p + 1) % PHOTOS_PER_ENTRY)}
        onClose={() => setOpenIndex(null)}
      />
    </View>
  );
}

function ArchiveCard({ entry, onPress }: { entry: ArchiveEntry; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, { transform: [{ translateY: pressed ? -2 : 0 }] }]}
    >
      <PhotoSlot label="Foto" style={styles.cardPhoto}>
        <View style={styles.yearBadge}>
          <PixelTxt size={6} color={colors.onNavy}>
            {entry.year}
          </PixelTxt>
        </View>
        <View style={styles.countBadge}>
          <Txt weight="semibold" size={10} color="#fff">
            {entry.count} foto
          </Txt>
        </View>
      </PhotoSlot>

      <View style={styles.cardBody}>
        <Txt weight="bold" size={13.5} leading={1.3} color={colors.text} tracking={-0.2}>
          {entry.title}
        </Txt>
        <Txt size={11.5} color={colors.muted} style={{ marginTop: 5 }}>
          {entry.date} · {entry.cat}
        </Txt>
      </View>
    </Pressable>
  );
}

function Lightbox({
  entry,
  photo,
  onPrev,
  onNext,
  onClose,
}: {
  entry: ArchiveEntry | null;
  photo: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={!!entry}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.lightbox}>
        <View style={[styles.lightboxBar, { paddingTop: insets.top + 12 }]}>
          <GlassButton
            label="✕"
            accessibilityLabel="Kapat"
            onPress={onClose}
            size={36}
            bg="rgba(255,255,255,0.12)"
          />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Txt weight="bold" size={14} color="#fff" numberOfLines={1}>
              {entry?.title}
            </Txt>
            <Txt size={11.5} color={colors.blue200}>
              {entry ? `${entry.date} · ${entry.cat}` : ''}
            </Txt>
          </View>
          <PixelTxt size={8} color={colors.blue200}>
            {photo + 1} / {PHOTOS_PER_ENTRY}
          </PixelTxt>
        </View>

        <View style={styles.lightboxStage}>
          <PhotoSlot
            label="Arşiv fotoğrafı"
            gradient={gradients.lightbox}
            style={styles.lightboxPhoto}
          />
        </View>

        <View style={[styles.lightboxNav, { paddingBottom: insets.bottom + 24 }]}>
          <GlassButton label="‹" accessibilityLabel="Önceki fotoğraf" onPress={onPrev} size={44} />
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {Array.from({ length: PHOTOS_PER_ENTRY }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.lbDot,
                  i === photo
                    ? { width: 18, backgroundColor: colors.blue200 }
                    : { width: 6, backgroundColor: 'rgba(147,203,220,0.35)' },
                ]}
              />
            ))}
          </View>
          <GlassButton label="›" accessibilityLabel="Sonraki fotoğraf" onPress={onNext} size={44} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  chips: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4, gap: 8 },

  grid: {
    paddingHorizontal: 20,
    paddingTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  card: {
    width: '48.5%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    shadowColor: '#001B4A',
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardPhoto: { height: 112 },
  cardBody: { paddingHorizontal: 12, paddingTop: 11, paddingBottom: 13 },
  yearBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,27,74,0.72)',
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: radius.xs,
  },
  countBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,27,74,0.72)',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: radius.xs,
  },


  lightbox: { flex: 1, backgroundColor: 'rgba(2,10,26,0.94)' },
  lightboxBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  lightboxStage: { flex: 1, justifyContent: 'center', paddingHorizontal: 18 },
  lightboxPhoto: { width: '100%', aspectRatio: 4 / 5, borderRadius: radius.xl },
  lightboxNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingTop: 18,
  },
  lbDot: { height: 6, borderRadius: 3 },
});

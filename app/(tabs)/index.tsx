import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PixelIcon } from '../../src/components/Pixel';
import {
  DottedRule,
  EmptyState,
  PixelBadge,
  SectionTitle,
  Txt,
} from '../../src/components/ui';
import { useContent } from '../../src/content';
import { ARCHIVE_TOTALS, FEATURED, FEED, FeaturedCard, FeedItem } from '../../src/data';
import { useAppStore } from '../../src/store';
import { colors, gradientDirection, gradients, radius, shadow } from '../../src/theme';
import { useOpenEvent } from '../../src/useOpenEvent';

const CARD_WIDTH = 272;
const CARD_GAP = 12;

export default function HomeRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const openEvent = useOpenEvent();
  const { registrations } = useAppStore();
  const { events } = useContent();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={gradients.home}
        start={gradientDirection.diagonal.start}
        end={gradientDirection.diagonal.end}
        style={[styles.header, { paddingTop: insets.top + 14 }]}
      >
        <View style={styles.identity}>
          <Image source={require('../../assets/brand/logo.png')} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Txt weight="semibold" size={11.5} color={colors.blue200} tracking={0.3}>
              Hoş geldin 👋
            </Txt>
            <Txt weight="bold" size={16.5} color="#fff" tracking={-0.3}>
              KOÜ Yazılım Kulübü
            </Txt>
          </View>

          <Pressable
            onPress={() => router.navigate('/(tabs)/bildirim')}
            accessibilityRole="button"
            accessibilityLabel="Bildirim ayarları"
            style={({ pressed }) => [styles.bell, { opacity: pressed ? 0.7 : 1 }]}
          >
            <PixelIcon name="bell" size={16} color={colors.onNavy} />
            {/* The red dot used to be unconditional, so it always claimed there
                was something unread. Nothing tracks read state, so there is
                nothing honest to show here until something does. */}
          </Pressable>
        </View>

        <View style={styles.stats}>
          <Stat value={String(events.length)} label="Yaklaşan etkinlik" />
          <Stat value={String(registrations.length)} label="Kaydın var" />
          <Stat value={String(ARCHIVE_TOTALS.events)} label="Arşiv etkinliği" />
        </View>

        <DottedRule style={{ marginTop: 16 }} />
      </LinearGradient>

      {/* Both lists are editorial content about upcoming events, so between
          terms they empty out together. One empty state beats two headings with
          nothing underneath them. */}
      {FEATURED.length === 0 && FEED.length === 0 ? (
        <EmptyState
          title="Yeni dönem hazırlanıyor"
          body="Kulübün yaklaşan etkinlikleri henüz açıklanmadı. Bildirimleri açarsan program belli olduğunda haber veririz."
          ctaLabel="Bildirimleri aç"
          onPress={() => router.navigate('/(tabs)/bildirim')}
        />
      ) : (
        <>
          <SectionTitle
            icon="grid"
            trailing={
              <Txt weight="semibold" size={12} color={colors.blue500}>
                {FEATURED.length} kart
              </Txt>
            }
          >
            Öne Çıkanlar
          </SectionTitle>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + CARD_GAP}
            decelerationRate="fast"
            contentContainerStyle={styles.carousel}
          >
            {FEATURED.map((card) => (
              <FeaturedTile key={card.kicker} card={card} onPress={() => openEvent(card.id)} />
            ))}
          </ScrollView>

          <SectionTitle icon="lines">Akış</SectionTitle>

          <View style={styles.feed}>
            {FEED.map((item) => (
              <FeedRow key={item.title} item={item} onPress={() => openEvent(item.id)} />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Txt weight="extrabold" size={19} color="#fff">
        {value}
      </Txt>
      <Txt weight="semibold" size={10.5} color={colors.blue200}>
        {label}
      </Txt>
    </View>
  );
}

function FeaturedTile({ card, onPress }: { card: FeaturedCard; onPress: () => void }) {
  const body = (
    <View style={styles.featuredBody}>
      <PixelBadge icon={card.icon} label={card.kicker} bg={card.badgeBg} fg={card.badgeFg} />

      <Txt weight="extrabold" size={17} leading={1.25} color={card.fg} tracking={-0.3} style={{ marginTop: 14 }}>
        {card.title}
      </Txt>
      <Txt size={12.5} leading={1.45} color={card.sub} style={{ marginTop: 6 }}>
        {card.body}
      </Txt>

      <View style={{ flex: 1 }} />

      <View style={styles.featuredFooter}>
        <Txt weight="bold" size={11.5} color={card.sub}>
          {card.meta}
        </Txt>
        <Txt weight="bold" size={12} color={card.fg}>
          Detay →
        </Txt>
      </View>
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.featured,
        shadow.featured,
        { transform: [{ translateY: pressed ? -2 : 0 }] },
      ]}
    >
      {typeof card.bg === 'string' ? (
        <View style={[styles.featuredFill, { backgroundColor: card.bg }]}>{body}</View>
      ) : (
        <LinearGradient
          colors={card.bg}
          start={gradientDirection.diagonal.start}
          end={gradientDirection.diagonal.end}
          style={styles.featuredFill}
        >
          {body}
        </LinearGradient>
      )}
    </Pressable>
  );
}

function FeedRow({ item, onPress }: { item: FeedItem; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.feedRow,
        pressed && { borderColor: colors.blue200, ...shadow.card },
      ]}
    >
      <View style={[styles.dateTile, { backgroundColor: item.tint }]}>
        <Txt weight="extrabold" size={15} color={colors.navy900} style={{ lineHeight: 15 }}>
          {item.day}
        </Txt>
        <Txt weight="bold" size={8.5} color={colors.navy700} tracking={0.6}>
          {item.mon}
        </Txt>
      </View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={styles.feedTags}>
          <Txt weight="bold" size={10.5} color={colors.blue500} tracking={0.4}>
            {item.tag.toLocaleUpperCase('tr')}
          </Txt>
          {item.isNew ? (
            <PixelBadge icon="star" label="YENI" bg={colors.blue100} fg={colors.navy700} size={6} />
          ) : null}
        </View>

        <Txt weight="bold" size={15} leading={1.3} color={colors.text} tracking={-0.2} style={{ marginTop: 4 }}>
          {item.title}
        </Txt>
        <Txt size={12.5} color={colors.muted} style={{ marginTop: 4 }}>
          {item.meta}
        </Txt>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  bell: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.13)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stats: { flexDirection: 'row', gap: 8, marginTop: 18 },
  stat: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  carousel: { paddingHorizontal: 20, paddingTop: 2, paddingBottom: 6, gap: CARD_GAP },
  featured: { width: CARD_WIDTH, borderRadius: radius.xl },
  // Cards in the rail stretch to the tallest one, so the fill has to grow with it
  // or the shorter cards show page background under their content.
  featuredFill: { flex: 1, borderRadius: radius.xl, overflow: 'hidden' },
  featuredBody: { padding: 16, paddingBottom: 18, minHeight: 150 },
  featuredFooter: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  feed: { paddingHorizontal: 20, gap: 10 },
  feedRow: {
    flexDirection: 'row',
    gap: 13,
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 14,
  },
  dateTile: {
    width: 46,
    height: 46,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  feedTags: { flexDirection: 'row', alignItems: 'center', gap: 7 },
});

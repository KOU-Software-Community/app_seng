import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeSlider } from '../../src/components/HomeSlider';
import { PhotoSlot } from '../../src/components/PhotoSlot';
import { PixelIcon } from '../../src/components/Pixel';
import {
  Card,
  ContentNotice,
  DottedRule,
  PixelBadge,
  SectionTitle,
  Txt,
} from '../../src/components/ui';
import {
  Announcement,
  formatAnnouncementDate,
  useAnnouncements,
} from '../../src/announcements';
import { useContent } from '../../src/content';
import { ClubEvent } from '../../src/data';
import { useSlides } from '../../src/slides';
import { useSponsors } from '../../src/sponsors';
import { useAppStore } from '../../src/store';
import { colors, gradientDirection, gradients, radius, shadow } from '../../src/theme';
import { useOpenEvent } from '../../src/useOpenEvent';

/** Ana sayfa yarı etkinlik yarı duyuru; her bölüm bu kadar satır gösteriyor. */
const EVENT_COUNT = 3;
const ANNOUNCEMENT_COUNT = 3;

export default function HomeRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const openEvent = useOpenEvent();
  const { registrations } = useAppStore();
  const { events, archive, error, loading, refresh } = useContent();
  const {
    announcements,
    error: announcementsError,
    loading: announcementsLoading,
    refresh: refreshAnnouncements,
  } = useAnnouncements();
  const { slides, error: slidesError, refresh: refreshSlides } = useSlides();
  const { sponsors, error: sponsorsError, refresh: refreshSponsors } = useSponsors();

  // Aşağı çekmek ana sayfadaki her şeyi yeniler. Duyurular daha önce burada
  // yenilenmiyordu; çeken kişi hepsinin tazelendiğini sanıyordu.
  const onRefresh = () => {
    refresh();
    refreshSlides();
    refreshSponsors();
    refreshAnnouncements();
  };

  const upcoming = events.slice(0, EVENT_COUNT);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          // blue200 açık zeminde görünmüyordu. `tintColor` yalnız iOS; Android `colors` okuyor.
          tintColor={colors.blue500}
          colors={[colors.blue500]}
        />
      }
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

          {/*
            QR yoklaması ana sayfadan da açılıyor.

            Tek giriş etkinlik ekranıydı: öğrenci salonda telefonu açıyor,
            önce doğru etkinliği bulması, sonra oradaki düğmeyi görmesi
            gerekiyordu. Sekme çubuğuna altıncı bir sekme koymak yerine
            buraya kondu — yoklama günde bir kez yapılan bir eylem, kalıcı bir
            sekme değil. Etkinlik ekranındaki düğme DURUYOR: oradan gelen
            okutma `eventId` taşıyor ve yanlış etkinliğin kodunu reddediyor.
          */}
          <Pressable
            onPress={() => router.push('/qr')}
            accessibilityRole="button"
            accessibilityLabel="QR ile yoklama"
            style={({ pressed }) => [styles.bell, { opacity: pressed ? 0.7 : 1 }]}
          >
            <PixelIcon name="qr" size={16} color={colors.onNavy} />
          </Pressable>

          <Pressable
            onPress={() => router.push('/bildirim-ayarlari')}
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
          {/* Sabit 38'di ve hiçbir şeyden türemiyordu. Artık gerçekten arşivde
              olan etkinlik sayısı. */}
          <Stat value={String(archive.length)} label="Arşiv etkinliği" />
        </View>

        <DottedRule style={{ marginTop: 16 }} />
      </LinearGradient>

      {error ? <ContentNotice onRetry={refresh} retrying={loading} /> : null}

      {/* Hata ya da boşken hiç çizilmiyor: bir süs, ana sayfayı bekletmemeli. */}
      {!slidesError ? <HomeSlider slides={slides} /> : null}

      {!sponsorsError && sponsors.length ? (
        <>
          <SectionTitle
            icon="grid"
            style={{ paddingTop: 20 }}
            trailing={
              <Pressable
                onPress={() => router.push('/sponsorlar')}
                accessibilityRole="button"
                accessibilityLabel="Tüm sponsorlar"
              >
                <Txt weight="semibold" size={12} color={colors.blue500}>
                  Tümü →
                </Txt>
              </Pressable>
            }
          >
            Sponsorlarımız
          </SectionTitle>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sponsorRail}>
            {sponsors.map((s) => (
              <Pressable
                key={s.id}
                onPress={() => router.push(`/sponsor/${s.id}`)}
                accessibilityRole="button"
                accessibilityLabel={s.name}
              >
                <Card style={styles.sponsorCard}>
                  <PhotoSlot uri={s.logo} resizeMode="contain" showLabel={false} style={styles.sponsorLogo} />
                  <Txt weight="bold" size={12} numberOfLines={1} style={{ marginTop: 8 }}>
                    {s.name}
                  </Txt>
                </Card>
              </Pressable>
            ))}
            <Pressable
              onPress={() => router.push('/sponsorlar')}
              accessibilityRole="button"
              accessibilityLabel="Sponsor ol"
              style={({ pressed }) => [styles.sponsorJoin, pressed && { opacity: 0.7 }]}
            >
              <Txt weight="bold" size={18} color={colors.blue500}>
                +
              </Txt>
              <Txt weight="bold" size={12} color={colors.blue500}>
                Sponsor ol
              </Txt>
            </Pressable>
          </ScrollView>
        </>
      ) : null}

      <SectionTitle
        icon="lines"
        trailing={
          <Pressable onPress={() => router.navigate('/(tabs)/takvim')} accessibilityRole="button">
            <Txt weight="semibold" size={12} color={colors.blue500}>
              Takvim →
            </Txt>
          </Pressable>
        }
      >
        Yaklaşan Etkinlikler
      </SectionTitle>

      {upcoming.length ? (
        <View style={styles.feed}>
          {upcoming.map((event) => (
            <EventRow key={event.id} event={event} onPress={() => openEvent(event.id)} />
          ))}
        </View>
      ) : (
        <SectionEmpty
          text={
            error
              ? 'Etkinlikler yüklenemedi. Aşağı çekerek tekrar deneyebilirsin.'
              : 'Yeni dönemin programı henüz açıklanmadı.'
          }
        />
      )}

      <SectionTitle icon="star">Duyurular</SectionTitle>

      {announcements.length ? (
        <View style={styles.feed}>
          {announcements.slice(0, ANNOUNCEMENT_COUNT).map((item) => (
            <AnnouncementRow
              key={item.id}
              item={item}
              onPress={() => router.navigate(`/duyuru/${item.id}`)}
            />
          ))}
        </View>
      ) : (
        <SectionEmpty
          text={
            announcementsError
              ? 'Duyurulara ulaşılamadı. Kulüp sitesi yanıt vermiyor olabilir.'
              : announcementsLoading
                ? 'Duyurular yükleniyor…'
                : 'Şu an yayınlanmış duyuru yok.'
          }
        />
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

function SectionEmpty({ text }: { text: string }) {
  // Deliberately not the full EmptyState: two mascots stacked on one screen is
  // heavier than the situation warrants when a section is simply quiet.
  return (
    <View style={styles.sectionEmpty}>
      <Txt size={13} leading={1.5} color={colors.muted}>
        {text}
      </Txt>
    </View>
  );
}

function EventRow({ event, onPress }: { event: ClubEvent; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.feedRow,
        pressed && { borderColor: colors.blue200, ...shadow.card },
      ]}
    >
      <View style={[styles.dateTile, { backgroundColor: colors.blue100 }]}>
        <Txt weight="extrabold" size={15} color={colors.navy900} style={{ lineHeight: 15 }}>
          {event.day}
        </Txt>
        <Txt weight="bold" size={8.5} color={colors.navy700} tracking={0.6}>
          {event.mon}
        </Txt>
      </View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={styles.feedTags}>
          <Txt weight="bold" size={10.5} color={colors.blue500} tracking={0.4}>
            {event.tag.toLocaleUpperCase('tr')}
          </Txt>
          {event.soon ? (
            <PixelBadge icon="clock" label="SON GUN" bg={colors.blue100} fg={colors.navy700} size={6} />
          ) : null}
        </View>

        <Txt weight="bold" size={15} leading={1.3} color={colors.text} tracking={-0.2} style={{ marginTop: 4 }}>
          {event.title}
        </Txt>
        <Txt size={12.5} color={colors.muted} style={{ marginTop: 4 }}>
          {event.short}
        </Txt>
      </View>
    </Pressable>
  );
}

function AnnouncementRow({ item, onPress }: { item: Announcement; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.feedRow,
        pressed && { borderColor: colors.blue200, ...shadow.card },
      ]}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={styles.feedTags}>
          <Txt weight="bold" size={10.5} color={colors.blue500} tracking={0.4}>
            {item.category.toLocaleUpperCase('tr')}
          </Txt>
          <Txt size={11} color={colors.faint}>
            {formatAnnouncementDate(item.createdAt)}
          </Txt>
        </View>

        <Txt weight="bold" size={15} leading={1.3} color={colors.text} tracking={-0.2} style={{ marginTop: 4 }}>
          {item.title}
        </Txt>

        {/* The summary is already plain text; the HTML body only appears on the
            detail screen, where RichText can draw it properly. */}
        {item.summary ? (
          <Txt size={12.5} leading={1.45} color={colors.muted} numberOfLines={2} style={{ marginTop: 4 }}>
            {item.summary}
          </Txt>
        ) : null}
      </View>

      <Txt size={12} color={colors.blue200}>
        ›
      </Txt>
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
  identity: { flexDirection: 'row', alignItems: 'center', gap: 8 },
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

  sectionEmpty: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 10 },

  sponsorRail: { paddingHorizontal: 20, gap: 10 },
  // 112 − 2 kenarlık − 2×10 boşluk = 90: logo tam oturuyor.
  sponsorCard: { width: 112, borderRadius: radius.lg, padding: 10 },
  sponsorLogo: { width: 90, height: 56, borderRadius: 9, backgroundColor: colors.bg },
  // Satırın çapraz ekseni `stretch`: kart diğerleriyle aynı boyda.
  sponsorJoin: {
    width: 112,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.blue200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
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

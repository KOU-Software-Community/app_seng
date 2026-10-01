import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { MonthCalendar } from '../../src/components/MonthCalendar';
import {
  ContentNotice,
  DottedRule,
  EmptyState,
  GradientHeader,
  GroupLabel,
  PixelBadge,
  Txt,
} from '../../src/components/ui';
import { useContent } from '../../src/content';
import { ClubEvent } from '../../src/data';
import { monthOrder } from '../../src/eventSchema';
import { useAppStore } from '../../src/store';
import { PixelRefresh, hiddenSpinner } from '../../src/components/Pixel';
import { colors, gradients, radius, shadow } from '../../src/theme';
import { useOpenEvent } from '../../src/useOpenEvent';

export default function TakvimRoute() {
  const router = useRouter();
  const openEvent = useOpenEvent();
  const { events, error, loading, refresh } = useContent();
  const hasEvents = events.length > 0;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={refresh} {...hiddenSpinner} />
        }
      >
        <GradientHeader gradient={gradients.calendar}>
          <Txt weight="extrabold" size={24} color="#fff" tracking={-0.5}>
            Etkinlik Takvimi
          </Txt>
          <Txt size={12.5} color={colors.blue200} style={{ marginTop: 4 }}>
            {/* The month range used to be hardcoded to "Mart – Nisan 2026" and was
                still on screen months after those events had passed. */}
            {hasEvents ? `${events.length} etkinlik` : 'Şu an planlanmış etkinlik yok'}
          </Txt>

          <DottedRule style={{ marginTop: 12 }} />
        </GradientHeader>

        {error ? <ContentNotice onRetry={refresh} retrying={loading} /> : null}

        {/* Ay takvimi her zaman görünüyor — boşken de; altında liste ya da boş kart.
            Liste/Takvim düğmesi bu yüzden yok. */}
        <View style={styles.calendar}>
          <MonthCalendar events={events} onOpen={openEvent} />
        </View>

        {!hasEvents ? (
          // An empty calendar and a failed fetch look the same on screen, so the
          // copy has to say which one it is — otherwise a connection problem reads
          // as "the club has nothing planned".
          error ? (
            <EmptyState
              title="Etkinlikler yüklenemedi"
              body="Bağlantı kurulduğunda program burada görünecek. Yukarıdan yenileyebilir ya da aşağı çekebilirsin."
            />
          ) : (
            <EmptyState
              title="Takvim henüz boş"
              body="Yeni dönemin etkinlikleri planlanıyor. Bildirimleri açarsan program açıklandığında ilk sen haberdar olursun."
              ctaLabel="Bildirimleri aç"
              onPress={() => router.push('/bildirim-ayarlari')}
            />
          )
        ) : (
          <ListView onOpen={openEvent} />
        )}
      </ScrollView>
      <PixelRefresh visible={loading} />
    </View>
  );
}

function ListView({ onOpen }: { onOpen: (id: string) => void }) {
  const { events } = useContent();
  // Derived from the events themselves. A hand-maintained MONTH_ORDER meant an
  // event in a month nobody had listed simply never appeared.
  const months = useMemo(() => monthOrder(events), [events]);

  return (
    <View style={styles.list}>
      {months.map((month) => {
        const items = events.filter((e) => e.monthKey === month);
        if (!items.length) return null;
        return (
          <View key={month}>
            <GroupLabel style={{ marginBottom: 12 }}>{month}</GroupLabel>
            <View style={{ gap: 10 }}>
              {items.map((e) => (
                <EventRow key={e.id} event={e} onPress={() => onOpen(e.id)} />
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function EventRow({ event, onPress }: { event: ClubEvent; onPress: () => void }) {
  const { registrationFor } = useAppStore();
  const registration = registrationFor(event.id);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.eventRow,
        pressed && { borderColor: colors.blue200, ...shadow.card },
      ]}
    >
      <View style={styles.dateColumn}>
        <Txt weight="extrabold" size={22} color={colors.navy900} style={{ lineHeight: 22 }}>
          {event.day}
        </Txt>
        <Txt weight="bold" size={9.5} color={colors.blue500} tracking={0.7} style={{ marginTop: 2 }}>
          {event.mon}
        </Txt>
        <Txt size={10} color={colors.faint} style={{ marginTop: 3 }}>
          {event.wd}
        </Txt>
      </View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <Txt weight="bold" size={15.5} leading={1.3} color={colors.text} tracking={-0.2}>
          {event.title}
        </Txt>
        <Txt size={12.5} color={colors.muted} style={{ marginTop: 5 }}>
          {event.time}
        </Txt>

        <View style={styles.rowTags}>
          <View style={styles.tagPill}>
            <Txt weight="bold" size={10.5} color={colors.navy700}>
              {event.tag}
            </Txt>
          </View>

          {event.soon ? (
            <PixelBadge icon="clock" label="SON GUN" bg={colors.blue500} fg="#fff" size={6} />
          ) : null}

          {registration ? (
            <View style={styles.registeredPill}>
              <Txt weight="bold" size={10.5} color={colors.blue500}>
                {registration.synced ? 'Kayıtlısın' : 'Gönderiliyor'}
              </Txt>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  calendar: { paddingHorizontal: 20, paddingTop: 20 },

  list: { padding: 20, gap: 22 },
  eventRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 14,
  },
  dateColumn: {
    width: 54,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingRight: 12,
  },
  rowTags: { marginTop: 9, flexDirection: 'row', gap: 6, alignItems: 'center', flexWrap: 'wrap' },
  tagPill: {
    backgroundColor: colors.blue100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  registeredPill: {
    borderWidth: 1,
    borderColor: colors.blue200,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
});

import React, { useState } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, View } from 'react-native';

import { WEEKDAYS, type ClubEvent } from '../data';
import { addMonths, clubCalendar, dayLabelOf, monthGrid, monthLabelOf, parseIso } from '../eventSchema';
import { colors } from '../theme';
import { Card, Txt } from './ui';

/** İleri gidilebilen ay sayısı; daha ilerideki bir etkinlik sınırı kendi ayına uzatıyor. */
const MONTHS_AHEAD = 12;

/**
 * Takvim sekmesinin her zaman görünen ay kartı — takvim boşken de.
 *
 * Açılışta bu ay, "bugün" kulüp saatinden (`clubCalendar`, cihaz saati değil). ‹ › ile
 * bu aydan ileriye; geçmiş aylar Arşiv'in işi. Etkinlik günleri noktalı ve dokununca
 * açılıyor, bugün halkalı, geçmiş günler soluk.
 *
 * Ekran okuyucu her günü tam tarihle okuyor ("12 Ekim 2026, Pazartesi, etkinlik: …");
 * gün adları satırı ve boş hücreler ondan gizli. Ay değişince yeni ay duyuruluyor:
 * odak düğmede kaldığı için başlığın değiştiği kendiliğinden okunmuyor.
 */
export function MonthCalendar({ events, onOpen }: { events: ClubEvent[]; onOpen: (id: string) => void }) {
  const today = clubCalendar(new Date());
  const base = { year: today.year, month: today.month + 1 }; // clubCalendar'ın ayı 0–11
  const [offset, setOffset] = useState(0);

  const lastOffset = events.reduce((max, e) => {
    const at = parseIso(e.startsAt ?? '');
    return at ? Math.max(max, (at.year - base.year) * 12 + (at.month - base.month)) : max;
  }, MONTHS_AHEAD);

  const shown = addMonths(base.year, base.month, offset);
  const grid = monthGrid(shown.year, shown.month, events);
  const titles = new Map(events.map((e) => [e.id, e.title]));
  const thisMonth = offset === 0;

  const go = (next: number) => {
    setOffset(next);
    const month = addMonths(base.year, base.month, next);
    AccessibilityInfo.announceForAccessibility(monthLabelOf(month.year, month.month));
  };

  // Başa boşluk: ayın 1'i doğru güne düşsün; sona boşluk: son satır tamamlansın.
  const cells: (number | null)[] = [
    ...Array.from({ length: grid.leadingBlanks }, () => null),
    ...Array.from({ length: grid.days }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <Card style={styles.card}>
      <View style={styles.bar}>
        <NavButton label="Önceki ay" glyph="‹" disabled={offset <= 0} onPress={() => go(offset - 1)} />
        <Txt weight="extrabold" size={15} color={colors.navy900} accessibilityRole="header">
          {grid.label}
        </Txt>
        <NavButton label="Sonraki ay" glyph="›" disabled={offset >= lastOffset} onPress={() => go(offset + 1)} />
      </View>

      <View style={styles.weekRow} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        {WEEKDAYS.map((w) => (
          <View key={w} style={styles.weekCell}>
            <Txt weight="bold" size={10} color={colors.faint} maxFontSizeMultiplier={1.3}>
              {w}
            </Txt>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((day, i) => {
          if (!day) {
            return (
              <View
                key={i}
                style={styles.dayCell}
                importantForAccessibility="no-hide-descendants"
                accessibilityElementsHidden
              />
            );
          }
          const eventId = grid.eventByDay[day];
          const isToday = thisMonth && day === today.day;
          const isPast = thisMonth && day < today.day;
          const label =
            dayLabelOf(shown.year, shown.month, day) +
            (isToday ? ', bugün' : '') +
            (eventId ? `, etkinlik: ${titles.get(eventId)}` : '');

          const face = (
            <View style={[styles.dayInner, eventId ? styles.dayEvent : null, isToday ? styles.dayToday : null]}>
              <Txt
                weight={eventId || isToday ? 'extrabold' : 'medium'}
                size={13}
                maxFontSizeMultiplier={1.3}
                color={eventId ? colors.navy900 : isPast ? colors.faint : colors.muted}
              >
                {day}
              </Txt>
              {eventId ? <View style={styles.dayDot} /> : null}
            </View>
          );

          // Etkinliksiz gün düğme değil: "devre dışı düğme" diye okunmasın, tarih okunsun.
          return eventId ? (
            <Pressable
              key={i}
              onPress={() => onOpen(eventId)}
              accessibilityRole="button"
              accessibilityLabel={label}
              style={({ pressed }) => [styles.dayCell, pressed ? { opacity: 0.7 } : null]}
            >
              {face}
            </Pressable>
          ) : (
            <View key={i} accessible accessibilityLabel={label} style={styles.dayCell}>
              {face}
            </View>
          );
        })}
      </View>
    </Card>
  );
}

function NavButton({
  label,
  glyph,
  disabled,
  onPress,
}: {
  label: string;
  glyph: string;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [styles.nav, { opacity: disabled ? 0.35 : pressed ? 0.7 : 1 }]}
    >
      <Txt weight="extrabold" size={18} color={colors.navy900}>
        {glyph}
      </Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  // 44 pt: dokunma hedefinin alt sınırı.
  nav: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekRow: { flexDirection: 'row', marginBottom: 6 },
  weekCell: { flex: 1, alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, padding: 2 },
  dayInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderRadius: 9,
  },
  dayEvent: { backgroundColor: colors.blue100 },
  dayToday: { borderWidth: 2, borderColor: colors.blue500 },
  dayDot: { width: 5, height: 5, backgroundColor: colors.blue500 },
});

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PixelIcon } from '../../src/components/Pixel';
import {
  Card,
  DottedRule,
  GradientHeader,
  GroupLabel,
  IconTile,
  Segmented,
  Toggle,
  Txt,
} from '../../src/components/ui';
import { NOTIFICATION_CATEGORIES, REMINDER_OPTIONS } from '../../src/data';
import { useAppStore } from '../../src/store';
import { colors, gradientDirection, gradients, radius } from '../../src/theme';

export default function BildirimRoute() {
  const { notifications, setMaster, toggleCategory, setReminder, setQuietHours } = useAppStore();
  const { master } = notifications;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <GradientHeader gradient={gradients.section} style={{ paddingBottom: 20 }}>
        <Txt weight="extrabold" size={24} color="#fff" tracking={-0.5}>
          Bildirim Ayarları
        </Txt>
        <Txt size={12.5} color={colors.blue200} style={{ marginTop: 4 }}>
          Neyin bildirimini alacağını sen seç
        </Txt>
        <DottedRule style={{ marginTop: 12 }} />
      </GradientHeader>

      <View style={styles.section}>
        <LinearGradient
          colors={gradients.masterCard}
          start={gradientDirection.control.start}
          end={gradientDirection.control.end}
          style={styles.masterCard}
        >
          <View style={styles.masterIcon}>
            <PixelIcon name="bell" size={18} color={colors.onNavy} />
          </View>
          <View style={{ flex: 1 }}>
            <Txt weight="bold" size={14.5} color="#fff">
              Tüm bildirimler
            </Txt>
            <Txt size={11.5} color={colors.blue200} style={{ marginTop: 2 }}>
              {master ? 'Açık · kategorilere göre filtreleniyor' : 'Kapalı · hiçbir bildirim gelmiyor'}
            </Txt>
          </View>
          <Toggle value={master} onValueChange={setMaster} accessibilityLabel="Tüm bildirimler" />
        </LinearGradient>
      </View>

      <View style={styles.section}>
        <GroupLabel style={{ marginBottom: 12 }}>KATEGORILER</GroupLabel>

        <Card padded={false} style={{ overflow: 'hidden' }}>
          {NOTIFICATION_CATEGORIES.map((cat, i) => {
            // A category only counts as on while the master switch is on.
            const on = master && notifications.categories[cat.key];
            return (
              <View
                key={cat.key}
                style={[
                  styles.row,
                  i < NOTIFICATION_CATEGORIES.length - 1 && styles.rowDivider,
                ]}
              >
                <IconTile icon={cat.icon} size={36} tint={cat.tint} glyph={15} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt weight="bold" size={14.5} color={colors.text}>
                    {cat.key}
                  </Txt>
                  <Txt size={12} leading={1.4} color={colors.muted} style={{ marginTop: 2 }}>
                    {cat.desc}
                  </Txt>
                </View>
                <Toggle
                  value={!!on}
                  onValueChange={() => toggleCategory(cat.key)}
                  accessibilityLabel={`${cat.key} bildirimleri`}
                />
              </View>
            );
          })}
        </Card>
      </View>

      <View style={styles.section}>
        <GroupLabel style={{ marginBottom: 12 }}>ZAMANLAMA</GroupLabel>

        <Card style={{ paddingHorizontal: 14, paddingVertical: 15 }}>
          <Txt weight="bold" size={14.5} color={colors.text}>
            Hatırlatma zamanı
          </Txt>
          <Txt size={12} color={colors.muted} style={{ marginTop: 2 }}>
            Kayıtlı olduğun etkinlikler için
          </Txt>

          <Segmented
            value={notifications.reminder}
            onChange={setReminder}
            options={REMINDER_OPTIONS.map((r) => ({ label: r, value: r }))}
            style={{ marginTop: 12 }}
          />

          <View style={styles.quietRow}>
            <View style={{ flex: 1 }}>
              <Txt weight="bold" size={14.5} color={colors.text}>
                Sessiz saatler
              </Txt>
              <Txt size={12} color={colors.muted} style={{ marginTop: 2 }}>
                23:00 – 09:00 arası bildirim yok
              </Txt>
            </View>
            <Toggle
              value={notifications.quietHours}
              onValueChange={setQuietHours}
              accessibilityLabel="Sessiz saatler"
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  section: { paddingHorizontal: 20, paddingTop: 20 },

  masterCard: {
    borderRadius: radius.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  masterIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingHorizontal: 14, paddingVertical: 15 },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.borderSoft },

  quietRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
});

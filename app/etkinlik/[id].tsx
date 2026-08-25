import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PhotoSlot } from '../../src/components/PhotoSlot';
import {
  Card,
  GlassButton,
  IconTile,
  PixelBadge,
  PrimaryButton,
  Tag,
  Txt,
} from '../../src/components/ui';
import { useEvent } from '../../src/content';
import { useAppStore } from '../../src/store';
import { colors, gradients, radius } from '../../src/theme';

export default function EventDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const event = useEvent(id);
  const { registrationFor } = useAppStore();

  const registration = registrationFor(event.id);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 132 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <PhotoSlot
          label="Etkinlik görseli"
          gradient={gradients.hero}
          showLabel={false}
          style={styles.hero}
        >
          {/* Scrim so the title stays legible once a real photo is dropped in. */}
          <LinearGradient
            colors={['rgba(0,27,74,0.55)', 'rgba(0,27,74,0)', 'rgba(0,27,74,0.82)']}
            locations={[0, 0.42, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          <View style={[styles.heroBack, { top: insets.top + 12 }]}>
            <GlassButton
              label="‹"
              accessibilityLabel="Geri"
              onPress={() => router.back()}
              bg="rgba(0,27,74,0.5)"
            />
          </View>

          <View style={styles.heroCaption} pointerEvents="none">
            <PixelBadge
              icon={event.soon ? 'clock' : 'star'}
              label={event.badge}
              bg={colors.blue500}
              fg="#fff"
            />
            <Txt
              weight="extrabold"
              size={25}
              leading={1.2}
              color="#fff"
              tracking={-0.5}
              style={{ marginTop: 12 }}
            >
              {event.title}
            </Txt>
          </View>
        </PhotoSlot>

        <View style={styles.facts}>
          {event.facts.map((fact) => (
            <View key={fact.label} style={styles.factRow}>
              <IconTile icon={fact.icon} />
              <View>
                <Txt weight="semibold" size={11} color={colors.faint} tracking={0.3}>
                  {fact.label}
                </Txt>
                <Txt weight="bold" size={14} color={colors.text} style={{ marginTop: 2 }}>
                  {fact.value}
                </Txt>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.block}>
          <Txt weight="extrabold" size={16} color={colors.navy900} style={{ marginBottom: 8 }}>
            Etkinlik hakkında
          </Txt>
          <Txt size={14.5} leading={1.68} color={colors.textBody}>
            {event.desc}
          </Txt>

          <View style={styles.tags}>
            {event.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </View>
        </View>

        <View style={styles.block}>
          <Txt weight="extrabold" size={16} color={colors.navy900} style={{ marginBottom: 10 }}>
            Konuşmacı
          </Txt>
          <Card style={styles.speaker}>
            <LinearGradient
              colors={gradients.cta}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.speakerAvatar}
            >
              <Txt weight="extrabold" size={15} color="#fff">
                {initials(event.speaker)}
              </Txt>
            </LinearGradient>
            <View>
              <Txt weight="bold" size={14.5} color={colors.text}>
                {event.speaker}
              </Txt>
              <Txt size={12.5} color={colors.muted} style={{ marginTop: 2 }}>
                {event.speakerRole}
              </Txt>
            </View>
          </Card>
        </View>
      </ScrollView>

      <LinearGradient
        colors={['rgba(244,249,251,0)', colors.bg, colors.bg]}
        locations={[0, 0.24, 1]}
        style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}
      >
        <View style={{ flex: 1 }}>
          <Txt weight="semibold" size={11.5} color={colors.faint}>
            {registration ? 'Kayıt kodun' : 'Kontenjan'}
          </Txt>
          <Txt weight="extrabold" size={14} color={colors.navy900}>
            {registration ? registration.code : event.spots}
          </Txt>
        </View>

        {registration ? (
          <View style={styles.registered}>
            <Txt weight="bold" size={15.5} color={colors.blue500}>
              {registration.synced ? 'Kayıtlısın' : 'Gönderiliyor…'}
            </Txt>
          </View>
        ) : (
          <PrimaryButton
            label="Kayıt Ol"
            onPress={() => router.push(`/kayit/${event.id}`)}
            style={{ flex: 1.3 }}
          />
        )}
      </LinearGradient>
    </View>
  );
}

/** "Mert Aydın" → "MA"; single-word speakers such as "Panel" keep one letter. */
function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toLocaleUpperCase('tr');
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },

  hero: { height: 280 },
  heroBack: { position: 'absolute', left: 16 },
  heroCaption: { position: 'absolute', left: 20, right: 20, bottom: 18 },

  facts: { paddingHorizontal: 20, paddingTop: 18, gap: 10 },
  factRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  block: { paddingHorizontal: 20, paddingTop: 22 },
  tags: { marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  speaker: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  speakerAvatar: {
    width: 46,
    height: 46,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  registered: {
    flex: 1.3,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: colors.blue200,
    backgroundColor: colors.blue100,
  },
});

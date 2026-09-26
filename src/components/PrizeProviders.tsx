import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius } from '../theme';
import type { Sponsor } from '../vitrinSchema';
import { Txt } from './ui';

/**
 * Çekiliş etkinliğinde ödülü sağlayan kurumlar — kurumun sayfasına gidiyor,
 * linkler ve tanıtım orada.
 *
 * Bu blokta "sponsor" kelimesi YOK ve olmamalı: Apple 5.3.2 çekilişin
 * sponsorunun geliştirici olmasını istiyor, `raffleLegal.ts` de ödülü
 * sağlayanın sponsor olmadığını söylüyor. Testi bunu tutuyor.
 */
export function PrizeProviders({ providers }: { providers: Pick<Sponsor, 'id' | 'name'>[] }) {
  const router = useRouter();
  if (!providers.length) return null;

  return (
    <View style={styles.root}>
      <Txt weight="semibold" size={12.5} color={colors.muted}>
        Ödülü sağlayan
      </Txt>
      <View style={styles.chips}>
        {providers.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => router.push(`/sponsor/${p.id}`)}
            accessibilityRole="button"
            accessibilityLabel={`Ödülü sağlayan: ${p.name}`}
            style={({ pressed }) => [styles.chip, pressed && { borderColor: colors.blue500 }]}
          >
            <Txt weight="semibold" size={12.5} color={colors.navy700}>
              {p.name}
            </Txt>
            <Txt size={12.5} color={colors.blue500}>
              ›
            </Txt>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { marginTop: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: colors.blue200,
    borderRadius: radius.sm,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: colors.surface,
  },
});

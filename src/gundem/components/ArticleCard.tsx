import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card, Tag, Txt } from '../../components/ui';
import { colors, radius } from '../../theme';
import type { Article } from '../domain/types';
import { relativeTimeTr } from '../format/relativeTime';

/**
 * Akıştaki bir haber kartı.
 *
 * Kaynak uygulamadaki karşılığı kendi tema sistemine bağlıydı (koyu birincil,
 * `useThemedStyles`). Burada renk yalnızca `src/theme.ts`'ten geliyor ve metin
 * `Txt` ile çiziliyor — ham `Text` yok, çünkü React Native font ağırlığı
 * türetmiyor ve her ağırlık ayrı bir aile adı.
 *
 * Kaynak kısaltması (`tile`) katalogdan geliyor, arayüzden değil: kullanıcının
 * eklediği bir kaynak da kendi rozetini taşıyabilsin diye.
 */
export function ArticleCard({
  article,
  onPress,
  unread = false,
}: {
  article: Article;
  onPress: () => void;
  /** Bu cihaz henüz açmadıysa başlığın yanında bir nokta. */
  unread?: boolean;
}) {
  const time = relativeTimeTr(article.publishedAt);
  const translated = article.language !== 'tr';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={article.title}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.tile}>
            <Txt weight="extrabold" size={12} color={colors.navy900}>
              {article.tile}
            </Txt>
          </View>

          <View style={styles.meta}>
            <Txt weight="bold" size={12.5} color={colors.navy900} numberOfLines={1}>
              {article.sourceName}
            </Txt>
            <Txt size={11.5} color={colors.muted}>
              {translated ? `${time} · EN→TR` : time}
            </Txt>
          </View>

          <Tag label={article.category} />
        </View>

        <View style={styles.titleRow}>
          {unread ? <View style={styles.dot} /> : null}
          <Txt weight="semibold" size={15} color={colors.text} style={styles.title}>
            {article.title}
          </Txt>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tile: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.blue100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { flex: 1, minWidth: 0, gap: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 7, marginTop: 10 },
  // Okunmamış noktası başlıkla aynı satırda başlıyor: ilk satırın optik
  // ortasına denk gelsin diye küçük bir üst boşluk taşıyor.
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.blue500,
    marginTop: 7,
  },
  title: { flex: 1, lineHeight: 21 },
});

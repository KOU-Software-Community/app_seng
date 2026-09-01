import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { Card, ContentNotice, EmptyState, PixelTxt, Txt } from '../../components/ui';
import { colors, radius } from '../../theme';
import { useDigest } from '../data-access/hooks';

const MONTHS_TR = [
  'OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN',
  'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK',
];
const DAYS_TR = ['PAZAR', 'PAZARTESİ', 'SALI', 'ÇARŞAMBA', 'PERŞEMBE', 'CUMA', 'CUMARTESİ'];

/**
 * Bültenin kendi `YYYY-MM-DD`'sinden "20 AĞUSTOS 2026 · PERŞEMBE".
 *
 * Saf ve dışa açık: tarih biçimlendirme, ekranı render etmeden sınanabilecek
 * tek şey ve yanlış olursa kimse fark etmez — sadece tarih tuhaf durur.
 *
 * `T00:00:00` ekleniyor çünkü çıplak `YYYY-MM-DD` UTC olarak ayrıştırılıyor ve
 * +03:00'te bir gün geriye kayabiliyor.
 */
export function digestDateLine(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getDate()} ${MONTHS_TR[date.getMonth()]} ${date.getFullYear()} · ${DAYS_TR[date.getDay()]}`;
}

export function DigestView() {
  const router = useRouter();
  const digest = useDigest();

  const snapshot = digest.data;

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={digest.isRefetching}
          onRefresh={() => void digest.refetch()}
          tintColor={colors.blue500}
        />
      }
    >
      {digest.isError ? (
        <ContentNotice onRetry={() => void digest.refetch()} retrying={digest.isRefetching} />
      ) : null}

      {digest.isPending ? (
        <PixelTxt size={9} style={styles.loading}>
          YUKLENIYOR
        </PixelTxt>
      ) : null}

      {/*
        "Hazırlanıyor" bir hata değil, birinci sınıf bir durum: bülten her sabah
        sunucuda üretiliyor ve üretilene kadar gösterilecek bir şey yok. Hata
        gibi göstermek, kullanıcıyı olmayan bir sorunu aramaya yollardı.
      */}
      {snapshot?.status === 'preparing' ? (
        <EmptyState
          title="Bülten hazırlanıyor"
          body="Günün bülteni her sabah derleniyor. Birazdan burada olacak."
          style={styles.empty}
        />
      ) : null}

      {snapshot?.status === 'ready' ? (
        <>
          <PixelTxt size={8} style={styles.dateLine}>
            {digestDateLine(snapshot.digest.date)}
          </PixelTxt>

          {snapshot.digest.items.map((item) => (
            <Pressable
              key={item.articleId}
              onPress={() => router.push(`/gundem/${item.articleId}`)}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
            >
              <Card style={styles.card}>
                <View style={styles.head}>
                  <View style={styles.position}>
                    <Txt weight="extrabold" size={12} color="#fff">
                      {item.position}
                    </Txt>
                  </View>
                  <Txt weight="bold" size={12} color={colors.muted} numberOfLines={1}>
                    {item.sourceName}
                  </Txt>
                </View>

                <Txt weight="semibold" size={15} color={colors.text} style={styles.title}>
                  {item.title}
                </Txt>
                <Txt size={13} color={colors.textBody} style={styles.blurb}>
                  {item.blurb}
                </Txt>
              </Card>
            </Pressable>
          ))}
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  loading: { textAlign: 'center', marginTop: 40, color: colors.faint },
  empty: { marginTop: 28 },
  dateLine: { paddingHorizontal: 16, paddingTop: 16, color: colors.blue500 },
  card: { marginHorizontal: 16, marginTop: 12 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  position: {
    width: 22,
    height: 22,
    borderRadius: radius.xs,
    backgroundColor: colors.blue500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { marginTop: 9, lineHeight: 21 },
  blurb: { marginTop: 6, lineHeight: 19 },
});

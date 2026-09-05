import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import {
  ContentNotice,
  EmptyState,
  FilterChip,
  PixelTxt,
  Txt,
} from '../../components/ui';
import { hasSummary } from '../article/segment';
import { ArticleCard } from '../components/ArticleCard';
import { useEnrichmentWarmup } from '../enrichment/useEnrichmentWarmup';
import { heldLineTr, holdUnenriched } from '../enrichment/gate';
import { asDataError, useFeed } from '../data-access/hooks';
import type { Article } from '../domain/types';
import { useEnabledSources, useReadArticles } from '../user-state/hooks';
import { clubCalendar } from '../../eventSchema';
import { colors } from '../../theme';

/** "Tümü" artı prototipin beş kategorisi. */
const CATEGORIES = ['Tümü', 'Modeller', 'Araştırma', 'Ürün', 'Açık Kaynak', 'Türkiye'] as const;
type Filter = (typeof CATEGORIES)[number];

const DAYS_TR = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const MONTHS_TR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

/**
 * Başlıktaki gün satırı: "Perşembe, 20 Ağustos".
 *
 * Gün cihazın saat diliminden değil kulübün saatinden okunuyor — aksi hâlde
 * yurt dışındaki bir telefonda bu satır, aynı anda Takvim sekmesinin yazdığı
 * günden başka bir gün gösteriyordu.
 */
export const todayLineTr = (now: Date = new Date()): string => {
  const today = clubCalendar(now);
  return `${DAYS_TR[today.weekday]}, ${today.day} ${MONTHS_TR[today.month]}`;
};

/** "N yeni" — bu cihazın henüz açmadıkları. Sunucudan gelen bir sayı değil. */
export const unseenCount = (articles: Article[], isRead: (id: string) => boolean): number =>
  articles.filter((a) => !isRead(a.id)).length;

export function FeedView() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('Tümü');

  const { enabledSourceIds } = useEnabledSources();
  const { isRead, markRead } = useReadArticles();

  const feed = useFeed({
    category: filter === 'Tümü' ? null : filter,
    // `undefined` "bütün etkin kaynaklar" demek; boş dizi "hiçbir kaynak"
    // olurdu ve akış boş dönerdi.
    ...(enabledSourceIds && enabledSourceIds.length > 0 ? { sourceIds: enabledSourceIds } : {}),
  });

  const articles = useMemo(
    () => feed.data?.pages.flatMap((page) => page.items) ?? [],
    [feed.data],
  );

  /**
   * Akışa girme kuralı ve onu besleyen arka plan ısıtması.
   *
   * Sunucudaki iş talep güdümlü: haber çekimi özet işi yaratmıyor, işi yaratan
   * şey istemcinin isteği, ve worker iki dakikada bir koşuyor. Yani bir haberi
   * ilk açan kişi her seferinde bekliyordu.
   *
   * İkisi birlikte çalışıyor: özetsiz taze haber **akışa hiç girmiyor**
   * (`holdUnenriched`), aynı anda arka planda ısıtılıyor, ve ısıtma turundan
   * sonra akış bir kez tazeleniyor. Kullanıcı yarım hazırlanmış bir haber
   * görmüyor; gördüğü her haberin çevirisi ve özeti hazır.
   */
  const rows = useMemo(
    () =>
      articles.map((article) => ({
        article,
        id: article.id,
        publishedAt: article.publishedAt,
        summaryReady: hasSummary(article.summary),
      })),
    [articles],
  );

  const gate = useMemo(() => holdUnenriched(rows, new Date()), [rows]);
  const visible = useMemo(() => gate.visible.map((row) => row.article), [gate]);
  const heldLine = heldLineTr(gate.heldCount);

  const warmCandidates = useMemo(
    () => rows.map(({ id, summaryReady }) => ({ id, summaryReady })),
    [rows],
  );
  useEnrichmentWarmup(warmCandidates);

  const open = (id: string) => {
    markRead(id);
    router.push(`/gundem/${id}`);
  };

  // Önbellekteki satırlar ekranda dururken yenileme başarısız oluyorsa: göster,
  // ama sessiz kalma. Boş ekran göstermek, eskimiş içerikten daha kötü.
  const stale = feed.isError && articles.length > 0;

  /**
   * Yapılandırması olmadan çıkmış bir derlemede sebep ağ değil, ve öyle demek
   * kullanıcıyı düzeltemeyeceği bir yere yollar. `env.problem` hangi değişkenin
   * eksik olduğunu adıyla söylüyor; ekranda görünecek olan o. Yeniden deneme
   * düğmesi de yok: aynı paket her denemede aynı cevabı verir.
   */
  const unconfigured =
    feed.isError && asDataError(feed.error)?.code === 'unconfigured'
      ? asDataError(feed.error)
      : null;

  return (
    <View style={styles.screen}>
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ArticleCard article={item} onPress={() => open(item.id)} unread={!isRead(item.id)} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={feed.isRefetching && !feed.isFetchingNextPage}
            onRefresh={() => void feed.refetch()}
            tintColor={colors.blue500}
          />
        }
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (feed.hasNextPage && !feed.isFetchingNextPage) void feed.fetchNextPage();
        }}
        ListHeaderComponent={
          <>
            {unconfigured ? (
              <ContentNotice
                title="AI Gündem yapılandırılmamış"
                body={unconfigured.message}
              />
            ) : feed.isError ? (
              <ContentNotice onRetry={() => void feed.refetch()} retrying={feed.isRefetching} />
            ) : null}

            {heldLine ? (
              <Txt size={11.5} color={colors.muted} style={styles.staleLine}>
                {heldLine}
              </Txt>
            ) : null}

            {stale ? (
              <Txt size={11.5} color={colors.muted} style={styles.staleLine}>
                Çevrimdışı: en son alınan liste gösteriliyor.
              </Txt>
            ) : null}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
            >
              {CATEGORIES.map((c) => (
                <FilterChip
                  key={c}
                  label={c}
                  active={c === filter}
                  onPress={() => setFilter(c)}
                />
              ))}
            </ScrollView>
          </>
        }
        ListEmptyComponent={
          feed.isPending ? (
            <PixelTxt size={9} style={styles.loading}>
              YUKLENIYOR
            </PixelTxt>
          ) : gate.heldCount > 0 ? (
            // Liste boş değil, bekliyor. "Haber yok" demek yanlış olurdu.
            <PixelTxt size={9} style={styles.loading}>
              HAZIRLANIYOR
            </PixelTxt>
          ) : feed.isError ? null : (
            <EmptyState
              title="Bu filtrede haber yok"
              body="Başka bir kategori seçin ya da aşağı çekip yenileyin."
              style={styles.empty}
            />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  chips: { paddingHorizontal: 16, paddingTop: 14, gap: 8 },
  loading: { textAlign: 'center', marginTop: 40, color: colors.faint },
  empty: { marginTop: 28 },
  staleLine: { paddingHorizontal: 16, paddingTop: 12 },
});

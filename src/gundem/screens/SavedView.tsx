import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';

import { ContentNotice, EmptyState, PixelTxt } from '../../components/ui';
import { colors } from '../../theme';
import { ArticleCard } from '../components/ArticleCard';
import { useFeed } from '../data-access/hooks';
import type { Article } from '../domain/types';
import { useReadArticles, useSavedArticles } from '../user-state/hooks';

/**
 * Kaydedilenler kaydetme sırasına göre, en yeni üstte — yayın sırasına göre
 * değil. Kullanıcının en son yaptığı şey en üstte durmalı.
 *
 * Saf ve dışa açık: sıralama, ekranı render etmeden sınanabilecek tek şey ve
 * bozulursa kimse hata görmez, sadece liste "biraz karışık" görünür.
 */
export function orderBySaved(articles: Article[], savedIds: string[]): Article[] {
  const byId = new Map(articles.map((a) => [a.id, a]));
  return savedIds.map((id) => byId.get(id)).filter((a): a is Article => a !== undefined);
}

export function SavedView() {
  const router = useRouter();
  const { saved } = useSavedArticles();
  const { isRead, markRead } = useReadArticles();

  // Kayıtlı liste cihazda yalnızca kimlik tutuyor; gövdeler akış sorgusunda
  // zaten var. Kimlik başına depoya sormak, tek ekran için N tur demekti.
  const feed = useFeed();
  const articles = useMemo(
    () => feed.data?.pages.flatMap((page) => page.items) ?? [],
    [feed.data],
  );

  const items = orderBySaved(
    articles,
    saved.map((entry) => entry.articleId),
  );

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={feed.isRefetching}
          onRefresh={() => void feed.refetch()}
          tintColor={colors.blue500}
        />
      }
    >
      {feed.isError && items.length === 0 ? (
        <ContentNotice onRetry={() => void feed.refetch()} retrying={feed.isRefetching} />
      ) : null}

      {feed.isPending ? (
        <PixelTxt size={9} style={styles.loading}>
          YUKLENIYOR
        </PixelTxt>
      ) : null}

      {!feed.isPending && items.length === 0 ? (
        <EmptyState
          title="Kaydedilen haber yok"
          body="Bir haberi açıp kaydettiğinde burada birikecek."
          style={styles.empty}
        />
      ) : null}

      {items.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          unread={!isRead(article.id)}
          onPress={() => {
            markRead(article.id);
            router.push(`/gundem/${article.id}`);
          }}
        />
      ))}

      {/*
        Kaydı kaldırma makale ekranında: burada bir çöp kutusu koymak, listeyi
        kaydırırken yanlışlıkla silinen ve geri alınamayan bir kayıt demekti.
      */}
      {items.length > 0 ? (
        <PixelTxt size={7} style={styles.note}>
          KALDIRMAK ICIN HABERI AC
        </PixelTxt>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24, paddingTop: 4 },
  loading: { textAlign: 'center', marginTop: 40, color: colors.faint },
  empty: { marginTop: 28 },
  note: { textAlign: 'center', marginTop: 18, color: colors.faint },
});

import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import {
  ContentNotice,
  DottedRule,
  EmptyState,
  GradientHeader,
  PixelTxt,
  Txt,
} from '../../src/components/ui';
import { ArticleCard } from '../../src/gundem/components/ArticleCard';
import { useSearch } from '../../src/gundem/data-access/hooks';
import { useReadArticles, useRecentSearches } from '../../src/gundem/user-state/hooks';
import { colors, gradients, radius } from '../../src/theme';

export default function GundemAraRoute() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { recentSearches, pushRecentSearch } = useRecentSearches();
  const { isRead, markRead } = useReadArticles();

  const trimmed = query.trim();
  const search = useSearch(trimmed);

  const results = useMemo(() => search.data?.items ?? [], [search.data]);

  return (
    <View style={styles.screen}>
      <GradientHeader gradient={gradients.form} style={{ paddingBottom: 14 }}>
        <Txt weight="extrabold" size={22} color="#fff" tracking={-0.4}>
          Haber ara
        </Txt>
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => pushRecentSearch(trimmed)}
          placeholder="Başlık, kaynak ya da kategori"
          placeholderTextColor={colors.faint}
          autoFocus
          returnKeyType="search"
          style={styles.input}
          accessibilityLabel="Arama"
        />
        <DottedRule style={{ marginTop: 12 }} />
      </GradientHeader>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
        {/*
          Boş sorgu bir istek değil, "son aramalar" durumu — `useSearch` de o
          hâlde ağa hiç çıkmıyor.
        */}
        {trimmed.length === 0 ? (
          recentSearches.length > 0 ? (
            <View style={styles.recent}>
              <PixelTxt size={8} style={{ color: colors.blue500 }}>
                SON ARAMALAR
              </PixelTxt>
              {recentSearches.slice(0, 8).map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setQuery(item)}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.recentRow, { opacity: pressed ? 0.7 : 1 }]}
                >
                  <Txt size={14} color={colors.textBody}>
                    {item}
                  </Txt>
                </Pressable>
              ))}
            </View>
          ) : (
            <EmptyState
              title="Ne aramak istersin?"
              body="Başlık, kaynak adı ya da kategori yazabilirsin."
              style={styles.empty}
            />
          )
        ) : null}

        {trimmed.length > 0 && search.isError ? (
          <ContentNotice onRetry={() => void search.refetch()} retrying={search.isFetching} />
        ) : null}

        {trimmed.length > 0 && search.isPending ? (
          <PixelTxt size={9} style={styles.loading}>
            ARANIYOR
          </PixelTxt>
        ) : null}

        {trimmed.length > 0 && search.isSuccess && results.length === 0 ? (
          <EmptyState
            title="Sonuç yok"
            body={`"${trimmed}" için eşleşen haber bulunamadı.`}
            style={styles.empty}
          />
        ) : null}

        {results.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            unread={!isRead(article.id)}
            onPress={() => {
              pushRecentSearch(trimmed);
              markRead(article.id);
              router.push(`/gundem/${article.id}`);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  input: {
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: '#fff',
    fontSize: 15,
  },
  recent: { paddingHorizontal: 16, paddingTop: 18, gap: 10 },
  recentRow: { paddingVertical: 6 },
  loading: { textAlign: 'center', marginTop: 40, color: colors.faint },
  empty: { marginTop: 28 },
});

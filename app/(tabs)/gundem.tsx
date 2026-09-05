import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { PixelIcon } from '../../src/components/Pixel';
import { DottedRule, GradientHeader, Segmented, Txt } from '../../src/components/ui';
import { DigestView } from '../../src/gundem/screens/DigestView';
import { FeedView, todayLineTr } from '../../src/gundem/screens/FeedView';
import { SavedView } from '../../src/gundem/screens/SavedView';
import { colors, gradients } from '../../src/theme';

/**
 * AI Gündem sekmesinin kabuğu.
 *
 * İç gezinme bir alt sekme çubuğu değil, `Segmented` — uygulamanın kendi
 * bileşeni. İkinci bir sekme çubuğu koymak, alt barla üst üste iki gezinme
 * yüzeyi demekti ve ikisi de aynı ekranı adresliyor olurdu.
 *
 * Başlık burada duruyor, görünümlerin içinde değil: iki görünüm arasında geçince
 * başlığın yeniden çizilmesi (ve gradyanın bir kare titremesi) kullanıcının
 * göreceği tek fark olurdu.
 */
type Tab = 'akis' | 'bulten' | 'kayitli';

const isTab = (value: unknown): value is Tab =>
  value === 'akis' || value === 'bulten' || value === 'kayitli';

export default function GundemRoute() {
  const router = useRouter();
  /**
   * Bülten bildirimine dokunmak bu rotayı `?tab=bulten` ile açıyor.
   *
   * Başlangıç değeri olarak okumak yetmiyor: sekme zaten monte edilmişse
   * (kullanıcı uygulamayı Gündem'de bırakmışsa) `useState` yeniden
   * çalışmıyor ve bildirim hiçbir şey değiştirmiyordu.
   */
  const params = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<Tab>(isTab(params.tab) ? params.tab : 'akis');

  useEffect(() => {
    if (isTab(params.tab)) setTab(params.tab);
  }, [params.tab]);

  return (
    <View style={styles.screen}>
      <GradientHeader gradient={gradients.section} style={{ paddingBottom: 14 }}>
        <View style={styles.titleRow}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Txt weight="extrabold" size={24} color="#fff" tracking={-0.5}>
              AI Gündem
            </Txt>
            <Txt size={12.5} color={colors.blue200} style={{ marginTop: 4 }}>
              {todayLineTr()}
            </Txt>
          </View>
          <Pressable
            onPress={() => router.push('/gundem/ara')}
            accessibilityRole="button"
            accessibilityLabel="Haber ara"
            hitSlop={10}
            style={({ pressed }) => [styles.searchButton, { opacity: pressed ? 0.7 : 1 }]}
          >
            <PixelIcon name="search" size={18} color="#fff" />
          </Pressable>
        </View>
        <Segmented
          onNavy
          options={[
            { label: 'Akış', value: 'akis' },
            { label: 'Bülten', value: 'bulten' },
            { label: 'Kayıtlı', value: 'kayitli' },
          ]}
          value={tab}
          onChange={(value) => setTab(value as Tab)}
          style={{ marginTop: 14 }}
        />
        <DottedRule style={{ marginTop: 12 }} />
      </GradientHeader>

      {tab === 'akis' ? <FeedView /> : null}
      {tab === 'bulten' ? <DigestView /> : null}
      {tab === 'kayitli' ? <SavedView /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  searchButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

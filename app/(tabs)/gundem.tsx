import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DottedRule, GradientHeader, Segmented, Txt } from '../../src/components/ui';
import { DigestView } from '../../src/gundem/screens/DigestView';
import { FeedView, todayLineTr } from '../../src/gundem/screens/FeedView';
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
type Tab = 'akis' | 'bulten';

export default function GundemRoute() {
  const [tab, setTab] = useState<Tab>('akis');

  return (
    <View style={styles.screen}>
      <GradientHeader gradient={gradients.section} style={{ paddingBottom: 14 }}>
        <Txt weight="extrabold" size={24} color="#fff" tracking={-0.5}>
          AI Gündem
        </Txt>
        <Txt size={12.5} color={colors.blue200} style={{ marginTop: 4 }}>
          {todayLineTr()}
        </Txt>
        <Segmented
          onNavy
          options={[
            { label: 'Akış', value: 'akis' },
            { label: 'Bülten', value: 'bulten' },
          ]}
          value={tab}
          onChange={(value) => setTab(value as Tab)}
          style={{ marginTop: 14 }}
        />
        <DottedRule style={{ marginTop: 12 }} />
      </GradientHeader>

      {tab === 'akis' ? <FeedView /> : <DigestView />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
});

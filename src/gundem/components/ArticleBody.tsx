import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { DottedRule, PixelTxt, Txt } from '../../components/ui';
import { colors, radius, shadow } from '../../theme';
import { readingTimeTr, toParagraphs } from '../article/readingText';

/**
 * Haber metninin okuma yüzeyi.
 *
 * Eskiden gövde tek bir `<Txt size={14.5} lineHeight={22}>` idi, doğrudan sayfa
 * zemininin üstünde. Cihazda "txt dosyası gibi" görünmesinin dört ayrı sebebi
 * vardı ve dördü de burada karşılanıyor:
 *
 * 1. **Paragraf yoktu.** Metin `toParagraphs` ile ayrılıyor ve paragraf arası
 *    boşlukla veriliyor — boş satırla değil, çünkü boş satırın yüksekliğini
 *    satır yüksekliği belirler, tasarım değil.
 * 2. **Satır çok uzundu.** 16 px punto + kartın kendi iç boşluğu, 390 pt'lik bir
 *    ekranda satırı ~60 karaktere indiriyor. Uzun satırda göz satır başını
 *    kaybediyor; okunabilirliğin en büyük tek değişkeni bu.
 * 3. **Satır aralığı dardı.** 22/14.5 ≈ 1,52. Uzun metinde 1,7 isteniyor.
 * 4. **Metnin bir zemini yoktu.** Beyaz kart, sayfa zemininden ayrılıp "kâğıt"
 *    hissi veriyor; okunan şeyin nerede başlayıp nerede bittiği görünüyor.
 *
 * Giriş paragrafı ayrı: biraz daha büyük, daha koyu ve solunda ince bir vurgu
 * çizgisi — dergilerdeki "spot" satırı. Göze bir giriş noktası veriyor, ki
 * duvar hissinin diğer yarısı da buydu.
 */
export function ArticleBody({
  text,
  label,
  header,
}: {
  text: string;
  /** "Çeviri · Türkçe" / "Orijinal · English". */
  label: string;
  /** Dil seçici — kartın başlığına yerleşiyor, metnin üstünde asılı kalmıyor. */
  header?: React.ReactNode;
}) {
  const paragraphs = useMemo(() => toParagraphs(text), [text]);
  const minutes = useMemo(() => readingTimeTr(text), [text]);

  const [lead, ...rest] = paragraphs;

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <PixelTxt size={8}>HABER METNI</PixelTxt>
        <Txt size={11.5} color={colors.faint}>
          {minutes ? `${label} · ${minutes}` : label}
        </Txt>
      </View>
      <DottedRule style={{ marginTop: 10 }} />

      {header ? <View style={styles.header}>{header}</View> : null}

      {paragraphs.length === 0 ? (
        <Txt size={14} color={colors.faint} style={styles.empty}>
          Bu haberin metni alınamadı. Aşağıdan kaynağa gidebilirsiniz.
        </Txt>
      ) : (
        <View style={styles.body}>
          <View style={styles.leadWrap}>
            <Txt weight="medium" size={17} leading={1.62} color={colors.text}>
              {lead}
            </Txt>
          </View>

          {rest.map((paragraph, index) => (
            <Txt
              // Paragraf metni anahtarın parçası: aynı metin iki kez geçebilir,
              // sıra da çeviri ile orijinal arasında değişebilir.
              key={`${index}-${paragraph.slice(0, 24)}`}
              size={16}
              leading={1.7}
              color={colors.textBody}
              style={styles.paragraph}
            >
              {paragraph}
            </Txt>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 20,
    ...shadow.card,
  },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  header: { marginTop: 14 },
  body: { marginTop: 16 },
  leadWrap: {
    borderLeftWidth: 3,
    borderLeftColor: colors.blue200,
    paddingLeft: 13,
  },
  paragraph: { marginTop: 15 },
  empty: { marginTop: 14 },
});

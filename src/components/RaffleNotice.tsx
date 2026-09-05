import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { APPLE_DISCLAIMER, ORGANIZER_LINE, SCOPE_LINE } from '../raffleLegal';
import { colors, radius } from '../theme';
import { PixelTxt, Txt } from './ui';

/**
 * Çekiliş beyanı — Guideline 5.3.1'in kartta görünmesini istediği bilgi.
 *
 * Tasarım kararı: **not, afiş değil.** Bu blok kullanıcının çekilişten önce
 * okuyacağı bir şey değil; incelemecinin bulması gereken bir şey. O yüzden
 * 11,5 px, sessiz zemin, kartın altında. Ama gizli de değil — Apple "clearly
 * displayed" istiyor, ve reddi yiyen sürümde bu blok hiç yoktu.
 *
 * Aynı blok iki ekranda birden duruyor (etkinlik detayı ve katılım formu).
 * Fazlalık gibi görünüyor ve değil: incelemeci hangi yoldan girerse girsin
 * beyanı görmeli, ve katılımı asıl gönderen ekran form.
 */
export function RaffleNotice({ style }: { style?: object }) {
  const router = useRouter();

  return (
    <View style={[styles.box, style]}>
      <PixelTxt size={7} color={colors.faint}>
        ÇEKİLİŞ BİLGİLENDİRMESİ
      </PixelTxt>

      <Txt weight="semibold" size={11.5} leading={1.45} color={colors.textBody} style={styles.line}>
        {ORGANIZER_LINE}
      </Txt>
      <Txt size={11.5} leading={1.45} color={colors.muted} style={styles.line}>
        {SCOPE_LINE}
      </Txt>
      <Txt size={11.5} leading={1.45} color={colors.faint} style={styles.line}>
        {APPLE_DISCLAIMER}
      </Txt>

      <Pressable
        onPress={() => router.push('/cekilis-kurallari')}
        accessibilityRole="link"
        style={({ pressed }) => [styles.link, pressed && { opacity: 0.6 }]}
      >
        <Txt weight="bold" size={11.5} color={colors.blue500}>
          Resmî Çekiliş Kuralları →
        </Txt>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.borderSoft,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 13,
    paddingTop: 11,
    paddingBottom: 4,
  },
  line: { marginTop: 7 },
  link: { paddingTop: 9, paddingBottom: 9 },
});

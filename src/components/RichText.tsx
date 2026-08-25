import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { parseHtml } from '../html';
import { colors } from '../theme';
import { Txt } from './ui';

/**
 * Duyuru gövdesini çizer.
 *
 * `src/html.ts` HTML'i bloklara çeviriyor, burası onları `Txt` ile basıyor —
 * yani metin yine projenin font kurallarından geçiyor. React Native ağırlıkları
 * sentezlemediği için kalın metin ayrı bir aile adı, ve bunu tek yerden
 * geçirmek `<b>` içindeki metnin sessizce normal görünmesini engelliyor.
 */
export function RichText({
  html,
  size = 14.5,
  color = colors.textBody,
  style,
}: {
  html: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const blocks = useMemo(() => parseHtml(html), [html]);
  if (!blocks.length) return null;

  return (
    <View style={[{ gap: 12 }, style]}>
      {blocks.map((block, i) => {
        const body = (
          <Txt size={size} leading={1.62} color={color}>
            {block.runs.map((run, j) => (
              <Txt
                key={j}
                size={size}
                leading={1.62}
                color={color}
                weight={run.bold ? 'bold' : 'regular'}
              >
                {run.text}
              </Txt>
            ))}
          </Txt>
        );

        if (block.kind !== 'listItem') return <View key={i}>{body}</View>;

        return (
          <View key={i} style={{ flexDirection: 'row', gap: 10, paddingLeft: 4 }}>
            {/* Kendi madde işareti: RN'de liste yok, ve metnin içine "• "
                koymak ikinci satırı işaretin altına sarkıtıyor. */}
            <Txt size={size} leading={1.62} color={colors.blue500}>
              •
            </Txt>
            <View style={{ flex: 1, minWidth: 0 }}>{body}</View>
          </View>
        );
      })}
    </View>
  );
}

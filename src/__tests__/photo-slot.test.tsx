import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { PhotoSlot } from '../components/PhotoSlot';

/**
 * `PhotoSlot` görseli expo-image ile çiziyor: disk önbelleği, anahtarı URI.
 * Logo kırpılmıyor (`contain` — kırpılan logo başka bir marka gibi okunur),
 * fotoğraf alanı dolduruyor (`cover`).
 */

type HostNode = { props?: Record<string, unknown>; children?: unknown };

/** Çizilen ağaçtaki görsellerin `contentFit` değerleri, sırayla. */
function fits(node: unknown): unknown[] {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node)) return node.flatMap(fits);
  const { props, children } = node as HostNode;
  const own = props && 'contentFit' in props ? [props.contentFit] : [];
  return [...own, ...fits(children)];
}

it('logo contain, fotoğraf cover ile expo-image üzerinden çiziliyor', async () => {
  await render(
    <>
      <PhotoSlot uri="https://ornek.com/logo.png" resizeMode="contain" />
      <PhotoSlot uri="https://ornek.com/foto.jpg" />
    </>,
  );
  expect(fits(screen.toJSON())).toEqual(['contain', 'cover']);
});

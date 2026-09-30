import { act, renderHook } from '@testing-library/react-native';

import { SLIDE_INTERVAL_MS, useAutoAdvance } from '../useAutoAdvance';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return { useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]) };
});

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it.each([
  [false, 1],
  [true, 0],
])('paused=%p iken 4,5 sn sonra sıra %p', async (paused, want) => {
  const { result } = await renderHook(() => useAutoAdvance(3, 100, paused));
  await act(async () => {});
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(result.current.current).toBe(want);
});

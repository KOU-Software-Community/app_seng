import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { PhotoGallery } from '../components/PhotoGallery';

const PHOTOS = ['https://ornek.com/1.jpg', 'https://ornek.com/2.jpg', 'https://ornek.com/3.jpg'];

it('şerit kapak dâhil bütün fotoğrafları gösteriyor, dokunulanı açıyor', async () => {
  const onOpen = jest.fn();
  await render(<PhotoGallery photos={PHOTOS} onOpen={onOpen} />);
  expect(screen.getAllByRole('button', { name: /^Fotoğraf \d$/ })).toHaveLength(3);
  await fireEvent.press(screen.getByLabelText('Fotoğraf 1'));
  expect(onOpen).toHaveBeenCalledWith(0);
});

it('başlık sayfanın 20 pt kenar boşluğuyla hizalı', async () => {
  await render(<PhotoGallery photos={PHOTOS} onOpen={jest.fn()} />);
  expect(screen.getByText('Fotoğraflar')).toHaveStyle({ paddingHorizontal: 20 });
});

it('tek fotoğrafta şerit yok', async () => {
  await render(<PhotoGallery photos={[PHOTOS[0]]} onOpen={jest.fn()} />);
  expect(screen.queryByText('Fotoğraflar')).toBeNull();
});

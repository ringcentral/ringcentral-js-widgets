import memoize from 'lodash/memoize';

import { loadImage } from './loadImage';
import { rgbToHex } from './rgbToHex';

/**
 * get image position color by url
 * @param url image url
 * @param position that color of position of the image in relative of `300x300`, by default is `left-center(0, 150)` of the image
 * @returns color hex
 *
 * ### Remember the url should be same origin or allow fetch the source image
 */
export const getImagePositionColor = async (
  url: string,
  position?: { x: number; y: number },
) => {
  try {
    const img = await loadImage(url);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    canvas.width = 300;
    canvas.height = 300;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const p = ctx.getImageData(
      position?.x ?? 0,
      position?.y ?? 150, // canvas.height / 2,
      1,
      1,
    ).data;
    const hex = rgbToHex(p[0], p[1], p[2]);

    canvas.remove();
    img.remove();
    return hex;
  } catch (error) {
    return '#FFF';
  }
};

/**
 * same as `getImagePositionColor` but with cache based on url and position in one day
 */
export const getImagePositionColorWithCache = memoize(
  getImagePositionColor,
  (url, position) =>
    `${url}_${position?.x ?? 0}_${position?.y ?? 150}_${
      new Date().toISOString().split('T')[0]
    }`,
);

/**
 * clear cache of `getImagePositionColorWithCache`
 */
export const clearImagePositionColorCache = () => {
  getImagePositionColorWithCache.cache.clear?.();
};

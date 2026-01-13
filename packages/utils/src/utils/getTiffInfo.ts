import memoize from 'lodash/memoize';
import * as UTIF from 'utif';

/**
 * Asynchronously fetches a TIFF image from the provided URL, decodes it, and extracts its width, height, and RGBA data.
 *
 * @param {string} tiffUrl - The URL of the TIFF image to fetch and decode.
 * An object containing the width, height, and RGBA data of the decoded TIFF image, or undefined if an error occurs.
 *
 * @throws {Error} If the RGBA data length is invalid.
 */
export const getTiffInfo = async (tiffUrl: string) => {
  const response = await fetch(tiffUrl);
  const buffer = await response.arrayBuffer();

  const ifdList = UTIF.decode(buffer);
  const firstImage = ifdList[0];
  UTIF.decodeImage(buffer, firstImage);

  const rgba = UTIF.toRGBA8(firstImage);

  const width = Math.floor(firstImage.width);
  const height = Math.floor(firstImage.height);

  // Validate the size of the RGBA array
  if (rgba.length !== width * height * 4) {
    throw new Error(
      `Invalid RGBA data length: expected ${width * height * 4}, got ${
        rgba.length
      }`,
    );
  }

  return { width, height, rgba };
};

export const tiffInfoCache = memoize(
  getTiffInfo,
  // refetch one day again
  (url) => `${url}_${new Date().toISOString().split('T')[0]}`,
);

/**
 * Same as `getTiffInfo`, but with caching based on the URL within same date.
 *
 * like get in 2024-09-02, will not refetch in this day, if that is already fetch successfully.
 */
export const getTiffInfoWithCache = async (tiffUrl: string) => {
  try {
    return await tiffInfoCache(tiffUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error loading or rendering TIFF:', error);
  }
};

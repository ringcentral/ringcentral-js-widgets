import {
  Observable,
  catchError,
  firstValueFrom,
  from,
  shareReplay,
} from 'rxjs';

import { fileToBase64 } from './base64Handler';

const _currC2dLogo: Record<string, Observable<string>> = {};

async function _fileUrlToBase64(c2dLogo: string) {
  const image = await fetch(c2dLogo);
  const imageBlog = await image.blob();
  const base64URL = await fileToBase64(imageBlog);
  return base64URL;
}

/**
 * Converts a file URL to a base64 string.
 *
 * by default this method will auto cache the base64 string,
 * @param c2dLogo - The file URL to convert.
 * @param force - (Optional) If set to true, forces fetching the image again instead of using the cached base64 string.
 * @returns A Promise that resolves to the base64 string representation of the file.
 */
export const fileUrlToBase64 = async (c2dLogo: string, force = false) => {
  const cache = _currC2dLogo[c2dLogo];
  if (!force && cache) {
    return firstValueFrom(cache);
  }

  const url$ = from(_fileUrlToBase64(c2dLogo)).pipe(
    // save the base64 string to cache for share all same url request
    shareReplay(1),
    catchError((error) => {
      // when fetch failed, remove the cache, let outside to handle the error and can refetch again
      delete _currC2dLogo[c2dLogo];

      throw error;
    }),
  );

  _currC2dLogo[c2dLogo] = url$;

  return firstValueFrom(url$);
};

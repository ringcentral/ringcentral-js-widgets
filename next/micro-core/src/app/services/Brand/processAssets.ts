import type { BrandConfig } from './BrandConfig.interface';

const processedKey = '$$processed$$';

/** combine origin url with assets relative path to actual url */
export const processAssets = (
  assets: BrandConfig['assets'],
  origin: string,
) => {
  // when that processed, return directly
  if (!origin || assets![processedKey]) {
    return assets;
  }

  // Remove last slash from origin if any
  origin = origin.replace(/\/+$/, '');

  const getUrl = (url: string) => {
    return `${origin}${url}`;
  };

  return Object.entries(assets!).reduce<BrandConfig['assets']>(
    (acc, [key, url]) => {
      if (!url) {
        return acc;
      }

      if (Array.isArray(url)) {
        acc![key] = url.map((x) => getUrl(x));
      } else {
        acc![key] = getUrl(url);
      }

      return acc;
    },
    {
      [processedKey]: '1',
    },
  );
};

import type { BrandConfig } from './BrandConfig.interface';

const processedKey = '$$processed$$';

/** combine origin url with assets relative path to actual url */
export const processAssets = (
  assets: BrandConfig['assets'],
  origin: string,
) => {
  // when that processed, return directly
  // @ts-expect-error
  if (assets[processedKey]) {
    return assets;
  }

  const getUrl = (url: string) => {
    return `${origin}${url}`;
  };

  // @ts-expect-error
  return Object.entries(assets).reduce<BrandConfig['assets']>(
    (acc, [key, url]) => {
      if (!url) {
        return acc;
      }

      if (Array.isArray(url)) {
        // @ts-expect-error
        acc[key] = url.map((x) => getUrl(x));
      } else {
        // @ts-expect-error
        acc[key] = getUrl(url);
      }

      return acc;
    },
    {
      [processedKey]: '1',
    },
  );
};

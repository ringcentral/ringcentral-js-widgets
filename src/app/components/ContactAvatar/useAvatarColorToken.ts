import { useMemo } from 'react';

const avatarStyles = [
  'bg-extra-scarlet', // 'avatar.tomato',
  'bg-extra-amethyst', // 'avatar.blueberry',
  'bg-extra-denim-high-contrast', // 'avatar.oasis',
  'bg-extra-mango', // 'avatar.gold',
  'bg-extra-tiffany', // 'avatar.sage',
  'bg-neutral-static-b0/40', // 'avatar.ash',
  'bg-extra-tangerine-high-contrast', // 'avatar.persimmon',
  'bg-extra-lime-high-contrast', // 'avatar.pear',
  'bg-extra-mango-high-contrast', // 'avatar.brass',
  'bg-extra-denim', // 'avatar.lake',
];

// just for tailwind static can scan the colors
// const avatarStyles = [
// 'sui-squircle-bg-color-extra-scarlet', // 'avatar.tomato',
// 'sui-squircle-bg-color-extra-amethyst', // 'avatar.blueberry',
// 'sui-squircle-bg-color-extra-denim-high-contrast', // 'avatar.oasis',
// 'sui-squircle-bg-color-extra-mango', // 'avatar.gold',
// 'sui-squircle-bg-color-extra-tiffany', // 'avatar.sage',
// 'sui-squircle-bg-color-neutral-static-b0/40', // 'avatar.ash',
// 'sui-squircle-bg-color-extra-tangerine-high-contrast', // 'avatar.persimmon',
// 'sui-squircle-bg-color-extra-lime-high-contrast', // 'avatar.pear',
// 'sui-squircle-bg-color-extra-mango-high-contrast', // 'avatar.brass',
// 'sui-squircle-bg-color-extra-denim', // 'avatar.lake',
// ];

export function getAvatarColorTokenFromId(id: number | string) {
  let hash = 0;
  const total = avatarStyles.length;

  for (const i of `${id ?? ''}`) {
    hash = hash + String(i).charCodeAt(0);
  }

  if (hash < 0) hash = -hash;

  return avatarStyles[hash % total];
}

/**
 * get color with `id` from buildIn avatar color map
 *
 * this method copy from juno, just do the mapping to spring-ui token
 */
export const useAvatarColorToken = (id: number | string) => {
  const result = useMemo(() => getAvatarColorTokenFromId(id), [id]);

  return result;
};

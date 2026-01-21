import type { NavBarProps } from '../NavBar';

type TabSizeParams = {
  isVertical: boolean;
  tabHeight?: string;
  tabWidth?: string;
  tabLength?: number;
} & Pick<NavBarProps, 'direction'>;

export function getTabSize({
  isVertical,
  tabHeight,
  tabWidth,
  tabLength = 1,
}: TabSizeParams) {
  const width = tabWidth ?? tabLength > 0 ? `${(1 / tabLength) * 100}%` : '0';

  const height = isVertical ? tabHeight ?? '50px' : '100%';

  return { width, height };
}

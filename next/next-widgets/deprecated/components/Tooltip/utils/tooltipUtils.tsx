import { px } from '@ringcentral/juno';

const lightningPageWidth = 298;
const classicPageWidth = 198;
const lightningPageSpace = 16;
const classicPageSpace = 12;
// left and right both with 8
const muiMarginWidth = 16;

export const lightningWidth = px(
  lightningPageWidth - 2 * lightningPageSpace - muiMarginWidth,
);

export const classicWidth = px(
  classicPageWidth - 2 * classicPageSpace - muiMarginWidth,
);

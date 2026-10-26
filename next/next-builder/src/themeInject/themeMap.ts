// Only themes shipped in the public @ringcentral/spring-theme build are used here;
// partner brand themes exist only in RingCentral's internal build.
// @ts-ignore
import dark from '@ringcentral/spring-theme/tailwind/themes/dark';
// @ts-ignore
import highContrast from '@ringcentral/spring-theme/tailwind/themes/highContrast';
// @ts-ignore
import junoLight from '@ringcentral/spring-theme/tailwind/themes/junoLight';

export const themeMap = {
  '2000': junoLight,
  '2000.Optus': junoLight,
  '3000': junoLight,
  '3000.Brightspeed': junoLight,
  '3000.NWNC': junoLight,
  '3000.Zayo': junoLight,
  fedramp: junoLight,
  rc: junoLight,
  rc_dark: dark,
  rc_contrast: highContrast,
  rcau: junoLight,
  rcca: junoLight,
  rceu: junoLight,
  rcuk: junoLight,
  sharedConfig: junoLight,
};

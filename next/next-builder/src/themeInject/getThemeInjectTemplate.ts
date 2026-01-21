import fs from 'fs-extra';
import template from 'lodash/template';
import path from 'path';

import { themeMap } from './themeMap';

const getSuiPrimary = (obj: any) => {
  const theme: any = Object.entries(obj)[0][1];

  return {
    foreground: `rgb(${theme['--s-primary-b']})`,
    background: `rgb(${theme['--s-neutral-base']})`,
    loadingRing: `rgb(${theme['--s-neutral-b4']})`,
  };
};
// node_modules/@ringcentral/spring-theme/tailwind/themes
export function getThemeInjectTemplate(
  code: keyof typeof themeMap | undefined,
  options: {
    /**
     * rawScript: return script content without script tag
     * inlineScript: return script content with script tag
     */
    renderAs?: 'inlineScript' | 'rawScript';
  } = {
    renderAs: 'inlineScript',
  },
) {
  const { renderAs } = options;
  // brandConfig.code
  const mainSource = fs
    .readFileSync(path.join(__dirname, './inline/themeInject.js'))
    .toString();

  const theme = code && themeMap[code];

  if (!theme)
    throw new Error('theme not found, please add the brand code into themeMap');

  const primaryColor = getSuiPrimary(theme);
  const darkColors = getSuiPrimary(themeMap['rc_dark']);
  const contrastColors = getSuiPrimary(themeMap['rc_contrast']);

  const scriptContent = template(mainSource)({
    primaryColor: primaryColor.foreground,
    bgColor: primaryColor.background,
    loadingRing: primaryColor.loadingRing,

    darkPrimaryColor: darkColors.foreground,
    darkBgColor: darkColors.background,
    darkLoadingRing: darkColors.loadingRing,

    contrastPrimaryColor: contrastColors.foreground,
    contrastBgColor: contrastColors.background,
    contrastLoadingRing: contrastColors.loadingRing,
  });

  if (renderAs === 'inlineScript') {
    return /*html*/ `<script>${scriptContent}</script>`;
  }
  return scriptContent;
}

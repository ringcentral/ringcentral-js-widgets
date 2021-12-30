import { keys, reduce } from 'ramda';

import { CssModuleVariable } from '@ringcentral-integration/commons/modules/Brand';
import { RcTheme } from '@ringcentral/juno';

/**
 * get value from theme
 * @param value value of getter
 * @param theme current theme
 * @returns target theme value
 */
export const getThemeValue = (value: any, theme: RcTheme): string => {
  try {
    if (typeof value === 'function') {
      const next = value({ theme });
      return getThemeValue(next, theme);
    }
    return value;
  } catch (e) {
    return '';
  }
};

/**
 * get variable style string from variable object
 * @param variable
 */
export const getCssVariableString = (variable: CssModuleVariable) => `
--rc-blue: ${variable.rcBlue};
--bigRed: ${variable.bigRed};
--darkRed: ${variable.darkRed};
--tomato: ${variable.tomato};
--orange: ${variable.orange};
--leaf: ${variable.leaf};
--dark: ${variable.dark};
--night: ${variable.night};
--ash: ${variable.ash};
--coin: ${variable.coin};
--smoke: ${variable.smoke};
--silver: ${variable.silver};
--egg: ${variable.egg};
--snow: ${variable.snow};
--rc-orange: ${variable.rcOrange};
--darkergray: ${variable.darkergray};
--darkgray: ${variable.darkgray};
--gray: ${variable.gray};
--bggray: ${variable.bggray};
--lightgray: ${variable.lightgray};
--grey-light: ${variable.greyLight};
--missed: ${variable.missed};
--active: ${variable.active};
--primary-color: ${variable.primaryColor};
--primary-color-highlight: ${variable.primaryColorHighlight};
--primary-color-highlight-solid: ${variable.primaryColorHighlightSolid};
--line-panel-background-color: ${variable.linePanelBackgroundColor};
--call-btn-color: ${variable.callBtnColor};
--extension-background-color: ${variable.extensionBackgroundColor};
--sms-bubble-background-color: ${variable.smsBubbleBackgroundColor};
--brand-font-color: ${variable.brandFontColor};
--brand-font-color-highlight: ${variable.brandFontColorHighlight};
--jupiter-background-color: ${variable.jupiterBackgroundColor};
${'' /** project related overwrite */}
--c2d-arrow-color: ${variable.c2dArrowColor};
--add-meeting-btn-color: ${variable.addMeetingBtnColor};
--add-meeting-btn-text-color: ${variable.addMeetingBtnTextColor};
--ext-option-btn-color: ${variable.extOptionBtnColor};`;

/**
 * get css variable object
 * @param variable current theme variable
 * @param theme current theme object
 * @returns theme variable value object
 *
 * ```js
 * {
 *   variable: '#FFF',
 *   variable2: '#000',
 *   variable3: '#AAA',
 *   ...
 * }
 * ```
 */
export const getThemeVariableValues = (
  variable: CssModuleVariable,
  theme: RcTheme,
) => {
  return reduce(
    (acc, key) =>
      Object.assign(acc, { [key]: getThemeValue(variable[key], theme) }),
    {} as Record<keyof CssModuleVariable, string>,
    keys(variable),
  );
};

/**
 * get css variable string
 * @param variable current theme variable
 * @param theme current theme object
 * @returns theme variable style string
 *
 * ```css
 * --variable: #FFF
 * --variable2: #000
 * --variable3: #AAA
 * ```
 */
export const getThemeVariableString = (
  variable: CssModuleVariable,
  theme: RcTheme,
) => {
  const values = getThemeVariableValues(variable, theme);

  return getCssVariableString(values);
};

import {
  createGlobalStyle,
  css,
  RcThemedStyled,
  RcThemeProvider,
} from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

import { connectModule } from '../../lib/phoneContext';
import { ThemeContainerProps } from './ThemeContainer.interface';

type GlobalVariablesStylesProps = Pick<ThemeContainerProps, 'variable'>;

const GlobalVariablesCss: RcThemedStyled<GlobalVariablesStylesProps, any> = ({
  variable,
}) => {
  return css`
    :root {
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
      --lightergray: ${variable.lightergray};
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
      --header-logo-width: ${variable.headerLogoWidth};
      --header-logo-height: ${variable.headerLogoHeight};
    }
  `;
};

const GlobalVariablesStyles = createGlobalStyle<
  GlobalVariablesStylesProps
>`${GlobalVariablesCss}`;

const ThemeProvider: FunctionComponent<ThemeContainerProps> = ({
  children,
  theme,
  variable,
}) => {
  return (
    <RcThemeProvider theme={theme}>
      <GlobalVariablesStyles variable={variable} />
      {children}
    </RcThemeProvider>
  );
};

export const ThemeContainer = connectModule<any, ThemeContainerProps>(
  (phone) => phone.themeUI,
)(ThemeProvider);

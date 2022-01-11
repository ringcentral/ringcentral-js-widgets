import React, { FunctionComponent } from 'react';

import { createGlobalStyle, RcThemeProvider } from '@ringcentral/juno';

import { connectModule } from '../../lib/phoneContext';
import { ThemeContainerProps } from './ThemeContainer.interface';
import { getThemeVariableString } from './utils';

type GlobalVariablesStylesProps = Pick<ThemeContainerProps, 'variable'>;

const GlobalVariablesStyles = createGlobalStyle<GlobalVariablesStylesProps>`
  :root {
    ${({ variable, theme }) => getThemeVariableString(variable, theme)};
  }
`;

export const GlobalStyle = createGlobalStyle<{ style: string }>`
  :root {
    ${({ style }) => style};
  }
`;

const ThemeProvider: FunctionComponent<ThemeContainerProps> = ({
  children,
  theme,
  variable,
  prefixGlobalClass,
}) => {
  return (
    <RcThemeProvider theme={theme} prefixGlobalClass={prefixGlobalClass}>
      <GlobalVariablesStyles variable={variable} />
      {children}
    </RcThemeProvider>
  );
};

export const ThemeContainer = connectModule<any, Partial<ThemeContainerProps>>(
  (phone) => phone.themeUI,
)(ThemeProvider);

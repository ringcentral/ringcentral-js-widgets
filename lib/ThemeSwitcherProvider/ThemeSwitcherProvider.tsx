import './styles.scss';

import {
  RcDefaultDarkTheme,
  RcThemeSwitcherProvider,
  RcThemeSwitcherProviderProps,
} from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

import { defaultTheme } from '../phoneContext/theme';

export const ThemeSwitcherDefaultTheme = {
  defaultTheme: 'light',
  themeMap: {
    light: defaultTheme,
    dark: RcDefaultDarkTheme,
  },
};

export const ThemeSwitcherProvider: FunctionComponent<RcThemeSwitcherProviderProps> = ({
  children,
  defaultTheme = ThemeSwitcherDefaultTheme.defaultTheme,
  themeMap = ThemeSwitcherDefaultTheme.themeMap,
}) => {
  return (
    <RcThemeSwitcherProvider defaultTheme={defaultTheme} themeMap={themeMap}>
      {children}
    </RcThemeSwitcherProvider>
  );
};

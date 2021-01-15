import { RcButton, useThemeSwitcher } from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

export interface ThemeSwitcherProps {}

export const ThemeSwitcher: FunctionComponent<ThemeSwitcherProps> = () => {
  const { setTheme } = useThemeSwitcher();

  return (
    <>
      <RcButton
        onClick={() => {
          setTheme('light');
        }}
      >
        Light
      </RcButton>
      <RcButton
        onClick={() => {
          setTheme('dark');
        }}
      >
        Dark
      </RcButton>
    </>
  );
};

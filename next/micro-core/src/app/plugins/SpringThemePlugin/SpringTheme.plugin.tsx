import {
  computed,
  getRef,
  injectable,
  logger,
  optional,
  PluginModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import {
  suiHighContrast,
  suiDark,
  suiJunoLight,
  ThemeProvider,
} from '@ringcentral/spring-theme';
import { MotionConfig } from 'framer-motion';
import React, { PropsWithChildren, useEffect } from 'react';

import { Brand, Theme, THEME_TYPE_STORAGE_KEY } from '../../services';

import type {
  SpringThemePluginOptions,
  SpringThemePluginProps,
} from './SpringTheme.plugin.interface';

const sprintDefaultThemeMap = {
  dark: suiDark,
  contrast: suiHighContrast,
};

@injectable({
  name: 'SpringThemePlugin',
})
export class SpringThemePlugin extends PluginModule {
  @computed
  get themeProps() {
    const currType =
      this._theme.themeType ||
      localStorage.getItem(THEME_TYPE_STORAGE_KEY) ||
      'light';

    return {
      themeType: currType,
      theme: this.getTheme(currType),
      prefersReducedMotion: this._theme.prefersReducedMotion,
    };
  }

  private getTheme(type: string) {
    // spring only support dark rcDark and rcHighContact in rc brand
    // so for those theme type use default theme map instead directly
    if (type === 'dark' || type === 'contrast') {
      return sprintDefaultThemeMap[type];
    }

    const processTheme = this._springThemePluginOptions?.processTheme;
    if (processTheme) {
      return processTheme(type) || suiJunoLight;
    }

    const brand = this._brand;
    const IDBTheme = brand.brandConfig.theme;
    if (
      // when is force idb theme, never use brand assets data from brand.suiThemeMap
      IDBTheme?.force
    ) {
      if (IDBTheme.suiThemeMap?.[type as keyof typeof IDBTheme.suiThemeMap]) {
        return IDBTheme.suiThemeMap[type as keyof typeof IDBTheme.suiThemeMap];
      }

      return suiJunoLight;
    }

    const curr = brand.suiThemeMap[type as keyof typeof brand.suiThemeMap];
    return curr?.[0]?.theme || suiJunoLight;
  }

  constructor(
    private _brand: Brand,
    private _theme: Theme,
    @optional('SpringThemePluginOptions')
    private _springThemePluginOptions: SpringThemePluginOptions,
  ) {
    super();
  }

  override provider = ({
    children,
  }: PropsWithChildren<SpringThemePluginProps>) => {
    const { theme, themeType, prefersReducedMotion } = useConnector(
      () => this.themeProps,
    );

    useEffect(() => {
      logger.log(`[${getRef(this).identifier}] theme info`, {
        themeType,
      });
    }, [themeType]);

    return (
      <ThemeProvider theme={theme}>
        <MotionConfig reducedMotion={prefersReducedMotion}>
          {children}
        </MotionConfig>
      </ThemeProvider>
    );
  };
}

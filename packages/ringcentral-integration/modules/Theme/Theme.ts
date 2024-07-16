import {
  action,
  computed,
  globalStorage,
  RcModuleV2,
  state,
  watch,
} from '@ringcentral-integration/core';
import { createTheme, type RcTheme } from '@ringcentral/juno';

import { Module } from '../../lib/di';
import type { BrandThemeMap } from '../Brand/Brand.interface';
import type { CssModuleVariable } from '../Brand/BrandConfig.interface';

import type { Deps } from './Theme.interface';
import { defaultCssVariable } from './defaultCssVariable';

@Module({
  name: 'Theme',
  deps: ['Brand', { dep: 'ThemeOptions', optional: true }],
})
export class Theme extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
      enableGlobalCache: true,
      storageKey: 'Theme',
    });
  }

  @globalStorage
  @state
  themeId: string | null = null;

  @action
  setThemeId(val: string | null) {
    this.themeId = val;
  }

  @globalStorage
  @state
  themeType = '';

  @action
  setThemeType(type: string) {
    this.themeType = type;
  }

  override onInitOnce() {
    const defaultThemeType = this._deps.brand.brandConfig.theme?.defaultTheme;
    if (defaultThemeType) {
      this.setThemeType(defaultThemeType);
    }

    watch(
      this,
      () => this._deps.brand.brandConfig.theme,
      (newValue) => {
        const newDefaultThemeType = newValue?.defaultTheme;

        if (newDefaultThemeType && newDefaultThemeType !== this.themeType) {
          this.setThemeType(newDefaultThemeType);
        }
      },
    );
  }

  @computed((that: Theme) => [
    that.themeType,
    that._deps.brand.themeMap,
    that._deps.brand.brandConfig.theme?.themeMap,
    that._deps.brand.defaultConfig.theme?.themeMap,
  ])
  get theme() {
    const themeType = this.themeType as keyof BrandThemeMap;

    // when themeType not be set, use light as default theme to find correct theme
    const targetThemeType = themeType || 'light';
    const curr = (this._deps.brand.brandConfig.theme?.themeMap?.[
      targetThemeType
    ] ||
      this._deps.brand.defaultConfig.theme?.themeMap?.[targetThemeType] ||
      // when still not found, use default juno theme
      // we must have default theme, that will use in c2d variable
      createTheme()) as RcTheme;

    const processTheme = this._deps.themeOptions?.processTheme;
    return processTheme ? processTheme(targetThemeType, curr) : curr;
  }

  @computed((that: Theme) => [that._deps.brand.brandConfig.theme?.variable])
  get variable() {
    return {
      ...defaultCssVariable,
      ...this._deps.brand.brandConfig.theme?.variable,
    } as CssModuleVariable;
  }
}

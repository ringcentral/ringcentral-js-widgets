import {
  action,
  computed,
  globalStorage,
  RcModuleV2,
  state,
  watch,
} from '@ringcentral-integration/core';
import type { RcTheme } from '@ringcentral/juno';

import { Module } from '../../lib/di';
import type { CssModuleVariable } from '../Brand/BrandConfig.interface';
import { defaultCssVariable } from './defaultCssVariable';
import type { Deps } from './Theme.interface';

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
          this.setThemeType(newValue.defaultTheme);
        }
      },
    );
  }

  get theme() {
    const curr = this._deps.brand.brandConfig.theme?.themeMap?.[
      this.themeType
    ] as any;

    return curr as RcTheme;
  }

  @computed((that: Theme) => [that._deps.brand.brandConfig.theme?.variable])
  get variable() {
    return {
      ...defaultCssVariable,
      ...this._deps.brand.brandConfig.theme?.variable,
    } as CssModuleVariable;
  }
}

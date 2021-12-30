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
import { CssModuleVariable } from '../Brand/BrandConfig.interface';
import { defaultCssVariable } from './defaultCssVariable';
import { Deps } from './Theme.interface';

@Module({
  name: 'Theme',
  deps: ['Brand', { dep: 'ThemeOptions', optional: true }],
})
export class Theme extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'Theme',
    });
  }

  @globalStorage
  @state
  themeType: string = '';

  @action
  setThemeType(type: string) {
    this.themeType = type;
  }

  onInitOnce() {
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

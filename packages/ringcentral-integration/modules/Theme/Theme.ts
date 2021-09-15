import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
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

  @storage
  @state
  themeType: string = '';

  @action
  setThemeType(type: string) {
    this.themeType = type;
  }

  onInitOnce() {
    // only watch config defaultTheme when first time init app.
    if (this.themeType === '') {
      watch(
        this,
        () => this._deps.brand.brandConfig.theme?.defaultTheme,
        (newValue) => {
          this.setThemeType(newValue);
        },
      );
    }
  }

  get theme() {
    return this._deps.brand.brandConfig.theme?.themeMap?.[this.themeType];
  }

  @computed((that: Theme) => [that._deps.brand.brandConfig.theme?.variable])
  get variable() {
    return {
      ...defaultCssVariable,
      ...this._deps.brand.brandConfig.theme?.variable,
    };
  }
}

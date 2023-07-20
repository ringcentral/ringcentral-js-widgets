import { Module } from '@ringcentral-integration/commons/lib/di';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import type { ThemeContainerProps } from '../../containers/ThemeContainer/ThemeContainer.interface';
import type { Deps } from './ThemeUI.interface';

@Module({
  name: 'ThemeUI',
  deps: ['Theme'],
})
export class ThemeUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  @proxify
  async setThemeType(type: string) {
    this._deps.theme.setThemeType(type);
  }

  getUIProps({ theme }: ThemeContainerProps): UIProps<ThemeContainerProps> {
    return {
      theme: this._deps.theme.theme ?? theme,
      variable: this._deps.theme.variable,
    };
  }

  getUIFunctions(): UIFunctions<any> {
    return {};
  }
}

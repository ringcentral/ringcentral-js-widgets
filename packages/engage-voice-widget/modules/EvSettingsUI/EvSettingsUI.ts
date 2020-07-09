import { Module } from 'ringcentral-integration/lib/di';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import {
  EvSettingsUIProps,
  EvSettingsUIFunctions,
} from '../../interfaces/EvSettingsUI.interface';
import { SettingsUI, DepsModules } from './EvSettingsUI.interface';

@Module({
  name: 'EvSettingsUI',
  deps: [
    'Locale',
    'RouterInteraction',
    'Auth',
    'EvSettings',
    'EvCallMonitor',
    'EvAuth',
    {
      dep: 'Version',
      optional: true,
    },
  ],
})
class EvSettingsUI extends RcUIModuleV2<DepsModules> implements SettingsUI {
  constructor({
    locale,
    routerInteraction,
    auth,
    version,
    evSettings,
    evCallMonitor,
    evAuth,
  }) {
    super({
      modules: {
        locale,
        routerInteraction,
        auth,
        version,
        evSettings,
        evCallMonitor,
        evAuth,
      },
    });
  }

  getUIProps(): EvSettingsUIProps {
    return {
      currentLocale: this._modules.locale.currentLocale,
      version: this._modules.version,
    };
  }

  getUIFunctions(): EvSettingsUIFunctions {
    return {
      onLogout: () => this._modules.evAuth.logout(),
    };
  }
}
export { EvSettingsUI };

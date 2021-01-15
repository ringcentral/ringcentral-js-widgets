import { RcUIModuleV2 } from '@ringcentral-integration/core';
import Module from 'ringcentral-integration/lib/di/decorators/module';

import { Deps } from './CallHistoryUI.interface';

@Module({
  name: 'CallHistoryUI',
  deps: [
    'Locale',
    'Brand',
    'CallHistory',
    'RegionSettings',
    'ConnectivityMonitor',
    'RateLimiter',
    'DateTimeFormat',
    'RolesAndPermissions',
    { dep: 'CallLogger', optional: true },
    { dep: 'Call', optional: true },
    { dep: 'ComposeText', optional: true },
    { dep: 'DialerUI', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    { dep: 'ExtensionInfo', optional: true },
    'ContactMatcher',
    'RouterInteraction',
    'ContactSearch',
    'ConnectivityManager',
  ],
})
export class CallHistoryUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps() {
    const { currentLocale } = this._deps.locale;
    return {
      calls: this._deps.callHistory.calls,
      currentLocale,
    };
  }

  getUIFunctions() {
    return {};
  }
}

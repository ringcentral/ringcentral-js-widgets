import Module from '@ringcentral-integration/commons/lib/di/decorators/module';
import {
  RcUIModuleV2,
  UIProps,
  UIFunctions,
} from '@ringcentral-integration/core';
import { Deps } from './ConnectivityBadgeUI.interface';
import { ConnectivityBadgeProps } from '../../components/ConnectivityBadge';

@Module({
  name: 'ConnectivityBadgeUI',
  deps: [
    'Locale',
    'ConnectivityManager',
    { dep: 'ConnectivityBadgeUIOptions', optional: true },
  ],
})
export class ConnectivityBadgeUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  getUIProps(): UIProps<ConnectivityBadgeProps> {
    return {
      currentLocale: this._deps.locale.currentLocale,
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      mode:
        (this._deps.connectivityManager.ready &&
          this._deps.connectivityManager.mode) ||
        null,
      webphoneConnecting:
        this._deps.connectivityManager.ready &&
        this._deps.connectivityManager.webphoneConnecting,
      hasLimitedStatusError:
        this._deps.connectivityManager.ready &&
        this._deps.connectivityManager.hasLimitedStatusError,
    };
  }

  getUIFunctions(): UIFunctions<ConnectivityBadgeProps> {
    return {
      onClick: () => {
        if (this._deps.connectivityManager.isWebphoneUnavailableMode) {
          this._deps.connectivityManager.checkWebphoneAndConnect();
        } else if (this._deps.connectivityManager.hasLimitedStatusError) {
          this._deps.connectivityManager.checkStatus();
        } else {
          this._deps.connectivityManager.showConnectivityAlert();
        }
      },
      showBadgeAlert: () => {
        this._deps.connectivityManager.showConnectivityAlert();
      },
    };
  }
}

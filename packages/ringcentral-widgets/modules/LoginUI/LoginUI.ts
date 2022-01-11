import { Module } from '@ringcentral-integration/commons/lib/di';
import loginStatus from '@ringcentral-integration/commons/modules/Auth/loginStatus';
import {
  RcUIModuleV2,
  UIProps,
  UIFunctions,
} from '@ringcentral-integration/core';

import {
  Deps,
  LoginContainerProps,
  LoginUIPanelProps,
} from './LoginUI.interface';

@Module({
  name: 'LoginUI',
  deps: [
    'Auth',
    'ConnectivityMonitor',
    'Locale',
    'OAuth',
    'RateLimiter',
    { dep: 'LoginUIOptions', optional: true },
  ],
})
export class LoginUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T) {
    super({
      deps,
    });
  }

  getUIProps(props: LoginContainerProps): UIProps<LoginUIPanelProps> {
    return {
      currentLocale: this._deps.locale.currentLocale,
      disabled:
        !this._deps.oAuth.oAuthReady ||
        this._deps.rateLimiter.throttling ||
        !this._deps.connectivityMonitor.connectivity,
      showSpinner:
        !this._deps.auth.ready ||
        this._deps.auth.loginStatus === loginStatus.loggingIn ||
        this._deps.auth.loginStatus === loginStatus.loggingOut ||
        this._deps.auth.loginStatus === loginStatus.beforeLogout ||
        this._deps.auth.loginStatus === loginStatus.loggedIn,
    };
  }

  getUIFunctions(): UIFunctions<LoginUIPanelProps> {
    return {
      onLoginButtonClick: () => {
        this._deps.oAuth.openOAuthPage();
      },
    };
  }
}

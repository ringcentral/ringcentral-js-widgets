import { RcUIModuleV2 } from '@ringcentral-integration/core';
import Module from 'ringcentral-integration/lib/di/decorators/module';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';

import { Deps, GetLoginUIProps } from './LoginUI.interface';

@Module({
  name: 'LoginUI',
  deps: ['Auth', 'ConnectivityMonitor', 'Locale', 'OAuth', 'RateLimiter'],
})
export class LoginUI<T = {}> extends RcUIModuleV2<Deps & T> {
  constructor({ deps = {}, ...options }: Deps & { deps: Record<string, any> }) {
    super({
      deps: {
        ...options,
        ...deps,
      },
    });
  }

  getUIProps(props: GetLoginUIProps) {
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
      ...props,
    };
  }

  getUIFunctions() {
    return {};
  }
}

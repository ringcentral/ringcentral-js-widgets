import Module from 'ringcentral-integration/lib/di/decorators/module';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'LoginUI',
  deps: ['Auth', 'ConnectivityMonitor', 'Locale', 'OAuth', 'RateLimiter'],
})
export default class LoginUI extends RcUIModule {
  getUIProps({
    phone: { auth, connectivityMonitor, locale, oAuth, rateLimiter },
    version,
    showSignUp = false,
    onSignUpButtonClick,
  }) {
    return {
      currentLocale: locale.currentLocale,
      disabled:
        !oAuth.oAuthReady ||
        rateLimiter.throttling ||
        !connectivityMonitor.connectivity,
      version,
      showSpinner:
        !auth.ready ||
        auth.loginStatus === loginStatus.loggingIn ||
        auth.loginStatus === loginStatus.loggingOut ||
        auth.loginStatus === loginStatus.beforeLogout ||
        auth.loginStatus === loginStatus.loggedIn,
      showSignUp,
      onSignUpButtonClick,
    };
  }

  getUIFunctions({ phone: { oAuth } }) {
    return {
      onLoginButtonClick() {
        oAuth.openOAuthPage();
      },
    };
  }
}

import Module from '@ringcentral-integration/commons/lib/di/decorators/module';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'ConnectivityBadgeUI',
  deps: ['Locale', 'ConnectivityManager'],
})
export default class ConnectivityBadgeUI extends RcUIModule {
  _locale: any;

  _connectivityManager: any;

  constructor({ locale, connectivityManager, ...options }) {
    super({
      ...options,
    });

    this._locale = locale;
    this._connectivityManager = connectivityManager;
  }

  getUIProps() {
    return {
      currentLocale: this._locale.currentLocale,
      mode:
        (this._connectivityManager.ready && this._connectivityManager.mode) ||
        null,
      webphoneConnecting:
        this._connectivityManager.ready &&
        this._connectivityManager.webphoneConnecting,
      hasLimitedStatusError:
        this._connectivityManager.ready &&
        this._connectivityManager.hasLimitedStatusError,
    };
  }

  getUIFunctions() {
    const connectivityManager = this._connectivityManager;
    return {
      onClick() {
        if (connectivityManager.isWebphoneUnavailableMode) {
          connectivityManager.checkWebphoneAndConnect();
        } else if (connectivityManager.hasLimitedStatusError) {
          connectivityManager.checkStatus();
        } else {
          connectivityManager.showConnectivityAlert();
        }
      },
      showBadgeAlert() {
        connectivityManager.showConnectivityAlert();
      },
    };
  }
}

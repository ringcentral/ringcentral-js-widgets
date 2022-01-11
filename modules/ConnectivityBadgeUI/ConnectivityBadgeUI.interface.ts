import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { ConnectivityManager } from '../ConnectivityManager';

export interface ConnectivityBadgeUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  connectivityManager: ConnectivityManager;
  connectivityBadgeUIOptions?: ConnectivityBadgeUIOptions;
}

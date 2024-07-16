import type { Locale } from '@ringcentral-integration/commons/modules/Locale';

import type { ConnectivityManager } from '../ConnectivityManager';

export interface ConnectivityBadgeUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  connectivityManager: ConnectivityManager;
  connectivityBadgeUIOptions?: ConnectivityBadgeUIOptions;
}

import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { AudioSettings } from '@ringcentral-integration/commons/modules/AudioSettings';
import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { AvailabilityMonitor } from '@ringcentral-integration/commons/modules/AvailabilityMonitor';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import type { OAuth } from '../OAuth';

export interface Deps {
  alert: Alert;
  oAuth: OAuth;
  auth: Auth;
  connectivityMonitor: ConnectivityMonitor;
  availabilityMonitor?: AvailabilityMonitor;
  callingSettings?: CallingSettings;
  audioSettings?: AudioSettings;
  webphone?: Webphone;
}

import { Alert } from '@ringcentral-integration/commons/modules/Alert';
import { AudioSettings } from '@ringcentral-integration/commons/modules/AudioSettings';
import { Auth } from '@ringcentral-integration/commons/modules/Auth';
import { AvailabilityMonitor } from '@ringcentral-integration/commons/modules/AvailabilityMonitor';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import { OAuth } from '../OAuth';

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

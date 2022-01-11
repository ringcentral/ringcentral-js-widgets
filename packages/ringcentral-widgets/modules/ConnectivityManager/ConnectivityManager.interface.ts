import { Alert } from '@ringcentral-integration/commons/modules/AlertV2';
import { AudioSettings } from '@ringcentral-integration/commons/modules/AudioSettingsV2';
import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { AvailabilityMonitor } from '@ringcentral-integration/commons/modules/AvailabilityMonitorV2';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitorV2';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';

import OAuth from '../OAuth';

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

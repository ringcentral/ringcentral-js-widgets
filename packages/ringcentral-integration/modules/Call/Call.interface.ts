import { ActiveCallControl } from '../ActiveCallControl';
import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { AvailabilityMonitor } from '../AvailabilityMonitor';
import { Brand } from '../Brand';
import { CallingSettings } from '../CallingSettings';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { NumberValidate } from '../NumberValidate';
import { RegionSettings } from '../RegionSettings';
import { Ringout } from '../Ringout';
import { Softphone } from '../Softphone';
import { Storage } from '../Storage';
import { Webphone } from '../Webphone';

export interface ToNumberMatched {
  entityId: string;
  startTime: string | number;
}

export interface CallOptions {
  internationalCheck?: boolean;
  useCallControlToMakeCall?: boolean;
}

export interface Deps {
  activeCallControl?: ActiveCallControl;
  alert: Alert;
  availabilityMonitor?: AvailabilityMonitor;
  brand: Brand;
  callingSettings: CallingSettings;
  extensionFeatures: ExtensionFeatures;
  regionSettings: RegionSettings;
  ringout: Ringout;
  softphone: Softphone;
  storage: Storage;
  webphone?: Webphone;
  callOptions?: CallOptions;
  numberValidate: NumberValidate;
  appFeatures: AppFeatures;
}

export interface Recipient {
  phoneNumber: string;
  extension?: string;
}

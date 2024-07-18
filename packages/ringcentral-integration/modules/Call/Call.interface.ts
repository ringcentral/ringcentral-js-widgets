import type { ActiveCallControl } from '../ActiveCallControl';
import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { AvailabilityMonitor } from '../AvailabilityMonitor';
import type { Brand } from '../Brand';
import type { CallingSettings } from '../CallingSettings';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { NumberValidate } from '../NumberValidate';
import type { RegionSettings } from '../RegionSettings';
import type { Ringout } from '../Ringout';
import type { Softphone } from '../Softphone';
import type { Storage } from '../Storage';
import type { Webphone } from '../Webphone';

export interface ToNumberMatched {
  entityId: string;
  startTime: string | number;
}

export interface CallOptions {
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

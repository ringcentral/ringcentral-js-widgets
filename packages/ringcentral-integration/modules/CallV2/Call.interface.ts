import { ActiveCallControl } from '../ActiveCallControlV2';
import { Alert } from '../AlertV2';
import { AvailabilityMonitor } from '../AvailabilityMonitorV2';
import { Brand } from '../BrandV2';
import { CallingSettings } from '../CallingSettingsV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { NumberValidate } from '../NumberValidateV2';
import { RegionSettings } from '../RegionSettingsV2';
import { Ringout } from '../RingoutV2';
import { Softphone } from '../SoftphoneV2';
import { Storage } from '../StorageV2';
import { Webphone } from '../WebphoneV2';

export interface ToNumberMatched {
  entityId: string;
  startTime: string;
}

export interface CallOptions {
  permissionCheck?: boolean;
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
  numberValidate: NumberValidate;
  regionSettings: RegionSettings;
  ringout: Ringout;
  softphone: Softphone;
  storage: Storage;
  webphone?: Webphone;
  callOptions?: CallOptions;
}

export interface Recipient {
  phoneNumber: string;
  extension: string;
}

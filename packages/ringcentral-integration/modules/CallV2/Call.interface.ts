import Alert from '../Alert';
import Storage from '../Storage';
import Brand from '../Brand';
import Softphone from '../Softphone';
import Ringout from '../Ringout';
import NumberValidate from '../NumberValidate';
import RegionSettings from '../RegionSettings';
import { CallingSettings } from '../CallingSettingsV2';
import RolesAndPermissions from '../RolesAndPermissions';
import Webphone from '../Webphone';
import AvailabilityMonitor from '../AvailabilityMonitor';
import { ActiveCallControl } from '../ActiveCallControlV2';

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
  alert: Alert;
  storage: Storage;
  brand: Brand;
  softphone: Softphone;
  ringout: Ringout;
  numberValidate: NumberValidate;
  regionSettings: RegionSettings;
  callingSettings: CallingSettings;
  rolesAndPermissions: RolesAndPermissions;
  webphone?: Webphone;
  availabilityMonitor?: AvailabilityMonitor;
  callOptions?: CallOptions;
  activeCallControl?: ActiveCallControl;
}

export interface Recipient {
  phoneNumber: string;
  extension: string;
}

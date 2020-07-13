import Alert from '../Alert';
import Storage from '../Storage';
import Brand from '../Brand';
import Softphone from '../Softphone';
import Ringout from '../Ringout';
import NumberValidate from '../NumberValidate';
import RegionSettings from '../RegionSettings';
import CallingSettings from '../CallingSettings';
import RolesAndPermissions from '../RolesAndPermissions';
import Webphone from '../Webphone';
import AvailabilityMonitor from '../AvailabilityMonitor';

export interface ToNumberMatched {
  entityId: string;
  startTime: string;
}

export interface CallOptions {
  permissionCheck?: boolean;
  internationalCheck?: boolean;
}

export interface DepModules {
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
}

export type DepOptions = DepModules & { callOptions: CallOptions };

export interface Recipient {
  phoneNumber: string;
  extension: string;
}

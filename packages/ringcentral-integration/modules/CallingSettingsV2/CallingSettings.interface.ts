import Alert from '../Alert';
import Brand from '../Brand';
import RolesAndPermissions from '../RolesAndPermissions';
import TabManager from '../TabManager';
import Webphone from '../Webphone';
import ExtensionInfo from '../ExtensionInfo';
import ExtensionPhoneNumber from '../ExtensionPhoneNumber';
import ForwardingNumber from '../ForwardingNumber';
import { Storage } from '../StorageV2';
import { CallerId } from '../CallerId';
import ExtensionDevice from '../ExtensionDevice';

export interface Deps {
  alert: Alert;
  brand: Brand;
  extensionInfo: ExtensionInfo;
  extensionPhoneNumber: ExtensionPhoneNumber;
  forwardingNumber: ForwardingNumber;
  storage: Storage;
  rolesAndPermissions: RolesAndPermissions;
  callerId?: CallerId;
  tabManager?: TabManager;
  webphone?: Webphone;
  callingSettingsOptions?: CallingSettingsOptions;
  extensionDevice?: ExtensionDevice;
}

export interface CallingSettingsOptions {
  emergencyCallAvailable?: boolean;
  showCallWithJupiter?: boolean;
  onFirstLogin?: () => {};
  defaultRingoutPrompt?: boolean;
}

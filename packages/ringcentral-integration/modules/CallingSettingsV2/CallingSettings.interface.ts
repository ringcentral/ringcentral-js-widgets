import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { Brand } from '../Brand';
import { CallerId } from '../CallerIdV2';
import { ExtensionDevice } from '../ExtensionDeviceV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumberV2';
import { ForwardingNumber } from '../ForwardingNumberV2';
import { Softphone } from '../Softphone';
import { Storage } from '../StorageV2';
import { TabManager } from '../TabManager';
import { Webphone } from '../WebphoneV2';

export interface Deps {
  alert: Alert;
  brand: Brand;
  callerId?: CallerId;
  extensionDevice?: ExtensionDevice;
  appFeatures: AppFeatures;
  extensionInfo: ExtensionInfo;
  extensionPhoneNumber: ExtensionPhoneNumber;
  forwardingNumber: ForwardingNumber;
  storage: Storage;
  tabManager?: TabManager;
  webphone?: Webphone;
  softphone?: Softphone;
  callingSettingsOptions?: CallingSettingsOptions;
  extensionFeatures: ExtensionFeatures;
}

export interface CallingSettingsOptions {
  emergencyCallAvailable?: boolean;
  showCallWithJupiter?: boolean;
  onFirstLogin?: () => {};
  defaultRingoutPrompt?: boolean;
}

import { Alert } from '../AlertV2';
import { Brand } from '../BrandV2';
import { CallerId } from '../CallerIdV2';
import { ExtensionDevice } from '../ExtensionDeviceV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumberV2';
import { ForwardingNumber } from '../ForwardingNumberV2';
import { Storage } from '../StorageV2';
import { TabManager } from '../TabManagerV2';
import { Webphone } from '../WebphoneV2';

export interface Deps {
  alert: Alert;
  brand: Brand;
  callerId?: CallerId;
  extensionDevice?: ExtensionDevice;
  extensionFeatures: ExtensionFeatures;
  extensionInfo: ExtensionInfo;
  extensionPhoneNumber: ExtensionPhoneNumber;
  forwardingNumber: ForwardingNumber;
  storage: Storage;
  tabManager?: TabManager;
  webphone?: Webphone;
  callingSettingsOptions?: CallingSettingsOptions;
}

export interface CallingSettingsOptions {
  emergencyCallAvailable?: boolean;
  showCallWithJupiter?: boolean;
  onFirstLogin?: () => {};
  defaultRingoutPrompt?: boolean;
}

import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { Brand } from '../Brand';
import type { CallerId } from '../CallerId';
import type { ExtensionDevice } from '../ExtensionDevice';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';
import type { ForwardingNumber } from '../ForwardingNumber';
import type { Softphone } from '../Softphone';
import type { Storage } from '../Storage';
import type { TabManager } from '../TabManager';
import type { Webphone } from '../Webphone';

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

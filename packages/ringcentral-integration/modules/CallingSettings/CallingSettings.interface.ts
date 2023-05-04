import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { Brand } from '../Brand';
import { CallerId } from '../CallerId';
import { ExtensionDevice } from '../ExtensionDevice';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { ExtensionInfo } from '../ExtensionInfo';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';
import { ForwardingNumber } from '../ForwardingNumber';
import { Softphone } from '../Softphone';
import { Storage } from '../Storage';
import { TabManager } from '../TabManager';
import { Webphone } from '../Webphone';

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

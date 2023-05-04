import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { Brand } from '../Brand';
import { DialingPlan } from '../DialingPlan';
import { ExtensionInfo } from '../ExtensionInfo';
import { ExtensionNumberAreaCode } from '../ExtensionNumberAreaCode';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';
import { Storage } from '../Storage';
import { TabManager } from '../TabManager';

export interface RegionSettingsData {
  countryCode?: string;
  areaCode?: string;
}

export interface RegionSettingsOptions {
  suppressSettingsChangedWarning?: boolean;
}

export interface Deps {
  brand: Brand;
  alert: Alert;
  dialingPlan: DialingPlan;
  extensionInfo: ExtensionInfo;
  storage: Storage;
  tabManager?: TabManager;
  regionSettingsOptions?: RegionSettingsOptions;
  extensionNumberAreaCode?: ExtensionNumberAreaCode;
  extensionPhoneNumber: ExtensionPhoneNumber;
  appFeatures: AppFeatures;
}

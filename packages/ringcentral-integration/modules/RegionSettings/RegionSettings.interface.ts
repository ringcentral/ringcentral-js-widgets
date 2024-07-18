import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { Brand } from '../Brand';
import type { DialingPlan } from '../DialingPlan';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { ExtensionNumberAreaCode } from '../ExtensionNumberAreaCode';
import type { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';
import type { Storage } from '../Storage';
import type { TabManager } from '../TabManager';

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
  extensionNumberAreaCode: ExtensionNumberAreaCode;
  extensionPhoneNumber: ExtensionPhoneNumber;
  appFeatures: AppFeatures;
}

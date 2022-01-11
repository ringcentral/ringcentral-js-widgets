import { Alert } from '../AlertV2';
import { Brand } from '../Brand';
import { DialingPlan } from '../DialingPlanV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { Storage } from '../StorageV2';
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
}

import { Brand } from '../BrandV2';
import { Alert } from '../AlertV2';
import { Storage } from '../StorageV2';
import { DialingPlan } from '../DialingPlanV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { TabManager } from '../TabManagerV2';

export interface RegionSettingsData {
  countryCode?: string;
  areaCode?: string;
}

export interface RegionSettingsOptions {}

export interface Deps {
  brand: Brand;
  alert: Alert;
  dialingPlan: DialingPlan;
  extensionInfo: ExtensionInfo;
  storage: Storage;
  tabManager?: TabManager;
  regionSettingsOptions?: RegionSettingsOptions;
}

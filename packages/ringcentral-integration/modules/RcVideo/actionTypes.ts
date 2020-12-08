import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  moduleActionTypes,
  ModuleActionTypes,
} from '../../enums/moduleActionTypes';

export default ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'initSettingsStart',
    'initSettingsEnd',
    'initCreating',
    'created',
    'resetCreating', // for Office...TODO:
    'initUpdating',
    'updated',
    'resetUpdating',
    'updateDelegator',
    'updateDelegatorList',
    'updateMeetingSettings',
    'saveAsDefaultSetting',
    'savePersonalMeeting',
    'resetPersonalMeeting',
    'updateMeetingPreferences',
    'updateMeetingSettingLocks',
    'saveMeetingPreferencesState',
  ],
  'RcVideo',
);

export interface RcVideoActionTypes extends ModuleActionTypes {
  initSettingsStart: string;
  initSettingsEnd: string;
  initCreating: string;
  created: string;
  resetCreating: string;
  initUpdating: string;
  updated: string;
  resetUpdating: string;
  updateDelegatorList: string;
  updateMeetingSettings: string;
  saveAsDefaultSetting: string;
  savePersonalMeeting: string;
  resetPersonalMeeting: string;
  updateMeetingPreferences: string;
  saveMeetingPreferencesState: string;
  updateMeetingSettingLocks: string;
  updateDelegator: string;
}

import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import {
  moduleActionTypes,
  ModuleActionTypes,
} from '../../enums/moduleActionTypes';

export default ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    // Local meeting related
    'updateMeeting',
    'clearMeeting',
    // Meeting scheduling related
    'initScheduling',
    'scheduled',
    'resetScheduling',
    // Meeting updating related
    'initUpdating',
    'updated',
    'resetUpdating',
    'updatePersonalMeeting',
    'resetPersonalMeeting',
    'updateDelegatorList',
    'saveAsDefaultSetting',
    'updateMeetingPreferences',
    'saveMeetingPreferencesState',
    // Meeting settings from Service Web related
    'updateUserSettings',
    'updateLockedSettings',
  ],
  'meeting',
);

export interface MeetingActionTypes extends ModuleActionTypes {
  updateMeeting: string;
  clearMeeting: string;
  initScheduling: string;
  scheduled: string;
  resetScheduling: string;
  initUpdating: string;
  updated: string;
  resetUpdating: string;
  saveAsDefaultSetting: string;
  updateMeetingPreferences: string;
  saveMeetingPreferencesState: string;
  updatePersonalMeeting: string;
  resetPersonalMeeting: string;
  updateUserSettings: string;
  updateLockedSettings: string;
  updateDelegatorList: string;
}

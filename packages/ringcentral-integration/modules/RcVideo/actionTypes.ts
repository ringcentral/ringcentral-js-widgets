import { createEnum } from '../../lib/Enum';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export default createEnum(
  [
    'updateMeetingSettings',
    'saveAsDefaultSetting',
    'saveLastVideoSetting',
    'initCreating',
    'created',
    'resetCreating', // for Office...TODO:
    'initUpdating',
    'updated',
    'resetUpdating',
    'savePersonalMeeting',
  ],
  'RcVideo',
  moduleActionTypes,
);

export interface RcVideoActionTypes {
  updateMeetingSettings: string;
  saveAsDefaultSetting: string;
  saveLastVideoSetting: string;
  initSuccess: string;
  initCreating: string;
  created: string;
  resetCreating: string;
  initUpdating: string;
  updated: string;
  resetUpdating: string;
  savePersonalMeeting: string;
}

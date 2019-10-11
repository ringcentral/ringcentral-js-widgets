import { createEnum } from '../../lib/Enum';
import {
  moduleActionTypes,
  ModuleActionTypes,
} from '../../enums/moduleActionTypes';

export default createEnum(
  [
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
    'saveAsDefaultSetting',
  ],
  'meeting',
  moduleActionTypes,
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
}

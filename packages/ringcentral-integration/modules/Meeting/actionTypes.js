import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  // Local meeting related
  'updateMeeting',
  'clearMeeting',
  // Meeting scheduling related
  'initScheduling',
  'scheduled',
  'resetScheduling',
], 'meeting');

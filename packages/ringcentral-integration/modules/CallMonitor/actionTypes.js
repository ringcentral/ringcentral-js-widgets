import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'setData',
  'callItemClickTrack',
  'allCallsClickHoldTrack',
  'allCallsClickHangupTrack',
  'callControlClickAddTrack',
  'simplifiedControlClickMergeTrack',
  'callControlClickMergeTrack',
], 'callMonitorAcionTypes');

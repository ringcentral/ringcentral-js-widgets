import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'normalMode',
  'limitedMode',
  'appInitialError',
  'webRTCUnavailable',
  'sip',
], 'availabilityMonitor');

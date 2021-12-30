import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'normalMode',
    'VoIPOnlyMode',
    'VoIPOnlyReset',
    'limitedMode',
    'limitedModeStatusError',
    'webRTCUnavailable',
    'sip',
  ],
  'availabilityMonitor',
);

export default actionTypes;

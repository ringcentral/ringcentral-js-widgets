import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { baseActionTypes } from '../../lib/LoggerBase/baseActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [...ObjectMap.keys(baseActionTypes), 'setAutoLog'],
  'conversationLogger',
);

export default actionTypes;

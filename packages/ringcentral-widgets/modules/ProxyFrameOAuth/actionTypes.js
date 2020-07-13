import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { baseActionTypes } from '../../lib/OAuthBase/baseActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [...ObjectMap.keys(baseActionTypes), 'setupProxy', 'proxyRetry'],
  'proxyFrameOAuth',
);

export default actionTypes;

import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  ['loggedSuccess', 'loggedFailure'],
  'conversationLogStatus',
);

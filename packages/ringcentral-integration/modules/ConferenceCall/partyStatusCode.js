import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const partyStatusCode = ObjectMap.fromKeys([
  'answered',
  'gone',
  'disconnected',
]);

export default partyStatusCode;

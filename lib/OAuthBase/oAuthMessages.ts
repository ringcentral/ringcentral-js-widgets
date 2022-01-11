import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const oAuthMessages = ObjectMap.prefixKeys(
  ['accessDenied', 'internalError'],
  'oAuthMessages',
);

export default oAuthMessages;

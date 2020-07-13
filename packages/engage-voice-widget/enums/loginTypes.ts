import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const loginTypes = ObjectMap.fromKeys([
  'integratedSoftphone',
  'externalPhone',
  'RC_PHONE',
]);

export type LoginTypes = keyof typeof loginTypes;

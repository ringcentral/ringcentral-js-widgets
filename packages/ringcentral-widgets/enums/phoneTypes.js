import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

// FIXME: delete this after syncing up
export const phoneTypes = ObjectMap.fromKeys([
  'business',
  'extension',
  'home',
  'mobile',
  'phone',
  'unknown',
  'company',
  'direct',
  'fax',
  'other',
]);

export default phoneTypes;

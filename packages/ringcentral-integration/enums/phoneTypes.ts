import {
  ObjectMap,
  ObjectMapValue,
} from '@ringcentral-integration/core/lib/ObjectMap';

export const phoneTypes = ObjectMap.fromKeys([
  'business',
  'extension',
  'home',
  'mobile',
  'phone',
  'unknown',
  'company',
  'contact',
  'direct',
  'fax',
  'other',
]);

export type PhoneType = ObjectMapValue<typeof phoneTypes>;
export type PhoneTypes = Record<PhoneType, string>;

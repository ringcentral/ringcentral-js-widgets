import {
  ObjectMap,
  ObjectMapValue,
} from '@ringcentral-integration/core/lib/ObjectMap';

export const contactReadyStates = ObjectMap.prefixKeys(
  ['pending', 'loading', 'loaded'],
  'contactReadyStates',
);

export type ContactReadyState = ObjectMapValue<typeof contactReadyStates>;
export type ContactReadyStates = Record<ContactReadyState, string>;

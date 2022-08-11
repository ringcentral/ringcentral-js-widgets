import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callingOptions = ObjectMap.prefixKeys(
  [
    'softphone', // RingCentral phone
    'ringout', // ringout
    'browser', // webphone
    'jupiter', // RingCentral(jupiter)
  ],
  'callingOptions',
);

export type CallingOptionsKeys = keyof typeof callingOptions;
export type CallingOptionsType = typeof callingOptions[CallingOptionsKeys];

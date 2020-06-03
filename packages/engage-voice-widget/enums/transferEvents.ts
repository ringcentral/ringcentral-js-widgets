import { createEnum } from 'ringcentral-integration/lib/Enum';

export const transferEvents = createEnum(
  ['START', 'SUCCESS', 'END', 'ERROR'],
  'transfer',
);

export type TransferEvent = keyof typeof transferEvents;

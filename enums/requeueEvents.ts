import { createEnum } from 'ringcentral-integration/lib/Enum';

export const requeueEvents = createEnum(
  ['START', 'SUCCESS', 'FAILURE'],
  'requeue',
);

export type RequeueEvent = keyof typeof requeueEvents;

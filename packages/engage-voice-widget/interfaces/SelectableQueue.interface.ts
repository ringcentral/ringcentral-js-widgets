import { EvAvailableQueue } from '../lib/EvClient';

export type AvailableQueue = Pick<EvAvailableQueue, 'gateId' | 'gateName'> & {
  checked: boolean;
};

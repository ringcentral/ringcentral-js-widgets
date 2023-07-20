import type { EvAvailableQueue } from '../lib/EvClient';

export type AvailableQueue = Pick<EvAvailableQueue, 'gateId' | 'gateName'> & {
  checked: boolean;
};

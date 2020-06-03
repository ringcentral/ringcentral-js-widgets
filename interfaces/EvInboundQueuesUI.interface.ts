import { AvailableQueue } from './SelectableQueue.interface';

export interface EvInboundQueuesUIProps {
  currentLocale: string;
  inboundQueues: AvailableQueue[];
}

/** this is panel state with hook */
export type ChangeQueueStateFn = (queues: AvailableQueue[]) => void;

export interface EvInboundQueuesUIFunctions {
  renderFunction: (option: AvailableQueue) => string;
  searchOption: (option: AvailableQueue, text: string) => boolean;
  submitInboundQueues: (queues: AvailableQueue[]) => void;
  goBack(): void;
  getAssignedInboundQueues: (
    inboundQueues: AvailableQueue[],
  ) => AvailableQueue[];
  isAllAssign: (
    assignedInboundQueues: AvailableQueue[],
    inboundQueues: AvailableQueue[],
  ) => boolean;
  isSeveralAssign: (
    assignedInboundQueues: AvailableQueue[],
    inboundQueues: AvailableQueue[],
  ) => boolean;
  checkBoxOnChange: (
    gateId: string,
    inboundQueuesState: AvailableQueue[],
    /** this is panel state with hook */
    setInboundQueuesState: ChangeQueueStateFn,
  ) => void;
  allCheckBoxOnChange: (
    severalAssign: boolean,
    inboundQueuesState: AvailableQueue[],
    /** this is panel state with hook */
    setInboundQueuesState: ChangeQueueStateFn,
  ) => void;
}

export interface CallQueue {
  id: string;
  name: string;
  extensionNumber: string;
  editableMemberStatus: boolean;
}

export interface CallQueuePresence {
  callQueue: CallQueue;
  acceptCalls: boolean;
}

export interface CallQueuePresenceResponse {
  records: CallQueuePresence[];
}

export interface UpdateCallQueuePresenceParams {
  acceptCalls: boolean;
  callQueue: Pick<CallQueue, 'id'>;
}

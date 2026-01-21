export type FaxFilterStatus = 'All' | 'Sent' | 'Received' | 'Failed';

export type FaxFilterInfo = { status: FaxFilterStatus; badgeNumber?: number };

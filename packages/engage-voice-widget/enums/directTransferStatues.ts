export const directTransferStatues = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  SUCCEEDED: 'SUCCEEDED',
} as const;

export type DirectTransferStatues = keyof typeof directTransferStatues;

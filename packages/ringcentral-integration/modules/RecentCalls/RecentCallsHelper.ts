import type CallLogRecord from '@rc-ex/core/lib/definitions/CallLogRecord';
import type CallLogResponse from '@rc-ex/core/lib/definitions/CallLogResponse';

import type { HistoryCall } from '../CallHistory';

export const filterPhoneNumber =
  (call: HistoryCall) =>
  ({ phoneNumber }: { phoneNumber: string }) =>
    phoneNumber === call.from.phoneNumber ||
    phoneNumber === call.to.phoneNumber ||
    phoneNumber === call.from.extensionNumber ||
    phoneNumber === call.to.extensionNumber;

export const flattenToRecords = (items: CallLogResponse[]) =>
  items.reduce(
    (acc, { records }) => acc.concat(records),
    [] as CallLogRecord[],
  );

// Sort by time in descending order
// TODO: fix type optional in `@rc-ex/core/definitions`
export const sortByTime = (
  a: { startTime?: number },
  b: { startTime?: number },
) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime();

export const dedup = (calls: HistoryCall[]) => {
  const hash: Record<string, boolean> = {};
  return calls.reduce((acc, cur) => {
    if (hash[cur.id]) return acc;
    hash[cur.id] = true;
    return acc.concat(cur);
  }, []);
};

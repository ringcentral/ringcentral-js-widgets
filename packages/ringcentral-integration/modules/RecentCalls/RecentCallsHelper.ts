import type CallLogRecord from '@rc-ex/core/lib/definitions/CallLogRecord';
import type CallLogResponse from '@rc-ex/core/lib/definitions/CallLogResponse';

import type { HistoryCall } from '../CallHistory';

export const filterPhoneNumber =
  (call: HistoryCall) =>
  ({ phoneNumber }: { phoneNumber: string }) =>
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    phoneNumber === call.from.phoneNumber ||
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    phoneNumber === call.to.phoneNumber ||
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    phoneNumber === call.from.extensionNumber ||
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    phoneNumber === call.to.extensionNumber;

export const flattenToRecords = (items: CallLogResponse[]) =>
  items.reduce(
    // @ts-expect-error TS(2769): No overload matches this call.
    (acc, { records }) => acc.concat(records),
    [] as CallLogRecord[],
  );

// Sort by time in descending order
// TODO: fix type optional in `@rc-ex/core/definitions`
export const sortByTime = (
  a: { startTime?: number },
  b: { startTime?: number },
  // @ts-expect-error TS(2769): No overload matches this call.
) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime();

export const dedup = (calls: HistoryCall[]) => {
  const hash: Record<string, boolean> = {};
  return calls.reduce((acc, cur) => {
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    if (hash[cur.id]) return acc;
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    hash[cur.id] = true;
    // @ts-expect-error TS(2769): No overload matches this call.
    return acc.concat(cur);
  }, []);
};

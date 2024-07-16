import { callActions } from '../../enums/callActions';
import { normalizeStartTime } from '../../lib/callLogHelpers';
import getDateFrom from '../../lib/getDateFrom';

import type {
  CallLogList,
  CallLogRecord,
  CallLogRecords,
  CallLogSyncData,
} from './CallLog.interface';

export function processData(data: CallLogSyncData) {
  return {
    records: data.records,
    timestamp: Date.now(),
    syncToken: data.syncInfo?.syncToken,
  };
}

export function getISODateFrom(daySpan: number) {
  const d = getDateFrom(daySpan);
  return d.toISOString();
}

export function getISODateTo(records: CallLogList) {
  let dateTo: number | undefined;
  records.forEach((call) => {
    if (!dateTo || call.startTime < dateTo) dateTo = call.startTime;
  });
  return dateTo && new Date(dateTo).toISOString();
}

export function processRecords(
  records: CallLogRecords = [],
  supplementRecords: CallLogRecords = [],
) {
  const ids: Record<string, boolean> = {};
  const output: CallLogList = [];
  function processCall(call: CallLogRecord) {
    if (call.id && !ids[call.id] && call.action !== callActions.findMe) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { uri, ...removeUriCall } = call;
      output.push(normalizeStartTime(removeUriCall));
      ids[call.id] = true;
    }
  }
  records.forEach(processCall);
  supplementRecords.forEach(processCall);
  return output;
}

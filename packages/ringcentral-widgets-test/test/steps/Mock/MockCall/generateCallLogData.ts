import callLogBody from '@ringcentral-integration/commons/integration-test/mock/data/callLog.json';
import { v4 as uuidV4 } from 'uuid';
import { mergeDeepRight, mergeRight } from 'ramda';
import { CallLogSync, UserCallLogRecord } from '@ringcentral-integration/mock';
import { getISODateFrom } from '@ringcentral-integration/commons/modules/CallLog';

const callLogItem = callLogBody.records[0];
const DEFAULT_DAY_SPAN = 7;
export type CallLogItemProps = {
  toNumber?: string;
  toName?: string;
  fromNumber?: string;
  fromName?: string;
  sessionId?: string;
  result?: string;
  to?: ToFromProps;
  from?: ToFromProps;
  direction?: string;
  type?: string;
  action?: string;
  duration?: number;
  startTime?: string;
  telephonySessionId?: string;
};

interface ToFromProps {
  phoneNumber?: string;
  name?: string;
  extensionId?: string;
  location?: string;
  extensionNumber?: string;
}

const generateCallLogRecord = ({
  direction = 'Inbound',
  type = 'Voice',
  action = 'VoIP Call',
  result = 'Call connected',
  duration = 59,
  to,
  from,
  toNumber,
  toName,
  fromNumber,
  fromName,
  sessionId,
  startTime,
  telephonySessionId,
}: Partial<CallLogItemProps> = {}) => {
  const id = uuidV4();
  return {
    id,
    duration,
    sessionId: sessionId || uuidV4(),
    telephonySessionId: telephonySessionId || uuidV4(),
    type,
    action,
    result,
    direction,
    startTime: startTime || new Date(Date.now()).toISOString(),
    uri: `https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/call-log/${id}?view=Simple`,
    to: to || {
      phoneNumber: toNumber || callLogItem.to.phoneNumber,
      name: toName || callLogItem.to.name,
    },
    from: from || {
      phoneNumber: fromNumber || callLogItem.from.phoneNumber,
      name: fromName || callLogItem.from.name,
    },
  } as UserCallLogRecord;
};

/**
 * To generate history calls with specified custom property
 * @param item custom log data property array or object
 * @returns call log sync response
 */
export const generateCallLogData = (
  item: Partial<CallLogItemProps> | Partial<CallLogItemProps>[],
) => {
  if (Array.isArray(item)) {
    const records = item.map((val: Partial<CallLogItemProps>) =>
      generateCallLogRecord(val),
    );
    return mergeDeepRight(callLogBody, {
      records,
      syncInfo: {
        syncTime: new Date(Date.now()).toISOString(),
      },
    }) as CallLogSync;
  }
  return mergeDeepRight(callLogBody, {
    records: [generateCallLogRecord(item)],
    syncInfo: {
      syncTime: new Date(Date.now()).toISOString(),
    },
  }) as CallLogSync;
};

/**
 * Random history calls
 * @param {}
 * @returns random history calls
 */
export const randomHistoryCalls = ({
  total = 0,
  expiredCallNumber = 0,
}: {
  total?: number;
  expiredCallNumber?: number;
}) => {
  const calls: UserCallLogRecord[] = [];
  const before8Days = getISODateFrom(DEFAULT_DAY_SPAN + 1);
  for (let i = 0; i < total - expiredCallNumber; i++) {
    calls.push(generateCallLogRecord());
  }
  for (let i = 0; i < expiredCallNumber; i++) {
    calls.push(
      generateCallLogRecord({
        startTime: before8Days,
        toName: 'Expired Call',
      }),
    );
  }
  return mergeRight(callLogBody, { records: calls }) as CallLogSync;
};

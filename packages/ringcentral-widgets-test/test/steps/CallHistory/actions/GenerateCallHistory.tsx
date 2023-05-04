import callLogBody from '@ringcentral-integration/commons/integration-test/mock/data/callLog.json';
import {
  CallLogRecord as BaseCallLogRecord,
  getISODateFrom,
} from '@ringcentral-integration/commons/modules/CallLog';

interface CallLogRecord extends Omit<BaseCallLogRecord, 'startTime'> {
  startTime?: string;
}
type CallLogRecords = CallLogRecord[];

const DEFAULT_DAY_SPAN = 7;

export const GenerateCallHistory = ({
  length = 0,
  expiredCall = 0,
  mockRecords = [],
}: {
  length?: number;
  expiredCall?: number;
  mockRecords?: CallLogRecord[];
}) => {
  const { records } = callLogBody;
  const calls: CallLogRecords = [];
  const before8Days = getISODateFrom(DEFAULT_DAY_SPAN + 1);

  for (let i = 0; i < length - expiredCall; i++) {
    const sessionId = `${Number(records[0].sessionId) + i}`;
    calls.push({
      ...(records[0] as CallLogRecord),
      sessionId,
      id: `id${sessionId}`,
      startTime: new Date().toISOString(),
      ...mockRecords[i],
    });
  }
  for (let i = 0; i < expiredCall; i++) {
    const sessionId = `${Number(records[0].sessionId) - i}`;
    calls.push({
      ...(records[0] as CallLogRecord),
      sessionId,
      id: `id${sessionId}`,
      startTime: before8Days,
      to: {
        ...records[0].to,
        name: 'Expired Call',
      },
    });
  }
  (callLogBody.records as CallLogRecords) = calls;
  return callLogBody;
};

export const GenerateDateBeforeToday = (dayOffset: number) => {
  const date = new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000);
  return date.toISOString();
};

export const GenerateDateBeforeMinute = (minute: number) => {
  const date = new Date(Date.now() - minute * 60 * 1000);
  return date.toISOString();
};

export const GenerateSpecificNumber = (phoneNumber: string) => {
  return {
    phoneNumber,
    name: `phoneNumber:${phoneNumber}`,
  };
};

import type { GetMessageInfoResponse } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockMessageSyncProps {
  messageType?: 'Fax' | 'SMS' | 'Voicemail';
  records?: GetMessageInfoResponse[];
  repeat?: number;
  syncType?: 'ISync' | 'FSync';
  isDefaultInit?: boolean;
}

export const MockGetFaxMessage: StepFunction<MockMessageSyncProps> = (
  { records, repeat = 0, syncType = 'FSync' },
  { rcMock },
) => {
  const mock = () =>
    rcMock.getFaxMessageSync({ repeat, syncType }, (mockData) => ({
      ...mockData,
      records,
    }));

  if (rcMock.initialized) {
    return mock();
  }

  rcMock.replaceDefaultInitMock(rcMock.getFaxMessageSync, mock);
};

export const MockGetSmsMessage: StepFunction<MockMessageSyncProps> = (
  { records, repeat = 0, syncType = 'FSync', isDefaultInit = true },
  { rcMock },
) => {
  const mock = () =>
    rcMock.getSmsMessageSync({ repeat, syncType }, (mockData) => ({
      ...mockData,
      records: records ?? mockData.records,
    }));

  if (rcMock.initialized) {
    return mock();
  }

  if (!isDefaultInit) {
    return mock();
  }
  rcMock.replaceDefaultInitMock(rcMock.getSmsMessageSync, mock);
};

export const MockGetVoicemailMessage: StepFunction<MockMessageSyncProps> = (
  { records, repeat = 0, syncType = 'FSync' },
  { rcMock },
) => {
  const mock = () =>
    rcMock.getVoicemailMessageSync({ repeat, syncType }, (mockData) => ({
      ...mockData,
      records: records ?? mockData.records,
    }));

  if (rcMock.initialized) {
    return mock();
  }

  rcMock.replaceDefaultInitMock(rcMock.getVoicemailMessageSync, mock);
};

export const MockGetMessage: StepFunction<MockMessageSyncProps> = (props) => {
  switch (props.messageType) {
    case 'Fax':
      return <MockGetFaxMessage {...props} />;
    case 'SMS':
      return <MockGetSmsMessage {...props} />;
    case 'Voicemail':
      return <MockGetVoicemailMessage {...props} />;
  }
};

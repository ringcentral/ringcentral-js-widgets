import extensionInfoBody from '@ringcentral-integration/mock/src/platform/data/extensionInfo.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockMeetingInfoProps {
  pmiPassword?: string;
  jbhIsChecked?: boolean;
  usePersonalMeetingId?: boolean;
}

export const MockMeetingInfo: StepFunction<MockMeetingInfoProps> = async (
  { pmiPassword, jbhIsChecked, usePersonalMeetingId },
  { rcMock },
) => {
  rcMock.replaceDefaultInitMock(rcMock.getMeeting, () => {
    rcMock.getMeeting((mockData) => {
      mockData.usePersonalMeetingId =
        usePersonalMeetingId ?? mockData.usePersonalMeetingId;
      mockData.password = pmiPassword ?? '';
      mockData.host.id = `${extensionInfoBody.id}`;
      mockData.allowJoinBeforeHost = jbhIsChecked ?? false;
      return mockData;
    });
  });
};

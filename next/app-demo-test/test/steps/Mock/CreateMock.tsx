import { RcMock, WebSocketMock } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface CreateMockProps {
  /**
   * Whether to auto logout after each test
   */
  autoLogout?: boolean;
  useRcm?: boolean;
  enableSeparateMessageSyncMock?: boolean;
}

export const CreateMock: StepFunction<CreateMockProps> = async (
  { autoLogout = true, useRcm },
  context,
) => {
  if (context.rcMock) {
    return;
  }
  const rcMock = new RcMock({
    subscription: new WebSocketMock(),
    enableValidation: false,
  });

  if (useRcm) {
    rcMock.replaceDefaultInitMock(rcMock.getVideoConfiguration, () => {
      rcMock.getVideoConfiguration((mockData) => {
        mockData.provider = 'RCMeetings';
        return mockData;
      });
    });
  }

  global.instance = {
    ...global.instance,
    autoLogout,
    rcMock,
  };
};

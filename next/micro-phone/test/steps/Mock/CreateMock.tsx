import { WebSocketMock } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

import { RcMock } from './RcMock';

interface CreateMockProps {}

export const CreateMock: StepFunction<CreateMockProps> = async ({}) => {
  const rcMock = new RcMock({
    subscription: new WebSocketMock(),
    enableValidation: false,
    enableSeparateMessageSyncMock: true,
  });

  global.instance = {
    ...global.instance,
    rcMock,
  };
};

import messageListBody from '@ringcentral-integration/mock/src/platform/data/messageList.json';
import type { StepFunction } from '../../../lib/step';

interface MockMessageListProps {
  handler?: (messageList: typeof messageListBody) => any;
  isDefaultInit?: boolean;
  useFaker?: boolean;
  repeat?: number;
}

export const MockMessageList: StepFunction<MockMessageListProps> = async (
  { handler, isDefaultInit = false, useFaker = false, repeat = 1 },
  { rcMock },
) => {
  const responseFunc = (mockData) => {
    if (!useFaker) {
      return handler?.(messageListBody) ?? messageListBody;
    }
    return handler?.(mockData) ?? mockData;
  };

  if (!isDefaultInit) {
    rcMock.getMessageStore(responseFunc, repeat);
    return;
  }
  rcMock.defaultInitMocks.delete(rcMock.getMessageStore);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getMessageStore(responseFunc, repeat);
  });
};

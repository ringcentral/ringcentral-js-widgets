import type { StepFunction } from '../../../lib/step';
import { mockMessageListData } from '../../../__mock__';
import type { MessageProps } from './MessageProps.interface';

interface IReceiveSMSSuccess extends MessageProps {
  phoneNumber: string;
  textMessage: string;
  conversationId?: string;
  skipCheck?: boolean;
}
export const ReceiveSMSSuccess: StepFunction<IReceiveSMSSuccess> = async (
  props,
  context,
) => {
  const messageId = Date.now();
  const { rcMock } = context;
  const mockMessageParam = {
    id: messageId,
    direction: 'Inbound',
    fromNumber: props.phoneNumber,
    subject: props.textMessage,
    messageType: 'SMS',
  };
  if (props.conversationId) {
    mockMessageParam.conversationId = props.conversationId;
  }
  await rcMock.receiveMessage({}, (mockData) => ({
    ...mockData,
    ...mockMessageListData(mockMessageParam),
  }));
};

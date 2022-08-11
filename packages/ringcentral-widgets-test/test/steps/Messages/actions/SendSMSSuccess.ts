import { waitFor } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';
import { generateMessageRecord, mockMessageListData } from '../../../__mock__';
import { MessageProps } from './MessageProps.interface';
import { SendSMS } from './SendSMS';

interface SendSMSSuccessProps extends MessageProps {
  phoneNumber: string;
  textMessage: string;
  conversationId?: string;
  skipCheck?: boolean;
}
/**
 * Monitor sending sms from compose text and
 * mock number-parser API and
 * mock post sms API and
 * mock an outbound sms notification
 *
 * remember to add
 *
 *  * ```ts
 * this.context.rcMock.defaultInitMocks.delete(
 *   this.context.rcMock.postSms,
 * );
 * ```
 * before Entry if postSms is in rcMock defaultInitMock
 */
export const SendSMSSuccess: StepFunction<SendSMSSuccessProps> = async (
  props,
  context,
) => {
  const messageId = Date.now();
  const { rcMock, phone } = context;
  rcMock.postSms(() =>
    generateMessageRecord({
      id: messageId,
      direction: 'Outbound',
      toNumber: props.phoneNumber,
      subject: props.textMessage,
      type: 'SMS',
    }),
  );
  await SendSMS(props, context);
  const mockMessageParam = {
    id: messageId,
    direction: 'Outbound',
    toNumber: props.phoneNumber,
    subject: props.textMessage,
    messageType: 'SMS',
    conversationId: props.conversationId,
  };
  await rcMock.receiveMessage({}, (mockData) => ({
    ...mockData,
    ...mockMessageListData(mockMessageParam),
  }));

  if (!props.skipCheck) {
    await waitFor(() =>
      expect(phone.routerInteraction.currentPath).toContain('/conversations/'),
    );
  }
};

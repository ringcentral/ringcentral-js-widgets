import { waitFor } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';
import { generateMessageRecord, mockMessageListData } from '../../../__mock__';
import type { MessageProps } from './MessageProps.interface';
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
 * remember to delete default init mock before login
 *
 * ```ts
 * action={ClearSMSMock}
 * ```
 * before Entry if postSms is in rcMock defaultInitMock
 */
export const SendSMSSuccess: StepFunction<SendSMSSuccessProps> = async (
  { phoneNumber, textMessage, conversationId, skipCheck },
  context,
) => {
  const messageId = Date.now();
  const { rcMock, phone } = context;
  rcMock.postSms(() =>
    generateMessageRecord({
      id: messageId,
      direction: 'Outbound',
      toNumber: phoneNumber,
      subject: textMessage,
      type: 'SMS',
    }),
  );

  await SendSMS(
    {
      phoneNumber,
      textMessage,
    },
    context,
  );

  const mockMessageParam = {
    id: messageId,
    direction: 'Outbound',
    toNumber: phoneNumber,
    subject: textMessage,
    messageType: 'SMS',
    conversationId,
  };
  await rcMock.receiveMessage({}, (mockData) => ({
    ...mockData,
    ...mockMessageListData(mockMessageParam),
  }));

  if (!skipCheck) {
    await waitFor(() =>
      expect(phone.routerInteraction.currentPath).toContain('/conversations/'),
    );
  }
};

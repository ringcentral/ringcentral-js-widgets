import type { StepFunction } from '../../../lib/step';

interface CheckHoldProps {
  callId: string;
  type: 'hold' | 'unhold';
}

export const CheckHoldBehavior: StepFunction<CheckHoldProps> = async (
  { callId, type },
  { phone },
) => {
  const currentCall = phone.webphone.sessions.find(
    (item) => item.id === callId,
  );
  expect(phone.webphone[type]).toHaveBeenCalledWith(currentCall?.id);
};

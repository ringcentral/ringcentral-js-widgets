import type { NumberData } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';

import type { StepFunction } from '../../../lib/step';
import { AnswerCall } from '../SmallCallControl';
import { MakeInboundCall } from './MakeInboundCall';
import { MakeOutboundCall } from './MakeOutboundCall';

interface MakeCallProps {
  phoneNumber?: string;
  status?: 'ring' | 'connected';
  direction?: 'Inbound' | 'Outbound';
  useUserAgentSession?: boolean;
  telephonySessionId?: string;
  fromNumberData?: NumberData;
}

export const MakeCall: StepFunction<MakeCallProps> = async (
  {
    phoneNumber = '+18882556247',
    direction = 'Outbound',
    status = 'ring',
    useUserAgentSession = false,
    telephonySessionId,
    fromNumberData,
  },
  context,
) => {
  const { rcMock } = context;
  const originalMakeCall = rcMock.makeCall;
  if (telephonySessionId) {
    rcMock.makeCall = async ({ ...props }) => {
      const result = originalMakeCall.call(rcMock, {
        ...props,
        telephonySessionId,
      });
      return result;
    };
  }
  if (direction === 'Inbound') {
    return [
      <MakeInboundCall
        phoneNumber={phoneNumber}
        useUserAgentSession={useUserAgentSession}
        fromNumberData={fromNumberData}
      />,
      status === 'connected' ? AnswerCall : () => {},
    ];
  }

  return <MakeOutboundCall phoneNumber={phoneNumber} />;
};

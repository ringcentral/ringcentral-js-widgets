import {
  PartyStatusCode,
  type NumberData,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import type { StepFunction } from '@ringcentral-integration/test-utils';

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
  isConferenceCall?: boolean;
  conferenceCallParticipants?: { phoneNumber?: string }[];
}

export const MakeCall: StepFunction<MakeCallProps> = async (
  {
    phoneNumber = '+18882556247',
    direction = 'Outbound',
    status = 'ring',
    useUserAgentSession = false,
    telephonySessionId,
    fromNumberData,
    isConferenceCall,
    conferenceCallParticipants,
  },
  context,
) => {
  const { rcMock } = context;

  if (isConferenceCall) {
    const conferenceSessionId = await rcMock.makeCall({
      originType: 'Conference',
      telephonySessionId,
    });
    if (conferenceCallParticipants)
      for (const participant of conferenceCallParticipants) {
        await rcMock.makeCall({
          ...participant,
          status: PartyStatusCode.gone,
          isWebRTC: false,
          reason: 'Conference',
          peerId: {
            telephonySessionId: conferenceSessionId,
            partyId: `${conferenceSessionId}-1`,
          },
        });
      }
  } else {
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
        status === 'connected'
          ? AnswerCall
          : () => {
              //
            },
      ];
    }

    return <MakeOutboundCall phoneNumber={phoneNumber} />;
  }
};

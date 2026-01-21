import { telephonySessionBuildersCache } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import { CONFERENCE_ORIGIN_TYPE } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockAddPartyProps {
  repeat?: number;
  status?: 201 | 500;
}

export const MockAddParty: StepFunction<MockAddPartyProps> = (
  { repeat, status = 201 },
  { rcMock },
) => {
  rcMock.post(
    '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/bring-in',
    status,
    {
      repeat,
      response: ({ params, body }) => {
        const conferenceTelephonySessionBuilder =
          telephonySessionBuildersCache.find(
            (x) => x.getTelephonySessionId() === params.telephonySessionId,
          );
        if (!conferenceTelephonySessionBuilder) {
          throw new Error(
            `Conference session builder notfound ${params.telephonySessionId}`,
          );
        }

        const telephonySessionToMergeWithBuilder =
          telephonySessionBuildersCache.find(
            (x) => x.getSessionId() === body.sessionId,
          );
        if (!telephonySessionToMergeWithBuilder) {
          throw new Error(`Session builder notfound ${body.sessionId}`);
        }

        telephonySessionToMergeWithBuilder.setGone();
        telephonySessionToMergeWithBuilder.reason(CONFERENCE_ORIGIN_TYPE);
        telephonySessionToMergeWithBuilder.setConferenceRole('Participant');
        telephonySessionToMergeWithBuilder.setPeerId({
          telephonySessionId:
            conferenceTelephonySessionBuilder.getTelephonySessionId(),
          partyId: conferenceTelephonySessionBuilder.getPartyId(),
          sessionId: conferenceTelephonySessionBuilder.getSessionId(),
        });

        const notificationMessage = telephonySessionToMergeWithBuilder.done();
        rcMock.subscription.trigger(notificationMessage);

        return {
          body: {} as any,
        };
      },
    },
  );
};

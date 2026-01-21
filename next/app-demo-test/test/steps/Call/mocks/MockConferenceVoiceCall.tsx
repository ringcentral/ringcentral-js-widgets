import {
  createTelephonySession,
  makePartyId,
  makeTelephonySessionId,
  makeVoiceCallToken,
  PartyStatusCode,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import { FakeSession as FakeSipSession } from '@ringcentral-integration/mock';
import {
  ActiveCallControl,
  CONFERENCE_ORIGIN_TYPE,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockConferenceVoiceCallProps {}

export const MockConferenceVoiceCall: StepFunction<
  MockConferenceVoiceCallProps
> = (_, { app, rcMock }) => {
  rcMock.postConferenceCall((call) => {
    const callRevised: typeof call = {
      ...call,
      session: {
        ...call.session,
        id: makeTelephonySessionId(),
        voiceCallToken: makeVoiceCallToken(),
      },
    };
    // hook relevant id for making phone call
    FakeSipSession.setCurrentPartyData({
      sessionId: callRevised.session.id,
      partyId: makePartyId(callRevised.session.id),
    });
    return callRevised;
  });

  const activeCallControl = app.container.got(ActiveCallControl);
  if (!activeCallControl) {
    throw new Error('ActiveCallControl is mandatory');
  }
  const webphone = app.container.got(Webphone);
  if (!webphone) {
    throw new Error('Webphone is mandatory');
  }

  const originalInitConferenceVoiceCall =
    activeCallControl._initConferenceVoiceCall;

  jest
    .spyOn(activeCallControl, '_waitForWebphoneSessionAccepted')
    .mockImplementation(async () => Promise.resolve());

  jest
    .spyOn(activeCallControl, '_initConferenceVoiceCall')
    .mockImplementation(async (voiceCallToken) => {
      const webphoneSession = await originalInitConferenceVoiceCall.call(
        activeCallControl,
        voiceCallToken,
      );

      const { id: webphoneSessionId = '' } = webphoneSession! || {};

      // clear hook after call is made
      FakeSipSession.clearCurrentPartyData();

      // build telephony session
      const newSession = webphone.sessions.find(
        (x) => x.id === webphoneSessionId,
      )!;
      const conferenceTelephonySessionBuilder = createTelephonySession({
        phoneNumber: voiceCallToken,
        telephonySessionId: newSession.partyData?.sessionId,
        direction: 'Outbound',
        sessionId: newSession.id,
        status: PartyStatusCode.proceeding,
        originType: CONFERENCE_ORIGIN_TYPE,
        conferenceRole: 'Host',
      });

      // trigger notification
      await rcMock.holdOtherCalls(
        conferenceTelephonySessionBuilder.getTelephonySessionId(),
      );
      const sendNotification = async () => {
        const event = conferenceTelephonySessionBuilder.done();
        await rcMock.subscription.trigger(event);
      };
      await sendNotification();

      // set related webphone session
      const newSipSession = webphone.originalSessions[webphoneSessionId];
      conferenceTelephonySessionBuilder.setRelatedWebphoneSession(
        newSipSession,
      );

      // reflect sip (custom) event
      newSipSession.on('hold' as any, async () => {
        conferenceTelephonySessionBuilder.setHoldCall();
        await sendNotification();
      });
      newSipSession.on('unhold' as any, async () => {
        conferenceTelephonySessionBuilder.setConnected();
        await sendNotification();
      });

      // trigger sip session event
      // @ts-ignore
      newSipSession.trigger('progress', {});
      // @ts-ignore
      newSipSession.trigger('accepted', {});

      return webphoneSession;
    });
};

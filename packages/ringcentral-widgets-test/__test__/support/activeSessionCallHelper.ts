import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import {
  createTelephonySession,
  NumberData,
  PartyStatusCode,
  telephonySessionBuildersCache,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import { sleep } from '@ringcentral-integration/utils';
import WebphoneSessionMock from './WebphoneSessionMock';
import { mockPubnub, mockWebphone } from './callHelper';

type normalStatus = 'ring' | 'connected';

type CallDirectionsKeys = keyof typeof callDirections;

type CallDirections = typeof callDirections[CallDirectionsKeys];

export interface InitACallProps {
  phoneNumber?: string;
  isWebRTC?: boolean;
  direction?: CallDirections;
  telephonySessionId?: string;
  sessionId?: string;
  status?: normalStatus;
  fromNumberData?: NumberData;
  toNumberData?: NumberData;
  startTime?: string;
  isRecording?: boolean;
  useUserAgentSession?: boolean;
  tempSocketMockServer?: { trigger(...args: any[]): Promise<void> };
}

interface InitACallFunc {
  (initParams: InitACallProps): any;
}

const initACall: InitACallFunc = async ({
  phoneNumber,
  isWebRTC = true,
  direction = callDirections.outbound,
  telephonySessionId = new Date().getTime().toString(),
  sessionId = new Date().getTime().toString(),
  status = 'ring',
  fromNumberData,
  toNumberData,
  startTime,
  tempSocketMockServer,
  ...props
}) => {
  const partyStatus =
    status === 'ring' ? PartyStatusCode.proceeding : PartyStatusCode.answered;
  const telephonySessionBuilder = createTelephonySession({
    phoneNumber,
    telephonySessionId,
    direction,
    sessionId,
    status: partyStatus,
    fromNumberData,
    toNumberData,
    startTime,
    ...props,
  });

  const telephoneSessionId = telephonySessionBuilder.telephoneSessionId;

  if (tempSocketMockServer) {
    // temp solution for introduce wsg, will remove soon after introduce `rc mock`;
    await tempSocketMockServer.trigger(telephonySessionBuilder.done());
    await sleep(2000);
  } else {
    await mockPubnub(telephonySessionBuilder.done());
  }

  if (isWebRTC) {
    const webSession = new WebphoneSessionMock(telephoneSessionId);
    const callEvent =
      direction === callDirections.inbound ? 'invite' : 'inviteSent';
    await mockWebphone(callEvent, webSession);
  }

  return telephoneSessionId;
};

function getLastTelephonySessionBuilder() {
  return telephonySessionBuildersCache[
    telephonySessionBuildersCache.length - 1
  ];
}

const connectLatestCall = async (
  tempSocketMockServer?: InitACallProps['tempSocketMockServer'],
) => {
  const telephonySessionBuilder = getLastTelephonySessionBuilder();
  telephonySessionBuilder.setConnected();
  const data = telephonySessionBuilder.done();
  if (tempSocketMockServer) {
    await tempSocketMockServer.trigger(data);
  } else {
    await mockPubnub(data);
  }
};

const disConnectLatestCall = async (
  tempSocketMockServer?: InitACallProps['tempSocketMockServer'],
) => {
  const telephonySessionBuilder = getLastTelephonySessionBuilder();
  telephonySessionBuilder.setDisconnected();
  const data = telephonySessionBuilder.done();
  if (tempSocketMockServer) {
    await tempSocketMockServer.trigger(data);
  } else {
    await mockPubnub(data);
  }
};

const holdCall = async (
  telephonySessionId: string,
  tempSocketMockServer?: InitACallProps['tempSocketMockServer'],
) => {
  const telephonySessionBuilder = telephonySessionBuildersCache.find(
    (s: any) => s.data.body.telephonySessionId === telephonySessionId,
  );
  telephonySessionBuilder?.setHoldCall();
  const data = telephonySessionBuilder?.done();

  if (tempSocketMockServer) {
    await tempSocketMockServer.trigger(data);
  } else {
    await mockPubnub(data);
  }
};

export { initACall, connectLatestCall, disConnectLatestCall, holdCall };

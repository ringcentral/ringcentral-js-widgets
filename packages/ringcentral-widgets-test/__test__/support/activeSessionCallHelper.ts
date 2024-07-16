import {
  callDirection,
  type CallDirection,
} from '@ringcentral-integration/commons/enums/callDirections';
import type { NumberData } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import {
  createTelephonySession,
  makeTelephonySessionId,
  makeWebphoneSessionId,
  PartyStatusCode,
  telephonySessionBuildersCache,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import { sleep } from '@ringcentral-integration/utils';

import WebphoneSessionMock from './WebphoneSessionMock';
import { mockPubnub, mockWebphone } from './callHelper';

type normalStatus = 'ring' | 'connected';

export interface InitACallProps {
  phoneNumber?: string;
  isWebRTC?: boolean;
  direction?: CallDirection;
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

export const initACall: InitACallFunc = async ({
  phoneNumber,
  isWebRTC = true,
  direction = callDirection.outbound,
  telephonySessionId = makeTelephonySessionId(),
  sessionId = makeWebphoneSessionId(),
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

  if (tempSocketMockServer) {
    // temp solution for introduce wsg, will remove soon after introduce `rc mock`;
    await tempSocketMockServer.trigger(telephonySessionBuilder.done());
    await sleep(2000);
  } else {
    await mockPubnub(telephonySessionBuilder.done());
  }

  if (isWebRTC) {
    const webSession = new WebphoneSessionMock(
      telephonySessionBuilder.getTelephonySessionId(),
      telephonySessionBuilder.getPartyId(),
      telephonySessionBuilder.getSessionId(),
    );
    const callEvent =
      direction === callDirection.inbound ? 'invite' : 'inviteSent';
    await mockWebphone(callEvent, webSession);
  }

  return telephonySessionBuilder;
};

function getLastTelephonySessionBuilder() {
  return telephonySessionBuildersCache[
    telephonySessionBuildersCache.length - 1
  ];
}

export const connectLatestCall = async (
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

export const disConnectLatestCall = async (
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

export const holdCall = async (
  telephonySessionId: string,
  tempSocketMockServer?: InitACallProps['tempSocketMockServer'],
) => {
  const telephonySessionBuilder = telephonySessionBuildersCache.find(
    (s) => s.getTelephonySessionId() === telephonySessionId,
  );
  telephonySessionBuilder?.setHoldCall();
  const data = telephonySessionBuilder?.done();

  if (tempSocketMockServer) {
    await tempSocketMockServer.trigger(data);
  } else {
    await mockPubnub(data);
  }
};

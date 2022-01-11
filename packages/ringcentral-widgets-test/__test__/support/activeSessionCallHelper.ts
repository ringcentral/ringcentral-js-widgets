import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import {
  createTelephonySession,
  NumberData,
  PartyStatusCode,
  telephonySessionBuildersCache,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import WebphoneSessionMock from './WebphoneSessionMock';
import { mockPubnub, mockWebphone } from './callHelper';

type normalStatus = 'ring' | 'connected';

type CallDirectionsKeys = keyof typeof callDirections;

type CallDirections = typeof callDirections[CallDirectionsKeys];

interface InitACallProps {
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

  await mockPubnub(telephonySessionBuilder.done());

  if (isWebRTC) {
    const webSession = new WebphoneSessionMock(telephoneSessionId);
    const callEvent =
      direction === callDirections.inbound ? 'invite' : 'inviteSent';
    await mockWebphone(callEvent, webSession);
  }
};

function getLastTelephonySessionBuilder() {
  return telephonySessionBuildersCache[
    telephonySessionBuildersCache.length - 1
  ];
}

const connectLatestCall = async () => {
  const telephonySessionBuilder = getLastTelephonySessionBuilder();
  telephonySessionBuilder.setConnected();
  await mockPubnub(telephonySessionBuilder.done());
};

const disConnectLatestCall = async () => {
  const telephonySessionBuilder = getLastTelephonySessionBuilder();
  telephonySessionBuilder.setDisconnected();
  await mockPubnub(telephonySessionBuilder.done());
};

export { initACall, connectLatestCall, disConnectLatestCall };

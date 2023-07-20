// eslint-disable-next-line import/no-named-as-default
import { find } from 'ramda';
import type {
  Party,
  Session as TelephonySession,
  ReplyWithTextParams,
} from 'ringcentral-call-control/lib/Session';
import {
  PartyStatusCode,
  ReplyWithPattern,
} from 'ringcentral-call-control/lib/Session';
import type { Session } from 'ringcentral-call/lib/Session';
import type CallRecording from '@rc-ex/core/lib/definitions/CallRecording';

// eslint-disable-next-line import/no-named-as-default
import activeCallControlStatus from '../../enums/activeCallControlStatus';
import callDirections, { callDirection } from '../../enums/callDirections';
// eslint-disable-next-line import/no-named-as-default
import callResults from '../../enums/callResults';
import { recordStatus } from '../Webphone/recordStatus';
import { telephonyStatus } from '../../enums/telephonyStatus';
import type { ActiveCallControlSessionData } from './ActiveCallControl.interface';

// telephony session status match presence telephonyStatus
export function mapTelephonyStatus(telephonySessionStatus: PartyStatusCode) {
  switch (telephonySessionStatus) {
    case PartyStatusCode.setup:
    case PartyStatusCode.proceeding:
      return telephonyStatus.ringing;
    case PartyStatusCode.hold:
      return telephonyStatus.onHold;
    case PartyStatusCode.answered:
      return telephonyStatus.callConnected;
    case PartyStatusCode.parked:
      return telephonyStatus.parkedCall;
    default:
      return telephonyStatus.noCall;
  }
}

export function isHangUp(code: string) {
  return code === callResults.disconnected;
}

export function isRejectCode({
  direction,
  code,
}: {
  direction: string;
  code: string;
}) {
  return (
    direction === callDirections.inbound &&
    (code === activeCallControlStatus.setUp ||
      code === activeCallControlStatus.proceeding)
  );
}

export function isOnRecording(recordings: Array<CallRecording>) {
  if (!recordings || recordings.length === 0) {
    return false;
  }
  const recording = recordings[0];
  return recording.active;
}

// TODO: add call type in callMonitor module
export function normalizeSession({
  session,
}: {
  session: ActiveCallControlSessionData;
}) {
  const { party, creationTime, sessionId } = session;
  const { id: partyId, direction, from, to, status, recordings, muted } = party;

  const formatValue = {
    telephonySessionId: session.id,
    partyId,
    direction,
    from: from?.phoneNumber,
    fromNumber: from?.phoneNumber,
    fromUserName: from?.name,
    to: to?.phoneNumber,
    toNumber: to?.phoneNumber,
    toUserName: to?.name,
    id: session.id,
    sessionId,
    // @ts-expect-error
    callStatus: mapTelephonyStatus(status?.code),
    startTime: new Date(creationTime).getTime(),
    creationTime,
    isOnMute: muted,
    isForwarded: false,
    isOnFlip: false,
    isOnHold: status?.code === activeCallControlStatus.hold,
    isOnTransfer: false,
    isReplied: false,
    isToVoicemail: false,
    lastHoldingTime: 0,
    minimized: false,
    // @ts-expect-error
    recordStatus: isOnRecording(recordings)
      ? recordStatus.recording
      : recordStatus.idle,
    removed: false,
    // @ts-expect-error
    isReject: isRejectCode({ direction, code: status?.code }),
  };
  return formatValue;
}

export function conflictError({
  message,
  response,
}: {
  message: string;
  response: any;
}) {
  const conflictErrRgx = /409/g;
  const conflictMsgRgx = /Incorrect State/g;
  return (
    conflictErrRgx.test(message) &&
    conflictMsgRgx.test(response && response._text)
  );
}

export function isRinging(
  telephonySession: ActiveCallControlSessionData | Session,
) {
  return (
    telephonySession &&
    (telephonySession.status === PartyStatusCode.proceeding ||
      telephonySession.status === PartyStatusCode.setup) &&
    telephonySession.direction === callDirections.inbound
  );
}

export function isHolding(telephonySession: ActiveCallControlSessionData) {
  return telephonySession.status === PartyStatusCode.hold;
}

export function isRecording(session: ActiveCallControlSessionData) {
  const { party } = session;
  // @ts-expect-error
  return isOnRecording(party.recordings);
}

export function isForwardedToVoiceMail(session: ActiveCallControlSessionData) {
  return session.status === PartyStatusCode.voicemail;
}

export function isOnSetupStage(session: ActiveCallControlSessionData) {
  return session.status === PartyStatusCode.setup;
}

export function isFaxSession(session: ActiveCallControlSessionData) {
  return session.status === PartyStatusCode.faxReceive;
}

// call to main company number but still at inputting extension number prompt tone stage
export function isAtMainNumberPromptToneStage(session: Session) {
  if (!session) return false;
  const { otherParties = [], direction, status } = session;
  if (
    direction === callDirections.outbound &&
    status === PartyStatusCode.answered &&
    !otherParties.length
  ) {
    return true;
  }
  return false;
}

export function getInboundSwitchedParty(parties: Party[]) {
  if (!parties.length) return false;
  const result = find((party: Party) => {
    return (
      party.direction === callDirections.inbound &&
      party.status?.code === PartyStatusCode.disconnected &&
      // @ts-expect-error
      party.status?.reason === 'CallSwitch'
    );
  }, parties);
  return result;
}

export function filterDisconnectedCalls(
  session: Session | ActiveCallControlSessionData,
) {
  // workaround of bug:
  // switch an inbound call then call direction will change to outbound
  const { party, otherParties, direction, status } = session;
  if (
    direction === callDirection.outbound &&
    status !== PartyStatusCode.disconnected
  ) {
    const inboundSwitchedParty = getInboundSwitchedParty(otherParties);
    if (inboundSwitchedParty) {
      party.direction = inboundSwitchedParty.direction;
      party.to = inboundSwitchedParty.to;
      party.from = inboundSwitchedParty.from;
    }
  }
  return session.status !== PartyStatusCode.disconnected;
}

export function normalizeTelephonySession(
  session?: TelephonySession,
): ActiveCallControlSessionData {
  if (!session) {
    // @ts-expect-error
    return {};
  }
  return {
    accountId: session.accountId,
    creationTime: session.creationTime,
    // @ts-expect-error
    data: session.data,
    extensionId: session.extensionId,
    id: session.id,
    origin: session.origin,
    otherParties: session.otherParties,
    parties: session.parties,
    party: session.party,
    recordings: session.recordings,
    requestOptions: session.requestOptions,
    serverId: session.serverId,
    sessionId: session.sessionId,
    voiceCallToken: session.voiceCallToken,
  };
}

// fix call control api issue.
export const WEBPHONE_REPLY_TIME_UNIT = {
  Minute: '0',
  Hour: '1',
  Day: '2',
};

export const WEBPHONE_REPLY_TYPE = {
  customMessage: 0,
  callBack: 1,
  onMyWay: 2,
  inAMeeting: 5,
};

export function getWebphoneReplyMessageOption(params: ReplyWithTextParams) {
  if (params.replyWithText) {
    return {
      replyType: WEBPHONE_REPLY_TYPE.customMessage,
      replyText: params.replyWithText,
    };
  }
  if (params.replyWithPattern?.pattern === ReplyWithPattern.onMyWay) {
    return {
      replyType: WEBPHONE_REPLY_TYPE.onMyWay,
    };
  }
  if (params.replyWithPattern?.pattern === ReplyWithPattern.inAMeeting) {
    return {
      replyType: WEBPHONE_REPLY_TYPE.inAMeeting,
    };
  }
  const replyType = WEBPHONE_REPLY_TYPE.callBack;
  let callbackDirection;
  if (params.replyWithPattern?.pattern.includes('CallMe')) {
    callbackDirection = `1`;
  } else {
    callbackDirection = `0`;
  }
  return {
    replyType,
    timeValue: params.replyWithPattern?.time || '',
    timeUnits: WEBPHONE_REPLY_TIME_UNIT[params.replyWithPattern!.timeUnit!],
    callbackDirection,
  };
}

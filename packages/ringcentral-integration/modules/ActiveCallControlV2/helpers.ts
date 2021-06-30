import { CallRecording } from '@rc-ex/core/definitions';
import {
  Party,
  PartyStatusCode,
  Session as TelephonySession,
} from 'ringcentral-call-control/lib/Session';
import { Session } from 'ringcentral-call/lib/Session';
// eslint-disable-next-line import/no-named-as-default
import { find } from 'ramda';
import { recordStatus } from '../Webphone/recordStatus';
// eslint-disable-next-line import/no-named-as-default
import callResults from '../../enums/callResults';
import callDirections, { callDirection } from '../../enums/callDirections';
// eslint-disable-next-line import/no-named-as-default
import activeCallControlStatus from '../../enums/activeCallControlStatus';
import { mapTelephonyStatus } from '../CallMonitor/callMonitorHelper';
import { ActiveCallControlSessionData } from './ActiveCallControl.interface';

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
    recordStatus: isOnRecording(recordings)
      ? recordStatus.recording
      : recordStatus.idle,
    removed: false,
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

export function isRinging(telephonySession: ActiveCallControlSessionData) {
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
  return isOnRecording(party.recordings);
}

export function isForwardedToVoiceMail(session: ActiveCallControlSessionData) {
  return session.status === PartyStatusCode.voicemail;
}

export function isOnSetupStage(session: ActiveCallControlSessionData) {
  return session.status === PartyStatusCode.setup;
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
      party.status.code === PartyStatusCode.disconnected &&
      party.status.reason === 'CallSwitch'
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
    return {};
  }
  return {
    accountId: session.accountId,
    creationTime: session.creationTime,
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

import dayjs from 'dayjs';
import { PartyStatusCode } from 'ringcentral-call-control/lib/Session';
import { v4 as uuidV4 } from 'uuid';

import { callDirection, type CallDirection } from '../../enums/callDirections';

import extensionBody from './data/extensionInfo.json';
import telephonySessionMessage from './data/telephonySessions.json';

// "s-a4a012b34c545z18b6f423f7fzf4d9960000"
export const makeTelephonySessionId = () => `s-${uuidV4()}`;

// "p-a4a012b34c545z18b6f423f7fzf4d9960000-1"
export const makePartyId = (telephonySessionId: string) =>
  `p-${telephonySessionId.substring(2)}-1`;

// "e5c8acd0-dcc2-4767-b445-b0029bd8b85210.74.1.43-5070-b30665b0-599a-49b9-b"
export const makeWebphoneSessionId = () => uuidV4();

// "conf_732d613461306438313238356331617a31376662656163336664377a3830633664303030304031302e37342e31332e3132393a35303730"
export const makeVoiceCallToken = () => `conf_${uuidV4()}`;

/**
 * Telephony session message boy //https://developers.ringcentral.com/api-reference/Extension-Telephony-Sessions-Event
 * supports:
 * 1. create different telephony status's session;
 * 2. update telephony status;
 * 3. custom sessionId, from, to, direction attribute;
 *
 * @class TelephonySession
 */
export type PhoneNumber = {
  name: string;
  phoneNumber: string;
};

type PartyStatusCodeKeys = keyof typeof PartyStatusCode;
type recordingsProps = {
  id?: string;
  active?: boolean;
};

type ConferenceRole = 'Host' | 'Participant';

interface PeerId {
  telephonySessionId?: string;
  partyId?: string;
  sessionId?: string;
}

export type Party = {
  extensionId: string;
  id: string;
  direction: CallDirection;
  to: NumberData;
  from: NumberData;
  uiCallInfo?: any;
  status: {
    code: (typeof PartyStatusCode)[PartyStatusCodeKeys];
    reason: string;
    mobilePickupData: {
      ccMailboxes: string[];
      to: string;
      sid: string;
      srvLvl: string;
      srvLvlExt: string;
    };
    peerId?: PeerId;
  };
  recordings: recordingsProps[];
  missedCall: boolean;
  standAlone: boolean;
  muted: boolean;
  queueCall: boolean;
  conferenceRole?: ConferenceRole;
};

export type Origin = {
  type: string;
};

export type Body = {
  sequence: number;
  sessionId: string;
  // TODO: in test env, we not mock this._presence.calls, so there not have the id data, so apply that here temporary
  // apps/micro-phone/src/app/services/CallMonitor/CallMonitor.ts
  activeCallId: string;
  telephonySessionId: string;
  serverId: string;
  eventTime: string;
  accountId: string;
  parties: Party[];
  origin: Origin;
  extensionId: string;
  recordings: recordingsProps[];
};

let sequence = 10;
const DEFAULT_DIRECTION = callDirection.outbound;
const DEFAULT_RECORD_STATUS = false;
export const DEFAULT_PHONE_NUMBER = '+16501234567';

const DEFAULT_EXTENSION_ID = extensionBody.id.toString();
export const DEFAULT_SERVER_NAME = 'DEFAULT SERVER_NAME';

/**
 * global config for TelephonySessionBuilder
 */
export const TelephonySessionBuilderConfig = {
  disabledDefaultServerName: false,
};

export interface TelephonySessionInterface {
  uuid: string;
  event: string;
  timestamp: string;
  subscriptionId: string;
  ownerId: string;
  body: Body;
}

export interface NumberData {
  extensionNumber?: string;
  phoneNumber?: string;
  name?: string;
  extensionId?: string;
}

export interface TelephonySessionBuilderParams {
  telephonySessionId?: string;
  partyId?: string;
  sessionId?: string;
  phoneNumber?: string;
  direction?: CallDirection;
  status?: PartyStatusCode;
  fromNumberData?: NumberData;
  toNumberData?: NumberData;
  startTime?: string;
  isRecording?: boolean;
  muteStatus?: boolean;
  queueCall?: boolean;
  reason?: string;
  originType?: string;
  peerId?: PeerId;
  conferenceRole?: ConferenceRole;
}

export const telephonySessionBuildersCache: TelephonySessionBuilder[] = [];
export const clearTelephonySessionBuilders = () => {
  telephonySessionBuildersCache.length = 0; // clear
};

class TelephonySessionBuilder {
  private _telephonySessionId!: string;
  private _phoneNumber!: string;
  private _direction!: CallDirection;
  private _sessionId!: string;
  private _partyStatus!: PartyStatusCode;
  private _partyReason!: string;
  private _partyId!: string;
  private _fromNumberData?: NumberData;
  private _toNumberData?: NumberData;
  private _startTime?: string;
  private _isRecording!: boolean;
  private _muteStatus!: boolean;
  private _queueCall!: boolean;
  private _originType!: string;
  private _peerId?: PeerId;
  private _conferenceRole?: ConferenceRole;
  relatedWebphoneSession: any;

  constructor(initParams: TelephonySessionBuilderParams = {}) {
    this._init(initParams);
    telephonySessionBuildersCache.push(this);
  }

  _init({
    telephonySessionId = makeTelephonySessionId(),
    partyId = makePartyId(telephonySessionId),
    sessionId = makeWebphoneSessionId(),
    phoneNumber = DEFAULT_PHONE_NUMBER,
    direction = DEFAULT_DIRECTION,
    status = PartyStatusCode.proceeding,
    reason = 'AttendedTransfer',
    fromNumberData,
    toNumberData,
    startTime,
    isRecording = DEFAULT_RECORD_STATUS,
    muteStatus = false,
    queueCall = false,
    originType = 'Call',
    peerId,
    conferenceRole,
  }: TelephonySessionBuilderParams) {
    this._telephonySessionId = telephonySessionId;
    this._partyId = partyId;
    this._sessionId = sessionId;
    this._phoneNumber = phoneNumber;
    this._direction = direction;
    this._partyStatus = status;
    this._partyReason = reason;
    this._fromNumberData = fromNumberData;
    this._toNumberData = toNumberData;
    this._startTime = startTime;
    this._isRecording = isRecording;
    this._muteStatus = muteStatus;
    this._queueCall = queueCall;
    this._originType = originType;
    this._peerId = peerId;
    this._conferenceRole = conferenceRole;
  }

  setRelatedWebphoneSession(webphoneSession: any) {
    this.relatedWebphoneSession = webphoneSession;
  }

  direction(direction: CallDirection) {
    this._direction = direction;
    return this;
  }

  status(status: PartyStatusCode) {
    this._partyStatus = status;
    return this;
  }
  reason(reason: string) {
    this._partyReason = reason;
    return this;
  }

  to(toNumber: string) {
    this._phoneNumber = toNumber;
    return this;
  }

  from(fromNumber: string) {
    this._phoneNumber = fromNumber;
    return this;
  }

  sessionId(sessionId: string) {
    this._sessionId = sessionId;
    return this;
  }

  telephonySessionId(telephonySessionId: string) {
    this._telephonySessionId = telephonySessionId;
    return this;
  }

  partyId(partyId: string) {
    this._partyId = partyId;
    return this;
  }

  setConnected() {
    return this.status(PartyStatusCode.answered);
  }

  setDisconnected() {
    return this.status(PartyStatusCode.disconnected);
  }

  setGone() {
    return this.status(PartyStatusCode.gone);
  }
  setReason() {
    return this.reason('AttendedTransfer');
  }

  setHoldCall() {
    return this.status(PartyStatusCode.hold);
  }

  setMuteCall() {
    this._muteStatus = true;
    return this;
  }

  setUnmuteCall() {
    this._muteStatus = false;
    return this;
  }

  startRecord() {
    this._isRecording = true;
    return this;
  }

  stopRecord() {
    this._isRecording = false;
    return this;
  }

  setInboundCall() {
    return this.direction('Inbound');
  }

  setOutboundCall() {
    return this.direction('Outbound');
  }

  setNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
    return this;
  }

  setPeerId(peerId?: PeerId) {
    this._peerId = peerId;
    return this;
  }

  getPeerId() {
    return this._peerId;
  }

  setConferenceRole(role: ConferenceRole) {
    this._conferenceRole = role;
    return this;
  }

  setToNumberData(data: NumberData) {
    this._toNumberData = data;
    return this;
  }

  setFromNumberData(data: NumberData) {
    this._fromNumberData = data;
    return this;
  }

  done() {
    return this.data;
  }

  getSessionId() {
    return this._sessionId;
  }

  getPartyId() {
    return this._partyId;
  }

  getTelephonySessionId() {
    return this._telephonySessionId;
  }

  getStatus() {
    return this._partyStatus;
  }

  get numberData() {
    return {
      phoneNumber: this._phoneNumber,
      name: TelephonySessionBuilderConfig.disabledDefaultServerName
        ? ''
        : DEFAULT_SERVER_NAME,
      extensionId: DEFAULT_EXTENSION_ID,
    };
  }

  get recordings(): recordingsProps[] {
    return [
      {
        id: DEFAULT_EXTENSION_ID,
        active: this._isRecording,
      },
    ];
  }

  get data(): TelephonySessionInterface {
    return {
      ...telephonySessionMessage,
      uuid: uuidV4(),
      timestamp: dayjs().format(),
      subscriptionId: uuidV4(),
      body: {
        ...telephonySessionMessage.body,
        sequence: sequence++,
        activeCallId: this._sessionId,
        sessionId: this._sessionId,
        telephonySessionId: this._telephonySessionId,
        serverId: '10.62.25.111.TAM',
        eventTime: this._startTime || Date(),
        accountId: '400144452008',
        extensionId: DEFAULT_EXTENSION_ID,
        parties: [
          {
            extensionId: DEFAULT_EXTENSION_ID,
            id: this._partyId,
            direction: this._direction,
            to: this._toNumberData || this.numberData,
            from: this._fromNumberData || this.numberData,
            uiCallInfo: this._queueCall
              ? { primary: { type: 'QueueName', value: 'Dummy Call Queue' } }
              : undefined,
            status: {
              code: this._partyStatus,
              reason: this._partyReason,
              mobilePickupData: {
                ccMailboxes: ['400144455008'],
                to: '#19008@platform.devtest.ringcentral.com:5060',
                sid: '402936472080',
                srvLvl: '-149699523',
                srvLvlExt: '390',
              },
              peerId: this._peerId,
            },
            recordings: this.recordings,
            missedCall: false,
            standAlone: false,
            muted: this._muteStatus,
            queueCall: this._queueCall,
            conferenceRole: this._conferenceRole,
          },
        ],
        recordings: this.recordings,
        origin: {
          type: this._originType,
        },
      },
    };
  }
}

function createTelephonySession(initParams?: TelephonySessionBuilderParams) {
  return new TelephonySessionBuilder(initParams);
}

export { PartyStatusCode, TelephonySessionBuilder, createTelephonySession };

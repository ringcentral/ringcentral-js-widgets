import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';
import { PartyStatusCode } from 'ringcentral-call-control/lib/Session';
import callDirections from '../../enums/callDirections';
import telephonySessionMessage from './data/telephonySessions.json';
import extensionBody from './data/extensionInfo.json';

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

type CallDirectionsKeys = keyof typeof callDirections;

type CallDirections = typeof callDirections[CallDirectionsKeys];
type PartyStatusCodeKeys = keyof typeof PartyStatusCode;
export type Party = {
  extensionId: string;
  id: string;
  direction: CallDirections;
  to: {
    phoneNumber: string;
    name: string;
    extensionId: string;
  };
  from: {
    phoneNumber: string;
    name: string;
    extensionId: string;
  };
  status: {
    code: typeof PartyStatusCode[PartyStatusCodeKeys];
    mobilePickupData: {
      ccMailboxes: string[];
      to: string;
      sid: string;
      srvLvl: string;
      srvLvlExt: string;
    };
  };
  missedCall: boolean;
  standAlone: boolean;
  muted: boolean;
};

export type Origin = {
  type: string;
};

export type Body = {
  sequence: number;
  sessionId: string;
  telephonySessionId: string;
  serverId: string;
  eventTime: string;
  accountId: string;
  parties: Party[];
  origin: Origin;
  extensionId: string;
};

let sequence = 10;
const DEFAULT_DIRECTION = callDirections.outbound;
export const DEFAULT_PHONE_NUMBER = '+16501234567';

const DEFAULT_EXTENSION_ID = extensionBody.id.toString();

export interface TelephonySessionInterface {
  uuid: string;
  event: string;
  timestamp: string;
  subscriptionId: string;
  ownerId: string;
  body: Body;
}

interface InitParams {
  telephonySessionId?: string;
  phoneNumber?: string;
  direction?: CallDirections;
  sessionId?: string;
  status?: PartyStatusCode;
}

export const telephonySessionBuildersCache: TelephonySessionBuilder[] = [];

class TelephonySessionBuilder {
  private _data: TelephonySessionInterface;
  private _telephonySessionId: string;
  private _phoneNumber: string;
  private _direction: CallDirections;
  private _sessionId: string;
  private _partyStatus: PartyStatusCode;
  private _partyId: string;

  constructor(initParams?: InitParams) {
    this._init(initParams);
  }

  _init({
    telephonySessionId = uuidV4(),
    phoneNumber = DEFAULT_PHONE_NUMBER,
    direction = DEFAULT_DIRECTION,
    sessionId,
    status = PartyStatusCode.proceeding,
  }: InitParams) {
    this._telephonySessionId = telephonySessionId;
    this._sessionId = sessionId || telephonySessionId;
    this._phoneNumber = phoneNumber;
    this._direction = direction;
    this._partyId = `${telephonySessionId}-1`;
    this._partyStatus = status;
  }

  direction(direction: CallDirections) {
    this._direction = direction;
    return this;
  }

  status(status: PartyStatusCode) {
    this._partyStatus = status;
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
    this._data.body.telephonySessionId = telephonySessionId;
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

  done() {
    telephonySessionBuildersCache.push(this);
    return this.data;
  }

  get telephoneSessionId() {
    return this._telephonySessionId;
  }

  get numberData() {
    return {
      phoneNumber: this._phoneNumber,
      name: 'Yoda HubSpot',
      extensionId: DEFAULT_EXTENSION_ID,
    };
  }

  get data(): TelephonySessionInterface {
    return {
      ...telephonySessionMessage,
      uuid: uuidV4(),
      timestamp: moment().format(),
      subscriptionId: uuidV4(),
      body: {
        ...telephonySessionMessage.body,
        sequence: sequence++,
        sessionId: this._sessionId,
        telephonySessionId: this._telephonySessionId,
        serverId: '10.62.25.111.TAM',
        eventTime: Date(),
        accountId: '400144452008',
        extensionId: DEFAULT_EXTENSION_ID,
        parties: [
          {
            extensionId: DEFAULT_EXTENSION_ID,
            id: this._partyId,
            direction: this._direction,
            to: this.numberData,
            from: this.numberData,
            status: {
              code: this._partyStatus,
              mobilePickupData: {
                ccMailboxes: ['400144455008'],
                to: '#19008@sip-mesdevams.lab.nordigy.ru:5060',
                sid: '402936472080',
                srvLvl: '-149699523',
                srvLvlExt: '390',
              },
            },
            missedCall: false,
            standAlone: false,
            muted: false,
          },
        ],
        origin: {
          type: 'Call',
        },
      },
    };
  }
}

function createTelephonySession(initParams?: InitParams) {
  return new TelephonySessionBuilder(initParams || {});
}
export { TelephonySessionBuilder, createTelephonySession, PartyStatusCode };

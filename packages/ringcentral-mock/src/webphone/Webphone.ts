import { sessionStatus } from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';
import type { InviteOptions } from 'ringcentral-web-phone/lib/userAgent';

import type { RcMock } from '../RcMock';

import { FakeSession, WebphoneHeaders } from './Session';

let webphone: FakeWebphone | null = null;

export class WebphoneSessionMock {
  telephonySessionId: string;
  partyId: string;
  webphoneSessionId: string;
  _events: Record<string, ((...args: any) => void)[]> = {};
  __rc_callStatus: string;

  constructor(
    telephonySessionId: string,
    partyId: string,
    webphoneSessionId: string,
    private callQueueName?: string,
    private fromUserName?: string,
    private toUserName?: string,
    private rcMock?: RcMock,
  ) {
    this.telephonySessionId = telephonySessionId;
    this.partyId = partyId;
    this.webphoneSessionId = webphoneSessionId;
    this.__rc_callStatus = sessionStatus.connecting;
  }

  on(event: string, cb: (...args: any) => void) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(cb);
  }

  trigger(event: string, ...args: any) {
    if (this._events[event]) {
      this._events[event].forEach((cb: (...args: any) => void) => {
        cb(...args);
      });
    }
  }

  removeListener() {
    //
  }

  get request() {
    const pRcApiIdsRaw = `party-id=${this.partyId};session-id=${this.telephonySessionId}`;
    const callIDRaw = this.telephonySessionId;
    const request = {
      headers: {
        'P-Rc-Api-Ids': [{ raw: pRcApiIdsRaw }],
        'Call-ID': [{ raw: callIDRaw }],
      },
    } as {
      headers: WebphoneHeaders;
      from: { displayName?: string };
      to: { displayName?: string };
    };

    if (this.callQueueName) {
      request.headers['P-Asserted-Identity'] = [
        { raw: `tel"${this.callQueueName}` },
      ];
      request.headers['P-Rc-Api-Call-Info'] = [{ raw: `queue-call` }];
    }
    if (this.toUserName) {
      request.to = {
        displayName: this.toUserName,
      };
    }
    if (this.fromUserName) {
      request.from = {
        displayName: this.fromUserName,
      };
    }

    return request;
  }

  get id() {
    return this.webphoneSessionId;
  }

  get webphone() {
    return webphone;
  }

  remove() {
    webphone = null;
  }

  terminate() {
    delete this.webphone?.userAgent.sessions[this.id];
    this.trigger('terminated');
  }

  ignore() {
    this.trigger('rejected');
    this.terminate();
    this.__rc_callStatus = sessionStatus.finished;
  }

  addTrack() {
    //
  }

  reject() {
    this.trigger('rejected');
    delete this.webphone?.userAgent.sessions[this.id];
    this.__rc_callStatus = sessionStatus.finished;
  }

  toVoicemail() {
    this.trigger('rejected');
    this.__rc_callStatus = sessionStatus.finished;
  }

  replyWithMessage() {
    this.reject();
    this.trigger('terminated');
  }

  hold() {
    this.trigger('hold');
    this.__rc_callStatus = sessionStatus.onHold;
  }

  unhold() {
    this.trigger('unhold');
    this.__rc_callStatus = sessionStatus.connected;
  }

  mute() {
    //
  }

  unmute() {
    //
  }

  accept(acceptOptions: any) {
    this.rcMock!.answer(this.telephonySessionId);
  }
}

class Transport {
  _events: Record<string, (...args: any) => void> = {};

  constructor() {
    this._events = {};
  }

  on(event: string, cb: (...args: any) => void) {
    this._events[event] = cb;
  }

  trigger(event: string, ...args: any) {
    if (this._events[event]) {
      this._events[event](...args);
    }
  }

  removeAllListeners() {
    //
  }

  disconnect() {
    //
  }

  isConnected() {
    return true;
  }

  remove() {
    webphone = null;
  }

  get webphone() {
    return webphone;
  }
}

class AudioHelper {
  setVolume() {
    //
  }
  playIncoming() {
    //
  }
  playOutgoing() {
    //
  }
  loadAudio() {
    //
  }
}

export class UserAgent {
  _events: Record<string, ((...args: any) => void)[]> = {};
  transport: Transport;
  sessions: Record<string, FakeSession>;
  audioHelper: AudioHelper;

  constructor() {
    this._events = {};
    this.transport = new Transport();
    this.sessions = {};
    this.audioHelper = new AudioHelper();
  }

  on(event: string, cb: (...args: any) => void) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(cb);
  }

  once(event: string, cb: (...args: any) => void) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(cb);
  }

  trigger(event: string, ...args: any) {
    if (event === 'invite') {
      this.sessions[args[0].id] = args[0];
    }
    if (this._events[event]) {
      this._events[event].forEach((cb) => {
        cb(...args);
      });
    }
  }

  invite(
    phoneNumber: string,
    inviteOptions: InviteOptions,
    partyData?: {
      partyId: string;
      sessionId: string;
    },
  ) {
    const sessionId = `${phoneNumber}-${Math.random().toString().slice(2, 10)}`;
    if (partyData) {
      FakeSession.setCurrentPartyData(partyData);
    }
    const session = new FakeSession(
      {
        id: sessionId,
        direction: 'Outbound',
        to: phoneNumber,
        from: inviteOptions?.fromNumber || '',
        callId: `call-${sessionId}`,
      },
      this, // userAgent
    );
    this.sessions[session.id] = session;
    return session;
  }

  accept(acceptOptions: any) {
    this.trigger('accepted', acceptOptions);
  }

  acceptConference(options: any) {
    Object.keys(this.sessions).forEach((sessionKey) => {
      if (sessionKey.indexOf('conf') > -1) {
        this.sessions[sessionKey].accept(options);
      } else {
        this.sessions[sessionKey].terminate();
      }
    });
  }

  stop() {
    setTimeout(() => {
      this.trigger('unregistered');
    }, 5);
  }

  unregister() {
    setTimeout(() => {
      this.trigger('unregistered');
    }, 5);
  }

  removeAllListeners() {
    this._events = {};
  }

  removeListener() {
    //
  }

  isRegistered() {
    return true;
  }

  get registerContext() {
    return {
      registered: true,
    };
  }
}

export class FakeWebphone {
  _userAgent: UserAgent;

  constructor() {
    this._userAgent = new UserAgent();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    webphone = this;
  }

  get userAgent() {
    return this._userAgent;
  }
}

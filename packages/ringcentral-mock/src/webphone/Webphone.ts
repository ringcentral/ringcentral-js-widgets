import { sessionStatus } from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';
import type { InviteOptions } from 'ringcentral-web-phone/lib/userAgent';

import { FakeSession } from './Session';

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
    };
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
    this.trigger('terminated');
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

  invite(phoneNumber: string, inviteOptions: InviteOptions) {
    const sessionId = `${phoneNumber}-${Math.random().toString().slice(2, 10)}`;
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

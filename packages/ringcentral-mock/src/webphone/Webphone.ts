import type { InviteOptions } from 'ringcentral-web-phone/lib/userAgent';

import { FakeSession as Session } from './Session';

let webphone: FakeWebphone;

export class WebphoneSessionMock {
  telephoneSessionId: string;
  _events: Record<string, ((...args: any) => void)[]> = {};

  constructor(telephoneSessionId: string) {
    this.telephoneSessionId = telephoneSessionId;
  }

  on(event: string, cb: (...args: any) => void) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(cb);
  }

  trigger(event: string, ...args: []) {
    if (this._events[event]) {
      this._events[event].forEach((cb: (...args: any) => void) => {
        cb(...args);
      });
    }
  }

  removeListener() {}

  get request() {
    const pRcApiIdsRaw = `party-id=${this.telephoneSessionId};session-id=${this.telephoneSessionId}`;
    const callIDRaw = this.telephoneSessionId;
    const request = {
      headers: {
        'P-Rc-Api-Ids': [{ raw: pRcApiIdsRaw }],
        'Call-ID': [{ raw: callIDRaw }],
      },
    };
    return request;
  }

  get id() {
    return this.telephoneSessionId;
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

  addTrack() {}
}

class Transport {
  _events: Record<string, (...args: any) => void> = {};

  constructor() {
    this._events = {};
  }

  on(event, cb) {
    this._events[event] = cb;
  }

  trigger(event: string, ...args: any) {
    if (this._events[event]) {
      this._events[event](...args);
    }
  }

  removeAllListeners() {}

  disconnect() {}

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

export class UserAgent {
  _events: Record<string, ((...args: any) => void)[]> = {};
  transport: Transport;
  sessions: Record<string, Session>;

  constructor() {
    this._events = {};
    this.transport = new Transport();
    this.sessions = {};
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

  trigger(event, ...args: any) {
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
    const session = new Session(
      {
        id: sessionId,
        direction: 'Outbound',
        to: phoneNumber,
        from: inviteOptions?.fromNumber || '',
        callId: `call-${sessionId}`,
      },
      this,
    );
    this.sessions[session.id] = session;
    return session;
  }

  acceptConference(options) {
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

  removeListener() {}

  get audioHelper() {
    return {
      setVolume() {},
      playIncoming() {},
      playOutgoing() {},
      loadAudio() {},
    };
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
    webphone = this;
  }

  get userAgent() {
    return this._userAgent;
  }
}

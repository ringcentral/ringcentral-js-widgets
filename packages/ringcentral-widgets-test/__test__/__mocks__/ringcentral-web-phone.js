import Session from '../support/session';

const webphoneCache = [];
class Transport {
  constructor() {
    this._events = {};
  }

  on(event, cb) {
    this._events[event] = cb;
  }

  trigger(event, ...args) {
    if (this._events[event]) {
      this._events[event](...args);
    }
  }

  removeAllListeners() {}

  disconnect() {}

  isConnected() {
    return true;
  }
}

class UserAgent {
  constructor() {
    this._events = {};
    this.transport = new Transport();
    this.sessions = {};
  }

  on(event, cb) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(cb);
  }

  once(event, cb) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(cb);
  }

  trigger(event, ...args) {
    if (event === 'invite') {
      this.sessions[args[0].id] = args[0];
    }
    if (this._events[event]) {
      this._events[event].forEach((cb) => {
        cb(...args);
      });
    }
  }

  invite(toNumber) {
    const sessionId = `${toNumber}-${Math.round(
      Math.random() * 1000000000,
    ).toString()}`;
    const session = new Session(
      {
        id: sessionId,
        direction: 'Outbound',
        to: toNumber,
        callId: `call-${sessionId}`,
      },
      this,
    );
    this.sessions[session.id] = session;
    return session;
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

class RingCentralWebphone {
  constructor() {
    this._userAgent = new UserAgent();

    webphoneCache.push(this);
  }

  get userAgent() {
    return this._userAgent;
  }
}

RingCentralWebphone.getLastWebphone = function getLastWebphone() {
  return webphoneCache[webphoneCache.length - 1];
};

export default RingCentralWebphone;

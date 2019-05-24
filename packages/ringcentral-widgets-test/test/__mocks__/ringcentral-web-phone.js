import Session from '../support/session';

class Transport {
  constructor() {
    this._events = {};
  }

  on(event, cb) {
    this._events[event] = cb;
  }

  trigger(event, ...args) {
    this._events[event](...args);
  }

  removeAllListeners() {}

  disconnect() {}
}

class UserAgent {
  constructor() {
    this._events = {};
    this.transport = new Transport();
  }

  on(event, cb) {
    this._events[event] = cb;
  }

  trigger(event, ...args) {
    this._events[event](...args);
  }

  invite(toNumber) {
    const sessionId = `${toNumber}-${Math.round(Math.random() * 1000000000).toString()}`;
    return new Session({
      id: sessionId,
      direction: 'Outbound',
      to: toNumber,
      callId: `call-${sessionId}`
    });
  }

  stop() {}

  unregister() {}

  removeAllListeners() {}

  get audioHelper() {
    return {
      setVolume() {},
      playIncoming() {},
      loadAudio() {},
    };
  }
}

export default class RingCentralWebphone {
  constructor() {
    this._userAgent = new UserAgent();
  }

  get userAgent() {
    return this._userAgent;
  }
}

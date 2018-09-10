import Session from '../support/session';

class UserAgent {
  constructor() {
    this._events = {};
  }

  on(event, cb) {
    this._events[event] = cb;
  }

  trigger(event, ...args) {
    this._events[event](...args);
  }

  invite(toNumber) {
    return new Session({
      id: `${toNumber}-${Math.round(Math.random() * 1000000000).toString()}`,
      direction: 'Outbound',
      to: toNumber
    });
  }

  stop() {}

  get audioHelper() {
    return {
      setVolume() {},
      playIncoming() {}
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

class WebphoneSessionMock {
  telephoneSessionId: string;
  private _events: any;

  constructor(telephoneSessionId: string) {
    this.telephoneSessionId = telephoneSessionId;
    // mock events
    this._events = {};
  }

  on(event: string, cb: () => {}) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(cb);
  }

  trigger(event: string, ...args: []) {
    if (this._events[event]) {
      this._events[event].forEach((cb: () => {}) => {
        cb(...args);
      });
    }
  }

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
}

export default WebphoneSessionMock;

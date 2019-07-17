
export default class TransportInteractionBase {
  constructor() {
    this._transportEvents = {};
  }

  registerTransportEvent({ key, func }) {
    if (this._transportEvents[key]) {
      throw new Error('transport event has already registered');
    }
    this._transportEvents[key] = func;
  }

  registerTransportEvents(events) {
    for (const { key, func } of events) {
      this.registerTransportEvent({ key, func });
    }
  }

  async _fetchAndResponse({ requestId, fetchFunc }) {
    if (!fetchFunc || typeof fetchFunc !== 'function') {
      // throw new Error('Parameter `fetchFunc` is invalid!');
    }

    try {
      const res = await fetchFunc();
      this._transport.response({
        requestId,
        result: res,
        error: null
      });
    } catch (error) {
      console.log(error);
      this._transport.response({
        requestId,
        result: null,
        error
      });
    }
  }

  get transportEvents() {
    return this._transportEvents;
  }
}

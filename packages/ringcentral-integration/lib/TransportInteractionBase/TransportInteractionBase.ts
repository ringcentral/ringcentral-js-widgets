import {
  FetchOption,
  Transport,
  TransportEvent,
  transportEvents,
  TransportResponseData,
} from './TransportInteractionBase.interface';

export default class TransportInteractionBase {
  _transportEvents: transportEvents = {};
  _transport: Transport;

  registerTransportEvent({ key, func }: TransportEvent) {
    if (this._transportEvents[key]) {
      throw new Error('transport event has already registered');
    }
    this._transportEvents[key] = func;
  }

  registerTransportEvents(events: TransportEvent[]) {
    for (const { key, func } of events) {
      this.registerTransportEvent({ key, func });
    }
  }

  async _fetchAndResponse({
    requestId,
    fetchFunc,
  }: FetchOption): Promise<TransportResponseData> {
    if (!fetchFunc || typeof fetchFunc !== 'function') {
      // throw new Error('Parameter `fetchFunc` is invalid!');
    }

    const emitData: TransportResponseData = {
      requestId,
      result: null,
      error: null,
    };

    try {
      emitData.result = await fetchFunc();
    } catch (error) {
      console.log(error);
      emitData.error = error;
    }

    this._transport.response(emitData);

    return emitData;
  }

  get transportEvents() {
    return this._transportEvents;
  }
}

import type {
  FetchOption,
  Transport,
  TransportEvent,
  transportEvents,
  TransportResponseData,
} from './TransportInteractionBase.interface';

export default class TransportInteractionBase {
  _transportEvents: transportEvents = {};
  // @ts-expect-error TS(2564): Property '_transport' has no initializer and is no... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | Er... Remove this comment to see the full error message
      error: null,
    };

    try {
      emitData.result = await fetchFunc();
    } catch (error: any /** TODO: confirm with instanceof */) {
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

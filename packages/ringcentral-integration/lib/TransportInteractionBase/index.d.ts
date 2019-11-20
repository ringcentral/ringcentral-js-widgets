type Func = (...args: any[]) => any;

interface transportEvents {
  [P: string]: Func;
}

interface TransportEvent {
  key: string;
  func: Func;
}

interface FetchOption {
  requestId: number | string;
  fetchFunc: Func;
}

interface ResponseData {
  requestId;
  result: null;
  error;
}

// TODO: import Transport Instance type
interface Transport {
  [P: string]: any;
  response(responseData: ResponseData): void;
}

declare class TransportInteractionBase {
  registerTransportEvents(transportEvents: TransportEvent[]): void;
  registerTransportEvent(transportEvent: TransportEvent): void;
  _transportEvents: transportEvents;
  _fetchAndResponse(fetchOption: FetchOption): Promise<void>;
  _transport?: Transport;
  readonly transportEvents: transportEvents;
}

export = TransportInteractionBase;

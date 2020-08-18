export interface transportEvents {
  [P: string]: Function;
}

export interface TransportData<T = any> {
  requestId: string;
  data: T;
}

export interface TransportEvent {
  key: string;
  /**
   * Make the data need promise with TransportResponseData type,
   * to make the method must be return with response
   */
  func: (data: TransportData) => Promise<TransportResponseData>;
}

export interface FetchOption<T = any> {
  requestId: string;
  fetchFunc: () => Promise<T> | T;
}

export interface TransportResponseData {
  requestId: string;
  result: any;
  error: string | Error;
}

// TODO: import Transport Instance type
export interface Transport {
  response(responseData: TransportResponseData): TransportResponseData;
}

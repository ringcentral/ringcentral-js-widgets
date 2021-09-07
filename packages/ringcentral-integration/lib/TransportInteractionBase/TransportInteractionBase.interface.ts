export interface transportEvents {
  [P: string]: Function;
}

export interface TransportData<T = any> {
  requestId: string;
  data: T;
}

export interface TransportEvent<T = any> {
  key: string;
  /**
   * Make the data need promise with TransportResponseData type,
   * to make the method must be return with response
   */
  func: (
    data: TransportData<T>,
  ) => Promise<TransportResponseData> | TransportResponseData;
}

export interface TransportPushEvent<T = any> {
  key: string;
  /**
   * Make the data need promise with TransportResponseData type,
   * to make the method must be return with response
   */
  func: (data: TransportData<T>) => any;
}

export interface FetchOption<T = any> {
  requestId: string;
  fetchFunc: () => Promise<T> | T;
}

export interface TransportRequestData {
  payload: { requestType: string; data?: any; service?: any };
}

export interface TransportResponseData {
  requestId: string;
  result?: any;
  error?: string | Error;
}

// TODO: import Transport Instance type
export interface Transport {
  request(payload: TransportRequestData): Promise<undefined>;
  response(responseData: TransportResponseData): TransportResponseData;
  addListeners: any;
  send(payload: TransportRequestData): any;
}

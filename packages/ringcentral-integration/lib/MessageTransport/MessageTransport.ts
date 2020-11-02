import * as uuid from 'uuid';

import TransportBase from '../TransportBase';
import { TransportBaseProps } from '../TransportBase/TransportBase';
import { TransportResponseData } from '../TransportInteractionBase';

type MessageTransportListener<T = any, K = {}> = (params: {
  requestId: string;
  payload: MessageTransportPayload<T, K>;
}) => any;

export type MessageTransportPayload<T = any, K = {}> = {
  requestType: string;
  data?: T;
} & K;

const DEFAULT_DEVICE = {
  addReceiver(receiveMessage: any, { useCapture = false } = {}) {
    window.addEventListener('message', receiveMessage, useCapture);
  },
  createEmitter(sendTarget: Window) {
    // Always specify an exact target origin, not *,
    // when you use postMessage to send data to other windows.
    // A malicious site can change the location of the window without your knowledge,
    // and therefore it can intercept the data sent using postMessage.
    return (message: string, { targetOrigin = '*', callback } = {} as any) => {
      sendTarget.postMessage(message, targetOrigin);
      if (typeof callback === 'function') callback();
    };
  },
};
export interface MessageTransportResponse {
  requestId: string;
  result: any;
  error?: Error | string;
}

type AddReceiver = typeof DEFAULT_DEVICE.addReceiver;
type CreateEmitter = typeof DEFAULT_DEVICE.createEmitter;

export interface MessageTransportProps {
  addReceiver?: AddReceiver;
  createEmitter?: CreateEmitter;
  targetWindow: Window;
  origin?: string;
}

type MessageTransportRequestData<T = any, K = {}> = {
  payload: MessageTransportPayload<T, K>;
};

export default class MessageTransport extends TransportBase {
  private _addReceiver: AddReceiver;
  private _createEmitter: CreateEmitter;
  private _targetWindow: Window;
  private _origin: string;
  private _myRequests: Map<any, any>;
  private _othersRequests: Map<any, any>;
  private _postMessage: any;

  constructor({
    addReceiver = DEFAULT_DEVICE.addReceiver,
    createEmitter = DEFAULT_DEVICE.createEmitter,
    targetWindow = window,
    origin,
    ...options
  }: MessageTransportProps & Omit<TransportBaseProps, 'name'>) {
    super({
      ...options,
      name: 'MessageTransport',
    });
    this._addReceiver = addReceiver;
    this._createEmitter = createEmitter;
    this._targetWindow = targetWindow;
    this._origin = origin;
    this._myRequests = new Map();
    this._othersRequests = new Map();
    this._postMessage = this._createEmitter(this._targetWindow);
    this._addReceiver(this._onMessage.bind(this));
  }

  _onMessage = (event: MessageEvent) => {
    // TODO: confirm if the message is from iframe
    if (this._origin && event.origin !== this._origin) {
      return;
    }
    const { type, payload, requestId, result, error } = event.data;
    switch (type) {
      case this._events.push:
        if (payload) {
          this.emit(this._events.push, payload);
        }
        break;
      case this._events.response:
        if (requestId && this._myRequests.has(requestId)) {
          if (error) {
            this._myRequests.get(requestId).reject(new Error(error));
          } else {
            this._myRequests.get(requestId).resolve(result);
          }
        }
        break;
      case this._events.request:
        if (requestId && payload) {
          this._othersRequests.set(requestId, payload);
          this.emit(this._events.request, {
            requestId,
            payload,
          });
        }
        break;
      default:
        break;
    }
  };

  addListeners<T = any, K = {}>({
    push,
    response,
    request,
  }: {
    push?: MessageTransportListener<T, K>;
    response?: MessageTransportListener<T, K>;
    request?: MessageTransportListener<T, K>;
  }) {
    if (typeof push === 'function') {
      this.on(this._events.push, push);
    }
    if (typeof response === 'function') {
      this.on(this._events.response, response);
    }
    if (typeof request === 'function') {
      this.on(this._events.request, request);
    }
  }

  /** T is request data, K is response data */
  async request<T = any, K = any>({
    payload,
  }: MessageTransportRequestData<T>): Promise<K> {
    const requestId = uuid.v4();

    const promise = new Promise<K>((resolve, reject) => {
      this._myRequests.set(requestId, {
        resolve,
        reject,
      });
      this._postMessage({
        type: this._events.request,
        requestId,
        payload,
      });
    });

    let timeout = setTimeout(() => {
      timeout = null;
      this._myRequests
        .get(requestId)
        .reject(
          new Error(`${this._events.timeout}: ${JSON.stringify(payload)}`),
        );
    }, this._timeout);

    return promise
      .then((result) => {
        if (timeout) clearTimeout(timeout);
        this._myRequests.delete(requestId);
        return Promise.resolve(result);
      })
      .catch((error) => {
        if (timeout) clearTimeout(timeout);
        this._myRequests.delete(requestId);
        return Promise.reject(error);
      });
  }

  response({
    requestId,
    result,
    error,
  }: MessageTransportResponse): TransportResponseData {
    const request = this._othersRequests.get(requestId);

    if (request) {
      this._othersRequests.delete(requestId);
      this._postMessage({
        type: this._events.response,
        requestId,
        result,
        error: error instanceof Error ? error.message : error,
      });
    }

    return {
      result,
      error,
      requestId,
    };
  }
}

import { v4 } from 'uuid';

import { TransportBase, type TransportBaseProps } from '../TransportBase';
import type { TransportResponseData } from '../TransportInteractionBase';

import type { TransporterDirection } from './MessageTransporters';
import {
  EventEmitterTransporter,
  PostMessageTransporter,
  TRANSPORTER_DIRECTION,
} from './MessageTransporters';

type MessageTransportListener<T = any, K = {}> = (params: {
  requestId: string;
  payload: MessageTransportPayload<T, K>;
}) => any;

type MessagePushTransportListener<T = any, K = {}> = (
  payload: MessageTransportPayload<T, K>,
) => any;

export type MessageTransportPayload<T = any, K = {}> = {
  requestType: string;
  data?: T;
} & K;

export interface MessageTransportResponse {
  requestId: string;
  result: any;
  error?: Error | string;
}

export const TRANSPORTER_TYPES = {
  POST_MESSAGE: 'postMessage',
  EVENT_EMITTER: 'eventEmitter',
} as const;

export type TransporterTypes =
  (typeof TRANSPORTER_TYPES)[keyof typeof TRANSPORTER_TYPES];

export interface MessageTransportProps {
  transporterDirection?: TransporterDirection;
  targetWindow?: Window;
  origin?: string;
  transporterType?: TransporterTypes;
}

type MessageTransportRequestData<T = any, K = {}> = {
  payload: MessageTransportPayload<T, K>;
};

type Transporter = EventEmitterTransporter | PostMessageTransporter;

export default class MessageTransport extends TransportBase {
  private _addReceiver: Transporter['addReceiver'];
  private _createEmitter: Transporter['createEmitter'];
  private _targetWindow: Window;
  private _myRequests: Map<any, any>;
  private _othersRequests: Map<any, any>;
  private _transporter: Transporter;
  _origin?: string;
  _postMessage: (args: any) => void;

  constructor({
    transporterType = TRANSPORTER_TYPES.POST_MESSAGE,
    transporterDirection = TRANSPORTER_DIRECTION.TO_EXTERNAL,
    targetWindow = window,
    origin,
    ...options
  }: MessageTransportProps & Omit<TransportBaseProps, 'name'>) {
    super({
      ...options,
      name: 'MessageTransport',
    });
    switch (transporterType) {
      case TRANSPORTER_TYPES.EVENT_EMITTER:
        this._transporter = new EventEmitterTransporter({
          direction: transporterDirection,
        });
        break;
      default:
      case TRANSPORTER_TYPES.POST_MESSAGE:
        this._transporter = new PostMessageTransporter();
        break;
    }

    this._addReceiver = this._transporter.addReceiver;
    this._createEmitter = this._transporter.createEmitter;

    this._targetWindow = targetWindow;
    this._origin = origin;
    this._myRequests = new Map();
    this._othersRequests = new Map();
    this._postMessage = this._createEmitter(this._targetWindow);
    this._addReceiver(this._onMessage);
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

  dispose = () => {
    if (this._transporter instanceof PostMessageTransporter) {
      this._transporter.dispose(this._onMessage);
    }
  };

  addListeners<T = any, K = {}>({
    push,
    response,
    request,
  }: {
    push?: MessagePushTransportListener<T, K>;
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
    const requestId = v4();

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

    let timeout: NodeJS.Timeout | undefined;
    if (typeof this._timeout === 'number' && this._timeout > -1) {
      timeout = setTimeout(() => {
        timeout = undefined;
        this._myRequests
          .get(requestId)
          .reject(
            new Error(`${this._events.timeout}: ${JSON.stringify(payload)}`),
          );
      }, this._timeout);
    }

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

  /**
   * Send message without response
   * @param {payload}
   */
  send<T = any>({ payload }: MessageTransportRequestData<T>): void {
    this._postMessage({
      type: this._events.push,
      payload,
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

import * as uuid from 'uuid';

import {
  TransportBase,
  type BaseEventEnum,
  type TransportBaseProps,
} from '../TransportBase';

import { CONNECT_PORT_NAME, TRANSPORT_NAME } from './constants';

/* global chrome */

export interface ClientTransportProps
  extends Omit<TransportBaseProps, 'name'> {}

type PromiseCallback = {
  resolve: (result: any) => void;
  reject: (reason: any) => void;
};

export class ClientTransport extends TransportBase {
  _port: chrome.runtime.Port;
  _requests = new Map<string, PromiseCallback>();

  constructor(options: ClientTransportProps = {}) {
    super({
      ...options,
      name: TRANSPORT_NAME,
    });

    this._port = chrome.runtime.connect({ name: CONNECT_PORT_NAME });
    this._port.onMessage.addListener(
      ({
        type,
        payload,
        requestId,
        result,
        error,
      }: {
        type: keyof BaseEventEnum;
        payload: unknown;
        requestId: string;
        result?: unknown;
        error?: string;
      }) => {
        switch (type) {
          case this._events.push:
            {
              if (payload) {
                this.emit(this._events.push, payload);
              }
            }
            break;
          case this._events.response:
            {
              const callback = this._requests.get(requestId);
              if (callback) {
                if (error) {
                  callback.reject(new Error(error));
                } else {
                  callback.resolve(result);
                }
              }
            }
            break;
          default:
            break;
        }
      },
    );
  }

  async request({ payload }: { payload: unknown }) {
    const requestId = uuid.v4();
    let promise = new Promise((resolve, reject) => {
      this._requests.set(requestId, {
        resolve,
        reject,
      });
      this._port.postMessage({
        type: this._events.request,
        requestId,
        payload,
      });
    });
    let timeout: NodeJS.Timeout | null = setTimeout(() => {
      timeout = null;
      const callback = this._requests.get(requestId);
      if (callback) {
        callback.reject(new Error(this._events.timeout));
      }
    }, this._timeout);
    promise = promise
      .then((result) => {
        if (timeout) clearTimeout(timeout);
        this._requests.delete(requestId);
        return Promise.resolve(result);
      })
      .catch((error) => {
        if (timeout) clearTimeout(timeout);
        this._requests.delete(requestId);
        return Promise.reject(
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          new Error(`${payload.functionPath}: ${error.message}`),
        );
      });
    return promise;
  }
}

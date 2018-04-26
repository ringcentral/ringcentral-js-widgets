import uuid from 'uuid';
import TransportBase from '../TransportBase';

/* global chrome */

export default class ClientTransport extends TransportBase {
  constructor(options) {
    super({
      ...options,
      name: 'ChromeTransport',
    });
    this._requests = new Map();
    this._port = chrome.runtime.connect({ name: 'transport' });
    this._port.onMessage.addListener(({
      type,
      payload,
      requestId,
      result,
      error,
    }) => {
      switch (type) {
        case this._events.push:
          if (payload) {
            this.emit(this._events.push, payload);
          }
          break;
        case this._events.response:
          if (requestId && this._requests.has(requestId)) {
            if (error) {
              this._requests.get(requestId).reject(new Error(error));
            } else {
              this._requests.get(requestId).resolve(result);
            }
          }
          break;
        default:
          break;
      }
    });
  }
  async request({ payload }) {
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
    let timeout = setTimeout(() => {
      timeout = null;
      this._requests.get(requestId).reject(new Error(this._events.timeout));
    }, this._timeout);
    promise = promise.then((result) => {
      if (timeout) clearTimeout(timeout);
      this._requests.delete(requestId);
      return Promise.resolve(result);
    }).catch((error) => {
      if (timeout) clearTimeout(timeout);
      this._requests.delete(requestId);
      return Promise.reject(error);
    });
    return promise;
  }
}

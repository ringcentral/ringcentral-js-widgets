import uuid from 'uuid';
import TransportBase from '../TransportBase';

const DEFAULT_DEVICE = {
  addReceiver(receiveMessage, { useCapture = false } = {}) {
    window.addEventListener('message', receiveMessage, useCapture);
  },
  createEmitter(sendTarget) {
    // Always specify an exact target origin, not *,
    // when you use postMessage to send data to other windows.
    // A malicious site can change the location of the window without your knowledge,
    // and therefore it can intercept the data sent using postMessage.
    return (message, { targetOrigin = '*', callback } = {}) => {
      sendTarget.postMessage(message, targetOrigin);
      if (typeof callback === 'function') callback();
    };
  },
};
export default class MessageTransport extends TransportBase {
  constructor({
    addReceiver = DEFAULT_DEVICE.addReceiver,
    createEmitter = DEFAULT_DEVICE.createEmitter,
    targetWindow = window,
    origin,
    ...options
  }) {
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

  _onMessage = (event) => {
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

  addListeners({ push, response, request }) {
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

  async request<T = any>({ payload }) {
    const requestId = uuid.v4();
    let promise = new Promise<T>((resolve, reject) => {
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
      this._myRequests.get(requestId).reject(new Error(this._events.timeout));
    }, this._timeout);
    promise = promise
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
    return promise;
  }

  response({ requestId, result, error }) {
    const request = this._othersRequests.get(requestId);
    if (request) {
      this._othersRequests.delete(requestId);
      if (error instanceof Error) {
        error = error.message;
      }
      this._postMessage({
        type: this._events.response,
        requestId,
        result,
        error,
      });
    }
  }
}

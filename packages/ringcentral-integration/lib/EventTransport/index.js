import uuid from 'uuid';
import TransportBase from '../TransportBase';


export default class EventTransport extends TransportBase {
  constructor(options) {
    super({
      ...options,
      name: 'EventTransport',
    });
    this._deferred = new Map();
  }
  async request({ payload }) {
    const requestId = uuid.v4();
    const promise = new Promise((resolve, reject) => {
      this._deferred.set(requestId, {
        resolve,
        reject,
      });
    });
    let timeoutId = setTimeout(() => {
      timeoutId = null;
      this._deferred.get(requestId).reject(new Error(this._events.timeout));
    }, this._timeout);
    promise.then((result) => {
      if (timeoutId) clearTimeout(timeoutId);
      this._deferred.delete(requestId);
      return Promise.resolve(result);
    }).catch((error) => {
      if (timeoutId) clearTimeout(timeoutId);
      this._deferred.delete(requestId);
      return Promise.reject(error);
    });
    this.emit(this._events.request, {
      requestId,
      payload,
    });
    return promise;
  }
  response({ requestId, result, error }) {
    const deferred = this._deferred.get(requestId);
    if (deferred) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(result);
      }
    }
  }
  push({ payload }) {
    this.emit(this._events.push, payload);
  }
}

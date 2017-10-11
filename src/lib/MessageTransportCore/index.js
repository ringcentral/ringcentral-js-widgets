export default class MessageTransportCore {
  constructor() {
    this._listeners = new Set();
  }
  _distributeMessage = (msg) => {
    this._listeners.forEach(fn => fn(msg));
  };
  addListener(fn) {
    this._listeners.add(fn);
  }
  removeListener(fn) {
    this._listeners.delete(fn);
  }
  dispose() {
    throw new Error(`${this.constructor.name}.dispose is not implemented.`);
  }
  postMessage() {
    throw new Error(`${this.constructor.name}.postMessage is not implemented.`);
  }
}

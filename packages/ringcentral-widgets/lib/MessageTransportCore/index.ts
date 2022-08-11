export default class MessageTransportCore {
  _listeners: any;
  constructor() {
    this._listeners = new Set();
  }
  _distributeMessage = (msg: any) => {
    this._listeners.forEach((fn: any) => fn(msg));
  };
  addListener(fn: any) {
    this._listeners.add(fn);
  }
  removeListener(fn: any) {
    this._listeners.delete(fn);
  }
  dispose() {
    throw new Error(`${this.constructor.name}.dispose is not implemented.`);
  }
  postMessage() {
    throw new Error(`${this.constructor.name}.postMessage is not implemented.`);
  }
}

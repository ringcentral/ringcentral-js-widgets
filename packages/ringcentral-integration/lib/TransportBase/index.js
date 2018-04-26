import EventEmitter from 'event-emitter';
import Enum from '../Enum';


export default class TransportBase {
  constructor({ name, prefix, timeout = 90 * 1000 } = {}) {
    if (!name) {
      throw new Error(`${this.constructor.name}: "name" is required.`);
    }
    const prefixString = prefix ? `${prefix}-` : '';
    this._events = new Enum([
      'request',
      'response',
      'push',
      'timeout',
    ], `${prefixString}${name}`);

    this._timeout = timeout;
  }
  get events() {
    return this._events;
  }
}

EventEmitter(TransportBase.prototype);

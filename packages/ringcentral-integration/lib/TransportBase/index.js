import EventEmitter from 'events';
import Enum from '../Enum';

export default class TransportBase extends EventEmitter {
  constructor({ name, prefix, timeout = 90 * 1000, ...options } = {}) {
    super(options);
    if (!name) {
      throw new Error(`${this.constructor.name}: "name" is required.`);
    }
    const prefixString = prefix ? `${prefix}-` : '';
    const events = new Enum(
      ['request', 'response', 'push', 'timeout'],
      `${prefixString}${name}`,
    );

    this._timeout = timeout;
    this._events = {
      ...this._events,
      ...events,
    };
  }

  get events() {
    return this._events;
  }
}

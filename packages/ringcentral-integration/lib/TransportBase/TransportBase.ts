import EventEmitter from 'events';

import { createEnum } from '../Enum';

export interface TransportBaseProps {
  name: string;
  prefix?: string;
  timeout?: number;
}

export type BaseEventEnum = Record<
  'request' | 'response' | 'push' | 'timeout',
  string
>;

export default class TransportBase extends EventEmitter {
  _timeout: number;
  _events: BaseEventEnum;
  constructor({ name, prefix, timeout = 90 * 1000 }: TransportBaseProps) {
    super();

    this._timeout = timeout;

    this._events = {
      ...createEnum(
        ['request', 'response', 'push', 'timeout'],
        `${prefix ? `${prefix}-` : ''}${name}`,
      ),
    };
  }

  get events() {
    return this._events;
  }
}

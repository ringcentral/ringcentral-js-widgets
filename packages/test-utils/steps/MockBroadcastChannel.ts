import { EventEmitter } from 'events';

import { StepFunction } from '../lib';

const _eventEmitter = new EventEmitter();

class MyBroadcastChannel {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  get messageKey() {
    return `${this.name}_message`;
  }

  postMessage(data: unknown) {
    _eventEmitter.emit(this.messageKey, { data });
  }

  set onmessage(cb: (...args: unknown[]) => void) {
    this.addEventListener('message', cb);
  }

  onmessageerror() {
    //
  }

  addEventListener(type: string, cb: (...args: unknown[]) => void) {
    if (type === 'message') {
      _eventEmitter.on(this.messageKey, cb);
    }
  }

  removeEventListener() {
    //
  }

  close() {
    _eventEmitter.removeAllListeners();
  }

  dispatchEvent() {
    return true;
  }
}

export const MockBroadcastChannel: StepFunction<{}> = () => {
  (global.BroadcastChannel as any) = MyBroadcastChannel;
};

import { EventEmitter } from 'events';

import { StepFunction } from '.';

const _eventEmitter = new EventEmitter();

class MyBroadcastChannel {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  get messageKey() {
    return `${this.name}_message`;
  }

  postMessage(data: any) {
    _eventEmitter.emit(this.messageKey, { data });
  }

  set onmessage(cb: any) {
    this.addEventListener('message', cb);
  }

  onmessageerror() {}

  addEventListener(type: string, cb: any) {
    if (type === 'message') {
      _eventEmitter.on(this.messageKey, cb);
    }
  }

  removeEventListener() {}

  close() {
    _eventEmitter.removeAllListeners();
  }

  dispatchEvent() {
    return true;
  }
}

export const MockBroadcastChannel: StepFunction<any> = () => {
  global.BroadcastChannel = MyBroadcastChannel;
};

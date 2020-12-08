import { EventEmitter } from 'events';

class AsyncEventEmitter extends EventEmitter {
  async asyncEmit(type: string | symbol, data?): Promise<void> {
    const listeners = this.listeners(type);
    for (const listener of listeners) {
      await listener(data);
    }
  }
}

export { AsyncEventEmitter };

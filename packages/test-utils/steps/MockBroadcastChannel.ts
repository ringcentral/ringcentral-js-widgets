import { filter, Subject, Subscription, tap } from 'rxjs';

import { StepFunction } from '../lib';

const event$ = new Subject<[string, unknown]>();

class MyBroadcastChannel {
  name: string;

  subscription?: Subscription;

  constructor(name: string) {
    this.name = name;
  }

  get messageKey() {
    return `${this.name}_message`;
  }

  postMessage(data: unknown) {
    event$.next([this.messageKey, { data }]);
  }

  set onmessage(cb: (...args: unknown[]) => void) {
    this.addEventListener('message', cb);
  }

  onmessageerror() {
    //
  }

  addEventListener(type: string, cb: (...args: unknown[]) => void) {
    if (type === 'message') {
      this.subscription = event$
        .pipe(
          filter(([key]) => {
            return key === this.messageKey;
          }),
          tap(([key, data]) => {
            cb(data);
          }),
        )
        .subscribe();
    }
  }

  removeEventListener() {
    this.subscription?.unsubscribe();
    //
  }

  close() {
    this.subscription?.unsubscribe();
  }

  dispatchEvent() {
    return true;
  }
}

export const MockBroadcastChannel: StepFunction<{}> = () => {
  global.BroadcastChannel = MyBroadcastChannel;
};

export const mockBroadcastChannel = () => {
  global.BroadcastChannel = MyBroadcastChannel;
};

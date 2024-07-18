// @ts-nocheck
// TODO: fix type
import { sleep, waitUntilTo } from '@ringcentral-integration/commons/utils';

import type { SubscriptionMock } from './interface';

const RealPubnub = jest.requireActual('pubnub');

let pubnub: FakePubnub | null;

type Listener = {
  message: (message: any) => void;
  status: (options: { category: string; operation: string }) => void;
};

export class FakePubnub {
  _subscribeKey: string;
  _realPubnub: any;
  encrypt: any;
  decrypt: any;
  _channels = [];
  _listeners: Listener[] = [];

  constructor({ subscribeKey }) {
    this._subscribeKey = subscribeKey;
    this._realPubnub = new RealPubnub({ subscribeKey });
    this.encrypt = this._realPubnub.encrypt;
    this.decrypt = this._realPubnub.decrypt;
    pubnub = this;
  }

  subscribe({ channels }) {
    this._channels = channels;
  }

  addListener(listener: Listener) {
    this._listeners.push(listener);
    setTimeout(() => {
      for (const listen of this._listeners) {
        listen.status({
          category: 'PNConnectedCategory',
          operation: 'PNSubscribeOperation',
        });
      }
    }, 0);
  }

  removeAllListeners() {
    this._listeners = [];
  }

  unsubscribeAll() {}

  destroy() {
    this._realPubnub = null;
  }
}

FakePubnub.OPERATIONS = RealPubnub.OPERATIONS;
FakePubnub.CATEGORIES = RealPubnub.CATEGORIES;

export class PubnubMock implements SubscriptionMock {
  encryptionKey?: string;

  get pubnub() {
    return pubnub;
  }

  async trigger(event: object) {
    await waitUntilTo(() => {
      expect(!!this.pubnub).toBeTruthy();
    });
    const encrypted = this.pubnub!._realPubnub.encrypt(
      JSON.stringify(event),
      this.encryptionKey,
      {
        encryptKey: false,
        keyEncoding: 'base64',
        keyLength: 128,
        mode: 'ecb',
      },
    );
    const data = {
      channel: this.pubnub!._channels[0],
      subscription: undefined,
      actualChannel: null,
      subscribedChannel: this.pubnub!._channels[0],
      timetoken: '14933652238078468',
      publisher: undefined,
      message: encrypted,
    };
    this.pubnub!._listeners.forEach((listener) => listener.message(data));
    await sleep(100);
  }

  remove() {
    pubnub = null;
  }
}

import RealPubnub from 'pubnub';

const pubnubs = [];

export class MockedPubNub {
  constructor({ subscribeKey }) {
    this._subscribeKey = subscribeKey;
    this._realPubnub = new RealPubnub({ subscribeKey });
    this.encrypt = this._realPubnub.encrypt;
    this.decrypt = this._realPubnub.decrypt;
    this._channels = [];
    this._listeners = [];
    pubnubs.push(this);
  }

  subscribe({ channels }) {
    this._channels = channels;
  }

  addListener(listener) {
    this._listeners.push(listener);
    setTimeout(() => this.mockedConnected(), 0);
  }

  removeAllListeners() {
    this._listeners = [];
  }

  destroy() {
    this._realPubnub = null;
  }

  // Methods to do mocking operations
  mockedConnected() {
    for (const listen of this._listeners) {
      listen.status({
        category: 'PNConnectedCategory',
        operation: 'PNSubscribeOperation'
      });
    }
  }

  mockMessage(msg) {
    const pubnubMsg = {
      channel: this._channels[0],
      subscription: undefined,
      actualChannel: null,
      subscribedChannel: this._channels[0],
      timetoken: '14933652238078468',
      publisher: undefined,
      message: msg
    };
    this._listeners.forEach(l => l.message(pubnubMsg));
  }
}

MockedPubNub.OPERATIONS = RealPubnub.OPERATIONS;
MockedPubNub.CATEGORIES = RealPubnub.CATEGORIES;

export function getLastPubnub() {
  return pubnubs[pubnubs.length - 1];
}

function mockPubnub() {
  const id = require.resolve('pubnub');
  if (require.cache[id]) {
    require.cache[id].exports = MockedPubNub;
  }
}

mockPubnub();

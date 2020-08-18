const RealPubnub = jest.requireActual('pubnub');
const subscriptionBody = require('./data/subscription.json');

const pubnubCache = [];

class MockedPubNub {
  constructor({ subscribeKey }) {
    this._subscribeKey = subscribeKey;
    this._realPubnub = new RealPubnub({ subscribeKey });
    this.encrypt = this._realPubnub.encrypt;
    this.decrypt = this._realPubnub.decrypt;
    this._channels = [];
    this._listeners = [];
    pubnubCache.push(this);
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

  unsubscribeAll() {}

  destroy() {
    this._realPubnub = null;
  }

  // Methods to do mocking operations
  mockedConnected() {
    for (const listen of this._listeners) {
      listen.status({
        category: 'PNConnectedCategory',
        operation: 'PNSubscribeOperation',
      });
    }
  }

  mockCallMessage(activeCallsBody) {
    const encrypted = this._realPubnub.encrypt(
      JSON.stringify({
        uuid: '1088719898803550582-8036702296129764',
        event:
          '/restapi/v1.0/account/160746006/extension/160751006/presence?detailedTelephonyState=true&sipData=true',
        timestamp: new Date().toISOString(),
        subscriptionId: '24dcfdcf-e7d0-4930-9edb-555ec11843b9',
        body: {
          allowSeeMyPresence: true,
          dndStatus: 'TakeAllCalls',
          extensionId: 160751006,
          meetingsStatus: 'Disconnected',
          pickUpCallsOnHold: false,
          presenceStatus: 'Busy',
          ringOnMonitoredCall: false,
          sequence: 368997,
          telephonyStatus: 'OnHold',
          userStatus: 'Available',
          activeCalls: activeCallsBody,
          totalActiveCalls: activeCallsBody.length,
        },
      }),
      subscriptionBody.deliveryMode.encryptionKey,
      {
        encryptKey: false,
        keyEncoding: 'base64',
        keyLength: 128,
        mode: 'ecb',
      },
    );
    this.mockMessage(encrypted);
  }

  mockMessage(msg) {
    const pubnubMsg = {
      channel: this._channels[0],
      subscription: undefined,
      actualChannel: null,
      subscribedChannel: this._channels[0],
      timetoken: '14933652238078468',
      publisher: undefined,
      message: msg,
    };
    this._listeners.forEach((l) => l.message(pubnubMsg));
  }

  mockPresence(msg) {
    const pubnubMsg = {
      channel: this._channels[0],
      subscription: undefined,
      actualChannel: null,
      subscribedChannel: this._channels[0],
      timetoken: '14933652238078468',
      publisher: undefined,
      message: msg,
    };
    this._listeners.forEach((l) => l.message(pubnubMsg));
  }
}

MockedPubNub.OPERATIONS = RealPubnub.OPERATIONS;
MockedPubNub.CATEGORIES = RealPubnub.CATEGORIES;
MockedPubNub.getLastPubnub = function getLastPubnub() {
  return pubnubCache[pubnubCache.length - 1];
};

module.exports = MockedPubNub;

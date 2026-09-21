import 'isomorphic-fetch';

jest.mock(
  'pubnub',
  () => jest.requireActual('@ringcentral-integration/mock').FakePubnub,
);

jest.mock('ringcentral-web-phone', () => ({
  __esModule: true,
  default: jest.requireActual('@ringcentral-integration/mock').FakeWebphone,
}));

jest.mock('@ringcentral/sdk', () => {
  const { SDK: BaseSDK } = jest.requireActual('@ringcentral/sdk');
  class SDK extends BaseSDK {
    constructor(options: any) {
      super({
        ...options,
        Request: global.Request,
        Response: global.Response,
        Headers: global.Headers,
        fetch: (request, options) =>
          typeof request === 'object'
            ? global.fetch(request?.url, request)
            : global.fetch(request, options),
      });
    }
  }
  return {
    __esModule: true,
    ...jest.requireActual('@ringcentral/sdk'),
    SDK,
  };
});

jest.mock('isomorphic-ws', () => {
  const { WebSocket } = jest.requireActual('mock-socket');
  return {
    __esModule: true,
    default: WebSocket,
  };
});

global.navigator.mediaDevices = {
  getUserMedia: jest.fn().mockReturnValue(true),
  enumerateDevices: jest.fn().mockReturnValue([
    {
      deviceId: 'default',
      kind: 'audioinput',
      label: 'Default - Internal Microphone (Built-in)',
      groupId:
        '2303aeba3eb3b5b69d8712798dc9f41b1f1a526f23d032cf53353248d9f6ba83',
    },
    {
      deviceId:
        'b2473af34652a04d9f8d463a4f11640695162b9c08db67d73e2a37f1a2e062a8',
      kind: 'audioinput',
      label: 'Internal Microphone (Built-in)',
      groupId:
        '2303aeba3eb3b5b69d8712798dc9f41b1f1a526f23d032cf53353248d9f6ba83',
    },
  ]),
};

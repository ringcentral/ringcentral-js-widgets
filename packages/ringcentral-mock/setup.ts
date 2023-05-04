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

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.createSDK = createSDK;
exports.mockApi = mockApi;
exports.authentication = authentication;
exports.logout = logout;
exports.tokenRefresh = tokenRefresh;
exports.presence = presence;
exports.dialingPlan = dialingPlan;
exports.extensionInfo = extensionInfo;
exports.extensionList = extensionList;
exports.accountInfo = accountInfo;
exports.apiInfo = apiInfo;
exports.messageSync = messageSync;
exports.authzProfile = authzProfile;
exports.blockedNumber = blockedNumber;
exports.forwardingNumber = forwardingNumber;
exports.phoneNumber = phoneNumber;
exports.subscription = subscription;
exports.mockForLogin = mockForLogin;
exports.mockClient = mockClient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-promise').polyfill();
require('./pubnub');
var RingCentral = require('ringcentral');
var fetchMock = require('fetch-mock/es5/client');

var dialingPlanBody = require('./data/dialingPlan');
var extensionBody = require('./data/extensionInfo');
var extensionListBody = require('./data/extension');
var accountBody = require('./data/accountInfo');
var subscriptionBody = require('./data/subscription');
var apiInfoBody = require('./data/subscription');
var messageSyncBody = require('./data/messageSync');
var authzProfileBody = require('./data/authzProfile');
var blockedNumberBody = require('./data/blockedNumber');
var forwardingNumberBody = require('./data/forwardingNumber');
var phoneNumberBody = require('./data/phoneNumber');

var mockServer = 'http://whatever';
function createSDK() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = (0, _extends3.default)({}, options, {
    appKey: 'test key',
    appSecret: 'test secret',
    server: mockServer,
    Request: fetchMock.constructor.Request,
    Response: fetchMock.constructor.Response,
    Headers: fetchMock.constructor.Headers,
    fetch: fetchMock.fetchMock.bind(fetchMock),
    refreshDelayMs: 1,
    redirectUri: 'http://foo',
    cachePrefix: 'sdkPrefix'
  });
  return new RingCentral(opts);
}

function mockApi(_ref) {
  var _ref$method = _ref.method,
      method = _ref$method === undefined ? 'GET' : _ref$method,
      path = _ref.path,
      _ref$server = _ref.server,
      server = _ref$server === undefined ? mockServer : _ref$server,
      url = _ref.url,
      _ref$body = _ref.body,
      body = _ref$body === undefined ? {} : _ref$body,
      _ref$status = _ref.status,
      status = _ref$status === undefined ? 200 : _ref$status,
      _ref$statusText = _ref.statusText,
      statusText = _ref$statusText === undefined ? 'OK' : _ref$statusText,
      headers = _ref.headers;

  var responseHeaders = void 0;
  var isJson = typeof body !== 'string';
  if (isJson && !headers) {
    responseHeaders = { 'Content-Type': 'application/json' };
  } else {
    responseHeaders = headers;
  }
  var mockUrl = void 0;
  if (url) {
    mockUrl = url;
  } else {
    mockUrl = '' + server + path;
  }
  fetchMock.once(mockUrl, {
    body: isJson ? (0, _stringify2.default)(body) : body,
    status: status,
    statusText: statusText,
    headers: responseHeaders,
    sendAsJson: false
  }, {
    method: method,
    times: 1
  });
}

function authentication() {
  mockApi({
    method: 'POST',
    path: '/restapi/oauth/token',
    body: {
      access_token: 'ACCESS_TOKEN',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'REFRESH_TOKEN',
      refresh_token_expires_in: 60480,
      scope: 'SMS RCM Foo Boo',
      expireTime: new Date().getTime() + 3600000,
      owner_id: '23231231"',
      endpoint_id: '3213213131'
    }
  });
}

function logout() {
  mockApi({
    method: 'POST',
    path: '/restapi/oauth/revoke'
  });
}

function tokenRefresh(failure) {
  if (!failure) {
    mockApi({
      method: 'POST',
      path: '/restapi/oauth/token',
      body: {
        access_token: 'ACCESS_TOKEN_FROM_REFRESH',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'REFRESH_TOKEN_FROM_REFRESH',
        refresh_token_expires_in: 60480,
        scope: 'SMS RCM Foo Boo'
      }
    });
  } else {
    mockApi({
      method: 'POST',
      path: '/restapi/oauth/token',
      body: {
        message: 'Wrong token',
        error_description: 'Wrong token',
        description: 'Wrong token'
      },
      status: 400
    });
  }
}

function presence(id) {
  mockApi({
    path: '/restapi/v1.0/account/~/extension/' + id + '/presence',
    body: {
      uri: 'https://platform.ringcentral.com/restapi/v1.0/account/123/extension/' + id + '/presence',
      extension: {
        uri: 'https://platform.ringcentral.com/restapi/v1.0/account/123/extension/' + id,
        extensionNumber: '101',
        id: id
      },
      activeCalls: [],
      presenceStatus: 'Available',
      telephonyStatus: 'Ringing',
      userStatus: 'Available',
      dndStatus: 'TakeAllCalls',
      extensionId: id
    }
  });
}

function dialingPlan() {
  mockApi({
    path: '/restapi/v1.0/account/~/dialing-plan?perPage=MAX&page=1',
    body: dialingPlanBody
  });
}

function extensionInfo() {
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~',
    body: extensionBody
  });
}

function extensionList() {
  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension?',
    body: extensionListBody
  });
}

function accountInfo() {
  mockApi({
    path: '/restapi/v1.0/account/~',
    body: accountBody
  });
}

function apiInfo() {
  mockApi({
    path: '/restapi/v1.0',
    body: apiInfoBody
  });
}

function messageSync() {
  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/message-sync',
    body: messageSyncBody
  });
}

function authzProfile() {
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/authz-profile',
    body: authzProfileBody
  });
}

function blockedNumber() {
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/blocked-number',
    body: blockedNumberBody
  });
}

function forwardingNumber() {
  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/forwarding-number',
    body: forwardingNumberBody
  });
}

function phoneNumber() {
  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/phone-number',
    body: phoneNumberBody
  });
}

function subscription() {
  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/subscription',
    body: subscriptionBody
  });
}

function mockForLogin() {
  authentication();
  logout();
  tokenRefresh();
  presence('~');
  dialingPlan();
  extensionInfo();
  accountInfo();
  apiInfo();
  authzProfile();
  extensionList();
  blockedNumber();
  forwardingNumber();
  messageSync();
  phoneNumber();
  subscription();
}

function mockClient(client) {
  client.service = createSDK({});
}
//# sourceMappingURL=index.js.map

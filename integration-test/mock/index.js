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
exports.presenceUpdate = presenceUpdate;
exports.dialingPlan = dialingPlan;
exports.extensionInfo = extensionInfo;
exports.extensionList = extensionList;
exports.accountInfo = accountInfo;
exports.apiInfo = apiInfo;
exports.messageSync = messageSync;
exports.messageList = messageList;
exports.updateMessageStatus = updateMessageStatus;
exports.authzProfile = authzProfile;
exports.blockedNumber = blockedNumber;
exports.forwardingNumber = forwardingNumber;
exports.phoneNumber = phoneNumber;
exports.accountPhoneNumber = accountPhoneNumber;
exports.subscription = subscription;
exports.numberParser = numberParser;
exports.sms = sms;
exports.addressBook = addressBook;
exports.callLog = callLog;
exports.device = device;
exports.conferencing = conferencing;
exports.activeCalls = activeCalls;
exports.restore = restore;
exports.reset = reset;
exports.mockForbidden = mockForbidden;
exports.mockClient = mockClient;
exports.ringOut = ringOut;
exports.ringOutUpdate = ringOutUpdate;
exports.meeting = meeting;
exports.serviceInfo = serviceInfo;
exports.mockForLogin = mockForLogin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-promise').polyfill();
// require('./pubnub');
var RingCentral = require('ringcentral');
var fetchMock = require('fetch-mock');

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
var accountPhoneNumberBody = require('./data/accountPhoneNumber');
var presenceBody = require('./data/presence.json');
var numberParserBody = require('./data/numberParser.json');
var smsBody = require('./data/sms.json');
var ringOutBody = require('./data/ringOut.json');
var messageItemBody = require('./data/messageItem.json');
var messageListBody = require('./data/messageList.json');
var addressBookBody = require('./data/addressBook.json');
var callLogBody = require('./data/callLog.json');
var deviceBody = require('./data/device.json');
var conferencingBody = require('./data/conferencing.json');
var activeCallsBody = require('./data/activeCalls.json');
var meetingBody = require('./data/meeting');
var serviceInfoBody = require('./data/serviceInfo');

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
      headers = _ref.headers,
      _ref$isOnce = _ref.isOnce,
      isOnce = _ref$isOnce === undefined ? true : _ref$isOnce;

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
  var mock = isOnce ? fetchMock.once.bind(fetchMock) : fetchMock.mock.bind(fetchMock);
  mock(mockUrl, {
    body: isJson ? (0, _stringify2.default)(body) : body,
    status: status,
    statusText: statusText,
    headers: responseHeaders,
    sendAsJson: false
  }, {
    method: method,
    times: isOnce ? 1 : 20
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
    path: '/restapi/oauth/revoke',
    isOnce: false
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
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/' + id + '/presence',
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

function presenceUpdate(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/' + id + '/presence',
    method: 'PUT',
    body: (0, _extends3.default)({}, presenceBody, mockResponse)
  });
}

function dialingPlan() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/dialing-plan?perPage=MAX&page=1',
    body: (0, _extends3.default)({}, dialingPlanBody, mockResponse)
  });
}

function extensionInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/~',
    body: (0, _extends3.default)({}, extensionBody, mockResponse),
    isOnce: false
  });
}

function extensionList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension?',
    body: (0, _extends3.default)({}, extensionListBody, mockResponse)
  });
}

function accountInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~',
    body: (0, _extends3.default)({}, accountBody, mockResponse)
  });
}

function apiInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0',
    body: (0, _extends3.default)({}, apiInfoBody, mockResponse)
  });
}

function messageSync() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/message-sync',
    body: (0, _extends3.default)({}, messageSyncBody, mockResponse),
    isOnce: isOnce
  });
}

function messageList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/message-store',
    body: (0, _extends3.default)({}, messageListBody, mockResponse),
    isOnce: false
  });
}

function updateMessageStatus() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/message-store',
    method: 'PUT',
    body: (0, _extends3.default)({}, messageItemBody, mockResponse)
  });
}

function authzProfile() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/authz-profile',
    body: (0, _extends3.default)({}, authzProfileBody, mockResponse)
  });
}

function blockedNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/blocked-number',
    body: (0, _extends3.default)({}, blockedNumberBody, mockResponse)
  });
}

function forwardingNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/forwarding-number',
    body: (0, _extends3.default)({}, forwardingNumberBody, mockResponse)
  });
}

function phoneNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/phone-number',
    body: (0, _extends3.default)({}, phoneNumberBody, mockResponse)
  });
}

function accountPhoneNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/phone-number',
    body: (0, _extends3.default)({}, accountPhoneNumberBody, mockResponse),
    isOnce: false
  });
}

function subscription() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'POST',
    url: 'begin:' + mockServer + '/restapi/v1.0/subscription',
    body: (0, _extends3.default)({}, subscriptionBody, mockResponse),
    isOnce: false
  });
  mockApi({
    method: 'PUT',
    url: 'begin:' + mockServer + '/restapi/v1.0/subscription',
    body: (0, _extends3.default)({}, subscriptionBody, mockResponse),
    isOnce: false
  });
  mockApi({
    method: 'DELETE',
    url: 'begin:' + mockServer + '/restapi/v1.0/subscription',
    body: (0, _extends3.default)({}, subscriptionBody, mockResponse),
    isOnce: false
  });
}

function numberParser() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'POST',
    url: 'begin:' + mockServer + '/restapi/v1.0/number-parser/',
    body: (0, _extends3.default)({}, numberParserBody, mockResponse)
  });
}

function sms() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/extension/~/sms',
    body: (0, _extends3.default)({}, smsBody, mockResponse)
  });
}
function addressBook() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/address-book-sync',
    body: (0, _extends3.default)({}, addressBookBody, {
      syncInfo: {
        syncType: addressBookBody.syncType,
        syncToken: addressBookBody.syncToken,
        syncTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    }, mockResponse),
    isOnce: false
  });
}

function callLog() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/call-log-sync',
    body: (0, _extends3.default)({}, callLogBody, {
      syncInfo: {
        syncType: callLogBody.syncType,
        syncToken: callLogBody.syncToken,
        syncTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    }, mockResponse),
    isOnce: false
  });
}

function device() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/device',
    body: (0, _extends3.default)({}, deviceBody, mockResponse)
  });
}

function conferencing() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/conferencing',
    body: (0, _extends3.default)({}, conferencingBody, mockResponse)
  });
}

function activeCalls() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'GET',
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/active-calls',
    body: (0, _extends3.default)({}, activeCallsBody, mockResponse)
  });
}

function restore() {
  fetchMock.restore();
}

function reset() {
  fetchMock.reset();
}

function mockForbidden(_ref2) {
  var _ref2$method = _ref2.method,
      method = _ref2$method === undefined ? 'GET' : _ref2$method,
      path = _ref2.path,
      url = _ref2.url,
      _ref2$body = _ref2.body,
      body = _ref2$body === undefined ? '' : _ref2$body;

  mockApi({
    method: method,
    path: path,
    body: body,
    url: url,
    status: 403
  });
}

function mockClient(client) {
  client.service = createSDK({});
}

function ringOut() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    isOnce: false,
    method: 'POST',
    url: mockServer + '/restapi/v1.0/account/~/extension/~/ring-out',
    body: (0, _extends3.default)({}, ringOutBody, mockResponse)
  });
}

function ringOutUpdate() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    isOnce: false,
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/ring-out/',
    body: (0, _extends3.default)({}, ringOutBody, mockResponse)
  });
}
function meeting() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'POST',
    url: mockServer + '/restapi/v1.0/account/~/extension/~/meeting',
    body: (0, _extends3.default)({}, meetingBody, mockResponse),
    isOnce: false
  });
}
function serviceInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'GET',
    url: mockServer + '/restapi/v1.0/account/~/extension/~/meeting/service-info',
    body: (0, _extends3.default)({}, serviceInfoBody, mockResponse),
    isOnce: false
  });
}

function mockForLogin() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$mockAuthzProfil = _ref3.mockAuthzProfile,
      mockAuthzProfile = _ref3$mockAuthzProfil === undefined ? true : _ref3$mockAuthzProfil,
      _ref3$mockExtensionIn = _ref3.mockExtensionInfo,
      mockExtensionInfo = _ref3$mockExtensionIn === undefined ? true : _ref3$mockExtensionIn,
      _ref3$mockForwardingN = _ref3.mockForwardingNumber,
      mockForwardingNumber = _ref3$mockForwardingN === undefined ? true : _ref3$mockForwardingN,
      _ref3$mockMessageSync = _ref3.mockMessageSync,
      mockMessageSync = _ref3$mockMessageSync === undefined ? true : _ref3$mockMessageSync,
      _ref3$mockConferencin = _ref3.mockConferencing,
      mockConferencing = _ref3$mockConferencin === undefined ? true : _ref3$mockConferencin,
      _ref3$mockActiveCalls = _ref3.mockActiveCalls,
      mockActiveCalls = _ref3$mockActiveCalls === undefined ? true : _ref3$mockActiveCalls;

  authentication();
  logout();
  tokenRefresh();
  presence('~');
  dialingPlan();
  if (mockExtensionInfo) {
    extensionInfo();
  }
  accountInfo();
  apiInfo();
  if (mockAuthzProfile) {
    authzProfile();
  }
  device();
  extensionList();
  accountPhoneNumber();
  blockedNumber();
  if (mockForwardingNumber) {
    forwardingNumber();
  }
  messageList();
  if (mockMessageSync) {
    messageSync();
  }
  phoneNumber();
  subscription();
  callLog();
  addressBook();
  if (mockConferencing) {
    conferencing();
  }
  if (mockActiveCalls) {
    activeCalls();
  }
}
//# sourceMappingURL=index.js.map

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSDK = createSDK;
exports.mockApi = mockApi;
exports.authentication = authentication;
exports.logout = logout;
exports.tokenRefresh = tokenRefresh;
exports.presence = presence;
exports.presenceUpdate = presenceUpdate;
exports.dialingPlan = dialingPlan;
exports.extensionInfo = extensionInfo;
exports.conferenceCallBringIn = conferenceCallBringIn;
exports.removeFromConference = removeFromConference;
exports.extensionList = extensionList;
exports.extensionsList = extensionsList;
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
exports.numberParse = numberParse;
exports.conferenceCall = conferenceCall;
exports.updateConferenceCall = updateConferenceCall;
exports.terminateConferenceCall = terminateConferenceCall;
exports.activeCalls = activeCalls;
exports.restore = restore;
exports.reset = reset;
exports.mockForbidden = mockForbidden;
exports.mockLimited = mockLimited;
exports.mockClient = mockClient;
exports.ringOut = ringOut;
exports.ringOutUpdate = ringOutUpdate;
exports.meeting = meeting;
exports.serviceInfo = serviceInfo;
exports.recentActivity = recentActivity;
exports.mockForLogin = mockForLogin;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.date.to-iso-string");

require("core-js/modules/es6.function.bind");

var _fetchMock = _interopRequireDefault(require("fetch-mock"));

var _ringcentral = _interopRequireDefault(require("ringcentral"));

var _dialingPlan = _interopRequireDefault(require("./data/dialingPlan"));

var _extensionInfo = _interopRequireDefault(require("./data/extensionInfo"));

var _extension = _interopRequireDefault(require("./data/extension"));

var _extensions = _interopRequireDefault(require("./data/extensions"));

var _accountInfo = _interopRequireDefault(require("./data/accountInfo"));

var _subscription = _interopRequireDefault(require("./data/subscription"));

var _apiInfo = _interopRequireDefault(require("./data/apiInfo"));

var _messageSync = _interopRequireDefault(require("./data/messageSync"));

var _authzProfile = _interopRequireDefault(require("./data/authzProfile"));

var _blockedNumber = _interopRequireDefault(require("./data/blockedNumber"));

var _forwardingNumber = _interopRequireDefault(require("./data/forwardingNumber"));

var _phoneNumber = _interopRequireDefault(require("./data/phoneNumber"));

var _accountPhoneNumber = _interopRequireDefault(require("./data/accountPhoneNumber"));

var _presence = _interopRequireDefault(require("./data/presence.json"));

var _numberParser = _interopRequireDefault(require("./data/numberParser.json"));

var _sms = _interopRequireDefault(require("./data/sms.json"));

var _ringOut = _interopRequireDefault(require("./data/ringOut.json"));

var _messageItem = _interopRequireDefault(require("./data/messageItem.json"));

var _messageList = _interopRequireDefault(require("./data/messageList.json"));

var _addressBook = _interopRequireDefault(require("./data/addressBook.json"));

var _callLog = _interopRequireDefault(require("./data/callLog.json"));

var _device = _interopRequireDefault(require("./data/device.json"));

var _conferencing = _interopRequireDefault(require("./data/conferencing.json"));

var _activeCalls = _interopRequireDefault(require("./data/activeCalls.json"));

var _meeting = _interopRequireDefault(require("./data/meeting"));

var _serviceInfo = _interopRequireDefault(require("./data/serviceInfo"));

var _conferenceCall = _interopRequireDefault(require("./data/conferenceCall"));

var _numberParse = _interopRequireDefault(require("./data/numberParse"));

var _conferenceCallBringIn = _interopRequireDefault(require("./data/conferenceCallBringIn"));

var _updateConference = _interopRequireDefault(require("./data/updateConference"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mockServer = 'http://whatever';

function createSDK() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = _objectSpread({}, options, {
    appKey: 'test key',
    appSecret: 'test secret',
    server: mockServer,
    Request: _fetchMock.default.constructor.Request,
    Response: _fetchMock.default.constructor.Response,
    Headers: _fetchMock.default.constructor.Headers,
    fetch: _fetchMock.default.fetchMock.bind(_fetchMock.default),
    refreshDelayMs: 1,
    redirectUri: 'http://foo',
    cachePrefix: 'sdkPrefix'
  });

  return new _ringcentral.default(opts);
}

function mockApi(_ref) {
  var _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      path = _ref.path,
      _ref$server = _ref.server,
      server = _ref$server === void 0 ? mockServer : _ref$server,
      url = _ref.url,
      _ref$body = _ref.body,
      body = _ref$body === void 0 ? {} : _ref$body,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? 200 : _ref$status,
      _ref$statusText = _ref.statusText,
      statusText = _ref$statusText === void 0 ? 'OK' : _ref$statusText,
      headers = _ref.headers,
      _ref$isOnce = _ref.isOnce,
      isOnce = _ref$isOnce === void 0 ? true : _ref$isOnce;
  var responseHeaders;
  var isJson = typeof body !== 'string';

  if (isJson && !headers) {
    responseHeaders = {
      'Content-Type': 'application/json'
    };
  } else {
    responseHeaders = headers;
  }

  var mockUrl;

  if (url) {
    mockUrl = url;
  } else {
    mockUrl = "".concat(server).concat(path);
  }

  var mock = isOnce ? _fetchMock.default.once.bind(_fetchMock.default) : _fetchMock.default.mock.bind(_fetchMock.default);
  mock(mockUrl, {
    body: isJson ? JSON.stringify(body) : body,
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
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/").concat(id, "/presence"),
    body: _objectSpread({
      uri: "https://platform.ringcentral.com/restapi/v1.0/account/123/extension/".concat(id, "/presence"),
      extension: {
        uri: "https://platform.ringcentral.com/restapi/v1.0/account/123/extension/".concat(id),
        extensionNumber: '101',
        id: id
      },
      activeCalls: [],
      presenceStatus: 'Available',
      telephonyStatus: 'Ringing',
      userStatus: 'Available',
      dndStatus: 'TakeAllCalls',
      extensionId: id
    }, mockResponse)
  });
}

function presenceUpdate(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  mockApi({
    path: "/restapi/v1.0/account/~/extension/".concat(id, "/presence"),
    method: 'PUT',
    body: _objectSpread({}, _presence.default, mockResponse)
  });
}

function dialingPlan() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/dialing-plan?perPage=MAX&page=1',
    body: _objectSpread({}, _dialingPlan.default, mockResponse)
  });
}

function extensionInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~',
    body: _objectSpread({}, _extensionInfo.default, mockResponse),
    isOnce: false
  });
}

function conferenceCallBringIn(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  mockApi({
    method: 'POST',
    path: "/restapi/v1.0/account/~/telephony/sessions/".concat(id, "/parties/bring-in"),
    body: _objectSpread({}, _conferenceCallBringIn.default, mockResponse),
    isOnce: false
  });
}

function removeFromConference(id, partyId) {
  mockApi({
    method: 'DELETE',
    path: "/restapi/v1.0/account/~/telephony/sessions/".concat(id, "/parties/").concat(partyId)
  });
}

function extensionList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension?"),
    body: _objectSpread({}, _extension.default, mockResponse)
  });
}

function extensionsList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/directory/contacts?"),
    body: _objectSpread({}, _extensions.default, mockResponse)
  });
}

function accountInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~',
    body: _objectSpread({}, _accountInfo.default, mockResponse)
  });
}

function apiInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0',
    body: _objectSpread({}, _apiInfo.default, mockResponse)
  });
}

function messageSync() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/message-sync"),
    body: _objectSpread({}, _messageSync.default, mockResponse),
    isOnce: isOnce
  });
}

function messageList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/message-store?"),
    body: _objectSpread({}, _messageList.default, mockResponse),
    isOnce: false
  });
}

function updateMessageStatus() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/message-store/"),
    method: 'PUT',
    body: _objectSpread({}, _messageItem.default, mockResponse),
    isOnce: isOnce
  });
}

function authzProfile() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/authz-profile',
    body: _objectSpread({}, _authzProfile.default, mockResponse)
  });
}

function blockedNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/blocked-number',
    body: _objectSpread({}, _blockedNumber.default, mockResponse)
  });
}

function forwardingNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/forwarding-number"),
    body: _objectSpread({}, _forwardingNumber.default, mockResponse)
  });
}

function phoneNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/phone-number"),
    body: _objectSpread({}, _phoneNumber.default, mockResponse)
  });
}

function accountPhoneNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/phone-number"),
    body: _objectSpread({}, _accountPhoneNumber.default, mockResponse),
    isOnce: false
  });
}

function subscription() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'POST',
    url: "begin:".concat(mockServer, "/restapi/v1.0/subscription"),
    body: _objectSpread({}, _subscription.default, mockResponse),
    isOnce: false
  });
  mockApi({
    method: 'PUT',
    url: "begin:".concat(mockServer, "/restapi/v1.0/subscription"),
    body: _objectSpread({}, _subscription.default, mockResponse),
    isOnce: false
  });
  mockApi({
    method: 'DELETE',
    url: "begin:".concat(mockServer, "/restapi/v1.0/subscription"),
    body: _objectSpread({}, _subscription.default, mockResponse),
    isOnce: false
  });
}

function numberParser() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  mockApi({
    method: 'POST',
    url: "begin:".concat(mockServer, "/restapi/v1.0/number-parser/"),
    body: _objectSpread({}, _numberParser.default, mockResponse),
    isOnce: isOnce
  });
}

function sms() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/extension/~/sms',
    body: _objectSpread({}, _sms.default, mockResponse)
  });
}

function addressBook() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/address-book-sync"),
    body: _objectSpread({}, _addressBook.default, {
      syncInfo: {
        syncType: _addressBook.default.syncInfo.syncType,
        syncToken: _addressBook.default.syncInfo.syncToken,
        syncTime: new Date(Date.now()).toISOString()
      }
    }, mockResponse),
    isOnce: false
  });
}

function callLog() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/call-log-sync"),
    body: _objectSpread({}, _callLog.default, {
      records: [_objectSpread({}, _callLog.default.records[0], {
        startTime: new Date(Date.now()).toISOString()
      }), _objectSpread({}, _callLog.default.records[1], {
        startTime: new Date(Date.now()).toISOString()
      })]
    }, {
      syncInfo: {
        syncType: _callLog.default.syncInfo.syncType,
        syncToken: _callLog.default.syncInfo.syncToken,
        syncTime: new Date(Date.now()).toISOString()
      }
    }, mockResponse),
    isOnce: false
  });
}

function device() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/device"),
    body: _objectSpread({}, _device.default, mockResponse),
    isOnce: isOnce
  });
}

function conferencing() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/conferencing',
    body: _objectSpread({}, _conferencing.default, mockResponse)
  });
} // TODO: replace it with numberParser


function numberParse() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var homeCountry = arguments.length > 1 ? arguments[1] : undefined;
  mockApi({
    method: 'POST',
    path: "/restapi/v1.0/number-parser/parse?homeCountry=".concat(homeCountry),
    body: _objectSpread({}, _numberParse.default, mockResponse),
    isOnce: false
  });
}

function conferenceCall() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _conferenceCall.default.session.on = function () {};

  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/telephony/conference',
    body: _objectSpread({}, _conferenceCall.default, mockResponse),
    isOnce: false
  });
}

function updateConferenceCall(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  mockApi({
    path: "/restapi/v1.0/account/~/telephony/sessions/".concat(id),
    body: _objectSpread({}, mockResponse),
    isOnce: isOnce
  });
}

function terminateConferenceCall(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  mockApi({
    method: 'DELETE',
    path: "/restapi/v1.0/account/~/telephony/sessions/".concat(id),
    body: _objectSpread({}, _conferenceCall.default, mockResponse)
  });
}

function activeCalls() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/active-calls"),
    body: _objectSpread({}, _activeCalls.default, mockResponse)
  });
}

function restore() {
  _fetchMock.default.restore();
}

function reset() {
  _fetchMock.default.reset();
}

function mockForbidden(_ref2) {
  var _ref2$method = _ref2.method,
      method = _ref2$method === void 0 ? 'GET' : _ref2$method,
      path = _ref2.path,
      url = _ref2.url,
      _ref2$body = _ref2.body,
      body = _ref2$body === void 0 ? '' : _ref2$body;
  mockApi({
    method: method,
    path: path,
    body: body,
    url: url,
    status: 403
  });
}

function mockLimited(_ref3) {
  var _ref3$method = _ref3.method,
      method = _ref3$method === void 0 ? 'GET' : _ref3$method,
      path = _ref3.path,
      url = _ref3.url;
  mockApi({
    method: method,
    path: path,
    url: url,
    status: 503,
    body: {
      errorCode: 'CMN-211',
      errors: [{
        errorCode: 'CMN-211'
      }]
    }
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
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/ring-out"),
    body: _objectSpread({}, _ringOut.default, mockResponse)
  });
}

function ringOutUpdate() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    isOnce: false,
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/ring-out/"),
    body: _objectSpread({}, _ringOut.default, mockResponse)
  });
}

function meeting() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'POST',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/meeting"),
    body: _objectSpread({}, _meeting.default, mockResponse),
    isOnce: false
  });
}

function serviceInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/meeting/service-info"),
    body: _objectSpread({}, _serviceInfo.default, mockResponse),
    isOnce: false
  });
}

function recentActivity() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  mockApi({
    method: 'GET',
    url: new RegExp("".concat(mockServer, "/restapi/v1.0/account/~/extension/~/call-log")),
    body: _objectSpread({}, _callLog.default, mockResponse),
    isOnce: isOnce
  });
}

function mockForLogin() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$mockAuthzProfil = _ref4.mockAuthzProfile,
      mockAuthzProfile = _ref4$mockAuthzProfil === void 0 ? true : _ref4$mockAuthzProfil,
      _ref4$mockExtensionIn = _ref4.mockExtensionInfo,
      mockExtensionInfo = _ref4$mockExtensionIn === void 0 ? true : _ref4$mockExtensionIn,
      _ref4$mockForwardingN = _ref4.mockForwardingNumber,
      mockForwardingNumber = _ref4$mockForwardingN === void 0 ? true : _ref4$mockForwardingN,
      _ref4$mockMessageSync = _ref4.mockMessageSync,
      mockMessageSync = _ref4$mockMessageSync === void 0 ? true : _ref4$mockMessageSync,
      _ref4$mockConferencin = _ref4.mockConferencing,
      mockConferencing = _ref4$mockConferencin === void 0 ? true : _ref4$mockConferencin,
      _ref4$mockActiveCalls = _ref4.mockActiveCalls,
      mockActiveCalls = _ref4$mockActiveCalls === void 0 ? true : _ref4$mockActiveCalls,
      _ref4$mockUpdateConfe = _ref4.mockUpdateConference,
      mockUpdateConference = _ref4$mockUpdateConfe === void 0 ? false : _ref4$mockUpdateConfe,
      _ref4$mockNumberParse = _ref4.mockNumberParser,
      mockNumberParser = _ref4$mockNumberParse === void 0 ? true : _ref4$mockNumberParse,
      _ref4$mockRecentActiv = _ref4.mockRecentActivity,
      mockRecentActivity = _ref4$mockRecentActiv === void 0 ? true : _ref4$mockRecentActiv,
      params = _objectWithoutProperties(_ref4, ["mockAuthzProfile", "mockExtensionInfo", "mockForwardingNumber", "mockMessageSync", "mockConferencing", "mockActiveCalls", "mockUpdateConference", "mockNumberParser", "mockRecentActivity"]);

  authentication();
  logout();
  tokenRefresh();
  presence('~');
  dialingPlan(params.dialingPlanData);

  if (mockExtensionInfo) {
    extensionInfo(params.extensionInfoData);
  }

  accountInfo(params.accountInfoData);
  apiInfo(params.apiInfoData);

  if (mockAuthzProfile) {
    authzProfile(params.authzProfileData);
  }

  device(params.deviceData);
  extensionList(params.extensionListData);
  extensionsList(params.extensionsListData);
  accountPhoneNumber(params.accountPhoneNumberData);
  blockedNumber(params.blockedNumberData);

  if (mockForwardingNumber) {
    forwardingNumber(params.forwardingNumberData);
  }

  messageList(params.messageListData);

  if (mockMessageSync) {
    messageSync(params.messageSyncData);
  }

  phoneNumber(params.phoneNumberData);
  subscription(params.subscriptionData);
  callLog(params.callLogData);
  addressBook(params.addressBookData);

  if (mockConferencing) {
    conferencing(params.conferencingData);
  }

  if (mockActiveCalls) {
    activeCalls(params.activeCallsData);
  }

  if (mockNumberParser) {
    numberParser(params.numberParseData, params.numberParseIsOnce);
  }

  if (mockUpdateConference) {
    conferenceCall();
    updateConferenceCall(_updateConference.default.id, _updateConference.default);
  }

  if (mockRecentActivity) {
    recentActivity();
  }
}
//# sourceMappingURL=index.js.map

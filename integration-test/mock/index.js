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
exports.companyContactList = companyContactList;
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
exports.userSettings = userSettings;
exports.lockedSettings = lockedSettings;
exports.assistedUsers = assistedUsers;
exports.delegators = delegators;
exports.device = device;
exports.conferencing = conferencing;
exports.numberParse = numberParse;
exports.conferenceCall = conferenceCall;
exports.updateConferenceCall = updateConferenceCall;
exports.terminateConferenceCall = terminateConferenceCall;
exports.activeCalls = activeCalls;
exports.sipProvision = sipProvision;
exports.fetchDL = fetchDL;
exports.fetchDLWithNoRecord = fetchDLWithNoRecord;
exports.restore = restore;
exports.reset = reset;
exports.mockForbidden = mockForbidden;
exports.mockLimited = mockLimited;
exports.mockClient = mockClient;
exports.ringOut = ringOut;
exports.ringOutUpdate = ringOutUpdate;
exports.meeting = meeting;
exports.meetingInvitation = meetingInvitation;
exports.meetingInfo = meetingInfo;
exports.videoPreference = videoPreference;
exports.videoPersonalSettings = videoPersonalSettings;
exports.serviceInfo = serviceInfo;
exports.meetingProvider = meetingProvider;
exports.meetingProviderRcm = meetingProviderRcm;
exports.meetingProviderRcv = meetingProviderRcv;
exports.recentActivity = recentActivity;
exports.videoConfiguration = videoConfiguration;
exports.callerId = callerId;
exports.features = features;
exports.timezone = timezone;
exports.mockForLogin = mockForLogin;
exports.mockServer = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.date.to-iso-string");

require("core-js/modules/es6.function.bind");

var _sdk = require("@ringcentral/sdk");

var _fetchMock = _interopRequireDefault(require("fetch-mock"));

var _videoHelper = require("../../modules/RcVideo/videoHelper");

var _accountInfo = _interopRequireDefault(require("./data/accountInfo.json"));

var _accountPhoneNumber = _interopRequireDefault(require("./data/accountPhoneNumber.json"));

var _activeCalls = _interopRequireDefault(require("./data/activeCalls.json"));

var _addressBook = _interopRequireDefault(require("./data/addressBook.json"));

var _apiInfo = _interopRequireDefault(require("./data/apiInfo.json"));

var _authzProfile = _interopRequireDefault(require("./data/authzProfile.json"));

var _blockedNumber = _interopRequireDefault(require("./data/blockedNumber.json"));

var _callerId = _interopRequireDefault(require("./data/callerId.json"));

var _callLog = _interopRequireDefault(require("./data/callLog.json"));

var _conferenceCall = _interopRequireDefault(require("./data/conferenceCall.json"));

var _conferenceCallBringIn = _interopRequireDefault(require("./data/conferenceCallBringIn.json"));

var _conferencing = _interopRequireDefault(require("./data/conferencing.json"));

var _device = _interopRequireDefault(require("./data/device.json"));

var _dialingPlan = _interopRequireDefault(require("./data/dialingPlan.json"));

var _extension = _interopRequireDefault(require("./data/extension.json"));

var _extensionInfo = _interopRequireDefault(require("./data/extensionInfo.json"));

var _extensions = _interopRequireDefault(require("./data/extensions.json"));

var _fetchDL = _interopRequireDefault(require("./data/fetchDL.json"));

var _fetchDLWithNoRecord = _interopRequireDefault(require("./data/fetchDLWithNoRecord.json"));

var _forwardingNumber = _interopRequireDefault(require("./data/forwardingNumber.json"));

var _lockedSettings = _interopRequireDefault(require("./data/lockedSettings.json"));

var _meeting = _interopRequireDefault(require("./data/meeting.json"));

var _meetingInvitation = _interopRequireDefault(require("./data/meetingInvitation.json"));

var _assistedUsers = _interopRequireDefault(require("./data/assistedUsers.json"));

var _delegatorsBody = _interopRequireDefault(require("./data/delegatorsBody.json"));

var _meetingProviderRcm = _interopRequireDefault(require("./data/meetingProviderRcm.json"));

var _meetingProviderRcv = _interopRequireDefault(require("./data/meetingProviderRcv.json"));

var _messageItem = _interopRequireDefault(require("./data/messageItem.json"));

var _messageList = _interopRequireDefault(require("./data/messageList.json"));

var _messageSync = _interopRequireDefault(require("./data/messageSync.json"));

var _numberParse = _interopRequireDefault(require("./data/numberParse.json"));

var _numberParser = _interopRequireDefault(require("./data/numberParser.json"));

var _phoneNumber = _interopRequireDefault(require("./data/phoneNumber.json"));

var _presence = _interopRequireDefault(require("./data/presence.json"));

var _ringOut = _interopRequireDefault(require("./data/ringOut.json"));

var _serviceInfo = _interopRequireDefault(require("./data/serviceInfo.json"));

var _sipProvision = _interopRequireDefault(require("./data/sipProvision.json"));

var _sms = _interopRequireDefault(require("./data/sms.json"));

var _subscription = _interopRequireDefault(require("./data/subscription.json"));

var _timezone = _interopRequireDefault(require("./data/timezone.json"));

var _updateConference = _interopRequireDefault(require("./data/updateConference.json"));

var _userSettings = _interopRequireDefault(require("./data/userSettings.json"));

var _videoConfiguration = _interopRequireDefault(require("./data/videoConfiguration.json"));

var _videoPreference = _interopRequireDefault(require("./data/videoPreference.json"));

var _features = _interopRequireDefault(require("./data/features.json"));

var _videoPersonalSettings = _interopRequireDefault(require("./data/videoPersonalSettings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mockServer = 'http://whatever';
exports.mockServer = mockServer;

function createSDK() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = _objectSpread({
    clientId: 'test key',
    clientSecret: 'test secret',
    server: mockServer,
    Request: _fetchMock["default"].constructor.Request,
    Response: _fetchMock["default"].constructor.Response,
    Headers: _fetchMock["default"].constructor.Headers,
    fetch: _fetchMock["default"].fetchMock.bind(_fetchMock["default"]),
    refreshDelayMs: 1,
    redirectUri: 'http://foo',
    cachePrefix: 'sdkPrefix',
    clearCacheOnRefreshError: false
  }, options);

  return new _sdk.SDK(opts);
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

  var mock = isOnce ? _fetchMock["default"].once.bind(_fetchMock["default"]) : _fetchMock["default"].mock.bind(_fetchMock["default"]);
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
  var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
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
    }, mockResponse),
    isOnce: isOnce
  });
}

function presenceUpdate(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  mockApi({
    path: "/restapi/v1.0/account/~/extension/".concat(id, "/presence"),
    method: 'PUT',
    body: _objectSpread(_objectSpread({}, _presence["default"]), mockResponse)
  });
}

function dialingPlan() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/dialing-plan?perPage=MAX&page=1',
    body: _objectSpread(_objectSpread({}, _dialingPlan["default"]), mockResponse)
  });
}

function extensionInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~',
    body: _objectSpread(_objectSpread({}, _extensionInfo["default"]), mockResponse),
    isOnce: false
  });
}

function conferenceCallBringIn(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  mockApi({
    method: 'POST',
    path: "/restapi/v1.0/account/~/telephony/sessions/".concat(id, "/parties/bring-in"),
    body: _objectSpread(_objectSpread({}, _conferenceCallBringIn["default"]), mockResponse),
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
    body: _objectSpread(_objectSpread({}, _extension["default"]), mockResponse)
  });
}

function companyContactList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/directory/contacts?"),
    body: _objectSpread(_objectSpread({}, _extensions["default"]), mockResponse)
  });
}

function accountInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~',
    body: _objectSpread(_objectSpread({}, _accountInfo["default"]), mockResponse)
  });
}

function apiInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0',
    body: _objectSpread(_objectSpread({}, _apiInfo["default"]), mockResponse)
  });
}

function messageSync() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/message-sync"),
    body: _objectSpread(_objectSpread({}, _messageSync["default"]), mockResponse),
    isOnce: isOnce
  });
}

function messageList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/message-store?"),
    body: _objectSpread(_objectSpread({}, _messageList["default"]), mockResponse),
    isOnce: false
  });
}

function updateMessageStatus() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/message-store/"),
    method: 'PUT',
    body: _objectSpread(_objectSpread({}, _messageItem["default"]), mockResponse),
    isOnce: isOnce
  });
}

function authzProfile() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/authz-profile',
    body: _objectSpread(_objectSpread({}, _authzProfile["default"]), mockResponse)
  });
}

function blockedNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/blocked-number',
    body: _objectSpread(_objectSpread({}, _blockedNumber["default"]), mockResponse)
  });
}

function forwardingNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/forwarding-number"),
    body: _objectSpread(_objectSpread({}, _forwardingNumber["default"]), mockResponse)
  });
}

function phoneNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/phone-number"),
    body: _objectSpread(_objectSpread({}, _phoneNumber["default"]), mockResponse)
  });
}

function accountPhoneNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/phone-number"),
    body: _objectSpread(_objectSpread({}, _accountPhoneNumber["default"]), mockResponse),
    isOnce: false
  });
}

function subscription() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'POST',
    url: "begin:".concat(mockServer, "/restapi/v1.0/subscription"),
    body: _objectSpread(_objectSpread({}, _subscription["default"]), mockResponse),
    isOnce: false
  });
  mockApi({
    method: 'PUT',
    url: "begin:".concat(mockServer, "/restapi/v1.0/subscription"),
    body: _objectSpread(_objectSpread({}, _subscription["default"]), mockResponse),
    isOnce: false
  });
  mockApi({
    method: 'DELETE',
    url: "begin:".concat(mockServer, "/restapi/v1.0/subscription"),
    body: _objectSpread(_objectSpread({}, _subscription["default"]), mockResponse),
    isOnce: false
  });
}

function numberParser() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  mockApi({
    method: 'POST',
    url: "begin:".concat(mockServer, "/restapi/v1.0/number-parser/"),
    body: _objectSpread(_objectSpread({}, _numberParser["default"]), mockResponse),
    isOnce: isOnce
  });
}

function sms() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/extension/~/sms',
    body: _objectSpread(_objectSpread({}, _sms["default"]), mockResponse)
  });
}

function addressBook() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/address-book-sync"),
    body: _objectSpread(_objectSpread(_objectSpread({}, _addressBook["default"]), {
      syncInfo: {
        syncType: _addressBook["default"].syncInfo.syncType,
        syncToken: _addressBook["default"].syncInfo.syncToken,
        syncTime: new Date(Date.now()).toISOString()
      }
    }), mockResponse),
    isOnce: false
  });
}

function callLog() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/call-log-sync"),
    body: _objectSpread(_objectSpread(_objectSpread({}, _callLog["default"]), {}, {
      records: [_objectSpread(_objectSpread({}, _callLog["default"].records[0]), {}, {
        startTime: new Date(Date.now()).toISOString()
      }), _objectSpread(_objectSpread({}, _callLog["default"].records[1]), {}, {
        startTime: new Date(Date.now()).toISOString()
      })]
    }, {
      syncInfo: {
        syncType: _callLog["default"].syncInfo.syncType,
        syncToken: _callLog["default"].syncInfo.syncToken,
        syncTime: new Date(Date.now()).toISOString()
      }
    }), mockResponse),
    isOnce: false
  });
}

function userSettings() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/meeting/user-settings"),
    body: _objectSpread(_objectSpread({}, _userSettings["default"]), mockResponse)
  });
}

function lockedSettings() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/meeting/locked-settings"),
    body: _objectSpread(_objectSpread({}, _lockedSettings["default"]), mockResponse)
  });
}

function assistedUsers() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/meetings-configuration/assisted"),
    body: mockResponse || _assistedUsers["default"]
  });
}

function delegators() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/rcvideo/v1/accounts/~/extensions/~/delegators"),
    body: mockResponse || _delegatorsBody["default"]
  });
}

function device() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/device"),
    body: _objectSpread(_objectSpread({}, _device["default"]), mockResponse),
    isOnce: isOnce
  });
}

function conferencing() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/conferencing',
    body: _objectSpread(_objectSpread({}, _conferencing["default"]), mockResponse)
  });
} // TODO: replace it with numberParser


function numberParse() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var homeCountry = arguments.length > 1 ? arguments[1] : undefined;
  mockApi({
    method: 'POST',
    path: "/restapi/v1.0/number-parser/parse?homeCountry=".concat(homeCountry),
    body: _objectSpread(_objectSpread({}, _numberParse["default"]), mockResponse),
    isOnce: false
  });
}

function conferenceCall() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _conferenceCall["default"].session.on = function () {};

  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/telephony/conference',
    body: _objectSpread(_objectSpread({}, _conferenceCall["default"]), mockResponse),
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
    body: _objectSpread(_objectSpread({}, _conferenceCall["default"]), mockResponse)
  });
}

function activeCalls() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/active-calls"),
    body: _objectSpread(_objectSpread({}, _activeCalls["default"]), mockResponse)
  });
}

function sipProvision() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'POST',
    url: "begin:".concat(mockServer, "/restapi/v1.0/client-info/sip-provision"),
    body: _objectSpread(_objectSpread({}, _sipProvision["default"]), mockResponse),
    isOnce: false
  });
}

function fetchDL() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/device"),
    body: _objectSpread(_objectSpread({}, _fetchDL["default"]), mockResponse)
  });
}

function fetchDLWithNoRecord() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/device"),
    body: _objectSpread(_objectSpread({}, _fetchDLWithNoRecord["default"]), mockResponse)
  });
}

function restore() {
  _fetchMock["default"].restore();
}

function reset() {
  _fetchMock["default"].reset();
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
      url = _ref3.url,
      headers = _ref3.headers;
  mockApi({
    method: method,
    path: path,
    url: url,
    status: 503,
    headers: headers,
    body: {
      status: 503,
      errorCode: 'CMN-211',
      errors: [{
        errorCode: 'CMN-211'
      }]
    }
  });
}

function mockClient(client) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  client.service = createSDK(options);
}

function ringOut() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    isOnce: false,
    method: 'POST',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/ring-out"),
    body: _objectSpread(_objectSpread({}, _ringOut["default"]), mockResponse)
  });
}

function ringOutUpdate() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    isOnce: false,
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension/~/ring-out/"),
    body: _objectSpread(_objectSpread({}, _ringOut["default"]), mockResponse)
  });
}

function meeting() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  mockApi(_objectSpread({
    method: 'POST',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/meeting"),
    body: _objectSpread(_objectSpread({}, _meeting["default"]), mockResponse),
    isOnce: false
  }, extra));
}

function meetingInvitation() {
  var meetingId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var id = meetingId || _meeting["default"].id;
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/meeting/").concat(id, "/invitation"),
    body: _objectSpread(_objectSpread({}, _meetingInvitation["default"]), mockResponse),
    isOnce: false
  });
}

function meetingInfo() {
  var meetingId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var id = meetingId || _meeting["default"].id;
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/meeting/").concat(id),
    body: _objectSpread(_objectSpread({}, _meeting["default"]), mockResponse),
    isOnce: isOnce
  });
}

function videoPreference() {
  var useExtensionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var query = "id=".concat(_videoHelper.RCV_PREFERENCES_IDS.join('&id='));
  var extensionId = useExtensionId ? _extensionInfo["default"].id : '~';
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/rcvideo/v1/account/").concat(extensionId, "/extension/").concat(extensionId, "/preferences?").concat(query),
    body: _videoPreference["default"],
    isOnce: false
  });
}

function videoPersonalSettings() {
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/rcvideo/v1/bridges?default=true&accountId=").concat(_accountInfo["default"].id, "&extensionId=").concat(_extensionInfo["default"].id),
    body: _videoPersonalSettings["default"],
    isOnce: false
  });
}

function serviceInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var extensionId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '~';
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/").concat(extensionId, "/meeting/service-info"),
    body: _objectSpread(_objectSpread({}, _serviceInfo["default"]), mockResponse),
    isOnce: false
  });
}

function meetingProvider() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/video-configuration"),
    body: _objectSpread({}, mockResponse),
    isOnce: false
  });
}

function meetingProviderRcm() {
  meetingProvider(_meetingProviderRcm["default"]);
}

function meetingProviderRcv() {
  meetingProvider(_meetingProviderRcv["default"]);
}

function recentActivity() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  mockApi({
    method: 'GET',
    url: new RegExp("".concat(mockServer, "/restapi/v1.0/account/~/extension/~/call-log")),
    body: _objectSpread(_objectSpread({}, _callLog["default"]), mockResponse),
    isOnce: isOnce
  });
}

function videoConfiguration() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  mockApi({
    method: 'GET',
    url: new RegExp("".concat(mockServer, "/restapi/v1.0/account/~/extension/~/video-configuration")),
    body: _objectSpread(_objectSpread({}, _videoConfiguration["default"]), mockResponse),
    isOnce: isOnce
  });
}

function callerId() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  mockApi({
    method: 'GET',
    url: new RegExp("".concat(mockServer, "/restapi/v1.0/account/~/extension/~/caller-id")),
    body: _objectSpread(_objectSpread({}, _callerId["default"]), mockResponse),
    isOnce: isOnce
  });
}

function features() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  mockApi({
    method: 'GET',
    url: new RegExp("".concat(mockServer, "/restapi/v1.0/account/~/extension/~/features")),
    body: _objectSpread(_objectSpread({}, _features["default"]), mockResponse)
  });
}

function timezone() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/dictionary/timezone"),
    body: _objectSpread(_objectSpread({}, _timezone["default"]), mockResponse),
    isOnce: false
  });
}

function mockForLogin() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref4$mockAuthzProfil = _ref4.mockAuthzProfile,
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
      mockUpdateConference = _ref4$mockUpdateConfe === void 0 ? true : _ref4$mockUpdateConfe,
      _ref4$mockNumberParse = _ref4.mockNumberParser,
      mockNumberParser = _ref4$mockNumberParse === void 0 ? true : _ref4$mockNumberParse,
      _ref4$mockRecentActiv = _ref4.mockRecentActivity,
      mockRecentActivity = _ref4$mockRecentActiv === void 0 ? true : _ref4$mockRecentActiv,
      _ref4$mockMessageSync2 = _ref4.mockMessageSyncOnce,
      mockMessageSyncOnce = _ref4$mockMessageSync2 === void 0 ? false : _ref4$mockMessageSync2,
      _ref4$mockVideoConfig = _ref4.mockVideoConfiguration,
      mockVideoConfiguration = _ref4$mockVideoConfig === void 0 ? true : _ref4$mockVideoConfig,
      _ref4$mockUserSetting = _ref4.mockUserSetting,
      mockUserSetting = _ref4$mockUserSetting === void 0 ? true : _ref4$mockUserSetting,
      params = _objectWithoutProperties(_ref4, ["mockAuthzProfile", "mockExtensionInfo", "mockForwardingNumber", "mockMessageSync", "mockConferencing", "mockActiveCalls", "mockUpdateConference", "mockNumberParser", "mockRecentActivity", "mockMessageSyncOnce", "mockVideoConfiguration", "mockUserSetting"]);

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
  companyContactList(params.extensionsListData); // accountPhoneNumber(params.accountPhoneNumberData);

  blockedNumber(params.blockedNumberData);

  if (mockForwardingNumber) {
    forwardingNumber(params.forwardingNumberData);
  }

  messageList(params.messageListData);

  if (mockMessageSync) {
    messageSync(params.messageSyncData, mockMessageSyncOnce);
  }

  phoneNumber(params.phoneNumberData);
  callerId(params.callerIdData);
  subscription(params.subscriptionData);
  callLog(params.callLogData);
  addressBook(params.addressBookData);
  sipProvision(params.sipProvisionData);
  fetchDL(params.fetchDLData);

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
    updateConferenceCall(_updateConference["default"].id, _updateConference["default"]);
  }

  if (mockRecentActivity) {
    recentActivity();
  }

  if (mockVideoConfiguration) {
    videoConfiguration();
  }

  videoPreference();

  if (mockUserSetting) {
    userSettings(params.userSettingsData);
  }

  lockedSettings(params.lockedSettingsData);
  features(params.featuresData);
  assistedUsers(params.mockAssistedUsers);
  delegators();
  videoPersonalSettings();
}
//# sourceMappingURL=index.js.map

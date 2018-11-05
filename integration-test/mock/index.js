'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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
exports.conferenceCallBringIn = conferenceCallBringIn;
exports.removeFromConference = removeFromConference;
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
exports.numberParse = numberParse;
exports.conferenceCall = conferenceCall;
exports.updateConferenceCall = updateConferenceCall;
exports.terminateConferenceCall = terminateConferenceCall;
exports.activeCalls = activeCalls;
exports.restore = restore;
exports.reset = reset;
exports.mockForbidden = mockForbidden;
exports.mockClient = mockClient;
exports.ringOut = ringOut;
exports.ringOutUpdate = ringOutUpdate;
exports.meeting = meeting;
exports.serviceInfo = serviceInfo;
exports.recentActivity = recentActivity;
exports.mockForLogin = mockForLogin;

var _fetchMock = require('fetch-mock');

var _fetchMock2 = _interopRequireDefault(_fetchMock);

var _ringcentral = require('ringcentral');

var _ringcentral2 = _interopRequireDefault(_ringcentral);

var _dialingPlan = require('./data/dialingPlan');

var _dialingPlan2 = _interopRequireDefault(_dialingPlan);

var _extensionInfo = require('./data/extensionInfo');

var _extensionInfo2 = _interopRequireDefault(_extensionInfo);

var _extension = require('./data/extension');

var _extension2 = _interopRequireDefault(_extension);

var _accountInfo = require('./data/accountInfo');

var _accountInfo2 = _interopRequireDefault(_accountInfo);

var _subscription = require('./data/subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _apiInfo = require('./data/apiInfo');

var _apiInfo2 = _interopRequireDefault(_apiInfo);

var _messageSync = require('./data/messageSync');

var _messageSync2 = _interopRequireDefault(_messageSync);

var _authzProfile = require('./data/authzProfile');

var _authzProfile2 = _interopRequireDefault(_authzProfile);

var _blockedNumber = require('./data/blockedNumber');

var _blockedNumber2 = _interopRequireDefault(_blockedNumber);

var _forwardingNumber = require('./data/forwardingNumber');

var _forwardingNumber2 = _interopRequireDefault(_forwardingNumber);

var _phoneNumber = require('./data/phoneNumber');

var _phoneNumber2 = _interopRequireDefault(_phoneNumber);

var _accountPhoneNumber = require('./data/accountPhoneNumber');

var _accountPhoneNumber2 = _interopRequireDefault(_accountPhoneNumber);

var _presence = require('./data/presence.json');

var _presence2 = _interopRequireDefault(_presence);

var _numberParser = require('./data/numberParser.json');

var _numberParser2 = _interopRequireDefault(_numberParser);

var _sms = require('./data/sms.json');

var _sms2 = _interopRequireDefault(_sms);

var _ringOut = require('./data/ringOut.json');

var _ringOut2 = _interopRequireDefault(_ringOut);

var _messageItem = require('./data/messageItem.json');

var _messageItem2 = _interopRequireDefault(_messageItem);

var _messageList = require('./data/messageList.json');

var _messageList2 = _interopRequireDefault(_messageList);

var _addressBook = require('./data/addressBook.json');

var _addressBook2 = _interopRequireDefault(_addressBook);

var _callLog = require('./data/callLog.json');

var _callLog2 = _interopRequireDefault(_callLog);

var _device = require('./data/device.json');

var _device2 = _interopRequireDefault(_device);

var _conferencing = require('./data/conferencing.json');

var _conferencing2 = _interopRequireDefault(_conferencing);

var _activeCalls = require('./data/activeCalls.json');

var _activeCalls2 = _interopRequireDefault(_activeCalls);

var _meeting = require('./data/meeting');

var _meeting2 = _interopRequireDefault(_meeting);

var _serviceInfo = require('./data/serviceInfo');

var _serviceInfo2 = _interopRequireDefault(_serviceInfo);

var _conferenceCall = require('./data/conferenceCall');

var _conferenceCall2 = _interopRequireDefault(_conferenceCall);

var _numberParse = require('./data/numberParse');

var _numberParse2 = _interopRequireDefault(_numberParse);

var _conferenceCallBringIn = require('./data/conferenceCallBringIn');

var _conferenceCallBringIn2 = _interopRequireDefault(_conferenceCallBringIn);

var _updateConference = require('./data/updateConference');

var _updateConference2 = _interopRequireDefault(_updateConference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockServer = 'http://whatever';
function createSDK() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = (0, _extends3.default)({}, options, {
    appKey: 'test key',
    appSecret: 'test secret',
    server: mockServer,
    Request: _fetchMock2.default.constructor.Request,
    Response: _fetchMock2.default.constructor.Response,
    Headers: _fetchMock2.default.constructor.Headers,
    fetch: _fetchMock2.default.fetchMock.bind(_fetchMock2.default),
    refreshDelayMs: 1,
    redirectUri: 'http://foo',
    cachePrefix: 'sdkPrefix'
  });
  return new _ringcentral2.default(opts);
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
    responseHeaders = {
      'Content-Type': 'application/json'
    };
  } else {
    responseHeaders = headers;
  }
  var mockUrl = void 0;
  if (url) {
    mockUrl = url;
  } else {
    mockUrl = '' + server + path;
  }
  var mock = isOnce ? _fetchMock2.default.once.bind(_fetchMock2.default) : _fetchMock2.default.mock.bind(_fetchMock2.default);
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
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/' + id + '/presence',
    body: (0, _extends3.default)({
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
    }, mockResponse)
  });
}

function presenceUpdate(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/' + id + '/presence',
    method: 'PUT',
    body: (0, _extends3.default)({}, _presence2.default, mockResponse)
  });
}

function dialingPlan() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/dialing-plan?perPage=MAX&page=1',
    body: (0, _extends3.default)({}, _dialingPlan2.default, mockResponse)
  });
}

function extensionInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/~',
    body: (0, _extends3.default)({}, _extensionInfo2.default, mockResponse),
    isOnce: false
  });
}

function conferenceCallBringIn(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/telephony/sessions/' + id + '/parties/bring-in',
    body: (0, _extends3.default)({}, _conferenceCallBringIn2.default, mockResponse),
    isOnce: false
  });
}
function removeFromConference(id, partyId) {
  mockApi({
    method: 'DELETE',
    path: '/restapi/v1.0/account/~/telephony/sessions/' + id + '/parties/' + partyId
  });
}
function extensionList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension?',
    body: (0, _extends3.default)({}, _extension2.default, mockResponse)
  });
}

function accountInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~',
    body: (0, _extends3.default)({}, _accountInfo2.default, mockResponse)
  });
}

function apiInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0',
    body: (0, _extends3.default)({}, _apiInfo2.default, mockResponse)
  });
}

function messageSync() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/message-sync',
    body: (0, _extends3.default)({}, _messageSync2.default, mockResponse),
    isOnce: isOnce
  });
}

function messageList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/message-store?',
    body: (0, _extends3.default)({}, _messageList2.default, mockResponse),
    isOnce: false
  });
}

function updateMessageStatus() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/message-store/',
    method: 'PUT',
    body: (0, _extends3.default)({}, _messageItem2.default, mockResponse),
    isOnce: isOnce
  });
}

function authzProfile() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/authz-profile',
    body: (0, _extends3.default)({}, _authzProfile2.default, mockResponse)
  });
}

function blockedNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/blocked-number',
    body: (0, _extends3.default)({}, _blockedNumber2.default, mockResponse)
  });
}

function forwardingNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/forwarding-number',
    body: (0, _extends3.default)({}, _forwardingNumber2.default, mockResponse)
  });
}

function phoneNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/phone-number',
    body: (0, _extends3.default)({}, _phoneNumber2.default, mockResponse)
  });
}

function accountPhoneNumber() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/phone-number',
    body: (0, _extends3.default)({}, _accountPhoneNumber2.default, mockResponse),
    isOnce: false
  });
}

function subscription() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'POST',
    url: 'begin:' + mockServer + '/restapi/v1.0/subscription',
    body: (0, _extends3.default)({}, _subscription2.default, mockResponse),
    isOnce: false
  });
  mockApi({
    method: 'PUT',
    url: 'begin:' + mockServer + '/restapi/v1.0/subscription',
    body: (0, _extends3.default)({}, _subscription2.default, mockResponse),
    isOnce: false
  });
  mockApi({
    method: 'DELETE',
    url: 'begin:' + mockServer + '/restapi/v1.0/subscription',
    body: (0, _extends3.default)({}, _subscription2.default, mockResponse),
    isOnce: false
  });
}

function numberParser() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  mockApi({
    method: 'POST',
    url: 'begin:' + mockServer + '/restapi/v1.0/number-parser/',
    body: (0, _extends3.default)({}, _numberParser2.default, mockResponse),
    isOnce: isOnce
  });
}

function sms() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/extension/~/sms',
    body: (0, _extends3.default)({}, _sms2.default, mockResponse)
  });
}
function addressBook() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/address-book-sync',
    body: (0, _extends3.default)({}, _addressBook2.default, {
      syncInfo: {
        syncType: _addressBook2.default.syncInfo.syncType,
        syncToken: _addressBook2.default.syncInfo.syncToken,
        syncTime: new Date(Date.now()).toISOString()
      }
    }, mockResponse),
    isOnce: false
  });
}

function callLog() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/call-log-sync',
    body: (0, _extends3.default)({}, _callLog2.default, {
      records: [(0, _extends3.default)({}, _callLog2.default.records[0], {
        startTime: new Date(Date.now()).toISOString()
      }), (0, _extends3.default)({}, _callLog2.default.records[1], {
        startTime: new Date(Date.now()).toISOString()
      })]
    }, {
      syncInfo: {
        syncType: _callLog2.default.syncInfo.syncType,
        syncToken: _callLog2.default.syncInfo.syncToken,
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
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/device',
    body: (0, _extends3.default)({}, _device2.default, mockResponse),
    isOnce: isOnce
  });
}

function conferencing() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/conferencing',
    body: (0, _extends3.default)({}, _conferencing2.default, mockResponse)
  });
}

// TODO: replace it with numberParser
function numberParse() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var homeCountry = arguments[1];

  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/number-parser/parse?homeCountry=' + homeCountry,
    body: (0, _extends3.default)({}, _numberParse2.default, mockResponse),
    isOnce: false
  });
}

function conferenceCall() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _conferenceCall2.default.session.on = function () {};
  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/telephony/conference',
    body: (0, _extends3.default)({}, _conferenceCall2.default, mockResponse),
    isOnce: false
  });
}

function updateConferenceCall(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  mockApi({
    path: '/restapi/v1.0/account/~/telephony/sessions/' + id,
    body: (0, _extends3.default)({}, mockResponse),
    isOnce: isOnce
  });
}

function terminateConferenceCall(id) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  mockApi({
    method: 'DELETE',
    path: '/restapi/v1.0/account/~/telephony/sessions/' + id,
    body: (0, _extends3.default)({}, _conferenceCall2.default, mockResponse)
  });
}

function activeCalls() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'GET',
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/active-calls',
    body: (0, _extends3.default)({}, _activeCalls2.default, mockResponse)
  });
}

function restore() {
  _fetchMock2.default.restore();
}

function reset() {
  _fetchMock2.default.reset();
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
    body: (0, _extends3.default)({}, _ringOut2.default, mockResponse)
  });
}

function ringOutUpdate() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    isOnce: false,
    url: 'begin:' + mockServer + '/restapi/v1.0/account/~/extension/~/ring-out/',
    body: (0, _extends3.default)({}, _ringOut2.default, mockResponse)
  });
}
function meeting() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'POST',
    url: mockServer + '/restapi/v1.0/account/~/extension/~/meeting',
    body: (0, _extends3.default)({}, _meeting2.default, mockResponse),
    isOnce: false
  });
}
function serviceInfo() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  mockApi({
    method: 'GET',
    url: mockServer + '/restapi/v1.0/account/~/extension/~/meeting/service-info',
    body: (0, _extends3.default)({}, _serviceInfo2.default, mockResponse),
    isOnce: false
  });
}
function recentActivity() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  mockApi({
    method: 'GET',
    url: new RegExp(mockServer + '/restapi/v1.0/account/~/extension/~/call-log'),
    body: (0, _extends3.default)({}, _callLog2.default, mockResponse),
    isOnce: isOnce
  });
}
function mockForLogin() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref3$mockAuthzProfil = _ref3.mockAuthzProfile,
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
      mockActiveCalls = _ref3$mockActiveCalls === undefined ? true : _ref3$mockActiveCalls,
      _ref3$mockUpdateConfe = _ref3.mockUpdateConference,
      mockUpdateConference = _ref3$mockUpdateConfe === undefined ? false : _ref3$mockUpdateConfe,
      _ref3$mockNumberParse = _ref3.mockNumberParser,
      mockNumberParser = _ref3$mockNumberParse === undefined ? true : _ref3$mockNumberParse,
      _ref3$mockRecentActiv = _ref3.mockRecentActivity,
      mockRecentActivity = _ref3$mockRecentActiv === undefined ? true : _ref3$mockRecentActiv,
      params = (0, _objectWithoutProperties3.default)(_ref3, ['mockAuthzProfile', 'mockExtensionInfo', 'mockForwardingNumber', 'mockMessageSync', 'mockConferencing', 'mockActiveCalls', 'mockUpdateConference', 'mockNumberParser', 'mockRecentActivity']);

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
    updateConferenceCall(_updateConference2.default.id, _updateConference2.default);
  }
  if (mockRecentActivity) {
    recentActivity();
  }
}
//# sourceMappingURL=index.js.map

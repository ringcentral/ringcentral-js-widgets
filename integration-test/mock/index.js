"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.join");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-iso-string");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.constructor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.regexp.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  mockWsServer: true,
  mockServer: true,
  createSDK: true,
  lastOptions: true,
  mockApi: true,
  wstoken: true,
  mockServerAndToken: true,
  authentication: true,
  logout: true,
  tokenRefresh: true,
  presence: true,
  presenceUpdate: true,
  dialingPlan: true,
  extensionInfo: true,
  conferenceCallBringIn: true,
  removeFromConference: true,
  extensionList: true,
  companyContactList: true,
  companyContactPublicList: true,
  accountInfo: true,
  apiInfo: true,
  messageSync: true,
  messageList: true,
  updateMessageStatus: true,
  authzProfile: true,
  blockedNumber: true,
  forwardingNumber: true,
  phoneNumber: true,
  accountPhoneNumber: true,
  subscription: true,
  numberParser: true,
  numberParserV2: true,
  sms: true,
  addressBook: true,
  callLog: true,
  userSettings: true,
  lockedSettings: true,
  assistedUsers: true,
  delegators: true,
  device: true,
  conferencing: true,
  numberParse: true,
  conferenceCall: true,
  updateConferenceCall: true,
  terminateConferenceCall: true,
  activeCalls: true,
  sipProvision: true,
  fetchDL: true,
  fetchDLWithNoRecord: true,
  restore: true,
  reset: true,
  mockForbidden: true,
  mockLimited: true,
  mockClient: true,
  ringOut: true,
  ringOutUpdate: true,
  meeting: true,
  meetingInvitation: true,
  rcvInvitation: true,
  meetingInfo: true,
  videoPreference: true,
  videoPersonalSettings: true,
  getRcvMeetingInfo: true,
  patchRcvMeeting: true,
  postRcvBridges: true,
  serviceInfo: true,
  meetingProvider: true,
  meetingProviderRcm: true,
  meetingProviderRcv: true,
  recentActivity: true,
  videoConfiguration: true,
  callerId: true,
  features: true,
  timezone: true,
  dialInNumbers: true,
  discoveryInitial: true,
  discoveryExternal: true,
  generateCode: true,
  mockForLogin: true
};
exports.accountInfo = accountInfo;
exports.accountPhoneNumber = accountPhoneNumber;
exports.activeCalls = activeCalls;
exports.addressBook = addressBook;
exports.apiInfo = apiInfo;
exports.assistedUsers = assistedUsers;
exports.authentication = authentication;
exports.authzProfile = authzProfile;
exports.blockedNumber = blockedNumber;
exports.callLog = callLog;
exports.callerId = callerId;
exports.companyContactList = companyContactList;
exports.companyContactPublicList = companyContactPublicList;
exports.conferenceCall = conferenceCall;
exports.conferenceCallBringIn = conferenceCallBringIn;
exports.conferencing = conferencing;
exports.createSDK = createSDK;
exports.delegators = delegators;
exports.device = device;
exports.dialInNumbers = dialInNumbers;
exports.dialingPlan = dialingPlan;
exports.discoveryExternal = discoveryExternal;
exports.discoveryInitial = discoveryInitial;
exports.extensionInfo = extensionInfo;
exports.extensionList = extensionList;
exports.features = features;
exports.fetchDL = fetchDL;
exports.fetchDLWithNoRecord = fetchDLWithNoRecord;
exports.forwardingNumber = forwardingNumber;
exports.generateCode = generateCode;
exports.getRcvMeetingInfo = getRcvMeetingInfo;
exports.lastOptions = lastOptions;
exports.lockedSettings = lockedSettings;
exports.logout = logout;
exports.meeting = meeting;
exports.meetingInfo = meetingInfo;
exports.meetingInvitation = meetingInvitation;
exports.meetingProvider = meetingProvider;
exports.meetingProviderRcm = meetingProviderRcm;
exports.meetingProviderRcv = meetingProviderRcv;
exports.messageList = messageList;
exports.messageSync = messageSync;
exports.mockApi = mockApi;
exports.mockClient = mockClient;
exports.mockForLogin = mockForLogin;
exports.mockForbidden = mockForbidden;
exports.mockLimited = mockLimited;
exports.mockServer = void 0;
exports.mockServerAndToken = mockServerAndToken;
exports.mockWsServer = void 0;
exports.numberParse = numberParse;
exports.numberParser = numberParser;
exports.numberParserV2 = numberParserV2;
exports.patchRcvMeeting = patchRcvMeeting;
exports.phoneNumber = phoneNumber;
exports.postRcvBridges = postRcvBridges;
exports.presence = presence;
exports.presenceUpdate = presenceUpdate;
exports.rcvInvitation = rcvInvitation;
exports.recentActivity = recentActivity;
exports.removeFromConference = removeFromConference;
exports.reset = reset;
exports.restore = restore;
exports.ringOut = ringOut;
exports.ringOutUpdate = ringOutUpdate;
exports.serviceInfo = serviceInfo;
exports.sipProvision = sipProvision;
exports.sms = sms;
exports.subscription = subscription;
exports.terminateConferenceCall = terminateConferenceCall;
exports.timezone = timezone;
exports.tokenRefresh = tokenRefresh;
exports.updateConferenceCall = updateConferenceCall;
exports.updateMessageStatus = updateMessageStatus;
exports.userSettings = userSettings;
exports.videoConfiguration = videoConfiguration;
exports.videoPersonalSettings = videoPersonalSettings;
exports.videoPreference = videoPreference;
exports.wstoken = wstoken;
require("regenerator-runtime/runtime");
var _fetchMock = _interopRequireDefault(require("fetch-mock"));
var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));
var _jestWebsocketMock = _interopRequireDefault(require("jest-websocket-mock"));
var _sdk = require("@ringcentral/sdk");
var _RcVideo = require("../../modules/RcVideo");
var _accountInfo = _interopRequireDefault(require("./data/accountInfo.json"));
var _accountPhoneNumber = _interopRequireDefault(require("./data/accountPhoneNumber.json"));
var _activeCalls = _interopRequireDefault(require("./data/activeCalls.json"));
var _addressBook = _interopRequireDefault(require("./data/addressBook.json"));
var _apiInfo = _interopRequireDefault(require("./data/apiInfo.json"));
var _assistedUsers = _interopRequireDefault(require("./data/assistedUsers.json"));
var _authzProfile = _interopRequireDefault(require("./data/authzProfile.json"));
var _blockedNumber = _interopRequireDefault(require("./data/blockedNumber.json"));
var _callerId = _interopRequireDefault(require("./data/callerId.json"));
var _callLog = _interopRequireDefault(require("./data/callLog.json"));
var _callLogList = _interopRequireDefault(require("./data/callLogList.json"));
var _conferenceCall = _interopRequireDefault(require("./data/conferenceCall.json"));
var _conferenceCallBringIn = _interopRequireDefault(require("./data/conferenceCallBringIn.json"));
var _conferencing = _interopRequireDefault(require("./data/conferencing.json"));
var _device = _interopRequireDefault(require("./data/device.json"));
var _dialingPlan = _interopRequireDefault(require("./data/dialingPlan.json"));
var _dialInNumbers = _interopRequireDefault(require("./data/dialInNumbers.json"));
var _discoveryExternal = _interopRequireDefault(require("./data/discoveryExternal.json"));
var _discoveryInitial = _interopRequireDefault(require("./data/discoveryInitial.json"));
var _extension = _interopRequireDefault(require("./data/extension.json"));
var _extensionInfo = _interopRequireDefault(require("./data/extensionInfo.json"));
var _extensions = _interopRequireDefault(require("./data/extensions.json"));
var _features = _interopRequireDefault(require("./data/features.json"));
var _fetchDL = _interopRequireDefault(require("./data/fetchDL.json"));
var _fetchDLWithNoRecord = _interopRequireDefault(require("./data/fetchDLWithNoRecord.json"));
var _forwardingNumber = _interopRequireDefault(require("./data/forwardingNumber.json"));
var _generateCode = _interopRequireDefault(require("./data/generateCode.json"));
var _lockedSettings = _interopRequireDefault(require("./data/lockedSettings.json"));
var _meeting = _interopRequireDefault(require("./data/meeting.json"));
var _meetingInvitation = _interopRequireDefault(require("./data/meetingInvitation.json"));
var _rcvInvitation = require("./data/rcvInvitation");
var _meetingProviderRcm = _interopRequireDefault(require("./data/meetingProviderRcm.json"));
var _meetingProviderRcv = _interopRequireDefault(require("./data/meetingProviderRcv.json"));
var _messageItem = _interopRequireDefault(require("./data/messageItem.json"));
var _messageList = _interopRequireDefault(require("./data/messageList.json"));
var _messageSync = _interopRequireDefault(require("./data/messageSync.json"));
var _numberParse = _interopRequireDefault(require("./data/numberParse.json"));
var _numberParser = _interopRequireDefault(require("./data/numberParser.json"));
var _numberParserV = _interopRequireDefault(require("./data/numberParserV2.json"));
var _phoneNumber = _interopRequireDefault(require("./data/phoneNumber.json"));
var _postRcvBridges = _interopRequireDefault(require("./data/postRcvBridges.json"));
var _presence = _interopRequireDefault(require("./data/presence.json"));
var _rcvMeetingSettings = _interopRequireDefault(require("./data/rcvMeetingSettings.json"));
var _ringOut = _interopRequireDefault(require("./data/ringOut.json"));
var _serviceInfo = _interopRequireDefault(require("./data/serviceInfo.json"));
var _sipProvision = _interopRequireDefault(require("./data/sipProvision.json"));
var _sms = _interopRequireDefault(require("./data/sms.json"));
var _subscription = _interopRequireDefault(require("./data/subscription.json"));
var _timezone = _interopRequireDefault(require("./data/timezone.json"));
var _updateConference = _interopRequireDefault(require("./data/updateConference.json"));
var _userSettings = _interopRequireDefault(require("./data/userSettings.json"));
var _videoConfiguration = _interopRequireDefault(require("./data/videoConfiguration.json"));
var _videoPersonalSettings = _interopRequireDefault(require("./data/videoPersonalSettings.json"));
var _videoPreference = _interopRequireDefault(require("./data/videoPreference.json"));
var _connectionDetails = _interopRequireDefault(require("./data/ws/connectionDetails.json"));
var _heartbeatResponse = _interopRequireDefault(require("./data/ws/heartbeatResponse.json"));
var _subscriptionResponse = _interopRequireDefault(require("./data/ws/subscriptionResponse.json"));
var _wstoken = _interopRequireDefault(require("./data/ws/wstoken.json"));
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var mockWsServer = 'ws://whatever';
exports.mockWsServer = mockWsServer;
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
    fetch: function fetch(url, opts) {
      return url instanceof _fetchMock["default"].constructor.Request ? _fetchMock["default"].fetchMock(url.url, url) // fetchMock doesn't fully support `Request` type
      : _fetchMock["default"].fetchMock(url, opts);
    },
    refreshDelayMs: 1,
    redirectUri: 'http://foo',
    cachePrefix: 'sdkPrefix',
    clearCacheOnRefreshError: false
  }, options);
  return new _sdk.SDK(opts);
}

// give you access to the parameters last passed in to fetch
function lastOptions() {
  return _fetchMock["default"].lastOptions();
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
function startWebSocketMockServer() {
  // mock WebSocket server
  var server = new _jestWebsocketMock["default"](mockWsServer);
  global.webSocketServer = server;
  server.on('connection', function (socket) {
    // type: ConnectionDetails
    socket.send(JSON.stringify(_connectionDetails["default"]));
    socket.on('message', function (message) {
      var _JSON$parse = JSON.parse(message),
        _JSON$parse2 = _slicedToArray(_JSON$parse, 2),
        meta = _JSON$parse2[0],
        body = _JSON$parse2[1]; // type: Heartbeat
      if (meta.type === 'Heartbeat') {
        socket.send(JSON.stringify([_objectSpread(_objectSpread({}, _heartbeatResponse["default"][0]), meta), body]));
      }
      // type: ClientRequest
      else if (meta.type === 'ClientRequest') {
        switch (meta.path) {
          case '/restapi/v1.0/subscription':
            socket.send(JSON.stringify(_subscriptionResponse["default"]));
            break;
          // TODO: mock more path here
          default:
            console.warn("[WebSocketMockServer] Unmatched ".concat(meta.method || 'GET', " to ").concat(meta.path));
            break;
        }
      }
    });
  });

  // TODO: should find way to change that implementation
  // hook WebSocket
  _isomorphicWs["default"].prototype._onCreated = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return server.connected;
          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  var originalSend = _isomorphicWs["default"].prototype.send;
  _isomorphicWs["default"].prototype.send = /*#__PURE__*/function () {
    var _newSend = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _len,
        args,
        _key,
        _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return server.connected;
            case 2:
              for (_len = _args2.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args2[_key];
              }
              originalSend.call.apply(originalSend, [this].concat(args));
              _context2.next = 6;
              return server.nextMessage;
            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
    function newSend() {
      return _newSend.apply(this, arguments);
    }
    return newSend;
  }();
}
function wstoken() {
  mockApi({
    method: 'POST',
    path: '/restapi/oauth/wstoken',
    body: _objectSpread(_objectSpread({}, _wstoken["default"]), {}, {
      uri: mockWsServer
    }),
    isOnce: false
  });
}
var wsMockServerStarted = false;
function mockServerAndToken() {
  if (!wsMockServerStarted) {
    startWebSocketMockServer();
    wsMockServerStarted = true;
  }
  wstoken();
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
      scope: 'SMS RCM Foo Boo CallControl TelephonySessions',
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
  var extId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '~';
  mockApi({
    path: "/restapi/v1.0/account/~/extension/".concat(extId),
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
  var extraParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isEmptyRes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var query = '';
  // eslint-disable-next-line guard-for-in
  for (var key in extraParams) {
    query = query.concat("".concat(key, "=").concat(extraParams[key]));
  }
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/extension?").concat(query),
    body: isEmptyRes ? {} : _objectSpread(_objectSpread({}, _extension["default"]), mockResponse),
    isOnce: false
  });
}
function companyContactList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/directory/contacts?"),
    body: _objectSpread(_objectSpread({}, _extensions["default"]), mockResponse)
  });
}
function companyContactPublicList() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/restapi/v1.0/account/~/directory/entries"),
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
function numberParserV2() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  mockApi({
    method: 'POST',
    url: "begin:".concat(mockServer, "/restapi/v2/number-parser/parse"),
    body: _objectSpread(_objectSpread({}, _numberParserV["default"]), mockResponse),
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
  var extensionId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '~';
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/").concat(extensionId, "/meeting/user-settings"),
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
function delegators(mockResponse) {
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/rcvideo/v1/accounts/~/extensions/~/delegators"),
    body: mockResponse || [],
    isOnce: false
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
}

// TODO: replace it with numberParser
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
function mockForbidden(_ref3) {
  var _ref3$method = _ref3.method,
    method = _ref3$method === void 0 ? 'GET' : _ref3$method,
    path = _ref3.path,
    url = _ref3.url,
    _ref3$body = _ref3.body,
    body = _ref3$body === void 0 ? '' : _ref3$body;
  mockApi({
    method: method,
    path: path,
    body: body,
    url: url,
    status: 403
  });
}
function mockLimited(_ref4) {
  var _ref4$method = _ref4.method,
    method = _ref4$method === void 0 ? 'GET' : _ref4$method,
    path = _ref4.path,
    url = _ref4.url,
    headers = _ref4.headers;
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
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    status = _ref5.status,
    _ref5$meetingId = _ref5.meetingId,
    meetingId = _ref5$meetingId === void 0 ? null : _ref5$meetingId,
    _ref5$mockResponse = _ref5.mockResponse,
    mockResponse = _ref5$mockResponse === void 0 ? {} : _ref5$mockResponse,
    _ref5$extraParams = _ref5.extraParams,
    extraParams = _ref5$extraParams === void 0 ? {
      language: 'en-US'
    } : _ref5$extraParams;
  var id = meetingId || _meeting["default"].id;
  var query = '';
  // eslint-disable-next-line guard-for-in
  for (var key in extraParams) {
    query = query.concat("".concat(key, "=").concat(extraParams[key]));
  }
  mockApi({
    status: status,
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/meeting/").concat(id, "/invitation?").concat(query),
    body: _objectSpread(_objectSpread({}, _meetingInvitation["default"]), mockResponse),
    isOnce: false
  });
}
function rcvInvitation() {
  var mockInvitation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _rcvInvitation.RCV_INVITATION_BODY;
  mockApi({
    method: 'POST',
    url: "".concat(mockServer, "/restapi/v1.0/uns/render-document"),
    body: new Blob([_rcvInvitation.RCV_INVITATION_START, mockInvitation, _rcvInvitation.RCV_INVITATION_END]),
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
  var extensionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '~';
  var mockResponse = arguments.length > 1 ? arguments[1] : undefined;
  var query = "id=".concat(_RcVideo.RCV_PREFERENCES_IDS.join('&id='));
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/rcvideo/v1/account/").concat(_accountInfo["default"].id, "/extension/").concat(extensionId, "/preferences?").concat(query),
    body: mockResponse || _videoPreference["default"],
    isOnce: false
  });
}
function videoPersonalSettings() {
  var extensionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _extensionInfo["default"].id;
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/rcvideo/v1/bridges?default=true&accountId=").concat(_accountInfo["default"].id, "&extensionId=").concat(extensionId),
    body: _objectSpread(_objectSpread({}, _videoPersonalSettings["default"]), mockResponse),
    isOnce: false
  });
}
function getRcvMeetingInfo(shortId) {
  var extensionId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _extensionInfo["default"].id;
  var mockResponse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/rcvideo/v1/bridges?shortId=").concat(shortId, "&accountId=").concat(_accountInfo["default"].id, "&extensionId=").concat(extensionId),
    body: _objectSpread(_objectSpread({}, _rcvMeetingSettings["default"]), mockResponse),
    isOnce: isOnce
  });
}
function patchRcvMeeting(meetingId) {
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  mockApi({
    method: 'PATCH',
    url: "".concat(mockServer, "/rcvideo/v1/bridges/").concat(meetingId),
    body: _objectSpread(_objectSpread({}, _rcvMeetingSettings["default"]), mockResponse),
    isOnce: false
  });
}
function postRcvBridges() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  mockApi({
    method: 'POST',
    url: "".concat(mockServer, "/rcvideo/v1/bridges"),
    body: _objectSpread(_objectSpread({}, _postRcvBridges["default"]), mockResponse),
    isOnce: isOnce
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
    body: _objectSpread(_objectSpread({}, _callLogList["default"]), mockResponse),
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
function dialInNumbers() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/rcvideo/v1/dial-in-numbers"),
    body: _objectSpread(_objectSpread({}, _dialInNumbers["default"]), mockResponse),
    isOnce: false
  });
}
function discoveryInitial() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    url: "begin:".concat(mockServer, "/.well-known/entry-points/initial"),
    body: _objectSpread(_objectSpread({}, _discoveryInitial["default"]), mockResponse),
    isOnce: false
  });
}
function discoveryExternal() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: "/.well-known/entry-points/external",
    body: _objectSpread(_objectSpread({}, _discoveryExternal["default"]), mockResponse),
    isOnce: false
  });
}
function generateCode() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'POST',
    url: "".concat(mockServer, "/restapi/v1.0/interop/generate-code"),
    body: _objectSpread(_objectSpread({}, _generateCode["default"]), mockResponse),
    isOnce: false
  });
}
function mockForLogin() {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref6$mockWsServer = _ref6.mockWsServer,
    mockWsServer = _ref6$mockWsServer === void 0 ? true : _ref6$mockWsServer,
    _ref6$mockTimezone = _ref6.mockTimezone,
    mockTimezone = _ref6$mockTimezone === void 0 ? false : _ref6$mockTimezone,
    _ref6$mockAuthzProfil = _ref6.mockAuthzProfile,
    mockAuthzProfile = _ref6$mockAuthzProfil === void 0 ? true : _ref6$mockAuthzProfil,
    _ref6$mockExtensionIn = _ref6.mockExtensionInfo,
    mockExtensionInfo = _ref6$mockExtensionIn === void 0 ? true : _ref6$mockExtensionIn,
    _ref6$mockForwardingN = _ref6.mockForwardingNumber,
    mockForwardingNumber = _ref6$mockForwardingN === void 0 ? true : _ref6$mockForwardingN,
    _ref6$mockMessageSync = _ref6.mockMessageSync,
    mockMessageSync = _ref6$mockMessageSync === void 0 ? true : _ref6$mockMessageSync,
    _ref6$mockConferencin = _ref6.mockConferencing,
    mockConferencing = _ref6$mockConferencin === void 0 ? true : _ref6$mockConferencin,
    _ref6$mockActiveCalls = _ref6.mockActiveCalls,
    mockActiveCalls = _ref6$mockActiveCalls === void 0 ? true : _ref6$mockActiveCalls,
    _ref6$mockUpdateConfe = _ref6.mockUpdateConference,
    mockUpdateConference = _ref6$mockUpdateConfe === void 0 ? true : _ref6$mockUpdateConfe,
    _ref6$mockNumberParse = _ref6.mockNumberParser,
    mockNumberParser = _ref6$mockNumberParse === void 0 ? true : _ref6$mockNumberParse,
    _ref6$mockRecentActiv = _ref6.mockRecentActivity,
    mockRecentActivity = _ref6$mockRecentActiv === void 0 ? true : _ref6$mockRecentActiv,
    _ref6$mockMessageSync2 = _ref6.mockMessageSyncOnce,
    mockMessageSyncOnce = _ref6$mockMessageSync2 === void 0 ? false : _ref6$mockMessageSync2,
    _ref6$mockVideoConfig = _ref6.mockVideoConfiguration,
    mockVideoConfiguration = _ref6$mockVideoConfig === void 0 ? true : _ref6$mockVideoConfig,
    _ref6$mockUserSetting = _ref6.mockUserSetting,
    mockUserSetting = _ref6$mockUserSetting === void 0 ? true : _ref6$mockUserSetting,
    _ref6$mockGenerateCod = _ref6.mockGenerateCode,
    mockGenerateCode = _ref6$mockGenerateCod === void 0 ? false : _ref6$mockGenerateCod,
    _ref6$phoneNumberData = _ref6.phoneNumberData,
    phoneNumberData = _ref6$phoneNumberData === void 0 ? {} : _ref6$phoneNumberData,
    dialingPlanData = _ref6.dialingPlanData,
    extensionInfoData = _ref6.extensionInfoData,
    accountInfoData = _ref6.accountInfoData,
    apiInfoData = _ref6.apiInfoData,
    authzProfileData = _ref6.authzProfileData,
    deviceData = _ref6.deviceData,
    extensionListData = _ref6.extensionListData,
    extensionListQuery = _ref6.extensionListQuery,
    isExtensionListEmptyRes = _ref6.isExtensionListEmptyRes,
    extensionsListData = _ref6.extensionsListData,
    blockedNumberData = _ref6.blockedNumberData,
    forwardingNumberData = _ref6.forwardingNumberData,
    messageListData = _ref6.messageListData,
    messageSyncData = _ref6.messageSyncData,
    callerIdData = _ref6.callerIdData,
    subscriptionData = _ref6.subscriptionData,
    callLogData = _ref6.callLogData,
    addressBookData = _ref6.addressBookData,
    sipProvisionData = _ref6.sipProvisionData,
    fetchDLData = _ref6.fetchDLData,
    conferencingData = _ref6.conferencingData,
    activeCallsData = _ref6.activeCallsData,
    numberParseData = _ref6.numberParseData,
    numberParseIsOnce = _ref6.numberParseIsOnce,
    userSettingsData = _ref6.userSettingsData,
    lockedSettingsData = _ref6.lockedSettingsData,
    featuresData = _ref6.featuresData,
    mockAssistedUsers = _ref6.mockAssistedUsers,
    mockDelegators = _ref6.mockDelegators;
  discoveryInitial();
  discoveryExternal();
  if (mockWsServer) wstoken();
  authentication();
  logout();
  tokenRefresh();
  presence('~');
  dialingPlan(dialingPlanData);
  if (mockExtensionInfo) {
    extensionInfo(extensionInfoData);
  }
  if (mockTimezone) {
    timezone();
  }
  accountInfo(accountInfoData);
  apiInfo(apiInfoData);
  if (mockAuthzProfile) {
    authzProfile(authzProfileData);
  }
  device(deviceData);
  extensionList(extensionListData, extensionListQuery, isExtensionListEmptyRes);
  companyContactList(extensionsListData);
  companyContactPublicList(extensionsListData);
  // accountPhoneNumber(accountPhoneNumberData);
  blockedNumber(blockedNumberData);
  if (mockForwardingNumber) {
    forwardingNumber(forwardingNumberData);
  }
  messageList(messageListData);
  if (mockMessageSync) {
    messageSync(messageSyncData, mockMessageSyncOnce);
  }
  phoneNumber(phoneNumberData);
  callerId(callerIdData);
  subscription(subscriptionData);
  callLog(callLogData);
  addressBook(addressBookData);
  sipProvision(sipProvisionData);
  fetchDL(fetchDLData);
  dialInNumbers(fetchDLData);
  if (mockConferencing) {
    conferencing(conferencingData);
  }
  if (mockActiveCalls) {
    activeCalls(activeCallsData);
  }
  if (mockNumberParser) {
    numberParser(numberParseData, numberParseIsOnce);
    numberParserV2(numberParseData, numberParseIsOnce);
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
    userSettings(userSettingsData);
  }
  lockedSettings(lockedSettingsData);
  features(featuresData);
  assistedUsers(mockAssistedUsers);
  delegators(mockDelegators);
  videoPersonalSettings();
  if (mockGenerateCode) {
    generateCode();
  }
}
//# sourceMappingURL=index.js.map

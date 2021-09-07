"use strict";

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSDK = createSDK;
exports.mockApi = mockApi;
exports.wstoken = wstoken;
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
exports.getRcvMeetingInfo = getRcvMeetingInfo;
exports.patchRcvMeeting = patchRcvMeeting;
exports.postRcvBridges = postRcvBridges;
exports.serviceInfo = serviceInfo;
exports.meetingProvider = meetingProvider;
exports.meetingProviderRcm = meetingProviderRcm;
exports.meetingProviderRcv = meetingProviderRcv;
exports.recentActivity = recentActivity;
exports.videoConfiguration = videoConfiguration;
exports.callerId = callerId;
exports.features = features;
exports.timezone = timezone;
exports.dialInNumbers = dialInNumbers;
exports.discoveryInitial = discoveryInitial;
exports.discoveryExternal = discoveryExternal;
exports.generateCode = generateCode;
exports.mockForLogin = mockForLogin;
exports.mockServer = exports.mockWsServer = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.date.to-iso-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.bind");

var _sdk = require("@ringcentral/sdk");

var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));

var _jestWebsocketMock = _interopRequireDefault(require("jest-websocket-mock"));

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

var _dialInNumbers = _interopRequireDefault(require("./data/dialInNumbers.json"));

var _postRcvBridges = _interopRequireDefault(require("./data/postRcvBridges.json"));

var _updateConference = _interopRequireDefault(require("./data/updateConference.json"));

var _userSettings = _interopRequireDefault(require("./data/userSettings.json"));

var _videoConfiguration = _interopRequireDefault(require("./data/videoConfiguration.json"));

var _videoPreference = _interopRequireDefault(require("./data/videoPreference.json"));

var _features = _interopRequireDefault(require("./data/features.json"));

var _videoPersonalSettings = _interopRequireDefault(require("./data/videoPersonalSettings.json"));

var _rcvMeetingSettings = _interopRequireDefault(require("./data/rcvMeetingSettings.json"));

var _wstoken = _interopRequireDefault(require("./data/ws/wstoken.json"));

var _heartbeatResponse = _interopRequireDefault(require("./data/ws/heartbeatResponse.json"));

var _connectionDetails = _interopRequireDefault(require("./data/ws/connectionDetails.json"));

var _subscriptionResponse = _interopRequireDefault(require("./data/ws/subscriptionResponse.json"));

var _discoveryInitial = _interopRequireDefault(require("./data/discoveryInitial.json"));

var _discoveryExternal = _interopRequireDefault(require("./data/discoveryExternal.json"));

var _generateCode = _interopRequireDefault(require("./data/generateCode.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      } // type: ClientRequest
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
  }); // hook WebSocket

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

var wsMockServerStarted = false;

function wstoken() {
  if (!wsMockServerStarted) {
    startWebSocketMockServer();
    wsMockServerStarted = true;
  }

  mockApi({
    method: 'POST',
    path: '/restapi/oauth/wstoken',
    body: _objectSpread(_objectSpread({}, _wstoken["default"]), {}, {
      uri: mockWsServer
    }),
    isOnce: false
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
  var query = ''; // eslint-disable-next-line guard-for-in

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
  var meetingId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var mockResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var extraParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    language: 'en-US'
  };
  var id = meetingId || _meeting["default"].id;
  var query = ''; // eslint-disable-next-line guard-for-in

  for (var key in extraParams) {
    query = query.concat("".concat(key, "=").concat(extraParams[key]));
  }

  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/restapi/v1.0/account/~/extension/~/meeting/").concat(id, "/invitation?").concat(query),
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
  var extensionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '~';
  var mockResponse = arguments.length > 1 ? arguments[1] : undefined;
  var query = "id=".concat(_videoHelper.RCV_PREFERENCES_IDS.join('&id='));
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
  mockApi({
    method: 'GET',
    url: "".concat(mockServer, "/rcvideo/v1/bridges?shortId=").concat(shortId, "&accountId=").concat(_accountInfo["default"].id, "&extensionId=").concat(extensionId),
    body: _objectSpread(_objectSpread({}, _rcvMeetingSettings["default"]), mockResponse),
    isOnce: false
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
    path: "/.well-known/entry-points/initial",
    body: _objectSpread(_objectSpread({}, _discoveryInitial["default"]), mockResponse)
  });
}

function discoveryExternal() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    path: "/.well-known/entry-points/external",
    body: _objectSpread(_objectSpread({}, _discoveryExternal["default"]), mockResponse)
  });
}

function generateCode() {
  var mockResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mockApi({
    method: 'POST',
    url: "".concat(mockServer, "/restapi/v1.0/interop/generate-code"),
    body: _objectSpread(_objectSpread({}, _generateCode["default"]), mockResponse)
  });
}

function mockForLogin() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref5$mockAuthzProfil = _ref5.mockAuthzProfile,
      mockAuthzProfile = _ref5$mockAuthzProfil === void 0 ? true : _ref5$mockAuthzProfil,
      _ref5$mockMeetingInvi = _ref5.mockMeetingInvitation,
      mockMeetingInvitation = _ref5$mockMeetingInvi === void 0 ? true : _ref5$mockMeetingInvi,
      _ref5$mockExtensionIn = _ref5.mockExtensionInfo,
      mockExtensionInfo = _ref5$mockExtensionIn === void 0 ? true : _ref5$mockExtensionIn,
      _ref5$mockForwardingN = _ref5.mockForwardingNumber,
      mockForwardingNumber = _ref5$mockForwardingN === void 0 ? true : _ref5$mockForwardingN,
      _ref5$mockMessageSync = _ref5.mockMessageSync,
      mockMessageSync = _ref5$mockMessageSync === void 0 ? true : _ref5$mockMessageSync,
      _ref5$mockConferencin = _ref5.mockConferencing,
      mockConferencing = _ref5$mockConferencin === void 0 ? true : _ref5$mockConferencin,
      _ref5$mockActiveCalls = _ref5.mockActiveCalls,
      mockActiveCalls = _ref5$mockActiveCalls === void 0 ? true : _ref5$mockActiveCalls,
      _ref5$mockUpdateConfe = _ref5.mockUpdateConference,
      mockUpdateConference = _ref5$mockUpdateConfe === void 0 ? true : _ref5$mockUpdateConfe,
      _ref5$mockNumberParse = _ref5.mockNumberParser,
      mockNumberParser = _ref5$mockNumberParse === void 0 ? true : _ref5$mockNumberParse,
      _ref5$mockRecentActiv = _ref5.mockRecentActivity,
      mockRecentActivity = _ref5$mockRecentActiv === void 0 ? true : _ref5$mockRecentActiv,
      _ref5$mockMessageSync2 = _ref5.mockMessageSyncOnce,
      mockMessageSyncOnce = _ref5$mockMessageSync2 === void 0 ? false : _ref5$mockMessageSync2,
      _ref5$mockVideoConfig = _ref5.mockVideoConfiguration,
      mockVideoConfiguration = _ref5$mockVideoConfig === void 0 ? true : _ref5$mockVideoConfig,
      _ref5$mockUserSetting = _ref5.mockUserSetting,
      mockUserSetting = _ref5$mockUserSetting === void 0 ? true : _ref5$mockUserSetting,
      _ref5$mockGenerateCod = _ref5.mockGenerateCode,
      mockGenerateCode = _ref5$mockGenerateCod === void 0 ? false : _ref5$mockGenerateCod,
      params = _objectWithoutProperties(_ref5, ["mockAuthzProfile", "mockMeetingInvitation", "mockExtensionInfo", "mockForwardingNumber", "mockMessageSync", "mockConferencing", "mockActiveCalls", "mockUpdateConference", "mockNumberParser", "mockRecentActivity", "mockMessageSyncOnce", "mockVideoConfiguration", "mockUserSetting", "mockGenerateCode"]);

  wstoken();
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
  extensionList(params.extensionListData, params.extensionListQuery, params.isExtensionListEmptyRes);
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
  dialInNumbers(params.fetchDLData);

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
  delegators(params.mockDelegators);
  videoPersonalSettings();

  if (mockGenerateCode) {
    generateCode();
  }
}
//# sourceMappingURL=index.js.map

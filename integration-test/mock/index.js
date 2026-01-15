"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
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
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-iso-string.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
var _core = require("@ringcentral-integration/core");
var _socketMockUrl = require("@ringcentral-integration/test-utils/lib/socketMockUrl");
var _sdk = require("@ringcentral/sdk");
var _fetchMock = _interopRequireDefault(require("fetch-mock"));
var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));
var _jestWebsocketMock = _interopRequireDefault(require("jest-websocket-mock"));
var _RcVideo = require("../../modules/RcVideo");
var _accountInfo = _interopRequireDefault(require("./data/accountInfo.json"));
var _accountPhoneNumber = _interopRequireDefault(require("./data/accountPhoneNumber.json"));
var _activeCalls = _interopRequireDefault(require("./data/activeCalls.json"));
var _addressBook = _interopRequireDefault(require("./data/addressBook.json"));
var _apiInfo = _interopRequireDefault(require("./data/apiInfo.json"));
var _assistedUsers = _interopRequireDefault(require("./data/assistedUsers.json"));
var _authzProfile = _interopRequireDefault(require("./data/authzProfile.json"));
var _blockedNumber = _interopRequireDefault(require("./data/blockedNumber.json"));
var _callLog = _interopRequireDefault(require("./data/callLog.json"));
var _callLogList = _interopRequireDefault(require("./data/callLogList.json"));
var _callerId = _interopRequireDefault(require("./data/callerId.json"));
var _conferenceCall = _interopRequireDefault(require("./data/conferenceCall.json"));
var _conferenceCallBringIn = _interopRequireDefault(require("./data/conferenceCallBringIn.json"));
var _conferencing = _interopRequireDefault(require("./data/conferencing.json"));
var _device = _interopRequireDefault(require("./data/device.json"));
var _dialInNumbers = _interopRequireDefault(require("./data/dialInNumbers.json"));
var _dialingPlan = _interopRequireDefault(require("./data/dialingPlan.json"));
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
var _rcvInvitation = require("./data/rcvInvitation");
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var mockWsServer = exports.mockWsServer = _socketMockUrl.SOCKET_MOCK_URL;
var mockServer = exports.mockServer = 'http://whatever';
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
  return new _sdk.SDK((0, _core.removeSDKNonISO8859Chars)(opts));
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
        body = _JSON$parse2[1];
      // type: Heartbeat
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
  _isomorphicWs["default"].prototype._onCreated = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return server.connected;
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  var originalSend = _isomorphicWs["default"].prototype.send;
  _isomorphicWs["default"].prototype.send = /*#__PURE__*/function () {
    var _newSend = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _len,
        args,
        _key,
        _args2 = arguments;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return server.connected;
          case 1:
            for (_len = _args2.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = _args2[_key];
            }
            originalSend.call.apply(originalSend, [this].concat(args));
            _context2.n = 2;
            return server.nextMessage;
          case 2:
            return _context2.a(2);
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
      scope: 'EditAccounts ReadMessages Faxes ReadPresence EditCallLog Meetings VoipCalling ReadClientInfo Interoperability VideoInternal WebSocket SubscriptionPubNub SubscriptionWebSocket Contacts SubscriptionGCM EditExtensions TelephonySessions ProblemReportsManagement RingOut SMS InternalMessages EditMessages EditPresence SendUsageInfo',
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

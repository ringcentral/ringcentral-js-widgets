"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.map");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvClient = void 0;
require("regenerator-runtime/runtime");
var _SDK = _interopRequireDefault(require("@SDK"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _utils = require("@ringcentral-integration/commons/utils");
var _core = require("@ringcentral-integration/core");
var _events = require("events");
var _enums = require("../../enums");
var _EvTypeError = require("../EvTypeError");
var _constant = require("../constant");
var _enums2 = require("./enums");
var _callbackTypes = require("./enums/callbackTypes");
var _dec, _class, _class2, _descriptor; // eslint-disable-next-line import/no-unresolved
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var EvClient = (_dec = (0, _di.Module)({
  name: 'EvClient',
  deps: ['EvClientOptions']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvClient, _RcModuleV);
  var _super = _createSuper(EvClient);
  function EvClient(deps) {
    var _this;
    _classCallCheck(this, EvClient);
    _this = _super.call(this, {
      deps: deps
    });
    /** SDK instance */
    _this._sdk = void 0;
    _this._onOpen = void 0;
    _this._onClose = void 0;
    _this._Sdk = _SDK["default"];
    _this._options = void 0;
    _this._eventEmitter = new _events.EventEmitter();
    _this._callbacks = {};
    _initializerDefineProperty(_this, "appStatus", _descriptor, _assertThisInitialized(_this));
    _this._options = _this._deps.evClientOptions.options;
    var _this$_deps$evClientO = _this._deps.evClientOptions.callbacks,
      closeResponse = _this$_deps$evClientO.closeResponse,
      openResponse = _this$_deps$evClientO.openResponse;
    _this._onOpen = function (res) {
      _this.setAppStatus(_enums2.evStatus.CONNECTED);
      openResponse(res);
      _this._eventEmitter.emit(_callbackTypes.EvCallbackTypes.OPEN_SOCKET, res);
      // ensure for WebSocket keep-alive connection
      _this._sdk.terminateStats();
    };
    _this._onClose = function () {
      console.log('EvCallbackTypes.CLOSE_SOCKET~');
      _this.setAppStatus(_enums2.evStatus.CLOSED);
      closeResponse();
      _this._eventEmitter.emit(_callbackTypes.EvCallbackTypes.CLOSE_SOCKET);
    };
    // Used for toggle auth host about Engage Voice backend.
    if (window.localStorage) {
      var authHost = window.localStorage.getItem('__authHost__');
      if (authHost) {
        _this._options.authHost = authHost;
      }
    }
    return _this;
  }
  _createClass(EvClient, [{
    key: "addListener",
    value: function addListener(type, listener) {
      this._eventEmitter.addListener(type, listener);
    }
  }, {
    key: "addListenerOnce",
    value: function addListenerOnce(type, listener) {
      this._eventEmitter.once(type, listener);
    }
  }, {
    key: "removeListener",
    value: function removeListener(type, listener) {
      this._eventEmitter.removeListener(type, listener);
    }
  }, {
    key: "loadCurrentCall",
    value: function loadCurrentCall() {
      var _this2 = this;
      return new Promise(function (resolve) {
        _this2._sdk.loadCurrentCall(resolve);
      });
    }
  }, {
    key: "setAppStatus",
    value: function setAppStatus(status) {
      this.appStatus = status;
    }
  }, {
    key: "setEnv",
    value: function setEnv(authHost) {
      if (window.localStorage) {
        window.localStorage.setItem('__authHost__', authHost);
        window.location.reload();
      }
    }
  }, {
    key: "setSIPNoLog",
    value: function setSIPNoLog(authHost) {
      if (window.localStorage) {
        window.localStorage.setItem('__SIP_NO_LOG__', authHost);
        window.location.reload();
      }
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      this.initSDK();
    }
  }, {
    key: "initSDK",
    value: function initSDK() {
      var _this3 = this,
        _objectSpread2;
      console.log('initSDK');
      var Sdk = this._Sdk;
      this._sdk = new Sdk(_objectSpread({
        callbacks: _objectSpread(_objectSpread({}, this._callbacks), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, _callbackTypes.EvCallbackTypes.CLOSE_SOCKET, this._onClose), _defineProperty(_objectSpread2, _callbackTypes.EvCallbackTypes.OPEN_SOCKET, this._onOpen), _defineProperty(_objectSpread2, _callbackTypes.EvCallbackTypes.ACK, function (res) {
          _this3._eventEmitter.emit(_callbackTypes.EvCallbackTypes.ACK, res);
        }), _objectSpread2))
      }, this._options));
    }
  }, {
    key: "on",
    value: function on(eventType, callback) {
      var _callback = _defineProperty({}, eventType, function () {
        return callback.apply(void 0, arguments);
      });
      this._sdk.setCallbacks(_callback);
      this._callbacks = _objectSpread(_objectSpread({}, this._callbacks), _callback);
    }
  }, {
    key: "getEventCallback",
    value: function getEventCallback(eventType) {
      return this._sdk.getCallback(eventType);
    }
  }, {
    key: "getRefreshedToken",
    value: function getRefreshedToken() {
      this._sdk.getRefreshedToken();
    }
  }, {
    key: "authenticateAgentWithEngageAccessToken",
    value: function authenticateAgentWithEngageAccessToken(engageAccessToken) {
      var _this4 = this;
      return new Promise(function (resolve) {
        _this4.setAppStatus(_enums2.evStatus.LOGIN);
        _this4._sdk.authenticateAgentWithEngageAccessToken(engageAccessToken, function (response) {
          resolve(response);
        });
      });
    }
  }, {
    key: "configureAgent",
    value: function configureAgent(_ref) {
      var _this5 = this;
      var dialDest = _ref.dialDest,
        queueIds = _ref.queueIds,
        chatIds = _ref.chatIds,
        skillProfileId = _ref.skillProfileId,
        dialGroupId = _ref.dialGroupId,
        _ref$updateFromAdminU = _ref.updateFromAdminUI,
        updateFromAdminUI = _ref$updateFromAdminU === void 0 ? false : _ref$updateFromAdminU,
        _ref$isForce = _ref.isForce,
        isForce = _ref$isForce === void 0 ? false : _ref$isForce;
      return new Promise(function (resolve) {
        _this5._sdk.loginAgent(dialDest, queueIds, chatIds, skillProfileId, dialGroupId, updateFromAdminUI, isForce, function (res) {
          resolve({
            type: _enums.messageTypes.CONFIGURE_AGENT,
            data: res
          });
        });
      });
    }
  }, {
    key: "dispositionManualPass",
    value: function dispositionManualPass(_ref2) {
      var _this6 = this;
      var dispId = _ref2.dispId,
        notes = _ref2.notes,
        callbackDTS = _ref2.callbackDTS,
        leadId = _ref2.leadId,
        requestId = _ref2.requestId,
        externId = _ref2.externId;
      return new Promise(function (resolve) {
        _this6._sdk.dispositionManualPass(dispId, notes, function (response) {
          resolve(response);
        }, callbackDTS, leadId, requestId, externId);
      });
    }
  }, {
    key: "dispositionCall",
    value: function dispositionCall(_ref3) {
      var uii = _ref3.uii,
        _ref3$dispId = _ref3.dispId,
        dispId = _ref3$dispId === void 0 ? '' : _ref3$dispId,
        _ref3$notes = _ref3.notes,
        notes = _ref3$notes === void 0 ? '' : _ref3$notes,
        callback = _ref3.callback,
        callbackDTS = _ref3.callbackDTS,
        contactForwardNumber = _ref3.contactForwardNumber,
        survey = _ref3.survey,
        externId = _ref3.externId,
        leadId = _ref3.leadId,
        _ref3$requestId = _ref3.requestId,
        requestId = _ref3$requestId === void 0 ? '' : _ref3$requestId;
      return this._sdk.dispositionCall(this.decodeUii(uii), dispId, notes, callback, callbackDTS, contactForwardNumber, survey, externId, leadId, requestId);
    }
  }, {
    key: "authenticateAgent",
    value: function authenticateAgent(rcAccessToken, tokenType) {
      var _this7 = this;
      return new Promise(function (resolve) {
        _this7.setAppStatus(_enums2.evStatus.LOGIN);
        _this7._sdk.authenticateAgentWithRcAccessToken(rcAccessToken, tokenType, /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
            var _agents, agents;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this7.authenticateAgentWithEngageAccessToken(res.accessToken);
                  case 2:
                    _this7.setAppStatus(_enums2.evStatus.LOGINED);
                    _agents = (res || {}).agents || [];
                    agents = _agents.map(function (agent) {
                      return _objectSpread(_objectSpread({}, agent), {}, {
                        agentId: agent && agent.agentId ? "".concat(agent.agentId) : '',
                        agentType: _enums.AGENT_TYPES[agent.agentType]
                      });
                    });
                    resolve(_objectSpread(_objectSpread({}, res), {}, {
                      agents: agents
                    }));
                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref4.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: "openSocket",
    value: function openSocket(agentId) {
      var _this8 = this;
      var hasSupportWebSocket = 'WebSocket' in window;
      if (!hasSupportWebSocket) {
        throw new _EvTypeError.EvTypeError({
          type: _enums.messageTypes.INVALID_BROWSER
        });
      }
      return new Promise(function (resolve) {
        _this8.addListenerOnce(_callbackTypes.EvCallbackTypes.OPEN_SOCKET, function (res) {
          resolve(res);
        });
        _this8._sdk.openSocket(agentId);
      });
    }
  }, {
    key: "getAgentConfig",
    value: function getAgentConfig() {
      var _this9 = this;
      return new Promise(function (resolve) {
        _this9._sdk.getAgentConfig(function (res) {
          resolve(res);
        });
      });
    }
  }, {
    key: "getAndHandleAuthenticateResponse",
    value: function () {
      var _getAndHandleAuthenticateResponse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(rcAccessToken, tokenType) {
        var _this10 = this;
        var authenticateResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _utils.waitUntilTo)(function () {
                  return _this10.authenticateAgent(rcAccessToken, tokenType);
                }, {
                  interval: 0,
                  timeout: 120 * 1000
                })["catch"](function () {
                  throw new _EvTypeError.EvTypeError({
                    type: _enums.messageTypes.CONNECT_TIMEOUT
                  });
                });
              case 2:
                authenticateResponse = _context2.sent;
                if (!(authenticateResponse.type === 'Authenticate Error' || authenticateResponse.message)) {
                  _context2.next = 5;
                  break;
                }
                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.CONNECT_ERROR,
                  data: authenticateResponse.message
                });
              case 5:
                if (!(!authenticateResponse || !authenticateResponse.agents || !authenticateResponse.agents.length)) {
                  _context2.next = 7;
                  break;
                }
                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.NO_AGENT
                });
              case 7:
                if (!(!authenticateResponse.agents[0] || !authenticateResponse.agents[0].agentId)) {
                  _context2.next = 9;
                  break;
                }
                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.UNEXPECTED_AGENT
                });
              case 9:
                return _context2.abrupt("return", authenticateResponse);
              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function getAndHandleAuthenticateResponse(_x2, _x3) {
        return _getAndHandleAuthenticateResponse.apply(this, arguments);
      }
      return getAndHandleAuthenticateResponse;
    }()
    /**
     * when manual close socket, that closeSocket will auto reconnected by agent SDK
     */
  }, {
    key: "closeSocket",
    value: function closeSocket() {
      this._sdk.closeSocket();
    }
  }, {
    key: "hangup",
    value: function hangup(_ref5) {
      var sessionId = _ref5.sessionId,
        _ref5$resetPendingDis = _ref5.resetPendingDisp,
        resetPendingDisp = _ref5$resetPendingDis === void 0 ? false : _ref5$resetPendingDis;
      return this._sdk.hangup(sessionId, resetPendingDisp);
    }
  }, {
    key: "logoutAgent",
    value: function logoutAgent(agentId) {
      var _this11 = this;
      return new Promise(function (resolve) {
        _this11._sdk.logoutAgent(agentId, function (result) {
          resolve(result);
        });
      });
    }
  }, {
    key: "manualOutdial",
    value: function manualOutdial(_ref6) {
      var destination = _ref6.destination,
        callerId = _ref6.callerId,
        ringTime = _ref6.ringTime,
        countryId = _ref6.countryId,
        queueId = _ref6.queueId;
      return this._sdk.manualOutdial(destination, callerId, ringTime, countryId, queueId);
    }
  }, {
    key: "manualOutdialCancel",
    value: function manualOutdialCancel(uii) {
      this._sdk.manualOutdialCancel(uii);
    }
  }, {
    key: "offhookInit",
    value: function offhookInit() {
      // we using EvCallbackTypes.OFFHOOK_INIT to catch data, do not pass callback,
      // that will make the message not come back
      this._sdk.offhookInit();
    }
  }, {
    key: "offhookTerm",
    value: function offhookTerm() {
      this._sdk.offhookTerm();
    }
  }, {
    key: "hold",
    value: function hold(holdState) {
      this._sdk.hold(holdState);
    }
  }, {
    key: "pauseRecord",
    value: function pauseRecord(isRecord) {
      var _this12 = this;
      return new Promise(function (resolve, reject) {
        return _this12._sdk.pauseRecord(isRecord, function (response) {
          var formattedResponse = _objectSpread(_objectSpread({}, response), {}, {
            pause: response.pause ? Number(response.pause) : null
          });
          if (response.status === 'OK') {
            resolve(formattedResponse);
          } else {
            reject(formattedResponse);
          }
        });
      });
    } // toggle call recording on/off base on true|false boolean
  }, {
    key: "record",
    value: function record(state) {
      var _this13 = this;
      return new Promise(function (resolve, reject) {
        return _this13._sdk.record(state, function (response) {
          if (response.status === 'OK') {
            resolve(response);
          } else {
            reject(response);
          }
        });
      });
    }
  }, {
    key: "holdSession",
    value: function holdSession(_ref7) {
      var state = _ref7.state,
        sessionId = _ref7.sessionId;
      this._sdk.holdSession(state, sessionId);
    }
  }, {
    key: "coldTransferCall",
    value: function coldTransferCall(_ref8) {
      var _this14 = this;
      var dialDest = _ref8.dialDest,
        _ref8$callerId = _ref8.callerId,
        callerId = _ref8$callerId === void 0 ? '' : _ref8$callerId,
        _ref8$sipHeaders = _ref8.sipHeaders,
        sipHeaders = _ref8$sipHeaders === void 0 ? [] : _ref8$sipHeaders;
      return new Promise(function (resolve, reject) {
        _this14._sdk.coldXfer(dialDest, callerId, sipHeaders, function (data) {
          if (data.status === 'OK') {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    }
  }, {
    key: "warmTransferCall",
    value: function warmTransferCall(_ref9) {
      var _this15 = this;
      var dialDest = _ref9.dialDest,
        _ref9$callerId = _ref9.callerId,
        callerId = _ref9$callerId === void 0 ? '' : _ref9$callerId,
        _ref9$sipHeaders = _ref9.sipHeaders,
        sipHeaders = _ref9$sipHeaders === void 0 ? [] : _ref9$sipHeaders;
      return new Promise(function (resolve, reject) {
        _this15._sdk.warmXfer(dialDest, callerId, sipHeaders, function (data) {
          if (data.status === 'OK') {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    }
  }, {
    key: "coldTransferIntlCall",
    value: function coldTransferIntlCall(_ref10) {
      var _this16 = this;
      var dialDest = _ref10.dialDest,
        _ref10$callerId = _ref10.callerId,
        callerId = _ref10$callerId === void 0 ? '' : _ref10$callerId,
        _ref10$sipHeaders = _ref10.sipHeaders,
        sipHeaders = _ref10$sipHeaders === void 0 ? [] : _ref10$sipHeaders,
        _ref10$countryId = _ref10.countryId,
        countryId = _ref10$countryId === void 0 ? '' : _ref10$countryId;
      return new Promise(function (resolve, reject) {
        _this16._sdk.internationalColdXfer(dialDest, callerId, sipHeaders, countryId, function (data) {
          if (data.status === 'OK') {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    }
  }, {
    key: "warmTransferIntlCall",
    value: function warmTransferIntlCall(_ref11) {
      var _this17 = this;
      var dialDest = _ref11.dialDest,
        _ref11$callerId = _ref11.callerId,
        callerId = _ref11$callerId === void 0 ? '' : _ref11$callerId,
        _ref11$sipHeaders = _ref11.sipHeaders,
        sipHeaders = _ref11$sipHeaders === void 0 ? [] : _ref11$sipHeaders,
        _ref11$countryId = _ref11.countryId,
        countryId = _ref11$countryId === void 0 ? '' : _ref11$countryId;
      return new Promise(function (resolve, reject) {
        _this17._sdk.internationalWarmXfer(dialDest, callerId, sipHeaders, countryId, function (data) {
          if (data.status === 'OK') {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    }
  }, {
    key: "cancelWarmTransferCall",
    value: function cancelWarmTransferCall(dialDest) {
      this._sdk.warmXferCancel(dialDest);
    }
  }, {
    key: "requeueCall",
    value: function requeueCall(_ref12) {
      var _this18 = this;
      var queueId = _ref12.queueId,
        _ref12$skillId = _ref12.skillId,
        skillId = _ref12$skillId === void 0 ? '' : _ref12$skillId,
        _ref12$maintain = _ref12.maintain,
        maintain = _ref12$maintain === void 0 ? false : _ref12$maintain;
      return new Promise(function (resolve, reject) {
        _this18._sdk.requeueCall(queueId, skillId, maintain, function (data) {
          if (data.status === 'OK') {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    }
  }, {
    key: "fetchDirectAgentList",
    value: function fetchDirectAgentList() {
      var _this19 = this;
      return new Promise(function (resolve) {
        _this19._sdk.directAgentXferList(function (data) {
          resolve(data);
        });
      });
    }
  }, {
    key: "encodeUii",
    value: function encodeUii(_ref13) {
      var uii = _ref13.uii,
        sessionId = _ref13.sessionId;
      return "".concat(uii).concat(_constant._encodeSymbol).concat(sessionId);
    }
    /**
     * replace sessionId with _encodeSymbol when ringing
     * @param _encodeSymbol '$'
     */
  }, {
    key: "encodeRingingUii",
    value: function encodeRingingUii(_ref14) {
      var uii = _ref14.uii;
      return this.encodeUii({
        uii: this.decodeUii(uii),
        sessionId: _constant._encodeSymbol
      });
    }
  }, {
    key: "decodeUii",
    value: function decodeUii(uii) {
      return uii.split(_constant._encodeSymbol)[0];
    }
    /**
     * get a main call session in some call session with some uii
     * @param uii call uii
     */
  }, {
    key: "getMainId",
    value: function getMainId(uii) {
      return this.encodeUii({
        sessionId: '1',
        uii: uii
      });
    }
  }, {
    key: "rejectDirectAgentTransferCall",
    value: function rejectDirectAgentTransferCall(uii) {
      this._sdk.rejectDirectAgentXfer(this.decodeUii(uii));
    }
  }, {
    key: "coldDirectAgentTransfer",
    value: function coldDirectAgentTransfer(targetAgentId) {
      this._sdk.coldDirectAgentXfer(targetAgentId);
    }
  }, {
    key: "warmDirectAgentTransfer",
    value: function warmDirectAgentTransfer(targetAgentId) {
      this._sdk.warmDirectAgentXfer(targetAgentId);
    }
  }, {
    key: "sendVoicemailDirectAgentTransfer",
    value: function sendVoicemailDirectAgentTransfer(targetAgentId) {
      this._sdk.voicemailDirectAgentXfer(targetAgentId);
    }
  }, {
    key: "cancelDirectAgentTransfer",
    value: function cancelDirectAgentTransfer(targetAgentId) {
      this._sdk.cancelDirectAgentXfer(targetAgentId);
    }
  }, {
    key: "setAgentState",
    value: function setAgentState(agentState, agentAuxState) {
      return this._sdk.setAgentState(agentState, agentAuxState);
    }
  }, {
    key: "_multiLoginRequest",
    value: function _multiLoginRequest() {
      var _this20 = this;
      return new Promise(function (resolve, reject) {
        _this20._sdk.multiLoginRequest();
        _this20.on(_callbackTypes.EvCallbackTypes.LOGIN, function (data) {
          if (data.status === 'SUCCESS') {
            resolve(data);
          } else {
            reject(data);
          }
        });
        _this20.on(_callbackTypes.EvCallbackTypes.GENERIC_NOTIFICATION, function (data) {
          if (data.messageCode === '-99') {
            reject(data);
          }
        });
      });
    }
  }, {
    key: "multiLoginRequest",
    value: function () {
      var _multiLoginRequest2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this21 = this;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _utils.waitUntilTo)(function () {
                  return _this21._multiLoginRequest();
                }, {
                  timeout: 30000
                });
              case 3:
                _context3.next = 8;
                break;
              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3["catch"](0);
                throw new Error('_multiLoginRequest fail or 30s timeout');
              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 5]]);
      }));
      function multiLoginRequest() {
        return _multiLoginRequest2.apply(this, arguments);
      }
      return multiLoginRequest;
    }()
    /**
     * WebRTC related method
     */
  }, {
    key: "sipInit",
    value: function sipInit() {
      this._sdk.sipInit();
    }
  }, {
    key: "sipAnswer",
    value: function sipAnswer() {
      this._sdk.sipAnswer();
    }
  }, {
    key: "sipRegister",
    value: function sipRegister() {
      this._sdk.sipRegister();
    }
  }, {
    key: "sipTerminate",
    value: function sipTerminate() {
      this._sdk.sipTerminate();
    }
  }, {
    key: "sipHangUp",
    value: function sipHangUp() {
      this._sdk.sipHangUp();
    }
  }, {
    key: "sipReject",
    value: function sipReject() {
      this._sdk.sipReject();
    }
  }, {
    key: "sipSendDTMF",
    value: function sipSendDTMF(dtmf) {
      this._sdk.sipSendDTMF(dtmf);
    }
  }, {
    key: "sipToggleMute",
    value: function sipToggleMute(state) {
      this._sdk.sipToggleMute(state);
    }
    /**
     * AgentScript related method
     */
  }, {
    key: "getScript",
    value: function getScript(scriptId, version) {
      var _this22 = this;
      return new Promise(function (resolve, reject) {
        _this22._sdk.getScript(scriptId, version, function (res) {
          if (res.status) {
            resolve(res);
          }
        });
      });
    }
  }, {
    key: "saveScriptResult",
    value: function () {
      var _saveScriptResult = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(uii, scriptId, jsonResult) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._sdk.saveScriptResult(uii, scriptId, jsonResult);
                return _context4.abrupt("return", jsonResult);
              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function saveScriptResult(_x4, _x5, _x6) {
        return _saveScriptResult.apply(this, arguments);
      }
      return saveScriptResult;
    }()
    /**
     * GET - /voice/api/v1/agent/:accountId/knowledgeBaseGroups
        params:
        accountId: AgentSvc.agentSettings.accountId,
        guid: AgentSvc.agentSettings.guid,
        knowledgeBaseGroupIds: knowledgeBaseGroupIds
         knowledgeBaseGroupIds = comma list of all groups you care about
     */
  }, {
    key: "getKnowledgeBaseGroups",
    value: function () {
      var _getKnowledgeBaseGroups = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(knowledgeBaseGroupIds) {
        var uiModel, HttpService, agentSettings, engageAccessToken, _yield$HttpService$ht, status, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.getRefreshedToken();
                uiModel = this._sdk._getUIModel().getInstance();
                HttpService = this._sdk._HttpService;
                agentSettings = this._sdk.getAgentSettings();
                engageAccessToken = "Bearer ".concat(uiModel.authenticateRequest.engageAccessToken);
                _context5.prev = 5;
                _context5.next = 8;
                return new HttpService("".concat(uiModel.authHost, "/voice/api/v1/")).httpGet("agent/".concat(agentSettings.accountId, "/knowledgeBaseGroups"), {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: engageAccessToken
                  },
                  queryParams: {
                    guid: agentSettings.guid,
                    knowledgeBaseGroupIds: knowledgeBaseGroupIds
                  }
                });
              case 8:
                _yield$HttpService$ht = _context5.sent;
                status = _yield$HttpService$ht.status;
                response = _yield$HttpService$ht.response;
                if (!(status === 200)) {
                  _context5.next = 13;
                  break;
                }
                return _context5.abrupt("return", JSON.parse(response));
              case 13:
                _context5.next = 18;
                break;
              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](5);
                console.log('getKnowledgeBaseGroups fail');
              case 18:
                return _context5.abrupt("return", null);
              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[5, 15]]);
      }));
      function getKnowledgeBaseGroups(_x7) {
        return _getKnowledgeBaseGroups.apply(this, arguments);
      }
      return getKnowledgeBaseGroups;
    }()
  }, {
    key: "currentCall",
    get: function get() {
      return this._sdk.getCurrentCall();
    }
  }, {
    key: "ifSocketExist",
    get: function get() {
      return !!this._sdk.socket;
    }
  }]);
  return EvClient;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "appStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enums2.evStatus.START;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setAppStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAppStatus"), _class2.prototype)), _class2)) || _class);
exports.EvClient = EvClient;
//# sourceMappingURL=EvClient.js.map
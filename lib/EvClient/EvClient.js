"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvClient = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _core = require("@ringcentral-integration/core");

var _SDK = _interopRequireDefault(require("@SDK"));

var _events = require("events");

var _di = require("ringcentral-integration/lib/di");

var _raceTimeout = require("ringcentral-integration/lib/raceTimeout");

var _enums = require("../../enums");

var _constant = require("../constant");

var _EvTypeError = require("../EvTypeError");

var _enums2 = require("./enums");

var _callbackTypes = require("./enums/callbackTypes");

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvClient = (_dec = (0, _di.Module)({
  name: 'EvClient',
  deps: ['EvClientOptions']
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvClient, _RcModuleV);

  var _super = _createSuper(EvClient);

  /** SDK instance */
  function EvClient(deps) {
    var _this;

    _classCallCheck(this, EvClient);

    _this = _super.call(this, {
      deps: deps
    });
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

      _this._eventEmitter.emit(_callbackTypes.EvCallbackTypes.OPEN_SOCKET, res); // ensure for WebSocket keep-alive connection


      _this._sdk.terminateStats();
    };

    _this._onClose = function () {
      console.log('EvCallbackTypes.CLOSE_SOCKET~');

      _this.setAppStatus(_enums2.evStatus.CLOSED);

      closeResponse();

      _this._eventEmitter.emit(_callbackTypes.EvCallbackTypes.CLOSE_SOCKET);
    }; // Used for toggle auth host about Engage Voice backend.


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
    key: "addListenerByOnce",
    value: function addListenerByOnce(type, listener) {
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

      var hasSupportWebSocket = ('WebSocket' in window);

      if (!hasSupportWebSocket) {
        throw new _EvTypeError.EvTypeError({
          type: _enums.messageTypes.INVALID_BROWSER
        });
      }

      return new Promise(function (resolve) {
        _this8.addListenerByOnce(_callbackTypes.EvCallbackTypes.OPEN_SOCKET, function (res) {
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
        var authenticateResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _raceTimeout.raceTimeout)(this.authenticateAgent(rcAccessToken, tokenType), {
                  timeout: 120 * 1000,
                  onTimeout: function onTimeout(resolve) {
                    return resolve(null);
                  }
                });

              case 2:
                authenticateResponse = _context2.sent;

                if (authenticateResponse) {
                  _context2.next = 5;
                  break;
                }

                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.CONNECT_TIMEOUT
                });

              case 5:
                if (!(authenticateResponse.type === 'Authenticate Error' || authenticateResponse.message)) {
                  _context2.next = 7;
                  break;
                }

                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.CONNECT_ERROR,
                  data: authenticateResponse.message
                });

              case 7:
                if (!(!authenticateResponse || !authenticateResponse.agents || !authenticateResponse.agents.length)) {
                  _context2.next = 9;
                  break;
                }

                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.NO_AGENT
                });

              case 9:
                if (!(!authenticateResponse.agents[0] || !authenticateResponse.agents[0].agentId)) {
                  _context2.next = 11;
                  break;
                }

                throw new _EvTypeError.EvTypeError({
                  type: _enums.messageTypes.UNEXPECTED_AGENT
                });

              case 11:
                return _context2.abrupt("return", authenticateResponse);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
      var _this10 = this;

      return new Promise(function (resolve) {
        _this10._sdk.logoutAgent(agentId, function (result) {
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
    key: "holdSession",
    value: function holdSession(_ref7) {
      var state = _ref7.state,
          sessionId = _ref7.sessionId;

      this._sdk.holdSession(state, sessionId);
    }
  }, {
    key: "coldTransferCall",
    value: function coldTransferCall(_ref8) {
      var _this11 = this;

      var dialDest = _ref8.dialDest,
          _ref8$callerId = _ref8.callerId,
          callerId = _ref8$callerId === void 0 ? '' : _ref8$callerId,
          _ref8$sipHeaders = _ref8.sipHeaders,
          sipHeaders = _ref8$sipHeaders === void 0 ? [] : _ref8$sipHeaders;
      return new Promise(function (resolve, reject) {
        _this11._sdk.coldXfer(dialDest, callerId, sipHeaders, function (data) {
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
      var _this12 = this;

      var dialDest = _ref9.dialDest,
          _ref9$callerId = _ref9.callerId,
          callerId = _ref9$callerId === void 0 ? '' : _ref9$callerId,
          _ref9$sipHeaders = _ref9.sipHeaders,
          sipHeaders = _ref9$sipHeaders === void 0 ? [] : _ref9$sipHeaders;
      return new Promise(function (resolve, reject) {
        _this12._sdk.warmXfer(dialDest, callerId, sipHeaders, function (data) {
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
      var _this13 = this;

      var dialDest = _ref10.dialDest,
          _ref10$callerId = _ref10.callerId,
          callerId = _ref10$callerId === void 0 ? '' : _ref10$callerId,
          _ref10$sipHeaders = _ref10.sipHeaders,
          sipHeaders = _ref10$sipHeaders === void 0 ? [] : _ref10$sipHeaders,
          _ref10$countryId = _ref10.countryId,
          countryId = _ref10$countryId === void 0 ? '' : _ref10$countryId;
      return new Promise(function (resolve, reject) {
        _this13._sdk.internationalColdXfer(dialDest, callerId, sipHeaders, countryId, function (data) {
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
      var _this14 = this;

      var dialDest = _ref11.dialDest,
          _ref11$callerId = _ref11.callerId,
          callerId = _ref11$callerId === void 0 ? '' : _ref11$callerId,
          _ref11$sipHeaders = _ref11.sipHeaders,
          sipHeaders = _ref11$sipHeaders === void 0 ? [] : _ref11$sipHeaders,
          _ref11$countryId = _ref11.countryId,
          countryId = _ref11$countryId === void 0 ? '' : _ref11$countryId;
      return new Promise(function (resolve, reject) {
        _this14._sdk.internationalWarmXfer(dialDest, callerId, sipHeaders, countryId, function (data) {
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
      var _this15 = this;

      var queueId = _ref12.queueId,
          _ref12$skillId = _ref12.skillId,
          skillId = _ref12$skillId === void 0 ? '' : _ref12$skillId,
          _ref12$maintain = _ref12.maintain,
          maintain = _ref12$maintain === void 0 ? false : _ref12$maintain;
      return new Promise(function (resolve, reject) {
        _this15._sdk.requeueCall(queueId, skillId, maintain, function (data) {
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
      var _this16 = this;

      return new Promise(function (resolve) {
        _this16._sdk.directAgentXferList(function (data) {
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
      var _this17 = this;

      return new Promise(function (resolve, reject) {
        _this17._sdk.multiLoginRequest();

        _this17.on(_callbackTypes.EvCallbackTypes.LOGIN, function (data) {
          if (data.status === 'SUCCESS') {
            resolve(data);
          } else {
            reject(data);
          }
        });

        _this17.on(_callbackTypes.EvCallbackTypes.GENERIC_NOTIFICATION, function (data) {
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
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _raceTimeout.raceTimeout)(this._multiLoginRequest(), {
                  onTimeout: function onTimeout(res, rej) {
                    return rej();
                  }
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
        }, _callee3, this, [[0, 5]]);
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
      var _this18 = this;

      return new Promise(function (resolve, reject) {
        _this18._sdk.getScript(scriptId, version, function (res) {
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
        var uiModel, HttpService, agentSettings, engageAccessToken, _yield$HttpService$ht, status, _response;

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
                _response = _yield$HttpService$ht.response;

                if (!(status === 200)) {
                  _context5.next = 13;
                  break;
                }

                return _context5.abrupt("return", JSON.parse(_response));

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
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "appStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enums2.evStatus.START;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setAppStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAppStatus"), _class2.prototype)), _class2)) || _class);
exports.EvClient = EvClient;
//# sourceMappingURL=EvClient.js.map

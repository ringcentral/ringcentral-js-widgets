"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Webphone = exports.INCOMING_CALL_INVALID_STATE_ERROR_CODE = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _extendedControlStatus = require("../../enums/extendedControlStatus");

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _validateNumbers = _interopRequireDefault(require("../../lib/validateNumbers"));

var _Analytics = require("../Analytics");

var _callErrors = require("../CallV2/callErrors");

var _events = require("./events");

var _recordStatus = require("./recordStatus");

var _sessionStatus = require("./sessionStatus");

var _WebphoneBase2 = require("./WebphoneBase");

var _webphoneErrors = require("./webphoneErrors");

var _webphoneHelper = require("./webphoneHelper");

var _webphoneMessages = require("./webphoneMessages");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var INCOMING_CALL_INVALID_STATE_ERROR_CODE = 2;
/**
 * @constructor
 * @description Web phone module to handle phone interaction with WebRTC.
 */

exports.INCOMING_CALL_INVALID_STATE_ERROR_CODE = INCOMING_CALL_INVALID_STATE_ERROR_CODE;
var Webphone = (_dec = (0, _di.Module)({
  name: 'Webphone',
  deps: []
}), _dec2 = (0, _core.track)(_Analytics.trackEvents.inboundWebRTCCallConnected), _dec3 = (0, _core.track)(function (that) {
  return that.isOnTransfer ? [_Analytics.trackEvents.coldTransferCall] : null;
}), _dec4 = (0, _core.computed)(function (_ref) {
  var sessions = _ref.sessions;
  return [sessions];
}), _dec5 = (0, _core.computed)(function (_ref2) {
  var activeSessionId = _ref2.activeSessionId,
      sessions = _ref2.sessions;
  return [activeSessionId, sessions];
}), _dec6 = (0, _core.computed)(function (_ref3) {
  var ringSessionId = _ref3.ringSessionId,
      sessions = _ref3.sessions;
  return [ringSessionId, sessions];
}), _dec7 = (0, _core.computed)(function (_ref4) {
  var sessions = _ref4.sessions;
  return [sessions];
}), _dec8 = (0, _core.computed)(function (_ref5) {
  var sessions = _ref5.sessions;
  return [sessions];
}), _dec9 = (0, _core.computed)(function (_ref6) {
  var sessions = _ref6.sessions;
  return [sessions];
}), _dec10 = (0, _core.computed)(function (_ref7) {
  var ringSessions = _ref7.ringSessions;
  return [ringSessions];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_WebphoneBase) {
  _inherits(Webphone, _WebphoneBase);

  var _super = _createSuper(Webphone);

  function Webphone(deps) {
    var _this$_deps$webphoneO;

    var _this;

    _classCallCheck(this, Webphone);

    _this = _super.call(this, deps);
    _this._activeWebphoneActiveCallKey = void 0;
    _this._permissionCheck = void 0;

    _initializerDefineProperty(_this, "activeSessionId", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "ringSessionId", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "lastEndedSessions", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sessions", _descriptor4, _assertThisInitialized(_this));

    _this._activeWebphoneActiveCallKey = "".concat(deps.prefix, "-active-webphone-active-call-key");
    _this._permissionCheck = (_this$_deps$webphoneO = _this._deps.webphoneOptions.permissionCheck) !== null && _this$_deps$webphoneO !== void 0 ? _this$_deps$webphoneO : true;

    if (typeof deps.webphoneOptions.onCallEnd === 'function') {
      _this._eventEmitter.on(_events.EVENTS.callEnd, deps.webphoneOptions.onCallEnd);
    }

    if (typeof deps.webphoneOptions.onCallRing === 'function') {
      _this._eventEmitter.on(_events.EVENTS.callRing, deps.webphoneOptions.onCallRing);
    }

    if (typeof deps.webphoneOptions.onCallStart === 'function') {
      _this._eventEmitter.on(_events.EVENTS.callStart, deps.webphoneOptions.onCallStart);
    }

    if (typeof deps.webphoneOptions.onCallResume === 'function') {
      _this._eventEmitter.on(_events.EVENTS.callResume, deps.webphoneOptions.onCallResume);
    }

    if (typeof deps.webphoneOptions.onCallHold === 'function') {
      _this._eventEmitter.on(_events.EVENTS.callHold, deps.webphoneOptions.onCallHold);
    }

    if (typeof deps.webphoneOptions.onCallInit === 'function') {
      _this._eventEmitter.on(_events.EVENTS.callInit, deps.webphoneOptions.onCallInit);
    }

    if (typeof deps.webphoneOptions.onBeforeCallResume === 'function') {
      _this._eventEmitter.on(_events.EVENTS.beforeCallResume, deps.webphoneOptions.onBeforeCallResume);
    }

    if (typeof deps.webphoneOptions.onBeforeCallEnd === 'function') {
      _this._eventEmitter.on(_events.EVENTS.beforeCallEnd, deps.webphoneOptions.onBeforeCallEnd);
    }

    _this._reconnectAfterSessionEnd = null;
    _this._disconnectInactiveAfterSessionEnd = false;

    if (_this._deps.contactMatcher) {
      _this._deps.contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.sessionPhoneNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this.ready;
        }
      });
    }

    return _this;
  }

  _createClass(Webphone, [{
    key: "_updateSessionsState",
    value: function _updateSessionsState(sessions) {
      var cachedSessions = this.sessions.filter(function (x) {
        return x.cached;
      });
      cachedSessions.forEach(function (cachedSession) {
        var session = sessions.find(function (x) {
          return x.id === cachedSession.id;
        });

        if (session) {
          session.cached = true;
        } else {
          cachedSession.removed = true;
          sessions.push(cachedSession);
        }
      });
      this.sessions = sessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
    }
  }, {
    key: "_setActiveSessionId",
    value: function _setActiveSessionId(sessionId) {
      this.activeSessionId = sessionId;
    }
  }, {
    key: "_setStateOnCallRing",
    value: function _setStateOnCallRing(session) {
      this.ringSessionId = session.id;
    }
  }, {
    key: "_setStateOnCallStart",
    value: function _setStateOnCallStart(session) {
      this.activeSessionId = session.id;

      if (this.ringSessionId === session.id) {
        var ringSessions = this.sessions.filter(function (x) {
          return (0, _webphoneHelper.isRing)(x);
        });
        this.ringSessionId = ringSessions[0] && ringSessions[0].id || null;
      }
    }
  }, {
    key: "_setStateOnCallEnd",
    value: function _setStateOnCallEnd(session) {
      if (this.activeSessionId === session.id) {
        var activeSessions = this.sessions.filter(function (x) {
          return !(0, _webphoneHelper.isRing)(x);
        });
        activeSessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
        this.activeSessionId = activeSessions[0] && activeSessions[0].id || null;
      }

      if (this.ringSessionId === session.id) {
        var ringSessions = this.sessions.filter(function (x) {
          return (0, _webphoneHelper.isRing)(x);
        });
        this.ringSessionId = ringSessions[0] && ringSessions[0].id || null;
      }

      if (
      /**
       * don't add incoming call that isn't relied by current app
       *   to end sessions. this call can be answered by other apps
       */
      !session.startTime && !session.isToVoicemail && !session.isForwarded && !session.isReplied) {
        return;
      }

      var lastSessions = [session].concat(this.lastEndedSessions.filter(function (x) {
        return x.id !== session.id;
      }));
      this.lastEndedSessions = lastSessions.slice(0, 5);
    }
  }, {
    key: "_setSessionCaching",
    value: function _setSessionCaching(cachingSessionIds) {
      var _this2 = this;

      cachingSessionIds.forEach(function (sessionId) {
        var session = _this2.sessions.find(function (x) {
          return x.id === sessionId;
        });

        if (session) {
          session.cached = true;
        }
      });
    }
  }, {
    key: "_clearSessionCaching",
    value: function _clearSessionCaching(sessions) {
      var needUpdate = false;
      this.sessions.forEach(function (session) {
        if (session.cached) {
          session.cached = false;
          needUpdate = true;
        }
      });

      if (needUpdate) {
        this.sessions = this.sessions.filter(function (x) {
          return !x.removed;
        });
      }

      var activeSessions = sessions.filter(function (x) {
        return !x.cached && !(0, _webphoneHelper.isRing)(x);
      });
      activeSessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
      this.activeSessionId = activeSessions[0] && activeSessions[0].id || null;
    }
  }, {
    key: "_onHoldCachedSession",
    value: function _onHoldCachedSession() {
      this.sessions.forEach(function (session) {
        if (session.cached) {
          session.callStatus = _sessionStatus.sessionStatus.onHold;
          session.isOnHold = true;
        }
      });
    }
  }, {
    key: "_onStorageChangeEvent",
    value: function _onStorageChangeEvent(e) {
      _get(_getPrototypeOf(Webphone.prototype), "_onStorageChangeEvent", this).call(this, e); // unhold active calls in current tab


      if (e.key === this._activeWebphoneActiveCallKey) {
        this._holdOtherSession(e.newValue);
      }
    }
  }, {
    key: "_onAccepted",
    value: function _onAccepted(session) {
      var _this3 = this;

      session.on('accepted', function (incomingResponse) {
        if (session.__rc_callStatus === _sessionStatus.sessionStatus.finished) {
          return;
        }

        console.log('accepted');
        session.__rc_callStatus = _sessionStatus.sessionStatus.connected;
        (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);

        _this3._onCallStart(session);

        if (session.__rc_extendedControls && session.__rc_extendedControlStatus === _extendedControlStatus.extendedControlStatus.pending) {
          _this3._playExtendedControls(session);
        }
      });
      session.on('progress', function (incomingResponse) {
        console.log('progress...');
        session.__rc_callStatus = _sessionStatus.sessionStatus.connecting;
        (0, _webphoneHelper.extractHeadersData)(session, incomingResponse.headers);

        _this3._updateSessions();
      });
      session.on('rejected', function () {
        console.log('rejected');
        session.__rc_callStatus = _sessionStatus.sessionStatus.finished;

        _this3._onCallEnd(session);
      });
      session.on('failed', function (response, cause) {
        console.log('Event: Failed');
        console.log(cause);
        session.__rc_callStatus = _sessionStatus.sessionStatus.finished;

        _this3._onCallEnd(session);
      });
      session.on('terminated', function () {
        console.log('Event: Terminated');
        session.__rc_callStatus = _sessionStatus.sessionStatus.finished;

        _this3._onCallEnd(session);
      });
      session.on('cancel', function () {
        console.log('Event: Cancel');
        session.__rc_callStatus = _sessionStatus.sessionStatus.finished;

        _this3._onCallEnd(session);
      });
      session.on('replaced', function (newSession) {
        console.log('Event: replaced', newSession);
        session.__rc_callStatus = _sessionStatus.sessionStatus.replaced;
        newSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
        newSession.__rc_direction = _callDirections["default"].inbound;

        _this3._updateSessions();

        _this3._onAccepted(newSession);
      });
      session.on('muted', function () {
        console.log('Event: Muted');
        session.__rc_isOnMute = true;
        session.__rc_callStatus = _sessionStatus.sessionStatus.onMute;

        _this3._updateSessions();
      });
      session.on('unmuted', function () {
        console.log('Event: Unmuted');
        session.__rc_isOnMute = false;
        session.__rc_callStatus = _sessionStatus.sessionStatus.connected;

        _this3._updateSessions();
      });
      session.on('SessionDescriptionHandler-created', function () {
        session.sessionDescriptionHandler.on('userMediaFailed', function () {
          _this3._deps.audioSettings.onGetUserMediaError(null);
        });
      });
    }
  }, {
    key: "_onInvite",
    value: function _onInvite(session) {
      var _this4 = this;

      _get(_getPrototypeOf(Webphone.prototype), "_onInvite", this).call(this, session);

      session.__rc_creationTime = Date.now();
      session.__rc_lastActiveTime = Date.now();
      session.__rc_direction = _callDirections["default"].inbound;
      session.__rc_callStatus = _sessionStatus.sessionStatus.connecting;
      (0, _webphoneHelper.extractHeadersData)(session, session.request.headers);
      session.on('rejected', function () {
        console.log('Event: Rejected');

        _this4._onCallEnd(session);
      });
      session.on('terminated', function () {
        console.log('Event: Terminated');

        _this4._onCallEnd(session);
      });

      this._onCallRing(session);
    }
  }, {
    key: "_playExtendedControls",
    value: function () {
      var _playExtendedControls2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(session) {
        var controls, i, len;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.playing;
                controls = session.__rc_extendedControls.slice();
                i = 0, len = controls.length;

              case 3:
                if (!(i < len)) {
                  _context.next = 18;
                  break;
                }

                if (!(session.__rc_extendedControlStatus === _extendedControlStatus.extendedControlStatus.playing)) {
                  _context.next = 14;
                  break;
                }

                if (!(controls[i] === ',')) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return (0, _sleep["default"])(2000);

              case 8:
                _context.next = 12;
                break;

              case 10:
                _context.next = 12;
                return this._sendDTMF(controls[i], session);

              case 12:
                _context.next = 15;
                break;

              case 14:
                return _context.abrupt("return");

              case 15:
                i += 1;
                _context.next = 3;
                break;

              case 18:
                session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.stopped;

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _playExtendedControls(_x) {
        return _playExtendedControls2.apply(this, arguments);
      }

      return _playExtendedControls;
    }()
  }, {
    key: "_trackCallAnswer",
    value: function _trackCallAnswer() {//
    }
  }, {
    key: "answer",
    value: function () {
      var _answer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sessionId) {
        var sipSession, session;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sipSession = this.originalSessions[sessionId];
                session = this.sessions.find(function (session) {
                  return session.id === sessionId;
                });

                if (!(!session || !(0, _webphoneHelper.isRing)(session))) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return");

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return this._holdOtherSession(sessionId);

              case 7:
                this._onAccepted(sipSession);

                _context2.next = 10;
                return sipSession.accept(this.acceptOptions);

              case 10:
                this._trackCallAnswer();

                _context2.next = 18;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](4);
                console.log('Accept failed');
                console.error(_context2.t0);

                if (_context2.t0.code !== INCOMING_CALL_INVALID_STATE_ERROR_CODE) {
                  // FIXME:
                  // 2 means the call is answered
                  this._onCallEnd(sipSession);
                }

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 13]]);
      }));

      function answer(_x2) {
        return _answer.apply(this, arguments);
      }

      return answer;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (!(!session || session.__rc_callStatus === _sessionStatus.sessionStatus.finished)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return");

              case 3:
                _context3.prev = 3;
                _context3.next = 6;
                return session.reject();

              case 6:
                _context3.next = 12;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](3);
                console.error(_context3.t0);

                this._onCallEnd(session);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 8]]);
      }));

      function reject(_x3) {
        return _reject.apply(this, arguments);
      }

      return reject;
    }()
  }, {
    key: "resume",
    value: function () {
      var _resume = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(sessionId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.unhold(sessionId);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function resume(_x4) {
        return _resume.apply(this, arguments);
      }

      return resume;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(sessionId, forwardNumber) {
        var _this5 = this;

        var session, validatedResult, validPhoneNumber;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", false);

              case 3:
                _context5.prev = 3;

                if (this._permissionCheck) {
                  _context5.next = 9;
                  break;
                }

                validatedResult = (0, _validateNumbers["default"])([forwardNumber], this._deps.regionSettings, this._deps.brand.id);
                validPhoneNumber = validatedResult[0];
                _context5.next = 16;
                break;

              case 9:
                _context5.next = 11;
                return this._deps.numberValidate.validateNumbers([forwardNumber]);

              case 11:
                validatedResult = _context5.sent;

                if (validatedResult.result) {
                  _context5.next = 15;
                  break;
                }

                validatedResult.errors.forEach(function (error) {
                  _this5._deps.alert.warning({
                    message: _callErrors.callErrors[error.type],
                    payload: {
                      phoneNumber: error.phoneNumber
                    }
                  });
                });
                return _context5.abrupt("return", false);

              case 15:
                validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;

              case 16:
                session.__rc_isForwarded = true;
                _context5.next = 19;
                return session.forward(validPhoneNumber, this.acceptOptions, {});

              case 19:
                console.log('Forwarded');

                this._onCallEnd(session);

                this._addTrackAfterForward();

                return _context5.abrupt("return", true);

              case 25:
                _context5.prev = 25;
                _context5.t0 = _context5["catch"](3);
                console.error(_context5.t0);

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.forwardError
                });

                this._addTrackAfterForward();

                return _context5.abrupt("return", false);

              case 31:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 25]]);
      }));

      function forward(_x5, _x6) {
        return _forward.apply(this, arguments);
      }

      return forward;
    }()
  }, {
    key: "_addTrackAfterForward",
    value: function _addTrackAfterForward() {
      if (this.activeSession && !this.activeSession.isOnHold) {
        var rawActiveSession = this.originalSessions[this.activeSession.id];

        this._addTrack(rawActiveSession);
      }
    }
  }, {
    key: "mute",
    value: function () {
      var _mute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(sessionId) {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;

                this._sessionHandleWithId(sessionId, function (session) {
                  session.__rc_isOnMute = true;
                  session.mute();

                  _this6._updateSessions();
                });

                return _context6.abrupt("return", true);

              case 5:
                _context6.prev = 5;
                _context6.t0 = _context6["catch"](0);
                console.error(_context6.t0);

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.muteError
                });

                return _context6.abrupt("return", false);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 5]]);
      }));

      function mute(_x7) {
        return _mute.apply(this, arguments);
      }

      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(sessionId) {
        var _this7 = this;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this._sessionHandleWithId(sessionId, function (session) {
                  session.__rc_isOnMute = false;
                  session.unmute();

                  _this7._updateSessions();
                });

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function unmute(_x8) {
        return _unmute.apply(this, arguments);
      }

      return unmute;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return", false);

              case 3:
                if (!session.localHold) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt("return", true);

              case 5:
                _context8.prev = 5;
                _context8.next = 8;
                return session.hold();

              case 8:
                session.__rc_callStatus = _sessionStatus.sessionStatus.onHold;

                this._updateSessions();

                this._onCallHold(session);

                return _context8.abrupt("return", true);

              case 14:
                _context8.prev = 14;
                _context8.t0 = _context8["catch"](5);
                console.error('hold error:', _context8.t0);

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.holdError
                });

                return _context8.abrupt("return", false);

              case 19:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[5, 14]]);
      }));

      function hold(_x9) {
        return _hold.apply(this, arguments);
      }

      return hold;
    }()
  }, {
    key: "_holdOtherSession",
    value: function () {
      var _holdOtherSession2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(currentSessionId) {
        var _this8 = this;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return Promise.all(Object.values(this.originalSessions).map( /*#__PURE__*/function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(session) {
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            if (!(currentSessionId === session.id)) {
                              _context9.next = 2;
                              break;
                            }

                            return _context9.abrupt("return");

                          case 2:
                            if (!session.localHold) {
                              _context9.next = 4;
                              break;
                            }

                            return _context9.abrupt("return");

                          case 4:
                            if (!(session.__rc_callStatus === _sessionStatus.sessionStatus.connecting)) {
                              _context9.next = 6;
                              break;
                            }

                            return _context9.abrupt("return");

                          case 6:
                            _context9.prev = 6;
                            _context9.next = 9;
                            return session.hold();

                          case 9:
                            _context9.next = 15;
                            break;

                          case 11:
                            _context9.prev = 11;
                            _context9.t0 = _context9["catch"](6);
                            console.error('Hold call fail');
                            throw _context9.t0;

                          case 15:
                            session.__rc_callStatus = _sessionStatus.sessionStatus.onHold;

                            _this8._onCallHold(session);

                          case 17:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9, null, [[6, 11]]);
                  }));

                  return function (_x11) {
                    return _ref8.apply(this, arguments);
                  };
                }()));

              case 2:
                this._updateSessions(); // update cached sessions


                this._onHoldCachedSession();

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _holdOtherSession(_x10) {
        return _holdOtherSession2.apply(this, arguments);
      }

      return _holdOtherSession;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context11.next = 3;
                  break;
                }

                return _context11.abrupt("return");

              case 3:
                _context11.prev = 3;

                if (!session.localHold) {
                  _context11.next = 13;
                  break;
                }

                _context11.next = 7;
                return this._holdOtherSession(session.id);

              case 7:
                this._onBeforeCallResume(session);

                _context11.next = 10;
                return session.unhold();

              case 10:
                session.__rc_callStatus = _sessionStatus.sessionStatus.connected;

                this._updateSessions();

                this._onCallResume(session);

              case 13:
                _context11.next = 18;
                break;

              case 15:
                _context11.prev = 15;
                _context11.t0 = _context11["catch"](3);
                console.log(_context11.t0);

              case 18:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[3, 15]]);
      }));

      function unhold(_x12) {
        return _unhold.apply(this, arguments);
      }

      return unhold;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context12.next = 3;
                  break;
                }

                return _context12.abrupt("return");

              case 3:
                if (!(session.__rc_callStatus === _sessionStatus.sessionStatus.connecting)) {
                  _context12.next = 5;
                  break;
                }

                return _context12.abrupt("return");

              case 5:
                _context12.prev = 5;
                session.__rc_recordStatus = _recordStatus.recordStatus.pending;

                this._updateSessions();

                _context12.next = 10;
                return session.startRecord();

              case 10:
                session.__rc_recordStatus = _recordStatus.recordStatus.recording;

                this._updateSessions();

                _context12.next = 25;
                break;

              case 14:
                _context12.prev = 14;
                _context12.t0 = _context12["catch"](5);
                console.error(_context12.t0);
                session.__rc_recordStatus = _recordStatus.recordStatus.idle;

                this._updateSessions(); // Recording has been disabled


                if (!(_context12.t0 && _context12.t0.code === -5)) {
                  _context12.next = 24;
                  break;
                }

                this._deps.alert.danger({
                  message: _webphoneErrors.webphoneErrors.recordDisabled
                }); // Disabled phone recording


                session.__rc_recordStatus = _recordStatus.recordStatus.noAccess;

                this._updateSessions();

                return _context12.abrupt("return");

              case 24:
                this._deps.alert.danger({
                  message: _webphoneErrors.webphoneErrors.recordError,
                  payload: {
                    errorCode: _context12.t0.code
                  }
                });

              case 25:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[5, 14]]);
      }));

      function startRecord(_x13) {
        return _startRecord.apply(this, arguments);
      }

      return startRecord;
    }()
  }, {
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context13.next = 3;
                  break;
                }

                return _context13.abrupt("return");

              case 3:
                _context13.prev = 3;
                session.__rc_recordStatus = _recordStatus.recordStatus.pending;

                this._updateSessions();

                _context13.next = 8;
                return session.stopRecord();

              case 8:
                session.__rc_recordStatus = _recordStatus.recordStatus.idle;

                this._updateSessions();

                _context13.next = 17;
                break;

              case 12:
                _context13.prev = 12;
                _context13.t0 = _context13["catch"](3);
                console.error(_context13.t0);
                session.__rc_recordStatus = _recordStatus.recordStatus.recording;

                this._updateSessions();

              case 17:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[3, 12]]);
      }));

      function stopRecord(_x14) {
        return _stopRecord.apply(this, arguments);
      }

      return stopRecord;
    }()
  }, {
    key: "park",
    value: function () {
      var _park = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(sessionId) {
        var session, result;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context14.next = 3;
                  break;
                }

                return _context14.abrupt("return");

              case 3:
                _context14.prev = 3;
                _context14.next = 6;
                return session.park();

              case 6:
                result = _context14.sent;
                console.log('Parked');

                if (result['park extension']) {
                  this._deps.alert.success({
                    message: _webphoneMessages.webphoneMessages.parked,
                    payload: {
                      parkedNumber: "*".concat(result['park extension'])
                    },
                    ttl: 0
                  });
                }

                _context14.next = 14;
                break;

              case 11:
                _context14.prev = 11;
                _context14.t0 = _context14["catch"](3);
                console.error(_context14.t0);

              case 14:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[3, 11]]);
      }));

      function park(_x15) {
        return _park.apply(this, arguments);
      }

      return park;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(transferNumber, sessionId) {
        var _this9 = this;

        var session, numberResult, validPhoneNumber;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context15.next = 3;
                  break;
                }

                return _context15.abrupt("return");

              case 3:
                _context15.prev = 3;
                session.__rc_isOnTransfer = true;

                this._updateSessions();

                if (this._permissionCheck) {
                  _context15.next = 11;
                  break;
                }

                numberResult = (0, _validateNumbers["default"])([transferNumber], this._deps.regionSettings, this._deps.brand.id);
                validPhoneNumber = numberResult && numberResult[0];
                _context15.next = 20;
                break;

              case 11:
                _context15.next = 13;
                return this._deps.numberValidate.validateNumbers([transferNumber]);

              case 13:
                numberResult = _context15.sent;

                if (numberResult.result) {
                  _context15.next = 19;
                  break;
                }

                numberResult.errors.forEach(function (error) {
                  _this9._deps.alert.warning({
                    message: _callErrors.callErrors[error.type],
                    payload: {
                      phoneNumber: error.phoneNumber
                    }
                  });
                });
                session.__rc_isOnTransfer = false;

                this._updateSessions();

                return _context15.abrupt("return");

              case 19:
                validPhoneNumber = numberResult.numbers[0] && numberResult.numbers[0].e164;

              case 20:
                _context15.next = 22;
                return session.transfer(validPhoneNumber);

              case 22:
                session.__rc_isOnTransfer = false;

                this._updateSessions();

                this._onCallEnd(session);

                _context15.next = 33;
                break;

              case 27:
                _context15.prev = 27;
                _context15.t0 = _context15["catch"](3);
                console.error(_context15.t0);
                session.__rc_isOnTransfer = false;

                this._updateSessions();

                this._deps.alert.danger({
                  message: _webphoneErrors.webphoneErrors.transferError
                });

              case 33:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[3, 27]]);
      }));

      function transfer(_x16, _x17) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "startWarmTransfer",
    value: function () {
      var _startWarmTransfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(transferNumber, sessionId) {
        var session, numberResult, validPhoneNumber, fromNumber;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context16.next = 3;
                  break;
                }

                return _context16.abrupt("return");

              case 3:
                _context16.prev = 3;
                session.__rc_isOnTransfer = true;

                this._updateSessions();

                numberResult = (0, _validateNumbers["default"])([transferNumber], this._deps.regionSettings, this._deps.brand.id);
                validPhoneNumber = numberResult && numberResult[0];
                fromNumber = session.__rc_direction === _callDirections["default"].outbound ? session.request.from.uri.user : session.request.to.uri.user;
                _context16.next = 11;
                return this.makeCall({
                  toNumber: validPhoneNumber,
                  fromNumber: fromNumber,
                  homeCountryId: this._deps.regionSettings.homeCountryId,
                  extendedControls: '',
                  transferSessionId: sessionId
                });

              case 11:
                _context16.next = 19;
                break;

              case 13:
                _context16.prev = 13;
                _context16.t0 = _context16["catch"](3);
                console.error(_context16.t0);
                session.__rc_isOnTransfer = false;

                this._updateSessions();

                this._deps.alert.danger({
                  message: _webphoneErrors.webphoneErrors.transferError
                });

              case 19:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[3, 13]]);
      }));

      function startWarmTransfer(_x18, _x19) {
        return _startWarmTransfer.apply(this, arguments);
      }

      return startWarmTransfer;
    }()
  }, {
    key: "completeWarmTransfer",
    value: function () {
      var _completeWarmTransfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(newSessionId) {
        var newSession, oldSessionId, oldSession;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                newSession = this.originalSessions[newSessionId];

                if (newSession) {
                  _context17.next = 3;
                  break;
                }

                return _context17.abrupt("return");

              case 3:
                oldSessionId = newSession.__rc_transferSessionId;
                oldSession = this.originalSessions[oldSessionId];

                if (oldSession) {
                  _context17.next = 7;
                  break;
                }

                return _context17.abrupt("return");

              case 7:
                newSession.__rc_isOnTransfer = true;

                this._updateSessions();

                _context17.prev = 9;
                _context17.next = 12;
                return oldSession.warmTransfer(newSession);

              case 12:
                _context17.next = 20;
                break;

              case 14:
                _context17.prev = 14;
                _context17.t0 = _context17["catch"](9);
                console.error(_context17.t0);
                newSession.__rc_isOnTransfer = false;

                this._updateSessions();

                this._deps.alert.danger({
                  message: _webphoneErrors.webphoneErrors.transferError
                });

              case 20:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[9, 14]]);
      }));

      function completeWarmTransfer(_x20) {
        return _completeWarmTransfer.apply(this, arguments);
      }

      return completeWarmTransfer;
    }()
  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(flipValue, sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context18.next = 3;
                  break;
                }

                return _context18.abrupt("return");

              case 3:
                _context18.prev = 3;
                _context18.next = 6;
                return session.flip(flipValue);

              case 6:
                // this._onCallEnd(session);
                session.__rc_isOnFlip = true;
                console.log('Flipped');
                _context18.next = 15;
                break;

              case 10:
                _context18.prev = 10;
                _context18.t0 = _context18["catch"](3);
                session.__rc_isOnFlip = false;

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.flipError
                });

                console.error(_context18.t0);

              case 15:
                this._updateSessions();

              case 16:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[3, 10]]);
      }));

      function flip(_x21, _x22) {
        return _flip.apply(this, arguments);
      }

      return flip;
    }()
  }, {
    key: "_sendDTMF",
    value: function () {
      var _sendDTMF2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(dtmfValue, session) {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                _context19.next = 3;
                return session.dtmf(dtmfValue, 100);

              case 3:
                _context19.next = 8;
                break;

              case 5:
                _context19.prev = 5;
                _context19.t0 = _context19["catch"](0);
                console.error(_context19.t0);

              case 8:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, null, [[0, 5]]);
      }));

      function _sendDTMF(_x23, _x24) {
        return _sendDTMF2.apply(this, arguments);
      }

      return _sendDTMF;
    }()
  }, {
    key: "sendDTMF",
    value: function () {
      var _sendDTMF3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(dtmfValue, sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (!session) {
                  _context20.next = 4;
                  break;
                }

                _context20.next = 4;
                return this._sendDTMF(dtmfValue, session);

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function sendDTMF(_x25, _x26) {
        return _sendDTMF3.apply(this, arguments);
      }

      return sendDTMF;
    }()
  }, {
    key: "hangup",
    value: function () {
      var _hangup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context21.next = 3;
                  break;
                }

                return _context21.abrupt("return");

              case 3:
                _context21.prev = 3;

                this._onBeforeCallEnd(session);

                _context21.next = 7;
                return session.terminate();

              case 7:
                _context21.next = 13;
                break;

              case 9:
                _context21.prev = 9;
                _context21.t0 = _context21["catch"](3);
                console.error(_context21.t0);

                this._onCallEnd(session);

              case 13:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this, [[3, 9]]);
      }));

      function hangup(_x27) {
        return _hangup.apply(this, arguments);
      }

      return hangup;
    }()
  }, {
    key: "toVoiceMail",
    value: function () {
      var _toVoiceMail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(sessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context22.next = 3;
                  break;
                }

                return _context22.abrupt("return");

              case 3:
                _context22.prev = 3;
                session.__rc_isToVoicemail = true;
                _context22.next = 7;
                return session.toVoicemail();

              case 7:
                _context22.next = 14;
                break;

              case 9:
                _context22.prev = 9;
                _context22.t0 = _context22["catch"](3);
                console.error(_context22.t0);

                this._onCallEnd(session);

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.toVoiceMailError
                });

              case 14:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this, [[3, 9]]);
      }));

      function toVoiceMail(_x28) {
        return _toVoiceMail.apply(this, arguments);
      }

      return toVoiceMail;
    }()
  }, {
    key: "replyWithMessage",
    value: function () {
      var _replyWithMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(sessionId, replyOptions) {
        var session;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                session = this.originalSessions[sessionId];

                if (session) {
                  _context23.next = 3;
                  break;
                }

                return _context23.abrupt("return");

              case 3:
                _context23.prev = 3;
                session.__rc_isReplied = true;
                _context23.next = 7;
                return session.replyWithMessage(replyOptions);

              case 7:
                _context23.next = 13;
                break;

              case 9:
                _context23.prev = 9;
                _context23.t0 = _context23["catch"](3);
                console.error(_context23.t0);

                this._onCallEnd(session);

              case 13:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this, [[3, 9]]);
      }));

      function replyWithMessage(_x29, _x30) {
        return _replyWithMessage.apply(this, arguments);
      }

      return replyWithMessage;
    }()
  }, {
    key: "_addTrack",
    value: function _addTrack(rawSession) {
      if (rawSession) {
        rawSession.addTrack(this._remoteVideo, this._localVideo);
      }
    }
  }, {
    key: "_sessionHandleWithId",
    value: function _sessionHandleWithId(sessionId, func) {
      var session = this.originalSessions[sessionId];

      if (!session) {
        return null;
      }

      return func(session);
    }
  }, {
    key: "_invite",
    value: function () {
      var _invite2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(toNumber, _ref9) {
        var inviteOptions, extendedControls, transferSessionId, phoneLines, session;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                inviteOptions = _ref9.inviteOptions, extendedControls = _ref9.extendedControls, transferSessionId = _ref9.transferSessionId;

                if (this._webphone) {
                  _context24.next = 4;
                  break;
                }

                this._deps.alert.warning({
                  message: this.errorCode
                });

                return _context24.abrupt("return", null);

              case 4:
                if (!(toNumber.length > 6 && (!this._deps.availabilityMonitor || !this._deps.availabilityMonitor.isVoIPOnlyMode))) {
                  _context24.next = 11;
                  break;
                }

                _context24.next = 7;
                return this._fetchDL();

              case 7:
                phoneLines = _context24.sent;

                if (!(phoneLines.length === 0)) {
                  _context24.next = 11;
                  break;
                }

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.noOutboundCallWithoutDL
                });

                return _context24.abrupt("return", null);

              case 11:
                _context24.next = 13;
                return this._holdOtherSession(null);

              case 13:
                session = this._webphone.userAgent.invite(toNumber, inviteOptions);
                session.__rc_direction = _callDirections["default"].outbound;
                session.__rc_callStatus = _sessionStatus.sessionStatus.connecting;
                session.__rc_creationTime = Date.now();
                session.__rc_lastActiveTime = Date.now();
                session.__rc_fromNumber = inviteOptions.fromNumber;
                session.__rc_extendedControls = extendedControls;
                session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.pending;
                session.__rc_transferSessionId = transferSessionId;

                this._onAccepted(session);

                this._onCallInit(session);

                return _context24.abrupt("return", session);

              case 25:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function _invite(_x31, _x32) {
        return _invite2.apply(this, arguments);
      }

      return _invite;
    }()
    /**
     * start an outbound call.
     * @param {toNumber} recipient number
     * @param {fromNumber} call Id
     * @param {homeCountryId} homeCountry Id
     */

  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(_ref10) {
        var toNumber, fromNumber, homeCountryId, extendedControls, transferSessionId, inviteOptions, result;
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                toNumber = _ref10.toNumber, fromNumber = _ref10.fromNumber, homeCountryId = _ref10.homeCountryId, extendedControls = _ref10.extendedControls, transferSessionId = _ref10.transferSessionId;
                inviteOptions = {
                  sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions,
                  fromNumber: fromNumber,
                  homeCountryId: homeCountryId
                };
                _context25.next = 4;
                return this._invite(toNumber, {
                  inviteOptions: inviteOptions,
                  extendedControls: extendedControls,
                  transferSessionId: transferSessionId
                });

              case 4:
                result = _context25.sent;
                return _context25.abrupt("return", result);

              case 6:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function makeCall(_x33) {
        return _makeCall.apply(this, arguments);
      }

      return makeCall;
    }()
    /**
     * switch a active call into web phone session.
     */

  }, {
    key: "switchCall",
    value: function () {
      var _switchCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(_ref11, homeCountryId) {
        var id, from, direction, to, sipData, extraHeaders, toNumber, fromNumber, inviteOptions, session;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                id = _ref11.id, from = _ref11.from, direction = _ref11.direction, to = _ref11.to, sipData = _ref11.sipData;
                extraHeaders = [];
                extraHeaders.push("Replaces: ".concat(id, ";to-tag=").concat(sipData.fromTag, ";from-tag=").concat(sipData.toTag));
                extraHeaders.push('RC-call-type: replace');
                toNumber = direction === _callDirections["default"].outbound ? to.phoneNumber : from.phoneNumber;
                fromNumber = direction === _callDirections["default"].outbound ? from.phoneNumber : to.phoneNumber;
                inviteOptions = {
                  sessionDescriptionHandlerOptions: this.acceptOptions.sessionDescriptionHandlerOptions,
                  fromNumber: fromNumber,
                  homeCountryId: homeCountryId,
                  extraHeaders: extraHeaders
                };
                _context26.next = 9;
                return this._invite(toNumber, {
                  inviteOptions: inviteOptions
                });

              case 9:
                session = _context26.sent;
                return _context26.abrupt("return", session);

              case 11:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function switchCall(_x34, _x35) {
        return _switchCall.apply(this, arguments);
      }

      return switchCall;
    }()
  }, {
    key: "updateSessionMatchedContact",
    value: function () {
      var _updateSessionMatchedContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(sessionId, contact) {
        var _this10 = this;

        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                this._sessionHandleWithId(sessionId, function (session) {
                  session.__rc_contactMatch = contact;

                  _this10._updateSessions();
                });

              case 1:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function updateSessionMatchedContact(_x36, _x37) {
        return _updateSessionMatchedContact.apply(this, arguments);
      }

      return updateSessionMatchedContact;
    }()
  }, {
    key: "setSessionCaching",
    value: function () {
      var _setSessionCaching2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(sessionIds) {
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                this._setSessionCaching(sessionIds);

              case 1:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function setSessionCaching(_x38) {
        return _setSessionCaching2.apply(this, arguments);
      }

      return setSessionCaching;
    }()
  }, {
    key: "clearSessionCaching",
    value: function () {
      var _clearSessionCaching2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                this._clearSessionCaching(_toConsumableArray(Object.values(this.originalSessions)).map(_webphoneHelper.normalizeSession));

              case 1:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function clearSessionCaching() {
        return _clearSessionCaching2.apply(this, arguments);
      }

      return clearSessionCaching;
    }()
  }, {
    key: "_updateSessions",
    value: function _updateSessions() {
      this._updateSessionsState(_toConsumableArray(Object.values(this.originalSessions)).map(_webphoneHelper.normalizeSession));
    }
  }, {
    key: "toggleMinimized",
    value: function () {
      var _toggleMinimized = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(sessionId) {
        var _this11 = this;

        return regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                this._sessionHandleWithId(sessionId, function (session) {
                  session.__rc_minimized = !session.__rc_minimized;

                  _this11._updateSessions();
                });

              case 1:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function toggleMinimized(_x39) {
        return _toggleMinimized.apply(this, arguments);
      }

      return toggleMinimized;
    }()
  }, {
    key: "_setActiveWebphoneActiveCallId",
    value: function _setActiveWebphoneActiveCallId(session) {
      if (!this._disconnectOnInactive) {
        return;
      }

      var currentId = localStorage.getItem(this._activeWebphoneActiveCallKey);

      if (currentId !== session.id) {
        localStorage.setItem(this._activeWebphoneActiveCallKey, session.id);
      }
    }
  }, {
    key: "_onCallInit",
    value: function _onCallInit(session) {
      this._updateSessions();

      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._setActiveSessionId(normalizedSession.id);

      if (this._deps.contactMatcher && (!this._deps.tabManager || this._deps.tabManager.active)) {
        this._deps.contactMatcher.triggerMatch();
      }

      this._eventEmitter.emit(_events.EVENTS.callInit, normalizedSession, this.activeSession);

      this._setActiveWebphoneActiveCallId(session);
    }
  }, {
    key: "_onCallStart",
    value: function _onCallStart(session) {
      this._updateSessions();

      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._setStateOnCallStart(normalizedSession);

      this._eventEmitter.emit(_events.EVENTS.callStart, normalizedSession, this.activeSession);

      this._setActiveWebphoneActiveCallId(session);
    }
  }, {
    key: "_onCallRing",
    value: function _onCallRing(session) {
      this._updateSessions();

      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._setStateOnCallRing(normalizedSession);

      if (this._deps.contactMatcher && (!this._deps.tabManager || this._deps.tabManager.active)) {
        this._deps.contactMatcher.triggerMatch();
      }

      if (this.activeSession && !(0, _webphoneHelper.isOnHold)(this.activeSession)) {
        this._webphone.userAgent.audioHelper.playIncoming(false);
      }

      this._eventEmitter.emit(_events.EVENTS.callRing, normalizedSession, this.ringSession);
    }
  }, {
    key: "_onBeforeCallEnd",
    value: function _onBeforeCallEnd(session) {
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._eventEmitter.emit(_events.EVENTS.beforeCallEnd, normalizedSession, this.activeSession);
    }
  }, {
    key: "_releaseVideoElementsOnSessionsEmpty",
    value: function _releaseVideoElementsOnSessionsEmpty() {
      if (this.videoElementPrepared && this.sessions.length === 0) {
        // Pause video elements to release system Video Wake Lock RCINT-15582
        if (!this._remoteVideo.paused) {
          this._remoteVideo.pause();

          this._remoteVideo.srcObject = null;
        }

        if (!this._localVideo.paused) {
          this._localVideo.pause();
        }
      }
    }
  }, {
    key: "_reconnectWebphoneIfNecessaryOnSessionsEmpty",
    value: function _reconnectWebphoneIfNecessaryOnSessionsEmpty() {
      if (this._reconnectAfterSessionEnd && this.sessions.length === 0) {
        if (this._reconnectAfterSessionEnd.reason) {
          this._deps.alert.warning({
            message: this._reconnectAfterSessionEnd.reason,
            allowDuplicates: false
          });
        }

        this._reconnectAfterSessionEnd = null;
        this.connect({
          skipConnectDelay: true,
          force: true,
          skipDLCheck: true
        });
      }
    }
  }, {
    key: "_onCallEnd",
    value: function _onCallEnd(session) {
      session.__rc_extendedControlStatus = _extendedControlStatus.extendedControlStatus.stopped;
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      if (!normalizedSession) {
        return;
      }

      if (session.__rc_transferSessionId) {
        var transferSession = this.originalSessions[session.__rc_transferSessionId];

        if (transferSession) {
          transferSession.__rc_isOnTransfer = false;
        }
      }

      this._updateSessions();

      this._setStateOnCallEnd(normalizedSession);

      this._eventEmitter.emit(_events.EVENTS.callEnd, normalizedSession, this.activeSession, this.ringSession);

      this._releaseVideoElementsOnSessionsEmpty();

      this._reconnectWebphoneIfNecessaryOnSessionsEmpty();

      this._makeWebphoneInactiveOnSessionsEmpty();
    }
  }, {
    key: "_onBeforeCallResume",
    value: function _onBeforeCallResume(session) {
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._eventEmitter.emit(_events.EVENTS.beforeCallResume, normalizedSession, this.activeSession);
    }
  }, {
    key: "_onCallResume",
    value: function _onCallResume(session) {
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._setActiveSessionId(normalizedSession.id);

      this._eventEmitter.emit(_events.EVENTS.callResume, normalizedSession, this.activeSession);

      this._setActiveWebphoneActiveCallId(session);
    }
  }, {
    key: "_onCallHold",
    value: function _onCallHold(session) {
      var normalizedSession = (0, _ramda.find)(function (x) {
        return x.id === session.id;
      }, this.sessions);

      this._eventEmitter.emit(_events.EVENTS.callHold, normalizedSession, this.activeSession);
    }
  }, {
    key: "onCallStart",
    value: function onCallStart(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.callStart, handler);
      }
    }
  }, {
    key: "onCallInit",
    value: function onCallInit(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.callInit, handler);
      }
    }
  }, {
    key: "onCallRing",
    value: function onCallRing(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.callRing, handler);
      }
    }
  }, {
    key: "onCallEnd",
    value: function onCallEnd(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.callEnd, handler);
      }
    }
  }, {
    key: "onBeforeCallResume",
    value: function onBeforeCallResume(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.beforeCallResume, handler);
      }
    }
  }, {
    key: "onCallResume",
    value: function onCallResume(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.callResume, handler);
      }
    }
  }, {
    key: "onCallHold",
    value: function onCallHold(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.callHold, handler);
      }
    }
  }, {
    key: "onBeforeCallEnd",
    value: function onBeforeCallEnd(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.beforeCallEnd, handler);
      }
    }
  }, {
    key: "onWebphoneRegistered",
    value: function onWebphoneRegistered(handler) {
      var _this12 = this;

      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.webphoneRegistered, handler);

        return function () {
          _this12._eventEmitter.off(_events.EVENTS.webphoneRegistered, handler);
        };
      }
    }
  }, {
    key: "onWebphoneUnregistered",
    value: function onWebphoneUnregistered(handler) {
      var _this13 = this;

      if (typeof handler === 'function') {
        this._eventEmitter.on(_events.EVENTS.webphoneUnregistered, handler);

        return function () {
          _this13._eventEmitter.off(_events.EVENTS.webphoneUnregistered, handler);
        };
      }
    }
  }, {
    key: "_disconnect",
    value: function () {
      var _disconnect2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return _get(_getPrototypeOf(Webphone.prototype), "_disconnect", this).call(this);

              case 2:
                this._updateSessions();

              case 3:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function _disconnect() {
        return _disconnect2.apply(this, arguments);
      }

      return _disconnect;
    }()
  }, {
    key: "sessionPhoneNumbers",
    get: function get() {
      var outputs = [];
      this.sessions.forEach(function (session) {
        outputs.push(session.to);
        outputs.push(session.from);
      });
      return outputs;
    }
    /**
     * Current active session(Outbound and InBound that answered)
     */

  }, {
    key: "activeSession",
    get: function get() {
      var _this14 = this;

      if (!this.activeSessionId) {
        return null;
      }

      var activeSession = (0, _ramda.find)(function (session) {
        return session.id === _this14.activeSessionId;
      }, this.sessions);
      return activeSession;
    }
    /**
     * Current ring session(inbound)
     */

  }, {
    key: "ringSession",
    get: function get() {
      var _this15 = this;

      if (!this.ringSessionId) {
        return null;
      }

      var session = (0, _ramda.find)(function (session) {
        return session.id === _this15.ringSessionId;
      }, this.sessions);
      return session;
    }
  }, {
    key: "ringSessions",
    get: function get() {
      return (0, _ramda.filter)(function (session) {
        return (0, _webphoneHelper.isRing)(session);
      }, this.sessions);
    }
  }, {
    key: "onHoldSessions",
    get: function get() {
      return (0, _ramda.filter)(function (session) {
        return (0, _webphoneHelper.isOnHold)(session);
      }, this.sessions);
    }
  }, {
    key: "cachedSessions",
    get: function get() {
      return (0, _ramda.filter)(function (session) {
        return session.cached;
      }, this.sessions);
    }
  }, {
    key: "acceptOptions",
    get: function get() {
      return {
        sessionDescriptionHandlerOptions: {
          constraints: {
            audio: {
              deviceId: this._deps.audioSettings.inputDeviceId
            },
            video: false
          }
        }
      };
    }
  }, {
    key: "isOnTransfer",
    get: function get() {
      return this.activeSession && this.activeSession.isOnTransfer;
    }
  }, {
    key: "ringingCallOnView",
    get: function get() {
      return (0, _ramda.find)(function (session) {
        return !session.minimized;
      }, this.ringSessions);
    }
  }]);

  return Webphone;
}(_WebphoneBase2.WebphoneBase), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "activeSessionId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ringSessionId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lastEndedSessions", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sessions", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateSessionsState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSessionsState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setActiveSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setActiveSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnCallRing", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnCallRing"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnCallStart", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnCallStart"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnCallEnd", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnCallEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSessionCaching", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearSessionCaching", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onHoldCachedSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_onHoldCachedSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackCallAnswer", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackCallAnswer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reject", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resume", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "resume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forward", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "forward"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecord", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecord", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "park", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "park"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transfer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "transfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startWarmTransfer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeWarmTransfer", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "completeWarmTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flip", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "flip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendDTMF", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendDTMF", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sendDTMF"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangup", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hangup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toVoiceMail", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toVoiceMail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyWithMessage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "replyWithMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switchCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSessionMatchedContact", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSessionMatchedContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSessionCaching", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearSessionCaching", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "clearSessionCaching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateSessions", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleMinimized", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleMinimized"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionPhoneNumbers", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSession", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringSessions", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "ringSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onHoldSessions", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "onHoldSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cachedSessions", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "cachedSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringingCallOnView", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "ringingCallOnView"), _class2.prototype)), _class2)) || _class);
exports.Webphone = Webphone;
//# sourceMappingURL=Webphone.js.map

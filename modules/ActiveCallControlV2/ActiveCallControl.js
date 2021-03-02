"use strict";

require("core-js/modules/es6.array.sort");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallControl = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _core = require("@ringcentral-integration/core");

var _ringcentralCall = require("ringcentral-call");

var _Session = require("ringcentral-call/lib/Session");

var _Session2 = require("ringcentral-call-control/lib/Session");

var _ramda = require("ramda");

var _uuid = require("uuid");

var _callDirections = require("../../enums/callDirections");

var _di = require("../../lib/di");

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _callErrors = _interopRequireDefault(require("../Call/callErrors"));

var _webphoneErrors = require("../WebphoneV2/webphoneErrors");

var _helpers = require("./helpers");

var _Analytics = require("../Analytics");

var _callControlError = _interopRequireDefault(require("../ActiveCallControl/callControlError"));

var _validateNumbers = _interopRequireDefault(require("../../lib/validateNumbers"));

var _webphoneHelper = require("../Webphone/webphoneHelper");

var _sessionStatus = require("../Webphone/sessionStatus");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_TIME_TO_RETRY = 62 * 1000;
var DEFAULT_BUSY_TIMEOUT = 3 * 1000;
var telephonySessionsEndPoint = /\/telephony\/sessions$/;
var subscribeEvent = _subscriptionFilters["default"].telephonySessions;
var ActiveCallControl = (_dec = (0, _di.Module)({
  name: 'ActiveCallControl',
  deps: ['Auth', 'Alert', 'Brand', 'Client', 'Presence', 'AccountInfo', 'Subscription', 'ExtensionInfo', 'NumberValidate', 'RegionSettings', 'ConnectivityMonitor', 'RolesAndPermissions', {
    dep: 'Prefix',
    optional: true
  }, {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'AudioSettings',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'ActiveCallControlOptions',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.mute)];
}), _dec3 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.unmute)];
}), _dec4 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.record)];
}), _dec5 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.stopRecord)];
}), _dec6 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.hangup)];
}), _dec7 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.voicemail)];
}), _dec8 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.confirmSwitch)];
}), _dec9 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.hold)];
}), _dec10 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.unhold)];
}), _dec11 = (0, _core.track)(_Analytics.trackEvents.transfer), _dec12 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.confirmForward)];
}), _dec13 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.answer)];
}), _dec14 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.holdAndAnswer)];
}), _dec15 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.ignore)];
}), _dec16 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.endAndAnswer)];
}), _dec17 = (0, _core.computed)(function (_ref) {
  var activeSessionId = _ref.activeSessionId,
      activeSessions = _ref.activeSessions;
  return [activeSessionId, activeSessions];
}), _dec18 = (0, _core.computed)(function (that) {
  return [that.sessions, that.timestamp];
}), _dec19 = (0, _core.computed)(function (that) {
  return [that._deps.presence.calls];
}), _dec20 = (0, _core.track)(_Analytics.trackEvents.dialpadOpen), _dec21 = (0, _core.track)(_Analytics.trackEvents.dialpadClose), _dec22 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.clickTransfer)];
}), _dec23 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents.forward)];
}), _dec24 = (0, _core.track)(function (that) {
  return [that._getTrackEventName(_Analytics.trackEvents["switch"])];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ActiveCallControl, _RcModuleV);

  var _super = _createSuper(ActiveCallControl);

  function ActiveCallControl(deps) {
    var _deps$activeCallContr, _deps$activeCallContr2, _activeCallControlOpt, _activeCallControlOpt2, _activeCallControlOpt3, _activeCallControlOpt4, _activeCallControlOpt5, _activeCallControlOpt6;

    var _this;

    _classCallCheck(this, ActiveCallControl);

    _this = _super.call(this, {
      deps: deps,
      enableCache: (_deps$activeCallContr = (_deps$activeCallContr2 = deps.activeCallControlOptions) === null || _deps$activeCallContr2 === void 0 ? void 0 : _deps$activeCallContr2.enableCache) !== null && _deps$activeCallContr !== void 0 ? _deps$activeCallContr : true,
      storageKey: 'activeCallControl'
    });
    _this._ttl = void 0;
    _this._timeToRetry = void 0;
    _this._polling = void 0;
    _this._enableCache = void 0;
    _this._promise = null;
    _this._rcCall = void 0;
    _this._tabActive = void 0;
    _this._connectivity = void 0;
    _this._onCallEndFunc = void 0;
    _this._timeoutId = null;
    _this._lastSubscriptionMessage = void 0;
    _this._permissionCheck = void 0;
    _this._autoMergeSignCallIdKey = void 0;
    _this._autoMergeCallsKey = void 0;
    _this._enableAutoSwitchFeature = void 0;
    _this._autoMergeWebphoneSessionsMap = void 0;
    _this._onCallSwitchedFunc = void 0;
    _this._activeSession = void 0;

    _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "lastEndedSessionIds", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "cachedSessions", _descriptor3, _assertThisInitialized(_this));

    _this._updateSessionsHandler = function () {
      _this.updateActiveSessions();
    };

    var activeCallControlOptions = _this._deps.activeCallControlOptions;
    _this._ttl = (_activeCallControlOpt = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.ttl) !== null && _activeCallControlOpt !== void 0 ? _activeCallControlOpt : DEFAULT_TTL;
    _this._timeToRetry = (_activeCallControlOpt2 = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.timeToRetry) !== null && _activeCallControlOpt2 !== void 0 ? _activeCallControlOpt2 : DEFAULT_TIME_TO_RETRY;
    _this._polling = (_activeCallControlOpt3 = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.polling) !== null && _activeCallControlOpt3 !== void 0 ? _activeCallControlOpt3 : false;
    _this._enableCache = (_activeCallControlOpt4 = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.enableCache) !== null && _activeCallControlOpt4 !== void 0 ? _activeCallControlOpt4 : true;
    _this._promise = null;
    _this._rcCall = null;
    _this._permissionCheck = (_activeCallControlOpt5 = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.permissionCheck) !== null && _activeCallControlOpt5 !== void 0 ? _activeCallControlOpt5 : true;
    _this._enableAutoSwitchFeature = (_activeCallControlOpt6 = activeCallControlOptions === null || activeCallControlOptions === void 0 ? void 0 : activeCallControlOptions.enableAutoSwitchFeature) !== null && _activeCallControlOpt6 !== void 0 ? _activeCallControlOpt6 : false;
    _this._autoMergeSignCallIdKey = "".concat(deps.prefix, "-auto-merge-sign-call-id-key");
    _this._autoMergeCallsKey = "".concat(deps.prefix, "-auto-merge-calls-key");
    _this._autoMergeWebphoneSessionsMap = new Map();
    return _this;
  }

  _createClass(ActiveCallControl, [{
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.ready && this._hasPermission)) {
                  _context.next = 5;
                  break;
                }

                this._subscriptionHandler();

                this._checkConnectivity();

                _context.next = 5;
                return this._checkTabActive();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "initModule",
    value: function () {
      var _initModule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._createOtherInstanceListener();

                _context2.next = 3;
                return _get(_getPrototypeOf(ActiveCallControl.prototype), "initModule", this).call(this);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initModule() {
        return _initModule.apply(this, arguments);
      }

      return initModule;
    }()
  }, {
    key: "_createOtherInstanceListener",
    value: function _createOtherInstanceListener() {
      var _this2 = this;

      if (!this._deps.tabManager || !this._enableAutoSwitchFeature) {
        return;
      }

      window.addEventListener('storage', function (e) {
        _this2._onStorageChangeEvent(e);
      });
    }
  }, {
    key: "_onStorageChangeEvent",
    value: function _onStorageChangeEvent(e) {
      switch (e.key) {
        case this._autoMergeSignCallIdKey:
          this._triggerCurrentClientAutoMerge(e);

          break;

        case this._autoMergeCallsKey:
          this._autoMergeCallsHandler(e);

          break;

        default:
          break;
      }
    }
  }, {
    key: "_triggerCurrentClientAutoMerge",
    value: function _triggerCurrentClientAutoMerge(e) {
      try {
        var _JSON$parse = JSON.parse(e.newValue),
            telephoneSessionId = _JSON$parse.telephoneSessionId;

        var ids = this.rcCallSessions.filter(function (s) {
          return !(0, _helpers.isRinging)(s) && !!s.webphoneSession && s.telephonySessionId !== telephoneSessionId;
        }).map(function (s) {
          return s.telephonySessionId;
        });
        var id = (0, _uuid.v4)();
        var data = {
          id: id,
          ids: ids
        };

        if (ids.length) {
          localStorage.setItem(this._autoMergeCallsKey, JSON.stringify(data));
        }
      } catch (err) {
        console.log('AutoMerge sign event parse error');
      }
    }
  }, {
    key: "_autoMergeCallsHandler",
    value: function () {
      var _autoMergeCallsHandler2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        var _this3 = this;

        var _JSON$parse2, ids, response, data, activeCalls, callsList;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this._deps.tabManager.active) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                _context5.prev = 2;
                _JSON$parse2 = JSON.parse(e.newValue), ids = _JSON$parse2.ids;
                _context5.next = 6;
                return this._deps.client.service.platform().get(_subscriptionFilters["default"].detailedPresence);

              case 6:
                response = _context5.sent;
                _context5.next = 9;
                return response.json();

              case 9:
                data = _context5.sent;
                activeCalls = data.activeCalls;
                callsList = ids // filter calls which are already in current instance.
                .filter(function (id) {
                  return _this3.rcCallSessions.find(function (item) {
                    return item.telephonySessionId === id && !!item.telephonySession;
                  });
                }) // transfer id to ActiveCallInfo.
                .map(function (telephonySessionId) {
                  var activeCall = activeCalls.find(function (call) {
                    return call.telephonySessionId === telephonySessionId;
                  });
                  if (!activeCall) console.log("Auto Switch failed with telephonySessionId ".concat(telephonySessionId));
                  return activeCall;
                }).filter(function (item) {
                  return !!item;
                });

                if (callsList.length) {
                  callsList.forEach( /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(activeCall) {
                      var switchSession;
                      return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.next = 2;
                              return _this3.transferUnmuteHandler(activeCall.telephonySessionId);

                            case 2:
                              switchSession = _this3._rcCall.switchCallFromActiveCall(activeCall, {
                                homeCountryId: _this3._deps.regionSettings.homeCountryId
                              });

                              _this3._autoMergeWebphoneSessionsMap.set(switchSession.webphoneSession, true);

                              switchSession.webphoneSession.mute();
                              switchSession.webphoneSession.once('accepted', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                  while (1) {
                                    switch (_context3.prev = _context3.next) {
                                      case 0:
                                        switchSession.webphoneSession.unmute();
                                        _context3.next = 3;
                                        return switchSession.webphoneSession.hold();

                                      case 3:
                                        _this3._addTrackToActiveSession();

                                      case 4:
                                      case "end":
                                        return _context3.stop();
                                    }
                                  }
                                }, _callee3);
                              })));

                            case 6:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }));

                    return function (_x2) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                }

                _context5.next = 19;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](2);
                console.log(_context5.t0);
                console.log('auto merge calls from other tabs failed');

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 15]]);
      }));

      function _autoMergeCallsHandler(_x) {
        return _autoMergeCallsHandler2.apply(this, arguments);
      }

      return _autoMergeCallsHandler;
    }()
  }, {
    key: "_triggerAutoMergeEvent",
    value: function _triggerAutoMergeEvent(telephoneSessionId) {
      if (!this._deps.tabManager || !this._enableAutoSwitchFeature) return;
      var id = (0, _uuid.v4)();
      var data = {
        id: id,
        telephoneSessionId: telephoneSessionId
      };
      localStorage.setItem(this._autoMergeSignCallIdKey, JSON.stringify(data));
    }
  }, {
    key: "_addTrackToActiveSession",
    value: function _addTrackToActiveSession() {
      var telephonySessionId = this.activeSessionId;

      var activeRCCallSession = this.rcCallSessions.find(function (s) {
        return s.telephonySessionId === telephonySessionId;
      }) || this._activeSession;

      if (activeRCCallSession && activeRCCallSession.webphoneSession) {
        var _this$_deps$webphone = this._deps.webphone,
            _remoteVideo = _this$_deps$webphone._remoteVideo,
            _localVideo = _this$_deps$webphone._localVideo;
        activeRCCallSession.webphoneSession.addTrack(_remoteVideo, _localVideo);
      }
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this$_deps$webphone2,
            _this4 = this,
            _this$_rcCall,
            _this$_rcCall$_callCo,
            _this$_deps$tabManage;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this._hasPermission) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                this._deps.subscription.subscribe([subscribeEvent]);

                this._rcCall = new _ringcentralCall.RingCentralCall({
                  sdk: this._deps.client.service,
                  subscriptions: null,
                  enableSubscriptionHander: false,
                  callControlOptions: {
                    preloadDevices: false,
                    preloadSessions: false,
                    extensionInfo: _objectSpread(_objectSpread({}, this._deps.extensionInfo.info), {}, {
                      // TODO: add info type in 'AccountInfo'
                      // @ts-ignore
                      account: this._deps.accountInfo.info
                    })
                  },
                  webphone: (_this$_deps$webphone2 = this._deps.webphone) === null || _this$_deps$webphone2 === void 0 ? void 0 : _this$_deps$webphone2._webphone
                });

                this._rcCall.on(_ringcentralCall.events.NEW, function (session) {
                  _this4._newSessionHandler(session);
                });

                this._rcCall.on(_ringcentralCall.events.WEBPHONE_INVITE, function (session) {
                  return _this4._onWebphoneInvite(session);
                });

                this._rcCall.on(_ringcentralCall.events.WEBPHONE_INVITE_SENT, function (session) {
                  return _this4._onWebphoneInvite(session);
                }); // workaround of bug:
                // WebRTC outbound call with wrong sequences of telephony sessions then call log section will not show


                (_this$_rcCall = this._rcCall) === null || _this$_rcCall === void 0 ? void 0 : (_this$_rcCall$_callCo = _this$_rcCall._callControl) === null || _this$_rcCall$_callCo === void 0 ? void 0 : _this$_rcCall$_callCo.on('new', this._updateSessionsHandler);
                this._tabActive = (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.active;

                if (!this._shouldFetch()) {
                  _context6.next = 20;
                  break;
                }

                _context6.prev = 10;
                _context6.next = 13;
                return this.fetchData();

              case 13:
                _context6.next = 18;
                break;

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](10);

                this._retry();

              case 18:
                _context6.next = 21;
                break;

              case 20:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 21:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[10, 15]]);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this5 = this;

      if (this._deps.webphone) {
        (0, _core.watch)(this, function () {
          return _this5._deps.webphone.connected;
        }, function (newValue) {
          if (newValue && _this5._deps.webphone._webphone) {
            _this5._rcCall.setWebphone(_this5._deps.webphone._webphone);
          }
        });
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.resetState();
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.data.activeSessionId = null;
      this.data.busyTimestamp = 0;
      this.data.timestamp = 0;
      this.data.sessions = [];
    }
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch() {
      return !this._deps.tabManager || this._deps.tabManager.active;
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetchData();
                }

                _context7.next = 3;
                return this._promise;

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function fetchData() {
        return _fetchData2.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: "_subscriptionHandler",
    value: function _subscriptionHandler() {
      if (!this.ready) {
        return;
      }

      var message = this._deps.subscription.message;

      if (message && message !== this._lastSubscriptionMessage && telephonySessionsEndPoint.test(message.event) && message.body) {
        message = this._checkRingOutCallDirection(message);
        this._lastSubscriptionMessage = message;

        if (this._rcCall) {
          this._rcCall.onNotificationEvent(message);
        }
      }
    } // workaround of PLA bug: https://jira.ringcentral.com/browse/PLA-52742, remove these code after PLA
    // fixed this bug

  }, {
    key: "_checkRingOutCallDirection",
    value: function _checkRingOutCallDirection(message) {
      var _body$origin;

      var body = message.body;
      var originType = body === null || body === void 0 ? void 0 : (_body$origin = body.origin) === null || _body$origin === void 0 ? void 0 : _body$origin.type;

      if (originType === 'RingOut') {
        var parties = body.parties;

        if (Array.isArray(parties) && parties.length) {
          (0, _ramda.forEach)(function (party) {
            if (party.ringOutRole && party.ringOutRole === 'Initiator' && party.direction === 'Inbound') {
              var tempFrom = _objectSpread({}, party.from);

              party.direction = 'Outbound';
              party.from = party.to;
              party.to = tempFrom;
            }
          }, parties);
        }
      }

      return message;
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this6 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        _this6._timeoutId = null;

        if (!_this6.timestamp || Date.now() - _this6.timestamp > _this6.ttl) {
          if (!_this6._deps.tabManager || _this6._deps.tabManager.active) {
            _this6.fetchData();
          } else {
            // continue retry checks in case tab becomes main tab
            _this6._retry();
          }
        }
      }, t);
    }
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this._syncData();

              case 3:
                if (this._polling) {
                  this._startPolling();
                }

                this._promise = null;
                _context8.next = 12;
                break;

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                this._promise = null;

                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }

                throw _context8.t0;

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 7]]);
      }));

      function _fetchData() {
        return _fetchData3.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: "_startPolling",
    value: function _startPolling() {
      var _this7 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.ttl + 10 - Date.now();

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        var _this7$_deps$tabManag;

        _this7._timeoutId = null;

        if (!_this7._deps.tabManager || ((_this7$_deps$tabManag = _this7._deps.tabManager) === null || _this7$_deps$tabManag === void 0 ? void 0 : _this7$_deps$tabManag.active)) {
          if (!_this7.timestamp || Date.now() - _this7.timestamp > _this7.ttl) {
            _this7.fetchData();
          } else {
            _this7._startPolling();
          }
        } else if (_this7.timestamp && Date.now() - _this7.timestamp < _this7.ttl) {
          _this7._startPolling();
        } else {
          _this7._startPolling(_this7.timeToRetry);
        }
      }, t);
    }
  }, {
    key: "_syncData",
    value: function () {
      var _syncData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this8 = this;

        var activeCalls;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                activeCalls = this._deps.presence.calls;
                _context9.next = 4;
                return this._rcCall.loadSessions(activeCalls);

              case 4:
                this.updateActiveSessions();

                this._rcCall.sessions.forEach(function (session) {
                  _this8._newSessionHandler(session);
                });

                _context9.next = 12;
                break;

              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](0);
                console.log('sync data error:', _context9.t0);
                throw _context9.t0;

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 8]]);
      }));

      function _syncData() {
        return _syncData2.apply(this, arguments);
      }

      return _syncData;
    }()
  }, {
    key: "updateActiveSessions",
    value: function updateActiveSessions() {
      var _this$_rcCall2, _this$_rcCall2$_callC;

      this.data.timestamp = Date.now();
      var callControlSessions = (_this$_rcCall2 = this._rcCall) === null || _this$_rcCall2 === void 0 ? void 0 : (_this$_rcCall2$_callC = _this$_rcCall2._callControl) === null || _this$_rcCall2$_callC === void 0 ? void 0 : _this$_rcCall2$_callC.sessions.map(function (session) {
        return _objectSpread(_objectSpread({}, session.data), {}, {
          party: session.party || {}
        });
      });
      this.data.sessions = callControlSessions || [];
    }
  }, {
    key: "_newSessionHandler",
    value: function _newSessionHandler(session) {
      session.removeListener(_Session.events.STATUS, this._updateSessionsHandler);
      session.removeListener(_Session.events.MUTED, this._updateSessionsHandler);
      session.removeListener(_Session.events.RECORDINGS, this._updateSessionsHandler);
      session.removeListener(_Session.events.DISCONNECTED, this._updateSessionsHandler);
      session.on(_Session.events.STATUS, this._updateSessionsHandler);
      session.on(_Session.events.MUTED, this._updateSessionsHandler);
      session.on(_Session.events.RECORDINGS, this._updateSessionsHandler);
      session.on(_Session.events.DISCONNECTED, this._updateSessionsHandler); // Handle the session update at the end of function to reduce the probability of empty rc call
      // sessions

      this._updateSessionsHandler();
    }
  }, {
    key: "removeActiveSession",
    value: function removeActiveSession() {
      this.data.activeSessionId = null;
    } // count it as load (should only call on container init step)

  }, {
    key: "setActiveSessionId",
    value: function setActiveSessionId(telephonySessionId) {
      if (!telephonySessionId) return;
      this.data.activeSessionId = telephonySessionId;
    }
  }, {
    key: "setLastEndedSessionIds",
    value: function setLastEndedSessionIds(session) {
      /**
       * don't add incoming call that isn't relied by current app
       *   to end sessions. this call can be answered by other apps
       */
      var normalizedWebphoneSession = (0, _webphoneHelper.normalizeSession)(session);

      if (!normalizedWebphoneSession.startTime && !normalizedWebphoneSession.isToVoicemail && !normalizedWebphoneSession.isForwarded && !normalizedWebphoneSession.isReplied) {
        return;
      }

      var partyData = normalizedWebphoneSession.partyData;
      if (!partyData) return;

      if (this.lastEndedSessionIds.indexOf(partyData.sessionId) === -1) {
        this.lastEndedSessionIds = [partyData.sessionId].concat(this.lastEndedSessionIds).slice(0, 5);
      }
    }
  }, {
    key: "_checkConnectivity",
    value: function _checkConnectivity() {
      if (this._deps.connectivityMonitor && this._deps.connectivityMonitor.ready && this._connectivity !== this._deps.connectivityMonitor.connectivity) {
        this._connectivity = this._deps.connectivityMonitor.connectivity;

        if (this._connectivity) {
          this.fetchData();
        }
      }
    }
  }, {
    key: "_checkTabActive",
    value: function () {
      var _checkTabActive2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var _this$_deps$tabManage2,
            _this9 = this;

        var _this$_deps$tabManage3, _this$_deps$tabManage4;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(!this._deps.tabManager || !this._deps.storage || !this._enableCache)) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return");

              case 2:
                if (!(this._tabActive !== ((_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active))) {
                  _context10.next = 8;
                  break;
                }

                this._tabActive = (_this$_deps$tabManage3 = this._deps.tabManager) === null || _this$_deps$tabManage3 === void 0 ? void 0 : _this$_deps$tabManage3.active;

                if (!(((_this$_deps$tabManage4 = this._deps.tabManager) === null || _this$_deps$tabManage4 === void 0 ? void 0 : _this$_deps$tabManage4.active) && this._rcCall)) {
                  _context10.next = 8;
                  break;
                }

                _context10.next = 7;
                return this._rcCall.restoreSessions(this.sessions);

              case 7:
                this._rcCall.sessions.forEach(function (session) {
                  _this9._newSessionHandler(session);
                });

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _checkTabActive() {
        return _checkTabActive2.apply(this, arguments);
      }

      return _checkTabActive;
    }()
  }, {
    key: "_getTrackEventName",
    value: function _getTrackEventName(name) {
      var _this$_deps$routerInt, _this$parentModule$ca, _this$parentModule$ca2;

      // TODO: refactor to remove `this.parentModule`.
      var currentPath = (_this$_deps$routerInt = this._deps.routerInteraction) === null || _this$_deps$routerInt === void 0 ? void 0 : _this$_deps$routerInt.currentPath;
      var showCallLog = (_this$parentModule$ca = this.parentModule.callLogSection) === null || _this$parentModule$ca === void 0 ? void 0 : _this$parentModule$ca.show;
      var showNotification = (_this$parentModule$ca2 = this.parentModule.callLogSection) === null || _this$parentModule$ca2 === void 0 ? void 0 : _this$parentModule$ca2.showNotification;

      if (showNotification) {
        return "".concat(name, "/Call notification page");
      }

      if (showCallLog) {
        return "".concat(name, "/Call log page");
      }

      if (currentPath === '/calls') {
        return "".concat(name, "/All calls page");
      }

      if (currentPath.includes('/simplifycallctrl')) {
        return "".concat(name, "/Small call control");
      }

      return name;
    }
  }, {
    key: "setCallControlBusyTimestamp",
    value: function setCallControlBusyTimestamp() {
      this.data.busyTimestamp = Date.now();
    }
  }, {
    key: "clearCallControlBusyTimestamp",
    value: function clearCallControlBusyTimestamp() {
      this.data.busyTimestamp = 0;
    }
  }, {
    key: "mute",
    value: function () {
      var _mute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(telephonySessionId) {
        var session, _this$_deps$availabil;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context11.next = 5;
                return session.mute();

              case 5:
                this.clearCallControlBusyTimestamp();
                _context11.next = 23;
                break;

              case 8:
                _context11.prev = 8;
                _context11.t0 = _context11["catch"](0);

                if (!(_context11.t0.response && !_context11.t0.response._text)) {
                  _context11.next = 14;
                  break;
                }

                _context11.next = 13;
                return _context11.t0.response.clone().text();

              case 13:
                _context11.t0.response._text = _context11.sent;

              case 14:
                if (!(0, _helpers.conflictError)(_context11.t0)) {
                  _context11.next = 18;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].muteConflictError
                });

                _context11.next = 22;
                break;

              case 18:
                _context11.next = 20;
                return (_this$_deps$availabil = this._deps.availabilityMonitor) === null || _this$_deps$availabil === void 0 ? void 0 : _this$_deps$availabil.checkIfHAError(_context11.t0);

              case 20:
                if (_context11.sent) {
                  _context11.next = 22;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 22:
                this.clearCallControlBusyTimestamp();

              case 23:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 8]]);
      }));

      function mute(_x3) {
        return _mute.apply(this, arguments);
      }

      return mute;
    }()
  }, {
    key: "unmute",
    value: function () {
      var _unmute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(telephonySessionId) {
        var session, _this$_deps$availabil2;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context12.next = 5;
                return session.unmute();

              case 5:
                this.clearCallControlBusyTimestamp();
                _context12.next = 23;
                break;

              case 8:
                _context12.prev = 8;
                _context12.t0 = _context12["catch"](0);

                if (!(_context12.t0.response && !_context12.t0.response._text)) {
                  _context12.next = 14;
                  break;
                }

                _context12.next = 13;
                return _context12.t0.response.clone().text();

              case 13:
                _context12.t0.response._text = _context12.sent;

              case 14:
                if (!(0, _helpers.conflictError)(_context12.t0)) {
                  _context12.next = 18;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].unMuteConflictError
                });

                _context12.next = 22;
                break;

              case 18:
                _context12.next = 20;
                return (_this$_deps$availabil2 = this._deps.availabilityMonitor) === null || _this$_deps$availabil2 === void 0 ? void 0 : _this$_deps$availabil2.checkIfHAError(_context12.t0);

              case 20:
                if (_context12.sent) {
                  _context12.next = 22;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 22:
                this.clearCallControlBusyTimestamp();

              case 23:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 8]]);
      }));

      function unmute(_x4) {
        return _unmute.apply(this, arguments);
      }

      return unmute;
    }()
  }, {
    key: "transferUnmuteHandler",
    value: function () {
      var _transferUnmuteHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(telephonySessionId) {
        var _session$telephonySes, _session$telephonySes2, session;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });

                if (!(session === null || session === void 0 ? void 0 : (_session$telephonySes = session.telephonySession) === null || _session$telephonySes === void 0 ? void 0 : (_session$telephonySes2 = _session$telephonySes.party) === null || _session$telephonySes2 === void 0 ? void 0 : _session$telephonySes2.muted)) {
                  _context13.next = 5;
                  break;
                }

                _context13.next = 5;
                return session.unmute();

              case 5:
                _context13.next = 9;
                break;

              case 7:
                _context13.prev = 7;
                _context13.t0 = _context13["catch"](0);

              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 7]]);
      }));

      function transferUnmuteHandler(_x5) {
        return _transferUnmuteHandler.apply(this, arguments);
      }

      return transferUnmuteHandler;
    }()
  }, {
    key: "startRecord",
    value: function () {
      var _startRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(telephonySessionId) {
        var session, recordingId, _ref4, _ref4$errors, errors, _iterator, _step, _error;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                recordingId = this.getRecordingId(session);
                _context14.next = 6;
                return session.startRecord({
                  recordingId: recordingId
                });

              case 6:
                this.clearCallControlBusyTimestamp();
                return _context14.abrupt("return", true);

              case 10:
                _context14.prev = 10;
                _context14.t0 = _context14["catch"](0);
                this.clearCallControlBusyTimestamp();
                _context14.next = 15;
                return _context14.t0.response.clone().json();

              case 15:
                _context14.t1 = _context14.sent;

                if (_context14.t1) {
                  _context14.next = 18;
                  break;
                }

                _context14.t1 = {};

              case 18:
                _ref4 = _context14.t1;
                _ref4$errors = _ref4.errors;
                errors = _ref4$errors === void 0 ? [] : _ref4$errors;

                if (errors.length) {
                  _iterator = _createForOfIteratorHelper(errors);

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      _error = _step.value;
                      console.error('record fail:', _error);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }

                  this._deps.alert.danger({
                    message: _webphoneErrors.webphoneErrors.recordError,
                    payload: {
                      errorCode: errors[0].errorCode
                    }
                  });
                }

              case 22:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 10]]);
      }));

      function startRecord(_x6) {
        return _startRecord.apply(this, arguments);
      }

      return startRecord;
    }()
  }, {
    key: "getRecordingId",
    value: function getRecordingId(session) {
      var recording = session.recordings[0];
      var recodingId = recording && recording.id;
      return recodingId;
    }
  }, {
    key: "stopRecord",
    value: function () {
      var _stopRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(telephonySessionId) {
        var session, recordingId;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                recordingId = this.getRecordingId(session);
                _context15.next = 6;
                return session.stopRecord({
                  recordingId: recordingId
                });

              case 6:
                this.clearCallControlBusyTimestamp();
                _context15.next = 14;
                break;

              case 9:
                _context15.prev = 9;
                _context15.t0 = _context15["catch"](0);
                console.log('stop record error:', _context15.t0);
                this.clearCallControlBusyTimestamp();
                throw _context15.t0;

              case 14:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[0, 9]]);
      }));

      function stopRecord(_x7) {
        return _stopRecord.apply(this, arguments);
      }

      return stopRecord;
    }()
  }, {
    key: "hangUp",
    value: function () {
      var _hangUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(telephonySessionId) {
        var session, _this$_deps$availabil3;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context16.next = 5;
                return session.hangup();

              case 5:
                if (typeof this._onCallEndFunc === 'function') {
                  this._onCallEndFunc();
                }

                this.clearCallControlBusyTimestamp();
                _context16.next = 17;
                break;

              case 9:
                _context16.prev = 9;
                _context16.t0 = _context16["catch"](0);
                console.error('hangup error', _context16.t0);
                _context16.next = 14;
                return (_this$_deps$availabil3 = this._deps.availabilityMonitor) === null || _this$_deps$availabil3 === void 0 ? void 0 : _this$_deps$availabil3.checkIfHAError(_context16.t0);

              case 14:
                if (_context16.sent) {
                  _context16.next = 16;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 16:
                this.clearCallControlBusyTimestamp();

              case 17:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[0, 9]]);
      }));

      function hangUp(_x8) {
        return _hangUp.apply(this, arguments);
      }

      return hangUp;
    }()
  }, {
    key: "reject",
    value: function () {
      var _reject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(telephonySessionId) {
        var session, _this$_deps$availabil4;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context17.next = 5;
                return session.toVoicemail();

              case 5:
                if (session && session.webphoneSession) {
                  session.webphoneSession.__rc_isToVoicemail = true;
                }

                this.clearCallControlBusyTimestamp();
                _context17.next = 16;
                break;

              case 9:
                _context17.prev = 9;
                _context17.t0 = _context17["catch"](0);
                _context17.next = 13;
                return (_this$_deps$availabil4 = this._deps.availabilityMonitor) === null || _this$_deps$availabil4 === void 0 ? void 0 : _this$_deps$availabil4.checkIfHAError(_context17.t0);

              case 13:
                if (_context17.sent) {
                  _context17.next = 15;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 15:
                this.clearCallControlBusyTimestamp();

              case 16:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[0, 9]]);
      }));

      function reject(_x9) {
        return _reject.apply(this, arguments);
      }

      return reject;
    }()
  }, {
    key: "switch",
    value: function () {
      var _switch2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(telephonySessionId) {
        var switchedSession, _this$_deps$availabil5;

        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                this.setCallControlBusyTimestamp();
                _context18.next = 4;
                return this.transferUnmuteHandler(telephonySessionId);

              case 4:
                _context18.next = 6;
                return this._rcCall.switchCall(telephonySessionId, {
                  homeCountryId: this._deps.regionSettings.homeCountryId
                });

              case 6:
                switchedSession = _context18.sent;

                this._triggerAutoMergeEvent(telephonySessionId);

                _context18.next = 10;
                return this._holdOtherCalls(telephonySessionId);

              case 10:
                this.clearCallControlBusyTimestamp();

                if (typeof this._onCallSwitchedFunc === 'function') {
                  this._onCallSwitchedFunc(switchedSession.sessionId);
                }

                _context18.next = 21;
                break;

              case 14:
                _context18.prev = 14;
                _context18.t0 = _context18["catch"](0);
                _context18.next = 18;
                return (_this$_deps$availabil5 = this._deps.availabilityMonitor) === null || _this$_deps$availabil5 === void 0 ? void 0 : _this$_deps$availabil5.checkIfHAError(_context18.t0);

              case 18:
                if (_context18.sent) {
                  _context18.next = 20;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 20:
                this.clearCallControlBusyTimestamp();

              case 21:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[0, 14]]);
      }));

      function _switch(_x10) {
        return _switch2.apply(this, arguments);
      }

      return _switch;
    }()
  }, {
    key: "hold",
    value: function () {
      var _hold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(telephonySessionId) {
        var _otherParties$, _otherParties$2, session, webphoneSession, _session$otherParties, otherParties, _this$_deps$availabil6;

        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                webphoneSession = session.webphoneSession, _session$otherParties = session.otherParties, otherParties = _session$otherParties === void 0 ? [] : _session$otherParties;

                if (!( // when call is connecting or in voicemail then call control's Hold API will not work
                // so use webphone hold here
                session.direction === _callDirections.callDirection.outbound && (((_otherParties$ = otherParties[0]) === null || _otherParties$ === void 0 ? void 0 : _otherParties$.status.code) === _Session2.PartyStatusCode.proceeding || ((_otherParties$2 = otherParties[0]) === null || _otherParties$2 === void 0 ? void 0 : _otherParties$2.status.code) === _Session2.PartyStatusCode.voicemail) || (0, _helpers.isAtMainNumberPromptToneStage)(session))) {
                  _context19.next = 9;
                  break;
                }

                _context19.next = 7;
                return webphoneSession.hold();

              case 7:
                _context19.next = 11;
                break;

              case 9:
                _context19.next = 11;
                return session.hold();

              case 11:
                if (webphoneSession && webphoneSession.__rc_callStatus) {
                  webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
                }

                this.clearCallControlBusyTimestamp();
                _context19.next = 30;
                break;

              case 15:
                _context19.prev = 15;
                _context19.t0 = _context19["catch"](0);

                if (!(_context19.t0.response && !_context19.t0.response._text)) {
                  _context19.next = 21;
                  break;
                }

                _context19.next = 20;
                return _context19.t0.response.clone().text();

              case 20:
                _context19.t0.response._text = _context19.sent;

              case 21:
                if (!(0, _helpers.conflictError)(_context19.t0)) {
                  _context19.next = 25;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].holdConflictError
                });

                _context19.next = 29;
                break;

              case 25:
                _context19.next = 27;
                return (_this$_deps$availabil6 = this._deps.availabilityMonitor) === null || _this$_deps$availabil6 === void 0 ? void 0 : _this$_deps$availabil6.checkIfHAError(_context19.t0);

              case 27:
                if (_context19.sent) {
                  _context19.next = 29;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 29:
                this.clearCallControlBusyTimestamp();

              case 30:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[0, 15]]);
      }));

      function hold(_x11) {
        return _hold.apply(this, arguments);
      }

      return hold;
    }()
  }, {
    key: "unhold",
    value: function () {
      var _unhold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(telephonySessionId) {
        var session, webphoneSession, _this$_deps$availabil7;

        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context20.next = 5;
                return this._holdOtherCalls(telephonySessionId);

              case 5:
                _context20.next = 7;
                return session.unhold();

              case 7:
                this._activeSession = session;
                webphoneSession = session.webphoneSession;

                if (webphoneSession && webphoneSession.__rc_callStatus) {
                  webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
                }

                this.setActiveSessionId(telephonySessionId);

                this._addTrackToActiveSession();

                this.clearCallControlBusyTimestamp();
                _context20.next = 30;
                break;

              case 15:
                _context20.prev = 15;
                _context20.t0 = _context20["catch"](0);

                if (!(_context20.t0.response && !_context20.t0.response._text)) {
                  _context20.next = 21;
                  break;
                }

                _context20.next = 20;
                return _context20.t0.response.clone().text();

              case 20:
                _context20.t0.response._text = _context20.sent;

              case 21:
                if (!(0, _helpers.conflictError)(_context20.t0)) {
                  _context20.next = 25;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].unHoldConflictError
                });

                _context20.next = 29;
                break;

              case 25:
                _context20.next = 27;
                return (_this$_deps$availabil7 = this._deps.availabilityMonitor) === null || _this$_deps$availabil7 === void 0 ? void 0 : _this$_deps$availabil7.checkIfHAError(_context20.t0);

              case 27:
                if (_context20.sent) {
                  _context20.next = 29;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 29:
                this.clearCallControlBusyTimestamp();

              case 30:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[0, 15]]);
      }));

      function unhold(_x12) {
        return _unhold.apply(this, arguments);
      }

      return unhold;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(transferNumber, telephonySessionId) {
        var _this10 = this;

        var session, validatedResult, validPhoneNumber, phoneNumber, _this$_deps$availabil8;

        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context22.next = 5;
                return this._deps.numberValidate.validateNumbers([transferNumber]);

              case 5:
                validatedResult = _context22.sent;

                if (validatedResult.result) {
                  _context22.next = 9;
                  break;
                }

                validatedResult.errors.forEach( /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(error) {
                    var _this10$_deps$availab;

                    var isHAError;
                    return regeneratorRuntime.wrap(function _callee21$(_context21) {
                      while (1) {
                        switch (_context21.prev = _context21.next) {
                          case 0:
                            _context21.next = 2;
                            return (_this10$_deps$availab = _this10._deps.availabilityMonitor) === null || _this10$_deps$availab === void 0 ? void 0 : _this10$_deps$availab.checkIfHAError(error);

                          case 2:
                            isHAError = _context21.sent;

                            if (!isHAError) {
                              // TODO: fix `callErrors` type
                              _this10._deps.alert.warning({
                                message: _callErrors["default"][error.type],
                                payload: {
                                  phoneNumber: error.phoneNumber
                                }
                              });
                            }

                          case 4:
                          case "end":
                            return _context21.stop();
                        }
                      }
                    }, _callee21);
                  }));

                  return function (_x15) {
                    return _ref5.apply(this, arguments);
                  };
                }());
                return _context22.abrupt("return");

              case 9:
                // TODO: fix `validatedResult` type in `numberValidate` module.
                validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;
                phoneNumber = validPhoneNumber;

                if (validPhoneNumber.indexOf('+') === -1) {
                  phoneNumber = [this._deps.accountInfo.mainCompanyNumber, validPhoneNumber].join('*');
                }

                session.transfer(phoneNumber);
                this.clearCallControlBusyTimestamp();
                _context22.next = 23;
                break;

              case 16:
                _context22.prev = 16;
                _context22.t0 = _context22["catch"](0);
                _context22.next = 20;
                return (_this$_deps$availabil8 = this._deps.availabilityMonitor) === null || _this$_deps$availabil8 === void 0 ? void 0 : _this$_deps$availabil8.checkIfHAError(_context22.t0);

              case 20:
                if (_context22.sent) {
                  _context22.next = 22;
                  break;
                }

                this._deps.alert.warning({
                  message: _callControlError["default"].generalError
                });

              case 22:
                this.clearCallControlBusyTimestamp();

              case 23:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this, [[0, 16]]);
      }));

      function transfer(_x13, _x14) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }() // Incomplete Implementation?

  }, {
    key: "flip",
    value: function () {
      var _flip = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(flipValue, telephonySessionId) {
        var session;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                _context23.next = 5;
                return session.flip({
                  callFlipId: flipValue
                });

              case 5:
                this.clearCallControlBusyTimestamp();
                _context23.next = 13;
                break;

              case 8:
                _context23.prev = 8;
                _context23.t0 = _context23["catch"](0);
                console.error('flip error', _context23.t0);
                this.clearCallControlBusyTimestamp();
                throw _context23.t0;

              case 13:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this, [[0, 8]]);
      }));

      function flip(_x16, _x17) {
        return _flip.apply(this, arguments);
      }

      return flip;
    }()
  }, {
    key: "forward",
    value: function () {
      var _forward = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(forwardNumber, telephonySessionId) {
        var _this11 = this;

        var _this$_deps, regionSettings, brand, session, validatedResult, validPhoneNumber;

        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _this$_deps = this._deps, regionSettings = _this$_deps.regionSettings, brand = _this$_deps.brand;
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });

                if (session) {
                  _context24.next = 4;
                  break;
                }

                return _context24.abrupt("return", false);

              case 4:
                _context24.prev = 4;

                if (this._permissionCheck) {
                  _context24.next = 10;
                  break;
                }

                validatedResult = (0, _validateNumbers["default"])([forwardNumber], regionSettings, brand.id);
                validPhoneNumber = validatedResult[0];
                _context24.next = 17;
                break;

              case 10:
                _context24.next = 12;
                return this._deps.numberValidate.validateNumbers([forwardNumber]);

              case 12:
                validatedResult = _context24.sent;

                if (validatedResult.result) {
                  _context24.next = 16;
                  break;
                }

                validatedResult.errors.forEach(function (error) {
                  _this11._deps.alert.warning({
                    message: _callErrors["default"][error.type],
                    payload: {
                      phoneNumber: error.phoneNumber
                    }
                  });
                });
                return _context24.abrupt("return", false);

              case 16:
                validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;

              case 17:
                if (session && session.webphoneSession) {
                  session.webphoneSession.__rc_isForwarded = true;
                }

                _context24.next = 20;
                return session.forward(validPhoneNumber, this.acceptOptions);

              case 20:
                this._deps.alert.success({
                  message: _callControlError["default"].forwardSuccess
                });

                if (typeof this._onCallEndFunc === 'function') {
                  this._onCallEndFunc();
                }

                return _context24.abrupt("return", true);

              case 25:
                _context24.prev = 25;
                _context24.t0 = _context24["catch"](4);
                console.error(_context24.t0);

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.forwardError
                });

                return _context24.abrupt("return", false);

              case 30:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this, [[4, 25]]);
      }));

      function forward(_x18, _x19) {
        return _forward.apply(this, arguments);
      }

      return forward;
    }() // DTMF handing by webphone session temporary, due to rc call session doesn't support currently

  }, {
    key: "sendDTMF",
    value: function () {
      var _sendDTMF = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(dtmfValue, telephonySessionId) {
        var session, webphoneSession;
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.prev = 0;
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                }); // TODO: using rc call session

                webphoneSession = session.webphoneSession;

                if (!webphoneSession) {
                  _context25.next = 6;
                  break;
                }

                _context25.next = 6;
                return webphoneSession.dtmf(dtmfValue, 100);

              case 6:
                _context25.next = 12;
                break;

              case 8:
                _context25.prev = 8;
                _context25.t0 = _context25["catch"](0);
                console.log('send dtmf error', _context25.t0);
                throw _context25.t0;

              case 12:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this, [[0, 8]]);
      }));

      function sendDTMF(_x20, _x21) {
        return _sendDTMF.apply(this, arguments);
      }

      return sendDTMF;
    }()
  }, {
    key: "_onWebphoneInvite",
    value: function _onWebphoneInvite(session) {
      var _this12 = this;

      var webphoneSession = session;
      if (!webphoneSession) return;

      if (!webphoneSession.__rc_creationTime) {
        webphoneSession.__rc_creationTime = Date.now();
      }

      if (!webphoneSession.__rc_lastActiveTime) {
        webphoneSession.__rc_lastActiveTime = Date.now();
      }

      webphoneSession.on('terminated', function () {
        console.log('Call Event: terminated'); // this.setLastEndedSessionIds(webphoneSession);

        var _ref6 = _this12.rcCallSessions.find(function (s) {
          return s.webphoneSession === webphoneSession;
        }) || {},
            telephonySessionId = _ref6.telephonySessionId;

        _this12._setActiveSessionIdFromOnHoldCalls(telephonySessionId);
      });
      webphoneSession.on('accepted', function () {
        var _ref7 = _this12.rcCallSessions.find(function (s) {
          return s.webphoneSession === webphoneSession;
        }) || {},
            telephonySessionId = _ref7.telephonySessionId;

        if (_this12._autoMergeWebphoneSessionsMap.get(webphoneSession)) {
          _this12._autoMergeWebphoneSessionsMap["delete"](webphoneSession);
        } else {
          _this12.setActiveSessionId(telephonySessionId);

          _this12._holdOtherCalls(telephonySessionId);

          _this12._addTrackToActiveSession();
        }

        _this12.updateActiveSessions();
      });
    }
    /**
     *if current call is terminated, then pick the first onhold call as active current call;
     *
     * @param {Session} session
     * @memberof ActiveCallControl
     */

  }, {
    key: "_setActiveSessionIdFromOnHoldCalls",
    value: function _setActiveSessionIdFromOnHoldCalls(telephonySessionId) {
      if (!telephonySessionId) return;

      if (this.activeSessionId === telephonySessionId) {
        var onHoldSessions = (0, _ramda.sort)(function (l, r) {
          return (0, _webphoneHelper.sortByCreationTimeDesc)((0, _webphoneHelper.normalizeSession)(l.webphoneSession), (0, _webphoneHelper.normalizeSession)(r.webphoneSession));
        }, (0, _ramda.filter)(function (s) {
          return (0, _helpers.isHolding)(s) && !!s.webphoneSession;
        }, this.rcCallSessions));

        if (onHoldSessions.length) {
          this.setActiveSessionId(onHoldSessions[0].telephonySessionId);
        }
      }
    }
  }, {
    key: "_holdOtherCalls",
    value: function () {
      var _holdOtherCalls2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(telephonySessionId) {
        var otherSessions, holdOtherSessions;
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                otherSessions = (0, _ramda.filter)(function (s) {
                  return s.telephonySessionId !== telephonySessionId && s.status === _Session2.PartyStatusCode.answered && s.webphoneSession && !s.webphoneSession.localHold;
                }, this._rcCall.sessions);

                if (otherSessions.length) {
                  _context27.next = 3;
                  break;
                }

                return _context27.abrupt("return");

              case 3:
                holdOtherSessions = otherSessions.map( /*#__PURE__*/function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(session) {
                    var webphoneSession, _session$otherParties2, otherParties, _otherParties$3, _otherParties$4;

                    return regeneratorRuntime.wrap(function _callee26$(_context26) {
                      while (1) {
                        switch (_context26.prev = _context26.next) {
                          case 0:
                            webphoneSession = session.webphoneSession, _session$otherParties2 = session.otherParties, otherParties = _session$otherParties2 === void 0 ? [] : _session$otherParties2;
                            _context26.prev = 1;

                            if (!( // when call is connecting or in voicemail then call control's Hold API will not work
                            // so use webphone hold here
                            session.direction === _callDirections.callDirection.outbound && (((_otherParties$3 = otherParties[0]) === null || _otherParties$3 === void 0 ? void 0 : _otherParties$3.status.code) === _Session2.PartyStatusCode.proceeding || ((_otherParties$4 = otherParties[0]) === null || _otherParties$4 === void 0 ? void 0 : _otherParties$4.status.code) === _Session2.PartyStatusCode.voicemail) || (0, _helpers.isAtMainNumberPromptToneStage)(session))) {
                              _context26.next = 7;
                              break;
                            }

                            _context26.next = 5;
                            return webphoneSession.hold();

                          case 5:
                            _context26.next = 9;
                            break;

                          case 7:
                            _context26.next = 9;
                            return session.hold();

                          case 9:
                            if (webphoneSession && webphoneSession.__rc_callStatus) {
                              webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.onHold;
                            }

                            _context26.next = 15;
                            break;

                          case 12:
                            _context26.prev = 12;
                            _context26.t0 = _context26["catch"](1);
                            console.log('Hold call fail.', _context26.t0);

                          case 15:
                          case "end":
                            return _context26.stop();
                        }
                      }
                    }, _callee26, null, [[1, 12]]);
                  }));

                  return function (_x23) {
                    return _ref8.apply(this, arguments);
                  };
                }());
                _context27.next = 6;
                return Promise.all(holdOtherSessions);

              case 6:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function _holdOtherCalls(_x22) {
        return _holdOtherCalls2.apply(this, arguments);
      }

      return _holdOtherCalls;
    }()
  }, {
    key: "_answer",
    value: function () {
      var _answer2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(telephonySessionId) {
        var _this$_deps$webphone3, _this$_deps$webphone4;

        var session, webphoneSession, deviceId;
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                this._triggerAutoMergeEvent(telephonySessionId);

                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                this._activeSession = session;
                _context28.next = 6;
                return this._holdOtherCalls(telephonySessionId);

              case 6:
                webphoneSession = session.webphoneSession;
                deviceId = (_this$_deps$webphone3 = this._deps.webphone) === null || _this$_deps$webphone3 === void 0 ? void 0 : (_this$_deps$webphone4 = _this$_deps$webphone3.device) === null || _this$_deps$webphone4 === void 0 ? void 0 : _this$_deps$webphone4.id;
                _context28.next = 10;
                return session.answer({
                  deviceId: deviceId
                });

              case 10:
                if (webphoneSession && webphoneSession.__rc_callStatus) {
                  webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
                }

                this.clearCallControlBusyTimestamp();

              case 12:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function _answer(_x24) {
        return _answer2.apply(this, arguments);
      }

      return _answer;
    }()
  }, {
    key: "answer",
    value: function () {
      var _answer3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(telephonySessionId) {
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.prev = 0;
                _context29.next = 3;
                return this._answer(telephonySessionId);

              case 3:
                _context29.next = 8;
                break;

              case 5:
                _context29.prev = 5;
                _context29.t0 = _context29["catch"](0);
                console.log('answer failed.');

              case 8:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this, [[0, 5]]);
      }));

      function answer(_x25) {
        return _answer3.apply(this, arguments);
      }

      return answer;
    }()
  }, {
    key: "answerAndHold",
    value: function () {
      var _answerAndHold = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(telephonySessionId) {
        return regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.prev = 0;
                _context30.next = 3;
                return this._answer(telephonySessionId);

              case 3:
                _context30.next = 8;
                break;

              case 5:
                _context30.prev = 5;
                _context30.t0 = _context30["catch"](0);
                console.log('answer hold failed.', _context30.t0);

              case 8:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this, [[0, 5]]);
      }));

      function answerAndHold(_x26) {
        return _answerAndHold.apply(this, arguments);
      }

      return answerAndHold;
    }()
    /**
     * ignore an incoming WebRTC call, after action executed, call will be ignored at current
     * device and move to "calls on other device" section. This call still can be answered at other
     * device
     * @param {string} telephonySessionId
     * @memberof ActiveCallControl
     */

  }, {
    key: "ignore",
    value: function () {
      var _ignore = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(telephonySessionId) {
        var _this13 = this;

        var session, webphoneSession;
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.prev = 0;
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                webphoneSession = session.webphoneSession;
                _context31.next = 6;
                return webphoneSession.reject();

              case 6:
                // hack for update sessions, then incoming call log page can re-render
                setTimeout(function () {
                  return _this13.updateActiveSessions();
                }, 0);
                this.clearCallControlBusyTimestamp();
                _context31.next = 13;
                break;

              case 10:
                _context31.prev = 10;
                _context31.t0 = _context31["catch"](0);
                console.log('ignore failed.', _context31.t0);

              case 13:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this, [[0, 10]]);
      }));

      function ignore(_x27) {
        return _ignore.apply(this, arguments);
      }

      return ignore;
    }()
  }, {
    key: "answerAndEnd",
    value: function () {
      var _answerAndEnd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(telephonySessionId) {
        var _this$_deps$webphone5, _this$_deps$webphone6, session, currentActiveCall, deviceId, webphoneSession;

        return regeneratorRuntime.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.prev = 0;

                if (!this.busy) {
                  _context32.next = 3;
                  break;
                }

                return _context32.abrupt("return");

              case 3:
                this.setCallControlBusyTimestamp();
                session = this._rcCall.sessions.find(function (s) {
                  return s.id === telephonySessionId;
                });
                currentActiveCall = this._rcCall.sessions.find(function (s) {
                  return s.id !== telephonySessionId && s.webphoneSession && s.status === _Session2.PartyStatusCode.answered;
                });

                if (!currentActiveCall) {
                  _context32.next = 9;
                  break;
                }

                _context32.next = 9;
                return currentActiveCall.hangup();

              case 9:
                deviceId = (_this$_deps$webphone5 = this._deps.webphone) === null || _this$_deps$webphone5 === void 0 ? void 0 : (_this$_deps$webphone6 = _this$_deps$webphone5.device) === null || _this$_deps$webphone6 === void 0 ? void 0 : _this$_deps$webphone6.id;
                _context32.next = 12;
                return session.answer({
                  deviceId: deviceId
                });

              case 12:
                webphoneSession = session.webphoneSession;

                if (webphoneSession && webphoneSession.__rc_callStatus) {
                  webphoneSession.__rc_callStatus = _sessionStatus.sessionStatus.connected;
                }

                this.clearCallControlBusyTimestamp();
                _context32.next = 21;
                break;

              case 17:
                _context32.prev = 17;
                _context32.t0 = _context32["catch"](0);
                console.log('answer and end fail.');
                console.error(_context32.t0);

              case 21:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this, [[0, 17]]);
      }));

      function answerAndEnd(_x28) {
        return _answerAndEnd.apply(this, arguments);
      }

      return answerAndEnd;
    }()
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(params) {
        var _this14 = this;

        var phoneLines, sdkMakeCallParams, session;
        return regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.prev = 0;

                if (!(params.toNumber.length > 6 && (!this._deps.availabilityMonitor || !this._deps.availabilityMonitor.isVoIPOnlyMode))) {
                  _context33.next = 8;
                  break;
                }

                _context33.next = 4;
                return this._fetchDL();

              case 4:
                phoneLines = _context33.sent;

                if (!(phoneLines.length === 0)) {
                  _context33.next = 8;
                  break;
                }

                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.noOutboundCallWithoutDL
                });

                return _context33.abrupt("return", null);

              case 8:
                _context33.next = 10;
                return this._holdOtherCalls();

              case 10:
                sdkMakeCallParams = {
                  // type 'callControl' not support webphone's sip device currently.
                  type: 'webphone',
                  toNumber: params.toNumber,
                  fromNumber: params.fromNumber,
                  homeCountryId: params.homeCountryId
                };
                _context33.next = 13;
                return this._rcCall.makeCall(sdkMakeCallParams);

              case 13:
                session = _context33.sent;
                this._activeSession = session;
                session.webphoneSession.on('progress', function () {
                  if (session.telephonySessionId && _this14.activeSessionId !== session.telephonySessionId) {
                    _this14.setActiveSessionId(session.telephonySessionId);
                  }
                });

                this._triggerAutoMergeEvent();

                return _context33.abrupt("return", session);

              case 20:
                _context33.prev = 20;
                _context33.t0 = _context33["catch"](0);
                console.log('make call fail.', _context33.t0);

              case 23:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this, [[0, 20]]);
      }));

      function makeCall(_x29) {
        return _makeCall.apply(this, arguments);
      }

      return makeCall;
    }()
  }, {
    key: "_fetchDL",
    value: function () {
      var _fetchDL2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34() {
        var response, devices, phoneLines;
        return regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                _context34.next = 2;
                return this._deps.client.account().extension().device().list();

              case 2:
                response = _context34.sent;
                devices = response.records;
                phoneLines = [];
                devices.forEach(function (device) {
                  // wrong type of phoneLines, temporary treat it as any
                  if (!device.phoneLines || device.phoneLines.length === 0) {
                    return;
                  }

                  phoneLines = phoneLines.concat(device.phoneLines);
                });
                return _context34.abrupt("return", phoneLines);

              case 7:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      function _fetchDL() {
        return _fetchDL2.apply(this, arguments);
      }

      return _fetchDL;
    }()
  }, {
    key: "getActiveSession",
    value: function getActiveSession(telephonySessionId) {
      return this.activeSessions[telephonySessionId];
    }
  }, {
    key: "getRcCallSession",
    value: function getRcCallSession(telephoneSessionId) {
      return this.rcCallSessions.find(function (session) {
        return session.telephonySessionId === telephoneSessionId;
      });
    }
  }, {
    key: "dialpadOpenTrack",
    value: function dialpadOpenTrack() {}
  }, {
    key: "dialpadCloseTrack",
    value: function dialpadCloseTrack() {}
  }, {
    key: "clickTransferTrack",
    value: function clickTransferTrack() {}
  }, {
    key: "clickForwardTrack",
    value: function clickForwardTrack() {}
  }, {
    key: "clickSwitchTrack",
    value: function clickSwitchTrack() {}
  }, {
    key: "activeSession",
    get: function get() {
      return this.getActiveSession(this.activeSessionId);
    }
  }, {
    key: "activeSessions",
    get: function get() {
      // TODO: add calls type in callMonitor modules
      var reducer = function reducer(accumulator, session) {
        var id = session.id;
        accumulator[id] = (0, _helpers.normalizeSession)({
          session: session
        });
        return accumulator;
      };

      return this.sessions.reduce(reducer, {});
    }
  }, {
    key: "sessionIdToTelephonySessionIdMapping",
    get: function get() {
      // TODO: add calls type in callMonitor modules
      var reducer = function reducer(accumulator, call) {
        var telephonySessionId = call.telephonySessionId,
            sessionId = call.sessionId;
        accumulator[sessionId] = telephonySessionId;
        return accumulator;
      };

      return this._deps.presence.calls.reduce(reducer, {});
    }
    /**
     * Mitigation strategy for avoiding 404/409 on call control endpoings.
     * This should gradually move towards per session controls rather than
     * a global busy timeout.
     */

  }, {
    key: "busy",
    get: function get() {
      return Date.now() - this.busyTimestamp < DEFAULT_BUSY_TIMEOUT;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._deps.rolesAndPermissions.ringoutEnabled;
    }
  }, {
    key: "timeToRetry",
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    }
  }, {
    key: "acceptOptions",
    get: function get() {
      var _this$_deps$audioSett;

      return {
        sessionDescriptionHandlerOptions: {
          constraints: {
            audio: {
              deviceId: (_this$_deps$audioSett = this._deps.audioSettings) === null || _this$_deps$audioSett === void 0 ? void 0 : _this$_deps$audioSett.inputDeviceId
            },
            video: false
          }
        }
      };
    }
  }, {
    key: "hasCallInRecording",
    get: function get() {
      return this.sessions.some(function (session) {
        return (0, _helpers.isRecording)(session);
      });
    }
  }, {
    key: "rcCallSessions",
    get: function get() {
      var _this$_rcCall3;

      // workaround of bug:
      // switch an inbound call then call direction will change to outbound
      return (0, _ramda.filter)(function (session) {
        var party = session.party,
            otherParties = session.otherParties,
            direction = session.direction,
            status = session.status;

        if (direction === _callDirections.callDirection.outbound && status !== _Session2.PartyStatusCode.disconnected) {
          var inboundSwitchedParty = (0, _helpers.getInboundSwitchedParty)(otherParties);

          if (inboundSwitchedParty) {
            party.direction = inboundSwitchedParty.direction;
            party.to = inboundSwitchedParty.to;
            party.from = inboundSwitchedParty.from;
          }
        }

        return session.status !== _Session2.PartyStatusCode.disconnected;
      }, ((_this$_rcCall3 = this._rcCall) === null || _this$_rcCall3 === void 0 ? void 0 : _this$_rcCall3.sessions) || []);
    }
  }, {
    key: "activeSessionId",
    get: function get() {
      return this.data.activeSessionId;
    }
  }, {
    key: "busyTimestamp",
    get: function get() {
      return this.data.busyTimestamp;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.data.timestamp;
    }
  }, {
    key: "sessions",
    get: function get() {
      return this.data.sessions;
    }
  }]);

  return ActiveCallControl;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      activeSessionId: null,
      busyTimestamp: 0,
      timestamp: 0,
      sessions: []
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lastEndedSessionIds", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cachedSessions", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "resetState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateActiveSessions", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "updateActiveSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeActiveSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeActiveSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setActiveSessionId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setActiveSessionId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastEndedSessionIds", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastEndedSessionIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallControlBusyTimestamp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearCallControlBusyTimestamp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearCallControlBusyTimestamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unmute", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "unmute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecord", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecord", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecord"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hangUp", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "hangUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reject", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "reject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switch", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "switch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hold", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "hold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unhold", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "unhold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transfer", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "transfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forward", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "forward"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answer", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "answer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answerAndHold", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "answerAndHold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ignore", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "ignore"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "answerAndEnd", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "answerAndEnd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSession", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "activeSessions", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "activeSessions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "sessionIdToTelephonySessionIdMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialpadOpenTrack", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "dialpadOpenTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dialpadCloseTrack", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "dialpadCloseTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickTransferTrack", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "clickTransferTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickForwardTrack", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "clickForwardTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickSwitchTrack", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "clickSwitchTrack"), _class2.prototype)), _class2)) || _class);
exports.ActiveCallControl = ActiveCallControl;
//# sourceMappingURL=ActiveCallControl.js.map

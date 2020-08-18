"use strict";

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.sort");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.match");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _di = require("../../lib/di");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getCallMonitorReducer = _interopRequireWildcard(require("./getCallMonitorReducer"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _normalizeNumber = _interopRequireDefault(require("../../lib/normalizeNumber"));

var _callMonitorHelper = require("./callMonitorHelper");

var _selector = require("../../lib/selector");

var _callLogHelpers = require("../../lib/callLogHelpers");

var _webphoneHelper = require("../Webphone/webphoneHelper");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var CallMonitor = (
/**
 * @class
 * @description active calls monitor module
 */
_dec = (0, _di.Module)({
  deps: ['AccountInfo', 'Storage', 'Presence', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'Call',
    optional: true
  }, {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'CallMonitorOptions',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(CallMonitor, _RcModule);

  var _super = _createSuper(CallMonitor);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Call} params.call - call module instance
   * @param {ConferenceCall} params.conferenceCall - conference call module instance
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   * @param {Presence} params.presence - presence module instance
   * @param {ActivityMatcher} params.activityMatcher - activityMatcher module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   * @param {Webphone} params.webphone - webphone module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Function} params.onRinging - function on ring
   * @param {Function} params.onNewCall - function on new call
   * @param {Function} params.onCallUpdated - function on call updated
   * @param {Function} params.onCallEnded - function on call ended
   */
  function CallMonitor(_ref) {
    var _this;

    var call = _ref.call,
        conferenceCall = _ref.conferenceCall,
        accountInfo = _ref.accountInfo,
        presence = _ref.presence,
        activityMatcher = _ref.activityMatcher,
        contactMatcher = _ref.contactMatcher,
        tabManager = _ref.tabManager,
        webphone = _ref.webphone,
        onRinging = _ref.onRinging,
        onNewCall = _ref.onNewCall,
        onCallUpdated = _ref.onCallUpdated,
        onCallEnded = _ref.onCallEnded,
        storage = _ref.storage,
        options = _objectWithoutProperties(_ref, ["call", "conferenceCall", "accountInfo", "presence", "activityMatcher", "contactMatcher", "tabManager", "webphone", "onRinging", "onNewCall", "onCallUpdated", "onCallEnded", "storage"]);

    _classCallCheck(this, CallMonitor);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));

    _initializerDefineProperty(_this, "allCalls", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "normalizedCalls", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "calls", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "activeRingCalls", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_activeOnHoldCalls", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_activeCurrentCalls", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "activeOnHoldCalls", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "activeCurrentCalls", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "otherDeviceCalls", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "uniqueNumbers", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sessionIds", _descriptor11, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "ringoutRingCalls", _descriptor12, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "ringoutCurrentCalls", _descriptor13, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "ringoutOnHoldCalls", _descriptor14, _assertThisInitialized(_this));

    _this._call = call;
    _this._conferenceCall = conferenceCall;
    _this._accountInfo = _ensureExist["default"].call(_assertThisInitialized(_this), accountInfo, 'accountInfo');
    _this._presence = _ensureExist["default"].call(_assertThisInitialized(_this), presence, 'presence');
    _this._contactMatcher = contactMatcher;
    _this._activityMatcher = activityMatcher;
    _this._tabManager = tabManager;
    _this._webphone = webphone;
    _this._onNewCall = onNewCall;
    _this._onCallUpdated = onCallUpdated;
    _this._onCallEnded = onCallEnded;
    _this._storage = _ensureExist["default"].call(_assertThisInitialized(_this), storage, 'storage');
    _this._callMatchedKey = 'callMatched';
    _this._onRinging = onRinging; // change _onRinging hook to array lsit

    _this._onRingingFuncs = [];
    _this._reducer = (0, _getCallMonitorReducer["default"])(_this.actionTypes);

    _this._storage.registerReducer({
      key: _this._callMatchedKey,
      reducer: (0, _getCallMonitorReducer.getCallMatchedReducer)(_this.actionTypes)
    });

    _this._normalizedCalls = null;

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._accountInfo.ready && _this._presence.ready;
        }
      });
    }

    if (_this._activityMatcher) {
      _this._activityMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.sessionIds;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._presence.ready;
        }
      });
    }

    _this._lastProcessedNumbers = null;
    _this._lastProcessedCalls = null;
    _this._lastProcessedIds = null;
    return _this;
  }

  _createClass(CallMonitor, [{
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var uniqueNumbers, newNumbers, sessionIds, newSessions, oldCalls, entities;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ((!this._call || this._call.ready) && (!this._conferenceCall || this._conferenceCall.ready) && this._accountInfo.ready && this._presence.ready && (!this._contactMatcher || this._contactMatcher.ready) && (!this._activityMatcher || this._activityMatcher.ready) && (!this._tabManager || this._tabManager.ready) && this._storage.ready && this.pending) {
                  this.store.dispatch({
                    type: this.actionTypes.init
                  });
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                } else if ((this._call && !this._call.ready || this._conferenceCall && !this._conferenceCall.ready || !this._accountInfo.ready || !this._presence.ready || this._contactMatcher && !this._contactMatcher.ready || this._activityMatcher && !this._activityMatcher.ready || this._tabManager && !this._tabManager.ready || !this._storage.ready) && this.ready) {
                  this.store.dispatch({
                    type: this.actionTypes.reset
                  });
                  this._lastProcessedCalls = null;
                  this._lastProcessedIds = null;
                  this._lastProcessedNumbers = null;
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                } else if (this.ready) {
                  uniqueNumbers = this.uniqueNumbers;

                  if (this._lastProcessedNumbers !== uniqueNumbers && (!this._tabManager || this._tabManager.active)) {
                    newNumbers = (0, _ramda.difference)(uniqueNumbers, this._lastProcessedNumbers || []);
                    this._lastProcessedNumbers = uniqueNumbers;

                    if (this._contactMatcher && this._contactMatcher.ready) {
                      this._contactMatcher.match({
                        queries: newNumbers,
                        ignoreQueue: true
                      });
                    }
                  }

                  sessionIds = this.sessionIds;

                  if (this._lastProcessedIds !== sessionIds && (!this._tabManager || this._tabManager.active)) {
                    newSessions = (0, _ramda.difference)(sessionIds, this._lastProcessedIds || []);
                    this._lastProcessedIds = sessionIds;

                    if (this._activityMatcher && this._activityMatcher.ready) {
                      this._activityMatcher.match({
                        queries: newSessions,
                        ignoreQueue: true
                      });
                    }
                  }

                  if (this._lastProcessedCalls !== this.calls) {
                    oldCalls = this._lastProcessedCalls && this._lastProcessedCalls.slice() || [];
                    this._lastProcessedCalls = this.calls; // no ringing calls

                    if (this._call && oldCalls.length !== 0 && this.calls.length === 0 && this._call.toNumberEntities && this._call.toNumberEntities.length !== 0) {
                      // console.log('no calls clean to number:');
                      this._call.cleanToNumberEntities();
                    }

                    entities = this._call ? (0, _ramda.sort)(_callLogHelpers.sortByStartTime, this._call.toNumberEntities) : []; // const matchedMap = {};

                    (0, _ramda.forEach)(function (call) {
                      var oldCallIndex = (0, _ramda.findIndex)(function (item) {
                        return item.sessionId === call.sessionId;
                      }, oldCalls);

                      if (oldCallIndex === -1) {
                        if (typeof _this2._onNewCall === 'function') {
                          _this2._onNewCall(call);
                        } // loop to execut the onRinging handlers


                        if ((0, _callLogHelpers.isRinging)(call)) {
                          if (_this2._onRinging && typeof _this2._onRinging === 'function') {
                            _this2._onRinging(call);
                          }

                          if (Array.isArray(_this2._onRingingFuncs) && _this2._onRingingFuncs.length) {
                            _this2._onRingingFuncs.forEach(function (func) {
                              if (func && typeof func === 'function') {
                                func(call);
                              }
                            });
                          }
                        }
                      } else {
                        var oldCall = oldCalls[oldCallIndex];
                        oldCalls.splice(oldCallIndex, 1);

                        if (call.telephonyStatus !== oldCall.telephonyStatus || (oldCall.from && oldCall.from.phoneNumber) !== (call.from && call.from.phoneNumber)) {
                          if (typeof _this2._onCallUpdated === 'function') {
                            _this2._onCallUpdated(call);
                          }

                          if (call.telephonyStatus === 'CallConnected') {
                            if ((0, _callLogHelpers.isInbound)(call)) {
                              _this2.store.dispatch({
                                type: _this2.actionTypes.inboundCallConnectedTrack
                              });
                            } else {
                              _this2.store.dispatch({
                                type: _this2.actionTypes.outboundCallConnectedTrack
                              });
                            }
                          }
                        }
                      }

                      (0, _ramda.find)(function (entity, index) {
                        var toEntity = (0, _ramda.find)(function (toMatch) {
                          return toMatch.id === entity.entityId;
                        }, call.toMatches);

                        if (toEntity !== undefined) {
                          entities = _this2._removeMatched(index, entities);

                          _this2._setMatchedData({
                            sessionId: call.sessionId,
                            toEntityId: toEntity.id
                          });

                          return true;
                        }

                        return false;
                      }, entities);
                    }, this.calls);
                    (0, _ramda.forEach)(function (call) {
                      if (typeof _this2._onCallEnded === 'function') {
                        _this2._onCallEnded(call);
                      }
                    }, oldCalls);
                  }
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "initialize",
    value: function initialize() {
      var _this3 = this;

      this.store.subscribe(function () {
        return _this3._onStateChange();
      });
    }
  }, {
    key: "_removeMatched",
    value: function _removeMatched(index, entities) {
      console.log('removeMatched:', index);
      entities.splice(index, 1);
      console.log('entities after splice:', entities);
      return entities;
    }
  }, {
    key: "_setMatchedData",
    value: function _setMatchedData(matched) {
      this.store.dispatch(_objectSpread({
        type: this.actionTypes.setData
      }, matched));
    } // user action track funtions

  }, {
    key: "callItemClickTrack",
    value: function callItemClickTrack() {
      this.store.dispatch({
        type: this.actionTypes.callItemClickTrack
      });
    }
  }, {
    key: "allCallsClickHoldTrack",
    value: function allCallsClickHoldTrack() {
      this.store.dispatch({
        type: this.actionTypes.allCallsClickHoldTrack
      });
    }
  }, {
    key: "allCallsClickHangupTrack",
    value: function allCallsClickHangupTrack() {
      this.store.dispatch({
        type: this.actionTypes.allCallsClickHangupTrack
      });
    }
  }, {
    key: "allCallsClickRejectTrack",
    value: function allCallsClickRejectTrack() {
      this.store.dispatch({
        type: this.actionTypes.allCallsClickRejectTrack
      });
    }
  }, {
    key: "callControlClickAddTrack",
    value: function callControlClickAddTrack() {
      this.store.dispatch({
        type: this.actionTypes.callControlClickAddTrack
      });
    }
  }, {
    key: "mergeControlClickHangupTrack",
    value: function mergeControlClickHangupTrack() {
      this.store.dispatch({
        type: this.actionTypes.mergeControlClickHangupTrack
      });
    }
  }, {
    key: "callControlClickMergeTrack",
    value: function callControlClickMergeTrack() {
      this.store.dispatch({
        type: this.actionTypes.callControlClickMergeTrack
      });
    }
  }, {
    key: "confirmMergeClickCloseTrack",
    value: function confirmMergeClickCloseTrack() {
      this.store.dispatch({
        type: this.actionTypes.confirmMergeClickCloseTrack
      });
    }
  }, {
    key: "confirmMergeClickMergeTrack",
    value: function confirmMergeClickMergeTrack() {
      this.store.dispatch({
        type: this.actionTypes.confirmMergeClickMergeTrack
      });
    }
  }, {
    key: "callsOnHoldClickAddTrack",
    value: function callsOnHoldClickAddTrack() {
      this.store.dispatch({
        type: this.actionTypes.callsOnHoldClickAddTrack
      });
    }
  }, {
    key: "callsOnHoldClickMergeTrack",
    value: function callsOnHoldClickMergeTrack() {
      this.store.dispatch({
        type: this.actionTypes.callsOnHoldClickMergeTrack
      });
    }
  }, {
    key: "callsOnHoldClickHangupTrack",
    value: function callsOnHoldClickHangupTrack() {
      this.store.dispatch({
        type: this.actionTypes.callsOnHoldClickHangupTrack
      });
    }
  }, {
    key: "callControlClickParticipantAreaTrack",
    value: function callControlClickParticipantAreaTrack() {
      this.store.dispatch({
        type: this.actionTypes.callControlClickParticipantAreaClickTrack
      });
    }
  }, {
    key: "onRingings",
    value: function onRingings(func) {
      this._onRingingFuncs.push(func);
    }
  }, {
    key: "hasRingingCalls",
    get: function get() {
      return (0, _callLogHelpers.hasRingingCalls)(this.calls);
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "callMatched",
    get: function get() {
      return this._storage.getItem(this._callMatchedKey);
    }
  }]);

  return CallMonitor;
}(_RcModule2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "allCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4.normalizedCalls;
    }, function () {
      return _this4._contactMatcher && _this4._contactMatcher.dataMapping;
    }, function () {
      return _this4._activityMatcher && _this4._activityMatcher.dataMapping;
    }, function () {
      return _this4.callMatched;
    }, function (normalizedCalls) {
      var contactMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var activityMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callMatched = arguments.length > 3 ? arguments[3] : undefined;
      var calls = (0, _ramda.map)(function (callItem) {
        var fromNumber = callItem.from && callItem.from.phoneNumber;
        var toNumber = callItem.to && callItem.to.phoneNumber;
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        var toNumberEntity = callMatched[callItem.sessionId];
        return _objectSpread(_objectSpread({}, callItem), {}, {
          fromMatches: fromMatches,
          toMatches: toMatches,
          activityMatches: activityMapping[callItem.sessionId] || [],
          toNumberEntity: toNumberEntity
        });
      }, normalizedCalls);
      return calls;
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "normalizedCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5._presence.calls;
    }, function () {
      return _this5._accountInfo.countryCode;
    }, function () {
      return _this5._webphone && _this5._webphone.sessions;
    }, function () {
      return _this5._webphone && _this5._webphone.cachedSessions;
    }, function (callsFromPresence, countryCode, sessions, cachedSessions) {
      // match cached calls
      var cachedCalls = [];

      if (_this5._normalizedCalls && cachedSessions && cachedSessions.length) {
        cachedCalls = (0, _ramda.filter)(function (x) {
          return x.webphoneSession && (0, _ramda.find)(function (i) {
            return i.id === x.webphoneSession.id;
          }, cachedSessions);
        }, _this5._normalizedCalls);
      } // combine


      var combinedCalls = _toConsumableArray(callsFromPresence); // clone


      (0, _ramda.forEach)(function (cachedCall) {
        if (!(0, _ramda.find)(function (x) {
          return x.id === cachedCall.id;
        }, callsFromPresence)) {
          combinedCalls.push(cachedCall);
        }
      }, cachedCalls); // mapping and sort

      var theSessions = sessions || [];
      _this5._normalizedCalls = (0, _ramda.sort)(function (l, r) {
        return (0, _webphoneHelper.sortByLastActiveTimeDesc)(l.webphoneSession, r.webphoneSession);
      }, (0, _ramda.map)(function (callItem) {
        // use account countryCode to normalize number due to API issues [RCINT-3419]
        var fromNumber = (0, _normalizeNumber["default"])({
          phoneNumber: callItem.from && callItem.from.phoneNumber,
          countryCode: countryCode
        });
        var toNumber = (0, _normalizeNumber["default"])({
          phoneNumber: callItem.to && callItem.to.phoneNumber,
          countryCode: countryCode
        });
        var webphoneSession = (0, _callMonitorHelper.matchWephoneSessionWithAcitveCall)(theSessions, callItem);
        theSessions = (0, _ramda.filter)(function (x) {
          return x !== webphoneSession;
        }, theSessions);
        return _objectSpread(_objectSpread({}, callItem), {}, {
          from: {
            phoneNumber: fromNumber
          },
          to: {
            phoneNumber: toNumber
          },
          startTime: webphoneSession && webphoneSession.startTime || callItem.startTime,
          webphoneSession: webphoneSession
        });
      }, combinedCalls));
      return _this5._normalizedCalls;
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "calls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.allCalls;
    }, function () {
      return _this6._conferenceCall && _this6._conferenceCall.isMerging;
    }, function (calls, isMerging) {
      return (0, _ramda.filter)(function (callItem) {
        // filtering out the conferece during merging
        if (isMerging) {
          return !(0, _webphoneHelper.isConferenceSession)(callItem.webphoneSession);
        }

        return true;
      }, calls);
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "activeRingCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7.calls;
    }, function (calls) {
      return (0, _ramda.filter)(function (callItem) {
        return callItem.webphoneSession && (0, _webphoneHelper.isRing)(callItem.webphoneSession);
      }, calls);
    }];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_activeOnHoldCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8.calls;
    }, function (calls) {
      return (0, _ramda.filter)(function (callItem) {
        return callItem.webphoneSession && (0, _webphoneHelper.isOnHold)(callItem.webphoneSession);
      }, calls);
    }];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_activeCurrentCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return [function () {
      return _this9.calls;
    }, function (calls) {
      return (0, _ramda.filter)(function (callItem) {
        return callItem.webphoneSession && !(0, _webphoneHelper.isOnHold)(callItem.webphoneSession) && !(0, _webphoneHelper.isRing)(callItem.webphoneSession);
      }, calls);
    }];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "activeOnHoldCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this10 = this;

    return [function () {
      return _this10._activeOnHoldCalls;
    }, function () {
      return _this10._activeCurrentCalls;
    }, function (_activeOnHoldCalls, _activeCurrentCalls) {
      return _activeOnHoldCalls.length && !_activeCurrentCalls.length ? _activeOnHoldCalls.slice(1) : _activeOnHoldCalls;
    }];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "activeCurrentCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this11 = this;

    return [function () {
      return _this11._activeCurrentCalls;
    }, function () {
      return _this11._activeOnHoldCalls;
    }, function (_activeCurrentCalls, _activeOnHoldCalls) {
      return !_activeCurrentCalls.length && _activeOnHoldCalls.length ? _activeOnHoldCalls.slice(0, 1) : _activeCurrentCalls;
    }];
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "otherDeviceCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this12 = this;

    return [function () {
      return _this12.calls;
    }, function () {
      return _this12._webphone && _this12._webphone.lastEndedSessions;
    }, function (calls, lastEndedSessions) {
      return (0, _ramda.reduce)(function (_ref2, callItem) {
        var sessionsCache = _ref2.sessionsCache,
            res = _ref2.res;

        if (callItem.webphoneSession) {
          return {
            sessionsCache: sessionsCache,
            res: res
          };
        }

        if (!sessionsCache || !sessionsCache.length) {
          return {
            sessionsCache: sessionsCache,
            res: [].concat(_toConsumableArray(res), [callItem])
          };
        }

        var endCall = (0, _callMonitorHelper.matchWephoneSessionWithAcitveCall)(sessionsCache, [].concat(_toConsumableArray(res), [callItem]));
        return {
          sessionsCache: (0, _ramda.filter)(function (x) {
            return x !== endCall;
          }, sessionsCache),
          res: endCall ? res : [].concat(_toConsumableArray(res), [callItem])
        };
      }, {
        sessionsCache: lastEndedSessions,
        res: []
      }, calls).res;
    }];
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this13 = this;

    return [function () {
      return _this13.normalizedCalls;
    }, function (normalizedCalls) {
      var output = [];
      var numberMap = {};

      function addIfNotExist(number) {
        if (!numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }

      (0, _ramda.forEach)(function (callItem) {
        if (callItem.from && callItem.from.phoneNumber) {
          addIfNotExist(callItem.from.phoneNumber);
        }

        if (callItem.to && callItem.to.phoneNumber) {
          addIfNotExist(callItem.to.phoneNumber);
        }
      }, normalizedCalls);
      return output;
    }];
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "sessionIds", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this14 = this;

    return [function () {
      return _this14._presence.calls;
    }, function (calls) {
      return (0, _ramda.map)(function (callItem) {
        return callItem.sessionId;
      }, calls);
    }];
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "ringoutRingCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this15 = this;

    return [function () {
      return _this15.otherDeviceCalls;
    }, function (otherDeviceCalls) {
      return (0, _ramda.filter)(function (callItem) {
        return (0, _callLogHelpers.isRingingInboundCall)(callItem);
      }, otherDeviceCalls);
    }];
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "ringoutCurrentCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this16 = this;

    return [function () {
      return _this16.otherDeviceCalls;
    }, function (otherDeviceCalls) {
      return (0, _ramda.filter)(function (callItem) {
        return !(0, _callLogHelpers.isRingingInboundCall)(callItem) && !(0, _callLogHelpers.isOnHold)(callItem);
      }, otherDeviceCalls);
    }];
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "ringoutOnHoldCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this17 = this;

    return [function () {
      return _this17.otherDeviceCalls;
    }, function (otherDeviceCalls) {
      return (0, _ramda.filter)(function (callItem) {
        return (0, _callLogHelpers.isOnHold)(callItem);
      }, otherDeviceCalls);
    }];
  }
})), _class2)) || _class);
exports["default"] = CallMonitor;
//# sourceMappingURL=index.js.map

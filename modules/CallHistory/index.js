"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _callLogHelpers = require("../../lib/callLogHelpers");

var _debounce = _interopRequireDefault(require("../../lib/debounce"));

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _normalizeNumber = _interopRequireDefault(require("../../lib/normalizeNumber"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _selector = require("../../lib/selector");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getCallHistoryReducer = _interopRequireWildcard(require("./getCallHistoryReducer"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var CallHistory = ( // const DEBOUNDCE_THRESHOLD = 800;
// const DEBOUNDCE_IMMEDIATE = false;

/**
 * @class
 * @description Call history managing module
 */
_dec = (0, _di.Module)({
  deps: ['AccountInfo', 'CallLog', 'CallMonitor', 'Locale', {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'CallHistoryOptions',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(CallHistory, _RcModule);

  var _super = _createSuper(CallHistory);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   * @param {CallLog} params.callLog - callLog module instance
   * @param {CallMonitor} params.callMonitor - callMonitor module instance
   * @param {ActivityMatcher} params.activityMatcher - activityMatcher module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   */
  function CallHistory(_ref) {
    var _this;

    var accountInfo = _ref.accountInfo,
        callLog = _ref.callLog,
        callMonitor = _ref.callMonitor,
        locale = _ref.locale,
        storage = _ref.storage,
        activityMatcher = _ref.activityMatcher,
        contactMatcher = _ref.contactMatcher,
        tabManager = _ref.tabManager,
        options = _objectWithoutProperties(_ref, ["accountInfo", "callLog", "callMonitor", "locale", "storage", "activityMatcher", "contactMatcher", "tabManager"]);

    _classCallCheck(this, CallHistory);

    _this = _super.call(this, _objectSpread({}, options));

    _initializerDefineProperty(_this, "normalizedCalls", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "calls", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "latestCalls", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "uniqueNumbers", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sessionIds", _descriptor5, _assertThisInitialized(_this));

    _this._accountInfo = _ensureExist["default"].call(_assertThisInitialized(_this), accountInfo, 'accountInfo');
    _this._callLog = _ensureExist["default"].call(_assertThisInitialized(_this), callLog, 'callLog');
    _this._storage = storage;
    _this._activityMatcher = activityMatcher;
    _this._contactMatcher = contactMatcher;
    _this._callMonitor = callMonitor;
    _this._tabManager = tabManager;
    _this._locale = locale;
    _this._debouncedSearch = (0, _debounce["default"])(_this.callsSearch, 230, false);

    if (_this._storage) {
      _this._reducer = (0, _getCallHistoryReducer["default"])(_this.actionTypes);
      _this._endedCallsStorageKey = 'callHistoryEndedCalls';

      _this._storage.registerReducer({
        key: _this._endedCallsStorageKey,
        reducer: (0, _getCallHistoryReducer.getEndedCallsReducer)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getCallHistoryReducer["default"])(_this.actionTypes, {
        endedCalls: (0, _getCallHistoryReducer.getEndedCallsReducer)(_this.actionTypes)
      });
    }

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return (!_this._callMonitor || _this._callMonitor.ready) && (!_this._tabManager || _this._tabManager.ready) && _this._callLog.ready && _this._accountInfo.ready;
        }
      });
    }

    if (_this._activityMatcher) {
      _this._activityMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.sessionIds;
        },
        readyCheckFn: function readyCheckFn() {
          return (!_this._callMonitor || _this._callMonitor.ready) && (!_this._tabManager || _this._tabManager.ready) && _this._callLog.ready;
        }
      });
    }

    return _this;
  }

  _createClass(CallHistory, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._shouldInit()) {
                  this._initModuleStatus();
                } else if (this._shouldReset()) {
                  this._resetModuleStatus();
                } else if (this.ready) {
                  this._processCallHistory();
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
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._callLog.ready && (!this._callMonitor || this._callMonitor.ready) && this._accountInfo.ready && (!this._contactMatcher || this._contactMatcher.ready) && (!this._activityMatcher || this._activityMatcher.ready) && (!this._tabManager || this._tabManager.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._callLog.ready || this._callMonitor && !this._callMonitor.ready || !this._accountInfo.ready || this._contactMatcher && !this._contactMatcher.ready || this._tabManager && !this._tabManager.ready || this._activityMatcher && !this._activityMatcher.ready) && this.ready;
    }
  }, {
    key: "_shouldTriggerContactMatch",
    value: function _shouldTriggerContactMatch(uniqueNumbers) {
      if (this._lastProcessedNumbers !== uniqueNumbers && (!this._tabManager || this._tabManager.active)) {
        this._lastProcessedNumbers = uniqueNumbers;

        if (this._contactMatcher && this._contactMatcher.ready) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_shouldTriggerActivityMatch",
    value: function _shouldTriggerActivityMatch(sessionIds) {
      if (this._lastProcessedIds !== sessionIds && (!this._tabManager || this._tabManager.active)) {
        this._lastProcessedIds = sessionIds;

        if (this._activityMatcher && this._activityMatcher.ready) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_getEndedCalls",
    value: function _getEndedCalls() {
      if (this._callMonitor) {
        var monitorCalls = this._callMonitor.calls;
        var callLogCalls = this._callLog.calls;

        if (this._lastProcessedMonitorCalls !== monitorCalls) {
          var endedCalls = (this._lastProcessedMonitorCalls || []).filter(function (call) {
            return !monitorCalls.find(function (currentCall) {
              return call.telephonySessionId === currentCall.telephonySessionId;
            }) && // if the call's callLog has been fetch, skip
            !callLogCalls.find(function (currentCall) {
              return call.telephonySessionId === currentCall.telephonySessionId;
            });
          });
          this._lastProcessedMonitorCalls = monitorCalls;
          return endedCalls;
        }
      }

      return null;
    }
  }, {
    key: "_shouldRemoveEndedCalls",
    value: function _shouldRemoveEndedCalls() {
      var currentCalls = this._callLog.calls;

      if (currentCalls !== this._lastProcessedCalls) {
        this._lastProcessedCalls = currentCalls;
        var ids = {};
        currentCalls.forEach(function (call) {
          ids[call.telephonySessionId] = true;
        });
        return this.recentlyEndedCalls.filter(function (call) {
          return ids[call.telephonySessionId];
        });
      }

      return null;
    }
  }, {
    key: "_processCallHistory",
    value: function _processCallHistory() {
      var uniqueNumbers = this.uniqueNumbers;

      if (this._shouldTriggerContactMatch(uniqueNumbers)) {
        this._contactMatcher.triggerMatch();
      }

      var sessionIds = this.sessionIds;

      if (this._shouldTriggerActivityMatch(sessionIds)) {
        this._activityMatcher.triggerMatch();
      }

      var endedCalls = this._getEndedCalls();

      if (endedCalls && endedCalls.length) {
        this._addEndedCalls(endedCalls);
      }

      var shouldRemove = this._shouldRemoveEndedCalls();

      if (shouldRemove && shouldRemove.length) {
        this._removeEndedCalls(shouldRemove);
      }
    }
  }, {
    key: "_initModuleStatus",
    value: function _initModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.init
      });
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: "_resetModuleStatus",
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.reset
      });
      this._lastProcessedCalls = null;
      this._lastProcessedIds = null;
      this._lastProcessedMonitorCalls = null;
      this._lastProcessedNumbers = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "_addEndedCalls",
    value: function _addEndedCalls(endedCalls) {
      endedCalls.map(function (call) {
        call.result = 'Disconnected';
        return call;
      });
      this.store.dispatch({
        type: this.actionTypes.addEndedCalls,
        endedCalls: endedCalls,
        timestamp: Date.now()
      });

      this._callLog.sync();
    }
  }, {
    key: "_removeEndedCalls",
    value: function _removeEndedCalls(endedCalls) {
      this.store.dispatch({
        type: this.actionTypes.removeEndedCalls,
        endedCalls: endedCalls
      });
    } // for track click to sms in call history

  }, {
    key: "onClickToSMS",
    value: function onClickToSMS() {
      this.store.dispatch({
        type: this.actionTypes.clickToSMS
      });
    } // for track click to call in call history

  }, {
    key: "onClickToCall",
    value: function onClickToCall() {
      this.store.dispatch({
        type: this.actionTypes.clickToCall
      });
    }
  }, {
    key: "updateSearchInput",
    value: function updateSearchInput(input) {
      this.store.dispatch({
        type: this.actionTypes.updateSearchInput,
        input: input
      });
    }
  }, {
    key: "debouncedSearch",
    value: function debouncedSearch() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._debouncedSearch.apply(this, args);
    }
  }, {
    key: "callsSearch",
    value: function callsSearch() {
      if (this.searchInput === '') {
        return;
      }

      var calls = this.calls;
      var searchInput = this.searchInput;
      var data = [];
      var effectSearchStr = searchInput.toLowerCase().trim();
      data = calls.filter(function (call) {
        var _getPhoneNumberMatche = (0, _callLogHelpers.getPhoneNumberMatches)(call),
            phoneNumber = _getPhoneNumberMatche.phoneNumber,
            matches = _getPhoneNumberMatche.matches;

        var matchesMatched = matches.some(function (entities) {
          if (!entities || !entities.id) return false;
          if (entities.name && entities.name.toLowerCase().indexOf(effectSearchStr) > -1) return true;
          if (entities.phone && entities.phone.indexOf(effectSearchStr) > -1) return true;
          return false;
        });

        if (matchesMatched) {
          return true;
        }

        if (phoneNumber && phoneNumber.indexOf(effectSearchStr) > -1) {
          return true;
        }

        return false;
      }).sort(_callLogHelpers.sortByStartTime);
      this.store.dispatch({
        type: this.actionTypes.filterSuccess,
        data: data
      });
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _actionTypes["default"];
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
    key: "filterCalls",
    get: function get() {
      if (this.searchInput === '') {
        return this.calls;
      }

      return this.state.filterCalls;
    }
  }, {
    key: "searchInput",
    get: function get() {
      return this.state.searchInput;
    }
  }, {
    key: "recentlyEndedCalls",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._endedCallsStorageKey);
      }

      return this.state.endedCalls;
    }
  }, {
    key: "endedCalls",
    get: function get() {
      return this.recentlyEndedCalls;
    }
  }]);

  return CallHistory;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "onClickToSMS", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSearchInput", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSearchInput"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "normalizedCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3._callLog.calls;
    }, function () {
      return _this3._accountInfo.countryCode;
    }, function (calls, countryCode) {
      return calls.map(function (call) {
        var callFrom = _objectSpread({}, call.from);

        if (callFrom.phoneNumber) {
          callFrom.phoneNumber = (0, _normalizeNumber["default"])({
            phoneNumber: callFrom.phoneNumber,
            countryCode: countryCode
          });
        }

        var callTo = _objectSpread({}, call.to);

        if (callTo.phoneNumber) {
          callTo.phoneNumber = (0, _normalizeNumber["default"])({
            phoneNumber: callTo.phoneNumber,
            countryCode: countryCode
          });
        }

        return _objectSpread(_objectSpread({}, call), {}, {
          from: callFrom,
          to: callTo
        });
      }).sort(_callLogHelpers.sortByStartTime);
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "calls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4.normalizedCalls;
    }, function () {
      return _this4.recentlyEndedCalls;
    }, function () {
      return _this4._contactMatcher && _this4._contactMatcher.dataMapping;
    }, function () {
      return _this4._activityMatcher && _this4._activityMatcher.dataMapping;
    }, function () {
      return _this4._callMonitor && _this4._callMonitor.callMatched;
    }, function (normalizedCalls, endedCalls) {
      var contactMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var activityMapping = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var callMatched = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var telephonySessionIds = {};
      var calls = normalizedCalls.map(function (call) {
        telephonySessionIds[call.telephonySessionId] = true;
        var fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
        var toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        var activityMatches = activityMapping[call.sessionId] || [];
        var matched = callMatched[call.sessionId];
        return _objectSpread(_objectSpread({}, call), {}, {
          fromMatches: fromMatches,
          toMatches: toMatches,
          activityMatches: activityMatches,
          toNumberEntity: matched
        });
      });
      var filteredEndedCalls = endedCalls.filter(function (call) {
        return !telephonySessionIds[call.telephonySessionId];
      }).map(function (call) {
        var activityMatches = activityMapping[call.sessionId] || [];
        var fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
        var toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        return _objectSpread(_objectSpread({}, call), {}, {
          activityMatches: activityMatches,
          fromMatches: fromMatches,
          toMatches: toMatches
        });
      });
      return [].concat(_toConsumableArray(filteredEndedCalls), _toConsumableArray(calls)).sort(_callLogHelpers.sortByStartTime);
    }];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "debouncedSearch", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "debouncedSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsSearch", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "callsSearch"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "latestCalls", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5.filterCalls;
    }, function () {
      return _this5._activityMatcher && _this5._activityMatcher.dataMapping;
    }, function (calls, dataMapping) {
      if (dataMapping) {
        var newCalls = calls.map(function (call) {
          return _objectSpread(_objectSpread({}, call), {}, {
            activityMatches: dataMapping[call.sessionId] || []
          });
        });
        return newCalls;
      }

      return calls;
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.normalizedCalls;
    }, function () {
      return _this6.recentlyEndedCalls;
    }, function (normalizedCalls, endedCalls) {
      var output = [];
      var numberMap = {};

      function addIfNotExist(number) {
        if (!numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }

      function addNumbersFromCall(call) {
        if (call.from && call.from.phoneNumber) {
          addIfNotExist(call.from.phoneNumber);
        } else if (call.from && call.from.extensionNumber) {
          addIfNotExist(call.from.extensionNumber);
        }

        if (call.to && call.to.phoneNumber) {
          addIfNotExist(call.to.phoneNumber);
        } else if (call.to && call.to.extensionNumber) {
          addIfNotExist(call.to.extensionNumber);
        }
      }

      normalizedCalls.forEach(addNumbersFromCall);
      endedCalls.forEach(addNumbersFromCall);
      return output;
    }];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sessionIds", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7._callLog.calls;
    }, function () {
      return _this7.recentlyEndedCalls;
    }, function (calls, endedCalls) {
      var sessionIds = {};
      return calls.map(function (call) {
        sessionIds[call.sessionId] = true;
        return call.sessionId;
      }).concat(endedCalls.filter(function (call) {
        return !sessionIds[call.sessionId];
      }).map(function (call) {
        return call.sessionId;
      }));
    }];
  }
})), _class2)) || _class);
exports["default"] = CallHistory;
//# sourceMappingURL=index.js.map

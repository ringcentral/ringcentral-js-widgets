"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideo = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.number.constructor");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _i18n = require("@ringcentral-integration/i18n");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _background = _interopRequireDefault(require("../../lib/background"));

var _proxify = require("../../lib/proxy/proxify");

var _selector = require("../../lib/selector");

var _meetingStatus = _interopRequireDefault(require("../Meeting/meetingStatus"));

var _Meeting = require("../Meeting");

var _meetingHelper = require("../../helpers/meetingHelper");

var _constants = require("./constants");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _videoStatus = require("./videoStatus");

var _getRcVReducer = _interopRequireWildcard(require("./getRcVReducer"));

var _videoHelper = require("./videoHelper");

var _videoHelper2 = require("../RcVideoV2/videoHelper");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var RcVideo = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'Brand', 'Storage', 'AccountInfo', 'ExtensionInfo', 'MeetingProvider', 'Locale', {
    dep: 'RcVideoOptions',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var extensionId = _ref.extensionId,
      accountId = _ref.accountId;
  return [extensionId, accountId];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var state = _ref2.state,
      loginUser = _ref2.loginUser;
  return [state, loginUser];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var currentUser = _ref3.currentUser,
      extensionName = _ref3.extensionName,
      brandName = _ref3.brandName,
      currentLocale = _ref3.currentLocale;
  return [currentUser, extensionName, brandName, currentLocale];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(RcVideo, _RcModule);

  var _super = _createSuper(RcVideo);

  // TODO: add state interface
  function RcVideo(_ref4) {
    var _this;

    var alert = _ref4.alert,
        client = _ref4.client,
        extensionInfo = _ref4.extensionInfo,
        brand = _ref4.brand,
        storage = _ref4.storage,
        reducers = _ref4.reducers,
        availabilityMonitor = _ref4.availabilityMonitor,
        meetingProvider = _ref4.meetingProvider,
        accountInfo = _ref4.accountInfo,
        locale = _ref4.locale,
        _ref4$showSaveAsDefau = _ref4.showSaveAsDefault,
        showSaveAsDefault = _ref4$showSaveAsDefau === void 0 ? false : _ref4$showSaveAsDefau,
        _ref4$isInstantMeetin = _ref4.isInstantMeeting,
        isInstantMeeting = _ref4$isInstantMeetin === void 0 ? false : _ref4$isInstantMeetin,
        _ref4$enablePersonalM = _ref4.enablePersonalMeeting,
        enablePersonalMeeting = _ref4$enablePersonalM === void 0 ? false : _ref4$enablePersonalM,
        _ref4$enableReloadAft = _ref4.enableReloadAfterSchedule,
        enableReloadAfterSchedule = _ref4$enableReloadAft === void 0 ? true : _ref4$enableReloadAft,
        _ref4$enableScheduleO = _ref4.enableScheduleOnBehalf,
        enableScheduleOnBehalf = _ref4$enableScheduleO === void 0 ? false : _ref4$enableScheduleO,
        _ref4$enableWaitingRo = _ref4.enableWaitingRoom,
        enableWaitingRoom = _ref4$enableWaitingRo === void 0 ? false : _ref4$enableWaitingRo,
        _ref4$enableInvitatio = _ref4.enableInvitationApi,
        enableInvitationApi = _ref4$enableInvitatio === void 0 ? false : _ref4$enableInvitatio,
        _ref4$enableHostCount = _ref4.enableHostCountryDialinNumbers,
        enableHostCountryDialinNumbers = _ref4$enableHostCount === void 0 ? false : _ref4$enableHostCount,
        options = _objectWithoutProperties(_ref4, ["alert", "client", "extensionInfo", "brand", "storage", "reducers", "availabilityMonitor", "meetingProvider", "accountInfo", "locale", "showSaveAsDefault", "isInstantMeeting", "enablePersonalMeeting", "enableReloadAfterSchedule", "enableScheduleOnBehalf", "enableWaitingRoom", "enableInvitationApi", "enableHostCountryDialinNumbers"]);

    _classCallCheck(this, RcVideo);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: options.actionTypes || _actionTypes["default"]
    }));
    _this._alert = void 0;
    _this._client = void 0;
    _this._defaultVideoSettingKey = void 0;
    _this._personalVideoKey = void 0;
    _this._extensionInfo = void 0;
    _this._brand = void 0;
    _this._storage = void 0;
    _this._availabilityMonitor = void 0;
    _this._showSaveAsDefault = void 0;
    _this._isInstantMeeting = void 0;
    _this._enablePersonalMeeting = void 0;
    _this._enableReloadAfterSchedule = void 0;
    _this._enableWaitingRoom = void 0;
    _this._enableInvitationApi = void 0;
    _this._meetingProvider = void 0;
    _this._reducer = void 0;
    _this._enableScheduleOnBehalf = void 0;
    _this._enableHostCountryDialinNumbers = void 0;
    _this._accountInfo = void 0;
    _this._locale = void 0;
    _this._createMeetingPromise = null;

    _initializerDefineProperty(_this, "transformedPreferences", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "transformedSettingLocks", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "personalVideoSetting", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "defaultVideoSetting", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "initialVideoSetting", _descriptor5, _assertThisInitialized(_this));

    _this._alert = alert;
    _this._client = client;
    _this._extensionInfo = extensionInfo;
    _this._meetingProvider = meetingProvider;
    _this._brand = brand;
    _this._storage = storage;
    _this._accountInfo = accountInfo;
    _this._locale = locale;
    _this._reducer = (0, _getRcVReducer["default"])(_this.actionTypes, reducers);
    _this._showSaveAsDefault = showSaveAsDefault;
    _this._isInstantMeeting = isInstantMeeting;
    _this._availabilityMonitor = availabilityMonitor;
    _this._defaultVideoSettingKey = 'savedDefaultSetting';
    _this._personalVideoKey = 'personalVideo';
    _this._enablePersonalMeeting = enablePersonalMeeting;
    _this._enableScheduleOnBehalf = enableScheduleOnBehalf;
    _this._enableHostCountryDialinNumbers = enableHostCountryDialinNumbers;
    _this._enableReloadAfterSchedule = enableReloadAfterSchedule;
    _this._enableWaitingRoom = enableWaitingRoom;
    _this._enableInvitationApi = enableInvitationApi;

    if (_this._showSaveAsDefault) {
      _this._storage.registerReducer({
        key: _this._defaultVideoSettingKey,
        reducer: (0, _getRcVReducer.getDefaultVideoSettingReducer)(_this.actionTypes)
      });
    }

    if (_this._enablePersonalMeeting) {
      _this._storage.registerReducer({
        key: _this._personalVideoKey,
        reducer: (0, _getRcVReducer.getPersonalMeetingReducer)(_this.actionTypes)
      });
    }

    return _this;
  }

  _createClass(RcVideo, [{
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
                if (!this._shouldInit()) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this._init();

              case 3:
                _context.next = 6;
                break;

              case 5:
                if (this._shouldReset()) {
                  this._reset();
                }

              case 6:
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
      return this.pending && this._accountInfo.ready && this._extensionInfo.ready && this._storage.ready && this._meetingProvider.ready && this._meetingProvider.isRCV && (!this._availabilityMonitor || this._availabilityMonitor.ready);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && (!this._accountInfo.ready || !this._extensionInfo.ready || !this._storage.ready || !this._meetingProvider.ready || !this._meetingProvider.isRCV || this._availabilityMonitor && !this._availabilityMonitor.ready);
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.init
                });
                _context2.next = 3;
                return this._onInit();

              case 3:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_onInit",
    value: function () {
      var _onInit2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._initMeeting();

              case 2:
                if (!this._enableScheduleOnBehalf) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 5;
                return this._initDelegators();

              case 5:
                this.updateDelegator(this.loginUser);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _onInit() {
        return _onInit2.apply(this, arguments);
      }

      return _onInit;
    }()
    /**
     * Init basic meeting information
     * also load meeting setting from previous one.
     */

  }, {
    key: "init",
    value: function () {
      var _init3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._onInit();

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function init() {
        return _init3.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "reload",
    value: function () {
      var _reload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._onInit();

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function reload() {
        return _reload.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: "switchUsePersonalMeetingId",
    value: function () {
      var _switchUsePersonalMeetingId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(usePersonalMeetingId) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this._initMeetingSettings(usePersonalMeetingId);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function switchUsePersonalMeetingId(_x) {
        return _switchUsePersonalMeetingId.apply(this, arguments);
      }

      return switchUsePersonalMeetingId;
    }()
  }, {
    key: "updateDelegator",
    value: function updateDelegator(delegator) {
      this.store.dispatch({
        type: this.actionTypes.updateDelegator,
        delegator: delegator
      });
    }
  }, {
    key: "updateScheduleFor",
    value: function () {
      var _updateScheduleFor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userExtensionId) {
        var delegator;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!userExtensionId || !this.delegators || this.delegators.length === 0)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                delegator = (0, _ramda.find)(function (user) {
                  return user.extensionId === userExtensionId;
                }, this.delegators);

                if (delegator) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return");

              case 5:
                this.updateDelegator(delegator);
                _context7.next = 8;
                return this._initMeeting(Number(delegator.extensionId));

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function updateScheduleFor(_x2) {
        return _updateScheduleFor.apply(this, arguments);
      }

      return updateScheduleFor;
    }()
  }, {
    key: "_initMeeting",
    value: function () {
      var _initMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var extensionId,
            _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                extensionId = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : this.extensionId;
                this.store.dispatch({
                  type: this.actionTypes.initSettingsStart
                });

                if (!this._enablePersonalMeeting) {
                  _context8.next = 5;
                  break;
                }

                _context8.next = 5;
                return this._initPersonalMeeting(this.accountId, extensionId);

              case 5:
                _context8.next = 7;
                return this._initPreferences(this.accountId, extensionId);

              case 7:
                this._initMeetingSettings(false);

                this.store.dispatch({
                  type: this.actionTypes.initSettingsEnd
                });

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _initMeeting() {
        return _initMeeting2.apply(this, arguments);
      }

      return _initMeeting;
    }()
  }, {
    key: "_initPreferences",
    value: function () {
      var _initPreferences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var accountId,
            extensionId,
            _yield$this$_getPrefe,
            preferences,
            settingLocks,
            _args9 = arguments;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                accountId = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : this.accountId;
                extensionId = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : this.extensionId;
                _context9.prev = 2;
                _context9.next = 5;
                return this._getPreferences(accountId, extensionId);

              case 5:
                _yield$this$_getPrefe = _context9.sent;
                preferences = _yield$this$_getPrefe.preferences;
                settingLocks = _yield$this$_getPrefe.settingLocks;
                // TODO Remove the next line after rcv implement ui to manage password_instant
                preferences.password_instant = false;
                this.store.dispatch({
                  type: this.actionTypes.updateMeetingPreferences,
                  preferences: preferences
                });
                this.store.dispatch({
                  type: this.actionTypes.updateMeetingSettingLocks,
                  settingLocks: settingLocks
                });
                _context9.next = 16;
                break;

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9["catch"](2);
                console.log('preference error:', _context9.t0); // this._errorHandle(errors);

              case 16:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 13]]);
      }));

      function _initPreferences() {
        return _initPreferences2.apply(this, arguments);
      }

      return _initPreferences;
    }()
  }, {
    key: "_initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var accountId,
            extensionId,
            meetingResult,
            meeting,
            _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                accountId = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : this.accountId;
                extensionId = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : this.extensionId;
                _context10.prev = 2;
                _context10.next = 5;
                return this._client.service.platform().get('/rcvideo/v1/bridges', {
                  "default": true,
                  accountId: accountId,
                  extensionId: extensionId
                });

              case 5:
                meetingResult = _context10.sent;
                _context10.next = 8;
                return meetingResult.json();

              case 8:
                meeting = _context10.sent;

                this._savePersonalMeeting(meeting);

                _context10.next = 17;
                break;

              case 12:
                _context10.prev = 12;
                _context10.t0 = _context10["catch"](2);
                console.error('fetch personal meeting error:', _context10.t0);
                this.store.dispatch({
                  type: this.actionTypes.resetPersonalMeeting
                });

                this._errorHandle(_context10.t0);

              case 17:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[2, 12]]);
      }));

      function _initPersonalMeeting() {
        return _initPersonalMeeting2.apply(this, arguments);
      }

      return _initPersonalMeeting;
    }()
  }, {
    key: "_initDelegators",
    value: function () {
      var _initDelegators2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var result, delegators;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return this._client.service.platform().get('/rcvideo/v1/accounts/~/extensions/~/delegators');

              case 3:
                result = _context11.sent;
                _context11.next = 6;
                return result.json();

              case 6:
                delegators = _context11.sent;
                this.store.dispatch({
                  type: this.actionTypes.updateDelegatorList,
                  delegators: delegators
                });
                _context11.next = 13;
                break;

              case 10:
                _context11.prev = 10;
                _context11.t0 = _context11["catch"](0);

                this._errorHandle(_context11.t0);

              case 13:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 10]]);
      }));

      function _initDelegators() {
        return _initDelegators2.apply(this, arguments);
      }

      return _initDelegators;
    }()
  }, {
    key: "_savePersonalMeeting",
    value: function _savePersonalMeeting(meeting) {
      this.store.dispatch({
        type: this.actionTypes.savePersonalMeeting,
        meeting: meeting
      });
    }
  }, {
    key: "saveAsDefaultSetting",
    value: function saveAsDefaultSetting(meeting) {
      var allowJoinBeforeHost = meeting.allowJoinBeforeHost,
          isOnlyAuthUserJoin = meeting.isOnlyAuthUserJoin,
          isOnlyCoworkersJoin = meeting.isOnlyCoworkersJoin,
          allowScreenSharing = meeting.allowScreenSharing,
          muteAudio = meeting.muteAudio,
          muteVideo = meeting.muteVideo,
          isMeetingSecret = meeting.isMeetingSecret,
          notShowAgain = meeting.notShowAgain,
          waitingRoomMode = meeting.waitingRoomMode;
      var updateInfo = {
        allowJoinBeforeHost: allowJoinBeforeHost,
        isOnlyAuthUserJoin: isOnlyAuthUserJoin,
        isOnlyCoworkersJoin: isOnlyCoworkersJoin,
        allowScreenSharing: allowScreenSharing,
        muteAudio: muteAudio,
        muteVideo: muteVideo,
        isMeetingSecret: isMeetingSecret,
        waitingRoomMode: waitingRoomMode
      };

      if (notShowAgain) {
        updateInfo._saved = notShowAgain;
      }

      this.store.dispatch({
        type: this.actionTypes.saveAsDefaultSetting,
        meeting: updateInfo
      });
    }
  }, {
    key: "validatePasswordSettings",
    value: function validatePasswordSettings(password, isSecret) {
      return (0, _videoHelper.validatePasswordSettings)(password, isSecret);
    }
  }, {
    key: "generateRandomPassword",
    value: function generateRandomPassword() {
      return (0, _videoHelper.generateRandomPassword)(10);
    }
  }, {
    key: "createMeetingDirectly",
    value: function () {
      var _createMeetingDirectly = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(meeting) {
        var _this3 = this;

        var _ref5,
            _ref5$isAlertSuccess,
            isAlertSuccess,
            meetingDetail,
            meetingResult,
            dialInNumber,
            extensionInfo,
            newMeeting,
            invitationInfo,
            meetingResponse,
            _args12 = arguments;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _ref5 = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {}, _ref5$isAlertSuccess = _ref5.isAlertSuccess, isAlertSuccess = _ref5$isAlertSuccess === void 0 ? true : _ref5$isAlertSuccess;
                _context12.prev = 1;
                this.store.dispatch({
                  type: this.actionTypes.initCreating
                });
                meetingDetail = (0, _videoHelper.pruneMeetingObject)(meeting);

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                if (!this.enableWaitingRoom) {
                  meetingDetail = (0, _ramda.omit)([_videoHelper.RCV_WAITING_ROOM_API_KEYS], meetingDetail);
                }

                _context12.next = 8;
                return this._client.service.platform().post('/rcvideo/v1/bridges', meetingDetail);

              case 8:
                meetingResult = _context12.sent;
                this.updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
                  saveAsDefault: false
                })); // After Create

                _context12.next = 12;
                return this._getDialinNumbers();

              case 12:
                dialInNumber = _context12.sent;
                _context12.next = 15;
                return this.getExtensionInfo(this.currentUser.extensionId);

              case 15:
                extensionInfo = _context12.sent;

                if (!meeting.saveAsDefault) {
                  _context12.next = 19;
                  break;
                }

                _context12.next = 19;
                return this.savePreferencesChanges(meeting);

              case 19:
                if (!this._enableReloadAfterSchedule) {
                  _context12.next = 22;
                  break;
                }

                _context12.next = 22;
                return this._initMeeting(Number(this.currentUser.extensionId));

              case 22:
                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this3._alert.success({
                      message: _meetingStatus["default"].scheduledSuccess
                    });
                  }, 50);
                }

                _context12.next = 25;
                return meetingResult.json();

              case 25:
                newMeeting = _context12.sent;
                this.store.dispatch({
                  type: this.actionTypes.created
                });
                this.updateHasSettingsChanged(false);
                _context12.next = 30;
                return this.getMeetingInvitation({
                  hostName: extensionInfo.name,
                  meetingName: newMeeting.name,
                  meetingId: newMeeting.id,
                  meetingUrl: newMeeting.joinUri,
                  participantCode: newMeeting.participantCode,
                  mainPhoneNumber: (0, _videoHelper2.formatMainPhoneNumber)(dialInNumber),
                  password: newMeeting.meetingPassword,
                  dialInPassword: newMeeting.meetingPasswordPSTN,
                  premiumNumbers: (0, _videoHelper2.formatPremiumNumbers)(dialInNumber)
                });

              case 30:
                invitationInfo = _context12.sent;
                meetingResponse = {
                  invitationInfo: invitationInfo,
                  extensionInfo: extensionInfo,
                  dialInNumber: dialInNumber,
                  meeting: _objectSpread(_objectSpread({}, meeting), newMeeting)
                };
                return _context12.abrupt("return", _objectSpread(_objectSpread({}, meetingResponse), meeting));

              case 35:
                _context12.prev = 35;
                _context12.t0 = _context12["catch"](1);
                this.store.dispatch({
                  type: this.actionTypes.resetCreating
                });

                this._errorHandle(_context12.t0);

                return _context12.abrupt("return", null);

              case 40:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[1, 35]]);
      }));

      function createMeetingDirectly(_x3) {
        return _createMeetingDirectly.apply(this, arguments);
      }

      return createMeetingDirectly;
    }()
  }, {
    key: "createMeeting",
    value: function () {
      var _createMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(meeting) {
        var _ref6,
            _ref6$isAlertSuccess,
            isAlertSuccess,
            result,
            _args13 = arguments;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _ref6 = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {}, _ref6$isAlertSuccess = _ref6.isAlertSuccess, isAlertSuccess = _ref6$isAlertSuccess === void 0 ? true : _ref6$isAlertSuccess;

                if (!this.isScheduling) {
                  _context13.next = 3;
                  break;
                }

                return _context13.abrupt("return", this._createMeetingPromise);

              case 3:
                this._createMeetingPromise = this.createMeetingDirectly(meeting, {
                  isAlertSuccess: isAlertSuccess
                });
                _context13.next = 6;
                return this._createMeetingPromise;

              case 6:
                result = _context13.sent;
                this._createMeetingPromise = null;
                return _context13.abrupt("return", result);

              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function createMeeting(_x4) {
        return _createMeeting.apply(this, arguments);
      }

      return createMeeting;
    }()
  }, {
    key: "startMeeting",
    value: function () {
      var _startMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(meeting) {
        var isAlertSuccess,
            _args14 = arguments;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                isAlertSuccess = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : true;
                return _context14.abrupt("return", this.createMeeting(_objectSpread(_objectSpread({}, meeting), {}, {
                  expiresIn: null,
                  type: _videoHelper.RcVideoTypes.meeting
                }), {
                  isAlertSuccess: isAlertSuccess
                }));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function startMeeting(_x5) {
        return _startMeeting.apply(this, arguments);
      }

      return startMeeting;
    }()
  }, {
    key: "getMeetingInvitation",
    value: function () {
      var _getMeetingInvitation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(invitationRequest) {
        var apiResponse;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (this._enableInvitationApi) {
                  _context15.next = 2;
                  break;
                }

                return _context15.abrupt("return", null);

              case 2:
                _context15.prev = 2;
                _context15.next = 5;
                return this._client.service.platform().post('/rcvideo/v1/invitations/render', invitationRequest);

              case 5:
                apiResponse = _context15.sent;
                _context15.next = 8;
                return apiResponse.json();

              case 8:
                return _context15.abrupt("return", _context15.sent);

              case 11:
                _context15.prev = 11;
                _context15.t0 = _context15["catch"](2);
                console.warn('failed to get invitation', _context15.t0);
                return _context15.abrupt("return", null);

              case 15:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[2, 11]]);
      }));

      function getMeetingInvitation(_x6) {
        return _getMeetingInvitation.apply(this, arguments);
      }

      return getMeetingInvitation;
    }()
  }, {
    key: "_getDialinNumbers",
    value: function () {
      var _getDialinNumbers2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var _this4 = this;

        var result, _ref7, phoneNumbers, countryDialinNumbers, defaultPhoneNumber;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return this._client.service.platform().get('/rcvideo/v1/dial-in-numbers');

              case 2:
                result = _context16.sent;
                _context16.next = 5;
                return result.json();

              case 5:
                _ref7 = _context16.sent;
                phoneNumbers = _ref7.phoneNumbers;

                if (!Array.isArray(phoneNumbers)) {
                  _context16.next = 15;
                  break;
                }

                if (!this._enableHostCountryDialinNumbers) {
                  _context16.next = 12;
                  break;
                }

                countryDialinNumbers = (0, _ramda.filter)(function (obj) {
                  var _obj$country;

                  return (obj === null || obj === void 0 ? void 0 : (_obj$country = obj.country) === null || _obj$country === void 0 ? void 0 : _obj$country.isoCode) === _this4.country.isoCode;
                }, phoneNumbers);

                if (!(countryDialinNumbers.length > 0)) {
                  _context16.next = 12;
                  break;
                }

                return _context16.abrupt("return", countryDialinNumbers);

              case 12:
                defaultPhoneNumber = (0, _ramda.find)(function (obj) {
                  return obj["default"];
                }, phoneNumbers);

                if (!defaultPhoneNumber) {
                  _context16.next = 15;
                  break;
                }

                return _context16.abrupt("return", defaultPhoneNumber.phoneNumber);

              case 15:
                return _context16.abrupt("return", []);

              case 16:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function _getDialinNumbers() {
        return _getDialinNumbers2.apply(this, arguments);
      }

      return _getDialinNumbers;
    }()
  }, {
    key: "_getPreferences",
    value: function () {
      var _getPreferences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var accountId,
            extensionId,
            res,
            list,
            preferences,
            settingLocks,
            _args17 = arguments;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                accountId = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : this.accountId;
                extensionId = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : this.extensionId;
                _context17.next = 4;
                return this._client.service.platform().get("/rcvideo/v1/account/".concat(accountId, "/extension/").concat(extensionId, "/preferences"), {
                  id: _videoHelper.RCV_PREFERENCES_IDS
                });

              case 4:
                res = _context17.sent;
                _context17.next = 7;
                return res.json();

              case 7:
                list = _context17.sent;
                preferences = {};
                settingLocks = {};
                list.forEach(function (_ref8) {
                  var id = _ref8.id,
                      value = _ref8.value,
                      readOnly = _ref8.readOnly;
                  preferences[id] = value;
                  settingLocks[id] = readOnly;
                });
                return _context17.abrupt("return", {
                  preferences: preferences,
                  settingLocks: settingLocks
                });

              case 12:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function _getPreferences() {
        return _getPreferences2.apply(this, arguments);
      }

      return _getPreferences;
    }()
  }, {
    key: "getExtensionInfo",
    value: function () {
      var _getExtensionInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(extensionId) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (!(Number(extensionId) === this.extensionId)) {
                  _context18.next = 2;
                  break;
                }

                return _context18.abrupt("return", this._extensionInfo.info);

              case 2:
                return _context18.abrupt("return", this._client.account().extension(extensionId).get());

              case 3:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function getExtensionInfo(_x7) {
        return _getExtensionInfo.apply(this, arguments);
      }

      return getExtensionInfo;
    }()
  }, {
    key: "_updatePreference",
    value: function _updatePreference(preferences) {
      this.store.dispatch({
        type: this.actionTypes.updateMeetingPreferences,
        preferences: preferences
      });
    }
  }, {
    key: "_saveSinglePreference",
    value: function () {
      var _saveSinglePreference2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(preferenceId, value) {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                return _context19.abrupt("return", this._client.service.platform().send({
                  method: 'PATCH',
                  url: "/rcvideo/v1/account/~/extension/~/preferences/".concat(preferenceId),
                  body: {
                    value: value
                  }
                }));

              case 1:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function _saveSinglePreference(_x8, _x9) {
        return _saveSinglePreference2.apply(this, arguments);
      }

      return _saveSinglePreference;
    }()
    /**
     * Determined the different between client and server, then save them to the server.
     * @param preferences preference fileds in meeting object
     * @param isOverwrite if true, dispatch updateMeetingPreferences on success
     */

  }, {
    key: "savePreferencesChanges",
    value: function () {
      var _savePreferencesChanges = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(preferences) {
        var _this5 = this;

        var isOverwrite,
            preferencesPayload,
            dirtyPreferences,
            _args20 = arguments;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                isOverwrite = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : false;
                preferencesPayload = (0, _videoHelper.reversePreferences)(preferences, this._isInstantMeeting);
                dirtyPreferences = Object.entries(preferencesPayload).filter(function (kvPairs) {
                  var _ref9 = kvPairs,
                      _ref10 = _slicedToArray(_ref9, 2),
                      preferenceId = _ref10[0],
                      newValue = _ref10[1];

                  var oldValue = _this5.preferences[preferenceId];
                  var isLocked = _this5.settingLocks[preferenceId]; // hack for watingRoom, it will change locked option

                  return newValue !== oldValue && !isLocked;
                });
                _context20.prev = 3;
                _context20.next = 6;
                return Promise.all(dirtyPreferences.map(function (_ref11) {
                  var _ref12 = _slicedToArray(_ref11, 2),
                      preferenceId = _ref12[0],
                      newValue = _ref12[1];

                  return _this5._saveSinglePreference(preferenceId, newValue);
                }));

              case 6:
                if (isOverwrite) {
                  this._updatePreference(preferencesPayload);
                }

                _context20.next = 12;
                break;

              case 9:
                _context20.prev = 9;
                _context20.t0 = _context20["catch"](3);
                console.error(_context20.t0);

              case 12:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[3, 9]]);
      }));

      function savePreferencesChanges(_x10) {
        return _savePreferencesChanges.apply(this, arguments);
      }

      return savePreferencesChanges;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(meetingId) {
        var accountId,
            extensionId,
            result,
            meeting,
            _args21 = arguments;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                accountId = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : this.accountId;
                extensionId = _args21.length > 2 && _args21[2] !== undefined ? _args21[2] : this.extensionId;
                _context21.next = 4;
                return this._client.service.platform().get('/rcvideo/v1/bridges', {
                  shortId: meetingId,
                  accountId: accountId,
                  extensionId: extensionId
                });

              case 4:
                result = _context21.sent;
                _context21.next = 7;
                return result.json();

              case 7:
                meeting = _context21.sent;
                return _context21.abrupt("return", meeting);

              case 9:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function getMeeting(_x11) {
        return _getMeeting.apply(this, arguments);
      }

      return getMeeting;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(meetingId, meeting) {
        var _this6 = this;

        var _ref13,
            _ref13$isAlertSuccess,
            isAlertSuccess,
            meetingDetail,
            meetingResult,
            newMeeting,
            dialInNumber,
            extensionInfo,
            invitationInfo,
            meetingResponse,
            _args22 = arguments;

        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _ref13 = _args22.length > 2 && _args22[2] !== undefined ? _args22[2] : {}, _ref13$isAlertSuccess = _ref13.isAlertSuccess, isAlertSuccess = _ref13$isAlertSuccess === void 0 ? false : _ref13$isAlertSuccess;
                _context22.prev = 1;
                this.store.dispatch({
                  type: this.actionTypes.initUpdating
                });
                meetingDetail = (0, _videoHelper.pruneMeetingObject)(meeting);

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                if (!this.enableWaitingRoom) {
                  meetingDetail = (0, _ramda.omit)([_videoHelper.RCV_WAITING_ROOM_API_KEYS], meetingDetail);
                }

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                _context22.next = 9;
                return this._client.service.platform().send({
                  method: 'PATCH',
                  url: "/rcvideo/v1/bridges/".concat(meeting.id),
                  body: meetingDetail
                });

              case 9:
                meetingResult = _context22.sent;
                _context22.next = 12;
                return meetingResult.json();

              case 12:
                newMeeting = _context22.sent;
                _context22.next = 15;
                return this._getDialinNumbers();

              case 15:
                dialInNumber = _context22.sent;
                _context22.next = 18;
                return this.getExtensionInfo(this.currentUser.extensionId);

              case 18:
                extensionInfo = _context22.sent;
                _context22.next = 21;
                return this.getMeetingInvitation({
                  hostName: extensionInfo.name,
                  meetingName: newMeeting.name,
                  meetingId: newMeeting.id,
                  meetingUrl: newMeeting.joinUri,
                  participantCode: newMeeting.participantCode,
                  mainPhoneNumber: (0, _videoHelper2.formatMainPhoneNumber)(dialInNumber),
                  password: newMeeting.meetingPassword,
                  dialInPassword: newMeeting.meetingPasswordPSTN,
                  premiumNumbers: (0, _videoHelper2.formatPremiumNumbers)(dialInNumber)
                });

              case 21:
                invitationInfo = _context22.sent;

                if (!meeting.saveAsDefault) {
                  _context22.next = 25;
                  break;
                }

                _context22.next = 25;
                return this.savePreferencesChanges(meeting, true);

              case 25:
                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this6._alert.success({
                      message: _meetingStatus["default"].updatedSuccess
                    });
                  }, 50);
                }

                this.store.dispatch({
                  type: this.actionTypes.updated
                });
                this.updateHasSettingsChanged(false);
                meetingResponse = {
                  invitationInfo: invitationInfo,
                  extensionInfo: extensionInfo,
                  dialInNumber: dialInNumber,
                  meeting: _objectSpread(_objectSpread({}, meeting), newMeeting)
                };

                if (this.personalMeeting && newMeeting.id === this.personalMeeting.id) {
                  this._savePersonalMeeting(newMeeting);
                }

                return _context22.abrupt("return", meetingResponse);

              case 33:
                _context22.prev = 33;
                _context22.t0 = _context22["catch"](1);
                this.store.dispatch({
                  type: this.actionTypes.resetUpdating
                });

                this._errorHandle(_context22.t0);

                return _context22.abrupt("return", null);

              case 38:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this, [[1, 33]]);
      }));

      function updateMeeting(_x12, _x13) {
        return _updateMeeting.apply(this, arguments);
      }

      return updateMeeting;
    }()
  }, {
    key: "_initMeetingSettings",
    value: function _initMeetingSettings(usePersonalMeetingId) {
      if (usePersonalMeetingId) {
        this.updateMeetingSettings(_objectSpread({}, this.personalVideoSetting));
      } else {
        this.updateMeetingSettings(_objectSpread({}, this.defaultVideoSetting));
      }
    }
  }, {
    key: "updateHasSettingsChanged",
    value: function updateHasSettingsChanged(isChanged) {
      this.store.dispatch({
        type: this.actionTypes.saveHasSettingChanged,
        isChanged: isChanged
      });
    }
  }, {
    key: "updateMeetingSettings",
    value: function updateMeetingSettings(meeting) {
      var patch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var processedMeeting = meeting;

      if (this.enableWaitingRoom) {
        processedMeeting = _objectSpread(_objectSpread({}, meeting), (0, _videoHelper.patchWaitingRoomRelated)(_objectSpread(_objectSpread({}, this.meeting), meeting), this.transformedPreferences, true));
      }

      this.store.dispatch({
        type: this.actionTypes.updateMeetingSettings,
        meeting: processedMeeting,
        patch: patch
      });

      this._comparePreferences();
    }
  }, {
    key: "_comparePreferences",
    value: function _comparePreferences() {
      this.store.dispatch({
        type: this.actionTypes.saveMeetingPreferencesState,
        isPreferencesChanged: (0, _videoHelper.comparePreferences)(this.transformedPreferences, this.meeting)
      });
    }
  }, {
    key: "_errorHandle",
    value: function () {
      var _errorHandle2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(errors) {
        var _iterator, _step, error, _yield$errors$respons, errorCode, permissionName;

        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                if (!(errors instanceof _Meeting.MeetingErrors)) {
                  _context23.next = 5;
                  break;
                }

                _iterator = _createForOfIteratorHelper(errors.all);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    error = _step.value;

                    this._alert.warning(error);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context23.next = 26;
                break;

              case 5:
                if (!(errors && errors.response)) {
                  _context23.next = 24;
                  break;
                }

                _context23.next = 8;
                return errors.response.clone().json();

              case 8:
                _yield$errors$respons = _context23.sent;
                errorCode = _yield$errors$respons.errorCode;
                permissionName = _yield$errors$respons.permissionName;

                if (!(errorCode === 'InsufficientPermissions' && permissionName)) {
                  _context23.next = 15;
                  break;
                }

                this._alert.danger({
                  message: _meetingStatus["default"].insufficientPermissions,
                  payload: {
                    permissionName: permissionName
                  }
                });

                _context23.next = 22;
                break;

              case 15:
                _context23.t0 = !this._availabilityMonitor;

                if (_context23.t0) {
                  _context23.next = 20;
                  break;
                }

                _context23.next = 19;
                return this._availabilityMonitor.checkIfHAError(errors);

              case 19:
                _context23.t0 = !_context23.sent;

              case 20:
                if (!_context23.t0) {
                  _context23.next = 22;
                  break;
                }

                this._alert.danger({
                  message: _meetingStatus["default"].internalError
                });

              case 22:
                _context23.next = 26;
                break;

              case 24:
                console.log('errors:', errors);

                this._alert.danger({
                  message: _meetingStatus["default"].internalError
                });

              case 26:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function _errorHandle(_x14) {
        return _errorHandle2.apply(this, arguments);
      }

      return _errorHandle;
    }()
  }, {
    key: "enableScheduleOnBehalf",
    get: function get() {
      return this._enableScheduleOnBehalf;
    }
  }, {
    key: "meeting",
    get: function get() {
      return this.state.meeting;
    }
  }, {
    key: "personalMeeting",
    get: function get() {
      return this._storage.getItem(this._personalVideoKey);
    }
  }, {
    key: "country",
    get: function get() {
      return this._extensionInfo.country;
    }
  }, {
    key: "currentLocale",
    get: function get() {
      return this._locale.currentLocale || _i18n.DEFAULT_LOCALE;
    }
  }, {
    key: "extensionName",
    get: function get() {
      return this._extensionInfo.info && this._extensionInfo.info.name;
    }
  }, {
    key: "extensionId",
    get: function get() {
      return this._extensionInfo.info.id;
    }
  }, {
    key: "accountId",
    get: function get() {
      return this._accountInfo.id;
    }
  }, {
    key: "brandName",
    get: function get() {
      return this._brand.name;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    } // preferences directly from backend

  }, {
    key: "preferences",
    get: function get() {
      return this.state.preferences;
    }
  }, {
    key: "settingLocks",
    get: function get() {
      return this.state.settingLocks;
    }
  }, {
    key: "savedDefaultVideoSetting",
    get: function get() {
      return this._storage.getItem(this._defaultVideoSettingKey);
    }
  }, {
    key: "isInitializing",
    get: function get() {
      return this.state.videoStatus === _videoStatus.videoStatus.initializing;
    }
  }, {
    key: "isScheduling",
    get: function get() {
      return this.state.videoStatus === _videoStatus.videoStatus.creating;
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      return this._showSaveAsDefault;
    }
  }, {
    key: "enablePersonalMeeting",
    get: function get() {
      return this._enablePersonalMeeting;
    }
  }, {
    key: "enableWaitingRoom",
    get: function get() {
      return this._enableWaitingRoom;
    }
  }, {
    key: "isPreferencesChanged",
    get: function get() {
      return this.state.isPreferencesChanged;
    }
  }, {
    key: "hasSettingsChanged",
    get: function get() {
      return this.state.hasSettingsChanged;
    }
  }, {
    key: "loginUser",
    get: function get() {
      return {
        name: _constants.ASSISTED_USERS_MYSELF,
        id: "".concat(this.extensionId),
        extensionId: "".concat(this.extensionId),
        accountId: "".concat(this.accountId),
        isLoginUser: true
      };
    }
  }, {
    key: "delegators",
    get: function get() {
      if (this.state.delegators.length === 0) {
        return [];
      }

      return [this.loginUser].concat(_toConsumableArray(this.state.delegators));
    }
  }, {
    key: "currentUser",
    get: function get() {
      return this.state.delegator || this.loginUser;
    }
  }, {
    key: "defaultTopic",
    get: function get() {
      var _this$currentUser;

      var extensionName = this.extensionName;

      if (((_this$currentUser = this.currentUser) === null || _this$currentUser === void 0 ? void 0 : _this$currentUser.extensionId) !== "".concat(this.extensionId)) {
        var _this$currentUser2;

        extensionName = (_this$currentUser2 = this.currentUser) === null || _this$currentUser2 === void 0 ? void 0 : _this$currentUser2.name;
      }

      return (0, _videoHelper.getTopic)(extensionName, this.brandName, this.currentLocale);
    }
  }]);

  return RcVideo;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_init", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onInit", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onInit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateDelegator", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateDelegator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createMeetingDirectly", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "createMeetingDirectly"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "createMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingInvitation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingInvitation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getDialinNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_getDialinNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getExtensionInfo", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getExtensionInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingSettings"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "transformedPreferences", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7._isInstantMeeting;
    }, function () {
      return _this7.preferences;
    }, function (isInstantMeeting, preferences) {
      return (0, _videoHelper.transformPreferences)(preferences, isInstantMeeting);
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "transformedSettingLocks", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8._isInstantMeeting;
    }, function () {
      return _this8.settingLocks;
    }, function (isInstantMeeting, settingLocks) {
      return (0, _videoHelper.transformSettingLocks)(settingLocks, isInstantMeeting);
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "personalVideoSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return [function () {
      return _this9.initialVideoSetting;
    }, function () {
      return _this9.personalMeeting;
    }, function () {
      return _this9.transformedPreferences;
    }, function () {
      return _this9.transformedSettingLocks;
    }, function (initialSetting, personalMeeting, transformedPreferences, transformedSettingLocks) {
      if (!personalMeeting) {
        return null;
      }

      var processedSettings = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, initialSetting), personalMeeting), (0, _videoHelper.getLockedPreferences)(transformedSettingLocks, transformedPreferences)), {}, {
        meetingPassword: personalMeeting.meetingPassword || (0, _videoHelper.generateRandomPassword)(10),
        isMeetingPasswordValid: true,
        // assume personal meeting password is valid
        id: personalMeeting.id,
        usePersonalMeetingId: true,
        settingLock: _objectSpread({}, transformedSettingLocks)
      });

      if (_this9.enableWaitingRoom) {
        return _objectSpread(_objectSpread({}, processedSettings), (0, _videoHelper.patchWaitingRoomRelated)(processedSettings, transformedPreferences));
      }

      return processedSettings;
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "defaultVideoSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this10 = this;

    return [function () {
      return _this10.initialVideoSetting;
    }, function () {
      var savedSetting = _this10._showSaveAsDefault ? _this10.savedDefaultVideoSetting : null;
      return savedSetting;
    }, function () {
      return _this10.transformedPreferences;
    }, function () {
      return _this10.transformedSettingLocks;
    }, function (initialSetting, savedSetting, transformedPreferences, transformedSettingLocks) {
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, initialSetting), savedSetting), transformedPreferences), {}, {
        meetingPassword: (0, _videoHelper.generateRandomPassword)(10),
        isMeetingPasswordValid: true,
        // generated random password is valid
        id: null,
        usePersonalMeetingId: false,
        settingLock: _objectSpread({}, transformedSettingLocks)
      });
    }];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "initialVideoSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this11 = this;

    return [function () {
      var _this11$currentUser;

      var extensionName = _this11.extensionName;

      if (((_this11$currentUser = _this11.currentUser) === null || _this11$currentUser === void 0 ? void 0 : _this11$currentUser.extensionId) !== "".concat(_this11.extensionId)) {
        var _this11$currentUser2;

        extensionName = (_this11$currentUser2 = _this11.currentUser) === null || _this11$currentUser2 === void 0 ? void 0 : _this11$currentUser2.name;
      }

      return extensionName;
    }, function () {
      return _this11.brandName;
    }, function () {
      return (0, _meetingHelper.getInitializedStartTime)();
    }, function () {
      return _this11.currentUser;
    }, function () {
      return _this11.currentLocale;
    }, function (extensionName, brandName, startTime, currentUser, currentLocale) {
      var topic = (0, _videoHelper.getTopic)(extensionName, brandName, currentLocale);
      return (0, _videoHelper.getDefaultVideoSettings)({
        topic: topic,
        startTime: new Date(startTime),
        accountId: currentUser.accountId,
        extensionId: currentUser.extensionId
      });
    }];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "loginUser", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "loginUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delegators", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "delegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultTopic", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultTopic"), _class2.prototype)), _class2)) || _class);
exports.RcVideo = RcVideo;
//# sourceMappingURL=RcVideo.js.map

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

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

var _di = require("../../lib/di");

var _background = _interopRequireDefault(require("../../lib/background"));

var _proxify = require("../../lib/proxy/proxify");

var _meetingStatus = _interopRequireDefault(require("../Meeting/meetingStatus"));

var _videoStatus = require("./videoStatus");

var _Meeting = require("../Meeting");

var _constants = require("./constants");

var _meetingHelper = require("../../helpers/meetingHelper");

var _videoHelper = require("./videoHelper");

var _Analytics = require("../Analytics");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var RcVideo = (_dec = (0, _di.Module)({
  name: 'RcVideo',
  deps: ['Alert', 'Client', 'Brand', 'Storage', 'AccountInfo', 'ExtensionInfo', 'VideoConfiguration', 'Locale', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'RcVideoOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (that, status) {
  if (status !== _videoStatus.videoStatus.creating) return;
  return function (analytics) {
    var target = analytics.getTrackTarget();

    if (target) {
      return [_Analytics.trackEvents.clickMeetingSchedulePage, {
        router: target.router
      }];
    }
  };
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale];
}), _dec4 = (0, _core.computed)(function (_ref) {
  var preferences = _ref.preferences,
      isInstantMeeting = _ref.isInstantMeeting;
  return [preferences, isInstantMeeting];
}), _dec5 = (0, _core.computed)(function (_ref2) {
  var settingLocks = _ref2.settingLocks,
      isInstantMeeting = _ref2.isInstantMeeting;
  return [settingLocks, isInstantMeeting];
}), _dec6 = (0, _core.computed)(function (_ref3) {
  var personalMeeting = _ref3.personalMeeting,
      initialVideoSetting = _ref3.initialVideoSetting,
      transformedPreferences = _ref3.transformedPreferences,
      transformedSettingLocks = _ref3.transformedSettingLocks;
  return [personalMeeting, initialVideoSetting, transformedPreferences, transformedSettingLocks];
}), _dec7 = (0, _core.computed)(function (_ref4) {
  var initialVideoSetting = _ref4.initialVideoSetting,
      transformedPreferences = _ref4.transformedPreferences,
      transformedSettingLocks = _ref4.transformedSettingLocks;
  return [initialVideoSetting, transformedPreferences, transformedSettingLocks];
}), _dec8 = (0, _core.computed)(function (_ref5) {
  var currentUser = _ref5.currentUser,
      defaultTopic = _ref5.defaultTopic;
  return [currentUser, defaultTopic];
}), _dec9 = (0, _core.computed)(function (_ref6) {
  var currentUser = _ref6.currentUser,
      extensionName = _ref6.extensionName,
      brandName = _ref6.brandName,
      currentLocale = _ref6.currentLocale;
  return [currentUser, extensionName, brandName, currentLocale];
}), _dec10 = (0, _core.computed)(function (_ref7) {
  var extensionId = _ref7.extensionId,
      accountId = _ref7.accountId;
  return [extensionId, accountId];
}), _dec11 = (0, _core.computed)(function (_ref8) {
  var delegator = _ref8.delegator,
      loginUser = _ref8.loginUser;
  return [delegator, loginUser];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RcVideo, _RcModuleV);

  var _super = _createSuper(RcVideo);

  function RcVideo(deps) {
    var _this$_deps$rcVideoOp, _this$_deps$rcVideoOp2, _this$_deps$rcVideoOp3, _this$_deps$rcVideoOp4, _this$_deps$rcVideoOp5, _this$_deps$rcVideoOp6, _this$_deps$rcVideoOp7, _this$_deps$rcVideoOp8, _this$_deps$rcVideoOp9, _this$_deps$rcVideoOp10, _this$_deps$rcVideoOp11, _this$_deps$rcVideoOp12, _this$_deps$rcVideoOp13, _this$_deps$rcVideoOp14, _this$_deps$rcVideoOp15, _this$_deps$rcVideoOp16, _this$_deps$locale$cu, _this$_deps$locale;

    var _this;

    _classCallCheck(this, RcVideo);

    _this = _super.call(this, {
      enableCache: true,
      storageKey: 'RcVideo',
      deps: deps
    });
    _this._showSaveAsDefault = void 0;
    _this._isInstantMeeting = void 0;
    _this._enableWaitingRoom = void 0;
    _this._enablePersonalMeeting = void 0;
    _this._enableScheduleOnBehalf = void 0;
    _this._enableHostCountryDialinNumbers = void 0;
    _this._enableReloadAfterSchedule = void 0;
    _this._enableInvitationApi = void 0;
    _this._currentLocale = void 0;
    _this._createMeetingPromise = null;

    _initializerDefineProperty(_this, "personalVideo", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "savedDefaultSetting", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "meeting", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "videoStatus", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "preferences", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isPreferencesChanged", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "settingLocks", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "delegator", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "delegators", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "hasSettingsChanged", _descriptor10, _assertThisInitialized(_this));

    _this._enableInvitationApi = (_this$_deps$rcVideoOp = (_this$_deps$rcVideoOp2 = _this._deps.rcVideoOptions) === null || _this$_deps$rcVideoOp2 === void 0 ? void 0 : _this$_deps$rcVideoOp2.enableInvitationApi) !== null && _this$_deps$rcVideoOp !== void 0 ? _this$_deps$rcVideoOp : false;
    _this._showSaveAsDefault = (_this$_deps$rcVideoOp3 = (_this$_deps$rcVideoOp4 = _this._deps.rcVideoOptions) === null || _this$_deps$rcVideoOp4 === void 0 ? void 0 : _this$_deps$rcVideoOp4.showSaveAsDefault) !== null && _this$_deps$rcVideoOp3 !== void 0 ? _this$_deps$rcVideoOp3 : false;
    _this._isInstantMeeting = (_this$_deps$rcVideoOp5 = (_this$_deps$rcVideoOp6 = _this._deps.rcVideoOptions) === null || _this$_deps$rcVideoOp6 === void 0 ? void 0 : _this$_deps$rcVideoOp6.isInstantMeeting) !== null && _this$_deps$rcVideoOp5 !== void 0 ? _this$_deps$rcVideoOp5 : false;
    _this._enableWaitingRoom = (_this$_deps$rcVideoOp7 = (_this$_deps$rcVideoOp8 = _this._deps.rcVideoOptions) === null || _this$_deps$rcVideoOp8 === void 0 ? void 0 : _this$_deps$rcVideoOp8.enableWaitingRoom) !== null && _this$_deps$rcVideoOp7 !== void 0 ? _this$_deps$rcVideoOp7 : false;
    _this._enablePersonalMeeting = (_this$_deps$rcVideoOp9 = (_this$_deps$rcVideoOp10 = _this._deps.rcVideoOptions) === null || _this$_deps$rcVideoOp10 === void 0 ? void 0 : _this$_deps$rcVideoOp10.enablePersonalMeeting) !== null && _this$_deps$rcVideoOp9 !== void 0 ? _this$_deps$rcVideoOp9 : false;
    _this._enableScheduleOnBehalf = (_this$_deps$rcVideoOp11 = (_this$_deps$rcVideoOp12 = _this._deps.rcVideoOptions) === null || _this$_deps$rcVideoOp12 === void 0 ? void 0 : _this$_deps$rcVideoOp12.enableScheduleOnBehalf) !== null && _this$_deps$rcVideoOp11 !== void 0 ? _this$_deps$rcVideoOp11 : false;
    _this._enableHostCountryDialinNumbers = (_this$_deps$rcVideoOp13 = (_this$_deps$rcVideoOp14 = _this._deps.rcVideoOptions) === null || _this$_deps$rcVideoOp14 === void 0 ? void 0 : _this$_deps$rcVideoOp14.enableHostCountryDialinNumbers) !== null && _this$_deps$rcVideoOp13 !== void 0 ? _this$_deps$rcVideoOp13 : false;
    _this._enableReloadAfterSchedule = (_this$_deps$rcVideoOp15 = (_this$_deps$rcVideoOp16 = _this._deps.rcVideoOptions) === null || _this$_deps$rcVideoOp16 === void 0 ? void 0 : _this$_deps$rcVideoOp16.enableReloadAfterSchedule) !== null && _this$_deps$rcVideoOp15 !== void 0 ? _this$_deps$rcVideoOp15 : true;
    _this._currentLocale = (_this$_deps$locale$cu = (_this$_deps$locale = _this._deps.locale) === null || _this$_deps$locale === void 0 ? void 0 : _this$_deps$locale.currentLocale) !== null && _this$_deps$locale$cu !== void 0 ? _this$_deps$locale$cu : _i18n.DEFAULT_LOCALE;
    return _this;
  }

  _createClass(RcVideo, [{
    key: "_savePersonalMeeting",
    value: function _savePersonalMeeting(settings) {
      this.personalVideo = _objectSpread(_objectSpread({}, this.personalVideo), settings);
    }
  }, {
    key: "_resetPersonalMeeting",
    value: function _resetPersonalMeeting() {
      this.personalVideo = {};
    }
  }, {
    key: "_saveDefaultVideoSetting",
    value: function _saveDefaultVideoSetting(settings) {
      this.savedDefaultSetting = _objectSpread(_objectSpread({}, this.savedDefaultSetting), settings);
    }
  }, {
    key: "_updateMeetingSettings",
    value: function _updateMeetingSettings(info) {
      var patch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.meeting = patch ? _objectSpread(_objectSpread({}, this.meeting), info) : info;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(RcVideo.prototype), "_shouldInit", this).call(this) && this._deps.videoConfiguration.isRCV;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(RcVideo.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.videoConfiguration.isRCV;
    }
  }, {
    key: "_updateVideoStatus",
    value: function _updateVideoStatus(status) {
      this.videoStatus = status;
    }
  }, {
    key: "_updateMeetingPreferences",
    value: function _updateMeetingPreferences(preferences) {
      this.preferences = preferences;
    }
  }, {
    key: "_updateIsPreferencesChanged",
    value: function _updateIsPreferencesChanged(isPreferencesChanged) {
      this.isPreferencesChanged = isPreferencesChanged;
    }
  }, {
    key: "_updateMeetingSettingLocks",
    value: function _updateMeetingSettingLocks(settingLocks) {
      this.settingLocks = settingLocks;
    }
  }, {
    key: "_updateDelegator",
    value: function _updateDelegator(delegator) {
      this.delegator = delegator;
    }
  }, {
    key: "_updateDelegatorList",
    value: function _updateDelegatorList(delegatorList) {
      this.delegators = delegatorList;
    }
  }, {
    key: "_updateHasSettingsChanged",
    value: function _updateHasSettingsChanged(isChanged) {
      this.hasSettingsChanged = isChanged;
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._initMeeting();

              case 2:
                if (!this._enableScheduleOnBehalf) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return this._initDelegators();

              case 5:
                this.updateDelegator(this.loginUser);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
    /**
     * Init basic meeting information
     * also load meeting setting from previous one.
     */

  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.onInit();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "reload",
    value: function () {
      var _reload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.onInit();

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function reload() {
        return _reload.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: "switchUsePersonalMeetingId",
    value: function () {
      var _switchUsePersonalMeetingId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(usePersonalMeetingId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._initMeetingSettings(usePersonalMeetingId);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function switchUsePersonalMeetingId(_x) {
        return _switchUsePersonalMeetingId.apply(this, arguments);
      }

      return switchUsePersonalMeetingId;
    }()
  }, {
    key: "updateDelegator",
    value: function () {
      var _updateDelegator2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(delegator) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this._updateDelegator(delegator);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateDelegator(_x2) {
        return _updateDelegator2.apply(this, arguments);
      }

      return updateDelegator;
    }()
  }, {
    key: "updateScheduleFor",
    value: function () {
      var _updateScheduleFor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userExtensionId) {
        var delegator;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!userExtensionId || !this.delegators || this.delegators.length === 0)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                delegator = (0, _ramda.find)(function (user) {
                  return user.extensionId === userExtensionId;
                }, this.delegators);

                if (delegator) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return");

              case 5:
                this.updateDelegator(delegator);
                _context6.next = 8;
                return this._initMeeting(Number(delegator.extensionId));

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateScheduleFor(_x3) {
        return _updateScheduleFor.apply(this, arguments);
      }

      return updateScheduleFor;
    }()
  }, {
    key: "_initMeeting",
    value: function () {
      var _initMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var extensionId,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                extensionId = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : this.extensionId;

                this._updateVideoStatus(_videoStatus.videoStatus.initializing);

                if (!this._enablePersonalMeeting) {
                  _context7.next = 5;
                  break;
                }

                _context7.next = 5;
                return this._initPersonalMeeting(this.accountId, extensionId);

              case 5:
                _context7.next = 7;
                return this._initPreferences(this.accountId, extensionId);

              case 7:
                this._initMeetingSettings(false);

                this._updateVideoStatus(_videoStatus.videoStatus.initialized);

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _initMeeting() {
        return _initMeeting2.apply(this, arguments);
      }

      return _initMeeting;
    }()
  }, {
    key: "_initPreferences",
    value: function () {
      var _initPreferences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var accountId,
            extensionId,
            _yield$this$_getPrefe,
            preferences,
            settingLocks,
            _args8 = arguments;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                accountId = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : this.accountId;
                extensionId = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : this.extensionId;
                _context8.prev = 2;
                _context8.next = 5;
                return this._getPreferences(accountId, extensionId);

              case 5:
                _yield$this$_getPrefe = _context8.sent;
                preferences = _yield$this$_getPrefe.preferences;
                settingLocks = _yield$this$_getPrefe.settingLocks;
                // TODO Remove the next line after rcv implement ui to manage password_instant
                preferences.password_instant = false;

                this._updatePreference(preferences);

                this._updateMeetingSettingLocks(settingLocks);

                _context8.next = 16;
                break;

              case 13:
                _context8.prev = 13;
                _context8.t0 = _context8["catch"](2);
                console.log('preference error:', _context8.t0); // this._errorHandle(errors);

              case 16:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[2, 13]]);
      }));

      function _initPreferences() {
        return _initPreferences2.apply(this, arguments);
      }

      return _initPreferences;
    }()
  }, {
    key: "_initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var accountId,
            extensionId,
            meetingResult,
            meeting,
            _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                accountId = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : this.accountId;
                extensionId = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : this.extensionId;
                _context9.prev = 2;
                _context9.next = 5;
                return this._deps.client.service.platform().get('/rcvideo/v1/bridges', {
                  "default": true,
                  accountId: accountId,
                  extensionId: extensionId
                });

              case 5:
                meetingResult = _context9.sent;
                _context9.next = 8;
                return meetingResult.json();

              case 8:
                meeting = _context9.sent;

                this._savePersonalMeeting(meeting);

                _context9.next = 17;
                break;

              case 12:
                _context9.prev = 12;
                _context9.t0 = _context9["catch"](2);
                console.error('fetch personal meeting error:', _context9.t0);

                this._resetPersonalMeeting();

                this._errorHandle(_context9.t0);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 12]]);
      }));

      function _initPersonalMeeting() {
        return _initPersonalMeeting2.apply(this, arguments);
      }

      return _initPersonalMeeting;
    }()
  }, {
    key: "_initDelegators",
    value: function () {
      var _initDelegators2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var result, delegators, processedDelegators;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return this._deps.client.service.platform().get('/rcvideo/v1/accounts/~/extensions/~/delegators');

              case 3:
                result = _context10.sent;
                _context10.next = 6;
                return result.json();

              case 6:
                delegators = _context10.sent;
                // to make sure it will equal to v1
                processedDelegators = delegators;

                if (processedDelegators.length) {
                  processedDelegators.unshift(this.loginUser);
                }

                this._updateDelegatorList(processedDelegators);

                _context10.next = 15;
                break;

              case 12:
                _context10.prev = 12;
                _context10.t0 = _context10["catch"](0);

                this._errorHandle(_context10.t0);

              case 15:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 12]]);
      }));

      function _initDelegators() {
        return _initDelegators2.apply(this, arguments);
      }

      return _initDelegators;
    }()
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

      this._saveDefaultVideoSetting(updateInfo);
    }
  }, {
    key: "validatePasswordSettings",
    value: function validatePasswordSettings(password, isSecret) {
      return (0, _videoHelper.validatePasswordSettings)(password, isSecret);
    }
  }, {
    key: "createMeetingDirectly",
    value: function () {
      var _createMeetingDirectly = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(meeting) {
        var _this2 = this;

        var _ref9,
            _ref9$isAlertSuccess,
            isAlertSuccess,
            meetingDetail,
            result,
            newMeeting,
            dialInNumber,
            extensionInfo,
            invitationInfo,
            meetingResponse,
            _args11 = arguments;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _ref9 = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {}, _ref9$isAlertSuccess = _ref9.isAlertSuccess, isAlertSuccess = _ref9$isAlertSuccess === void 0 ? true : _ref9$isAlertSuccess;
                _context11.prev = 1;

                this._updateVideoStatus(_videoStatus.videoStatus.creating);

                meetingDetail = (0, _videoHelper.pruneMeetingObject)(meeting);

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                if (!this.enableWaitingRoom) {
                  meetingDetail = (0, _ramda.omit)([_videoHelper.RCV_WAITTING_ROOM_API_KEYS], meetingDetail);
                }

                _context11.next = 8;
                return this._deps.client.service.platform().post('/rcvideo/v1/bridges', meetingDetail);

              case 8:
                result = _context11.sent;
                _context11.next = 11;
                return result.json();

              case 11:
                newMeeting = _context11.sent;
                this.updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
                  saveAsDefault: false
                })); // After Create

                _context11.next = 15;
                return this._getDialinNumbers();

              case 15:
                dialInNumber = _context11.sent;
                _context11.next = 18;
                return this.getExtensionInfo(this.currentUser.extensionId);

              case 18:
                extensionInfo = _context11.sent;
                _context11.next = 21;
                return this.getMeetingInvitation({
                  hostName: extensionInfo.name,
                  meetingName: newMeeting.name,
                  meetingId: newMeeting.id,
                  meetingUrl: newMeeting.joinUri,
                  participantCode: newMeeting.participantCode,
                  mainPhoneNumber: (0, _videoHelper.formatMainPhoneNumber)(dialInNumber),
                  password: newMeeting.meetingPassword,
                  dialInPassword: newMeeting.meetingPasswordPSTN,
                  premiumNumbers: (0, _videoHelper.formatPremiumNumbers)(dialInNumber)
                });

              case 21:
                invitationInfo = _context11.sent;

                if (!meeting.saveAsDefault) {
                  _context11.next = 25;
                  break;
                }

                _context11.next = 25;
                return this.savePreferencesChanges(meeting);

              case 25:
                if (!this._enableReloadAfterSchedule) {
                  _context11.next = 28;
                  break;
                }

                _context11.next = 28;
                return this._initMeeting(Number(this.currentUser.extensionId));

              case 28:
                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this2._deps.alert.success({
                      message: _meetingStatus["default"].scheduledSuccess
                    });
                  }, 50);
                }

                this._updateVideoStatus(_videoStatus.videoStatus.created);

                this._updateHasSettingsChanged(false);

                meetingResponse = {
                  invitationInfo: invitationInfo,
                  extensionInfo: extensionInfo,
                  dialInNumber: dialInNumber,
                  meeting: _objectSpread(_objectSpread({}, meeting), newMeeting)
                };
                return _context11.abrupt("return", _objectSpread(_objectSpread({}, meetingResponse), meeting));

              case 35:
                _context11.prev = 35;
                _context11.t0 = _context11["catch"](1);
                console.log('failed to create rcv:', _context11.t0);

                this._updateVideoStatus(_videoStatus.videoStatus.idle);

                this._errorHandle(_context11.t0);

                return _context11.abrupt("return", null);

              case 41:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[1, 35]]);
      }));

      function createMeetingDirectly(_x4) {
        return _createMeetingDirectly.apply(this, arguments);
      }

      return createMeetingDirectly;
    }()
  }, {
    key: "createMeeting",
    value: function () {
      var _createMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(meeting) {
        var _ref10,
            _ref10$isAlertSuccess,
            isAlertSuccess,
            result,
            _args12 = arguments;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _ref10 = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {}, _ref10$isAlertSuccess = _ref10.isAlertSuccess, isAlertSuccess = _ref10$isAlertSuccess === void 0 ? true : _ref10$isAlertSuccess;

                if (!this.isScheduling) {
                  _context12.next = 3;
                  break;
                }

                return _context12.abrupt("return", this._createMeetingPromise);

              case 3:
                this._createMeetingPromise = this.createMeetingDirectly(meeting, {
                  isAlertSuccess: isAlertSuccess
                });
                _context12.next = 6;
                return this._createMeetingPromise;

              case 6:
                result = _context12.sent;
                this._createMeetingPromise = null;
                return _context12.abrupt("return", result);

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function createMeeting(_x5) {
        return _createMeeting.apply(this, arguments);
      }

      return createMeeting;
    }()
  }, {
    key: "startMeeting",
    value: function () {
      var _startMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(meeting) {
        var isAlertSuccess,
            _args13 = arguments;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                isAlertSuccess = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : true;
                return _context13.abrupt("return", this.createMeeting(_objectSpread(_objectSpread({}, meeting), {}, {
                  expiresIn: null,
                  type: _videoHelper.RcVideoTypes.meeting
                }), {
                  isAlertSuccess: isAlertSuccess
                }));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function startMeeting(_x6) {
        return _startMeeting.apply(this, arguments);
      }

      return startMeeting;
    }()
  }, {
    key: "getMeetingInvitation",
    value: function () {
      var _getMeetingInvitation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(invitationRequest) {
        var apiResponse;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (this._enableInvitationApi) {
                  _context14.next = 2;
                  break;
                }

                return _context14.abrupt("return", null);

              case 2:
                _context14.prev = 2;
                _context14.next = 5;
                return this._deps.client.service.platform().post('/rcvideo/v1/invitations/render', invitationRequest);

              case 5:
                apiResponse = _context14.sent;
                _context14.next = 8;
                return apiResponse.json();

              case 8:
                return _context14.abrupt("return", _context14.sent);

              case 11:
                _context14.prev = 11;
                _context14.t0 = _context14["catch"](2);
                console.warn('failed to get invitation', _context14.t0);
                return _context14.abrupt("return", null);

              case 15:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[2, 11]]);
      }));

      function getMeetingInvitation(_x7) {
        return _getMeetingInvitation.apply(this, arguments);
      }

      return getMeetingInvitation;
    }()
  }, {
    key: "_getDialinNumbers",
    value: function () {
      var _getDialinNumbers2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var _this3 = this;

        var result, _ref11, phoneNumbers, countryDialinNumbers, defaultPhoneNumber;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this._deps.client.service.platform().get('/rcvideo/v1/dial-in-numbers');

              case 2:
                result = _context15.sent;
                _context15.next = 5;
                return result.json();

              case 5:
                _ref11 = _context15.sent;
                phoneNumbers = _ref11.phoneNumbers;

                if (!Array.isArray(phoneNumbers)) {
                  _context15.next = 15;
                  break;
                }

                if (!this._enableHostCountryDialinNumbers) {
                  _context15.next = 12;
                  break;
                }

                countryDialinNumbers = (0, _ramda.filter)(function (obj) {
                  var _obj$country;

                  return (obj === null || obj === void 0 ? void 0 : (_obj$country = obj.country) === null || _obj$country === void 0 ? void 0 : _obj$country.isoCode) === _this3.country.isoCode;
                }, phoneNumbers);

                if (!(countryDialinNumbers.length > 0)) {
                  _context15.next = 12;
                  break;
                }

                return _context15.abrupt("return", countryDialinNumbers);

              case 12:
                defaultPhoneNumber = (0, _ramda.find)(function (obj) {
                  return obj["default"];
                }, phoneNumbers);

                if (!defaultPhoneNumber) {
                  _context15.next = 15;
                  break;
                }

                return _context15.abrupt("return", defaultPhoneNumber.phoneNumber);

              case 15:
                return _context15.abrupt("return", []);

              case 16:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function _getDialinNumbers() {
        return _getDialinNumbers2.apply(this, arguments);
      }

      return _getDialinNumbers;
    }()
  }, {
    key: "_getPreferences",
    value: function () {
      var _getPreferences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var accountId,
            extensionId,
            res,
            list,
            preferences,
            settingLocks,
            _args16 = arguments;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                accountId = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : this.accountId;
                extensionId = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : this.extensionId;
                _context16.next = 4;
                return this._deps.client.service.platform().get("/rcvideo/v1/account/".concat(accountId, "/extension/").concat(extensionId, "/preferences"), {
                  id: _videoHelper.RCV_PREFERENCES_IDS
                });

              case 4:
                res = _context16.sent;
                _context16.next = 7;
                return res.json();

              case 7:
                list = _context16.sent;
                preferences = {};
                settingLocks = {};
                list.forEach(function (_ref12) {
                  var id = _ref12.id,
                      value = _ref12.value,
                      readOnly = _ref12.readOnly;
                  (0, _videoHelper.assignObject)(preferences, value, id);
                  (0, _videoHelper.assignObject)(settingLocks, readOnly, id);
                });
                return _context16.abrupt("return", {
                  preferences: preferences,
                  settingLocks: settingLocks
                });

              case 12:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function _getPreferences() {
        return _getPreferences2.apply(this, arguments);
      }

      return _getPreferences;
    }()
  }, {
    key: "getExtensionInfo",
    value: function () {
      var _getExtensionInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(extensionId) {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!(Number(extensionId) === this.extensionId)) {
                  _context17.next = 2;
                  break;
                }

                return _context17.abrupt("return", this._deps.extensionInfo.info);

              case 2:
                return _context17.abrupt("return", this._deps.client.account().extension(extensionId).get());

              case 3:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function getExtensionInfo(_x8) {
        return _getExtensionInfo.apply(this, arguments);
      }

      return getExtensionInfo;
    }()
  }, {
    key: "_updatePreference",
    value: function _updatePreference(preferences) {
      this._updateMeetingPreferences(preferences);
    }
  }, {
    key: "_saveSinglePreference",
    value: function () {
      var _saveSinglePreference2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(preferenceId, value) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                return _context18.abrupt("return", this._deps.client.service.platform().send({
                  method: 'PATCH',
                  url: "/rcvideo/v1/account/~/extension/~/preferences/".concat(preferenceId),
                  body: {
                    value: value
                  }
                }));

              case 1:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function _saveSinglePreference(_x9, _x10) {
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
      var _savePreferencesChanges = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(preferences) {
        var _this4 = this;

        var isOverwrite,
            preferencesPayload,
            dirtyPreferences,
            _args19 = arguments;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                isOverwrite = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : false;
                preferencesPayload = (0, _videoHelper.reversePreferences)(preferences, this._isInstantMeeting);
                dirtyPreferences = Object.entries(preferencesPayload).filter(function (kvPairs) {
                  var _ref13 = kvPairs,
                      _ref14 = _slicedToArray(_ref13, 2),
                      preferenceId = _ref14[0],
                      newValue = _ref14[1];

                  var oldValue = _this4.preferences[preferenceId];
                  var isLocked = _this4.settingLocks[preferenceId]; // hack for watingRoom, it will change locked option

                  return newValue !== oldValue && !isLocked;
                });
                _context19.prev = 3;
                _context19.next = 6;
                return Promise.all(dirtyPreferences.map(function (_ref15) {
                  var _ref16 = _slicedToArray(_ref15, 2),
                      preferenceId = _ref16[0],
                      newValue = _ref16[1];

                  return _this4._saveSinglePreference(preferenceId, newValue);
                }));

              case 6:
                if (isOverwrite) {
                  this._updatePreference(preferencesPayload);
                }

                _context19.next = 12;
                break;

              case 9:
                _context19.prev = 9;
                _context19.t0 = _context19["catch"](3);
                console.error(_context19.t0);

              case 12:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[3, 9]]);
      }));

      function savePreferencesChanges(_x11) {
        return _savePreferencesChanges.apply(this, arguments);
      }

      return savePreferencesChanges;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(meetingId) {
        var accountId,
            extensionId,
            result,
            meeting,
            _args20 = arguments;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                accountId = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : this.accountId;
                extensionId = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : this.extensionId;
                _context20.next = 4;
                return this._deps.client.service.platform().get('/rcvideo/v1/bridges', {
                  shortId: meetingId,
                  accountId: accountId,
                  extensionId: extensionId
                });

              case 4:
                result = _context20.sent;
                _context20.next = 7;
                return result.json();

              case 7:
                meeting = _context20.sent;
                return _context20.abrupt("return", meeting);

              case 9:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function getMeeting(_x12) {
        return _getMeeting.apply(this, arguments);
      }

      return getMeeting;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(meetingId, meeting) {
        var _this5 = this;

        var _ref17,
            _ref17$isAlertSuccess,
            isAlertSuccess,
            meetingDetail,
            meetingResult,
            newMeeting,
            dialInNumber,
            extensionInfo,
            invitationInfo,
            meetingResponse,
            _args21 = arguments;

        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _ref17 = _args21.length > 2 && _args21[2] !== undefined ? _args21[2] : {}, _ref17$isAlertSuccess = _ref17.isAlertSuccess, isAlertSuccess = _ref17$isAlertSuccess === void 0 ? false : _ref17$isAlertSuccess;
                _context21.prev = 1;

                this._updateVideoStatus(_videoStatus.videoStatus.updating);

                meetingDetail = (0, _videoHelper.pruneMeetingObject)(meeting);

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                if (!this.enableWaitingRoom) {
                  meetingDetail = (0, _ramda.omit)([_videoHelper.RCV_WAITTING_ROOM_API_KEYS], meetingDetail);
                }

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                _context21.next = 9;
                return this._deps.client.service.platform().send({
                  method: 'PATCH',
                  url: "/rcvideo/v1/bridges/".concat(meeting.id),
                  body: meetingDetail
                });

              case 9:
                meetingResult = _context21.sent;
                _context21.next = 12;
                return meetingResult.json();

              case 12:
                newMeeting = _context21.sent;
                _context21.next = 15;
                return this._getDialinNumbers();

              case 15:
                dialInNumber = _context21.sent;
                _context21.next = 18;
                return this.getExtensionInfo(this.currentUser.extensionId);

              case 18:
                extensionInfo = _context21.sent;
                _context21.next = 21;
                return this.getMeetingInvitation({
                  hostName: extensionInfo.name,
                  meetingName: newMeeting.name,
                  meetingId: newMeeting.id,
                  meetingUrl: newMeeting.joinUri,
                  participantCode: newMeeting.participantCode,
                  mainPhoneNumber: (0, _videoHelper.formatMainPhoneNumber)(dialInNumber),
                  password: newMeeting.meetingPassword,
                  dialInPassword: newMeeting.meetingPasswordPSTN,
                  premiumNumbers: (0, _videoHelper.formatPremiumNumbers)(dialInNumber)
                });

              case 21:
                invitationInfo = _context21.sent;

                if (!meeting.saveAsDefault) {
                  _context21.next = 25;
                  break;
                }

                _context21.next = 25;
                return this.savePreferencesChanges(meeting, true);

              case 25:
                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this5._deps.alert.success({
                      message: _meetingStatus["default"].updatedSuccess
                    });
                  }, 50);
                }

                this._updateVideoStatus(_videoStatus.videoStatus.updated);

                this._updateHasSettingsChanged(false);

                meetingResponse = {
                  invitationInfo: invitationInfo,
                  extensionInfo: extensionInfo,
                  dialInNumber: dialInNumber,
                  meeting: _objectSpread(_objectSpread({}, meeting), newMeeting)
                };

                if (this.personalMeeting && newMeeting.id === this.personalMeeting.id) {
                  this._savePersonalMeeting(newMeeting);
                }

                return _context21.abrupt("return", meetingResponse);

              case 33:
                _context21.prev = 33;
                _context21.t0 = _context21["catch"](1);

                this._updateVideoStatus(_videoStatus.videoStatus.idle);

                this._errorHandle(_context21.t0);

                return _context21.abrupt("return", null);

              case 38:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this, [[1, 33]]);
      }));

      function updateMeeting(_x13, _x14) {
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
    key: "updateMeetingSettings",
    value: function () {
      var _updateMeetingSettings2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(meeting) {
        var patch,
            processedMeeting,
            _args22 = arguments;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                patch = _args22.length > 1 && _args22[1] !== undefined ? _args22[1] : true;
                processedMeeting = meeting;

                if (this.enableWaitingRoom) {
                  processedMeeting = _objectSpread(_objectSpread({}, meeting), (0, _videoHelper.patchWaitingRoomRelated)(_objectSpread(_objectSpread({}, this.meeting), meeting), this.transformedPreferences, true));
                }

                this._updateMeetingSettings(processedMeeting, patch);

                this._comparePreferences();

              case 5:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function updateMeetingSettings(_x15) {
        return _updateMeetingSettings2.apply(this, arguments);
      }

      return updateMeetingSettings;
    }()
  }, {
    key: "_comparePreferences",
    value: function _comparePreferences() {
      this._updateIsPreferencesChanged((0, _videoHelper.comparePreferences)(this.transformedPreferences, this.meeting));
    }
  }, {
    key: "updateHasSettingsChanged",
    value: function updateHasSettingsChanged(isChanged) {
      this._updateHasSettingsChanged(isChanged);
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

                    this._deps.alert.warning(error);
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

                this._deps.alert.danger({
                  message: _meetingStatus["default"].insufficientPermissions,
                  payload: {
                    permissionName: permissionName
                  }
                });

                _context23.next = 22;
                break;

              case 15:
                _context23.t0 = !this._deps.availabilityMonitor;

                if (_context23.t0) {
                  _context23.next = 20;
                  break;
                }

                _context23.next = 19;
                return this._deps.availabilityMonitor.checkIfHAError(errors);

              case 19:
                _context23.t0 = !_context23.sent;

              case 20:
                if (!_context23.t0) {
                  _context23.next = 22;
                  break;
                }

                this._deps.alert.danger({
                  message: _meetingStatus["default"].internalError
                });

              case 22:
                _context23.next = 26;
                break;

              case 24:
                console.log('errors:', errors);

                this._deps.alert.danger({
                  message: _meetingStatus["default"].internalError
                });

              case 26:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function _errorHandle(_x16) {
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
    key: "personalMeeting",
    get: function get() {
      return this._enablePersonalMeeting ? this.personalVideo : null;
    }
  }, {
    key: "savedDefaultVideoSetting",
    get: function get() {
      return this._showSaveAsDefault ? this.savedDefaultSetting : null;
    }
  }, {
    key: "country",
    get: function get() {
      return this._deps.extensionInfo.country;
    }
  }, {
    key: "extensionName",
    get: function get() {
      var _this$_deps$extension;

      return (_this$_deps$extension = this._deps.extensionInfo.info) === null || _this$_deps$extension === void 0 ? void 0 : _this$_deps$extension.name;
    }
  }, {
    key: "extensionId",
    get: function get() {
      return this._deps.extensionInfo.info.id;
    }
  }, {
    key: "accountId",
    get: function get() {
      return this._deps.accountInfo.id;
    }
  }, {
    key: "brandName",
    get: function get() {
      return this._deps.brand.name;
    }
  }, {
    key: "isInitializing",
    get: function get() {
      return this.videoStatus === _videoStatus.videoStatus.initializing;
    }
  }, {
    key: "isScheduling",
    get: function get() {
      return this.videoStatus === _videoStatus.videoStatus.creating;
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
    key: "isInstantMeeting",
    get: function get() {
      return this._isInstantMeeting;
    }
  }, {
    key: "currentLocale",
    get: function get() {
      return this._deps.locale.currentLocale || _i18n.DEFAULT_LOCALE;
    }
  }, {
    key: "transformedPreferences",
    get: function get() {
      return (0, _videoHelper.transformPreferences)(this.preferences, this.isInstantMeeting);
    }
  }, {
    key: "transformedSettingLocks",
    get: function get() {
      return (0, _videoHelper.transformSettingLocks)(this.settingLocks, this.isInstantMeeting);
    }
  }, {
    key: "personalVideoSetting",
    get: function get() {
      if (!this.personalMeeting) {
        return null;
      }

      var processedSettings = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this.initialVideoSetting), this.personalMeeting), (0, _videoHelper.getLockedPreferences)(this.transformedSettingLocks, this.transformedPreferences)), {}, {
        meetingPassword: this.personalMeeting.meetingPassword || (0, _videoHelper.generateRandomPassword)(10),
        isMeetingPasswordValid: true,
        // assume personal meeting password is valid
        id: this.personalMeeting.id,
        usePersonalMeetingId: true,
        settingLock: _objectSpread({}, this.transformedSettingLocks)
      });

      if (this.enableWaitingRoom) {
        return _objectSpread(_objectSpread({}, processedSettings), (0, _videoHelper.patchWaitingRoomRelated)(processedSettings, this.transformedPreferences));
      }

      return processedSettings;
    }
  }, {
    key: "defaultVideoSetting",
    get: function get() {
      var savedSetting = this._showSaveAsDefault ? this.savedDefaultVideoSetting : null;
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this.initialVideoSetting), savedSetting), this.transformedPreferences), {}, {
        meetingPassword: (0, _videoHelper.generateRandomPassword)(10),
        isMeetingPasswordValid: true,
        // generated random password is valid
        id: null,
        usePersonalMeetingId: false,
        settingLock: _objectSpread({}, this.transformedSettingLocks)
      });
    }
  }, {
    key: "initialVideoSetting",
    get: function get() {
      var startTime = (0, _meetingHelper.getInitializedStartTime)();
      return (0, _videoHelper.getDefaultVideoSettings)({
        topic: this.defaultTopic,
        startTime: new Date(startTime),
        accountId: this.currentUser.accountId,
        extensionId: this.currentUser.extensionId
      });
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
    key: "currentUser",
    get: function get() {
      return this.delegator || this.loginUser;
    }
  }]);

  return RcVideo;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "personalVideo", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "savedDefaultSetting", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "meeting", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "videoStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _videoStatus.videoStatus.idle;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "preferences", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isPreferencesChanged", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "settingLocks", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "delegator", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "delegators", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "hasSettingsChanged", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_savePersonalMeeting", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_savePersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetPersonalMeeting", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_saveDefaultVideoSetting", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_saveDefaultVideoSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMeetingSettings", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateVideoStatus", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateVideoStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMeetingPreferences", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMeetingPreferences"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateIsPreferencesChanged", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateIsPreferencesChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMeetingSettingLocks", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMeetingSettingLocks"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateDelegator", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateDelegator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateDelegatorList", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateDelegatorList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateHasSettingsChanged", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateHasSettingsChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onInit", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onInit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateDelegator", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateDelegator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createMeetingDirectly", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "createMeetingDirectly"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "createMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingInvitation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingInvitation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getDialinNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_getDialinNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getExtensionInfo", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getExtensionInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentLocale", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "currentLocale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transformedPreferences", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "transformedPreferences"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transformedSettingLocks", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "transformedSettingLocks"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "personalVideoSetting", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "personalVideoSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultVideoSetting", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultVideoSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initialVideoSetting", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "initialVideoSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultTopic", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultTopic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loginUser", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "loginUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentUser", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "currentUser"), _class2.prototype)), _class2)) || _class);
exports.RcVideo = RcVideo;
//# sourceMappingURL=RcVideo.js.map

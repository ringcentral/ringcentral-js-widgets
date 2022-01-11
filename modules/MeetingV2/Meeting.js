"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Meeting = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("regenerator-runtime/runtime");

var _moment = _interopRequireDefault(require("moment"));

var _ramda = require("ramda");

var _core = require("@ringcentral-integration/core");

var _i18n = require("@ringcentral-integration/i18n");

var _meetingHelper = require("../../helpers/meetingHelper");

var _background = _interopRequireDefault(require("../../lib/background"));

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _Analytics = require("../Analytics");

var _constants = require("./constants");

var _helper = require("./helper");

var _meetingErrors = require("./meetingErrors");

var _meetingStatus = require("./meetingStatus");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Meeting = (_dec = (0, _di.Module)({
  name: 'Meeting',
  deps: ['Brand', 'Alert', 'Client', 'ExtensionInfo', 'Storage', 'VideoConfiguration', 'Locale', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'MeetingOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var extensionName = _ref.extensionName,
      currentLocale = _ref.currentLocale;
  return [extensionName, currentLocale];
}), _dec3 = (0, _core.computed)(function (that) {
  var _that$userSettings;

  return [(_that$userSettings = that.userSettings) === null || _that$userSettings === void 0 ? void 0 : _that$userSettings.scheduleMeeting];
}), _dec4 = (0, _core.computed)(function (that) {
  var _that$userSettings2;

  return [(_that$userSettings2 = that.userSettings) === null || _that$userSettings2 === void 0 ? void 0 : _that$userSettings2.telephony];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.enablePersonalMeeting, that.enableServiceWebSettings, that.scheduleUserSettings.usePmiForScheduledMeetings];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.extensionInfo.info.id];
}), _dec7 = (0, _core.computed)(function (that) {
  var _that$lockedSettings;

  return [(_that$lockedSettings = that.lockedSettings) === null || _that$lockedSettings === void 0 ? void 0 : _that$lockedSettings.scheduleMeeting];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that.enableServiceWebSettings, that.scheduleLockedSettings];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.enableServiceWebSettings, that.scheduleUserSettings];
}), _dec10 = (0, _core.computed)(function (that) {
  return [that.enablePersonalMeeting, that.personalMeeting];
}), _dec11 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale];
}), _dec12 = (0, _core.track)(function (that, isScheduling) {
  if (!isScheduling) return;
  return function (analytics) {
    var target = analytics.getTrackTarget();

    if (target) {
      return [_Analytics.trackEvents.clickMeetingSchedulePage, {
        router: target.router,
        'Meeting Type': 'RCM'
      }];
    }
  };
}), _dec13 = (0, _core.computed)(function (_ref2) {
  var _deps = _ref2._deps;
  return [_deps.brand.brandConfig.meetingUriReg.rcm];
}), _dec14 = (0, _core.computed)(function (_ref3) {
  var _deps = _ref3._deps,
      rcvBaseWebUri = _ref3.rcvBaseWebUri;
  return [_deps.brand.brandConfig.meetingUriReg.rcv, rcvBaseWebUri];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Meeting, _RcModuleV);

  var _super = _createSuper(Meeting);

  function Meeting(deps) {
    var _this;

    _classCallCheck(this, Meeting);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'Meeting'
    });
    _this._fetchDelegatorsTimeout = null;
    _this._fetchPersonMeetingTimeout = null;
    _this._createMeetingPromise = void 0;

    _initializerDefineProperty(_this, "meeting", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isScheduling", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "updatingStatus", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "personalMeeting", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "savedDefaultMeetingSetting", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "lastMeetingSetting", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "delegators", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "userSettings", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "lockedSettings", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "preferences", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isPreferencesChanged", _descriptor11, _assertThisInitialized(_this));

    _this.rcvBaseWebUri = null;
    return _this;
  }

  _createClass(Meeting, [{
    key: "getGeneralDefaultSettings",
    value: function getGeneralDefaultSettings() {
      if (!this.enableServiceWebSettings) {
        var savedSetting = this.showSaveAsDefault ? this.savedDefaultMeetingSetting : this.lastMeetingSetting;
        return _objectSpread(_objectSpread(_objectSpread({}, this.initialMeetingSetting), savedSetting), {}, {
          meetingType: _meetingHelper.MeetingType.SCHEDULED
        });
      }

      return this.enforcePassword(_objectSpread(_objectSpread({}, this.initialMeetingSetting), {}, {
        settingLock: this.defaultLockedSettings
      }), {
        userSettings: this.commonUserSettings,
        personalMeetingSettings: this.commonPersonalMeetingSettings
      }, false);
    }
  }, {
    key: "getInitialMeetingSetting",
    value: function getInitialMeetingSetting() {
      var meetingName = (0, _helper.getExtensionName)({
        extensionInfo: this.extensionInfo,
        enableScheduleOnBehalf: this.enableScheduleOnBehalf,
        meeting: this.meeting,
        delegators: this.delegators
      });
      var startTime = (0, _meetingHelper.getInitializedStartTime)();
      var hostId = (0, _helper.getHostId)({
        enableScheduleOnBehalf: this.enableScheduleOnBehalf,
        meeting: this.meeting,
        extensionInfo: this.extensionInfo
      });
      var setting = (0, _meetingHelper.getDefaultMeetingSettings)(meetingName, this.currentLocale, startTime, hostId);

      if (!this.enableServiceWebSettings) {
        return setting;
      }

      return _objectSpread(_objectSpread(_objectSpread({}, setting), _constants.DEFAULT_LOCK_SETTINGS), {}, {
        _pmiPassword: ''
      });
    }
  }, {
    key: "_updateDelegators",
    value: function _updateDelegators(delegators) {
      this.delegators = delegators;
    }
  }, {
    key: "_updateUserSettings",
    value: function _updateUserSettings(userSettings) {
      this.userSettings = userSettings;
    }
  }, {
    key: "_updateLockedSettings",
    value: function _updateLockedSettings(lockedSettings) {
      this.lockedSettings = lockedSettings;
    }
  }, {
    key: "_updatePersonalMeeting",
    value: function _updatePersonalMeeting(personalMeeting) {
      this.personalMeeting = personalMeeting;
    }
  }, {
    key: "_updatePreferences",
    value: function _updatePreferences(preferences) {
      this.preferences = preferences;
    }
  }, {
    key: "_updateIsPreferencesChanged",
    value: function _updateIsPreferencesChanged(isPreferencesChanged) {
      this.isPreferencesChanged = isPreferencesChanged;
    }
  }, {
    key: "_updateMeetingState",
    value: function _updateMeetingState(meeting) {
      this.meeting = meeting;
    }
  }, {
    key: "_updateUpdatingStatus",
    value: function _updateUpdatingStatus(updatingStatus) {
      this.updatingStatus = updatingStatus;
    }
  }, {
    key: "_updateLastMeetingSetting",
    value: function _updateLastMeetingSetting(lastMeetingSetting) {
      this.lastMeetingSetting = lastMeetingSetting;
    }
  }, {
    key: "_updateSavedDefaultMeetingSetting",
    value: function _updateSavedDefaultMeetingSetting(savedDefaultMeetingSetting) {
      this.savedDefaultMeetingSetting = savedDefaultMeetingSetting;
    }
  }, {
    key: "_updateIsScheduling",
    value: function _updateIsScheduling(isScheduling) {
      this.isScheduling = isScheduling;
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
                return this._init();

              case 2:
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
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(Meeting.prototype), "_shouldInit", this).call(this) && this._deps.videoConfiguration.isRCM;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(Meeting.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.videoConfiguration.isRCM;
    }
  }, {
    key: "initScheduleFor",
    value: function () {
      var _initScheduleFor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var count,
            _yield$this$getDelega,
            records,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                count = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 0;

                if (this.enableScheduleOnBehalf) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                if (this._fetchDelegatorsTimeout) {
                  clearTimeout(this._fetchDelegatorsTimeout);
                }

                _context2.prev = 4;
                _context2.next = 7;
                return this.getDelegators();

              case 7:
                _yield$this$getDelega = _context2.sent;
                records = _yield$this$getDelega.records;

                if (!(!records || records.length === 0)) {
                  _context2.next = 12;
                  break;
                }

                this.updateDelegators([]);
                return _context2.abrupt("return");

              case 12:
                this.updateDelegators([this.loginUser].concat(_toConsumableArray(records)));
                _context2.next = 23;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](4);
                console.error('fetch delegators error:', _context2.t0);

                if (!(count >= 5)) {
                  _context2.next = 22;
                  break;
                }

                console.warn('retry after 10s');
                this._fetchDelegatorsTimeout = setTimeout(function () {
                  _this2.initScheduleFor(count + 1);
                }, 10000);
                return _context2.abrupt("return");

              case 22:
                this.updateDelegators([]);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 15]]);
      }));

      function initScheduleFor() {
        return _initScheduleFor.apply(this, arguments);
      }

      return initScheduleFor;
    }()
  }, {
    key: "_initMeetingSettings",
    value: function () {
      var _initMeetingSettings2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(extensionId) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Promise.all([this._initPersonalMeeting(extensionId), this._updateServiceWebSettings(extensionId)]);

              case 2:
                _context3.next = 4;
                return this._initMeeting(extensionId);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _initMeetingSettings(_x) {
        return _initMeetingSettings2.apply(this, arguments);
      }

      return _initMeetingSettings;
    }()
    /**
     * Init basic meeting information
     * also load meeting setting from previous one.
     */

  }, {
    key: "init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._init();

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function init() {
        return _init2.apply(this, arguments);
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
                return this._init();

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
    key: "_init",
    value: function () {
      var _init3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Promise.all([this._initMeetingSettings(), this.initScheduleFor()]);

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _init() {
        return _init3.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_initMeeting",
    value: function () {
      var _initMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(extensionId) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.update(_objectSpread(_objectSpread({}, this.defaultMeetingSetting), {}, {
                  host: {
                    id: extensionId || this.loginUser.id
                  }
                }));
                this.updatePreferences((0, _meetingHelper.prunePreferencesObject)(this.meeting));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _initMeeting(_x2) {
        return _initMeeting2.apply(this, arguments);
      }

      return _initMeeting;
    }()
  }, {
    key: "updatePreferences",
    value: function () {
      var _updatePreferences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(preferences) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this._updatePreferences(preferences);

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function updatePreferences(_x3) {
        return _updatePreferences2.apply(this, arguments);
      }

      return updatePreferences;
    }()
  }, {
    key: "updateIsPreferencesChanged",
    value: function () {
      var _updateIsPreferencesChanged2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(isPreferencesChanged) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this._updateIsPreferencesChanged(isPreferencesChanged);

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function updateIsPreferencesChanged(_x4) {
        return _updateIsPreferencesChanged2.apply(this, arguments);
      }

      return updateIsPreferencesChanged;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_meeting) {
        var meeting, finalMeeting;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                meeting = _meeting;

                if (this.enableServiceWebSettings) {
                  meeting = this.combineWithSettings(_meeting);
                }

                finalMeeting = _objectSpread(_objectSpread({}, meeting), {}, {
                  isMeetingPasswordValid: this.validatePasswordSettings(_meeting.password, _meeting._requireMeetingPassword)
                });
                this.updateMeetingState(finalMeeting);

                this._comparePreferences(finalMeeting);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function update(_x5) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "_comparePreferences",
    value: function _comparePreferences(meeting) {
      this.updateIsPreferencesChanged((0, _meetingHelper.comparePreferences)(this.preferences, meeting));
    }
  }, {
    key: "validatePasswordSettings",
    value: function validatePasswordSettings(password, isSecret) {
      if (!isSecret) {
        return true;
      }

      if (password && _constants.RCM_PASSWORD_REGEX.test(password)) {
        return true;
      }

      return false;
    }
  }, {
    key: "combineWithSettings",
    value: function combineWithSettings(_meeting) {
      return this._combineWithSWSettings(_meeting);
    }
  }, {
    key: "_combineWithSWSettings",
    value: function _combineWithSWSettings(meeting) {
      if (!meeting.usePersonalMeetingId) {
        return meeting;
      }

      var processedMeeting = _objectSpread({}, meeting);

      var allowJoinBeforeHost = processedMeeting.allowJoinBeforeHost;
      var requirePasswordForPmiMeetings = this.scheduleUserSettings.requirePasswordForPmiMeetings;
      var lockedRequirePasswordForPmiMeetings = this.scheduleLockedSettings.requirePasswordForPmiMeetings;

      if (lockedRequirePasswordForPmiMeetings && requirePasswordForPmiMeetings === _constants.PMIRequirePassword.JBH_ONLY) {
        if (allowJoinBeforeHost && !processedMeeting._requireMeetingPassword) {
          processedMeeting._requireMeetingPassword = true;
          processedMeeting.password = processedMeeting._pmiPassword || (0, _meetingHelper.generateRandomPassword)();
        }

        processedMeeting._lockRequireMeetingPassword = allowJoinBeforeHost;
      }

      return processedMeeting;
    }
  }, {
    key: "_initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(extensionId) {
        var _this3 = this;

        var count,
            meetingInfoResponse,
            meeting,
            _args11 = arguments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                count = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 0;

                if (this.enablePersonalMeeting) {
                  _context11.next = 3;
                  break;
                }

                return _context11.abrupt("return");

              case 3:
                if (this._fetchPersonMeetingTimeout) {
                  clearTimeout(this._fetchPersonMeetingTimeout);
                }

                _context11.prev = 4;
                _context11.next = 7;
                return this.fetchPersonalMeeting(extensionId);

              case 7:
                meetingInfoResponse = _context11.sent;
                meeting = this.formatPersonalMeeting(meetingInfoResponse);
                this.updatePersonalMeeting(meeting);
                _context11.next = 17;
                break;

              case 12:
                _context11.prev = 12;
                _context11.t0 = _context11["catch"](4);
                console.error('fetch personal meeting error:', _context11.t0);
                this.resetPersonalMeeting();

                if (count < 5) {
                  console.warn('retry after 10s');
                  this._fetchPersonMeetingTimeout = setTimeout(function () {
                    _this3._initPersonalMeeting(extensionId, count + 1);
                  }, 10000);
                }

              case 17:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[4, 12]]);
      }));

      function _initPersonalMeeting(_x6) {
        return _initPersonalMeeting2.apply(this, arguments);
      }

      return _initPersonalMeeting;
    }()
  }, {
    key: "_updateServiceWebSettings",
    value: function () {
      var _updateServiceWebSettings2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(extensionId) {
        var _yield$Promise$all, _yield$Promise$all2, userSettings, lockedSettings;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (this.enableServiceWebSettings) {
                  _context12.next = 2;
                  break;
                }

                return _context12.abrupt("return");

              case 2:
                _context12.prev = 2;
                _context12.next = 5;
                return Promise.all([this.getUserSettings(extensionId), this.getLockedSettings()]);

              case 5:
                _yield$Promise$all = _context12.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                userSettings = _yield$Promise$all2[0];
                lockedSettings = _yield$Promise$all2[1];
                this.updateUserSettings(userSettings);
                this.updateLockedSettings(lockedSettings);
                _context12.next = 16;
                break;

              case 13:
                _context12.prev = 13;
                _context12.t0 = _context12["catch"](2);
                console.error('error:', _context12.t0);

              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[2, 13]]);
      }));

      function _updateServiceWebSettings(_x7) {
        return _updateServiceWebSettings2.apply(this, arguments);
      }

      return _updateServiceWebSettings;
    }()
  }, {
    key: "switchUsePersonalMeetingId",
    value: function () {
      var _switchUsePersonalMeetingId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(usePersonalMeetingId) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this.update(usePersonalMeetingId ? this.pmiDefaultSettings : this.getGeneralDefaultSettings());

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function switchUsePersonalMeetingId(_x8) {
        return _switchUsePersonalMeetingId.apply(this, arguments);
      }

      return switchUsePersonalMeetingId;
    }()
  }, {
    key: "saveAsDefaultSetting",
    value: function () {
      var _saveAsDefaultSetting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(meeting) {
        var formattedMeeting;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                formattedMeeting = this._format(meeting);
                this.updateSavedDefaultMeetingSetting(_objectSpread(_objectSpread({}, formattedMeeting), {}, {
                  _saved: meeting.notShowAgain,
                  _requireMeetingPassword: meeting._requireMeetingPassword
                }));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function saveAsDefaultSetting(_x9) {
        return _saveAsDefaultSetting.apply(this, arguments);
      }

      return saveAsDefaultSetting;
    }()
  }, {
    key: "scheduleDirectly",
    value: function () {
      var _scheduleDirectly = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(meeting) {
        var _this4 = this;

        var _ref4,
            _ref4$isAlertSuccess,
            isAlertSuccess,
            _meeting$host,
            formattedMeeting,
            _yield$Promise$all3,
            _yield$Promise$all4,
            resp,
            serviceInfo,
            invitationInfo,
            result,
            _args15 = arguments;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _ref4 = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {}, _ref4$isAlertSuccess = _ref4.isAlertSuccess, isAlertSuccess = _ref4$isAlertSuccess === void 0 ? true : _ref4$isAlertSuccess;
                _context15.prev = 1;
                meeting = meeting || this.meeting;
                this.updateIsScheduling(true); // Validate meeting

                this._validate(meeting);

                formattedMeeting = this._format(meeting);

                if (this.showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                _context15.next = 9;
                return Promise.all([this.postMeeting(formattedMeeting), this.getMeetingServiceInfo((_meeting$host = meeting.host) === null || _meeting$host === void 0 ? void 0 : _meeting$host.id)]);

              case 9:
                _yield$Promise$all3 = _context15.sent;
                _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
                resp = _yield$Promise$all4[0];
                serviceInfo = _yield$Promise$all4[1];
                _context15.next = 15;
                return this.getMeetingInvitation(resp.id, this.currentLocale);

              case 15:
                invitationInfo = _context15.sent;
                this.updateLastMeetingSetting(_objectSpread(_objectSpread({}, formattedMeeting), {}, {
                  _saved: meeting._saved
                }));
                _context15.next = 19;
                return this._createDialingNumberTpl(serviceInfo, resp, invitationInfo);

              case 19:
                result = _context15.sent;

                // Reload meeting info
                if (this.enableReloadAfterSchedule) {
                  this._initMeeting();
                } // Update personal meeting setting


                if (this.enablePersonalMeeting && resp.usePersonalMeetingId) {
                  this.updatePersonalMeeting(this.formatPersonalMeeting(resp, serviceInfo.externalUserInfo.personalMeetingId));

                  if (this.enableServiceWebSettings) {
                    this.update(_objectSpread(_objectSpread({}, this.meeting), {}, {
                      _pmiPassword: resp.password
                    }));
                  }
                } // Notify user the meeting has been scheduled


                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this4._deps.alert.success({
                      message: _meetingStatus.meetingStatus.scheduledSuccess
                    });
                  }, 50);
                }

                return _context15.abrupt("return", result);

              case 26:
                _context15.prev = 26;
                _context15.t0 = _context15["catch"](1);
                _context15.next = 30;
                return this._errorHandle(_context15.t0);

              case 30:
                return _context15.abrupt("return", null);

              case 31:
                _context15.prev = 31;
                this.updateIsScheduling(false);
                return _context15.finish(31);

              case 34:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[1, 26, 31, 34]]);
      }));

      function scheduleDirectly(_x10) {
        return _scheduleDirectly.apply(this, arguments);
      }

      return scheduleDirectly;
    }()
  }, {
    key: "schedule",
    value: function () {
      var _schedule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(meeting) {
        var _ref5,
            _ref5$isAlertSuccess,
            isAlertSuccess,
            result,
            _args16 = arguments;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _ref5 = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {}, _ref5$isAlertSuccess = _ref5.isAlertSuccess, isAlertSuccess = _ref5$isAlertSuccess === void 0 ? true : _ref5$isAlertSuccess;

                if (!this.isScheduling) {
                  _context16.next = 3;
                  break;
                }

                return _context16.abrupt("return", this._createMeetingPromise);

              case 3:
                this._createMeetingPromise = this.scheduleDirectly(meeting, {
                  isAlertSuccess: isAlertSuccess
                });
                _context16.next = 6;
                return this._createMeetingPromise;

              case 6:
                result = _context16.sent;
                this._createMeetingPromise = null;
                return _context16.abrupt("return", result);

              case 9:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function schedule(_x11) {
        return _schedule2.apply(this, arguments);
      }

      return schedule;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(meetingId, meeting) {
        var _this5 = this;

        var _ref6,
            _ref6$isAlertSuccess,
            isAlertSuccess,
            _meeting$host2,
            formattedMeeting,
            _yield$_promise,
            _yield$_promise2,
            resp,
            serviceInfo,
            invitationInfo,
            result,
            _args17 = arguments;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _ref6 = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : {}, _ref6$isAlertSuccess = _ref6.isAlertSuccess, isAlertSuccess = _ref6$isAlertSuccess === void 0 ? false : _ref6$isAlertSuccess;

                if (!this._isUpdating(meetingId)) {
                  _context17.next = 3;
                  break;
                }

                return _context17.abrupt("return", this.updateMeeting._promise);

              case 3:
                meeting = meeting || this.meeting;
                _context17.prev = 4;
                this.addUpdatingStatus(meetingId); // Validate meeting

                this._validate(meeting);

                formattedMeeting = this._format(meeting);

                if (this.showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                this.updateMeeting._promise = Promise.all([this.putMeeting(meetingId, formattedMeeting), this.getMeetingServiceInfo((_meeting$host2 = meeting.host) === null || _meeting$host2 === void 0 ? void 0 : _meeting$host2.id)]);
                _context17.next = 12;
                return this.updateMeeting._promise;

              case 12:
                _yield$_promise = _context17.sent;
                _yield$_promise2 = _slicedToArray(_yield$_promise, 2);
                resp = _yield$_promise2[0];
                serviceInfo = _yield$_promise2[1];
                _context17.next = 18;
                return this.getMeetingInvitation(meetingId, this.currentLocale);

              case 18:
                invitationInfo = _context17.sent;
                _context17.next = 21;
                return this._createDialingNumberTpl(serviceInfo, resp, invitationInfo);

              case 21:
                result = _context17.sent;

                // Reload meeting info
                if (this.enableReloadAfterSchedule) {
                  this._initMeeting();
                } // Update personal meeting setting


                if (this.enablePersonalMeeting && resp.usePersonalMeetingId) {
                  this.updatePersonalMeeting(this.formatPersonalMeeting(resp, serviceInfo.externalUserInfo.personalMeetingId));

                  if (this.enableServiceWebSettings) {
                    this.update(_objectSpread(_objectSpread({}, this.meeting), {}, {
                      _pmiPassword: resp.password
                    }));
                  }
                } // Notify user the meeting has been updated


                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this5._deps.alert.success({
                      message: _meetingStatus.meetingStatus.updatedSuccess
                    });
                  }, 50);
                }

                return _context17.abrupt("return", result);

              case 28:
                _context17.prev = 28;
                _context17.t0 = _context17["catch"](4);
                _context17.next = 32;
                return this._errorHandle(_context17.t0);

              case 32:
                return _context17.abrupt("return", null);

              case 33:
                _context17.prev = 33;
                delete this.updateMeeting._promise;
                this.removeUpdatingStatus(meetingId);
                return _context17.finish(33);

              case 37:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[4, 28, 33, 37]]);
      }));

      function updateMeeting(_x12, _x13) {
        return _updateMeeting.apply(this, arguments);
      }

      return updateMeeting;
    }()
  }, {
    key: "deleteMeeting",
    value: function () {
      var _deleteMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(meetingId) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                _context18.next = 3;
                return this._deps.client.account().extension().meeting(meetingId)["delete"]();

              case 3:
                return _context18.abrupt("return", true);

              case 6:
                _context18.prev = 6;
                _context18.t0 = _context18["catch"](0);
                _context18.next = 10;
                return this._errorHandle(_context18.t0);

              case 10:
                return _context18.abrupt("return", false);

              case 11:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[0, 6]]);
      }));

      function deleteMeeting(_x14) {
        return _deleteMeeting.apply(this, arguments);
      }

      return deleteMeeting;
    }()
  }, {
    key: "updateScheduleFor",
    value: function () {
      var _updateScheduleFor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var userExtensionId,
            hostId,
            user,
            _args19 = arguments;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                userExtensionId = _args19.length > 0 && _args19[0] !== undefined ? _args19[0] : "".concat(this.extensionId);

                if (!(!this.delegators || this.delegators.length === 0)) {
                  _context19.next = 3;
                  break;
                }

                return _context19.abrupt("return");

              case 3:
                hostId = "".concat(userExtensionId);
                user = (0, _ramda.find)(function (item) {
                  return item.id === hostId;
                }, this.delegators);

                if (!user) {
                  _context19.next = 8;
                  break;
                }

                _context19.next = 8;
                return this._initMeetingSettings(hostId);

              case 8:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function updateScheduleFor() {
        return _updateScheduleFor.apply(this, arguments);
      }

      return updateScheduleFor;
    }()
  }, {
    key: "updateDelegators",
    value: function () {
      var _updateDelegators2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(delegators) {
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                this._updateDelegators(delegators);

              case 1:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function updateDelegators(_x15) {
        return _updateDelegators2.apply(this, arguments);
      }

      return updateDelegators;
    }()
  }, {
    key: "updateUserSettings",
    value: function () {
      var _updateUserSettings2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(userSettings) {
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                this._updateUserSettings(userSettings);

              case 1:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function updateUserSettings(_x16) {
        return _updateUserSettings2.apply(this, arguments);
      }

      return updateUserSettings;
    }()
  }, {
    key: "updateLockedSettings",
    value: function () {
      var _updateLockedSettings2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(lockedSettings) {
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                this._updateLockedSettings(lockedSettings);

              case 1:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function updateLockedSettings(_x17) {
        return _updateLockedSettings2.apply(this, arguments);
      }

      return updateLockedSettings;
    }()
  }, {
    key: "updatePersonalMeeting",
    value: function () {
      var _updatePersonalMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(meeting) {
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                this._updatePersonalMeeting(meeting);

              case 1:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function updatePersonalMeeting(_x18) {
        return _updatePersonalMeeting2.apply(this, arguments);
      }

      return updatePersonalMeeting;
    }()
  }, {
    key: "resetPersonalMeeting",
    value: function () {
      var _resetPersonalMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                this._updatePersonalMeeting(null);

              case 1:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function resetPersonalMeeting() {
        return _resetPersonalMeeting.apply(this, arguments);
      }

      return resetPersonalMeeting;
    }()
  }, {
    key: "updateMeetingState",
    value: function () {
      var _updateMeetingState2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(meeting) {
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                this._updateMeetingState(meeting);

              case 1:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function updateMeetingState(_x19) {
        return _updateMeetingState2.apply(this, arguments);
      }

      return updateMeetingState;
    }()
  }, {
    key: "addUpdatingStatus",
    value: function () {
      var _addUpdatingStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(meetingId) {
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                this._updateUpdatingStatus([].concat(_toConsumableArray(this.updatingStatus), [{
                  meetingId: meetingId
                }]));

              case 1:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function addUpdatingStatus(_x20) {
        return _addUpdatingStatus.apply(this, arguments);
      }

      return addUpdatingStatus;
    }()
  }, {
    key: "removeUpdatingStatus",
    value: function () {
      var _removeUpdatingStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(meetingId) {
        var finalStatus;
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                finalStatus = (0, _ramda.filter)(function (obj) {
                  return obj.meetingId !== meetingId;
                }, this.updatingStatus);

                this._updateUpdatingStatus(finalStatus);

              case 2:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function removeUpdatingStatus(_x21) {
        return _removeUpdatingStatus.apply(this, arguments);
      }

      return removeUpdatingStatus;
    }()
  }, {
    key: "updateLastMeetingSetting",
    value: function () {
      var _updateLastMeetingSetting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(meeting) {
        var lastMeetingSetting;
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                lastMeetingSetting = (0, _ramda.pick)(_constants.LAST_MEETING_SETTINGS, meeting || {});

                this._updateLastMeetingSetting(lastMeetingSetting);

              case 2:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function updateLastMeetingSetting(_x22) {
        return _updateLastMeetingSetting2.apply(this, arguments);
      }

      return updateLastMeetingSetting;
    }()
  }, {
    key: "updateSavedDefaultMeetingSetting",
    value: function () {
      var _updateSavedDefaultMeetingSetting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(meeting) {
        var savedDefaulteSetting;
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                savedDefaulteSetting = (0, _ramda.pick)(_constants.SAVED_DEFAULT_MEETING_SETTINGS, meeting || {});

                this._updateSavedDefaultMeetingSetting(savedDefaulteSetting);

              case 2:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function updateSavedDefaultMeetingSetting(_x23) {
        return _updateSavedDefaultMeetingSetting2.apply(this, arguments);
      }

      return updateSavedDefaultMeetingSetting;
    }()
  }, {
    key: "updateIsScheduling",
    value: function () {
      var _updateIsScheduling2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(isScheduling) {
        return regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                this._updateIsScheduling(isScheduling);

              case 1:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function updateIsScheduling(_x24) {
        return _updateIsScheduling2.apply(this, arguments);
      }

      return updateIsScheduling;
    }()
  }, {
    key: "fetchPersonalMeeting",
    value: function () {
      var _fetchPersonalMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(extensionId) {
        var serviceInfo, personalMeetingId, meetingInfoResponse;
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return this.getMeetingServiceInfo(extensionId);

              case 2:
                serviceInfo = _context31.sent;
                personalMeetingId = serviceInfo.externalUserInfo.personalMeetingId;
                _context31.next = 6;
                return this.getMeeting(personalMeetingId);

              case 6:
                meetingInfoResponse = _context31.sent;

                if (meetingInfoResponse) {
                  _context31.next = 9;
                  break;
                }

                throw new Error("failed to get personal meeting ".concat(personalMeetingId, " info"));

              case 9:
                return _context31.abrupt("return", meetingInfoResponse);

              case 10:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function fetchPersonalMeeting(_x25) {
        return _fetchPersonalMeeting.apply(this, arguments);
      }

      return fetchPersonalMeeting;
    }()
  }, {
    key: "getMeetingServiceInfo",
    value: function () {
      var _getMeetingServiceInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(extensionId) {
        return regeneratorRuntime.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                return _context32.abrupt("return", this._deps.client.account().extension(extensionId).meeting().serviceInfo().get());

              case 1:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function getMeetingServiceInfo(_x26) {
        return _getMeetingServiceInfo.apply(this, arguments);
      }

      return getMeetingServiceInfo;
    }()
  }, {
    key: "postMeeting",
    value: function () {
      var _postMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(formattedMeeting) {
        return regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                return _context33.abrupt("return", this._deps.client.account().extension().meeting().post(formattedMeeting));

              case 1:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      function postMeeting(_x27) {
        return _postMeeting.apply(this, arguments);
      }

      return postMeeting;
    }()
  }, {
    key: "putMeeting",
    value: function () {
      var _putMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(meetingId, formattedMeeting) {
        return regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                return _context34.abrupt("return", this._deps.client.account().extension().meeting(meetingId).put(formattedMeeting));

              case 1:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      function putMeeting(_x28, _x29) {
        return _putMeeting.apply(this, arguments);
      }

      return putMeeting;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(meetingId) {
        var _this6 = this;

        var _ref7,
            _ref7$isAlertError,
            isAlertError,
            settings,
            _yield$e$response$clo,
            errorCode,
            message,
            isMeetingDeleted,
            _args35 = arguments;

        return regeneratorRuntime.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                _ref7 = _args35.length > 1 && _args35[1] !== undefined ? _args35[1] : {}, _ref7$isAlertError = _ref7.isAlertError, isAlertError = _ref7$isAlertError === void 0 ? true : _ref7$isAlertError;
                _context35.prev = 1;
                _context35.next = 4;
                return this._deps.client.account().extension().meeting(meetingId).get();

              case 4:
                settings = _context35.sent;
                return _context35.abrupt("return", _objectSpread(_objectSpread({}, settings), {}, {
                  // TODO: can we remove this?
                  _requireMeetingPassword: !!settings.password
                }));

              case 8:
                _context35.prev = 8;
                _context35.t0 = _context35["catch"](1);
                _context35.next = 12;
                return _context35.t0.response.clone().json();

              case 12:
                _yield$e$response$clo = _context35.sent;
                errorCode = _yield$e$response$clo.errorCode;
                message = _yield$e$response$clo.message;
                console.log("failed to get meeting info: ".concat(meetingId, ", ").concat(errorCode, ", ").concat(message));
                isMeetingDeleted = errorCode === 'CMN-102' && message.indexOf('[meetingId] is not found') > -1;

                if (isAlertError && isMeetingDeleted) {
                  setTimeout(function () {
                    _this6._deps.alert.danger({
                      message: _meetingStatus.meetingStatus.meetingIsDeleted
                    });
                  }, 50);
                }

                throw _context35.t0;

              case 19:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this, [[1, 8]]);
      }));

      function getMeeting(_x30) {
        return _getMeeting.apply(this, arguments);
      }

      return getMeeting;
    }()
  }, {
    key: "getDelegators",
    value: function () {
      var _getDelegators = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36() {
        var res;
        return regeneratorRuntime.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                _context36.next = 2;
                return this._deps.client.service.platform().get('/restapi/v1.0/account/~/extension/~/meetings-configuration/assisted');

              case 2:
                res = _context36.sent;
                return _context36.abrupt("return", res.json());

              case 4:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      function getDelegators() {
        return _getDelegators.apply(this, arguments);
      }

      return getDelegators;
    }()
  }, {
    key: "getUserSettings",
    value: function () {
      var _getUserSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37() {
        var extensionId,
            platform,
            apiResponse,
            _args37 = arguments;
        return regeneratorRuntime.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                extensionId = _args37.length > 0 && _args37[0] !== undefined ? _args37[0] : '~';
                _context37.prev = 1;
                platform = this._deps.client.service.platform();
                _context37.next = 5;
                return platform.send({
                  method: 'GET',
                  url: "/restapi/v1.0/account/~/extension/".concat(extensionId, "/meeting/user-settings")
                });

              case 5:
                apiResponse = _context37.sent;
                return _context37.abrupt("return", apiResponse.json());

              case 9:
                _context37.prev = 9;
                _context37.t0 = _context37["catch"](1);
                console.warn('failed to get user setting', _context37.t0);
                return _context37.abrupt("return", null);

              case 13:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this, [[1, 9]]);
      }));

      function getUserSettings() {
        return _getUserSettings.apply(this, arguments);
      }

      return getUserSettings;
    }()
  }, {
    key: "getLockedSettings",
    value: function () {
      var _getLockedSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee38() {
        var platform, apiResponse, _yield$apiResponse$js, _yield$apiResponse$js2, recording, _yield$apiResponse$js3, scheduleMeeting, startParticipantsVideo, startParticipantVideo, restScheduleOptions, processedScheduleMeeting;

        return regeneratorRuntime.wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                _context38.prev = 0;
                platform = this._deps.client.service.platform();
                _context38.next = 4;
                return platform.send({
                  method: 'GET',
                  url: '/restapi/v1.0/account/~/meeting/locked-settings'
                });

              case 4:
                apiResponse = _context38.sent;
                _context38.next = 7;
                return apiResponse.json();

              case 7:
                _yield$apiResponse$js = _context38.sent;
                _yield$apiResponse$js2 = _yield$apiResponse$js.recording;
                recording = _yield$apiResponse$js2 === void 0 ? {} : _yield$apiResponse$js2;
                _yield$apiResponse$js3 = _yield$apiResponse$js.scheduleMeeting;
                scheduleMeeting = _yield$apiResponse$js3 === void 0 ? {} : _yield$apiResponse$js3;
                startParticipantsVideo = scheduleMeeting.startParticipantsVideo, startParticipantVideo = scheduleMeeting.startParticipantVideo, restScheduleOptions = _objectWithoutProperties(scheduleMeeting, ["startParticipantsVideo", "startParticipantVideo"]);
                processedScheduleMeeting = _objectSpread(_objectSpread({}, restScheduleOptions), {}, {
                  // TODO: update this when api is stable
                  startParticipantsVideo: startParticipantsVideo || startParticipantVideo || false
                });
                return _context38.abrupt("return", {
                  recording: recording,
                  scheduleMeeting: processedScheduleMeeting
                });

              case 17:
                _context38.prev = 17;
                _context38.t0 = _context38["catch"](0);
                console.warn('failed to get lock settings', _context38.t0);
                return _context38.abrupt("return", null);

              case 21:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, this, [[0, 17]]);
      }));

      function getLockedSettings() {
        return _getLockedSettings.apply(this, arguments);
      }

      return getLockedSettings;
    }()
  }, {
    key: "getMeetingInvitation",
    value: function () {
      var _getMeetingInvitation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee39(meetingId) {
        var locale,
            apiResponse,
            _yield$apiResponse$js4,
            invitation,
            _args39 = arguments;

        return regeneratorRuntime.wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                locale = _args39.length > 1 && _args39[1] !== undefined ? _args39[1] : _i18n.DEFAULT_LOCALE;

                if (this.enableInvitationApi) {
                  _context39.next = 3;
                  break;
                }

                return _context39.abrupt("return", null);

              case 3:
                if (this._deps.brand.brandConfig.allowMeetingInvitation) {
                  _context39.next = 5;
                  break;
                }

                return _context39.abrupt("return", null);

              case 5:
                _context39.prev = 5;
                _context39.next = 8;
                return this._deps.client.service.platform().get("/restapi/v1.0/account/~/extension/~/meeting/".concat(meetingId, "/invitation"), {
                  language: this._deps.locale.normalizeLocale(locale)
                });

              case 8:
                apiResponse = _context39.sent;
                _context39.next = 11;
                return apiResponse.json();

              case 11:
                _yield$apiResponse$js4 = _context39.sent;
                invitation = _yield$apiResponse$js4.invitation;
                return _context39.abrupt("return", {
                  invitation: invitation
                });

              case 16:
                _context39.prev = 16;
                _context39.t0 = _context39["catch"](5);
                console.warn('failed to get invitation', _context39.t0);
                return _context39.abrupt("return", null);

              case 20:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, this, [[5, 16]]);
      }));

      function getMeetingInvitation(_x31) {
        return _getMeetingInvitation.apply(this, arguments);
      }

      return getMeetingInvitation;
    }()
  }, {
    key: "formatPersonalMeeting",
    value: function formatPersonalMeeting(meetingInfo, shortId // TODO: do we need this param `shortId`?
    ) {
      var settings = _objectSpread(_objectSpread(_objectSpread({}, this.initialMeetingSetting), meetingInfo), {}, {
        shortId: shortId || meetingInfo.id,
        usePersonalMeetingId: true
      });

      return _objectSpread(_objectSpread({}, settings), {}, {
        _requireMeetingPassword: !!settings.password
      });
    }
    /**
     * Validate meeting information format.
     * @param {Object} meeting
     * @throws
     */

  }, {
    key: "_validate",
    value: function _validate(meeting) {
      if (!meeting) {
        throw new _meetingErrors.MeetingErrors(_meetingStatus.meetingStatus.invalidMeetingInfo);
      }

      var topic = meeting.topic,
          password = meeting.password,
          schedule = meeting.schedule,
          _requireMeetingPassword = meeting._requireMeetingPassword;
      var errors = new _meetingErrors.MeetingErrors();

      if (topic.length <= 0) {
        errors.push(_meetingStatus.meetingStatus.emptyTopic);
      }

      if (_requireMeetingPassword && (!password || password.length <= 0)) {
        errors.push(_meetingStatus.meetingStatus.noPassword);
      }

      if (schedule) {
        if (schedule.durationInMinutes < 0) {
          errors.push(_meetingStatus.meetingStatus.durationIncorrect);
        }
      }

      if (errors.length > 0) {
        throw errors;
      }
    }
    /**
     * Format meeting information.
     * @param {Object} meeting
     */

  }, {
    key: "_format",
    value: function _format(meeting) {
      var topic = meeting.topic,
          meetingType = meeting.meetingType,
          allowJoinBeforeHost = meeting.allowJoinBeforeHost,
          startHostVideo = meeting.startHostVideo,
          startParticipantsVideo = meeting.startParticipantsVideo,
          audioOptions = meeting.audioOptions,
          password = meeting.password,
          schedule = meeting.schedule,
          recurrence = meeting.recurrence,
          usePersonalMeetingId = meeting.usePersonalMeetingId,
          _requireMeetingPassword = meeting._requireMeetingPassword,
          host = meeting.host;
      var formatted = {
        host: host,
        topic: topic,
        meetingType: meetingType,
        allowJoinBeforeHost: allowJoinBeforeHost,
        startHostVideo: startHostVideo,
        startParticipantsVideo: startParticipantsVideo,
        audioOptions: audioOptions,
        password: _requireMeetingPassword ? password : '',
        recurrence: recurrence,
        usePersonalMeetingId: usePersonalMeetingId
      }; // Recurring meetings do not have schedule info

      if (meetingType !== _meetingHelper.MeetingType.RECURRING) {
        var _schedule = {
          durationInMinutes: schedule.durationInMinutes,
          timeZone: {
            id: this.enableCustomTimezone ? schedule.timeZone.id : _meetingHelper.UTC_TIMEZONE_ID
          }
        };

        if (schedule.startTime) {
          // Format selected startTime to utc standard time
          // Timezone information is not included here
          _schedule.startTime = this.enableCustomTimezone ? schedule.startTime : _moment["default"].utc(schedule.startTime).format();
        }

        formatted.schedule = _schedule;

        if (recurrence && recurrence.until) {
          formatted.recurrence.until = _moment["default"].utc(recurrence.until).format();
        }
      } // For PMI


      formatted.meetingType = formatted.meetingType === _meetingHelper.MeetingType.PMI ? _meetingHelper.MeetingType.SCHEDULED : formatted.meetingType;
      return formatted;
    }
  }, {
    key: "_createDialingNumberTpl",
    value: function () {
      var _createDialingNumberTpl2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee40(serviceInfo, resp, invitationInfo) {
        var result;
        return regeneratorRuntime.wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                result = {
                  meeting: resp,
                  serviceInfo: _objectSpread(_objectSpread({}, serviceInfo), {}, {
                    mobileDialingNumberTpl: (0, _meetingHelper.getMobileDialingNumberTpl)(serviceInfo.dialInNumbers, resp.id),
                    phoneDialingNumberTpl: (0, _meetingHelper.getPhoneDialingNumberTpl)(serviceInfo.dialInNumbers)
                  }),
                  extensionInfo: this.extensionInfo.info,
                  invitationInfo: invitationInfo
                };
                return _context40.abrupt("return", result);

              case 2:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, this);
      }));

      function _createDialingNumberTpl(_x32, _x33, _x34) {
        return _createDialingNumberTpl2.apply(this, arguments);
      }

      return _createDialingNumberTpl;
    }()
  }, {
    key: "_errorHandle",
    value: function () {
      var _errorHandle2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee41(errors) {
        var _iterator, _step, error, _yield$errors$respons, message, errorCode, permissionName;

        return regeneratorRuntime.wrap(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                if (!(errors instanceof _meetingErrors.MeetingErrors)) {
                  _context41.next = 5;
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

                _context41.next = 31;
                break;

              case 5:
                if (!(errors && errors.response)) {
                  _context41.next = 29;
                  break;
                }

                _context41.next = 8;
                return errors.response.clone().json();

              case 8:
                _yield$errors$respons = _context41.sent;
                message = _yield$errors$respons.message;
                errorCode = _yield$errors$respons.errorCode;
                permissionName = _yield$errors$respons.permissionName;

                if (!(errorCode === 'InsufficientPermissions' && permissionName)) {
                  _context41.next = 16;
                  break;
                }

                this._deps.alert.danger({
                  message: _meetingStatus.meetingStatus.insufficientPermissions,
                  payload: {
                    permissionName: permissionName
                  }
                });

                _context41.next = 27;
                break;

              case 16:
                if (!(errorCode === 'CMN-102' && message.indexOf('[meetingId] is not found') > -1)) {
                  _context41.next = 20;
                  break;
                }

                this._deps.alert.danger({
                  message: _meetingStatus.meetingStatus.meetingIsDeleted
                });

                _context41.next = 27;
                break;

              case 20:
                _context41.t0 = !this._deps.availabilityMonitor;

                if (_context41.t0) {
                  _context41.next = 25;
                  break;
                }

                _context41.next = 24;
                return this._deps.availabilityMonitor.checkIfHAError(errors);

              case 24:
                _context41.t0 = !_context41.sent;

              case 25:
                if (!_context41.t0) {
                  _context41.next = 27;
                  break;
                }

                this._deps.alert.danger({
                  message: _meetingStatus.meetingStatus.internalError
                });

              case 27:
                _context41.next = 31;
                break;

              case 29:
                console.log('errors:', errors);

                this._deps.alert.danger({
                  message: _meetingStatus.meetingStatus.internalError
                });

              case 31:
              case "end":
                return _context41.stop();
            }
          }
        }, _callee41, this);
      }));

      function _errorHandle(_x35) {
        return _errorHandle2.apply(this, arguments);
      }

      return _errorHandle;
    }()
  }, {
    key: "enforcePmiPassword",
    value: function enforcePmiPassword(processedMeeting, requirePwdForPMI, requirePwdIsLockedForPMI) {
      var allowJoinBeforeHost = processedMeeting.allowJoinBeforeHost,
          _processedMeeting$pas = processedMeeting.password,
          password = _processedMeeting$pas === void 0 ? '' : _processedMeeting$pas;

      if (password !== '') {
        // save this for design
        processedMeeting._pmiPassword = password;
      }

      var pmiRequiresPwd;

      switch (requirePwdForPMI) {
        case _constants.PMIRequirePassword.NONE:
          pmiRequiresPwd = password !== '';
          break;

        case _constants.PMIRequirePassword.ALL:
          pmiRequiresPwd = true;
          break;

        case _constants.PMIRequirePassword.JBH_ONLY:
          pmiRequiresPwd = allowJoinBeforeHost || password !== '';
          break;

        default:
          pmiRequiresPwd = processedMeeting._requireMeetingPassword;
      }

      var pmiRequiresPwdLocked = requirePwdForPMI === _constants.PMIRequirePassword.JBH_ONLY ? requirePwdIsLockedForPMI && allowJoinBeforeHost : requirePwdIsLockedForPMI;
      processedMeeting._requireMeetingPassword = pmiRequiresPwd;
      processedMeeting._lockRequireMeetingPassword = pmiRequiresPwdLocked;
    }
  }, {
    key: "enforcePassword",
    value: function enforcePassword(meeting, _ref8, usePmi) {
      var userSettings = _ref8.userSettings,
          personalMeetingSettings = _ref8.personalMeetingSettings;

      if (!this.enableServiceWebSettings) {
        return meeting;
      }

      var _this$scheduleUserSet = this.scheduleUserSettings,
          _this$scheduleUserSet2 = _this$scheduleUserSet.requirePasswordForSchedulingNewMeetings,
          requirePwdForNonPMI = _this$scheduleUserSet2 === void 0 ? false : _this$scheduleUserSet2,
          requirePwdForPMI = _this$scheduleUserSet.requirePasswordForPmiMeetings;
      var _this$scheduleLockedS = this.scheduleLockedSettings,
          requirePwdIsLockedForNonPMI = _this$scheduleLockedS.requirePasswordForSchedulingNewMeetings,
          requirePwdIsLockedForPMI = _this$scheduleLockedS.requirePasswordForPmiMeetings;

      var processedMeeting = _objectSpread(_objectSpread(_objectSpread({}, meeting), usePmi ? personalMeetingSettings : userSettings), {}, {
        usePersonalMeetingId: usePmi,
        telephonyUserSettings: this.telephonyUserSettings
      }); // For PMI meetings


      if (usePmi) {
        this.enforcePmiPassword(processedMeeting, requirePwdForPMI, requirePwdIsLockedForPMI);
      } else {
        // For non-PMI meetings
        if (requirePwdForNonPMI) {
          processedMeeting._requireMeetingPassword = true;
        }

        if (requirePwdIsLockedForNonPMI) {
          processedMeeting._lockRequireMeetingPassword = true;
        }
      }

      return _objectSpread(_objectSpread({}, processedMeeting), {}, {
        password: processedMeeting._requireMeetingPassword && !processedMeeting.password ? (0, _meetingHelper.generateRandomPassword)() : processedMeeting.password
      });
    } // use to check meeting is in updating status or not

  }, {
    key: "_isUpdating",
    value: function _isUpdating(meetingId) {
      return this.updatingStatus && (0, _ramda.find)(function (obj) {
        return obj.meetingId === meetingId;
      }, this.updatingStatus);
    }
  }, {
    key: "fetchDiscoveryConfig",
    value: function () {
      var _fetchDiscoveryConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee42() {
        var _this$_deps$client$se;

        var data;
        return regeneratorRuntime.wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                _context42.next = 2;
                return (_this$_deps$client$se = this._deps.client.service.platform().discovery()) === null || _this$_deps$client$se === void 0 ? void 0 : _this$_deps$client$se.externalData();

              case 2:
                data = _context42.sent;

                if (data) {
                  this.rcvBaseWebUri = data.rcv.baseWebUri;
                } else {// handle discovery api  error in sdk
                }

              case 4:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42, this);
      }));

      function fetchDiscoveryConfig() {
        return _fetchDiscoveryConfig.apply(this, arguments);
      }

      return fetchDiscoveryConfig;
    }()
  }, {
    key: "onReset",
    value: function onReset() {
      this.rcvBaseWebUri = null;
    }
  }, {
    key: "getMeetingUriRegExp",
    value: function () {
      var _getMeetingUriRegExp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee43() {
        return regeneratorRuntime.wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                if (!(this.enableDiscoveryApi && !this.rcvBaseWebUri)) {
                  _context43.next = 3;
                  break;
                }

                _context43.next = 3;
                return this.fetchDiscoveryConfig();

              case 3:
                return _context43.abrupt("return", {
                  rcvUriRegExp: this.rcvUriRegExp,
                  rcmUriRegExp: this.rcmUriRegExp
                });

              case 4:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43, this);
      }));

      function getMeetingUriRegExp() {
        return _getMeetingUriRegExp.apply(this, arguments);
      }

      return getMeetingUriRegExp;
    }()
  }, {
    key: "extensionName",
    get: function get() {
      var _this$_deps$extension;

      return (_this$_deps$extension = this._deps.extensionInfo.info) === null || _this$_deps$extension === void 0 ? void 0 : _this$_deps$extension.name;
    }
  }, {
    key: "defaultTopic",
    get: function get() {
      return (0, _meetingHelper.getDefaultTopic)(this.extensionName, this.currentLocale);
    }
  }, {
    key: "scheduleUserSettings",
    get: function get() {
      var _this$userSettings;

      return ((_this$userSettings = this.userSettings) === null || _this$userSettings === void 0 ? void 0 : _this$userSettings.scheduleMeeting) || {};
    }
  }, {
    key: "telephonyUserSettings",
    get: function get() {
      var _this$userSettings2;

      return ((_this$userSettings2 = this.userSettings) === null || _this$userSettings2 === void 0 ? void 0 : _this$userSettings2.telephony) || {};
    }
  }, {
    key: "usePmiDefaultFromSW",
    get: function get() {
      return this.enablePersonalMeeting && this.enableServiceWebSettings && this.scheduleUserSettings.usePmiForScheduledMeetings;
    }
  }, {
    key: "loginUser",
    get: function get() {
      return {
        id: "".concat(this.extensionInfo.info.id),
        name: _constants.ASSISTED_USERS_MYSELF,
        isLoginUser: true
      };
    }
  }, {
    key: "scheduleLockedSettings",
    get: function get() {
      var _this$lockedSettings;

      return ((_this$lockedSettings = this.lockedSettings) === null || _this$lockedSettings === void 0 ? void 0 : _this$lockedSettings.scheduleMeeting) || {};
    }
  }, {
    key: "defaultLockedSettings",
    get: function get() {
      if (!this.enableServiceWebSettings || !this.scheduleLockedSettings) {
        return {};
      }

      return (0, _ramda.pick)(_constants.COMMON_SETTINGS, this.scheduleLockedSettings);
    }
  }, {
    key: "commonUserSettings",
    get: function get() {
      if (!this.enableServiceWebSettings) {
        return {};
      }

      return (0, _ramda.pick)(_constants.COMMON_SETTINGS, this.scheduleUserSettings);
    }
  }, {
    key: "commonPersonalMeetingSettings",
    get: function get() {
      if (!this.enablePersonalMeeting) {
        return {};
      }

      return (0, _ramda.pick)([].concat(_toConsumableArray(_constants.COMMON_SETTINGS), ['password']), this.personalMeeting || {});
    }
  }, {
    key: "currentLocale",
    get: function get() {
      return this._deps.locale.currentLocale || _i18n.DEFAULT_LOCALE;
    }
  }, {
    key: "pmiDefaultSettings",
    get: function get() {
      if (!this.enableServiceWebSettings) {
        return this.personalMeeting;
      }

      return this.enforcePassword(_objectSpread(_objectSpread({}, this.initialMeetingSetting), {}, {
        settingLock: this.defaultLockedSettings
      }), {
        userSettings: this.commonUserSettings,
        personalMeetingSettings: this.commonPersonalMeetingSettings
      }, true);
    }
  }, {
    key: "defaultMeetingSetting",
    get: function get() {
      var initialSetting = this.initialMeetingSetting;
      var usePmi = this.usePmiDefaultFromSW;
      var userSettings = this.userSettings;
      var savedSetting = this.showSaveAsDefault ? this.savedDefaultMeetingSetting : this.lastMeetingSetting;

      if (this.enableServiceWebSettings) {
        if (!(0, _ramda.isEmpty)(userSettings)) {
          return usePmi ? this.pmiDefaultSettings : this.getGeneralDefaultSettings();
        }

        return initialSetting;
      }

      var meeting = _objectSpread(_objectSpread(_objectSpread({}, initialSetting), savedSetting), {}, {
        meetingType: _meetingHelper.MeetingType.SCHEDULED
      });

      return meeting;
    }
  }, {
    key: "initialMeetingSetting",
    get: function get() {
      return this.getInitialMeetingSetting();
    }
  }, {
    key: "extensionInfo",
    get: function get() {
      return this._deps.extensionInfo;
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      var _this$_deps$meetingOp, _this$_deps$meetingOp2;

      return (_this$_deps$meetingOp = (_this$_deps$meetingOp2 = this._deps.meetingOptions) === null || _this$_deps$meetingOp2 === void 0 ? void 0 : _this$_deps$meetingOp2.showSaveAsDefault) !== null && _this$_deps$meetingOp !== void 0 ? _this$_deps$meetingOp : false;
    }
  }, {
    key: "enableInvitationApi",
    get: function get() {
      var _this$_deps$meetingOp3, _this$_deps$meetingOp4;

      return (_this$_deps$meetingOp3 = (_this$_deps$meetingOp4 = this._deps.meetingOptions) === null || _this$_deps$meetingOp4 === void 0 ? void 0 : _this$_deps$meetingOp4.enableInvitationApi) !== null && _this$_deps$meetingOp3 !== void 0 ? _this$_deps$meetingOp3 : false;
    }
  }, {
    key: "enablePersonalMeeting",
    get: function get() {
      var _this$_deps$meetingOp5, _this$_deps$meetingOp6;

      return (_this$_deps$meetingOp5 = (_this$_deps$meetingOp6 = this._deps.meetingOptions) === null || _this$_deps$meetingOp6 === void 0 ? void 0 : _this$_deps$meetingOp6.enablePersonalMeeting) !== null && _this$_deps$meetingOp5 !== void 0 ? _this$_deps$meetingOp5 : false;
    }
  }, {
    key: "enableReloadAfterSchedule",
    get: function get() {
      var _this$_deps$meetingOp7, _this$_deps$meetingOp8;

      return (_this$_deps$meetingOp7 = (_this$_deps$meetingOp8 = this._deps.meetingOptions) === null || _this$_deps$meetingOp8 === void 0 ? void 0 : _this$_deps$meetingOp8.enableReloadAfterSchedule) !== null && _this$_deps$meetingOp7 !== void 0 ? _this$_deps$meetingOp7 : true;
    }
  }, {
    key: "enableServiceWebSettings",
    get: function get() {
      var _this$_deps$meetingOp9, _this$_deps$meetingOp10;

      return (_this$_deps$meetingOp9 = (_this$_deps$meetingOp10 = this._deps.meetingOptions) === null || _this$_deps$meetingOp10 === void 0 ? void 0 : _this$_deps$meetingOp10.enableServiceWebSettings) !== null && _this$_deps$meetingOp9 !== void 0 ? _this$_deps$meetingOp9 : false;
    } // will follow dynamic brand config

  }, {
    key: "enableScheduleOnBehalf",
    get: function get() {
      var _this$_deps$brand$bra, _this$_deps$brand$bra2, _this$_deps$meetingOp11;

      return (_this$_deps$brand$bra = (_this$_deps$brand$bra2 = this._deps.brand.brandConfig) === null || _this$_deps$brand$bra2 === void 0 ? void 0 : _this$_deps$brand$bra2.enableRcmScheduleOnBehalf) !== null && _this$_deps$brand$bra !== void 0 ? _this$_deps$brand$bra : (_this$_deps$meetingOp11 = this._deps.meetingOptions) === null || _this$_deps$meetingOp11 === void 0 ? void 0 : _this$_deps$meetingOp11.enableScheduleOnBehalf;
    }
  }, {
    key: "enableCustomTimezone",
    get: function get() {
      var _this$_deps$meetingOp12, _this$_deps$meetingOp13;

      return (_this$_deps$meetingOp12 = (_this$_deps$meetingOp13 = this._deps.meetingOptions) === null || _this$_deps$meetingOp13 === void 0 ? void 0 : _this$_deps$meetingOp13.enableCustomTimezone) !== null && _this$_deps$meetingOp12 !== void 0 ? _this$_deps$meetingOp12 : false;
    }
  }, {
    key: "extensionId",
    get: function get() {
      return this._deps.extensionInfo.info.id;
    }
  }, {
    key: "enableDiscoveryApi",
    get: function get() {
      return !!this._deps.client.service.platform().discovery();
    }
  }, {
    key: "rcmUriRegExp",
    get: function get() {
      return (0, _helper.getRcmUriRegExp)(this._deps.brand.brandConfig.meetingUriReg.rcm);
    }
  }, {
    key: "rcvUriRegExp",
    get: function get() {
      var _this$rcvBaseWebUri;

      var regExpText = this.enableDiscoveryApi && this.rcvBaseWebUri ? "(".concat((_this$rcvBaseWebUri = this.rcvBaseWebUri) === null || _this$rcvBaseWebUri === void 0 ? void 0 : _this$rcvBaseWebUri.replace(/^https?:\/\//, '').replace(/\./g, '\\.'), "|").concat(this._deps.brand.brandConfig.meetingUriReg.rcv, ")") : this._deps.brand.brandConfig.meetingUriReg.rcv;
      return (0, _helper.getRcvUriRegExp)(regExpText);
    }
  }]);

  return Meeting;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "meeting", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isScheduling", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "updatingStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "personalMeeting", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "savedDefaultMeetingSetting", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lastMeetingSetting", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "delegators", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "userSettings", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "lockedSettings", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "preferences", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "isPreferencesChanged", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "defaultTopic", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultTopic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scheduleUserSettings", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "scheduleUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "telephonyUserSettings", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "telephonyUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "usePmiDefaultFromSW", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "usePmiDefaultFromSW"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loginUser", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "loginUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scheduleLockedSettings", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "scheduleLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultLockedSettings", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "commonUserSettings", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "commonUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "commonPersonalMeetingSettings", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "commonPersonalMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentLocale", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "currentLocale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateDelegators", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateDelegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateUserSettings", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateLockedSettings", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updatePersonalMeeting", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updatePersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updatePreferences", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updatePreferences"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateIsPreferencesChanged", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateIsPreferencesChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMeetingState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMeetingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateUpdatingStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateUpdatingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateLastMeetingSetting", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateLastMeetingSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateSavedDefaultMeetingSetting", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSavedDefaultMeetingSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateIsScheduling", [_dec12, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateIsScheduling"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_init", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_initMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePreferences", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePreferences"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateIsPreferencesChanged", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateIsPreferencesChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initPersonalMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_initPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateServiceWebSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateServiceWebSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveAsDefaultSetting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveAsDefaultSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scheduleDirectly", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "scheduleDirectly"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "schedule", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateDelegators", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateDelegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateUserSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateLockedSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePersonalMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetPersonalMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "resetPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingState", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addUpdatingStatus", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addUpdatingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeUpdatingStatus", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeUpdatingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateLastMeetingSetting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateLastMeetingSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSavedDefaultMeetingSetting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSavedDefaultMeetingSetting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateIsScheduling", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateIsScheduling"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchPersonalMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingServiceInfo", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingServiceInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "postMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "postMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "putMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "putMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDelegators", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getDelegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getUserSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getLockedSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingInvitation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingInvitation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rcmUriRegExp", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "rcmUriRegExp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rcvUriRegExp", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "rcvUriRegExp"), _class2.prototype)), _class2)) || _class);
exports.Meeting = Meeting;
//# sourceMappingURL=Meeting.js.map

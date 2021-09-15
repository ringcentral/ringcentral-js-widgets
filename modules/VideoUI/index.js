"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _ramda = require("ramda");

var _di = require("@ringcentral-integration/commons/lib/di");

var _RcVideoV = require("@ringcentral-integration/commons/modules/RcVideoV2");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var VideoUI = (_dec = (0, _di.Module)({
  name: 'VideoUI',
  deps: ['RcVideo', 'AppFeatures', 'Locale', 'RateLimiter', 'ConnectivityMonitor', 'Brand']
}), _dec(_class = /*#__PURE__*/function (_RcUIModule) {
  _inherits(VideoUI, _RcUIModule);

  var _super = _createSuper(VideoUI);

  function VideoUI(_ref) {
    var _this;

    var rcVideo = _ref.rcVideo,
        locale = _ref.locale,
        rateLimiter = _ref.rateLimiter,
        connectivityMonitor = _ref.connectivityMonitor,
        brand = _ref.brand,
        appFeatures = _ref.appFeatures,
        options = _objectWithoutProperties(_ref, ["rcVideo", "locale", "rateLimiter", "connectivityMonitor", "brand", "appFeatures"]);

    _classCallCheck(this, VideoUI);

    _this = _super.call(this, _objectSpread({}, options));
    _this._locale = void 0;
    _this._appFeatures = void 0;
    _this._rcVideo = void 0;
    _this._rateLimiter = void 0;
    _this._connectivityMonitor = void 0;
    _this._brand = void 0;
    _this._appFeatures = appFeatures;
    _this._rcVideo = rcVideo;
    _this._locale = locale;
    _this._rateLimiter = rateLimiter;
    _this._connectivityMonitor = connectivityMonitor;
    _this._brand = brand;
    return _this;
  }

  _createClass(VideoUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _this$_rcVideo$person, _meeting$settingLock, _meeting$settingLock2, _meeting$settingLock3, _meeting$settingLock4, _meeting$settingLock5;

      var disabled = _ref2.disabled,
          labelPlacement = _ref2.labelPlacement,
          datePickerSize = _ref2.datePickerSize,
          timePickerSize = _ref2.timePickerSize,
          _ref2$showRcvAdminLoc = _ref2.showRcvAdminLock,
          showRcvAdminLock = _ref2$showRcvAdminLoc === void 0 ? false : _ref2$showRcvAdminLoc,
          _ref2$configDisabled = _ref2.configDisabled,
          configDisabled = _ref2$configDisabled === void 0 ? false : _ref2$configDisabled;
      var showE2EE = this._rcVideo.ready && this._rcVideo.enableE2EE;
      var meeting = this._rcVideo.ready && this._rcVideo.meeting;
      var delegators = this._rcVideo.ready && this._rcVideo.delegators || [];
      var isDelegator = false;
      var user = (0, _ramda.find)(function (item) {
        return item.extensionId === meeting.extensionId;
      }, delegators);
      isDelegator = user && !user.isLoginUser;
      var enableWaitingRoom = this._rcVideo.ready && this._rcVideo.enableWaitingRoom;
      var isAllOptionDisabled = !!(disabled || !meeting.isMeetingPasswordValid || this._rcVideo.ready && this._rcVideo.isScheduling || this._connectivityMonitor && !this._connectivityMonitor.connectivity || this._rateLimiter && this._rateLimiter.throttling);
      var settingLock = meeting.settingLock,
          e2ee = meeting.e2ee,
          isOnlyCoworkersJoin = meeting.isOnlyCoworkersJoin; // when e2ee is on, waiting room&auth can join&require password&jbh will be disabled and turn on.

      var isE2eeRelatedOptionsDisabled = showE2EE && e2ee;
      var isE2EEDisabled = showE2EE && (this._appFeatures.ready && !this._appFeatures.hasVideoE2EE || settingLock.e2ee || (0, _ramda.any)(function (key) {
        return settingLock[key] && meeting[key] === _RcVideoV.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH[key];
      })(Object.keys(_RcVideoV.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH)));
      var authUserTypeValue = isOnlyCoworkersJoin ? _RcVideoV.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS : _RcVideoV.AUTH_USER_TYPE.SIGNED_IN_USERS;
      return {
        datePickerSize: datePickerSize,
        timePickerSize: timePickerSize,
        labelPlacement: labelPlacement,
        isE2EEDisabled: isE2EEDisabled,
        delegators: delegators,
        authUserTypeValue: authUserTypeValue,
        currentLocale: this._locale.currentLocale,
        meeting: this._rcVideo.meeting,
        enablePersonalMeeting: this._rcVideo.enablePersonalMeeting,
        showWaitingRoom: this._rcVideo.enableWaitingRoom,
        showE2EE: this._rcVideo.enableE2EE,
        personalMeetingId: this._rcVideo.ready && ((_this$_rcVideo$person = this._rcVideo.personalMeeting) === null || _this$_rcVideo$person === void 0 ? void 0 : _this$_rcVideo$person.shortId),
        showSaveAsDefault: this._rcVideo.showSaveAsDefault,
        showScheduleOnBehalf: !!(delegators && delegators.length > 0),
        disableSaveAsDefault: !this._rcVideo.isPreferencesChanged,
        showSpinnerInConfigPanel: this._rcVideo.isInitializing || this._rcVideo.isScheduling,
        brandName: this._brand.name,
        configDisabled: configDisabled,
        disabled: isAllOptionDisabled,
        hasSettingsChanged: this._rcVideo.hasSettingsChanged,
        joinBeforeHostLabel: isDelegator ? _RcVideoV.JBH_LABEL.JOIN_AFTER_HOST : _RcVideoV.JBH_LABEL.JOIN_AFTER_ME,
        isPersonalMeetingDisabled: showE2EE && meeting.e2ee,
        isRequirePasswordDisabled: isE2eeRelatedOptionsDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock = meeting.settingLock) === null || _meeting$settingLock === void 0 ? void 0 : _meeting$settingLock.isMeetingSecret),
        isJoinBeforeHostDisabled: isE2eeRelatedOptionsDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock2 = meeting.settingLock) === null || _meeting$settingLock2 === void 0 ? void 0 : _meeting$settingLock2.allowJoinBeforeHost) || enableWaitingRoom && meeting.waitingRoomMode === _RcVideoV.RCV_WAITING_ROOM_MODE.all,
        isWaitingRoomDisabled: isE2eeRelatedOptionsDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock3 = meeting.settingLock) === null || _meeting$settingLock3 === void 0 ? void 0 : _meeting$settingLock3.waitingRoomMode),
        isWaitingRoomNotCoworkerDisabled: meeting.isOnlyCoworkersJoin,
        isWaitingRoomGuestDisabled: meeting.isOnlyAuthUserJoin || showE2EE && meeting.e2ee,
        isWaitingRoomAllDisabled: false,
        isAuthenticatedCanJoinDisabled: isE2eeRelatedOptionsDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock4 = meeting.settingLock) === null || _meeting$settingLock4 === void 0 ? void 0 : _meeting$settingLock4.isOnlyAuthUserJoin),
        isAuthUserTypeDisabled: disabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock5 = meeting.settingLock) === null || _meeting$settingLock5 === void 0 ? void 0 : _meeting$settingLock5.isOnlyCoworkersJoin),
        isSignedInUsersDisabled: false,
        isSignedInCoWorkersDisabled: false
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;

      var _schedule = _ref3.schedule;
      return {
        updateScheduleFor: function updateScheduleFor(userExtensionId) {
          return _this2._rcVideo.updateScheduleFor(userExtensionId);
        },
        updateMeetingSettings: function updateMeetingSettings(value) {
          return _this2._rcVideo.updateMeetingSettings(value);
        },
        validatePasswordSettings: function validatePasswordSettings(password, isSecret) {
          return _this2._rcVideo.validatePasswordSettings(password, isSecret);
        },
        switchUsePersonalMeetingId: function switchUsePersonalMeetingId(usePersonalMeetingId) {
          return _this2._rcVideo.switchUsePersonalMeetingId(usePersonalMeetingId);
        },
        schedule: function () {
          var _schedule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(meetingInfo, opener) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!_schedule) {
                      _context.next = 4;
                      break;
                    }

                    _context.next = 3;
                    return _schedule(meetingInfo, opener);

                  case 3:
                    return _context.abrupt("return");

                  case 4:
                    if (!meetingInfo.usePersonalMeetingId) {
                      _context.next = 9;
                      break;
                    }

                    _context.next = 7;
                    return _this2._rcVideo.updateMeeting(_this2._rcVideo.personalMeeting.id, meetingInfo);

                  case 7:
                    _context.next = 11;
                    break;

                  case 9:
                    _context.next = 11;
                    return _this2._rcVideo.createMeeting(meetingInfo);

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function schedule(_x, _x2) {
            return _schedule2.apply(this, arguments);
          }

          return schedule;
        }(),
        updateHasSettingsChanged: this._rcVideo.updateHasSettingsChanged,
        init: function init() {
          _this2._rcVideo.init();
        },
        e2eeInteractFunc: function e2eeInteractFunc(e2eeValue) {
          if (!e2eeValue) {
            _this2._rcVideo.updateMeetingSettings({
              e2ee: e2eeValue
            });

            return;
          } // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting


          if (_this2._rcVideo.meeting.usePersonalMeetingId) {
            _this2._rcVideo.switchUsePersonalMeetingId(false);

            _this2._rcVideo.updateMeetingSettings(_objectSpread({
              e2ee: true
            }, _RcVideoV.RCV_E2EE_DEFAULT_SECURITY_OPTIONS));
          } else {
            _this2._rcVideo.updateMeetingSettings(_objectSpread({
              e2ee: e2eeValue
            }, _RcVideoV.RCV_E2EE_DEFAULT_SECURITY_OPTIONS));
          }

          _this2._rcVideo.updateHasSettingsChanged(true);
        }
      };
    }
  }]);

  return VideoUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = VideoUI;
//# sourceMappingURL=index.js.map

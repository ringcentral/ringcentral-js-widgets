"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _di = require("ringcentral-integration/lib/di");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var GenericMeetingUI = (_dec = (0, _di.Module)({
  name: 'GenericMeetingUI',
  deps: ['GenericMeeting', 'Locale', 'RateLimiter', 'ConnectivityMonitor', 'Brand']
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcUIModule) {
  _inherits(GenericMeetingUI, _RcUIModule);

  var _super = _createSuper(GenericMeetingUI);

  function GenericMeetingUI(_ref) {
    var _this;

    var genericMeeting = _ref.genericMeeting,
        locale = _ref.locale,
        rateLimiter = _ref.rateLimiter,
        connectivityMonitor = _ref.connectivityMonitor,
        brand = _ref.brand,
        options = _objectWithoutProperties(_ref, ["genericMeeting", "locale", "rateLimiter", "connectivityMonitor", "brand"]);

    _classCallCheck(this, GenericMeetingUI);

    _this = _super.call(this, _objectSpread({}, options));
    _this._genericMeeting = void 0;
    _this._locale = void 0;
    _this._rateLimiter = void 0;
    _this._connectivityMonitor = void 0;
    _this._brand = void 0;
    _this._genericMeeting = genericMeeting;
    _this._locale = locale;
    _this._rateLimiter = rateLimiter;
    _this._connectivityMonitor = connectivityMonitor;
    _this._brand = brand;
    return _this;
  }

  _createClass(GenericMeetingUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var useRcmV2 = _ref2.useRcmV2,
          disabled = _ref2.disabled,
          showTopic = _ref2.showTopic,
          showWhen = _ref2.showWhen,
          showDuration = _ref2.showDuration,
          openNewWindow = _ref2.openNewWindow,
          labelPlacement = _ref2.labelPlacement,
          showRecurringMeeting = _ref2.showRecurringMeeting,
          scheduleButton = _ref2.scheduleButton,
          datePickerSize = _ref2.datePickerSize,
          timePickerSize = _ref2.timePickerSize;
      var invalidPassowrd = this._genericMeeting.ready && this._genericMeeting.meeting && (this._genericMeeting.isRCV || this._genericMeeting.isRCM) && !this._genericMeeting.validatePasswordSettings(this._genericMeeting.isRCV ? this._genericMeeting.meeting.meetingPassword : this._genericMeeting.meeting.password, this._genericMeeting.isRCV ? this._genericMeeting.meeting.isMeetingSecret : this._genericMeeting.meeting._requireMeetingPassword);
      var meeting = this._genericMeeting.ready && this._genericMeeting.meeting || {};
      var delegators = this._genericMeeting.ready && this._genericMeeting.delegators || [];
      return {
        meeting: meeting,
        useRcmV2: useRcmV2,
        delegators: delegators,
        labelPlacement: labelPlacement,
        datePickerSize: datePickerSize,
        timePickerSize: timePickerSize,
        currentLocale: this._locale.currentLocale,
        disabled: !!(disabled || invalidPassowrd || this._genericMeeting.ready && this._genericMeeting.isScheduling || this._connectivityMonitor && !this._connectivityMonitor.connectivity || this._rateLimiter && this._rateLimiter.throttling),
        showTopic: showTopic,
        showWhen: showWhen,
        showDuration: showDuration,
        showScheduleOnBehalf: !!(delegators && delegators.length > 0),
        showRecurringMeeting: !meeting.usePersonalMeetingId && showRecurringMeeting,
        openNewWindow: openNewWindow,
        showSaveAsDefault: this._genericMeeting.ready && this._genericMeeting.showSaveAsDefault,
        // Need to add this back when we back to this ticket
        // https://jira.ringcentral.com/browse/RCINT-15031
        // disableSaveAsDefault:
        //   this._genericMeeting.ready &&
        //   !this._genericMeeting.isPreferencesChanged,
        disableSaveAsDefault: false,
        isRCM: this._genericMeeting.isRCM,
        isRCV: this._genericMeeting.isRCV,
        scheduleButton: scheduleButton,
        brandName: this._brand.name,
        showAdminLock: this._genericMeeting.ready && this._genericMeeting.showAdminLock,
        enablePersonalMeeting: this._genericMeeting.ready && this._genericMeeting.enablePersonalMeeting,
        enableWaitingRoom: this._genericMeeting.ready && this._genericMeeting.enableWaitingRoom,
        personalMeetingId: this._genericMeeting.ready && this._genericMeeting.personalMeetingId,
        showSpinner: !!(!this._locale.ready || !this._genericMeeting.ready || !this._genericMeeting.isRCM && !this._genericMeeting.isRCV || !this._genericMeeting.meeting || this._connectivityMonitor && !this._connectivityMonitor.ready || this._rateLimiter && !this._rateLimiter.ready)
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this2 = this;

      var _schedule = props.schedule;
      return {
        switchUsePersonalMeetingId: function switchUsePersonalMeetingId(usePersonalMeetingId) {
          return _this2._genericMeeting.switchUsePersonalMeetingId(usePersonalMeetingId);
        },
        updateScheduleFor: function updateScheduleFor(userExtensionId) {
          return _this2._genericMeeting.updateScheduleFor(userExtensionId);
        },
        // TODO: any is reserved for RcM
        updateMeetingSettings: function updateMeetingSettings(value) {
          return _this2._genericMeeting.updateMeetingSettings(value);
        },
        validatePasswordSettings: function validatePasswordSettings(password, isSecret) {
          return _this2._genericMeeting.validatePasswordSettings(password, isSecret);
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
                    _context.next = 6;
                    return _this2._genericMeeting.schedule(meetingInfo, {}, opener);

                  case 6:
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
        init: function init() {
          return _this2._genericMeeting.init();
        }
      };
    }
  }]);

  return GenericMeetingUI;
}(_RcUIModule2["default"]), _temp)) || _class);
exports["default"] = GenericMeetingUI;
//# sourceMappingURL=index.js.map

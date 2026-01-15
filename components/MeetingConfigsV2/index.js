"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingConfigs = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
var _meetingHelper = require("@ringcentral-integration/commons/helpers/meetingHelper");
var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx4 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _MeetingCalendarHelper = require("../../lib/MeetingCalendarHelper");
var _MeetingHelper = require("../../lib/MeetingHelper");
var _MeetingAlert = require("../MeetingAlert");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _ExtendedTooltip = require("./ExtendedTooltip");
var _VideoSettingGroup = require("./VideoSettingGroup");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function getHelperTextForPasswordField(meeting, currentLocale, isPasswordFocus) {
  if (!meeting.password) {
    return _i18n["default"].getString('passwordEmptyError', currentLocale);
  }
  if (!meeting.isMeetingPasswordValid) {
    return _i18n["default"].getString('rcmPasswordInvalidError', currentLocale);
  }
  if (isPasswordFocus) {
    return _i18n["default"].getString('rcmPasswordHintText', currentLocale);
  }
  // when correct input without focus, show nothing
  return '';
}
function getCheckboxCommProps(labelPlacement) {
  return {
    formControlLabelProps: {
      classes: {
        root: labelPlacement === 'end' ? _styles["default"].labelPlacementEnd : _styles["default"].labelPlacementStart,
        label: _styles["default"].fullWidthLabel
      },
      labelPlacement: labelPlacement
    }
  };
}
var MeetingOptionLabel = function MeetingOptionLabel(_ref) {
  var children = _ref.children,
    labelPlacement = _ref.labelPlacement,
    _ref$isLocked = _ref.isLocked,
    isLocked = _ref$isLocked === void 0 ? false : _ref$isLocked,
    currentLocale = _ref.currentLocale,
    _ref$hasScrollBar = _ref.hasScrollBar,
    hasScrollBar = _ref$hasScrollBar === void 0 ? false : _ref$hasScrollBar,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$dataSign = _ref.dataSign,
    dataSign = _ref$dataSign === void 0 ? '' : _ref$dataSign;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].labelContent
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "".concat(dataSign, "_label"),
    className: (0, _clsx4["default"])(_styles["default"].placementLeft, _defineProperty({}, _styles["default"].optionLabel, labelPlacement === 'start'), className)
  }, children), isLocked ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].placementRight
  }, /*#__PURE__*/_react["default"].createElement(_ExtendedTooltip.ExtendedTooltip, {
    "data-sign": "".concat(dataSign, "_lock"),
    hasScrollBar: hasScrollBar,
    title: _i18n["default"].getString('lockedTooltip', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "small",
    className: _styles["default"].lockButton,
    color: "neutral.f04",
    symbol: _junoIcon.LockBorder
  }))) : null);
};
var PanelRoot = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", " {\n    padding: ", ";\n  }\n"])), _juno.RcCheckbox, (0, _juno.spacing)(2));
var MeetingConfigs = exports.MeetingConfigs = function MeetingConfigs(_ref2) {
  var _meeting$telephonyUse, _meeting$settingLock, _meeting$settingLock2, _meeting$settingLock3, _meeting$settingLock4, _meeting$settingLock5, _meeting$settingLock6, _meeting$settingLock7, _meeting$settingLock8;
  var _ref2$showRecurringMe = _ref2.showRecurringMeeting,
    showRecurringMeeting = _ref2$showRecurringMe === void 0 ? true : _ref2$showRecurringMe,
    _ref2$labelPlacement = _ref2.labelPlacement,
    labelPlacement = _ref2$labelPlacement === void 0 ? 'start' : _ref2$labelPlacement,
    _ref2$datePickerSize = _ref2.datePickerSize,
    datePickerSize = _ref2$datePickerSize === void 0 ? 'medium' : _ref2$datePickerSize,
    _ref2$timePickerSize = _ref2.timePickerSize,
    timePickerSize = _ref2$timePickerSize === void 0 ? 'medium' : _ref2$timePickerSize,
    _ref2$checkboxSize = _ref2.checkboxSize,
    checkboxSize = _ref2$checkboxSize === void 0 ? 'medium' : _ref2$checkboxSize,
    updateMeetingSettings = _ref2.updateMeetingSettings,
    disabled = _ref2.disabled,
    personalMeetingId = _ref2.personalMeetingId,
    switchUsePersonalMeetingId = _ref2.switchUsePersonalMeetingId,
    init = _ref2.init,
    meeting = _ref2.meeting,
    children = _ref2.children,
    currentLocale = _ref2.currentLocale,
    recipientsSection = _ref2.recipientsSection,
    showTopic = _ref2.showTopic,
    showWhen = _ref2.showWhen,
    showDuration = _ref2.showDuration,
    meetingOptionToggle = _ref2.meetingOptionToggle,
    audioOptionToggle = _ref2.audioOptionToggle,
    useTimePicker = _ref2.useTimePicker,
    showScheduleOnBehalf = _ref2.showScheduleOnBehalf,
    delegators = _ref2.delegators,
    updateScheduleFor = _ref2.updateScheduleFor,
    trackSettingChanges = _ref2.trackSettingChanges,
    onCloseMigrationAlert = _ref2.onCloseMigrationAlert,
    showSpinnerInConfigPanel = _ref2.showSpinnerInConfigPanel,
    enableServiceWebSettings = _ref2.enableServiceWebSettings,
    recurringMeetingPosition = _ref2.recurringMeetingPosition,
    defaultTopic = _ref2.defaultTopic,
    showMigrationAlert = _ref2.showMigrationAlert,
    showRemoveMeetingWarning = _ref2.showRemoveMeetingWarning,
    brandConfig = _ref2.brandConfig;
  (0, _react.useEffect)(function () {
    if (init) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var update = function update(options) {
    return updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), options));
  };
  var trackItemChanges = function trackItemChanges(itemName) {
    trackSettingChanges && trackSettingChanges(itemName);
  };
  var configRef = (0, _react.useRef)();
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    hasScrollBar = _useState2[0],
    setHasScrollBar = _useState2[1];
  (0, _react.useEffect)(function () {
    setHasScrollBar(
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    configRef.current.scrollHeight > configRef.current.clientHeight);
  }, []);

  /* Password */
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isPasswordFocus = _useState4[0],
    setPasswordFocus = _useState4[1];

  /* AudioOptions */
  var _useState5 = (0, _react.useState)(meeting.audioOptions && meeting.audioOptions.join('_')),
    _useState6 = _slicedToArray(_useState5, 2),
    audioOptions = _useState6[0],
    setAudioOptions = _useState6[1];
  var enableThirdPartyAudio = meeting === null || meeting === void 0 ? void 0 : (_meeting$telephonyUse = meeting.telephonyUserSettings) === null || _meeting$telephonyUse === void 0 ? void 0 : _meeting$telephonyUse.thirdPartyAudio;
  var audioHelpTextMap = {
    Phone: 'telephonyOnly',
    ComputerAudio: 'voIPOnly',
    Phone_ComputerAudio: 'both',
    ThirdParty: 'thirdParty'
  };
  var updateAudioOptions = function updateAudioOptions(audioOptions) {
    setAudioOptions(audioOptions);
    update({
      audioOptions: audioOptions.split('_')
    });
  };
  (0, _react.useEffect)(function () {
    setAudioOptions(meeting.audioOptions.join('_'));
  }, [meeting.audioOptions]);

  /* Recurring */
  var _useState7 = (0, _react.useState)((0, _meetingHelper.isRecurringMeeting)(meeting.meetingType)),
    _useState8 = _slicedToArray(_useState7, 2),
    isRecurring = _useState8[0],
    setIsRecurring = _useState8[1];
  var toggleRecurring = function toggleRecurring(isRecurring) {
    update({
      meetingType: isRecurring ? _meetingHelper.MeetingType.RECURRING : _meetingHelper.MeetingType.SCHEDULED
    });
  };
  (0, _react.useEffect)(function () {
    setIsRecurring((0, _meetingHelper.isRecurringMeeting)(meeting.meetingType));
  }, [meeting.meetingType]);

  /* Use Personal MeetingId */
  var _useState9 = (0, _react.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    isPmiConfirm = _useState0[0],
    setPmiConfirm = _useState0[1];
  var onPmiChange = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(usePersonalMeetingId) {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            setPmiConfirm(false);
            _context.n = 1;
            return switchUsePersonalMeetingId(usePersonalMeetingId);
          case 1:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function onPmiChange(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  /* Option Disable Status */
  var isDisabled = disabled || meeting.usePersonalMeetingId && !isPmiConfirm;
  var settingsGroupExpandable = false;

  // FIXME: Argument of type '"end" | "start" | "top" | "botto... Remove this comment to see the full error message
  var checkboxCommProps = getCheckboxCommProps(labelPlacement);
  var startTime = (0, _react.useMemo)(function () {
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    return new Date(meeting.schedule.startTime);
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  }, [meeting.schedule.startTime]);
  var hoursList = (0, _MeetingHelper.getHoursList)(_MeetingHelper.HOUR_SCALE, currentLocale);
  var minutesList = (0, _MeetingHelper.getMinutesList)(_MeetingHelper.MINUTE_SCALE, currentLocale);
  return (
    /*#__PURE__*/
    // @ts-expect-error TS(2322): Type '{ children: Element; ref: MutableRefObject<H... Remove this comment to see the full error message
    _react["default"].createElement(PanelRoot, {
      ref: configRef,
      className: _styles["default"].videoConfig,
      "data-sign": "meetingConfigsPanel"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingContent
    }, showSpinnerInConfigPanel ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, showRemoveMeetingWarning && /*#__PURE__*/_react["default"].createElement(_MeetingAlert.RemoveMeetingWarn, {
      brandConfig: brandConfig,
      currentLocale: currentLocale
    }), showMigrationAlert && /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
      dataSign: "migrateToPluginAlert",
      expandable: false
    }, /*#__PURE__*/_react["default"].createElement(_MeetingAlert.MigrateToPluginAlert, {
      currentLocale: currentLocale,
      substituteName: brandConfig.substituteName,
      onCloseAlert: onCloseMigrationAlert
    })), showTopic ? /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].meetingSection, _styles["default"].meetingTitle)
    }, children) : null, recipientsSection ? /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingSection
    }, recipientsSection) : null, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingSettings
    }, showWhen && !isRecurring ? /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingSection
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingDatePicker
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcDatePicker, {
      fullWidth: true,
      gutterBottom: true,
      label: _i18n["default"].getString('date', currentLocale),
      "data-sign": "date",
      value: startTime,
      clearBtn: false,
      formatString: "MM/DD/YYYY",
      size: datePickerSize,
      locale: currentLocale,
      todayButtonText: _i18n["default"].getString('today', currentLocale),
      onChange: function onChange(value) {
        update({
          schedule: _objectSpread(_objectSpread({}, meeting.schedule), {}, {
            // @ts-expect-error TS(2345): Argument of type 'Date | null' is not assignable t... Remove this comment to see the full error message
            startTime: (0, _meetingHelper.updateFullYear)(startTime, value)
          })
        });
      }
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingTimePicker
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcTimePicker, {
      fullWidth: true,
      gutterBottom: true,
      clearBtn: false,
      size: timePickerSize,
      label: _i18n["default"].getString('time', currentLocale),
      isTwelveHourSystem: true,
      "data-sign": "startTime",
      dateMode: true,
      value: startTime,
      onChange: function onChange(value) {
        update({
          schedule: _objectSpread(_objectSpread({}, meeting.schedule), {}, {
            // @ts-expect-error TS(2345): Argument of type 'Date | null' is not assignable t... Remove this comment to see the full error message
            startTime: (0, _meetingHelper.updateFullTime)(startTime, value)
          })
        });
      }
    }))) : null, showDuration && !isRecurring ? /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingSection
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].hourDuration
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      fullWidth: true,
      gutterBottom: true,
      "data-sign": "durationHour"
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      ,
      value: Math.floor(meeting.schedule.durationInMinutes / 60),
      onChange: function onChange(e) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        var value = +e.target.value;
        var restMinutes = Math.floor(
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        meeting.schedule.durationInMinutes % 60);
        var durationInMinutes = value * 60 + restMinutes;
        update({
          schedule: _objectSpread(_objectSpread({}, meeting.schedule), {}, {
            durationInMinutes: durationInMinutes
          })
        });
      },
      className: _styles["default"].select,
      label: _i18n["default"].getString('duration', currentLocale)
    }, hoursList.map(function (item, i) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        key: i
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        ,
        value: item.value,
        "data-sign": "option".concat(i)
      }, item !== null ? item.text : 'defaultValue');
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].minuteDuration
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      fullWidth: true,
      gutterBottom: true,
      "data-sign": "durationMinute",
      required: true
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      ,
      value: Math.floor(meeting.schedule.durationInMinutes % 60),
      onChange: function onChange(e) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        var value = +e.target.value;
        var restHours = Math.floor(
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        meeting.schedule.durationInMinutes / 60);
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        var isMax = restHours === hoursList.slice(-1)[0].value;
        var minutes = isMax ? 0 : value;
        var durationInMinutes = restHours * 60 + minutes;
        update({
          schedule: _objectSpread(_objectSpread({}, meeting.schedule), {}, {
            durationInMinutes: durationInMinutes
          })
        });
      }
    }, minutesList.map(function (item, i) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        key: i
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        ,
        value: item.value,
        "data-sign": "option".concat(i)
      }, item !== null ? item.text : 'defaultValue');
    })))) : null, showRecurringMeeting && recurringMeetingPosition === 'middle' ? /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
      dataSign: "meetingIdSection",
      expandable: settingsGroupExpandable
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
      disabled: isDisabled,
      size: checkboxSize,
      "data-sign": "recurringMeeting",
      checked: isRecurring,
      onChange: function onChange() {
        toggleRecurring(!isRecurring);
      },
      label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
        dataSign: "recurringMeeting",
        labelPlacement: labelPlacement
      }, _i18n["default"].getString('recurringMeeting', currentLocale))
    })), isRecurring ? /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "caption1",
      className: _styles["default"].recurringDescribe
    }, _i18n["default"].getString('recurringDescribe', currentLocale)) : null) : null, showScheduleOnBehalf ? /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
      dataSign: "scheduleForPanel",
      expandable: settingsGroupExpandable,
      summary: _i18n["default"].getString('scheduleFor', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].sideMargin, _styles["default"].selectOption)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      variant: "box",
      disabled: disabled,
      className: (0, _clsx4["default"])(_styles["default"].boxSelect, _styles["default"].autoFullWidth),
      "data-sign": "scheduleFor",
      onChange: function onChange(e) {
        updateScheduleFor(e.target.value);
        trackItemChanges(_Meeting.RCM_ITEM_NAME.scheduleFor);
      },
      value: meeting.host.id
    }, delegators.map(function (item, index) {
      var userName = item.name === _Meeting.ASSISTED_USERS_MYSELF ? _i18n["default"].getString(item.name, currentLocale) : item.name;
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        value: item.id,
        key: item.id,
        title: userName,
        className: _styles["default"].boxSelectMenuItem,
        "data-sign": "scheduleForMenuItem".concat(index)
      }, userName);
    })))) : null, personalMeetingId ? /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
      dataSign: "meetingIdSection",
      expandable: settingsGroupExpandable,
      summary: _i18n["default"].getString('meetingId', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
      "data-sign": "usePersonalMeetingId",
      disabled: disabled,
      size: checkboxSize,
      checked: meeting.usePersonalMeetingId,
      onChange: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              onPmiChange(!meeting.usePersonalMeetingId);
            case 1:
              return _context2.a(2);
          }
        }, _callee2);
      })),
      label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
        dataSign: "usePersonalMeetingId",
        labelPlacement: labelPlacement,
        className: _styles["default"].pmiLabel
      }, _i18n["default"].getString('usePersonalMeetingId', currentLocale), "\xA0", /*#__PURE__*/_react["default"].createElement("span", {
        "data-sign": "personalMeetingId"
      }, (0, _MeetingCalendarHelper.formatMeetingId)(personalMeetingId, '-')))
    })), meeting.usePersonalMeetingId ? /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
      severity: "info",
      className: _styles["default"].alertContainer
    }, isPmiConfirm ? _i18n["default"].getString('pmiSettingChangeAlert', currentLocale) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, _i18n["default"].getString('pmiChangeConfirm', currentLocale), /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
      variant: "inherit",
      onClick: function onClick() {
        return setPmiConfirm(!isPmiConfirm);
      },
      "data-sign": "setPmiConfirm"
    }, _i18n["default"].getString('changePmiSettings', currentLocale)))) : null)) : null, /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
      dataSign: "passwordSection",
      expandable: settingsGroupExpandable,
      summary: _i18n["default"].getString('password', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
      "data-sign": "requirePassword",
      disabled: isDisabled || meeting._lockRequireMeetingPassword,
      size: checkboxSize,
      checked: meeting._requireMeetingPassword,
      onChange: function onChange() {
        var password = '';
        // checked before
        if (meeting._requireMeetingPassword) {
          password = '';
        } else {
          password = meeting.usePersonalMeetingId && meeting._pmiPassword ? meeting._pmiPassword : (0, _meetingHelper.generateRandomPassword)();
        }
        update({
          _requireMeetingPassword: !meeting._requireMeetingPassword,
          password: password
        });
        trackItemChanges(_Meeting.RCM_ITEM_NAME._requireMeetingPassword);
      },
      label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
        dataSign: "requirePassword",
        labelPlacement: labelPlacement,
        isLocked: meeting._lockRequireMeetingPassword,
        currentLocale: currentLocale,
        hasScrollBar: hasScrollBar
      }, _i18n["default"].getString('requirePassword', currentLocale))
    })), meeting._requireMeetingPassword ? /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].passwordField, _styles["default"].noBottomMargin, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
      size: "small",
      variant: "outline",
      fullWidth: true,
      placeholder: _i18n["default"].getString('enterPassword', currentLocale),
      disabled: isDisabled,
      error: !meeting.isMeetingPasswordValid,
      helperText: getHelperTextForPasswordField(meeting, currentLocale, isPasswordFocus),
      "data-sign": "password",
      value: meeting.password,
      inputProps: {
        maxLength: 255
      },
      onChange: function onChange(e) {
        var password = e.target.value;
        update({
          password: password
        });
      },
      onFocus: function onFocus() {
        setPasswordFocus(true);
      },
      onBlur: function onBlur() {
        setPasswordFocus(false);
        trackItemChanges(_Meeting.RCM_ITEM_NAME.password);
      }
    })) : null), /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
      dataSign: "videoSection",
      expandable: settingsGroupExpandable,
      summary: _i18n["default"].getString('video', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
      "data-sign": "turnOffCamera",
      disabled: isDisabled || enableServiceWebSettings && ((_meeting$settingLock = meeting.settingLock) === null || _meeting$settingLock === void 0 ? void 0 : _meeting$settingLock.startParticipantsVideo),
      size: checkboxSize,
      checked: !meeting.startParticipantsVideo,
      onChange: function onChange() {
        update({
          startParticipantsVideo: !meeting.startParticipantsVideo
        });
      },
      label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
        dataSign: "turnOffCamera",
        labelPlacement: labelPlacement,
        isLocked: enableServiceWebSettings && ((_meeting$settingLock2 = meeting.settingLock) === null || _meeting$settingLock2 === void 0 ? void 0 : _meeting$settingLock2.startParticipantsVideo),
        currentLocale: currentLocale,
        hasScrollBar: hasScrollBar
      }, _i18n["default"].getString('turnOffCamera', currentLocale))
    })), /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
      "data-sign": "turnOffHostCamera",
      disabled: isDisabled || enableServiceWebSettings && ((_meeting$settingLock3 = meeting.settingLock) === null || _meeting$settingLock3 === void 0 ? void 0 : _meeting$settingLock3.startHostVideo),
      size: checkboxSize,
      checked: !meeting.startHostVideo,
      onChange: function onChange() {
        update({
          startHostVideo: !meeting.startHostVideo
        });
      },
      label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
        dataSign: "turnOffHostCamera",
        labelPlacement: labelPlacement,
        isLocked: enableServiceWebSettings && ((_meeting$settingLock4 = meeting.settingLock) === null || _meeting$settingLock4 === void 0 ? void 0 : _meeting$settingLock4.startHostVideo),
        currentLocale: currentLocale,
        hasScrollBar: hasScrollBar
      }, _i18n["default"].getString('turnOffHostCamera', currentLocale))
    }))), /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
      dataSign: "audioSection",
      expandable: settingsGroupExpandable,
      summary: _i18n["default"].getString('audio', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].selectOption, _styles["default"].labelContent, _styles["default"].sideMargin)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].placementLeft, _styles["default"].hackWidth)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      fullWidth: true,
      variant: "box",
      "data-sign": "audioOptions",
      disabled: isDisabled || enableServiceWebSettings && ((_meeting$settingLock5 = meeting.settingLock) === null || _meeting$settingLock5 === void 0 ? void 0 : _meeting$settingLock5.audioOptions),
      title: _i18n["default"].getString(audioHelpTextMap[audioOptions], currentLocale),
      classes: {
        root: _styles["default"].boxSelectWrapper
      },
      className: (0, _clsx4["default"])(_styles["default"].boxSelect, _styles["default"].autoFullWidth),
      onChange: function onChange(e) {
        updateAudioOptions(e.target.value);
      },
      value: audioOptions
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "Phone",
      value: "Phone",
      className: _styles["default"].boxSelectMenuItem
    }, _i18n["default"].getString('telephonyOnly', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "ComputerAudio",
      value: "ComputerAudio",
      className: _styles["default"].boxSelectMenuItem
    }, _i18n["default"].getString('voIPOnly', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "Phone_ComputerAudio",
      value: "Phone_ComputerAudio",
      className: _styles["default"].boxSelectMenuItem
    }, _i18n["default"].getString('both', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "ThirdParty",
      value: "ThirdParty",
      className: _styles["default"].boxSelectMenuItem,
      disabled: !enableThirdPartyAudio
    }, _i18n["default"].getString('thirdParty', currentLocale)))), enableServiceWebSettings && ((_meeting$settingLock6 = meeting.settingLock) === null || _meeting$settingLock6 === void 0 ? void 0 : _meeting$settingLock6.audioOptions) ? /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].placementRight, _styles["default"].lockedIcon)
    }, /*#__PURE__*/_react["default"].createElement(_ExtendedTooltip.ExtendedTooltip, {
      "data-sign": "audioSection_lock",
      hasScrollBar: hasScrollBar,
      title: _i18n["default"].getString('lockedTooltip', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      size: "small",
      symbol: _junoIcon.LockBorder,
      className: _styles["default"].lockButton
    }))) : null)), /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
      dataSign: "meetingOptionsSection",
      expandable: settingsGroupExpandable,
      summary: _i18n["default"].getString('meetingOptions', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
      disabled: isDisabled || enableServiceWebSettings && ((_meeting$settingLock7 = meeting.settingLock) === null || _meeting$settingLock7 === void 0 ? void 0 : _meeting$settingLock7.allowJoinBeforeHost),
      size: checkboxSize,
      "data-sign": "enableJoinToggle",
      checked: meeting.allowJoinBeforeHost,
      onChange: function onChange() {
        update({
          allowJoinBeforeHost: !meeting.allowJoinBeforeHost
        });
        trackItemChanges(_Meeting.RCM_ITEM_NAME.allowJoinBeforeHost);
      },
      label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
        dataSign: "enableJoinToggle",
        labelPlacement: labelPlacement,
        isLocked: enableServiceWebSettings && ((_meeting$settingLock8 = meeting.settingLock) === null || _meeting$settingLock8 === void 0 ? void 0 : _meeting$settingLock8.allowJoinBeforeHost),
        currentLocale: currentLocale,
        hasScrollBar: hasScrollBar
      }, _i18n["default"].getString('joinBeforeHost', currentLocale))
    })), showRecurringMeeting && recurringMeetingPosition === 'bottom' ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
      disabled: isDisabled,
      size: checkboxSize,
      "data-sign": "recurringMeeting",
      checked: isRecurring,
      onChange: function onChange() {
        toggleRecurring(!isRecurring);
      },
      label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
        dataSign: "recurringMeeting",
        labelPlacement: labelPlacement
      }, _i18n["default"].getString('recurringMeeting', currentLocale))
    })), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "caption1",
      className: (0, _clsx4["default"])(_styles["default"].recurringNote, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
    }, _i18n["default"].getString('recurringNote', currentLocale))) : null))))
  );
};
MeetingConfigs.defaultProps = {};
//# sourceMappingURL=index.js.map

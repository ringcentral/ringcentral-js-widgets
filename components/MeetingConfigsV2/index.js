"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingConfigs = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.regexp.split");

var _react = _interopRequireWildcard(require("react"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _meetingHelper = require("@ringcentral-integration/commons/helpers/meetingHelper");

var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");

var _MeetingV = require("@ringcentral-integration/commons/modules/MeetingV2");

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _MeetingCalendarHelper = require("../../lib/MeetingCalendarHelper");

var _MeetingHelper = require("../../lib/MeetingHelper");

var _SpinnerOverlay = require("../SpinnerOverlay");

var _MeetingAlert = require("../MeetingAlert");

var _ExtendedTooltip = require("./ExtendedTooltip");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _VideoSettingGroup = require("./VideoSettingGroup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    padding: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getHelperTextForPasswordField(meeting, currentLocale, isPasswordFocus) {
  if (!meeting.password) {
    return _i18n["default"].getString('passwordEmptyError', currentLocale);
  }

  if (!meeting.isMeetingPasswordValid) {
    return _i18n["default"].getString('rcmPasswordInvalidError', currentLocale);
  }

  if (isPasswordFocus) {
    return _i18n["default"].getString('rcmPasswordHintText', currentLocale);
  } // when correct input without focus, show nothing


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
    className: (0, _classnames4["default"])(_styles["default"].placementLeft, _defineProperty({}, _styles["default"].optionLabel, labelPlacement === 'start'), className)
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
    symbol: _icon.LockBorder
  }))) : null);
};

var PanelRoot = _juno.styled.div(_templateObject(), _juno.RcCheckbox, (0, _juno.spacing)(2));

var MeetingConfigs = function MeetingConfigs(_ref2) {
  var _meeting$telephonyUse, _meeting$settingLock, _meeting$settingLock2, _meeting$settingLock3, _meeting$settingLock4, _meeting$settingLock5, _meeting$settingLock6, _meeting$settingLock7, _meeting$settingLock8;

  var updateMeetingSettings = _ref2.updateMeetingSettings,
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
      showRecurringMeeting = _ref2.showRecurringMeeting,
      meetingOptionToggle = _ref2.meetingOptionToggle,
      audioOptionToggle = _ref2.audioOptionToggle,
      useTimePicker = _ref2.useTimePicker,
      showScheduleOnBehalf = _ref2.showScheduleOnBehalf,
      delegators = _ref2.delegators,
      updateScheduleFor = _ref2.updateScheduleFor,
      trackSettingChanges = _ref2.trackSettingChanges,
      labelPlacement = _ref2.labelPlacement,
      datePickerSize = _ref2.datePickerSize,
      timePickerSize = _ref2.timePickerSize,
      checkboxSize = _ref2.checkboxSize,
      showSpinnerInConfigPanel = _ref2.showSpinnerInConfigPanel,
      enableServiceWebSettings = _ref2.enableServiceWebSettings,
      recurringMeetingPosition = _ref2.recurringMeetingPosition,
      defaultTopic = _ref2.defaultTopic,
      showIeSupportAlert = _ref2.showIeSupportAlert,
      showRemoveMeetingWarning = _ref2.showRemoveMeetingWarning,
      brandConfig = _ref2.brandConfig,
      appName = _ref2.appName;
  (0, _react.useEffect)(function () {
    if (init) {
      init();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

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
    setHasScrollBar(configRef.current.scrollHeight > configRef.current.clientHeight);
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

  var _useState7 = (0, _react.useState)((0, _Meeting.isRecurringMeeting)(meeting.meetingType)),
      _useState8 = _slicedToArray(_useState7, 2),
      isRecurring = _useState8[0],
      setIsRecurring = _useState8[1];

  var toggleRecurring = function toggleRecurring(isRecurring) {
    update({
      meetingType: isRecurring ? _Meeting.MeetingType.RECURRING : _Meeting.MeetingType.SCHEDULED
    });
  };

  (0, _react.useEffect)(function () {
    setIsRecurring((0, _Meeting.isRecurringMeeting)(meeting.meetingType));
  }, [meeting.meetingType]);
  /* Use Personal MeetingId */

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isPmiConfirm = _useState10[0],
      setPmiConfirm = _useState10[1];

  var onPmiChange = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(usePersonalMeetingId) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setPmiConfirm(false);
              _context.next = 3;
              return switchUsePersonalMeetingId(usePersonalMeetingId);

            case 3:
            case "end":
              return _context.stop();
          }
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
  var checkboxCommProps = getCheckboxCommProps(labelPlacement);
  var startTime = (0, _react.useMemo)(function () {
    return new Date(meeting.schedule.startTime);
  }, [meeting.schedule.startTime]);
  var hoursList = (0, _MeetingHelper.getHoursList)(_MeetingHelper.HOUR_SCALE, currentLocale);
  var minutesList = (0, _MeetingHelper.getMinutesList)(_MeetingHelper.MINUTE_SCALE, currentLocale);
  return /*#__PURE__*/_react["default"].createElement(PanelRoot, {
    ref: configRef,
    className: _styles["default"].videoConfig,
    "data-sign": "meetingConfigsPanel"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingContent
  }, showSpinnerInConfigPanel ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, showRemoveMeetingWarning && /*#__PURE__*/_react["default"].createElement(_MeetingAlert.RemoveMeetingWarn, {
    brandConfig: brandConfig,
    currentLocale: currentLocale
  }), showTopic ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].meetingSection, _styles["default"].meetingTitle)
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
    "data-sign": "durationHour",
    value: Math.floor(meeting.schedule.durationInMinutes / 60),
    onChange: function onChange(e) {
      var value = +e.target.value;
      var restMinutes = Math.floor(meeting.schedule.durationInMinutes % 60);
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
      key: i,
      value: item.value,
      "data-sign": "option".concat(i)
    }, item !== null ? item.text : 'defaultValue');
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].minuteDuration
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    fullWidth: true,
    gutterBottom: true,
    "data-sign": "durationMinute",
    required: true,
    value: Math.floor(meeting.schedule.durationInMinutes % 60),
    onChange: function onChange(e) {
      var value = +e.target.value;
      var restHours = Math.floor(meeting.schedule.durationInMinutes / 60);
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
      key: i,
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
    className: (0, _classnames4["default"])(_styles["default"].sideMargin, _styles["default"].selectOption)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    variant: "box",
    disabled: disabled,
    className: (0, _classnames4["default"])(_styles["default"].boxSelect, _styles["default"].autoFullWidth),
    "data-sign": "scheduleFor",
    onChange: function onChange(e) {
      updateScheduleFor(e.target.value);
      trackItemChanges(_MeetingV.RCM_ITEM_NAME.scheduleFor);
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
    onChange: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              onPmiChange(!meeting.usePersonalMeetingId);

            case 1:
            case "end":
              return _context2.stop();
          }
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
      var password = ''; // checked before

      if (meeting._requireMeetingPassword) {
        password = '';
      } else {
        password = meeting.usePersonalMeetingId && meeting._pmiPassword ? meeting._pmiPassword : (0, _meetingHelper.generateRandomPassword)();
      }

      update({
        _requireMeetingPassword: !meeting._requireMeetingPassword,
        password: password
      });
      trackItemChanges(_MeetingV.RCM_ITEM_NAME._requireMeetingPassword);
    },
    label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
      dataSign: "requirePassword",
      labelPlacement: labelPlacement,
      isLocked: meeting._lockRequireMeetingPassword,
      currentLocale: currentLocale,
      hasScrollBar: hasScrollBar
    }, _i18n["default"].getString('requirePassword', currentLocale))
  })), meeting._requireMeetingPassword ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].passwordField, _styles["default"].noBottomMargin, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
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
      trackItemChanges(_MeetingV.RCM_ITEM_NAME.password);
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
    className: (0, _classnames4["default"])(_styles["default"].selectOption, _styles["default"].labelContent, _styles["default"].sideMargin)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].placementLeft, _styles["default"].hackWidth)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    fullWidth: true,
    variant: "box",
    "data-sign": "audioOptions",
    disabled: isDisabled || enableServiceWebSettings && ((_meeting$settingLock5 = meeting.settingLock) === null || _meeting$settingLock5 === void 0 ? void 0 : _meeting$settingLock5.audioOptions),
    title: _i18n["default"].getString(audioHelpTextMap[audioOptions], currentLocale),
    classes: {
      root: _styles["default"].boxSelectWrapper
    },
    className: (0, _classnames4["default"])(_styles["default"].boxSelect, _styles["default"].autoFullWidth),
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
    className: (0, _classnames4["default"])(_styles["default"].placementRight, _styles["default"].lockedIcon)
  }, /*#__PURE__*/_react["default"].createElement(_ExtendedTooltip.ExtendedTooltip, {
    "data-sign": "audioSection_lock",
    hasScrollBar: hasScrollBar,
    title: _i18n["default"].getString('lockedTooltip', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "small",
    symbol: _icon.LockBorder,
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
      trackItemChanges(_MeetingV.RCM_ITEM_NAME.allowJoinBeforeHost);
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
    className: (0, _classnames4["default"])(_styles["default"].recurringNote, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
  }, _i18n["default"].getString('recurringNote', currentLocale))) : null), showIeSupportAlert && /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
    dataSign: "ieAlert",
    expandable: false
  }, /*#__PURE__*/_react["default"].createElement(_MeetingAlert.MeetingAlert, {
    severity: "warning",
    content: (0, _formatMessage["default"])(_i18n["default"].getString('ieSupportAlert', currentLocale), {
      appName: appName
    })
  })))));
};

exports.MeetingConfigs = MeetingConfigs;
MeetingConfigs.defaultProps = {
  showRecurringMeeting: true,
  labelPlacement: 'start',
  datePickerSize: 'medium',
  timePickerSize: 'medium',
  checkboxSize: 'medium'
};
//# sourceMappingURL=index.js.map

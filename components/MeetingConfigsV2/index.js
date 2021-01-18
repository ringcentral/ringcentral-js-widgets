"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMinutesList = getMinutesList;
exports.getHoursList = getHoursList;
exports.Topic = exports.MeetingConfigs = exports.HOUR_SCALE = exports.MINUTE_SCALE = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.regexp.split");

var _juno = require("@ringcentral/juno");

var _ramda = require("ramda");

var _classnames4 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _meetingHelper = require("ringcentral-integration/helpers/meetingHelper");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _MeetingCalendarHelper = require("../../lib/MeetingCalendarHelper");

var _SpinnerOverlay = require("../SpinnerOverlay");

var _ExtendedTooltip = require("./ExtendedTooltip");

var _i18n = _interopRequireDefault(require("./i18n"));

var _iconLock_border = _interopRequireDefault(require("./icons/icon-lock_border.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _VideoSettingGroup = require("./VideoSettingGroup");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MINUTE_SCALE = 4;
exports.MINUTE_SCALE = MINUTE_SCALE;
var HOUR_SCALE = 13;
exports.HOUR_SCALE = HOUR_SCALE;

function getMinutesList(MINUTE_SCALE) {
  return (0, _ramda.reduce)(function (result) {
    var index = result.length;
    var value = 60 / MINUTE_SCALE * index;
    var text = "".concat("".concat(value, "0").slice(0, 2), " min");
    return result.concat({
      value: value,
      text: text
    });
  }, [], new Array(MINUTE_SCALE));
}

function getHoursList(HOUR_SCALE) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }

  return (0, _ramda.reduce)(function (result) {
    var value = result.length;
    var text = "".concat("0".concat(value, "0").slice(-3, -1), " hr");
    return result.concat({
      value: value,
      text: text
    });
  }, [], new Array(HOUR_SCALE));
}

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
      className = _ref$className === void 0 ? '' : _ref$className;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].labelContent
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].placementLeft, _defineProperty({}, _styles["default"].optionLabel, labelPlacement === 'start'), className)
  }, children), isLocked ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].placementRight
  }, /*#__PURE__*/_react["default"].createElement(_ExtendedTooltip.ExtendedTooltip, {
    hasScrollBar: hasScrollBar,
    title: /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('lockedTooltip', currentLocale))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "small",
    symbol: _iconLock_border["default"]
  }))) : null);
};

var MeetingConfigs = function MeetingConfigs(_ref2) {
  var _meeting$settingLock, _meeting$settingLock2, _meeting$settingLock3, _meeting$settingLock4, _meeting$settingLock5, _meeting$settingLock6, _meeting$settingLock7, _meeting$settingLock8;

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
      labelPlacement = _ref2.labelPlacement,
      datePickerSize = _ref2.datePickerSize,
      timePickerSize = _ref2.timePickerSize,
      showSpinnerInConfigPanel = _ref2.showSpinnerInConfigPanel,
      enableServiceWebSettings = _ref2.enableServiceWebSettings,
      putRecurringMeetingInMiddle = _ref2.putRecurringMeetingInMiddle;
  (0, _react.useEffect)(function () {
    if (init) {
      init();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  var update = function update(options) {
    return updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), options));
  };

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      topicRef = _useState2[0],
      setTopicRef = _useState2[1];

  var configRef = (0, _react.useRef)();

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hasScrollBar = _useState4[0],
      setHasScrollBar = _useState4[1];

  (0, _react.useEffect)(function () {
    setHasScrollBar(configRef.current.scrollHeight > configRef.current.clientHeight);
  }, []);
  /* Password */

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isPasswordFocus = _useState6[0],
      setPasswordFocus = _useState6[1];
  /* AudioOptions */


  var _useState7 = (0, _react.useState)(meeting.audioOptions && meeting.audioOptions.join('_')),
      _useState8 = _slicedToArray(_useState7, 2),
      audioOptions = _useState8[0],
      setAudioOptions = _useState8[1];

  var audioHelpTextMap = {
    Phone: 'telephonyOnly',
    ComputerAudio: 'voIPOnly',
    Phone_ComputerAudio: 'both'
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

  var _useState9 = (0, _react.useState)((0, _Meeting.isRecurringMeeting)(meeting.meetingType)),
      _useState10 = _slicedToArray(_useState9, 2),
      isRecurring = _useState10[0],
      setIsRecurring = _useState10[1];

  var toggleRecurring = function toggleRecurring(isRecurring) {
    update({
      meetingType: isRecurring ? _Meeting.MeetingType.RECURRING : _Meeting.MeetingType.SCHEDULED
    });
  };

  (0, _react.useEffect)(function () {
    setIsRecurring((0, _Meeting.isRecurringMeeting)(meeting.meetingType));
  }, [meeting.meetingType]);
  /* Use Personal MeetingId */

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isPmiConfirm = _useState12[0],
      setPmiConfirm = _useState12[1];

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
  var hoursList = getHoursList(HOUR_SCALE);
  var minutesList = getMinutesList(MINUTE_SCALE);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: configRef,
    className: _styles["default"].videoConfig,
    "data-sign": "meetingConfigsPanel"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingContent
  }, showSpinnerInConfigPanel ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, showTopic ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].meetingSection, _styles["default"].meetingTitle)
  }, /*#__PURE__*/_react["default"].createElement(Topic, {
    name: meeting.topic,
    updateMeetingTopic: function updateMeetingTopic(topic) {
      update({
        topic: topic
      });
    },
    currentLocale: currentLocale,
    setTopicRef: setTopicRef
  })) : null, recipientsSection ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, recipientsSection) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSettings
  }, showWhen && !isRecurring ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingDatePicker
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcDatePicker, {
    label: _i18n["default"].getString('date', currentLocale),
    "data-sign": "date",
    date: startTime,
    clearBtn: false,
    formatString: "MM/DD/YYYY",
    size: datePickerSize,
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
    clearBtn: false,
    size: timePickerSize,
    label: _i18n["default"].getString('time', currentLocale),
    isTwelveHourSystem: true,
    "data-sign": "startTime",
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
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcLineSelect, {
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
    classes: {
      root: _styles["default"].select
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
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcLineSelect, {
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
    },
    classes: {
      root: _styles["default"].select
    }
  }, minutesList.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: i,
      value: item.value,
      "data-sign": "option".concat(i)
    }, item !== null ? item.text : 'defaultValue');
  })))) : null, showRecurringMeeting && putRecurringMeetingInMiddle ? /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
    dataSign: "meetingIdSection",
    expandable: settingsGroupExpandable
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
    disabled: isDisabled,
    "data-sign": "recurringMeeting",
    checked: isRecurring,
    onChange: function onChange() {
      toggleRecurring(!isRecurring);
    },
    label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
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
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBoxSelect, {
    disabled: disabled,
    className: (0, _classnames4["default"])(_styles["default"].scheduleForBoxSelect, _styles["default"].autoFullWidth),
    "data-sign": "scheduleFor",
    automationId: "scheduleFor",
    onChange: function onChange(e) {
      updateScheduleFor(e.target.value);
    },
    value: meeting.host.id
  }, delegators.map(function (item) {
    var userName = item.name === _Meeting.ASSISTED_USERS_MYSELF ? _i18n["default"].getString(item.name, currentLocale) : item.name;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      value: item.id,
      key: item.id,
      title: userName,
      className: _styles["default"].boxSelectMenuItem
    }, userName);
  })))) : null, personalMeetingId ? /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
    dataSign: "meetingIdSection",
    expandable: settingsGroupExpandable,
    summary: _i18n["default"].getString('meetingId', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
    "data-sign": "usePersonalMeetingId",
    disabled: disabled,
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
      labelPlacement: labelPlacement,
      className: _styles["default"].pmiLabel
    }, _i18n["default"].getString('usePersonalMeetingId', currentLocale), "\xA0", /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "personalMeetingId"
    }, (0, _MeetingCalendarHelper.formatMeetingId)(personalMeetingId, '-')))
  })), meeting.usePersonalMeetingId ? /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
    severity: "info",
    className: _styles["default"].alertContainer
  }, isPmiConfirm ? _i18n["default"].getString('pmiSettingChangeAlert', currentLocale) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, _i18n["default"].getString('pmiChangeConfirm', currentLocale), /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    handleOnClick: function handleOnClick() {
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
    },
    label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
      labelPlacement: labelPlacement,
      isLocked: meeting._lockRequireMeetingPassword,
      currentLocale: currentLocale,
      hasScrollBar: hasScrollBar
    }, _i18n["default"].getString('requirePassword', currentLocale))
  })), meeting._requireMeetingPassword ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].passwordField, _styles["default"].noBottomMargin, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcOutlineTextField, {
    size: "small",
    placeholder: _i18n["default"].getString('Enter Password', currentLocale),
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
    }
  })) : null), /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
    dataSign: "videoSection",
    expandable: settingsGroupExpandable,
    summary: _i18n["default"].getString('video', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
    "data-sign": "turnOffCamera",
    disabled: isDisabled || enableServiceWebSettings && ((_meeting$settingLock = meeting.settingLock) === null || _meeting$settingLock === void 0 ? void 0 : _meeting$settingLock.startParticipantsVideo),
    checked: !meeting.startParticipantsVideo,
    onChange: function onChange() {
      update({
        startParticipantsVideo: !meeting.startParticipantsVideo
      });
    },
    label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
      labelPlacement: labelPlacement,
      isLocked: enableServiceWebSettings && ((_meeting$settingLock2 = meeting.settingLock) === null || _meeting$settingLock2 === void 0 ? void 0 : _meeting$settingLock2.startParticipantsVideo),
      currentLocale: currentLocale,
      hasScrollBar: hasScrollBar
    }, _i18n["default"].getString('turnOffCamera', currentLocale))
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
    "data-sign": "turnOffHostCamera",
    disabled: isDisabled || enableServiceWebSettings && ((_meeting$settingLock3 = meeting.settingLock) === null || _meeting$settingLock3 === void 0 ? void 0 : _meeting$settingLock3.startHostVideo),
    checked: !meeting.startHostVideo,
    onChange: function onChange() {
      update({
        startHostVideo: !meeting.startHostVideo
      });
    },
    label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
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
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBoxSelect, {
    disabled: isDisabled || enableServiceWebSettings && ((_meeting$settingLock5 = meeting.settingLock) === null || _meeting$settingLock5 === void 0 ? void 0 : _meeting$settingLock5.audioOptions),
    title: _i18n["default"].getString(audioHelpTextMap[audioOptions], currentLocale),
    classes: {
      root: _styles["default"].boxSelectWrapper
    },
    className: _styles["default"].autoFullWidth,
    automationId: "audioOptions",
    onChange: function onChange(e) {
      updateAudioOptions(e.target.value);
    },
    value: audioOptions
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    value: "Phone",
    className: _styles["default"].boxSelectMenuItem
  }, _i18n["default"].getString('telephonyOnly', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    value: "ComputerAudio",
    className: _styles["default"].boxSelectMenuItem
  }, _i18n["default"].getString('voIPOnly', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    value: "Phone_ComputerAudio",
    className: _styles["default"].boxSelectMenuItem
  }, _i18n["default"].getString('both', currentLocale)))), enableServiceWebSettings && ((_meeting$settingLock6 = meeting.settingLock) === null || _meeting$settingLock6 === void 0 ? void 0 : _meeting$settingLock6.audioOptions) ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].placementRight, _styles["default"].lockedIcon)
  }, /*#__PURE__*/_react["default"].createElement(_ExtendedTooltip.ExtendedTooltip, {
    hasScrollBar: hasScrollBar,
    title: /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('lockedTooltip', currentLocale))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "small",
    symbol: _iconLock_border["default"]
  }))) : null)), /*#__PURE__*/_react["default"].createElement(_VideoSettingGroup.VideoSettingGroup, {
    dataSign: "meetingOptionsSection",
    expandable: settingsGroupExpandable,
    summary: _i18n["default"].getString('meetingOptions', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
    disabled: isDisabled || enableServiceWebSettings && ((_meeting$settingLock7 = meeting.settingLock) === null || _meeting$settingLock7 === void 0 ? void 0 : _meeting$settingLock7.allowJoinBeforeHost),
    "data-sign": "enableJoinToggle",
    checked: meeting.allowJoinBeforeHost,
    onChange: function onChange() {
      update({
        allowJoinBeforeHost: !meeting.allowJoinBeforeHost
      });
    },
    label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
      labelPlacement: labelPlacement,
      isLocked: enableServiceWebSettings && ((_meeting$settingLock8 = meeting.settingLock) === null || _meeting$settingLock8 === void 0 ? void 0 : _meeting$settingLock8.allowJoinBeforeHost),
      currentLocale: currentLocale,
      hasScrollBar: hasScrollBar
    }, _i18n["default"].getString('joinBeforeHost', currentLocale))
  })), showRecurringMeeting && !putRecurringMeetingInMiddle ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, _extends({}, checkboxCommProps, {
    disabled: isDisabled,
    "data-sign": "recurringMeeting",
    checked: isRecurring,
    onChange: function onChange() {
      toggleRecurring(!isRecurring);
    },
    label: /*#__PURE__*/_react["default"].createElement(MeetingOptionLabel, {
      labelPlacement: labelPlacement
    }, _i18n["default"].getString('recurringMeeting', currentLocale))
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "caption1",
    className: (0, _classnames4["default"])(_styles["default"].recurringNote, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
  }, _i18n["default"].getString('recurringNote', currentLocale))) : null))));
};

exports.MeetingConfigs = MeetingConfigs;
MeetingConfigs.defaultProps = {
  showRecurringMeeting: true,
  labelPlacement: 'start',
  datePickerSize: 'medium',
  timePickerSize: 'medium'
};

var InnerTopic = function InnerTopic(_ref5) {
  var name = _ref5.name,
      currentLocale = _ref5.currentLocale,
      setTopicRef = _ref5.setTopicRef,
      updateMeetingTopic = _ref5.updateMeetingTopic;

  var _useState13 = (0, _react.useState)(name),
      _useState14 = _slicedToArray(_useState13, 2),
      topic = _useState14[0],
      setTopic = _useState14[1];

  var topicRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    setTopic(name);
    setTopicRef(topicRef);
  }, [name, setTopicRef]);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
    ref: topicRef // size="small"
    ,
    label: _i18n["default"].getString('topic', currentLocale),
    "data-sign": "topic",
    fullWidth: true,
    clearBtn: false,
    value: topic,
    inputProps: {
      maxLength: 255
    },
    onChange: function onChange(e) {
      setTopic(e.target.value);
    },
    onBlur: function onBlur() {
      updateMeetingTopic(topic);
    },
    classes: {
      root: _styles["default"].input
    }
  });
};

var Topic = /*#__PURE__*/_react["default"].memo(InnerTopic, function (prevProps, nextProps) {
  return prevProps.name === nextProps.name && prevProps.currentLocale === nextProps.currentLocale;
});

exports.Topic = Topic;
//# sourceMappingURL=index.js.map

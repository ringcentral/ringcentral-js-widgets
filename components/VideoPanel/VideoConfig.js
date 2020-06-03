"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Topic = exports.VideoConfig = exports.HOUR_SCALE = exports.MINUTE_SCALE = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _rcui = require("@ringcentral-integration/rcui");

var _iconArrow_down = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-arrow_down.svg"));

var _iconEventNew = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-event-new.svg"));

var _ramda = require("ramda");

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("../../lib/reactHooks");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

function getHelperTextForPasswordField(meeting, currentLocale) {
  if (!meeting.meetingPassword) {
    return _i18n["default"].getString('passwordEmptyError', currentLocale);
  }

  if (!meeting.isMeetingPasswordValid) {
    return _i18n["default"].getString('passwordInvalidError', currentLocale);
  }

  return _i18n["default"].getString('passwordHintText', currentLocale);
}

var VideoConfig = function VideoConfig(props) {
  var currentLocale = props.currentLocale,
      meeting = props.meeting,
      updateMeetingSettings = props.updateMeetingSettings,
      validatePasswordSettings = props.validatePasswordSettings,
      recipientsSection = props.recipientsSection,
      init = props.init,
      children = props.children,
      showWhen = props.showWhen,
      showDuration = props.showDuration,
      brandName = props.brandName,
      personalMeetingId = props.personalMeetingId,
      datePickerSize = props.datePickerSize,
      timePickerSize = props.timePickerSize;
  var hoursList = getHoursList(HOUR_SCALE);
  var minutesList = getMinutesList(MINUTE_SCALE);
  var isRCBrand = brandName === 'RingCentral';
  (0, _react.useEffect)(function () {
    if (init) {
      init();
    }
  }, []);

  var _useState = (0, _react.useState)(meeting.meetingPassword),
      _useState2 = _slicedToArray(_useState, 2),
      meetingPassword = _useState2[0],
      setMeetingPassword = _useState2[1];

  (0, _react.useEffect)(function () {
    setMeetingPassword(meeting.meetingPassword);
  }, [meeting.meetingPassword]);
  var debouncedPassword = (0, _reactHooks.useDebounce)(meetingPassword, 200);
  (0, _react.useEffect)(function () {
    var isMeetingPasswordValid = validatePasswordSettings(debouncedPassword, meeting.isMeetingSecret);
    updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
      meetingPassword: debouncedPassword,
      isMeetingPasswordValid: isMeetingPasswordValid
    }));
  }, [debouncedPassword]);
  var startTime = (0, _react.useMemo)(function () {
    return new Date(meeting.startTime);
  }, [meeting.startTime]);
  var meetingSettingsPanelExpandable = false;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].videoConfig
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].title
  }, /*#__PURE__*/_react["default"].createElement("h2", null, _i18n["default"].getString('schedule', currentLocale))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingContent
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, children), recipientsSection ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, recipientsSection) : null, showWhen ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcDatePicker, {
    label: _i18n["default"].getString('date', currentLocale),
    "data-sign": "date",
    date: startTime,
    fullWidth: true,
    size: datePickerSize,
    onChange: function onChange(value) {
      updateMeetingSettings({
        startTime: value
      });
    },
    formatString: "MM/DD/YYYY",
    InputProps: {
      endAdornment: /*#__PURE__*/_react["default"].createElement(_rcui.RcIconButton, {
        variant: "round",
        size: "small",
        symbol: _iconEventNew["default"]
      })
    }
  })) : null, showWhen ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcTimePicker, {
    fullWidth: true,
    size: timePickerSize,
    label: _i18n["default"].getString('startTime', currentLocale),
    "data-sign": "startTime",
    value: startTime,
    onChange: function onChange(value) {
      updateMeetingSettings({
        startTime: new Date(value)
      });
    },
    InputProps: {
      endAdornment: /*#__PURE__*/_react["default"].createElement(_rcui.RcIconButton, {
        variant: "round",
        size: "small",
        symbol: _iconEventNew["default"]
      })
    }
  })) : null, showDuration ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].hourDuration
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcLineSelect // size="small"
  , {
    "data-sign": "durationHour",
    value: Math.floor(meeting.duration / 60),
    onChange: function onChange(e) {
      var value = +e.target.value;
      var restMinutes = Math.floor(meeting.duration % 60);
      var durationInMinutes = value * 60 + restMinutes;
      updateMeetingSettings({
        duration: durationInMinutes
      });
    },
    classes: {
      root: _styles["default"].select
    },
    className: _styles["default"].select,
    label: _i18n["default"].getString('duration', currentLocale)
  }, hoursList.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_rcui.RcMenuItem, {
      key: i,
      value: item.value,
      "data-sign": "option".concat(i)
    }, item !== null ? item.text : 'defaultValue');
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].minuteDuration
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcLineSelect, {
    "data-sign": "durationMinute",
    required: true,
    value: Math.floor(meeting.duration % 60),
    onChange: function onChange(e) {
      var value = +e.target.value;
      var restHours = Math.floor(meeting.duration / 60);
      var isMax = restHours === hoursList.slice(-1)[0].value;
      var minutes = isMax ? 0 : value;
      var durationInMinutes = restHours * 60 + minutes;
      updateMeetingSettings({
        duration: durationInMinutes
      });
    },
    classes: {
      root: _styles["default"].select
    }
  }, minutesList.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_rcui.RcMenuItem, {
      key: i,
      value: item.value,
      "data-sign": "option".concat(i)
    }, item !== null ? item.text : 'defaultValue');
  })))) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSettings
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcExpansionPanel, {
    classes: {
      root: _styles["default"].expansionPanel,
      expanded: _styles["default"].expansionPanelExpanded
    },
    defaultExpanded: true,
    disabled: !meetingSettingsPanelExpandable
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcExpansionPanelSummary, {
    classes: {
      root: _styles["default"].expansionPanelSummary,
      content: _styles["default"].expansionPanelSummaryContent,
      disabled: meetingSettingsPanelExpandable ? null : _styles["default"].expansionPanelSummaryDisabled
    },
    expandIcon: meetingSettingsPanelExpandable ? /*#__PURE__*/_react["default"].createElement(_rcui.RcIconButton, {
      variant: "round",
      symbol: _iconArrow_down["default"]
    }) : null,
    "data-sign": "expansionSummary"
  }, _i18n["default"].getString(isRCBrand ? 'rcMeetingSettings' : 'meetingSettings', currentLocale)), /*#__PURE__*/_react["default"].createElement(_rcui.RcExpansionPanelDetails, {
    classes: {
      root: _styles["default"].expansionPanelDetails
    },
    "date-sign": "expansionDetails"
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcFormGroup, {
    classes: {
      root: _styles["default"].toggleGroup
    }
  }, personalMeetingId ? /*#__PURE__*/_react["default"].createElement(_rcui.RcSwitch, {
    "data-sign": "usePersonalMeetingId",
    checked: meeting.usePersonalMeetingId,
    onChange: function onChange() {
      updateMeetingSettings({
        usePersonalMeetingId: !meeting.usePersonalMeetingId
      });
    },
    label: /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, _i18n["default"].getString('usePersonalMeetingId', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].personMeetingInfo
    }, personalMeetingId)),
    formControlLabelProps: {
      classes: {
        root: _styles["default"].labelPlacementStart
      },
      labelPlacement: 'start'
    }
  }) : null, /*#__PURE__*/_react["default"].createElement(_rcui.RcSwitch, {
    "data-sign": "requirePassword",
    checked: meeting.isMeetingSecret,
    onChange: function onChange() {
      var next = !meeting.isMeetingSecret;
      updateMeetingSettings({
        isMeetingSecret: next
      });
    },
    label: _i18n["default"].getString('requirePassword', currentLocale),
    formControlLabelProps: {
      classes: {
        root: _styles["default"].labelPlacementStart
      },
      labelPlacement: 'start'
    }
  }), meeting.isMeetingSecret ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].inputArea
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcTextField, {
    error: !meeting.isMeetingPasswordValid,
    helperText: getHelperTextForPasswordField(meeting, currentLocale),
    placeholder: _i18n["default"].getString('setPassword', currentLocale),
    "data-sign": "password",
    fullWidth: true,
    clearBtn: false,
    value: meetingPassword,
    inputProps: {
      maxLength: 255
    },
    onChange: function onChange(e) {
      var password = e.target.value;

      if (/^[A-Za-z0-9]{0,10}$/.test(password)) {
        setMeetingPassword(password);
      }
    }
  })) : null, /*#__PURE__*/_react["default"].createElement(_rcui.RcSwitch, {
    "data-sign": "allowJoinBeforeHost",
    checked: meeting.allowJoinBeforeHost,
    onChange: function onChange() {
      updateMeetingSettings({
        allowJoinBeforeHost: !meeting.allowJoinBeforeHost
      });
    },
    label: _i18n["default"].getString('joinBeforeHost', currentLocale),
    formControlLabelProps: {
      classes: {
        root: _styles["default"].labelPlacementStart
      },
      labelPlacement: 'start'
    }
  }), /*#__PURE__*/_react["default"].createElement(_rcui.RcSwitch, {
    "data-sign": "muteAudio",
    checked: meeting.muteAudio,
    onChange: function onChange() {
      updateMeetingSettings({
        muteAudio: !meeting.muteAudio
      });
    },
    label: _i18n["default"].getString('muteAudio', currentLocale),
    formControlLabelProps: {
      classes: {
        root: _styles["default"].labelPlacementStart
      },
      labelPlacement: 'start'
    }
  }), /*#__PURE__*/_react["default"].createElement(_rcui.RcSwitch, {
    "data-sign": "turnOffCamera",
    checked: meeting.muteVideo,
    onChange: function onChange() {
      updateMeetingSettings({
        muteVideo: !meeting.muteVideo
      });
    },
    label: _i18n["default"].getString('turnOffCamera', currentLocale),
    formControlLabelProps: {
      classes: {
        root: _styles["default"].labelPlacementStart
      },
      labelPlacement: 'start'
    }
  })))))));
};

exports.VideoConfig = VideoConfig;

var InnerTopic = function InnerTopic(_ref) {
  var name = _ref.name,
      currentLocale = _ref.currentLocale,
      setTopicRef = _ref.setTopicRef,
      updateMeetingTopic = _ref.updateMeetingTopic;

  var _useState3 = (0, _react.useState)(name),
      _useState4 = _slicedToArray(_useState3, 2),
      topic = _useState4[0],
      setTopic = _useState4[1];

  var topicRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    setTopic(name);
    setTopicRef(topicRef);
  }, [name, setTopicRef]);
  return /*#__PURE__*/_react["default"].createElement(_rcui.RcTextField, {
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
  return prevProps.name === nextProps.name;
});

exports.Topic = Topic;
VideoConfig.defaultProps = {
  recipientsSection: undefined,
  showWhen: true,
  showDuration: true,
  personalMeetingId: undefined,
  datePickerSize: 'medium',
  timePickerSize: 'medium'
};
//# sourceMappingURL=VideoConfig.js.map

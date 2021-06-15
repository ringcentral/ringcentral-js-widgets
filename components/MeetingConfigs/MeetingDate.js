"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingDate = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("react-widgets/dist/css/react-widgets.css");

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireDefault(require("react"));

var _DateTimePicker = _interopRequireDefault(require("react-widgets/lib/DateTimePicker"));

var _Date = _interopRequireDefault(require("../../assets/images/Date.svg"));

var _Time = _interopRequireDefault(require("../../assets/images/Time.svg"));

var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));

var _constants = require("./constants");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MeetingDate = function MeetingDate(_ref) {
  var currentLocale = _ref.currentLocale,
      meeting = _ref.meeting,
      update = _ref.update,
      that = _ref.that,
      onToggle = _ref.onToggle,
      useTimePicker = _ref.useTimePicker,
      isRecurring = _ref.isRecurring;

  // The default value of the text input is in the componentDidMount.
  var formatDisplay = function formatDisplay(Hours, Minutes) {
    setTimeout(function () {
      that.minutes.value = "0".concat(Minutes, "0").slice(-3, -1);
      var currentHours = "0".concat(Hours, "0").slice(-3, -1);

      if (useTimePicker) {
        if (currentHours > 12) {
          var convertedHours = +currentHours % 12;
          that.hours.value = convertedHours.toString().length === 1 ? "0".concat(convertedHours) : convertedHours;
        }
      }
    }, 0);
  };

  var changeTime = function changeTime() {
    if (useTimePicker) {
      return;
    }

    setTimeout(function () {
      var allInputBlur = document.querySelectorAll('input[flag=timeInput]:focus').length;

      if (!allInputBlur && that.hours) {
        var startTime = new Date(meeting.schedule.startTime);
        var hours = parseInt(that.hours.value, 10);
        var minutes = parseInt(that.minutes.value, 10);
        startTime.setHours(hours);
        startTime.setMinutes(minutes);
        var time = startTime;

        if (startTime.getTime() > new Date().getTime()) {
          update(_objectSpread(_objectSpread({}, meeting), {}, {
            schedule: _objectSpread(_objectSpread({}, meeting.schedule), {}, {
              startTime: startTime.getTime()
            })
          }));
        } else {
          time = new Date(meeting.schedule.startTime);
        }

        var Minutes = time.getMinutes();
        var Hours = time.getHours();
        formatDisplay(Hours, Minutes);
      }
    }, 100);
  };

  var accumulator = function accumulator(event, max) {
    var currentValue = parseInt(event.target.value, 10);

    var isValid = function isValid(value) {
      return currentValue > 0 - value && currentValue < max - value;
    };

    var isUpKey = event.keyCode === 38;

    if (isUpKey) {
      var value = isValid(1) ? currentValue + 1 : 0;
      event.target.value = "0".concat(value, "0").slice(-3, -1);
    }

    var isDownKey = event.keyCode === 40;

    if (isDownKey) {
      var _value = isValid(0) ? currentValue - 1 : max - 1;

      event.target.value = "0".concat(_value, "0").slice(-3, -1);
    }
  };

  var preventDatePickerReplay = function preventDatePickerReplay(isFocus) {
    that.dateBlur = true;
    setTimeout(function () {
      if (!isFocus && !that.timeBlur) {
        that.topic.focus();
      }

      that.dateBlur = false;
    }, 200);
  };

  var preventTimePickerReplay = function preventTimePickerReplay(isFocus) {
    that.timeBlur = true;
    setTimeout(function () {
      if (!isFocus && !that.dateBlur) {
        that.topic.focus();
      }

      that.timeBlur = false;
    }, 200);
  };

  var minMinute;

  if (meeting.schedule && meeting.schedule.startTime && useTimePicker) {
    var isToday = (0, _moment["default"])(meeting.schedule.startTime).isSame(new Date(), 'day');

    if (isToday) {
      var currentMinute = +(0, _moment["default"])().format('mm');
      var nearlest = (0, _moment["default"])().set('minute', Math.ceil(currentMinute / 15) * 15).toDate();
      minMinute = nearlest;
    }

    console.log('prepared minTime', +minMinute);
  }

  return !isRecurring ? /*#__PURE__*/_react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('when', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].dateTimeBox
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].list
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].datePicker
  }, /*#__PURE__*/_react["default"].createElement(_DateTimePicker["default"], {
    culture: currentLocale,
    time: false,
    value: new Date(meeting.schedule.startTime),
    onChange: function onChange(currentStartTime) {
      preventDatePickerReplay(false);

      if (currentStartTime) {
        var date = new Date(meeting.schedule.startTime);
        date.setFullYear(currentStartTime.getFullYear(), currentStartTime.getMonth(), currentStartTime.getDate());
        var startTime = date.getTime();
        var now = new Date().getTime();

        if (startTime < now) {
          startTime = now;
          var Minutes = new Date().getMinutes();
          var Hours = new Date().getHours();
          formatDisplay(Hours, Minutes);
        }

        update(_objectSpread(_objectSpread({}, meeting), {}, {
          schedule: _objectSpread(_objectSpread({}, meeting.schedule), {}, {
            startTime: startTime
          })
        }));
      }
    },
    onBlur: function onBlur() {
      preventDatePickerReplay(false);
    },
    onToggle: preventDatePickerReplay,
    ref: function ref(_ref2) {
      that.date = _ref2;
    },
    format: "MM/DD/YY",
    min: new Date()
  }), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      return onToggle('date');
    },
    "data-sign": "dateText",
    className: (0, _classnames["default"])(_styles["default"].dateTimeText, _styles["default"].dateText)
  }, (0, _moment["default"])(meeting.schedule.startTime).format('MM/DD/YY'))), /*#__PURE__*/_react["default"].createElement("div", {
    ref: function ref(_ref3) {
      that.dateIcon = _ref3;
    },
    className: _styles["default"].dateIcon
  }, /*#__PURE__*/_react["default"].createElement(_Date["default"], {
    onClick: function onClick() {
      return onToggle('date');
    },
    className: _styles["default"].icon
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].list
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])([_styles["default"].timePicker, useTimePicker && _styles["default"].useTimePicker])
  }, /*#__PURE__*/_react["default"].createElement(_DateTimePicker["default"], {
    culture: currentLocale,
    date: false,
    step: 15,
    value: new Date(meeting.schedule.startTime),
    onChange: function onChange(startTime) {
      preventTimePickerReplay(false);

      if (startTime) {
        update(_objectSpread(_objectSpread({}, meeting), {}, {
          schedule: _objectSpread(_objectSpread({}, meeting.schedule), {}, {
            startTime: startTime.getTime()
          })
        }));
      }
    },
    onBlur: function onBlur() {
      preventTimePickerReplay(false);
    },
    onToggle: preventTimePickerReplay,
    ref: function ref(_ref4) {
      that.time = _ref4;
    },
    format: "hh:mm A",
    min: minMinute
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].timeText,
    onClick: function onClick() {
      if (useTimePicker) {
        onToggle('time');
      }
    }
  }, /*#__PURE__*/_react["default"].createElement("input", {
    flag: "timeInput",
    disabled: useTimePicker,
    ref: function ref(_ref6) {
      that.hours = _ref6;
    },
    "data-sign": "timeInputHour",
    className: _styles["default"].timeInput,
    defaultValue: (0, _moment["default"])(meeting.schedule.startTime).format(useTimePicker ? 'hh' : 'HH'),
    onChange: function onChange(_ref5) {
      var target = _ref5.target;
      that.hours.value = target.value.replace(_constants.NO_NUMBER_REGEX, '');
      var isSelectionEnd = target.selectionEnd === 2;

      if (isSelectionEnd) {
        that.minutes.value = '';
        that.minutes.focus();
      }
    },
    onKeyDown: function onKeyDown(event) {
      accumulator(event, 24);
      var isRightKey = event.keyCode === 39;
      var isSelectionEnd = event.target.selectionEnd === 2;

      if (isRightKey && isSelectionEnd) {
        that.minutes.focus();
      }
    },
    onBlur: changeTime,
    maxLength: 2,
    type: "text"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].colon
  }, ":"), /*#__PURE__*/_react["default"].createElement("input", {
    flag: "timeInput",
    disabled: useTimePicker,
    ref: function ref(_ref8) {
      that.minutes = _ref8;
    },
    "data-sign": "timeInputMinute",
    className: _styles["default"].timeInput,
    defaultValue: (0, _moment["default"])(meeting.schedule.startTime).format('mm'),
    onKeyDown: function onKeyDown(event) {
      var isDelKey = event.keyCode === 8;
      var isLeftKey = event.keyCode === 37;
      var isSelectionHead = event.target.selectionEnd === 0;

      if (isSelectionHead && (isDelKey || isLeftKey)) {
        that.hours.focus();
        that.hours.setSelectionRange(2, 2);
      }

      accumulator(event, 60);
    },
    onChange: function onChange(_ref7) {
      var target = _ref7.target;
      that.minutes.value = target.value.replace(_constants.NO_NUMBER_REGEX, '');
    },
    onBlur: changeTime,
    maxLength: 2,
    type: "text"
  }), useTimePicker && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].colon
  }, (0, _moment["default"])(meeting.schedule.startTime).locale('en').format('A')))), /*#__PURE__*/_react["default"].createElement("div", {
    ref: function ref(_ref9) {
      that.TimeIcon = _ref9;
    },
    className: _styles["default"].timeIcon
  }, /*#__PURE__*/_react["default"].createElement(_Time["default"], {
    onClick: function onClick() {
      if (useTimePicker) {
        onToggle('time');
      }
    },
    className: _styles["default"].icon
  }))))) : null;
};

exports.MeetingDate = MeetingDate;
//# sourceMappingURL=MeetingDate.js.map

"use strict";

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.When = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.regexp.split");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ramda = require("ramda");

var _DateTimePicker = _interopRequireDefault(require("react-widgets/lib/DateTimePicker"));

var _DropdownList = _interopRequireDefault(require("react-widgets/lib/DropdownList"));

var _moment = _interopRequireDefault(require("moment"));

var _reactWidgetsMoment = _interopRequireDefault(require("react-widgets-moment"));

require("react-widgets/dist/css/react-widgets.css");

var _Date = _interopRequireDefault(require("../../assets/images/Date.svg"));

var _Time = _interopRequireDefault(require("../../assets/images/Time.svg"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _CheckBox = _interopRequireDefault(require("../CheckBox"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getMinutesList(MINUTE_SCALE) {
  return (0, _ramda.reduce)(function (result) {
    var index = result.length;
    var value = 60 / MINUTE_SCALE * index;
    var text = "".concat("".concat(value, "0").slice(0, 2), " m.");
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
    var text = "".concat("0".concat(value, "0").slice(-3, -1), " h.");
    return result.concat({
      value: value,
      text: text
    });
  }, [], new Array(HOUR_SCALE));
}

var minutesList = getMinutesList(_constants.MINUTE_SCALE);
var hoursList = getHoursList(_constants.HOUR_SCALE);

var Topic = function Topic(_ref) {
  var update = _ref.update,
      currentLocale = _ref.currentLocale,
      meeting = _ref.meeting,
      that = _ref.that;
  return _react["default"].createElement(_MeetingSection["default"], {
    hideTopBorderLine: true
  }, _react["default"].createElement("div", {
    className: _styles["default"].inline
  }, _react["default"].createElement("span", {
    className: _styles["default"].label
  }, _i18n["default"].getString('topic', currentLocale)), _react["default"].createElement("input", {
    ref: function ref(_ref3) {
      that.topic = _ref3;
    },
    onPaste: function onPaste(event) {
      var topic = event.target.value;
      event.preventDefault();
      event.clipboardData.items[0].getAsString(function (data) {
        var isOverLength = topic.length >= 0 && topic.length <= _constants.MAX_TOPIC_LENGTH;
        var positionStart = that.topic.selectionStart;
        var positionEnd = that.topic.selectionEnd;
        var select = positionEnd - positionStart;
        var restLength = _constants.MAX_TOPIC_LENGTH - topic.length + select;
        var isOver = isOverLength && restLength > 0;

        if (isOver) {
          var _isOverLength = restLength >= data.length;

          var insertText = _isOverLength ? data : data.slice(0, !isOver ? select : restLength);
          var value = topic.split('');
          value.splice(positionStart, select, insertText);
          that.topic.value = value.join('');
          var newPosition = positionStart + insertText.length;
          that.topic.setSelectionRange(newPosition, newPosition);
        }

        update(_objectSpread({}, meeting, {
          topic: that.topic.value
        }));
      });
    },
    type: "text",
    className: _styles["default"].input,
    defaultValue: meeting.topic || '',
    onChange: function onChange(_ref2) {
      var target = _ref2.target;
      var topic = target.value;

      if (topic.length >= 0 && topic.length <= _constants.MAX_TOPIC_LENGTH) {
        clearTimeout(that.topicSetTimeoutId);
        that.topicSetTimeoutId = setTimeout(function () {
          update(_objectSpread({}, meeting, {
            topic: topic
          }));
        }, 10);
      } else {
        target.value = meeting.topic || '';
      }
    },
    "data-sign": "scheduleMeetingTopic"
  })));
};

Topic.propTypes = {
  update: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  that: _propTypes["default"].object.isRequired
};

var When = function When(_ref4) {
  var isRecurring = _ref4.isRecurring,
      currentLocale = _ref4.currentLocale,
      meeting = _ref4.meeting,
      update = _ref4.update,
      that = _ref4.that,
      onToggle = _ref4.onToggle,
      minTime = _ref4.minTime,
      useTimePicker = _ref4.useTimePicker;

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
          update(_objectSpread({}, meeting, {
            schedule: _objectSpread({}, meeting.schedule, {
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

  return !isRecurring ? _react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('when', currentLocale)
  }, _react["default"].createElement("div", {
    className: _styles["default"].dateTimeBox
  }, _react["default"].createElement("div", {
    className: _styles["default"].list
  }, _react["default"].createElement("div", {
    className: _styles["default"].datePicker
  }, _react["default"].createElement(_DateTimePicker["default"], {
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

        update(_objectSpread({}, meeting, {
          schedule: _objectSpread({}, meeting.schedule, {
            startTime: startTime
          })
        }));
      }
    },
    onBlur: function onBlur() {
      preventDatePickerReplay(false);
    },
    onToggle: preventDatePickerReplay,
    ref: function ref(_ref5) {
      that.date = _ref5;
    },
    format: "MM/DD/YY",
    min: new Date()
  }), _react["default"].createElement("div", {
    onClick: function onClick() {
      return onToggle('date');
    },
    "data-sign": "dateText",
    className: (0, _classnames["default"])(_styles["default"].dateTimeText, _styles["default"].dateText)
  }, (0, _moment["default"])(meeting.schedule.startTime).format('MM/DD/YY'))), _react["default"].createElement("div", {
    ref: function ref(_ref6) {
      that.dateIcon = _ref6;
    },
    className: _styles["default"].dateIcon
  }, _react["default"].createElement(_Date["default"], {
    onClick: function onClick() {
      return onToggle('date');
    },
    className: _styles["default"].icon
  }))), _react["default"].createElement("div", {
    className: _styles["default"].list
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])([_styles["default"].timePicker, useTimePicker && _styles["default"].useTimePicker])
  }, _react["default"].createElement(_DateTimePicker["default"], {
    culture: currentLocale,
    date: false,
    step: 15,
    value: new Date(meeting.schedule.startTime),
    onChange: function onChange(startTime) {
      preventTimePickerReplay(false);

      if (startTime) {
        update(_objectSpread({}, meeting, {
          schedule: _objectSpread({}, meeting.schedule, {
            startTime: startTime.getTime()
          })
        }));
      }
    },
    onBlur: function onBlur() {
      preventTimePickerReplay(false);
    },
    onToggle: preventTimePickerReplay,
    ref: function ref(_ref7) {
      that.time = _ref7;
    },
    format: "hh:mm A"
  }), _react["default"].createElement("div", {
    className: _styles["default"].timeText,
    onClick: function onClick() {
      if (useTimePicker) {
        onToggle('time');
      }
    }
  }, _react["default"].createElement("input", {
    flag: "timeInput",
    disabled: useTimePicker,
    ref: function ref(_ref9) {
      that.hours = _ref9;
    },
    "data-sign": "timeInputHour",
    className: _styles["default"].timeInput,
    onChange: function onChange(_ref8) {
      var target = _ref8.target;
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
  }), _react["default"].createElement("div", {
    className: _styles["default"].colon
  }, ":"), _react["default"].createElement("input", {
    flag: "timeInput",
    disabled: useTimePicker,
    ref: function ref(_ref11) {
      that.minutes = _ref11;
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
    onChange: function onChange(_ref10) {
      var target = _ref10.target;
      that.minutes.value = target.value.replace(_constants.NO_NUMBER_REGEX, '');
    },
    onBlur: changeTime,
    maxLength: 2,
    type: "text"
  }), useTimePicker && _react["default"].createElement("div", {
    className: _styles["default"].colon
  }, (0, _moment["default"])(meeting.schedule.startTime).format('A')))), _react["default"].createElement("div", {
    ref: function ref(_ref12) {
      that.TimeIcon = _ref12;
    },
    className: _styles["default"].timeIcon
  }, _react["default"].createElement(_Time["default"], {
    onClick: function onClick() {
      if (useTimePicker) {
        onToggle('time');
      }
    },
    className: _styles["default"].icon
  }))))) : null;
};

exports.When = When;
When.propTypes = {
  update: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  isRecurring: _propTypes["default"].bool.isRequired,
  that: _propTypes["default"].object.isRequired,
  onToggle: _propTypes["default"].func.isRequired,
  minTime: _propTypes["default"].object.isRequired,
  useTimePicker: _propTypes["default"].bool.isRequired
};

var Duration = function Duration(_ref13) {
  var isRecurring = _ref13.isRecurring,
      currentLocale = _ref13.currentLocale,
      meeting = _ref13.meeting,
      update = _ref13.update;
  return !isRecurring ? _react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('duration', currentLocale)
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].duration)
  }, _react["default"].createElement("div", {
    className: _styles["default"].list
  }, _react["default"].createElement("div", {
    className: _styles["default"].hoursList
  }, _react["default"].createElement(_DropdownList["default"], {
    data: hoursList,
    valueField: "value",
    textField: "text",
    value: parseInt(meeting.schedule.durationInMinutes / 60, 10),
    onChange: function onChange(_ref14) {
      var value = _ref14.value;
      var restMinutes = meeting.schedule.durationInMinutes % 60;
      var isMax = value === hoursList.slice(-1)[0].value;
      restMinutes = isMax ? 0 : restMinutes;
      var durationInMinutes = value * 60 + restMinutes;
      update(_objectSpread({}, meeting, {
        schedule: _objectSpread({}, meeting.schedule, {
          durationInMinutes: durationInMinutes
        })
      }));
    }
  }))), _react["default"].createElement("div", {
    className: _styles["default"].list
  }, _react["default"].createElement("div", {
    className: _styles["default"].minutesList
  }, _react["default"].createElement(_DropdownList["default"], {
    data: minutesList,
    valueField: "value",
    textField: "text",
    value: meeting.schedule.durationInMinutes % 60 || 0,
    onChange: function onChange(_ref15) {
      var value = _ref15.value;
      var restHours = parseInt(meeting.schedule.durationInMinutes / 60, 10);
      var isMax = restHours === hoursList.slice(-1)[0].value;
      var minutes = isMax ? 0 : value;
      var durationInMinutes = restHours * 60 + minutes;
      update(_objectSpread({}, meeting, {
        schedule: _objectSpread({}, meeting.schedule, {
          durationInMinutes: durationInMinutes
        })
      }));
    }
  }))))) : null;
};

Duration.propTypes = {
  update: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  isRecurring: _propTypes["default"].bool.isRequired
};

var RecurringMeeting = function RecurringMeeting(_ref16) {
  var isRecurring = _ref16.isRecurring,
      currentLocale = _ref16.currentLocale,
      update = _ref16.update,
      meeting = _ref16.meeting;
  return _react["default"].createElement(_MeetingSection["default"], {
    className: _styles["default"].section
  }, _react["default"].createElement("div", {
    className: _styles["default"].RecurringMeetingDiv
  }, _react["default"].createElement("div", {
    className: _styles["default"].spaceBetween
  }, _react["default"].createElement("span", {
    className: _styles["default"].label
  }, _i18n["default"].getString('recurringMeeting', currentLocale)), _react["default"].createElement(_Switch["default"], {
    checked: isRecurring,
    onChange: function onChange(isCheckRecurring) {
      var meetingType = isCheckRecurring ? 'Recurring' : 'Scheduled';
      update(_objectSpread({}, meeting, {
        meetingType: meetingType
      }));
    },
    dataSign: "recuttingMeeting"
  })), isRecurring ? _react["default"].createElement("div", {
    className: _styles["default"].recurringDescribe
  }, _i18n["default"].getString('recurringDescribe', currentLocale)) : null));
};

RecurringMeeting.propTypes = {
  update: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  isRecurring: _propTypes["default"].bool.isRequired
};

var Video = function Video(_ref17) {
  var currentLocale = _ref17.currentLocale,
      meeting = _ref17.meeting,
      update = _ref17.update;
  return _react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('video', currentLocale),
    withSwitch: true
  }, _react["default"].createElement("div", {
    className: _styles["default"].videoDiv
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].labelLight, _styles["default"].fixTopMargin, _styles["default"].videoDescribe)
  }, _i18n["default"].getString('videoDescribe', currentLocale)), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].fixTopMargin)
  }, _react["default"].createElement("span", {
    className: _styles["default"].labelLight
  }, _i18n["default"].getString('host', currentLocale)), _react["default"].createElement(_Switch["default"], {
    checked: meeting.startHostVideo,
    onChange: function onChange(startHostVideo) {
      update(_objectSpread({}, meeting, {
        startHostVideo: startHostVideo
      }));
    },
    dataSign: "videoHostToggle"
  })), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].fixTopMargin)
  }, _react["default"].createElement("span", {
    className: _styles["default"].labelLight
  }, _i18n["default"].getString('participants', currentLocale)), _react["default"].createElement(_Switch["default"], {
    checked: meeting.startParticipantsVideo,
    onChange: function onChange(startParticipantsVideo) {
      update(_objectSpread({}, meeting, {
        startParticipantsVideo: startParticipantsVideo
      }));
    },
    dataSign: "videoParticipantToggle"
  }))));
};

Video.propTypes = {
  update: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  meeting: _propTypes["default"].object.isRequired
};

var AudioOptionsCheckbox = function AudioOptionsCheckbox(_ref18) {
  var update = _ref18.update,
      meeting = _ref18.meeting,
      data = _ref18.data;
  return _react["default"].createElement(_CheckBox["default"], {
    onSelect: function onSelect(_ref19) {
      var key = _ref19.key;
      var audioOptions = key.split('_');
      update(_objectSpread({}, meeting, {
        audioOptions: audioOptions
      }));
    },
    valueField: "key",
    textField: "text",
    selected: meeting.audioOptions.join('_'),
    data: data
  });
};

AudioOptionsCheckbox.propTypes = {
  update: _propTypes["default"].func.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  data: _propTypes["default"].array.isRequired
};

var AudioOptionsDropdown = function AudioOptionsDropdown(_ref20) {
  var update = _ref20.update,
      meeting = _ref20.meeting,
      data = _ref20.data;
  return _react["default"].createElement(_DropdownSelect["default"], {
    className: (0, _classnames["default"])(_styles["default"].dropdownSelect),
    iconClassNßame: _styles["default"].dropdownIcon,
    value: meeting.audioOptions.join('_'),
    onChange: function onChange(_ref21) {
      var key = _ref21.key;
      var audioOptions = key.split('_');
      update(_objectSpread({}, meeting, {
        audioOptions: audioOptions
      }));
    },
    options: data,
    valueFunction: function valueFunction(option) {
      return option.text;
    },
    renderValue: function renderValue(value) {
      return data.find(function (item) {
        return item.key === value;
      }).text;
    },
    renderFunction: function renderFunction(option) {
      return _react["default"].createElement("div", {
        title: option.text
      }, option.text);
    },
    dropdownAlign: "left",
    titleEnabled: true
  });
};

AudioOptionsDropdown.propTypes = {
  update: _propTypes["default"].func.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  data: _propTypes["default"].array.isRequired
};

var AudioOptions = function AudioOptions(_ref22) {
  var currentLocale = _ref22.currentLocale,
      update = _ref22.update,
      meeting = _ref22.meeting,
      data = _ref22.data,
      audioOptionToggle = _ref22.audioOptionToggle;
  var audioOptions = audioOptionToggle ? _react["default"].createElement(AudioOptionsDropdown, {
    update: update,
    meeting: meeting,
    data: data
  }) : _react["default"].createElement(AudioOptionsCheckbox, {
    update: update,
    meeting: meeting,
    data: data
  });
  return _react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('audioOptions', currentLocale),
    withSwitch: true
  }, audioOptions);
};

AudioOptions.propTypes = {
  update: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  data: _propTypes["default"].array.isRequired,
  audioOptionToggle: _propTypes["default"].bool.isRequired
};

var MeetingOptions = function MeetingOptions(_ref23) {
  var currentLocale = _ref23.currentLocale,
      meeting = _ref23.meeting,
      update = _ref23.update,
      that = _ref23.that,
      meetingOptionToggle = _ref23.meetingOptionToggle,
      passwordPlaceholderEnable = _ref23.passwordPlaceholderEnable;
  var passwordPlaceholder = passwordPlaceholderEnable ? _i18n["default"].getString('password', currentLocale) : '';
  return _react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('meetingOptions', currentLocale),
    className: _styles["default"].meetingOptions // when there is a default meeting password or `allowJoinBeforeHost` toggle opened
    // then expand the meeting option section
    ,
    toggle: meetingOptionToggle || !!meeting.password || meeting.allowJoinBeforeHost,
    withSwitch: true
  }, _react["default"].createElement("div", {
    className: _styles["default"].meetingOptionsDiv
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].fixTopMargin)
  }, _react["default"].createElement("span", {
    className: (0, _classnames["default"])(_styles["default"].labelLight, _styles["default"].defaultShrink)
  }, _i18n["default"].getString('requirePassword', currentLocale)), _react["default"].createElement(_Switch["default"], {
    checked: meeting._requireMeetingPassword || !!meeting.password,
    onChange: function onChange(_requireMeetingPassword) {
      if (_requireMeetingPassword) {
        setTimeout(function () {
          that.password.focus();
        }, 100);
      }

      update(_objectSpread({}, meeting, {
        _requireMeetingPassword: _requireMeetingPassword,
        password: ''
      }));
    },
    dataSign: "requirePasswordToggle"
  })), meeting._requireMeetingPassword || meeting.password ? _react["default"].createElement("div", {
    className: _styles["default"].passwordBox
  }, _react["default"].createElement("div", {
    className: _styles["default"].labelLight
  }, _i18n["default"].getString('password', currentLocale)), _react["default"].createElement("input", {
    type: "text",
    placeholder: passwordPlaceholder,
    className: _styles["default"].password,
    ref: function ref(_ref25) {
      that.password = _ref25;
    },
    value: meeting.password || '',
    onChange: function onChange(_ref24) {
      var target = _ref24.target;

      if (_constants.PASSWORD_REGEX.test(target.value)) {
        update(_objectSpread({}, meeting, {
          password: target.value
        }));
      }
    },
    "data-sign": "requirePasswordInput"
  })) : null, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].fixTopMargin)
  }, _react["default"].createElement("span", {
    className: (0, _classnames["default"])(_styles["default"].labelLight, _styles["default"].defaultShrink)
  }, _i18n["default"].getString('enableJoinBeforeHost', currentLocale)), _react["default"].createElement(_Switch["default"], {
    checked: meeting.allowJoinBeforeHost,
    onChange: function onChange(allowJoinBeforeHost) {
      update(_objectSpread({}, meeting, {
        allowJoinBeforeHost: allowJoinBeforeHost
      }));
    },
    dataSign: "enableJoinToggle"
  }))));
};

MeetingOptions.propTypes = {
  update: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  that: _propTypes["default"].object.isRequired,
  meetingOptionToggle: _propTypes["default"].bool.isRequired,
  passwordPlaceholderEnable: _propTypes["default"].bool.isRequired
};

var MeetingConfigs =
/*#__PURE__*/
function (_Component) {
  _inherits(MeetingConfigs, _Component);

  function MeetingConfigs() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MeetingConfigs);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MeetingConfigs)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.props.init();

    _this.state = {};

    _moment["default"].locale(_this.props.currentLocale);

    (0, _reactWidgetsMoment["default"])();
    return _this;
  }

  _createClass(MeetingConfigs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.displayFormat();
      });
    }
  }, {
    key: "displayFormat",
    value: function displayFormat() {
      var isAMPM = this.props.useTimePicker ? 'hh' : 'HH';

      if (this.hours) {
        this.hours.value = (0, _moment["default"])(this.props.meeting.schedule.startTime).format(isAMPM);
      }

      if (this.minutes) {
        this.minutes.value = (0, _moment["default"])(this.props.meeting.schedule.startTime).format('mm');
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (this.props.meeting.topic !== nextProps.meeting.topic) {
        setTimeout(function () {
          if (!_this3.topic) return;
          var selectionStart = _this3.topic.selectionStart;
          var selectionEnd = _this3.topic.selectionEnd;
          _this3.topic.value = nextProps.meeting.topic;

          _this3.topic.setSelectionRange(selectionStart, selectionEnd);
        });
      }

      if (this.props.meeting.schedule && this.props.meeting.schedule.startTime !== nextProps.meeting.schedule.startTime) {
        var isAMPM = this.props.useTimePicker ? 'hh' : 'HH';

        if (this.hours) {
          this.hours.value = (0, _moment["default"])(nextProps.meeting.schedule.startTime).format(isAMPM);
        }

        if (this.minutes) {
          this.minutes.value = (0, _moment["default"])(nextProps.meeting.schedule.startTime).format('mm');
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          update = _this$props.update,
          meeting = _this$props.meeting,
          currentLocale = _this$props.currentLocale,
          recipientsSection = _this$props.recipientsSection,
          showWhen = _this$props.showWhen,
          showDuration = _this$props.showDuration,
          showRecurringMeeting = _this$props.showRecurringMeeting,
          meetingOptionToggle = _this$props.meetingOptionToggle,
          passwordPlaceholderEnable = _this$props.passwordPlaceholderEnable,
          audioOptionToggle = _this$props.audioOptionToggle,
          useTimePicker = _this$props.useTimePicker;

      if (!Object.keys(meeting).length) {
        return null;
      }

      var onToggle = function onToggle(type) {
        var isToggle = !_this4["".concat(type, "Blur")];

        if (isToggle) {
          if (_this4[type]._values.open) {
            _this4[type].inner.close();
          } else {
            _this4[type].focus();

            _this4[type].inner.toggle();
          }
        }
      };

      var isRecurring = meeting.meetingType === 'Recurring';

      var telephonyOnly = _i18n["default"].getString('telephonyOnly', currentLocale);

      var voIPOnly = _i18n["default"].getString('voIPOnly', currentLocale);

      var both = _i18n["default"].getString('both', currentLocale);

      var AUDIO_OPTIONS = [{
        key: 'Phone',
        text: telephonyOnly
      }, {
        key: 'ComputerAudio',
        text: voIPOnly
      }, {
        key: 'Phone_ComputerAudio',
        text: both
      }];
      var minTime = {};

      if (meeting.schedule && meeting.schedule.startTime && new Date(meeting.schedule.startTime) < +new Date()) {
        minTime = {
          min: new Date()
        };
      }

      return _react["default"].createElement("div", {
        className: _styles["default"].scroll
      }, _react["default"].createElement(Topic, {
        that: this,
        meeting: meeting,
        update: update,
        currentLocale: currentLocale
      }), recipientsSection, showWhen ? _react["default"].createElement(When, {
        isRecurring: isRecurring,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update,
        that: this,
        onToggle: onToggle,
        minTime: minTime,
        useTimePicker: useTimePicker
      }) : null, showDuration ? _react["default"].createElement(Duration, {
        isRecurring: isRecurring,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update
      }) : null, showRecurringMeeting ? _react["default"].createElement(RecurringMeeting, {
        isRecurring: isRecurring,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update
      }) : null, _react["default"].createElement(Video, {
        currentLocale: currentLocale,
        meeting: meeting,
        update: update
      }), _react["default"].createElement(AudioOptions, {
        data: AUDIO_OPTIONS,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update,
        audioOptionToggle: audioOptionToggle
      }), _react["default"].createElement(MeetingOptions, {
        currentLocale: currentLocale,
        meeting: meeting,
        that: this,
        update: update,
        meetingOptionToggle: meetingOptionToggle,
        passwordPlaceholderEnable: passwordPlaceholderEnable
      }));
    }
  }]);

  return MeetingConfigs;
}(_react.Component);

MeetingConfigs.propTypes = {
  update: _propTypes["default"].func.isRequired,
  init: _propTypes["default"].func.isRequired,
  meeting: _propTypes["default"].object.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  recipientsSection: _propTypes["default"].node,
  showWhen: _propTypes["default"].bool,
  showDuration: _propTypes["default"].bool,
  showRecurringMeeting: _propTypes["default"].bool,
  meetingOptionToggle: _propTypes["default"].bool,
  passwordPlaceholderEnable: _propTypes["default"].bool,
  audioOptionToggle: _propTypes["default"].bool,
  useTimePicker: _propTypes["default"].bool
};
MeetingConfigs.defaultProps = {
  recipientsSection: undefined,
  showWhen: true,
  showDuration: true,
  showRecurringMeeting: true,
  meetingOptionToggle: false,
  passwordPlaceholderEnable: false,
  audioOptionToggle: false,
  useTimePicker: false
};
var _default = MeetingConfigs;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

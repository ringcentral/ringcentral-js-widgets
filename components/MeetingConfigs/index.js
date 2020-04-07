"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("react-widgets/dist/css/react-widgets.css");

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _reactWidgetsMoment = _interopRequireDefault(require("react-widgets-moment"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _MeetingDuration = require("./MeetingDuration");

var _MeetingOptions = require("./MeetingOptions");

var _RecurringOptions = require("./RecurringOptions");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _MeetingTopic = require("./MeetingTopic");

var _VideoAudioOptions = require("./VideoAudioOptions");

var _MeetingDate = require("./MeetingDate");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MeetingConfig =
/*#__PURE__*/
function (_Component) {
  _inherits(MeetingConfig, _Component);

  function MeetingConfig() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MeetingConfig);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MeetingConfig)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.props.init();

    _this.state = {};

    _moment["default"].locale(_this.props.currentLocale);

    (0, _reactWidgetsMoment["default"])();
    return _this;
  }

  _createClass(MeetingConfig, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.displayFormat(_this2.props.meeting.schedule.startTime);
      });
    }
  }, {
    key: "displayFormat",
    value: function displayFormat(startTime) {
      var isAMPM = this.props.useTimePicker ? 'hh' : 'HH';

      if (this.hours) {
        this.hours.value = (0, _moment["default"])(startTime).format(isAMPM);
      }

      if (this.minutes) {
        this.minutes.value = (0, _moment["default"])(startTime).format('mm');
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

      if (this.props.meeting.schedule && nextProps.meeting.schedule && this.props.meeting.schedule.startTime !== nextProps.meeting.schedule.startTime) {
        this.displayFormat(nextProps.meeting.schedule.startTime);
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

      var isRecurring = meeting.meetingType === 'Recurring' || meeting.meetingType === 'ScheduledRecurring';

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
      }, _react["default"].createElement(_MeetingTopic.Topic, {
        that: this,
        meeting: meeting,
        update: update,
        currentLocale: currentLocale
      }), recipientsSection, showWhen ? _react["default"].createElement(_MeetingDate.MeetingDate, {
        isRecurring: isRecurring,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update,
        that: this,
        onToggle: onToggle,
        minTime: minTime,
        useTimePicker: useTimePicker
      }) : null, showDuration ? _react["default"].createElement(_MeetingDuration.MeetingDuration, {
        isRecurring: isRecurring,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update
      }) : null, showRecurringMeeting ? _react["default"].createElement(_RecurringOptions.RecurringOptions, {
        isRecurring: isRecurring,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update
      }) : null, _react["default"].createElement(_VideoAudioOptions.Video, {
        currentLocale: currentLocale,
        meeting: meeting,
        update: update
      }), _react["default"].createElement(_VideoAudioOptions.AudioOptions, {
        data: AUDIO_OPTIONS,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update,
        audioOptionToggle: audioOptionToggle
      }), _react["default"].createElement(_MeetingOptions.MeetingOptions, {
        currentLocale: currentLocale,
        meeting: meeting,
        that: this,
        update: update,
        meetingOptionToggle: meetingOptionToggle,
        passwordPlaceholderEnable: passwordPlaceholderEnable
      }));
    }
  }]);

  return MeetingConfig;
}(_react.Component);

MeetingConfig.defaultProps = {
  recipientsSection: undefined,
  showWhen: true,
  showDuration: true,
  showRecurringMeeting: true,
  meetingOptionToggle: false,
  passwordPlaceholderEnable: false,
  audioOptionToggle: false,
  useTimePicker: false
};
var _default = MeetingConfig;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

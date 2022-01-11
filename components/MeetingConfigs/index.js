"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("react-widgets/dist/css/react-widgets.css");

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _reactWidgetsMoment = _interopRequireDefault(require("react-widgets-moment"));

var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");

var _i18n = _interopRequireDefault(require("./i18n"));

var _MeetingDate = require("./MeetingDate");

var _MeetingDuration = require("./MeetingDuration");

var _MeetingIdSection = require("./MeetingIdSection");

var _MeetingOptions = require("./MeetingOptions");

var _MeetingTopic = require("./MeetingTopic");

var _RecurringOptions = require("./RecurringOptions");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _VideoAudioOptions = require("./VideoAudioOptions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MeetingConfig = /*#__PURE__*/function (_Component) {
  _inherits(MeetingConfig, _Component);

  var _super = _createSuper(MeetingConfig);

  function MeetingConfig(args) {
    var _this;

    _classCallCheck(this, MeetingConfig);

    _this = _super.call(this, args);
    _this.hours = void 0;
    _this.minutes = void 0;
    _this.topic = void 0;

    _this.handlePmiConfirmed = function (isChangePmiConfirmed) {
      _this.setState({
        isChangePmiConfirmed: isChangePmiConfirmed
      });
    };

    var _this$props = _this.props,
        init = _this$props.init,
        currentLocale = _this$props.currentLocale;
    init();
    _this.state = {
      isChangePmiConfirmed: false
    };

    _moment["default"].locale(currentLocale);

    (0, _reactWidgetsMoment["default"])();
    return _this;
  }

  _createClass(MeetingConfig, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props2 = this.props,
          meeting = _this$props2.meeting,
          showWhen = _this$props2.showWhen;
      setTimeout(function () {
        if (showWhen) {
          _this2.displayFormat(meeting.schedule.startTime);
        }
      });
    }
  }, {
    key: "displayFormat",
    value: function displayFormat(startTime) {
      var useTimePicker = this.props.useTimePicker;
      var isAMPM = useTimePicker ? 'hh' : 'HH';

      if (this.hours) {
        this.hours.value = (0, _moment["default"])(startTime).format(isAMPM);
      }

      if (this.minutes) {
        this.minutes.value = (0, _moment["default"])(startTime).format('mm');
      }
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var meeting = this.props.meeting;

      if (meeting.topic !== nextProps.meeting.topic) {
        setTimeout(function () {
          if (!_this3.topic) return;
          var selectionStart = _this3.topic.selectionStart;
          var selectionEnd = _this3.topic.selectionEnd;
          _this3.topic.value = nextProps.meeting.topic;

          _this3.topic.setSelectionRange(selectionStart, selectionEnd);
        });
      }

      if (meeting.schedule && nextProps.meeting.schedule && meeting.schedule.startTime !== nextProps.meeting.schedule.startTime) {
        this.displayFormat(nextProps.meeting.schedule.startTime);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var isChangePmiConfirmed = this.state.isChangePmiConfirmed;
      var _this$props3 = this.props,
          update = _this$props3.update,
          meeting = _this$props3.meeting,
          currentLocale = _this$props3.currentLocale,
          recipientsSection = _this$props3.recipientsSection,
          showTopic = _this$props3.showTopic,
          showWhen = _this$props3.showWhen,
          showDuration = _this$props3.showDuration,
          showRecurringMeeting = _this$props3.showRecurringMeeting,
          meetingOptionToggle = _this$props3.meetingOptionToggle,
          passwordPlaceholderEnable = _this$props3.passwordPlaceholderEnable,
          audioOptionToggle = _this$props3.audioOptionToggle,
          useTimePicker = _this$props3.useTimePicker,
          enablePersonalMeeting = _this$props3.enablePersonalMeeting,
          personalMeetingId = _this$props3.personalMeetingId,
          switchUsePersonalMeetingId = _this$props3.switchUsePersonalMeetingId;
      var isOptionDisabled = meeting.usePersonalMeetingId && !isChangePmiConfirmed;

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

      var isRecurring = (0, _Meeting.isRecurringMeeting)(meeting.meetingType);

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

      if (meeting.schedule && meeting.schedule.startTime && +new Date(meeting.schedule.startTime) < +new Date()) {
        minTime = {
          min: new Date()
        };
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].scroll,
        "data-sign": "meetingConfigsPanel"
      }, showTopic ? /*#__PURE__*/_react["default"].createElement(_MeetingTopic.Topic, {
        that: this,
        meeting: meeting,
        update: update,
        currentLocale: currentLocale
      }) : null, enablePersonalMeeting && /*#__PURE__*/_react["default"].createElement(_MeetingIdSection.MeetingIdSection, {
        personalMeetingId: personalMeetingId,
        currentLocale: currentLocale,
        meeting: meeting,
        switchUsePersonalMeetingId: switchUsePersonalMeetingId,
        handlePmiConfirmed: this.handlePmiConfirmed,
        isChangePmiConfirmed: isChangePmiConfirmed
      }), recipientsSection, showWhen ? /*#__PURE__*/_react["default"].createElement(_MeetingDate.MeetingDate, {
        isRecurring: isRecurring,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update,
        that: this,
        onToggle: onToggle,
        minTime: minTime,
        useTimePicker: useTimePicker
      }) : null, showDuration ? /*#__PURE__*/_react["default"].createElement(_MeetingDuration.MeetingDuration, {
        isRecurring: isRecurring,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update
      }) : null, showRecurringMeeting ? /*#__PURE__*/_react["default"].createElement(_RecurringOptions.RecurringOptions, {
        isRecurring: isRecurring,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update
      }) : null, /*#__PURE__*/_react["default"].createElement(_VideoAudioOptions.Video, {
        currentLocale: currentLocale,
        meeting: meeting,
        update: update,
        disabled: isOptionDisabled
      }), /*#__PURE__*/_react["default"].createElement(_VideoAudioOptions.AudioOptions, {
        data: AUDIO_OPTIONS,
        currentLocale: currentLocale,
        meeting: meeting,
        update: update,
        audioOptionToggle: audioOptionToggle,
        disabled: isOptionDisabled
      }), /*#__PURE__*/_react["default"].createElement(_MeetingOptions.MeetingOptions, {
        currentLocale: currentLocale,
        meeting: meeting,
        that: this,
        update: update,
        meetingOptionToggle: meetingOptionToggle,
        passwordPlaceholderEnable: passwordPlaceholderEnable,
        disabled: isOptionDisabled
      }));
    }
  }]);

  return MeetingConfig;
}(_react.Component);

MeetingConfig.defaultProps = {
  recipientsSection: undefined,
  showTopic: true,
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

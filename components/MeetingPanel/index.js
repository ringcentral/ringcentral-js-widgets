"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

require("react-widgets/dist/css/react-widgets.css");

var _react = _interopRequireDefault(require("react"));

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _isSafari = _interopRequireDefault(require("../../lib/isSafari"));

var _MeetingConfigs = _interopRequireDefault(require("../MeetingConfigs"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MeetingPanel = function MeetingPanel(props) {
  var update = props.update,
      meeting = props.meeting,
      hidden = props.hidden,
      disabled = props.disabled,
      invite = props.invite,
      currentLocale = props.currentLocale,
      ScheduleButton = props.scheduleButton,
      recipientsSection = props.recipientsSection,
      showWhen = props.showWhen,
      showDuration = props.showDuration,
      showRecurringMeeting = props.showRecurringMeeting,
      openNewWindow = props.openNewWindow,
      meetingOptionToggle = props.meetingOptionToggle,
      passwordPlaceholderEnable = props.passwordPlaceholderEnable,
      audioOptionToggle = props.audioOptionToggle,
      onOK = props.onOK,
      init = props.init,
      showSaveAsDefault = props.showSaveAsDefault,
      launchMeeting = props.launchMeeting;
  return _react["default"].createElement("div", {
    className: _styles["default"].meetingPanel
  }, !hidden ? _react["default"].createElement(_MeetingConfigs["default"], {
    update: update,
    init: init,
    meeting: meeting,
    disabled: disabled,
    currentLocale: currentLocale,
    recipientsSection: recipientsSection,
    showWhen: showWhen,
    showDuration: showDuration,
    showRecurringMeeting: showRecurringMeeting,
    openNewWindow: openNewWindow,
    meetingOptionToggle: meetingOptionToggle,
    passwordPlaceholderEnable: passwordPlaceholderEnable,
    audioOptionToggle: audioOptionToggle
  }) : null, ScheduleButton && _react["default"].createElement(ScheduleButton, {
    currentLocale: currentLocale,
    hidden: hidden,
    disabled: disabled,
    meeting: meeting,
    onOK: onOK,
    onClick: function _callee() {
      var opener;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (disabled) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap((0, _sleep["default"])(100));

            case 3:
              /**
               * HACK: for safari, we can only open new tab within click event callback's synchronous call stack
               * so we have to couple the UI with logic in here:(
               * https://stackoverflow.com/a/24327319
               */
              opener = openNewWindow && (0, _isSafari["default"])() ? window.open() : null;
              _context.next = 6;
              return regeneratorRuntime.awrap(invite(meeting, opener));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    update: update,
    showSaveAsDefault: showSaveAsDefault,
    launchMeeting: launchMeeting
  }));
};

MeetingPanel.defaultProps = {
  invite: function invite() {},
  recipientsSection: undefined,
  disabled: false,
  hidden: false,
  showWhen: true,
  showDuration: true,
  showRecurringMeeting: true,
  openNewWindow: true,
  meetingOptionToggle: false,
  passwordPlaceholderEnable: false,
  audioOptionToggle: false,
  onOK: undefined,
  scheduleButton: undefined,
  showSaveAsDefault: false,
  launchMeeting: undefined
};
var _default = MeetingPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

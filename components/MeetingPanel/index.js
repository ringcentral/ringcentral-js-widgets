"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
require("react-widgets/dist/css/react-widgets.css");
var _react = _interopRequireDefault(require("react"));
var _utils = require("@ringcentral-integration/commons/utils");
var _utils2 = require("@ringcentral-integration/utils");
var _MeetingConfigs = _interopRequireDefault(require("../MeetingConfigs"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    disableSaveAsDefault = props.disableSaveAsDefault,
    launchMeeting = props.launchMeeting,
    enablePersonalMeeting = props.enablePersonalMeeting,
    personalMeetingId = props.personalMeetingId,
    switchUsePersonalMeetingId = props.switchUsePersonalMeetingId;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingPanel
  }, !hidden ? /*#__PURE__*/_react["default"].createElement(_MeetingConfigs["default"], {
    update: update,
    init: init,
    meeting: meeting
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    disabled: disabled,
    currentLocale: currentLocale,
    recipientsSection: recipientsSection,
    showWhen: showWhen,
    showDuration: showDuration,
    showRecurringMeeting: showRecurringMeeting,
    meetingOptionToggle: meetingOptionToggle,
    passwordPlaceholderEnable: passwordPlaceholderEnable,
    audioOptionToggle: audioOptionToggle
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    enablePersonalMeeting: enablePersonalMeeting,
    personalMeetingId: personalMeetingId,
    switchUsePersonalMeetingId: switchUsePersonalMeetingId
  }) : null, ScheduleButton && /*#__PURE__*/_react["default"].createElement(ScheduleButton, {
    currentLocale: currentLocale
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    hidden: hidden
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    disabled: disabled,
    meeting: meeting
    // @ts-expect-error TS(2322): Type '(() => any) | undefined' is not assignable t... Remove this comment to see the full error message
    ,
    onOK: onOK,
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var opener;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (disabled) {
                _context.next = 6;
                break;
              }
              _context.next = 3;
              return (0, _utils.sleep)(100);
            case 3:
              /**
               * HACK: for safari, we can only open new tab within click event callback's synchronous call stack
               * so we have to couple the UI with logic in here:(
               * https://stackoverflow.com/a/24327319
               */
              opener = openNewWindow && (0, _utils2.isSafari)() ? window.open() : null; // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              _context.next = 6;
              return invite(meeting, opener);
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    update: update
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    showSaveAsDefault: showSaveAsDefault
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    disableSaveAsDefault: disableSaveAsDefault,
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
  enablePersonalMeeting: false,
  showSaveAsDefault: false,
  disableSaveAsDefault: false,
  launchMeeting: undefined
};
var _default = MeetingPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

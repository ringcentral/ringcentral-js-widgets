'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _MeetingPanel = require('../../components/MeetingPanel');

var _MeetingPanel2 = _interopRequireDefault(_MeetingPanel);

var _phoneContext = require('../../lib/phoneContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      meeting = _ref$phone.meeting,
      locale = _ref$phone.locale,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === undefined ? false : _ref$disabled,
      showWhen = _ref.showWhen,
      showDuration = _ref.showDuration,
      showRecurringMeeting = _ref.showRecurringMeeting,
      showLaunchMeeting = _ref.showLaunchMeeting;

  return {
    meeting: meeting.meeting || {},
    currentLocale: locale.currentLocale,
    disabled: meeting.isScheduling || disabled,
    showWhen: showWhen,
    showDuration: showDuration,
    showRecurringMeeting: showRecurringMeeting,
    showLaunchMeeting: showLaunchMeeting
  };
}

function mapToFunctions(_, _ref2) {
  var schedule = _ref2.schedule,
      meeting = _ref2.phone.meeting;

  return {
    update: function update(meetingState) {
      return meeting.update(meetingState);
    },
    invite: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(meetingInfo, opener) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!schedule) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return schedule(meetingInfo, opener);

              case 3:
                return _context.abrupt('return');

              case 4:
                _context.next = 6;
                return meeting.schedule(meetingInfo, {}, opener);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function invite(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return invite;
    }(),

    init: function init() {
      return meeting.init();
    }
  };
}

var MeetingPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_MeetingPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = MeetingPage;
//# sourceMappingURL=index.js.map

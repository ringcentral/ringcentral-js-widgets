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

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      meeting = _ref$phone.meeting,
      locale = _ref$phone.locale;

  return {
    meeting: meeting.meeting || {},
    currentLocale: locale.currentLocale,
    disabled: meeting.isScheduling || false
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var afterScheduled = _ref2.afterScheduled,
      meeting = _ref2.phone.meeting;

  return {
    update: function update(meetingState) {
      return meeting.update(meetingState);
    },
    invite: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(meetingState) {
        var meetingInfo;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return meeting.schedule(meetingState);

              case 2:
                meetingInfo = _context.sent;

                if (afterScheduled) afterScheduled(meetingInfo);
                // initialize meeting after last one created
                meeting.init();

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function invite(_x) {
        return _ref3.apply(this, arguments);
      };
    }(),
    init: function init() {
      return meeting.init();
    }
  };
}

var MeetingPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_MeetingPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = MeetingPage;
//# sourceMappingURL=index.js.map

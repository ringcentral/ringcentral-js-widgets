"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _MeetingPanel = _interopRequireDefault(require("../../components/MeetingPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      meeting = _ref$phone.meeting,
      locale = _ref$phone.locale,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      rateLimiter = _ref$phone.rateLimiter,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      showWhen = _ref.showWhen,
      showDuration = _ref.showDuration,
      showRecurringMeeting = _ref.showRecurringMeeting,
      _ref$openNewWindow = _ref.openNewWindow,
      openNewWindow = _ref$openNewWindow === void 0 ? true : _ref$openNewWindow;
  return {
    meeting: meeting.meeting || {},
    currentLocale: locale.currentLocale,
    disabled: meeting.isScheduling || disabled || !connectivityMonitor.connectivity || rateLimiter && rateLimiter.throttling,
    showWhen: showWhen,
    showDuration: showDuration,
    showRecurringMeeting: showRecurringMeeting,
    openNewWindow: openNewWindow
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
      var _invite = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(meetingInfo, opener) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
                return _context.abrupt("return");

              case 4:
                _context.next = 6;
                return meeting.schedule(meetingInfo, {}, opener);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function invite(_x, _x2) {
        return _invite.apply(this, arguments);
      }

      return invite;
    }(),
    init: function init() {
      return meeting.init();
    }
  };
}

var MeetingPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_MeetingPanel["default"]));
exports["default"] = MeetingPage;
//# sourceMappingURL=index.js.map

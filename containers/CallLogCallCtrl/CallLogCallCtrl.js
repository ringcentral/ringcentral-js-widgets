"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _react = _interopRequireDefault(require("react"));

var _CallLogCallCtrlComponent = _interopRequireDefault(require("../../components/CallLogCallCtrlComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallLogCallCtrl = function CallLogCallCtrl(props) {
  var currentLocale = props.currentLocale,
      telephonySessionId = props.telephonySessionId,
      disableLinks = props.disableLinks,
      isWide = props.isWide,
      currentSession = props.currentSession;

  if (!currentSession) {
    return null;
  }

  return _react["default"].createElement(_CallLogCallCtrlComponent["default"], {
    onMute: function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", props.mute(telephonySessionId));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    onUnmute: function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", props.unmute(telephonySessionId));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    onHangup: function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", props.hangUp(telephonySessionId));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    onReject: function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", props.reject(telephonySessionId));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    onTransfer: function onTransfer() {
      return props.onTransfer(telephonySessionId);
    },
    onHold: function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", props.onHold(telephonySessionId));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    onUnHold: function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", props.onUnHold(telephonySessionId));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    isOnMute: currentSession.isOnMute,
    isOnHold: currentSession.isOnHold,
    callStatus: currentSession.callStatus,
    callDirection: currentSession.direction,
    currentLocale: currentLocale,
    disableLinks: disableLinks,
    isWide: isWide
  });
};

CallLogCallCtrl.defaultProps = {
  currentLocale: 'en-US',
  currentSession: undefined,
  telephonySessionId: '',
  status: '',
  disableLinks: false,
  isWide: true
};
var _default = CallLogCallCtrl;
exports["default"] = _default;
//# sourceMappingURL=CallLogCallCtrl.js.map

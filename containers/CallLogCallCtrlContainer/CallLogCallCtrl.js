"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogCallCtrl = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _react = _interopRequireDefault(require("react"));

var _CallLogCallCtrlComponent = _interopRequireDefault(require("../../components/CallLogCallCtrlComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var CallLogCallCtrl = function CallLogCallCtrl(props) {
  var currentLocale = props.currentLocale,
      telephonySessionId = props.telephonySessionId,
      disableLinks = props.disableLinks,
      isWide = props.isWide,
      currentSession = props.currentSession,
      transferRef = props.transferRef,
      isOnTransfer = props.isOnTransfer,
      isCurrentDeviceCall = props.isCurrentDeviceCall,
      isWebphone = props.isWebphone,
      sendDTMF = props.sendDTMF;

  if (!currentSession) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(_CallLogCallCtrlComponent["default"], {
    onMute: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", props.mute(telephonySessionId));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    onUnmute: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", props.unmute(telephonySessionId));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })),
    onHangup: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", props.hangUp(telephonySessionId));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })),
    onReject: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", props.reject(telephonySessionId));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })),
    onTransfer: function onTransfer() {
      return props.onTransfer(telephonySessionId);
    },
    onHold: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", props.onHold(telephonySessionId));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })),
    onUnHold: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", props.onUnHold(telephonySessionId));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })),
    startRecord: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", props.startRecord(telephonySessionId));

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })),
    stopRecord: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", props.stopRecord(telephonySessionId));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })),
    isOnMute: currentSession.isOnMute,
    isOnHold: currentSession.isOnHold,
    callStatus: currentSession.callStatus,
    callDirection: currentSession.direction,
    recordStatus: currentSession.recordStatus,
    currentLocale: currentLocale,
    disableLinks: disableLinks,
    isWide: isWide,
    transferRef: transferRef,
    isOnTransfer: isOnTransfer,
    isWebphone: isWebphone,
    isCurrentDeviceCall: isCurrentDeviceCall,
    sendDTMF: /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(dtmfValue) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", sendDTMF(dtmfValue, telephonySessionId));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x) {
        return _ref9.apply(this, arguments);
      };
    }()
  });
};

exports.CallLogCallCtrl = CallLogCallCtrl;
CallLogCallCtrl.defaultProps = {
  currentLocale: 'en-US',
  currentSession: undefined,
  telephonySessionId: '',
  disableLinks: false,
  isWide: true,
  transferRef: undefined,
  isOnTransfer: false
};
//# sourceMappingURL=CallLogCallCtrl.js.map

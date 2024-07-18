"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogCallCtrlPanel = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireDefault(require("react"));
var _CallLogCallCtrlComponent = _interopRequireDefault(require("../CallLogCallCtrlComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var CallLogCallCtrlPanel = function CallLogCallCtrlPanel(props) {
  var currentLocale = props.currentLocale,
    telephonySessionId = props.telephonySessionId,
    disableLinks = props.disableLinks,
    isWide = props.isWide,
    _props$enableReply = props.enableReply,
    enableReply = _props$enableReply === void 0 ? false : _props$enableReply,
    currentSession = props.currentSession,
    transferRef = props.transferRef,
    isOnTransfer = props.isOnTransfer,
    isCurrentDeviceCall = props.isCurrentDeviceCall,
    sendDTMF = props.sendDTMF,
    forward = props.forward,
    reply = props.reply,
    answer = props.answer,
    ignore = props.ignore,
    forwardingNumbers = props.forwardingNumbers,
    otherActiveCalls = props.otherActiveCalls,
    answerAndHold = props.answerAndHold,
    answerAndEnd = props.answerAndEnd,
    realOutboundCallStatus = props.realOutboundCallStatus,
    dialpadToggleTrack = props.dialpadToggleTrack,
    clickForwardTrack = props.clickForwardTrack,
    warmTransferActiveTelephonySessionId = props.warmTransferActiveTelephonySessionId,
    allowPickupCall = props.allowPickupCall,
    showConferenceCall = props.showConferenceCall,
    isCurrentCall = props.isCurrentCall,
    onMergeCall = props.onMergeCall;
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
    onAddCall: function onAddCall() {
      return props.onAddCall();
    },
    onCompleteWarmTransfer: function onCompleteWarmTransfer() {
      return props.onCompleteWarmTransfer(telephonySessionId);
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
    isCurrentDeviceCall: isCurrentDeviceCall,
    sendDTMF: ( /*#__PURE__*/function () {
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
    }()),
    forward: ( /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(phoneNumber) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", forward(phoneNumber, telephonySessionId));
              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));
      return function (_x2) {
        return _ref10.apply(this, arguments);
      };
    }()),
    answer: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", answer(telephonySessionId));
            case 1:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })),
    forwardingNumbers: forwardingNumbers,
    ignore: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", ignore(telephonySessionId));
            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })),
    reply: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", reply(telephonySessionId));
            case 1:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })),
    otherActiveCalls: otherActiveCalls,
    answerAndHold: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return answerAndHold(telephonySessionId);
            case 2:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })),
    answerAndEnd: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return answerAndEnd(telephonySessionId);
            case 2:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })),
    realOutboundCallStatus: realOutboundCallStatus,
    dialpadToggleTrack: dialpadToggleTrack,
    clickForwardTrack: clickForwardTrack,
    warmTransferActiveTelephonySessionId: warmTransferActiveTelephonySessionId,
    enableReply: enableReply,
    allowPickupCall: allowPickupCall,
    showConferenceCall: showConferenceCall,
    isCurrentCall: isCurrentCall,
    onMergeCall: onMergeCall
  });
};
exports.CallLogCallCtrlPanel = CallLogCallCtrlPanel;
CallLogCallCtrlPanel.defaultProps = {
  currentLocale: 'en-US',
  currentSession: undefined,
  telephonySessionId: '',
  disableLinks: false,
  isWide: true,
  transferRef: undefined,
  isOnTransfer: false,
  realOutboundCallStatus: '',
  enableReply: false
};
//# sourceMappingURL=CallLogCallCtrlPanel.js.map

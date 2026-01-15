"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogCallCtrlPanel = void 0;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireDefault(require("react"));
var _CallLogCallCtrlComponent = _interopRequireDefault(require("../CallLogCallCtrlComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var CallLogCallCtrlPanel = exports.CallLogCallCtrlPanel = function CallLogCallCtrlPanel(props) {
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
    onMergeCall = props.onMergeCall,
    isCallQueueCall = props.isCallQueueCall;
  if (!currentSession) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(_CallLogCallCtrlComponent["default"], {
    onMute: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            return _context.a(2, props.mute(telephonySessionId));
        }
      }, _callee);
    })),
    onUnmute: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            return _context2.a(2, props.unmute(telephonySessionId));
        }
      }, _callee2);
    })),
    onHangup: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            return _context3.a(2, props.hangUp(telephonySessionId));
        }
      }, _callee3);
    })),
    onReject: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            return _context4.a(2, props.reject(telephonySessionId));
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
    onHold: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            return _context5.a(2, props.onHold(telephonySessionId));
        }
      }, _callee5);
    })),
    onUnHold: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            return _context6.a(2, props.onUnHold(telephonySessionId));
        }
      }, _callee6);
    })),
    startRecord: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            return _context7.a(2, props.startRecord(telephonySessionId));
        }
      }, _callee7);
    })),
    stopRecord: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            return _context8.a(2, props.stopRecord(telephonySessionId));
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
    sendDTMF: (/*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(dtmfValue) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              return _context9.a(2, sendDTMF(dtmfValue, telephonySessionId));
          }
        }, _callee9);
      }));
      return function (_x) {
        return _ref9.apply(this, arguments);
      };
    }()),
    forward: (/*#__PURE__*/function () {
      var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(phoneNumber) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              return _context0.a(2, forward(phoneNumber, telephonySessionId));
          }
        }, _callee0);
      }));
      return function (_x2) {
        return _ref0.apply(this, arguments);
      };
    }()),
    answer: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            return _context1.a(2, answer(telephonySessionId));
        }
      }, _callee1);
    })),
    forwardingNumbers: forwardingNumbers,
    ignore: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            return _context10.a(2, ignore(telephonySessionId));
        }
      }, _callee10);
    })),
    reply: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.n) {
          case 0:
            return _context11.a(2, reply(telephonySessionId));
        }
      }, _callee11);
    })),
    otherActiveCalls: otherActiveCalls,
    answerAndHold: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.n) {
          case 0:
            _context12.n = 1;
            return answerAndHold(telephonySessionId);
          case 1:
            return _context12.a(2);
        }
      }, _callee12);
    })),
    answerAndEnd: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.n) {
          case 0:
            _context13.n = 1;
            return answerAndEnd(telephonySessionId);
          case 1:
            return _context13.a(2);
        }
      }, _callee13);
    })),
    realOutboundCallStatus: realOutboundCallStatus,
    dialpadToggleTrack: dialpadToggleTrack,
    clickForwardTrack: clickForwardTrack,
    warmTransferActiveTelephonySessionId: warmTransferActiveTelephonySessionId,
    enableReply: enableReply,
    allowPickupCall: allowPickupCall,
    showConferenceCall: showConferenceCall,
    isCurrentCall: isCurrentCall,
    onMergeCall: onMergeCall,
    isCallQueueCall: isCallQueueCall
  });
};
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

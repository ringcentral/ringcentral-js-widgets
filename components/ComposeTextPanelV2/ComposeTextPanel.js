"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeTextPanel = void 0;
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.object.to-string.js");
var _react = _interopRequireDefault(require("react"));
var _CommunicationSetupPanel = require("../CommunicationSetupPanel");
var _NoSenderAlert = _interopRequireDefault(require("../ComposeTextPanel/NoSenderAlert"));
var _MessageInput = _interopRequireDefault(require("../MessageInput"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // TODO: Re implement this component by function component
var ComposeTextPanel = exports.ComposeTextPanel = function ComposeTextPanel(_ref) {
  var showSpinner = _ref.showSpinner,
    currentLocale = _ref.currentLocale,
    brand = _ref.brand,
    outboundSMS = _ref.outboundSMS,
    messageText = _ref.messageText,
    updateMessageText = _ref.updateMessageText,
    sendButtonDisabled = _ref.sendButtonDisabled,
    send = _ref.send,
    inputExpandable = _ref.inputExpandable,
    attachments = _ref.attachments,
    supportAttachment = _ref.supportAttachment,
    supportEmoji = _ref.supportEmoji,
    removeAttachment = _ref.removeAttachment,
    addAttachments = _ref.addAttachments,
    typingToNumber = _ref.typingToNumber,
    updateTypingToNumber = _ref.updateTypingToNumber,
    addToNumber = _ref.addToNumber,
    autoFocus = _ref.autoFocus,
    toNumbers = _ref.toNumbers,
    senderNumber = _ref.senderNumber,
    senderNumbers = _ref.senderNumbers,
    hintInfo = _ref.hintInfo,
    formatPhone = _ref.formatPhone,
    updateSenderNumber = _ref.updateSenderNumber,
    cleanTypingToNumber = _ref.cleanTypingToNumber,
    removeToNumber = _ref.removeToNumber,
    detectPhoneNumbers = _ref.detectPhoneNumbers,
    contactSearch = _ref.contactSearch,
    triggerEventTracking = _ref.triggerEventTracking;
  var hasSenderNumbers = senderNumbers.length > 0;
  var hasPersonalRecipient = toNumbers.some(function (x) {
    return x && x.type !== 'company';
  });
  // TODO:, double check the logic here.
  var showAlert = !!(!hasSenderNumbers && outboundSMS && hasPersonalRecipient);
  var addToRecipients = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(receiver) {
      var isAdded;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return addToNumber(receiver);
          case 1:
            isAdded = _context.v;
            if (isAdded) {
              cleanTypingToNumber();
            }
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function addToRecipients(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement(_styles.Root, null, showSpinner && /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null), /*#__PURE__*/_react["default"].createElement(_CommunicationSetupPanel.CommunicationSetupPanel, {
    triggerEventTracking: triggerEventTracking
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    ,
    toNumber: typingToNumber,
    onToNumberChange: updateTypingToNumber,
    directlyProceedType: "message",
    multiple: true,
    autoFocus: autoFocus,
    recipients: toNumbers,
    setRecipient: addToRecipients,
    clearRecipient: removeToNumber,
    currentLocale: currentLocale,
    detectPhoneNumbers: detectPhoneNumbers
    // from field
    ,
    showAnonymous: false,
    fromNumber: senderNumber,
    fromNumbers: senderNumbers,
    formatPhone: formatPhone,
    changeFromNumber: updateSenderNumber,
    showFromField: hasSenderNumbers,
    inputFullWidth: !!hintInfo,
    ContactSearch: contactSearch,
    filterCallQueueExtension: true
  }, /*#__PURE__*/_react["default"].createElement(_NoSenderAlert["default"], {
    currentLocale: currentLocale,
    showAlert: showAlert,
    brand: brand
  }), hintInfo, /*#__PURE__*/_react["default"].createElement(_MessageInput["default"]
  // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
  , {
    value: messageText,
    onChange: updateMessageText,
    sendButtonDisabled: sendButtonDisabled,
    currentLocale: currentLocale,
    onSend: send,
    inputExpandable: inputExpandable,
    attachments: attachments,
    supportAttachment: supportAttachment,
    supportEmoji: supportEmoji,
    addAttachments: addAttachments,
    removeAttachment: removeAttachment
  })));
};
//# sourceMappingURL=ComposeTextPanel.js.map

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _FromField = _interopRequireDefault(require("../FromField"));
var _MessageInput = _interopRequireDefault(require("../MessageInput"));
var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));
var _RecipientsInputV = require("../RecipientsInputV2");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _NoSenderAlert = _interopRequireDefault(require("./NoSenderAlert"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var ComposeTextPanel = /*#__PURE__*/function (_Component) {
  function ComposeTextPanel(props) {
    var _this;
    _classCallCheck(this, ComposeTextPanel);
    _this = _callSuper(this, ComposeTextPanel, [props]);
    _this.addToRecipients = void 0;
    _this.removeFromRecipients = void 0;
    _this.cleanReceiverValue = void 0;
    _this.onSenderChange = void 0;
    _this.onInputChange = function (searchString) {
      var _this$props = _this.props,
        updateTypingToNumber = _this$props.updateTypingToNumber,
        searchContact = _this$props.searchContact;
      updateTypingToNumber(searchString);
      searchContact(searchString);
    };
    _this.state = {
      messageText: props.messageText
    };
    var _this$props2 = _this.props,
      updateSenderNumber = _this$props2.updateSenderNumber,
      cleanTypingToNumber = _this$props2.cleanTypingToNumber,
      addToNumber = _this$props2.addToNumber,
      removeToNumber = _this$props2.removeToNumber;
    _this.onSenderChange = function (value) {
      updateSenderNumber(value);
    };
    _this.cleanReceiverValue = function () {
      cleanTypingToNumber();
    };
    _this.addToRecipients = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(receiver) {
        var shouldClean,
          isAdded,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              shouldClean = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
              _context.n = 1;
              return addToNumber(receiver);
            case 1:
              isAdded = _context.v;
              if (isAdded && shouldClean) {
                cleanTypingToNumber();
              }
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    _this.removeFromRecipients = function (phoneNumber) {
      removeToNumber({
        phoneNumber: phoneNumber
      });
    };
    return _this;
  }
  _inherits(ComposeTextPanel, _Component);
  return _createClass(ComposeTextPanel, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var messageText = this.state.messageText;
      if (nextProps.messageText !== messageText) {
        this.setState({
          messageText: nextProps.messageText
        });
      }
    }
  }, {
    key: "hasSenderNumbers",
    value: function hasSenderNumbers() {
      var senderNumbers = this.props.senderNumbers;
      return senderNumbers.length > 0;
    }
  }, {
    key: "hasPersonalRecipient",
    value: function hasPersonalRecipient() {
      var toNumbers = this.props.toNumbers;
      return toNumbers.some(function (x) {
        return x && x.type !== 'company';
      });
    }
  }, {
    key: "showAlert",
    value: function showAlert() {
      var outboundSMS = this.props.outboundSMS;
      return !!(!this.hasSenderNumbers() && outboundSMS && this.hasPersonalRecipient());
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        send = _this$props3.send,
        brand = _this$props3.brand,
        autoFocus = _this$props3.autoFocus,
        className = _this$props3.className,
        toNumbers = _this$props3.toNumbers,
        attachments = _this$props3.attachments,
        formatPhone = _this$props3.formatPhone,
        messageText = _this$props3.messageText,
        showSpinner = _this$props3.showSpinner,
        senderNumber = _this$props3.senderNumber,
        addAttachments = _this$props3.addAttachments,
        currentLocale = _this$props3.currentLocale,
        searchContact = _this$props3.searchContact,
        senderNumbers = _this$props3.senderNumbers,
        typingToNumber = _this$props3.typingToNumber,
        inputExpandable = _this$props3.inputExpandable,
        removeAttachment = _this$props3.removeAttachment,
        phoneTypeRenderer = _this$props3.phoneTypeRenderer,
        searchContactList = _this$props3.searchContactList,
        supportAttachment = _this$props3.supportAttachment,
        supportEmoji = _this$props3.supportEmoji,
        updateMessageText = _this$props3.updateMessageText,
        detectPhoneNumbers = _this$props3.detectPhoneNumbers,
        formatContactPhone = _this$props3.formatContactPhone,
        sendButtonDisabled = _this$props3.sendButtonDisabled,
        updateTypingToNumber = _this$props3.updateTypingToNumber,
        useRecipientsInputV2 = _this$props3.useRecipientsInputV2,
        showCustomPhoneLabel = _this$props3.showCustomPhoneLabel,
        phoneSourceNameRenderer = _this$props3.phoneSourceNameRenderer,
        recipientsContactInfoRenderer = _this$props3.recipientsContactInfoRenderer,
        recipientsContactPhoneRenderer = _this$props3.recipientsContactPhoneRenderer;
      var filteredSearchContactList = useRecipientsInputV2 && typingToNumber.length >= 3 ? searchContactList : [];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, /*#__PURE__*/_react["default"].createElement(_NoSenderAlert["default"], {
        currentLocale: currentLocale,
        showAlert: this.showAlert(),
        brand: brand
      }), useRecipientsInputV2 ? /*#__PURE__*/_react["default"].createElement(_RecipientsInputV.RecipientsInputV2, {
        value: typingToNumber,
        recipientsClassName: _styles["default"].recipients,
        onInputChange: this.onInputChange,
        onInputClear: this.cleanReceiverValue,
        recipients: toNumbers,
        addToRecipients: this.addToRecipients,
        removeFromRecipients: this.removeFromRecipients,
        searchContactList: filteredSearchContactList,
        formatContactPhone: formatContactPhone,
        currentLocale: currentLocale,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        contactInfoRenderer: recipientsContactInfoRenderer,
        contactPhoneRenderer: recipientsContactPhoneRenderer,
        enableTitle: true,
        multiple: true
      }) : /*#__PURE__*/_react["default"].createElement(_RecipientsInput["default"], {
        value: typingToNumber,
        recipientsClassName: _styles["default"].recipients,
        onChange: updateTypingToNumber,
        onClean: this.cleanReceiverValue,
        recipients: toNumbers,
        addToRecipients: this.addToRecipients,
        removeFromRecipients: this.removeFromRecipients,
        searchContact: searchContact,
        searchContactList: searchContactList,
        formatContactPhone: formatContactPhone,
        detectPhoneNumbers: detectPhoneNumbers,
        currentLocale: currentLocale,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        contactInfoRenderer: recipientsContactInfoRenderer,
        contactPhoneRenderer: recipientsContactPhoneRenderer,
        titleEnabled: true
        // eslint-disable-next-line jsx-a11y/no-autofocus
        ,
        autoFocus: autoFocus,
        multiple: true
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].senderField
      }, /*#__PURE__*/_react["default"].createElement(_FromField["default"], {
        currentLocale: currentLocale,
        fromNumber: senderNumber,
        fromNumbers: senderNumbers,
        formatPhone: formatPhone,
        onChange: this.onSenderChange,
        hidden: !this.hasSenderNumbers(),
        showCustomPhoneLabel: showCustomPhoneLabel,
        showAnonymous: false
      })), /*#__PURE__*/_react["default"].createElement(_MessageInput["default"], {
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
      }));
    }
  }]);
}(_react.Component);
ComposeTextPanel.defaultProps = void 0;
var _default = exports["default"] = ComposeTextPanel;
//# sourceMappingURL=index.js.map

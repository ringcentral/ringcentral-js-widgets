"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.some");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _FromField = _interopRequireDefault(require("../FromField"));
var _MessageInput = _interopRequireDefault(require("../MessageInput"));
var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));
var _RecipientsInputV = require("../RecipientsInputV2");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _NoSenderAlert = _interopRequireDefault(require("./NoSenderAlert"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var ComposeTextPanel = /*#__PURE__*/function (_Component) {
  _inherits(ComposeTextPanel, _Component);
  var _super = _createSuper(ComposeTextPanel);
  function ComposeTextPanel(props) {
    var _this;
    _classCallCheck(this, ComposeTextPanel);
    _this = _super.call(this, props);
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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(receiver) {
        var shouldClean,
          isAdded,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                shouldClean = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                _context.next = 3;
                return addToNumber(receiver);
              case 3:
                isAdded = _context.sent;
                if (isAdded && shouldClean) {
                  cleanTypingToNumber();
                }
              case 5:
              case "end":
                return _context.stop();
            }
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
  _createClass(ComposeTextPanel, [{
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
  return ComposeTextPanel;
}(_react.Component);
ComposeTextPanel.defaultProps = void 0;
var _default = ComposeTextPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

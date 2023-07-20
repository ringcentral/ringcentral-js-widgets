"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.some");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _FromField = _interopRequireDefault(require("../FromField"));
var _MessageInput = _interopRequireDefault(require("../MessageInput"));
var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));
var _RecipientsInputV = require("../RecipientsInputV2");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _NoSenderAlert = _interopRequireDefault(require("./NoSenderAlert"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
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
        addAttachment = _this$props3.addAttachment,
        currentLocale = _this$props3.currentLocale,
        searchContact = _this$props3.searchContact,
        senderNumbers = _this$props3.senderNumbers,
        typingToNumber = _this$props3.typingToNumber,
        inputExpandable = _this$props3.inputExpandable,
        removeAttachment = _this$props3.removeAttachment,
        phoneTypeRenderer = _this$props3.phoneTypeRenderer,
        searchContactList = _this$props3.searchContactList,
        supportAttachment = _this$props3.supportAttachment,
        updateMessageText = _this$props3.updateMessageText,
        detectPhoneNumbers = _this$props3.detectPhoneNumbers,
        formatContactPhone = _this$props3.formatContactPhone,
        sendButtonDisabled = _this$props3.sendButtonDisabled,
        updateTypingToNumber = _this$props3.updateTypingToNumber,
        useRecipientsInputV2 = _this$props3.useRecipientsInputV2,
        phoneSourceNameRenderer = _this$props3.phoneSourceNameRenderer,
        recipientsContactInfoRenderer = _this$props3.recipientsContactInfoRenderer,
        recipientsContactPhoneRenderer = _this$props3.recipientsContactPhoneRenderer;
      var filteredSearchContactList = useRecipientsInputV2 && typingToNumber.length >= 3 ? searchContactList : [];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
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
        titleEnabled: true,
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
        addAttachment: addAttachment,
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

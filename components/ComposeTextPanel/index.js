"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.some");

require("regenerator-runtime/runtime");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _NoSenderAlert = _interopRequireDefault(require("./NoSenderAlert"));

var _FromField = _interopRequireDefault(require("../FromField"));

var _MessageInput = _interopRequireDefault(require("../MessageInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ComposeTextPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(ComposeTextPanel, _Component);

  function ComposeTextPanel(props) {
    var _this;

    _classCallCheck(this, ComposeTextPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ComposeTextPanel).call(this, props));
    _this.state = {
      messageText: props.messageText
    };

    _this.onSenderChange = function (value) {
      _this.props.updateSenderNumber(value);
    };

    _this.cleanReceiverValue = function () {
      _this.props.cleanTypingToNumber();
    };

    _this.addToRecipients = function _callee(receiver) {
      var shouldClean,
          isAdded,
          _args = arguments;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              shouldClean = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
              _context.next = 3;
              return regeneratorRuntime.awrap(_this.props.addToNumber(receiver));

            case 3:
              isAdded = _context.sent;

              if (isAdded && shouldClean) {
                _this.props.cleanTypingToNumber();
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    _this.removeFromRecipients = function (phoneNumber) {
      _this.props.removeToNumber({
        phoneNumber: phoneNumber
      });
    };

    return _this;
  }

  _createClass(ComposeTextPanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.messageText !== this.state.messageText) {
        this.setState({
          messageText: nextProps.messageText
        });
      }
    }
  }, {
    key: "hasSenderNumbers",
    value: function hasSenderNumbers() {
      return this.props.senderNumbers.length > 0;
    }
  }, {
    key: "hasPersonalRecipient",
    value: function hasPersonalRecipient() {
      return this.props.toNumbers.some(function (x) {
        return x && x.type !== 'company';
      });
    }
  }, {
    key: "showAlert",
    value: function showAlert() {
      return !this.hasSenderNumbers() && this.props.outboundSMS && this.hasPersonalRecipient();
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, this.props.className)
      }, this.props.showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : null, _react["default"].createElement(_NoSenderAlert["default"], {
        currentLocale: this.props.currentLocale,
        showAlert: this.showAlert(),
        brand: this.props.brand
      }), _react["default"].createElement(_RecipientsInput["default"], {
        value: this.props.typingToNumber,
        recipientsClassName: _styles["default"].recipients,
        onChange: this.props.updateTypingToNumber,
        onClean: this.cleanReceiverValue,
        recipients: this.props.toNumbers,
        addToRecipients: this.addToRecipients,
        removeFromRecipients: this.removeFromRecipients,
        searchContact: this.props.searchContact,
        searchContactList: this.props.searchContactList,
        formatContactPhone: this.props.formatContactPhone,
        currentLocale: this.props.currentLocale,
        phoneTypeRenderer: this.props.phoneTypeRenderer,
        phoneSourceNameRenderer: this.props.phoneSourceNameRenderer,
        contactInfoRenderer: this.props.recipientsContactInfoRenderer,
        contactPhoneRenderer: this.props.recipientsContactPhoneRenderer,
        titleEnabled: true,
        autoFocus: this.props.autoFocus,
        multiple: true
      }), _react["default"].createElement("div", {
        className: _styles["default"].senderField
      }, _react["default"].createElement(_FromField["default"], {
        currentLocale: this.props.currentLocale,
        fromNumber: this.props.senderNumber,
        fromNumbers: this.props.senderNumbers,
        formatPhone: this.props.formatPhone,
        onChange: this.onSenderChange,
        hidden: !this.hasSenderNumbers(),
        showAnonymous: false
      })), _react["default"].createElement(_MessageInput["default"], {
        value: this.props.messageText,
        onChange: this.props.updateMessageText,
        disabled: this.props.sendButtonDisabled,
        currentLocale: this.props.currentLocale,
        onSend: this.props.send,
        inputExpandable: this.props.inputExpandable
      }));
    }
  }]);

  return ComposeTextPanel;
}(_react.Component);

ComposeTextPanel.propTypes = {
  brand: _propTypes["default"].string,
  className: _propTypes["default"].string,
  send: _propTypes["default"].func.isRequired,
  senderNumbers: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired
  })).isRequired,
  sendButtonDisabled: _propTypes["default"].bool.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  formatContactPhone: _propTypes["default"].func.isRequired,
  searchContact: _propTypes["default"].func.isRequired,
  searchContactList: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    entityType: _propTypes["default"].string.isRequired,
    phoneType: _propTypes["default"].string.isRequired,
    phoneNumber: _propTypes["default"].string.isRequired
  })).isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  updateSenderNumber: _propTypes["default"].func.isRequired,
  updateTypingToNumber: _propTypes["default"].func.isRequired,
  cleanTypingToNumber: _propTypes["default"].func.isRequired,
  addToNumber: _propTypes["default"].func.isRequired,
  removeToNumber: _propTypes["default"].func.isRequired,
  updateMessageText: _propTypes["default"].func.isRequired,
  messageText: _propTypes["default"].string,
  typingToNumber: _propTypes["default"].string,
  senderNumber: _propTypes["default"].string,
  toNumbers: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  })).isRequired,
  outboundSMS: _propTypes["default"].bool,
  showSpinner: _propTypes["default"].bool,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  recipientsContactInfoRenderer: _propTypes["default"].func,
  recipientsContactPhoneRenderer: _propTypes["default"].func,
  autoFocus: _propTypes["default"].bool,
  inputExpandable: _propTypes["default"].bool
};
ComposeTextPanel.defaultProps = {
  brand: 'RingCentral',
  className: null,
  messageText: '',
  typingToNumber: '',
  senderNumber: '',
  outboundSMS: false,
  showSpinner: false,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  autoFocus: false,
  inputExpandable: undefined
};
var _default = ComposeTextPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

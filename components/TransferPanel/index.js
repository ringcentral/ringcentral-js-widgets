"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Askfirst = _interopRequireDefault(require("@ringcentral/juno/icon/Askfirst"));

var _DialPad = _interopRequireDefault(require("../DialPad"));

var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _ActiveCallButton = _interopRequireDefault(require("../ActiveCallButton"));

var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TransferPanel = /*#__PURE__*/function (_PureComponent) {
  _inherits(TransferPanel, _PureComponent);

  var _super = _createSuper(TransferPanel);

  function TransferPanel(props) {
    var _this;

    _classCallCheck(this, TransferPanel);

    _this = _super.call(this, props);

    _this.onButtonOutput = function (key) {
      _this.setState({
        isLastInputFromDialpad: true
      });

      if (_this.state.recipient) {
        return;
      }

      _this.setState(function (preState) {
        var value = preState.toNumber + key;
        return {
          toNumber: value
        };
      });
    };

    _this.onTransfer = function () {
      _this.props.onTransfer(_this._getTransferNumber(), _this.props.sessionId);
    };

    _this.onWarmTransfer = function () {
      _this.props.onWarmTransfer(_this._getTransferNumber(), _this.props.sessionId);
    };

    _this.onToNumberChange = function (toNumber) {
      _this.setState({
        isLastInputFromDialpad: false,
        toNumber: toNumber
      });
    };

    _this.clearToNumber = function () {
      _this.setState({
        toNumber: ''
      });
    };

    _this.setRecipient = function (recipient) {
      _this.setState({
        recipient: recipient,
        toNumber: ''
      });
    };

    _this.clearRecipient = function () {
      _this.setState({
        recipient: null
      });
    };

    _this.state = {
      toNumber: '',
      recipient: null,
      isLastInputFromDialpad: false
    };
    return _this;
  }

  _createClass(TransferPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.load();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.session && !nextProps.session) {
        this.props.onCallEnd();
      }
    }
  }, {
    key: "load",
    value: function load() {
      this.props.setActiveSessionId(this.props.sessionId);
    }
  }, {
    key: "_getTransferNumber",
    value: function _getTransferNumber() {
      return this.state.recipient && this.state.recipient.phoneNumber || this.state.toNumber;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          controlBusy = _this$props.controlBusy,
          session = _this$props.session,
          onBack = _this$props.onBack,
          currentLocale = _this$props.currentLocale,
          searchContact = _this$props.searchContact,
          searchContactList = _this$props.searchContactList,
          formatPhone = _this$props.formatPhone,
          phoneTypeRenderer = _this$props.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
          recipientsContactInfoRenderer = _this$props.recipientsContactInfoRenderer,
          recipientsContactPhoneRenderer = _this$props.recipientsContactPhoneRenderer,
          autoFocus = _this$props.autoFocus,
          enableWarmTransfer = _this$props.enableWarmTransfer;

      if (!session) {
        return null;
      }

      var isOnTransfer = !!session.isOnTransfer;
      var transferButton;
      var warmTransferButton;

      if (enableWarmTransfer) {
        transferButton = /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].buttonGroupItem)
        }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
          dataSign: "transferBtn",
          className: isOnTransfer ? _styles["default"].disabled : undefined,
          onClick: this.onTransfer,
          icon: _Transfer["default"],
          disabled: isOnTransfer || controlBusy,
          title: _i18n["default"].getString('blindTransfer', currentLocale)
        }));
        warmTransferButton = /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].buttonGroupItem)
        }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
          dataSign: "warnTransferBtn",
          className: isOnTransfer ? _styles["default"].disabled : undefined,
          onClick: this.onWarmTransfer,
          icon: _Askfirst["default"],
          disabled: isOnTransfer || controlBusy,
          title: _i18n["default"].getString('warmTransfer', currentLocale)
        }));
      } else {
        transferButton = /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].button
        }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
          dataSign: "transferBtn",
          className: isOnTransfer ? _styles["default"].disabled : undefined,
          onClick: this.onTransfer,
          icon: _Transfer["default"],
          disabled: isOnTransfer || controlBusy
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root
      }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
        onBackClick: onBack
      }, _i18n["default"].getString('transferTo', currentLocale)), /*#__PURE__*/_react["default"].createElement(_RecipientsInput["default"], {
        className: _styles["default"].dialInput,
        value: this.state.toNumber,
        onChange: this.onToNumberChange,
        onClean: this.clearToNumber,
        recipient: this.state.recipient,
        addToRecipients: this.setRecipient,
        removeFromRecipients: this.clearRecipient,
        searchContact: searchContact,
        searchContactList: searchContactList,
        formatContactPhone: formatPhone,
        currentLocale: currentLocale,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        contactInfoRenderer: recipientsContactInfoRenderer,
        contactPhoneRenderer: recipientsContactPhoneRenderer,
        isLastInputFromDialpad: this.state.isLastInputFromDialpad,
        titleEnabled: true,
        autoFocus: autoFocus
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].padContainer
      }, /*#__PURE__*/_react["default"].createElement(_DialPad["default"], {
        dataSign: "transfer",
        className: _styles["default"].dialPad,
        onButtonOutput: this.onButtonOutput
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonRow
      }, warmTransferButton, transferButton)));
    }
  }]);

  return TransferPanel;
}(_react.PureComponent);

exports["default"] = TransferPanel;
TransferPanel.propTypes = {
  setActiveSessionId: _propTypes["default"].func,
  onTransfer: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  onBack: _propTypes["default"].func.isRequired,
  onCallEnd: _propTypes["default"].func.isRequired,
  searchContactList: _propTypes["default"].array,
  searchContact: _propTypes["default"].func.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  recipientsContactInfoRenderer: _propTypes["default"].func,
  recipientsContactPhoneRenderer: _propTypes["default"].func,
  autoFocus: _propTypes["default"].bool,
  sessionId: _propTypes["default"].string.isRequired,
  session: _propTypes["default"].object,
  controlBusy: _propTypes["default"].bool,
  enableWarmTransfer: _propTypes["default"].bool
};
TransferPanel.defaultProps = {
  setActiveSessionId: null,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  autoFocus: true,
  session: null,
  searchContactList: [],
  controlBusy: false,
  enableWarmTransfer: false
};
//# sourceMappingURL=index.js.map

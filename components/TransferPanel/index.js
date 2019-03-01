"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DialPad = _interopRequireDefault(require("../DialPad"));

var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TransferPanel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TransferPanel, _PureComponent);

  function TransferPanel(props) {
    var _this;

    _classCallCheck(this, TransferPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransferPanel).call(this, props));

    _this.onButtonOutput = function (key) {
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

    _this.onToNumberChange = function (toNumber) {
      _this.setState({
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
      recipient: null
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
      if (!this.props.session) {
        return null;
      }

      var isOnTransfer = !!this.props.session.isOnTransfer;
      return _react.default.createElement("div", {
        className: _styles.default.root
      }, _react.default.createElement(_BackHeader.default, {
        onBackClick: this.props.onBack
      }, _i18n.default.getString('transferTo', this.props.currentLocale)), _react.default.createElement(_RecipientsInput.default, {
        className: _styles.default.dialInput,
        value: this.state.toNumber,
        onChange: this.onToNumberChange,
        onClean: this.clearToNumber,
        recipient: this.state.recipient,
        addToRecipients: this.setRecipient,
        removeFromRecipients: this.clearRecipient,
        searchContact: this.props.searchContact,
        searchContactList: this.props.searchContactList,
        formatContactPhone: this.props.formatPhone,
        currentLocale: this.props.currentLocale,
        phoneTypeRenderer: this.props.phoneTypeRenderer,
        phoneSourceNameRenderer: this.props.phoneSourceNameRenderer,
        contactInfoRenderer: this.props.recipientsContactInfoRenderer,
        contactPhoneRenderer: this.props.recipientsContactPhoneRenderer,
        titleEnabled: true,
        autoFocus: this.props.autoFocus
      }), _react.default.createElement("div", {
        className: _styles.default.padContainer
      }, _react.default.createElement(_DialPad.default, {
        className: _styles.default.dialPad,
        onButtonOutput: this.onButtonOutput
      }), _react.default.createElement("div", {
        className: _styles.default.buttonRow
      }, _react.default.createElement("div", {
        className: _styles.default.button
      }, _react.default.createElement(_CircleButton.default, {
        className: isOnTransfer ? _styles.default.disabled : undefined,
        onClick: this.onTransfer,
        icon: _Transfer.default,
        disabled: isOnTransfer
      })))));
    }
  }]);

  return TransferPanel;
}(_react.PureComponent);

exports.default = TransferPanel;
TransferPanel.propTypes = {
  setActiveSessionId: _propTypes.default.func,
  onTransfer: _propTypes.default.func.isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  onBack: _propTypes.default.func.isRequired,
  onCallEnd: _propTypes.default.func.isRequired,
  searchContactList: _propTypes.default.array,
  searchContact: _propTypes.default.func.isRequired,
  formatPhone: _propTypes.default.func.isRequired,
  phoneTypeRenderer: _propTypes.default.func,
  phoneSourceNameRenderer: _propTypes.default.func,
  recipientsContactInfoRenderer: _propTypes.default.func,
  recipientsContactPhoneRenderer: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,
  sessionId: _propTypes.default.string.isRequired,
  session: _propTypes.default.object
};
TransferPanel.defaultProps = {
  setActiveSessionId: null,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  autoFocus: true,
  session: null,
  searchContactList: []
};
//# sourceMappingURL=index.js.map

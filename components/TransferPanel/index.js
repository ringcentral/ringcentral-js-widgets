'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DialPad = require('../DialPad');

var _DialPad2 = _interopRequireDefault(_DialPad);

var _RecipientsInput = require('../RecipientsInput');

var _RecipientsInput2 = _interopRequireDefault(_RecipientsInput);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _Transfer = require('../../assets/images/Transfer.svg');

var _Transfer2 = _interopRequireDefault(_Transfer);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransferPanel = (_temp = _class = function (_PureComponent) {
  (0, _inherits3.default)(TransferPanel, _PureComponent);

  function TransferPanel(props) {
    (0, _classCallCheck3.default)(this, TransferPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TransferPanel.__proto__ || (0, _getPrototypeOf2.default)(TransferPanel)).call(this, props));

    _this.onButtonOutput = function (key) {
      if (_this.state.recipient) {
        return;
      }
      _this.setState(function (preState) {
        var value = preState.toNumber + key;
        return { toNumber: value };
      });
    };

    _this.onTransfer = function () {
      _this.props.onTransfer(_this._getTransferNumber());
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
      _this.setState({ recipient: null });
    };

    _this.state = {
      toNumber: '',
      recipient: null
    };
    return _this;
  }

  (0, _createClass3.default)(TransferPanel, [{
    key: '_getTransferNumber',
    value: function _getTransferNumber() {
      return this.state.recipient && this.state.recipient.phoneNumber || this.state.toNumber;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          _BackHeader2.default,
          {
            onBackClick: this.props.toggleTransferPanel,
            backButton: _react2.default.createElement(
              'span',
              { className: _styles2.default.backButton },
              _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.backIcon) })
            )
          },
          _i18n2.default.getString('transferTo', this.props.currentLocale)
        ),
        _react2.default.createElement(_RecipientsInput2.default, {
          className: _styles2.default.dialInput,
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
          titleEnabled: true,
          autoFocus: true
        }),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.padContainer },
          _react2.default.createElement(_DialPad2.default, {
            className: _styles2.default.dialPad,
            onButtonOutput: this.onButtonOutput
          }),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.buttonRow },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.button },
              _react2.default.createElement(_CircleButton2.default, {
                className: this.props.isOnTransfer ? _styles2.default.disabled : undefined,
                onClick: this.onTransfer,
                icon: _Transfer2.default,
                disabled: this.props.isOnTransfer
              })
            )
          )
        )
      );
    }
  }]);
  return TransferPanel;
}(_react.PureComponent), _class.propTypes = {
  onTransfer: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  toggleTransferPanel: _propTypes2.default.func.isRequired,
  searchContactList: _propTypes2.default.array.isRequired,
  searchContact: _propTypes2.default.func.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  phoneTypeRenderer: _propTypes2.default.func,
  isOnTransfer: _propTypes2.default.bool
}, _class.defaultProps = {
  phoneTypeRenderer: undefined,
  isOnTransfer: false
}, _temp);
exports.default = TransferPanel;
//# sourceMappingURL=index.js.map

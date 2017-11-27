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
      _this.setState(function (preState) {
        var value = preState.value + key;
        return { value: value };
      });
    };

    _this.onTransfer = function () {
      _this.props.onTransfer(_this.state.value);
    };

    _this.clearText = function () {
      _this.setState({
        value: ''
      });
    };

    _this.handleChange = function (event) {
      _this.setState({ value: event.target.value });
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  (0, _createClass3.default)(TransferPanel, [{
    key: 'render',
    value: function render() {
      var showClearButton = this.state.value === '' ? { display: 'none' } : { display: 'block' };
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
        _react2.default.createElement(
          'div',
          { className: _styles2.default.dialInput },
          _react2.default.createElement(
            'label',
            null,
            _i18n2.default.getString('to', this.props.currentLocale)
          ),
          _react2.default.createElement('input', {
            className: _styles2.default.input,
            onChange: this.handleChange,
            placeholder: _i18n2.default.getString('enterNameOrNumber', this.props.currentLocale),
            value: this.state.value,
            autoFocus: true // eslint-disable-line
          }),
          _react2.default.createElement('span', {
            style: showClearButton,
            className: (0, _classnames2.default)(_styles2.default.clear, _DynamicsFont2.default.clear),
            onClick: this.clearText
          })
        ),
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
                onClick: this.onTransfer,
                icon: _Transfer2.default
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
  isOnTransfer: _propTypes2.default.bool.isRequired
}, _temp);
exports.default = TransferPanel;
//# sourceMappingURL=index.js.map

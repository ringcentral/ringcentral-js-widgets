'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AutoComplete = require('../../shared/AutoComplete/');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefix = (0, _style2.default)(['main', 'transfer', 'transferTitle', 'transferInput', 'transferButton', 'wrapper'], 'Transfer');

var main = _prefix.main;
var transfer = _prefix.transfer;
var transferTitle = _prefix.transferTitle;
var transferInput = _prefix.transferInput;
var transferButton = _prefix.transferButton;
var wrapper = _prefix.wrapper;

var Transfer = function (_React$Component) {
  _inherits(Transfer, _React$Component);

  function Transfer() {
    _classCallCheck(this, Transfer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Transfer).apply(this, arguments));
  }

  _createClass(Transfer, [{
    key: 'updateNumber',
    value: function updateNumber(event) {
      this.setState({ number: event.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(main, transfer) },
        _react2.default.createElement(
          'div',
          { className: transferTitle },
          'Transfer to'
        ),
        _react2.default.createElement(_AutoComplete2.default, {
          onChange: function onChange(event) {
            return _this2.updateNumber(event);
          },
          className: transferInput,
          placeholder: 'Enter Name or Number'
        }),
        _react2.default.createElement(
          'div',
          { className: wrapper },
          _react2.default.createElement(
            'button',
            {
              onClick: function onClick() {
                return _this2.props.handleClick(_this2.state.number);
              },
              className: transferButton
            },
            'Transfer'
          )
        )
      );
    }
  }]);

  return Transfer;
}(_react2.default.Component);

Transfer.propTypes = {
  handleClick: _react2.default.PropTypes.func
};
exports.default = Transfer;
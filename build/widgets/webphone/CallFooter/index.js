'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../../shared/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['icon', 'footer', 'footerButton'], 'CallFooter');

var icon = _prefix.icon;
var footer = _prefix.footer;
var footerButton = _prefix.footerButton;


var CallFooter = function CallFooter(props) {
  return _react2.default.createElement(
    'div',
    { className: footer },
    _react2.default.createElement(
      'button',
      { className: footerButton, onClick: props.onLeftClick },
      _react2.default.createElement(_Icon2.default, { id: props.leftIcon })
    ),
    _react2.default.createElement(
      'button',
      { className: footerButton, onClick: props.onRightClick },
      _react2.default.createElement(_Icon2.default, { id: props.rightIcon })
    )
  );
};

CallFooter.propTypes = {
  onLeftClick: _react2.default.PropTypes.func,
  onRightClick: _react2.default.PropTypes.func,
  leftIcon: _react2.default.PropTypes.string,
  rightIcon: _react2.default.PropTypes.string
};

CallFooter.defaultProps = {
  leftIcon: 'icon-uniCE',
  rightIcon: 'icon-uni44'
};

exports.default = CallFooter;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../../../styles/icon.css');

var _icon2 = _interopRequireDefault(_icon);

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
      _react2.default.createElement('span', {
        className: (0, _classnames2.default)(_icon2.default[props.leftIcon], _icon2.default.icon, icon)
      })
    ),
    _react2.default.createElement(
      'button',
      { className: footerButton, onClick: props.onRightClick },
      _react2.default.createElement('span', {
        className: (0, _classnames2.default)(_icon2.default[props.rightIcon], _icon2.default.icon, icon)
      })
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['icon'], 'Icon');

var icon = _prefix.icon;


function iconClass(iconId) {
  return (0, _classnames2.default)((0, _style2.default)([iconId], 'Icon')[iconId], icon);
}

var Icon = function Icon(props) {
  return _react2.default.createElement('span', { className: iconClass(props.id) });
};

exports.default = Icon;
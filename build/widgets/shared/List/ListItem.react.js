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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _prefix = (0, _style2.default)(['listItem', 'clickable'], 'ListItem');

var listItem = _prefix.listItem;
var clickable = _prefix.clickable;


var ListItem = function ListItem(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(listItem, props.className, _defineProperty({}, clickable, props.clickable)),
      onClick: props.onClick
    },
    props.children
  );
};

ListItem.propTypes = {
  children: _react2.default.PropTypes.node,
  onClick: _react2.default.PropTypes.func,
  clickable: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string
};

exports.default = ListItem;
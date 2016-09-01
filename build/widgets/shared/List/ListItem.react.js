'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _list = require('./list.css');

var _list2 = _interopRequireDefault(_list);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ListItem = function ListItem(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_list2.default.listItem, props.className, _defineProperty({}, _list2.default.clickable, props.clickable)),
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
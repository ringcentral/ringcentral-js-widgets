'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['dropdownItem', 'left', 'mid', 'right'], 'DropdownItem');

var dropdownItem = _prefix.dropdownItem;
var left = _prefix.left;
var mid = _prefix.mid;
var right = _prefix.right;


var DropdownItem = function DropdownItem(props) {
  return _react2.default.createElement(
    'li',
    {
      className: dropdownItem,
      onClick: function onClick() {
        return props.onClick(props.item);
      }
    },
    _react2.default.createElement(
      'div',
      { className: left },
      props.left
    ),
    _react2.default.createElement(
      'div',
      { className: mid },
      props.mid
    ),
    _react2.default.createElement(
      'div',
      { className: right },
      props.right
    )
  );
};

DropdownItem.propTypes = {
  onClick: _react2.default.PropTypes.func,
  item: _react2.default.PropTypes.object,
  left: _react2.default.PropTypes.string,
  mid: _react2.default.PropTypes.string,
  right: _react2.default.PropTypes.string
};

exports.default = DropdownItem;
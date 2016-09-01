'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DropdownItem = require('../DropdownItem/DropdownItem.react');

var _DropdownItem2 = _interopRequireDefault(_DropdownItem);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['dropdown'], 'Dropdown');

var dropdown = _prefix.dropdown;


var Dropdown = function Dropdown(props) {
  return _react2.default.createElement(
    'ul',
    { className: dropdown },
    props.items.map(function (item, index) {
      return _react2.default.createElement(_DropdownItem2.default, _extends({}, item, {
        item: item,
        onClick: props.onClick,
        key: index
      }));
    })
  );
};

Dropdown.propTypes = {
  onClick: _react2.default.PropTypes.func,
  items: _react2.default.PropTypes.array
};

Dropdown.defaultProps = {
  items: []
};

exports.default = Dropdown;
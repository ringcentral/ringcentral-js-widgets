'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _list = require('./list.css');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function List(props) {
  return _react2.default.createElement(
    'div',
    { className: _list2.default.list },
    props.children
  );
};

List.propTypes = {
  children: _react2.default.PropTypes.node
};

exports.default = List;
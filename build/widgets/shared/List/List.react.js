'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['list'], 'List');

var list = _prefix.list;


var List = function List(props) {
  return _react2.default.createElement(
    'div',
    { className: list },
    props.children
  );
};

List.propTypes = {
  children: _react2.default.PropTypes.node
};

exports.default = List;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PanelContent = function PanelContent(props) {
  var ContentElement = props.children;
  return _react2.default.createElement(
    'div',
    null,
    ContentElement
  );
};

PanelContent.propTypes = {
  children: _react2.default.PropTypes.node
};

exports.default = PanelContent;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconLine;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Line = require('../Line');

var _Line2 = _interopRequireDefault(_Line);

var _IconField = require('../IconField');

var _IconField2 = _interopRequireDefault(_IconField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IconLine(props) {
  return _react2.default.createElement(
    _Line2.default,
    {
      className: props.className,
      onClick: props.onClick,
      noBorder: props.noBorder },
    _react2.default.createElement(
      _IconField2.default,
      {
        className: props.className,
        icon: props.icon },
      props.children
    )
  );
}

IconLine.propTypes = {
  children: _propTypes2.default.node,
  icon: _propTypes2.default.node,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  noBorder: _propTypes2.default.bool
};
//# sourceMappingURL=index.js.map

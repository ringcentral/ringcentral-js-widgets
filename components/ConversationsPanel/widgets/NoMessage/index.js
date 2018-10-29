'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoMessages;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoMessages(_ref) {
  var placeholder = _ref.placeholder;

  return _react2.default.createElement(
    'p',
    { className: _style2.default.noMessages },
    placeholder
  );
}

NoMessages.propTypes = {
  placeholder: _propTypes2.default.string.isRequired
};
//# sourceMappingURL=index.js.map

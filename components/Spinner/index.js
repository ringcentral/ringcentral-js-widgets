'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Spinner;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Spinner(_ref) {
  var className = _ref.className,
      ringWidth = _ref.ringWidth;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    _react2.default.createElement('div', { className: (0, _classnames2.default)(_styles2.default.padding) }),
    _react2.default.createElement('div', {
      className: _styles2.default.spinner,
      style: {
        borderWidth: ringWidth
      } })
  );
}
Spinner.propTypes = {
  className: _propTypes2.default.string,
  ringWidth: _propTypes2.default.number
};
Spinner.defaultProps = {
  className: null,
  ringWidth: 8
};
//# sourceMappingURL=index.js.map

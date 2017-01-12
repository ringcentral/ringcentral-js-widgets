'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Spinner;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Spinner(props) {
  return _react2.default.createElement(
    'div',
    { className: [_styles2.default.root, props.className].join(' ') },
    _react2.default.createElement('div', { className: _styles2.default.padding }),
    _react2.default.createElement('div', { className: _styles2.default.spinner })
  );
}
Spinner.propTypes = {
  className: _react.PropTypes.string
};
//# sourceMappingURL=index.js.map

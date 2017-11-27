'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Switch(props) {
  var onChange = props.onChange ? function (e) {
    return props.onChange(e.currentTarget.checked);
  } : undefined;
  return _react2.default.createElement(
    'label',
    { className: _styles2.default.switch },
    _react2.default.createElement('input', {
      type: 'checkbox',
      checked: props.checked,
      onChange: onChange }),
    _react2.default.createElement('div', { className: _styles2.default.slider })
  );
}

Switch.propTypes = {
  checked: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};
Switch.defaultProps = {
  checked: false,
  onChange: undefined
};
exports.default = Switch;
//# sourceMappingURL=index.js.map

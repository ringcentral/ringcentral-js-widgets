'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Switch(props) {
  var onChange = props.onChange ? function (e) {
    return !props.disable && props.onChange(e.currentTarget.checked);
  } : undefined;
  return _react2.default.createElement(
    'label',
    {
      title: props.title,
      className: (0, _classnames2.default)(_styles2.default.switch, props.disable && _styles2.default.disable)
    },
    _react2.default.createElement('input', {
      type: 'checkbox',
      checked: props.checked,
      onChange: onChange }),
    _react2.default.createElement('div', { className: _styles2.default.slider })
  );
}

Switch.propTypes = {
  checked: _propTypes2.default.bool,
  disable: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};
Switch.defaultProps = {
  checked: false,
  disable: false,
  onChange: undefined,
  title: undefined
};
exports.default = Switch;
//# sourceMappingURL=index.js.map

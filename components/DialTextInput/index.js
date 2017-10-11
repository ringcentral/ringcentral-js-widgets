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

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DialTextInput(_ref) {
  var className = _ref.className,
      invalid = _ref.invalid,
      value = _ref.value,
      onChangeEvent = _ref.onChangeEvent,
      onDelete = _ref.onDelete,
      autoFocus = _ref.autoFocus;

  var deleteDisplay = value === '' ? { display: 'none' } : { display: 'block' };
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.dialInput, className, invalid && _styles2.default.invalid) },
    _react2.default.createElement(
      'span',
      { className: (0, _classnames2.default)(_styles2.default.to) },
      _i18n2.default.getString('to')
    ),
    _react2.default.createElement(_TextInput2.default, {
      placeholder: _i18n2.default.getString('enterNameOrPhoneNumber'),
      className: _styles2.default.dial_Input,
      value: value,
      onChange: onChangeEvent,
      autoFocus: autoFocus
    }),
    _react2.default.createElement('span', {
      style: deleteDisplay,
      className: (0, _classnames2.default)(_styles2.default.delete, _DynamicsFont2.default.clear),
      onClick: onDelete
    })
  );
}

DialTextInput.propTypes = {
  className: _propTypes2.default.string,
  invalid: _propTypes2.default.bool,
  value: _propTypes2.default.string,
  onChangeEvent: _propTypes2.default.func,
  onDelete: _propTypes2.default.func,
  autoFocus: _propTypes2.default.bool
};
DialTextInput.defaultValue = {
  className: _styles2.default.input,
  autoFocus: false
};

exports.default = DialTextInput;
//# sourceMappingURL=index.js.map

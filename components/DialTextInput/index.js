"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DialTextInput(_ref) {
  var className = _ref.className,
      invalid = _ref.invalid,
      value = _ref.value,
      onChangeEvent = _ref.onChangeEvent,
      onDelete = _ref.onDelete,
      autoFocus = _ref.autoFocus;
  var deleteDisplay = value === '' ? {
    display: 'none'
  } : {
    display: 'block'
  };
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(_styles.default.dialInput, className, invalid && _styles.default.invalid)
  }, _react.default.createElement("span", {
    className: (0, _classnames.default)(_styles.default.to)
  }, _i18n.default.getString('to')), _react.default.createElement(_TextInput.default, {
    placeholder: _i18n.default.getString('enterNameOrPhoneNumber'),
    className: _styles.default.dial_Input,
    value: value,
    onChange: onChangeEvent,
    autoFocus: autoFocus
  }), _react.default.createElement("span", {
    style: deleteDisplay,
    className: (0, _classnames.default)(_styles.default.delete, _DynamicsFont.default.clear),
    onClick: onDelete
  }));
}

DialTextInput.propTypes = {
  className: _propTypes.default.string,
  invalid: _propTypes.default.bool,
  value: _propTypes.default.string,
  onChangeEvent: _propTypes.default.func,
  onDelete: _propTypes.default.func,
  autoFocus: _propTypes.default.bool
};
DialTextInput.defaultValue = {
  className: _styles.default.input,
  autoFocus: false
};
var _default = DialTextInput;
exports.default = _default;
//# sourceMappingURL=index.js.map

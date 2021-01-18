"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioField = void 0;

require("core-js/modules/es6.array.map");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RadioField = function RadioField(_ref) {
  var value = _ref.value,
      options = _ref.options,
      onChange = _ref.onChange;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcRadioGroup, {
    value: value,
    onChange: onChange
  }, options.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_juno.RcFormControlLabel, {
      key: "label-".concat(i),
      value: item.value,
      control: /*#__PURE__*/_react["default"].createElement(_juno.RcRadio, {
        key: "radio-".concat(i)
      }),
      label: item.label,
      disabled: item.disabled
    });
  }));
};

exports.RadioField = RadioField;
//# sourceMappingURL=RadioField.js.map

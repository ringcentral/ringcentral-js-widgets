"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioField = void 0;

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _FormControlLabel = require("@ringcentral/juno/es6/components/Forms/FormControlLabel/FormControlLabel.js");

var _Radio = require("@ringcentral/juno/es6/components/Forms/Radio/Radio.js");

var _RadioGroup = require("@ringcentral/juno/es6/components/Forms/RadioGroup/RadioGroup.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RadioField = function RadioField(_ref) {
  var value = _ref.value,
      options = _ref.options,
      classes = _ref.classes,
      onChange = _ref.onChange;
  return /*#__PURE__*/_react["default"].createElement(_RadioGroup.RcRadioGroup, {
    value: value,
    onChange: onChange
  }, options.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_FormControlLabel.RcFormControlLabel, {
      key: "label-".concat(i),
      value: item.value,
      control: /*#__PURE__*/_react["default"].createElement(_Radio.RcRadio, {
        key: "radio-".concat(i),
        size: "small"
      }),
      label: item.label,
      disabled: item.disabled,
      classes: classes
    });
  }));
};

exports.RadioField = RadioField;
//# sourceMappingURL=RadioField.js.map

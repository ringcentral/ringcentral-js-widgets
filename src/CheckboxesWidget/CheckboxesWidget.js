"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CheckboxesWidget;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _Checkbox = require("@ringcentral/juno/es6/components/Forms/Checkbox/Checkbox.js");
var _FormControlLabel = require("@ringcentral/juno/es6/components/Forms/FormControlLabel/FormControlLabel.js");
var _FormGroup = require("@ringcentral/juno/es6/components/Forms/FormGroup/FormGroup.js");
var _FormLabel = require("@ringcentral/juno/es6/components/Forms/FormLabel.js");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `CheckboxesWidget` is a widget for rendering checkbox groups.
 *  It is typically used to represent an array of enums.
 *
 * @param props - The `WidgetProps` for this component
 */
function CheckboxesWidget(_ref) {
  var label = _ref.label,
    hideLabel = _ref.hideLabel,
    id = _ref.id,
    disabled = _ref.disabled,
    options = _ref.options,
    value = _ref.value,
    autofocus = _ref.autofocus,
    readonly = _ref.readonly,
    required = _ref.required,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    inline = options.inline,
    emptyValue = options.emptyValue;
  var checkboxesValues = Array.isArray(value) ? value : [value];
  var _onChange = function _onChange(index) {
    return function (_ref2) {
      var checked = _ref2.target.checked;
      if (checked) {
        onChange((0, _utils.enumOptionsSelectValue)(index, checkboxesValues, enumOptions));
      } else {
        onChange((0, _utils.enumOptionsDeselectValue)(index, checkboxesValues, enumOptions));
      }
    };
  };
  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, (0, _utils.enumOptionsValueForIndex)(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, (0, _utils.enumOptionsValueForIndex)(value, enumOptions, emptyValue));
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _utils.labelValue)(/*#__PURE__*/_react["default"].createElement(_FormLabel.RcFormLabel, {
    required: required,
    htmlFor: id
  }, label || undefined), hideLabel), /*#__PURE__*/_react["default"].createElement(_FormGroup.RcFormGroup, {
    id: id,
    row: !!inline
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var checked = (0, _utils.enumOptionsIsSelected)(option.value, checkboxesValues);
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    var checkbox = /*#__PURE__*/_react["default"].createElement(_Checkbox.RcCheckbox, {
      id: (0, _utils.optionId)(id, index),
      name: id,
      checked: checked,
      disabled: disabled || itemDisabled || readonly
      // eslint-disable-next-line jsx-a11y/no-autofocus
      ,
      autoFocus: autofocus && index === 0,
      onChange: _onChange(index),
      onBlur: _onBlur,
      onFocus: _onFocus,
      "aria-describedby": (0, _utils.ariaDescribedByIds)(id)
    });
    return /*#__PURE__*/_react["default"].createElement(_FormControlLabel.RcFormControlLabel, {
      control: checkbox,
      key: index,
      label: option.label
    });
  })));
}
//# sourceMappingURL=CheckboxesWidget.js.map

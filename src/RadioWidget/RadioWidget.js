"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RadioWidget;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _FormControlLabel = require("@ringcentral/juno/es6/components/Forms/FormControlLabel/FormControlLabel.js");
var _FormLabel = require("@ringcentral/juno/es6/components/Forms/FormLabel.js");
var _Radio = require("@ringcentral/juno/es6/components/Forms/Radio/Radio.js");
var _RadioGroup = require("@ringcentral/juno/es6/components/Forms/RadioGroup/RadioGroup.js");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function RadioWidget(_ref) {
  var _enumOptionsIndexForV;
  var id = _ref.id,
    options = _ref.options,
    value = _ref.value,
    required = _ref.required,
    disabled = _ref.disabled,
    readonly = _ref.readonly,
    label = _ref.label,
    hideLabel = _ref.hideLabel,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var _onChange = function _onChange(_, value) {
    return onChange((0, _utils.enumOptionsValueForIndex)(value, enumOptions, emptyValue));
  };
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, (0, _utils.enumOptionsValueForIndex)(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, (0, _utils.enumOptionsValueForIndex)(value, enumOptions, emptyValue));
  };
  var row = options ? options.inline : false;
  var selectedIndex = (_enumOptionsIndexForV = (0, _utils.enumOptionsIndexForValue)(value, enumOptions)) !== null && _enumOptionsIndexForV !== void 0 ? _enumOptionsIndexForV : null;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _utils.labelValue)(/*#__PURE__*/_react["default"].createElement(_FormLabel.RcFormLabel, {
    required: required,
    htmlFor: id
  }, label || undefined), hideLabel), /*#__PURE__*/_react["default"].createElement(_RadioGroup.RcRadioGroup, {
    id: id,
    name: id,
    value: selectedIndex,
    row: row,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": (0, _utils.ariaDescribedByIds)(id)
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    var radio = /*#__PURE__*/_react["default"].createElement(_FormControlLabel.RcFormControlLabel, {
      control: /*#__PURE__*/_react["default"].createElement(_Radio.RcRadio, {
        name: id,
        id: (0, _utils.optionId)(id, index),
        color: "interactive.f01"
      }),
      label: option.label,
      value: String(index),
      key: index,
      disabled: disabled || itemDisabled || readonly
    });
    return radio;
  })));
}
//# sourceMappingURL=RadioWidget.js.map

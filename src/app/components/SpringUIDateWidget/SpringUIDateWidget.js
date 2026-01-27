"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringUIDateWidget = void 0;
require("core-js/modules/es.date.to-string.js");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SpringUIDateWidget = exports.SpringUIDateWidget = function SpringUIDateWidget(_ref) {
  var _onChange = _ref.onChange,
    disabled = _ref.disabled,
    formData = _ref.formData,
    readonly = _ref.readonly,
    required = _ref.required,
    schema = _ref.schema;
  var dateValue = formData ? new Date(formData) : null;
  return /*#__PURE__*/_react["default"].createElement(_springUi.DatePicker, {
    value: dateValue,
    size: "medium",
    variant: "outlined",
    onChange: function onChange(date) {
      var convertedDate = (schema === null || schema === void 0 ? void 0 : schema.convertDateFunction) ? schema.convertDateFunction(date) : date;
      _onChange(convertedDate);
    },
    disabled: disabled || readonly,
    fullWidth: true,
    label: schema.title,
    required: required,
    clearBtn: false
  });
};
//# sourceMappingURL=SpringUIDateWidget.js.map

"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.generateWidgets = generateWidgets;
var _CheckboxWidget = _interopRequireDefault(require("../CheckboxWidget/CheckboxWidget"));
var _CheckboxesWidget = _interopRequireDefault(require("../CheckboxesWidget/CheckboxesWidget"));
var _RadioWidget = _interopRequireDefault(require("../RadioWidget/RadioWidget"));
var _RangeWidget = _interopRequireDefault(require("../RangeWidget/RangeWidget"));
var _SelectWidget = _interopRequireDefault(require("../SelectWidget/SelectWidget"));
var _TextareaWidget = _interopRequireDefault(require("../TextareaWidget/TextareaWidget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function generateWidgets() {
  return {
    CheckboxWidget: _CheckboxWidget["default"],
    CheckboxesWidget: _CheckboxesWidget["default"],
    RadioWidget: _RadioWidget["default"],
    RangeWidget: _RangeWidget["default"],
    SelectWidget: _SelectWidget["default"],
    TextareaWidget: _TextareaWidget["default"]
  };
}
var _default = exports["default"] = generateWidgets();
//# sourceMappingURL=Widgets.js.map

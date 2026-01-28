"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TextareaWidget;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
function TextareaWidget(props) {
  var options = props.options,
    registry = props.registry;
  var BaseInputTemplate = (0, _utils.getTemplate)('BaseInputTemplate', registry, options);
  if (typeof options.rows === 'string' || typeof options.rows === 'number') {
    return /*#__PURE__*/_react["default"].createElement(BaseInputTemplate, _extends({}, props, {
      rows: options.rows,
      multiline: true,
      clearBtn: false
    }));
  }
  return /*#__PURE__*/_react["default"].createElement(BaseInputTemplate, _extends({}, props, {
    multiline: true,
    clearBtn: false
  }));
}
//# sourceMappingURL=TextareaWidget.js.map

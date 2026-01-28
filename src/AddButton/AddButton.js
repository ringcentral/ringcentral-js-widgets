"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AddButton;
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _Add = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Add.js"));
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
var _excluded = ["uiSchema", "registry"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/** The `AddButton` renders a button that represent the `Add` action on a form
 */
function AddButton(_ref) {
  var uiSchema = _ref.uiSchema,
    registry = _ref.registry,
    props = _objectWithoutProperties(_ref, _excluded);
  var translateString = registry.translateString;
  return /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, _extends({
    title: translateString(_utils.TranslatableString.AddItemButton)
  }, props, {
    color: "action.primary",
    symbol: _Add["default"]
  }));
}
//# sourceMappingURL=AddButton.js.map

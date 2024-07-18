"use strict";

require("core-js/modules/es.array.includes");
require("core-js/modules/es.function.name");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkLineItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _LinkLine = require("../LinkLine");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
var LinkLineItem = function LinkLineItem(_ref) {
  var show = _ref.show,
    name = _ref.name,
    customTitle = _ref.customTitle,
    currentLocale = _ref.currentLocale,
    onClick = _ref.onClick,
    dataSign = _ref.dataSign,
    pendoSignName = _ref.pendoSignName,
    rest = _objectWithoutProperties(_ref, ["show", "name", "customTitle", "currentLocale", "onClick", "dataSign", "pendoSignName"]);
  if (!show) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(_LinkLine.LinkLine, _extends({
    hideUnderline: true
    // @ts-expect-error TS(2322): Type '(() => any) | undefined' is not assignable t... Remove this comment to see the full error message
    ,
    onClick: onClick,
    dataSign: dataSign,
    pendoSignName: pendoSignName
  }, rest), customTitle || _i18n["default"].getString(name, currentLocale));
};
exports.LinkLineItem = LinkLineItem;
//# sourceMappingURL=LinkLineItem.js.map

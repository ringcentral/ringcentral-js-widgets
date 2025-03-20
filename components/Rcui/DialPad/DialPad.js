"use strict";

require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialPad = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
/** @deprecated use juno RcDialPad directly */
var DialPad = function DialPad(_ref) {
  var className = _ref.className,
    dataSign = _ref.dataSign,
    onChange = _ref.onChange,
    rest = _objectWithoutProperties(_ref, ["className", "dataSign", "onChange"]);
  var handleChange = function handleChange(e) {
    // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
    return onChange && onChange(e);
  };
  return /*#__PURE__*/_react["default"].createElement(_juno.RcDialPad, _extends({
    "data-sign": "".concat(dataSign || '', "DialPad"),
    className: (0, _clsx["default"])(_styles["default"].root, className),
    onChange: handleChange,
    sounds: _juno.RcDialerPadSoundsMPEG
  }, rest));
};
exports.DialPad = DialPad;
//# sourceMappingURL=DialPad.js.map

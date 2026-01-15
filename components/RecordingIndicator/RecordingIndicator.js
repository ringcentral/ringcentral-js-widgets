"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordingIndicator = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _RecordOn = _interopRequireDefault(require("../../assets/images/RecordOn.svg"));
var _useSynchronizedAnimation = require("../../react-hooks/useSynchronizedAnimation");
var _styles = _interopRequireDefault(require("./styles.scss"));
var _excluded = ["className"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var RecordingIndicator = exports.RecordingIndicator = function RecordingIndicator(_ref) {
  var className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var animationClassName = _styles["default"].recordingIndicator;
  (0, _useSynchronizedAnimation.useSynchronizedAnimation)(".".concat(animationClassName));
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, _extends({}, rest, {
    size: "small",
    symbol: _RecordOn["default"],
    className: (0, _clsx["default"])(animationClassName, className)
  }));
};
//# sourceMappingURL=RecordingIndicator.js.map

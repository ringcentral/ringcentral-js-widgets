"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationMessage = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _Message = _interopRequireDefault(require("../Message"));
var _AnimationAlertUtils = require("./AnimationAlertUtils");
var _excluded = ["animation", "duration"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var AnimationMessage = exports.AnimationMessage = function AnimationMessage(_ref) {
  var animation = _ref.animation,
    duration = _ref.duration,
    props = _objectWithoutProperties(_ref, _excluded);
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  var second = duration / 1000;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])([animation, 'animated']),
    style: {
      animationDuration: "".concat(second, "s")
    }
  }, /*#__PURE__*/_react["default"].createElement(_Message["default"], props));
};
AnimationMessage.defaultProps = {
  animation: undefined,
  duration: _AnimationAlertUtils.ANIMATION_DURATION
};
//# sourceMappingURL=AnimationMessage.js.map

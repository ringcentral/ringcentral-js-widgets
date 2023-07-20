"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;
var _debounce = require("./debounce");
/**
 * @return {function} throttled - The throttled function.
 * @return {function} throttled.cancel - Calling cancel will stop the throttle timer and prevent trailing invocation if queued, and return the last known result.
 * @return {function} throttled.flush - Calling flush will stop the throttle timer and invoke fn immediately and return the result if there is trailing invocation queue. If no trailing invocation is queued, it will return the last known result.
 */
function throttle(_ref) {
  var fn = _ref.fn,
    _ref$leading = _ref.leading,
    leading = _ref$leading === void 0 ? true : _ref$leading,
    _ref$trailing = _ref.trailing,
    trailing = _ref$trailing === void 0 ? true : _ref$trailing,
    _ref$threshold = _ref.threshold,
    threshold = _ref$threshold === void 0 ? _debounce.DEFAULT_THRESHOLD : _ref$threshold;
  return (0, _debounce.debounce)({
    fn: fn,
    leading: leading,
    trailing: trailing,
    threshold: threshold,
    maxThreshold: threshold
  });
}
//# sourceMappingURL=throttle.js.map

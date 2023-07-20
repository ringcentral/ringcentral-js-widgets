"use strict";

require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = debounce;
// @ts-nocheck
/**
 * ## @deprecated
 * ## Please using ringcentral-js-widgets/ringcentral-integration/lib/debounce-throttle/debounce.ts
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {Function} func - target function
 * @param {Number} threshold - execution threshold
 * @param {Boolean} immediate - trigger on leading edge
 * @return {Function}
 *
 * @deprecated
 */
function debounce(func) {
  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (typeof func !== 'function') {
    throw new Error('First argument of debounce function should be a function');
  }
  var timer = null;
  return function debounced() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var context = this;
    var callNow = immediate && !timer;
    var later = function later() {
      timer = null;
      if (!immediate) func.apply(context, args);
    };
    clearTimeout(timer);
    timer = setTimeout(later, threshold);
    if (callNow) func.apply(context, args);
  };
}
//# sourceMappingURL=debounce.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;
/**
 * Throttle the execution of the function,
 * if the frequently invoked function is being throttled,
 * then the function will only be called at threshold time.
 *
 * @param {Function} func - the target function
 * @param {Number} threshold - execution threshold
 * @return {Function}
 */
function throttle(func) {
  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (typeof func !== 'function') {
    throw new Error('First argument of throttle function should be a function');
  }

  var timer = null;
  var firstTime = true;

  return function throttled() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;

    // It will be triggered at first time
    if (firstTime) {
      func.apply(context, args);
      firstTime = false;
      return;
    }

    if (timer) {
      return;
    }

    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      func.apply(context, args);
    }, threshold);
  };
}
//# sourceMappingURL=throttle.js.map

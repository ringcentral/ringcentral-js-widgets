"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.DEFAULT_THRESHOLD = void 0;

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

var DEFAULT_THRESHOLD = 500;
/**
 * @property {function} fn - Original function to be debounced
 * @property {number} threshold
 */

exports.DEFAULT_THRESHOLD = DEFAULT_THRESHOLD;

/**
 * @return {function} debounced - The debounced function. Attached to the function are cancel function and flush function.
 * @return {function} debounced.cancel - Calling the cancel function will return the last known result and cancel the queued invocation if there is one.
 * @return {function} debounce.flush - Calling the flush function will return the last known result if no invocation is queued, or cancel the queue and invoke fn immediately and return the result.
 */
function debounce(_ref) {
  var fn = _ref.fn,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? DEFAULT_THRESHOLD : _ref$threshold,
      _ref$leading = _ref.leading,
      leading = _ref$leading === void 0 ? false : _ref$leading,
      _ref$trailing = _ref.trailing,
      trailing = _ref$trailing === void 0 ? true : _ref$trailing,
      _ref$maxThreshold = _ref.maxThreshold,
      maxThreshold = _ref$maxThreshold === void 0 ? null : _ref$maxThreshold;
  var timeoutId = null;
  var lastArgs;
  var lastThis;
  var lastResult;
  var thresholdStart = 0;

  function invoke() {
    if (lastArgs) {
      lastResult = fn.apply(lastThis, lastArgs);
    }

    lastThis = undefined;
    lastArgs = undefined;
  }

  function getWaitTime(timestamp) {
    return !Number.isNaN(maxThreshold) && maxThreshold > 0 ? Math.min(threshold, maxThreshold - (timestamp - thresholdStart)) : threshold;
  }

  function handleTimeout() {
    timeoutId = null;
    var timestamp = Date.now();

    if (lastArgs) {
      thresholdStart = timestamp;
      invoke();
      timeoutId = setTimeout(handleTimeout, getWaitTime(timestamp));
    } else {
      thresholdStart = 0;
    }
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    } // reset the args and thresholdStart since no invocation occurs


    lastThis = undefined;
    lastArgs = undefined;
    thresholdStart = 0;
    return lastResult;
  }

  function flush() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      handleTimeout();
    }

    return lastResult;
  }

  var debounced = function debounced() {
    var timestamp = Date.now();

    if (!timeoutId || trailing || !leading) {
      lastThis = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      lastArgs = args;
    }

    if (!timeoutId && leading) {
      invoke();
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (thresholdStart === 0 || thresholdStart > timestamp) {
      // in case that the system time is adjusted backwards to a time server
      // resett he thresholdStart so that invocation will not be delayed indefinitely
      thresholdStart = timestamp;
    }

    timeoutId = setTimeout(handleTimeout, getWaitTime(timestamp));
    return lastResult;
  };

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
//# sourceMappingURL=debounce.js.map

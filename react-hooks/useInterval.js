"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInterval = void 0;

var _react = require("react");

var _useEventCallback = require("@ringcentral/juno/es6/foundation/hooks/useEventCallback/useEventCallback.js");

/**
 * controllable interval, provide easy way to control interval
 *
 * - cancel: cancel current interval
 * - pause: pause current interval
 * - play: play current interval
 * - getRunning: return current interval running state
 *
 *  @example
 * ```ts
 * const { cancel, play, pause } = useInterval(() => {
 *    console.log('interval be triggered');
 * }, 1000)
 *
 * // get current run times
 * useInterval((times) => {
 *    console.log('current times start from 1', times);
 * }, 2000)
 *
 * // not start interval immediately
 * useInterval((times) => {
 *    console.log('current times start from 1', times);
 * }, 2000, false)
 * ```
 */
var useInterval = function useInterval(callback) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var startImmediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var intervalRef = (0, _react.useRef)();
  var countRef = (0, _react.useRef)(0);
  var getRunning = (0, _useEventCallback.useEventCallback)(function () {
    return !!intervalRef.current;
  });
  var savedCallback = (0, _useEventCallback.useEventCallback)(function (times) {
    callback(times);
  });
  var pause = (0, _react.useCallback)(function () {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);
  var cancel = (0, _react.useCallback)(function () {
    pause();
    countRef.current = 0;
  }, [pause]);
  var play = (0, _react.useCallback)(function () {
    var isRunning = getRunning();
    if (isRunning) return;
    intervalRef.current = window.setInterval(function () {
      countRef.current++;
      savedCallback(countRef.current);
    }, delay);
  }, [delay, getRunning, savedCallback]);
  (0, _react.useEffect)(function () {
    if (startImmediately) {
      play();
    }

    return function () {
      return cancel();
    };
  }, [cancel, play, startImmediately]);
  return {
    /**
     * cancel current interval
     */
    cancel: cancel,

    /**
     * pause current interval
     */
    pause: pause,

    /**
     * play current interval
     */
    play: play,

    /**
     * return current interval running state
     */
    getRunning: getRunning
  };
};

exports.useInterval = useInterval;
//# sourceMappingURL=useInterval.js.map

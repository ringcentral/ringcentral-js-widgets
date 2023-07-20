"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = void 0;
/**
 * sleep for ms
 * @param ms what ms to sleep
 * @returns Promise with cancel method, that can be used to cancel sleep
 *
 * @example
 *
 * when call cancel, it will cancel sleep, otherwise that will be completed after 1000ms
 * ```ts
 * const sleepPromise = sleep(1000);
 *
 * sleepPromise
 *   .then(() => {
 *     console.log('sleep done');
 *   })
 *   .catch(() => {
 *     console.log('sleep canceled');
 *   }
 *
 * const onClick = () => {
 *   sleepPromise.cancel();
 * }
 * ```
 */
var sleep = function sleep(ms) {
  var timer;
  var rejector;
  var promise = new Promise(function (resolve, reject) {
    rejector = reject;
    timer = setTimeout(resolve, ms);
  });
  promise.cancel = function () {
    rejector(new Error('Async sleep has been cancelled'));
    clearTimeout(timer);
  };
  return promise;
};
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromSubscribe = void 0;
var _rxjs = require("rxjs");
var _usmRedux = require("../usm-redux");
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * `subscribe` redux state change notifications to `Observable` flow
 *
 * that method for you can check event when any redux dispatch triggered.
 *
 * @example
 * ```ts
 * fromSubscribe(this)
 *   .pipe(
 *     tap((e) => {
 *       console.log(e); // trigger when any state change
 *     }),
 *   )
 *   .subscribe();
 * ```
 *
 * same as `subscribe`, but not support `awaitPromise` option, if you need wait one by one, can use `concatMap` to control flow by yourself.
 */
var fromSubscribe = function fromSubscribe(target) {
  var destroy;
  var obs$ = new _rxjs.Observable(function (observer) {
    destroy = (0, _usmRedux.subscribe)(target, function () {
      return observer.next();
    });
  });
  return obs$.pipe((0, _rxjs.share)(), (0, _rxjs.finalize)(function () {
    return destroy();
  }));
};
exports.fromSubscribe = fromSubscribe;
//# sourceMappingURL=fromSubscribe.js.map

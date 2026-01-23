"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromSubscribe = void 0;
var _reactantShare = require("reactant-share");
var _rxjs = require("rxjs");
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
var fromSubscribe = exports.fromSubscribe = function fromSubscribe(target) {
  var destroy;
  var obs$ = new _rxjs.Observable(function (observer) {
    destroy = (0, _reactantShare.subscribe)(target, function () {
      return observer.next();
    });
  });
  return obs$.pipe((0, _rxjs.share)(), (0, _rxjs.finalize)(function () {
    return destroy();
  }));
};
//# sourceMappingURL=fromSubscribe.js.map

"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromPortal = void 0;
var _rxjs = require("rxjs");
/**
 * flow way usage API, subscribe will exec portal open API,
 * when unsubscribe will auto close portal.
 *
 * @example
 * ```
 * fromPortal(() => this._modalView.open(this.confirmModal))
 * .pipe(
 *   answer({
 *     confirm: () =>
 *       of('confirm').pipe(
 *         tap(() => {
 *           // when confirm will auto switch to another flow
 *         }),
 *       ),
 *     cancel: () => {
 *       // also can do some thing without observable
 *     },
 *   }),
 *   tap((x) => {
 *     console.log(x); // x will be that original window confirm
 *   })
 * )
 * .subscribe();
 * ```
 */
var fromPortal = exports.fromPortal = function fromPortal(instanceFn) {
  return new _rxjs.Observable(function (subscribe) {
    var _instanceFn = instanceFn(),
      closed = _instanceFn.closed,
      close = _instanceFn.close;
    var innerClose = false;
    closed.then(function (result) {
      subscribe.next(result);
      innerClose = true;
      subscribe.complete();
    });
    return function () {
      if (innerClose) return;
      close();
    };
  });
};
//# sourceMappingURL=fromPortal.js.map

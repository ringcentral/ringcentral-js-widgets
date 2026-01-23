"use strict";

require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.answer = void 0;
var _rxjs = require("rxjs");
/**
 * answer flow for portal, switch to confirm or cancel,
 * alway switch to original result value when complete confirm or cancel exec
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
var answer = exports.answer = function answer(_ref) {
  var confirm = _ref.confirm,
    cancel = _ref.cancel;
  return (0, _rxjs.switchMap)(function (data, index) {
    var result = data ? confirm === null || confirm === void 0 ? void 0 : confirm(data, index) : cancel === null || cancel === void 0 ? void 0 : cancel(data, index);
    return (0, _rxjs.isObservable)(result) ? result.pipe((0, _rxjs.map)(function () {
      return data;
    })) : (0, _rxjs.of)(data);
  });
};
//# sourceMappingURL=answer.operator.js.map

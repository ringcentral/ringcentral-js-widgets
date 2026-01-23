"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAbortController = void 0;
var _rxjs = require("rxjs");
/**
 * abort controller with flow way, when unsubscribe,
 * abort controller will be abort, that can be use in abort fetch request
 *
 * @example
 * ```ts
 * const fetch$ = withAbortController(signal => fetch('url', { signal }));
 * const subscription = fetch$.subscribe();
 *
 * subscription.unsubscribe(); // abort fetch request
 * ```
 */
var withAbortController = exports.withAbortController = function withAbortController(fetcher) {
  return (0, _rxjs.defer)(function () {
    var controller = new AbortController();
    var signal = controller.signal;
    return (0, _rxjs.defer)(function () {
      return fetcher(signal);
    }).pipe((0, _rxjs.tap)(function () {
      return controller = null;
    }), (0, _rxjs.finalize)(function () {
      var _controller;
      return (_controller = controller) === null || _controller === void 0 ? void 0 : _controller.abort();
    }));
  });
};
//# sourceMappingURL=withAbortController.js.map

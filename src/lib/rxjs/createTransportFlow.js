"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitFlowResponded = exports.createTransportFlow = void 0;
require("core-js/modules/es.array.concat.js");
var _rxjs = require("rxjs");
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * a flow base transport instance, you can use that to work with flow way transport emit or listen
 *
 * @example
 * ```ts
 * const transportFlow = createTransportFlow(transport);
 *
 * transportFlow
 *   .listen$('login-success')
 *   .pipe(
 *     tap(() => {
 *       this._clientNotificationStatus();
 *     }),
 *     switchMap(() =>
 *       transportFlow.emit$({
 *         name: 'set-current-tz',
 *         response: true,
 *       }),
 *     ),
 *     tap(() => {
 *       console.log('set time zone successfully');
 *     }),
 *   )
 *   .subscribe();
 * ```
 */
var createTransportFlow = exports.createTransportFlow = function createTransportFlow(transport) {
  var emit$ = function emit$(options) {
    for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arg[_key - 1] = arguments[_key];
    }
    return (0, _rxjs.defer)(function () {
      return transport.emit.apply(transport, [options].concat(arg));
    });
  };
  var listen$ = function listen$(key, onValue) {
    return new _rxjs.Observable(function (observer) {
      var destroy = transport.listen(key, function (value) {
        observer.next(value);
        return onValue === null || onValue === void 0 ? void 0 : onValue(value);
      });
      return function () {
        destroy === null || destroy === void 0 ? void 0 : destroy();
      };
    });
  };
  return {
    /**
     * emit value with flow way.
     *
     * ### if you work with other connection tool, please make sure peer connected before emit value.
     *
     * like:
     *
     * @example
     * ```ts
     * adapterConnection.peerBeConnected$
     *    .pipe(
     *       switchMap(() => adapterConnection.emit$('example', value))
     *    )
     * ```
     */
    emit$: emit$,
    listen$: listen$
  };
};

/**
 * when you use listen and want flow be emit with responded inner value, use that wrap
 * @param getListener that source listener
 *
 * @example
 * ```ts
 * waitFlowResponded<string>((obs$) =>
      transportFlow.listen$(
        contactSwitcher.fullSyncStart,
        (clientId: string) => {
          obs$.next('example next flow');

          return 'some value'
        },
      ),
    ).pipe(
      tap((obs) => {
        console.log(obs); // should 'example next flow'
      }),
    );
 * ```
 */
var waitFlowResponded = exports.waitFlowResponded = function waitFlowResponded(getListener) {
  return (0, _rxjs.defer)(function () {
    var subject$ = new _rxjs.Subject();
    return (0, _rxjs.merge)(
    // subject must put in front, some sync method must be listen first
    subject$, getListener(subject$).pipe(
    // source never emit, all emit be handle by subject
    (0, _rxjs.switchMap)(function () {
      return _rxjs.NEVER;
    })));
  });
};
//# sourceMappingURL=createTransportFlow.js.map

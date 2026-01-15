"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromWatchValue = exports.fromWatch = void 0;
var _rxjs = require("rxjs");
var _usmRedux = require("../usm-redux");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * `watch` redux state change notifications to `Observable` flow, let you can control that in rxjs flow.
 *
 * that flow will get value when watch redux state change, if you also want get init state, can use `startWith` operator, that will provide you init state when subscribe.
 *
 * @example
 * ```ts
 * const obs$ = fromWatch(this, () => this.enable)
 *   .pipe(
 *     tap((e) => console.log(e)), // that will be triggered when enable be changed
 *   );
 *
 * obs$.subscribe();
 *
 * setEnable(false);
 * ```
 *
 * options same as `watch`, but not support `awaitPromise`, if you need wait one by one, can use `concatMap` to control flow by yourself.
 *
 * ### !!! if you want to use any `storage` value, must wait `target.ready$`, otherwise you will got default value
 */
var fromWatch = function fromWatch(target, cb, options) {
  var destroy;
  var obs$ = new _rxjs.Observable(function (observer) {
    destroy = (0, _usmRedux.watch)(target, cb, function (newValue) {
      return observer.next(newValue);
    }, _objectSpread({}, options));
  });
  return obs$.pipe((0, _rxjs.share)(), (0, _rxjs.finalize)(function () {
    return destroy();
  }));
};

/**
 * same logic with `fromWatch`, but give us the initial value when subscribe.
 *
 * ### !!! if you want to use any `storage` value, must wait `target.ready$`, otherwise you will got default value
 */
exports.fromWatch = fromWatch;
var fromWatchValue = function fromWatchValue(target, cb, options) {
  var watch$ = fromWatch(target, cb, options);

  // use defer to make suer startWith value be correctly
  return (0, _rxjs.defer)(function () {
    return watch$.pipe(
    // emit init value to subscription
    (0, _rxjs.startWith)(cb()));
  }).pipe((0, _rxjs.shareReplay)({
    bufferSize: 1,
    refCount: true
  }));
};
exports.fromWatchValue = fromWatchValue;
//# sourceMappingURL=fromWatch.js.map

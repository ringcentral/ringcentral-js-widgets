"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromWatchValue = exports.fromWatch = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _reactantShare = require("reactant-share");
var _rxjs = require("rxjs");
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
var fromWatch = exports.fromWatch = function fromWatch(target, cb, options) {
  var destroy;
  var obs$ = new _rxjs.Observable(function (observer) {
    destroy = (0, _reactantShare.watch)(target, cb, function (newValue) {
      return observer.next(newValue);
    }, _objectSpread({}, options));
  });
  return obs$.pipe((0, _rxjs.filter)(function () {
    // Check if target is connected to store (has storeKey)
    var hasStore = !!(target === null || target === void 0 ? void 0 : target[_reactantShare.storeKey]);
    return hasStore;
  }), (0, _rxjs.share)(), (0, _rxjs.finalize)(function () {
    return destroy();
  }));
};

/**
 * same logic with `fromWatch`, but give us the initial value when subscribe.
 *
 * ### !!! if you want to use any `storage` value, must wait `target.ready$`, otherwise you will got default value
 */
var fromWatchValue = exports.fromWatchValue = function fromWatchValue(target, cb, options) {
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
//# sourceMappingURL=fromWatch.js.map

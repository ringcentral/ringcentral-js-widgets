"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.root = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/esnext.global-this.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _isSharedWorker = require("./isSharedWorker");
var _isWebWorker = require("./isWebWorker");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); } /**
 * Thanks for following contributor of codes
 * https://gist.github.com/1866474
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/requestAnimationFrame/polyfill.js
 **/
// source: https://github.com/aluc-io/request-animation-frame-polyfill/blob/master/src/request-animation-frame-polyfill.ts
var uId = 1;
var uniqueId = function uniqueId() {
  return uId++;
};

// We use `self` instead of `window` for `WebWorker` support.
var root = exports.root = (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self.self == self ? self : (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global.global == global ? global : {};
var nowOffset = Date.now();

// use performance api if exist, otherwise use Date.now.
// Date.now polyfill required.
var pnow = function pnow() {
  if (root.performance && typeof root.performance.now === 'function') {
    return root.performance.now();
  }

  // fallback
  return Date.now() - nowOffset;
};
var reservedCBs = {};
var lastTime = Date.now();
var polyfillRaf = function polyfillRaf(callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  var currentTime = Date.now();
  var gap = currentTime - lastTime;
  var delay = gap > 16 ? 0 : 16 - gap;
  var id = uniqueId();
  reservedCBs[id] = callback;

  // keys(reservedCBs).length > 1 의미는 이미 setTimeout 이 걸려있는 경우.
  // 함께 callback 이 실행될 수 있게 reservedCBs 에만 추가해주고 return
  if (Object.keys(reservedCBs).length > 1) return id;
  setTimeout(function () {
    lastTime = currentTime;
    var copied = reservedCBs;
    reservedCBs = {};
    Object.keys(copied).forEach(function (key) {
      return copied[key](pnow());
    });
  }, delay);
  return id;
};
var polyfillCaf = function polyfillCaf(id) {
  delete reservedCBs[id];
};
var vendorPrefixes = ['', 'webkit', 'moz', 'ms', 'o'];
var getRequestAnimationFrame = function getRequestAnimationFrame(vp) {
  if (typeof vp !== 'string') return polyfillRaf;
  if (vp === '') return root['requestAnimationFrame'];
  return root[vp + 'RequestAnimationFrame'];
};
var getCancelAnimationFrame = function getCancelAnimationFrame(vp) {
  if (typeof vp !== 'string') return polyfillCaf;
  if (vp === '') return root['cancelAnimationFrame'];
  return root[vp + 'CancelAnimationFrame'] || root[vp + 'CancelRequestAnimationFrame'];
};
var find = function find(arr, predicate) {
  var i = 0;
  while (arr[i] !== void 0) {
    if (predicate(arr[i])) return arr[i];
    i = i + 1;
  }
};
var vp = find(vendorPrefixes, function (vp) {
  return !!getRequestAnimationFrame(vp);
});
if (_isWebWorker.isWebWorker || _isSharedWorker.isSharedWorker) {
  globalThis.requestAnimationFrame = getRequestAnimationFrame(vp);
  globalThis.cancelAnimationFrame = getCancelAnimationFrame(vp);
}
//# sourceMappingURL=requestAnimationFramePolyfill.js.map

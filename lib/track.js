"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.track = void 0;
var _RcModule = require("./RcModule");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * decorate a method with `Analytics` Module
 *
 * @param trackEvent define trackEvent for tracking
 */
var track = function track(trackEvent) {
  return function (target, name, descriptor) {
    if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) !== 'function' && typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.initializer) !== 'function') {
      throw new Error("@track decorated '".concat(name, "' is not a method"));
    }
    var fn = descriptor === null || descriptor === void 0 ? void 0 : descriptor.value;
    var initializer = descriptor.initializer;
    // eslint-disable-next-line func-names
    var trackedFn = function trackedFn() {
      var _ref = this.parentModule,
        analytics = _ref.analytics;
      if (typeof initializer === 'function') {
        fn = initializer.call(this);
      }
      if (typeof fn !== 'function') {
        throw new Error("@track decorated '".concat(name, "' is not a function"));
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var result = fn.apply(this, args);
      try {
        if (typeof (analytics === null || analytics === void 0 ? void 0 : analytics.track) === 'function') {
          if (typeof trackEvent === 'string') {
            analytics.track(trackEvent);
          } else {
            var trackReturn = trackEvent.apply(void 0, [this].concat(args));
            if (typeof trackReturn === 'function') {
              trackReturn = trackReturn(analytics);
            }
            if (Array.isArray(trackReturn)) {
              var _trackReturn = trackReturn,
                _trackReturn2 = _slicedToArray(_trackReturn, 2),
                _event = _trackReturn2[0],
                trackProps = _trackReturn2[1];
              if (_event) {
                analytics.track(_event, trackProps);
              }
            }
          }
        }
      } catch (e) {
        console.warn("Analytics Error: ".concat(target[_RcModule.identifierKey], ".").concat(name));
        console.error(e);
      }
      return result;
    };
    // the any type is just to be compatible with babel and tsc.
    return {
      enumerable: true,
      configurable: true,
      value: trackedFn
    };
  };
};
exports.track = track;
//# sourceMappingURL=track.js.map

"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.track = void 0;
var _RcModule = require("./RcModule");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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

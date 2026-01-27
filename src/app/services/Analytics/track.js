"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.track = void 0;
require("core-js/modules/es.array.concat.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _Analytics = require("./Analytics");
var _execTracking = require("./execTracking");
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-console */

/**
 * decorate a method with `Analytics` Module
 *
 * @param trackEvent define trackEvent for tracking
 * @param enable enable or disable tracking
 */
var track = exports.track = function track(trackEvent) {
  var enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return function (target, name, descriptor) {
    if (!enable) {
      return descriptor;
    }
    if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) !== 'function' && typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.initializer) !== 'function') {
      throw new Error("@track decorated '".concat(name, "' is not a method"));
    }
    var fn = descriptor === null || descriptor === void 0 ? void 0 : descriptor.value;
    var initializer = descriptor.initializer;
    // eslint-disable-next-line func-names
    var trackedFn = function trackedFn() {
      var analytics = null;
      try {
        analytics = (0, _nextCore.getRef)(this).container.got(_Analytics.Analytics);
      } catch (e) {
        //
      }
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
      if (!analytics) {
        return result;
      }
      try {
        (0, _execTracking.execTracking)(analytics, trackEvent, [this].concat(args));
      } catch (e) {
        console.warn("Analytics Error: ".concat((0, _nextCore.getRef)(target).identifier, ".").concat(name));
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
//# sourceMappingURL=track.js.map

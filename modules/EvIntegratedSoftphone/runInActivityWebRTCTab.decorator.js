"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runInActivityWebRTCTab = runInActivityWebRTCTab;
function runInActivityWebRTCTab() {
  return function (target, key, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
      if (this.isWebRTCTab) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return originalMethod.apply(this, args);
      }
    };
    return descriptor;
  };
}
//# sourceMappingURL=runInActivityWebRTCTab.decorator.js.map

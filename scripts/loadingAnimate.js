"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadingAnimate = void 0;
require("core-js/modules/web.timers.js");
var loadingAnimate = exports.loadingAnimate = function loadingAnimate(message) {
  var P = ['\\', '|', '/', '-'];
  var x = 0;
  var interval = setInterval(function () {
    process.stdout.write("  ".concat(message, "\r") + P[x++]);
    x &= 3;
  }, 250);
  return function () {
    clearInterval(interval);
  };
};
//# sourceMappingURL=loadingAnimate.js.map

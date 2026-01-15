"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindDebounce = bindDebounce;
require("core-js/modules/web.timers.js");
function bindDebounce(instance) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  return function (cb, time2) {
    clearTimeout(instance.changeTimeout);
    var toTime = typeof time2 === 'number' ? time2 : time;
    if (toTime === 0) {
      cb();
    } else {
      instance.changeTimeout = setTimeout(function () {
        cb();
      }, toTime);
    }
  };
}
//# sourceMappingURL=bindDebounce.js.map

"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindDebonce = bindDebonce;

function bindDebonce(instance) {
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
//# sourceMappingURL=bindDebonce.js.map

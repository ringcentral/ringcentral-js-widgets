"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = void 0;

var _subscribe = require("./subscribe");

var _utils = require("../utils");

var watch = function watch(service, selector, watcher) {
  if (typeof watcher !== 'function') {
    throw new Error("The 'watcher' should be a function.");
  }

  var oldValue = selector();
  return (0, _subscribe.subscribe)(service, function () {
    var newValue = selector();

    if (!(0, _utils.isEqual)(newValue, oldValue)) {
      var lastOldValue = oldValue;
      oldValue = newValue;
      watcher(newValue, lastOldValue);
    }
  });
};

exports.watch = watch;
//# sourceMappingURL=watch.js.map

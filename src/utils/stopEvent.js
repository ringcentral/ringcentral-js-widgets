"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPropagation = exports.stopDefaultEvents = exports.preventDefault = void 0;
var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};
exports.stopPropagation = stopPropagation;
var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};
exports.preventDefault = preventDefault;
var stopDefaultEvents = function stopDefaultEvents(e) {
  e.stopPropagation();
  e.preventDefault();
};
exports.stopDefaultEvents = stopDefaultEvents;
//# sourceMappingURL=stopEvent.js.map

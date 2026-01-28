"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPropagation = exports.stopDefaultEvents = exports.preventDefault = void 0;
var stopPropagation = exports.stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};
var preventDefault = exports.preventDefault = function preventDefault(e) {
  return e.preventDefault();
};
var stopDefaultEvents = exports.stopDefaultEvents = function stopDefaultEvents(e) {
  e.stopPropagation();
  e.preventDefault();
};
//# sourceMappingURL=stopEvent.js.map

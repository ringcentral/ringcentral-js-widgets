"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyObject = exports.emptyFn = exports.emptyArray = void 0;
require("core-js/modules/es.object.freeze.js");
var emptyFn = exports.emptyFn = function emptyFn() {
  //
};
var emptyArray = exports.emptyArray = Object.freeze([]);
var emptyObject = exports.emptyObject = Object.freeze({});
//# sourceMappingURL=empty.js.map

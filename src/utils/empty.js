"use strict";

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyObject = exports.emptyFn = exports.emptyArray = void 0;

var emptyFn = function emptyFn() {};

exports.emptyFn = emptyFn;
var emptyArray = Object.freeze([]);
exports.emptyArray = emptyArray;
var emptyObject = Object.freeze({});
exports.emptyObject = emptyObject;
//# sourceMappingURL=empty.js.map

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (arr, prefix) {
  return arr.reduce(function (acc, name) {
    return Object.assign(acc, _defineProperty({}, name, prefix + "__" + name));
  }, {});
};
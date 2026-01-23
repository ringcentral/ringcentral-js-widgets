"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSerializable = isSerializable;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Checks if a value or its children contain React nodes
 * @param value - The value to check
 * @returns boolean indicating if the value contains React nodes
 */
function hasReactNodes(value) {
  // Check if the value itself is a React node
  if (/*#__PURE__*/_react["default"].isValidElement(value)) {
    return true;
  }

  // Check if it's an array
  if (Array.isArray(value)) {
    return value.some(function (item) {
      return hasReactNodes(item);
    });
  }

  // Check if it's an object
  if (_typeof(value) === 'object' && value !== null) {
    // Check all properties of the object
    return Object.values(value).some(function (prop) {
      return hasReactNodes(prop);
    });
  }
  return false;
}

/**
 * Checks if a value is serializable (does not contain React nodes or other non-serializable values)
 * @param value - The value to check
 * @returns boolean indicating if the value is serializable
 */
function isSerializable(value) {
  JSON.stringify(value);
  if (hasReactNodes(value)) {
    throw new Error('The value contains React nodes');
  }
  return true;
}
//# sourceMappingURL=validateArgsToWorker.js.map

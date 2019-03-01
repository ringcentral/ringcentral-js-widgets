"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;
exports.getTimestampReducer = getTimestampReducer;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.is-array");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        data = _ref.data,
        id = _ref.id;

    switch (type) {
      case types.fetchSuccess:
        return Array.isArray(data) ? data.filter(function (item) {
          return item.status !== 'Disabled';
        }) : data;

      case types.add:
        return Array.isArray(state) ? [].concat(_toConsumableArray(state), [data]) : null;

      case types.delete:
        return Array.isArray(state) ? state.filter(function (item) {
          return item.id !== id;
        }) : null;

      case types.update:
        {
          return Array.isArray(state) ? state.filter(function (item) {
            return item.id !== id;
          }).concat(data) : null;
        }

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        timestamp = _ref2.timestamp;

    switch (type) {
      case types.fetchSuccess:
      case types.add:
      case types.delete:
        return timestamp;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}
//# sourceMappingURL=getAccountDirectoryReducer.js.map

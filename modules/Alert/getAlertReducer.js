"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessagesReducer = getMessagesReducer;
exports["default"] = getAlertReducer;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

var _redux = require("redux");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getMessagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        message = _ref.message,
        payload = _ref.payload,
        ttl = _ref.ttl,
        level = _ref.level,
        ids = _ref.ids,
        timestamp = _ref.timestamp,
        id = _ref.id,
        allowDuplicates = _ref.allowDuplicates;

    switch (type) {
      case types.alert:
        if (!allowDuplicates && state.find(function (item) {
          return item.message === message && item.level === level;
        })) {
          return state;
        }

        return [].concat(_toConsumableArray(state), [{
          id: id,
          message: message,
          payload: payload,
          ttl: ttl,
          level: level,
          timestamp: timestamp
        }]);

      case types.dismiss:
        return state.filter(function (item) {
          return ids.indexOf(item.id) === -1;
        });

      case types.dismissAll:
        return [];

      default:
        return state;
    }
  };
}

function getAlertReducer(types) {
  return (0, _redux.combineReducers)({
    messages: getMessagesReducer(types)
  });
}
//# sourceMappingURL=getAlertReducer.js.map

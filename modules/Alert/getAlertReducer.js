"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessagesReducer = getMessagesReducer;
exports["default"] = getAlertReducer;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

var _redux = require("redux");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
        allowDuplicates = _ref.allowDuplicates,
        loading = _ref.loading,
        backdrop = _ref.backdrop,
        classes = _ref.classes,
        onBackdropClick = _ref.onBackdropClick,
        action = _ref.action;

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
          timestamp: timestamp,
          loading: loading,
          backdrop: backdrop,
          classes: classes,
          onBackdropClick: onBackdropClick,
          action: action
        }]);

      case types.update:
        return state.map(function (item) {
          return item.id === id ? _objectSpread(_objectSpread({}, item), {}, {
            message: message,
            loading: loading,
            action: action
          }) : item;
        });

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

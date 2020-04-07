"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getStorageReducer;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

var _redux = require("redux");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getCallsMappingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        identify = _ref.identify;

    switch (type) {
      case types.update:
        if (state[identify] && state[identify].isEdited) {
          return state;
        }

        return _objectSpread({}, state, _defineProperty({}, identify, _objectSpread({}, state[identify], {
          isEdited: true
        })));

      case types.saving:
        return _objectSpread({}, state, _defineProperty({}, identify, _objectSpread({}, state[identify])));

      case types.saveSuccess:
        return _objectSpread({}, state, _defineProperty({}, identify, _objectSpread({}, state[identify], {
          isEdited: false,
          isSucceed: true
        })));

      case types.saveError:
        return _objectSpread({}, state, _defineProperty({}, identify, _objectSpread({}, state[identify], {
          isEdited: true,
          isSucceed: false
        })));

      case types.cleanUp:
        return {};

      default:
        return state;
    }
  };
}

function getCallsListReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        identify = _ref2.identify;

    switch (type) {
      case types.update:
      case types.saving:
      case types.saveSuccess:
      case types.saveError:
        return Array.from(new Set([].concat(_toConsumableArray(state), [identify])));

      case types.cleanUp:
        return [];

      default:
        return state;
    }
  };
}

function getCurrentIdentifyReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        identify = _ref3.identify;

    switch (type) {
      case types.showLogSection:
        return identify;

      case types.closeLogSection:
        return null;

      default:
        return state;
    }
  };
}

function getCurrentNotificationIdentifyReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        identify = _ref4.identify;

    switch (type) {
      case types.showLogNotification:
        return identify;

      case types.closeLogNotification:
        return null;

      default:
        return state;
    }
  };
}

function getNotificationIsExpandReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type;

    switch (type) {
      case types.expandNotification:
        return true;

      case types.shrinkNotification:
      case types.closeLogNotification:
        return false;

      default:
        return state;
    }
  };
}

function getStorageReducer(types) {
  return (0, _redux.combineReducers)({
    callsList: getCallsListReducer(types),
    callsMapping: getCallsMappingReducer(types),
    currentIdentify: getCurrentIdentifyReducer(types),
    currentNotificationIdentify: getCurrentNotificationIdentifyReducer(types),
    notificationIsExpand: getNotificationIsExpandReducer(types)
  });
}
//# sourceMappingURL=getStorageReducer.js.map

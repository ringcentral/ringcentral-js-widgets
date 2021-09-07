"use strict";

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentIdentifyReducer = getCurrentIdentifyReducer;
exports.getCurrentNotificationIdentifyReducer = getCurrentNotificationIdentifyReducer;
exports.getNotificationIsExpandReducer = getNotificationIsExpandReducer;
exports["default"] = getStorageReducer;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.date.now");

var _redux = require("redux");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getCallsMappingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        identify = _ref.identify;

    var originalState = state[identify];

    switch (type) {
      case types.update:
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, identify, _objectSpread(_objectSpread({}, originalState), {}, {
          latestUpdateTime: Date.now(),
          isEdited: true
        })));

      case types.saving:
      case types.syncing:
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, identify, _objectSpread(_objectSpread({}, originalState), {}, {
          latestSaveTime: Date.now()
        })));

      case types.saveSuccess:
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, identify, _objectSpread(_objectSpread({}, originalState), {}, {
          isSucceed: true,
          isEdited: !!((originalState === null || originalState === void 0 ? void 0 : originalState.latestUpdateTime) && (originalState === null || originalState === void 0 ? void 0 : originalState.latestSaveTime) && (originalState === null || originalState === void 0 ? void 0 : originalState.latestSaveTime) < (originalState === null || originalState === void 0 ? void 0 : originalState.latestUpdateTime))
        })));

      case types.saveError:
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, identify, _objectSpread(_objectSpread({}, originalState), {}, {
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
  var notSyncOpenState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var baseReducer = {
    callsList: getCallsListReducer(types),
    callsMapping: getCallsMappingReducer(types)
  };
  var openStateReducer = {
    currentIdentify: getCurrentIdentifyReducer(types),
    currentNotificationIdentify: getCurrentNotificationIdentifyReducer(types),
    notificationIsExpand: getNotificationIsExpandReducer(types)
  };

  var reducers = _objectSpread(_objectSpread({}, baseReducer), notSyncOpenState ? {} : openStateReducer);

  return (0, _redux.combineReducers)(reducers);
}
//# sourceMappingURL=getStorageReducer.js.map

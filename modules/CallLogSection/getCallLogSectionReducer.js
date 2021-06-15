"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCallLogSectionReducer;

require("core-js/modules/es6.object.define-property");

var _ramda = require("ramda");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("ringcentral-integration/lib/getModuleStatusReducer"));

var _getStorageReducer = require("./getStorageReducer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getCallsSavingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        identify = _ref.identify;

    switch (type) {
      case types.saving:
        return (0, _ramda.assoc)(identify, true, state);

      case types.saveSuccess:
      case types.saveError:
        return (0, _ramda.assoc)(identify, false, state);

      case types.cleanUp:
        return {};

      default:
        return state;
    }
  };
}

function getCallLogSectionReducer(types) {
  var notSyncOpenState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var baseReducers = {
    status: (0, _getModuleStatusReducer["default"])(types),
    callsSavingStatus: getCallsSavingStatusReducer(types)
  };
  var openStateReducer = {
    currentIdentify: (0, _getStorageReducer.getCurrentIdentifyReducer)(types),
    currentNotificationIdentify: (0, _getStorageReducer.getCurrentNotificationIdentifyReducer)(types),
    notificationIsExpand: (0, _getStorageReducer.getNotificationIsExpandReducer)(types)
  };

  var reducers = _objectSpread(_objectSpread({}, baseReducers), notSyncOpenState ? openStateReducer : {});

  return (0, _redux.combineReducers)(reducers);
}
//# sourceMappingURL=getCallLogSectionReducer.js.map

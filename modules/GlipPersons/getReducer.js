"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlipPersonsStatusReducer = getGlipPersonsStatusReducer;
exports.getGlipPersonStoreReducer = getGlipPersonStoreReducer;
exports["default"] = getGlipPostsReducer;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _status = _interopRequireDefault(require("./status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getGlipPersonsStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status["default"].idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.fetch:
        return _status["default"].fetching;

      case types.fetchError:
      case types.fetchSuccess:
      case types.batchFetchSuccess:
        return _status["default"].idle;

      default:
        return state;
    }
  };
}

function getGlipPersonStoreReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        person = _ref2.person,
        persons = _ref2.persons;

    var newState;

    switch (type) {
      case types.fetchSuccess:
        newState = _objectSpread({}, state);
        newState[person.id] = person;
        return newState;

      case types.batchFetchSuccess:
        newState = _objectSpread({}, state);
        persons.forEach(function (p) {
          if (p.id) {
            newState[p.id] = p;
          }
        });
        return newState;

      case types.cleanUp:
      case types.resetSuccess:
        return {};

      default:
        return state;
    }
  };
}

function getGlipPostsReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
    status: (0, _getModuleStatusReducer["default"])(types),
    glipPostsStatus: getGlipPersonsStatusReducer(types)
  }));
}
//# sourceMappingURL=getReducer.js.map

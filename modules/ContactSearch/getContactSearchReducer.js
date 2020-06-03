"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContactSearchStatusReducer = getContactSearchStatusReducer;
exports.getSearchingReducer = getSearchingReducer;
exports["default"] = getContactSearchReducer;

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

require("core-js/modules/es6.regexp.search");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _contactSearchStatus = _interopRequireDefault(require("./contactSearchStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getContactSearchStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _contactSearchStatus["default"].idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.search:
        return _contactSearchStatus["default"].searching;

      case types.prepareSearch:
      case types.searchSuccess:
      case types.searchError:
        return _contactSearchStatus["default"].idle;

      default:
        return state;
    }
  };
}

function getSearchingReducer(types) {
  var initialState = {
    searchOnSources: [],
    searchString: '',
    result: []
  };
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        searchOnSources = _ref2.searchOnSources,
        searchString = _ref2.searchString,
        entities = _ref2.entities;

    switch (type) {
      case types.searchSuccess:
        if (state.searchString === searchString && state.searchOnSources.join(',') === searchOnSources.join(',')) {
          var resultMap = {};
          var newResult = [];
          state.result.forEach(function (item) {
            resultMap[item.id] = 1;
            newResult.push(item);
          });
          entities.forEach(function (item) {
            if (resultMap[item.id]) {
              return;
            }

            newResult.push(item);
            resultMap[item.id] = 1;
          });
          return _objectSpread(_objectSpread({}, state), {}, {
            result: newResult
          });
        }

        return {
          searchOnSources: searchOnSources,
          searchString: searchString,
          result: entities
        };

      case types.resetSuccess:
      case types.prepareSearch:
      case types.reset:
      case types.searchError:
        return initialState;

      case types.search:
      default:
        return state;
    }
  };
}

function getContactSearchReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
    status: (0, _getModuleStatusReducer["default"])(types),
    searchStatus: getContactSearchStatusReducer(types),
    searching: getSearchingReducer(types)
  }));
}
//# sourceMappingURL=getContactSearchReducer.js.map

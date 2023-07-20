"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getReducer;
exports.getCurrentGroupIdReducer = getCurrentGroupIdReducer;
exports.getDataReducer = getDataReducer;
exports.getSearchFilterReducer = getSearchFilterReducer;
exports.getTimestampReducer = getTimestampReducer;
var _redux = require("redux");
var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      data = _ref.data,
      group = _ref.group;
    switch (type) {
      case types.fetchSuccess:
        return data && data.records;
      case types.updateGroup:
        return [group].concat(state.filter(function (g) {
          return g.id !== group.id;
        }));
      case types.removeGroup:
        return state.filter(function (g) {
          return g.id !== group.id;
        });
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}
function getSearchFilterReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref2.type,
      searchFilter = _ref2.searchFilter;
    switch (type) {
      case types.updateFilter:
        if (searchFilter !== null && searchFilter !== undefined) {
          return searchFilter;
        }
        return state;
      default:
        return state;
    }
  };
}
function getCurrentGroupIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref3.type,
      groupId = _ref3.groupId;
    switch (type) {
      case types.updateCurrentGroupId:
        return groupId;
      default:
        return state;
    }
  };
}
function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref4.type,
      timestamp = _ref4.timestamp;
    switch (type) {
      case types.fetchSuccess:
        return timestamp;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}
function getReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
    status: (0, _getModuleStatusReducer["default"])(types),
    searchFilter: getSearchFilterReducer(types),
    currentGroupId: getCurrentGroupIdReducer(types)
  }));
}
//# sourceMappingURL=getReducer.js.map

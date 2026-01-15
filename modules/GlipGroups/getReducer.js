"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getReducer;
exports.getCurrentGroupIdReducer = getCurrentGroupIdReducer;
exports.getDataReducer = getDataReducer;
exports.getSearchFilterReducer = getSearchFilterReducer;
exports.getTimestampReducer = getTimestampReducer;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
var _redux = require("redux");
var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        return [group].concat(state.filter(function (g) {
          return g.id !== group.id;
        }));
      case types.removeGroup:
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
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

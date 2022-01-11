"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getContactsReducer;
exports.getSearchFilterReducer = getSearchFilterReducer;
exports.getSourceFilterReducer = getSourceFilterReducer;

var _redux = require("redux");

var _contactHelper = require("../../lib/contactHelper");

var _getModuleStatusReducer = require("../../lib/getModuleStatusReducer");

function getSearchFilterReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        searchFilter = _ref.searchFilter;

    switch (type) {
      case types.updateFilter:
        if (searchFilter !== null && searchFilter !== undefined) {
          return searchFilter;
        }

        return state;

      case types.resetSuccess:
        return '';

      default:
        return state;
    }
  };
}

function getSourceFilterReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _contactHelper.AllContactSourceName;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        sourceFilter = _ref2.sourceFilter;

    switch (type) {
      case types.updateFilter:
        if (sourceFilter !== null && sourceFilter !== undefined) {
          return sourceFilter;
        }

        return state;

      case types.resetSuccess:
        return _contactHelper.AllContactSourceName;

      default:
        return state;
    }
  };
}

function getContactsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.getModuleStatusReducer)(types),
    searchFilter: getSearchFilterReducer(types),
    sourceFilter: getSourceFilterReducer(types)
  });
}
//# sourceMappingURL=getContactsReducer.js.map

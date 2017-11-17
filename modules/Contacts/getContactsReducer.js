'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchFilterReducer = getSearchFilterReducer;
exports.getSourceFilterReducer = getSourceFilterReducer;
exports.getPageNumberReducer = getPageNumberReducer;
exports.default = getContactsReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _contactHelper = require('../../lib/contactHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSearchFilterReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref = arguments[1];
    var type = _ref.type,
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
    var _ref2 = arguments[1];
    var type = _ref2.type,
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

function getPageNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        pageNumber = _ref3.pageNumber;

    switch (type) {
      case types.updateFilter:
        if (pageNumber) {
          return pageNumber;
        }
        return state;
      case types.resetSuccess:
        return 1;
      default:
        return state;
    }
  };
}

function getContactsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    searchFilter: getSearchFilterReducer(types),
    sourceFilter: getSourceFilterReducer(types),
    pageNumber: getPageNumberReducer(types)
  });
}
//# sourceMappingURL=getContactsReducer.js.map

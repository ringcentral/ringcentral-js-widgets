'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getDataReducer = getDataReducer;
exports.getPageNumberReducer = getPageNumberReducer;
exports.getSearchFilterReducer = getSearchFilterReducer;
exports.getCurrentGroupIdReducer = getCurrentGroupIdReducer;
exports.getTimestampReducer = getTimestampReducer;
exports.default = getReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
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

function getPageNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        pageNumber = _ref2.pageNumber;

    switch (type) {
      case types.updateFilter:
        if (pageNumber) {
          return pageNumber;
        }
        return state;
      default:
        return state;
    }
  };
}

function getSearchFilterReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref3 = arguments[1];
    var type = _ref3.type,
        searchFilter = _ref3.searchFilter;

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
    var _ref4 = arguments[1];
    var type = _ref4.type,
        groupId = _ref4.groupId;

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
    var _ref5 = arguments[1];
    var type = _ref5.type,
        timestamp = _ref5.timestamp;

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

  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(types),
    searchFilter: getSearchFilterReducer(types),
    pageNumber: getPageNumberReducer(types)
  }));
}
//# sourceMappingURL=getReducer.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getMatchingReducer = getMatchingReducer;
exports.default = getMatcherReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMatchingReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        sourceName = _ref.sourceName,
        queries = _ref.queries;

    var deleteKeys = void 0;
    switch (type) {
      case actionTypes.match:
        return state.concat(queries.map(function (query) {
          return (0, _helpers.getCacheKey)(sourceName, query);
        }));

      case actionTypes.matchSuccess:
      case actionTypes.matchError:
        deleteKeys = queries.map(function (query) {
          return (0, _helpers.getCacheKey)(sourceName, query);
        });
        return state.filter(function (key) {
          return deleteKeys.indexOf(key) === -1;
        });

      case actionTypes.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

function getMatcherReducer(actionTypes) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(actionTypes),
    matching: getMatchingReducer(actionTypes)
  }));
}
//# sourceMappingURL=getMatcherReducer.js.map

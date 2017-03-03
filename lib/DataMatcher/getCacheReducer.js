'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.getMatchRecordReducer = getMatchRecordReducer;
exports.getDataMapReducer = getDataMapReducer;
exports.default = getStorageReducer;

var _redux = require('redux');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMatchRecordReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        data = _ref.data,
        sourceName = _ref.sourceName,
        expiredKeys = _ref.expiredKeys;

    switch (type) {
      case actionTypes.matchSuccess:
        {
          var now = Date.now();
          var entries = {};
          (0, _keys2.default)(data).forEach(function (query) {
            var result = data[query].length ? _helpers.matchResult.found : _helpers.matchResult.notFound;
            entries[(0, _helpers.getCacheKey)(sourceName, query)] = {
              result: result,
              timestamp: now
            };
          });
          return (0, _extends3.default)({}, state, entries);
        }
      case actionTypes.cleanUp:
      case actionTypes.initSuccess:
        if (expiredKeys.length) {
          var newState = {};
          (0, _keys2.default)(state).forEach(function (key) {
            if (expiredKeys.indexOf(key) === -1) {
              newState[key] = state[key];
            }
          });
          return newState;
        }
        return state;
      default:
        return state;
    }
  };
}

function getDataMapReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        data = _ref2.data,
        sourceName = _ref2.sourceName,
        expiredKeys = _ref2.expiredKeys;

    switch (type) {
      case actionTypes.matchSuccess:
        {
          var newState = (0, _extends3.default)({}, state);
          (0, _keys2.default)(data).forEach(function (query) {
            if (newState[query] && newState[query].length > 0) {
              newState[query] = newState[query].filter(function (item) {
                return item.source !== sourceName;
              });
            } else {
              newState[query] = [];
            }
            if (data[query] && data[query].length > 0) {
              newState[query] = newState[query].concat(data[query].map(function (item) {
                return (0, _extends3.default)({}, item, {
                  source: sourceName
                });
              }));
            }
          });
          return newState;
        }
      case actionTypes.cleanUp:
      case actionTypes.initSuccess:
        if (expiredKeys.length) {
          var deleteMap = {};
          expiredKeys.forEach(function (key) {
            var _parseCacheKey = (0, _helpers.parseCacheKey)(key),
                _parseCacheKey2 = (0, _slicedToArray3.default)(_parseCacheKey, 2),
                source = _parseCacheKey2[0],
                query = _parseCacheKey2[1];

            if (!deleteMap[query]) deleteMap[query] = {};
            deleteMap[query][source] = true;
          });
          var _newState = {};
          (0, _keys2.default)(state).forEach(function (query) {
            var newSet = state[query].filter(function (item) {
              return !(deleteMap[query] && deleteMap[query][item.source]);
            });
            if (newSet.length > 0) {
              _newState[query] = newSet;
            }
          });
          return _newState;
        }
        return state;
      default:
        return state;
    }
  };
}

function getStorageReducer(actionTypes) {
  return (0, _redux.combineReducers)({
    dataMap: getDataMapReducer(actionTypes),
    matchRecord: getMatchRecordReducer(actionTypes)
  });
}
//# sourceMappingURL=getCacheReducer.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getGlipPersonsStatusReducer = getGlipPersonsStatusReducer;
exports.getGlipPersonStoreReducer = getGlipPersonStoreReducer;
exports.default = getGlipPostsReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getGlipPersonsStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _status2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.fetch:
        return _status2.default.fetching;
      case types.fetchError:
      case types.fetchSuccess:
      case types.batchFetchSuccess:
        return _status2.default.idle;
      default:
        return state;
    }
  };
}

function getGlipPersonStoreReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        person = _ref2.person,
        persons = _ref2.persons;

    var newState = void 0;
    switch (type) {
      case types.fetchSuccess:
        newState = (0, _extends3.default)({}, state);
        newState[person.id] = person;
        return newState;
      case types.batchFetchSuccess:
        newState = (0, _extends3.default)({}, state);
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

  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(types),
    glipPostsStatus: getGlipPersonsStatusReducer(types)
  }));
}
//# sourceMappingURL=getReducer.js.map

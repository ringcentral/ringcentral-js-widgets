'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getContactSearchReducer = getContactSearchReducer;
exports.default = getCacheReducer;

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContactSearchReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        entities = _ref.entities,
        sourceName = _ref.sourceName,
        searchString = _ref.searchString;

    var data = {};
    var key = null;
    switch (type) {
      case types.save:
        key = sourceName + '-' + searchString;
        data[key] = {
          entities: entities,
          timestamp: Date.now()
        };
        return (0, _extends3.default)({}, state, data);
      case types.initSuccess:
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

function getCacheReducer(types) {
  return (0, _redux.combineReducers)({
    contactSearch: getContactSearchReducer(types)
  });
}
//# sourceMappingURL=getCacheReducer.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
        searchString = _ref.searchString,
        ttl = _ref.ttl;

    switch (type) {
      case types.save:
        {
          var data = {};
          (0, _keys2.default)(state).forEach(function (key) {
            if (Date.now() - state[key].timestamp < ttl) {
              data[key] = state[key];
            }
          });
          var key = sourceName + '-' + searchString;
          data[key] = {
            entities: entities,
            timestamp: Date.now()
          };
          return data;
        }
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

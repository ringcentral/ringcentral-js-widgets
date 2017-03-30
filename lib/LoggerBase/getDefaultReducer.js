'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoggingListReducer = getLoggingListReducer;
exports.default = getDefaultReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLoggingListReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        name = _ref.name,
        id = _ref.id;

    switch (type) {
      case types.log:
        {
          if (state.find(function (item) {
            return item.name === name && item.id === id;
          })) {
            return state;
          }
          return state.concat({
            name: name,
            id: id
          });
        }
      case types.logSuccess:
      case types.logError:
        {
          return state.filter(function (item) {
            return !(item.id === id && item.name === name);
          });
        }
      default:
        return state;
    }
  };
}

function getDefaultReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    loggingList: getLoggingListReducer(types)
  });
}
//# sourceMappingURL=getDefaultReducer.js.map

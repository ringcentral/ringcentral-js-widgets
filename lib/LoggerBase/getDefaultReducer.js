'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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
        id = _ref.id;

    switch (type) {
      case types.log:
        {
          if (state.indexOf(id) > -1) {
            return state;
          }
          return [].concat((0, _toConsumableArray3.default)(state), [id]);
        }
      case types.logSuccess:
      case types.logError:
        {
          return state.filter(function (item) {
            return item !== id;
          });
        }
      case types.resetSuccess:
        return [];
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

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCallLogSectionReducer;

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _redux = require('redux');

var _getModuleStatusReducer = require('ringcentral-integration/lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getCallsSavingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        identify = _ref.identify;

    switch (type) {
      case types.saving:
        return R.assoc(identify, true, state);
      case types.saveSuccess:case types.saveError:
        return R.assoc(identify, false, state);
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

function getCallLogSectionReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    callsSavingStatus: getCallsSavingStatusReducer(types)
  });
}
//# sourceMappingURL=getCallLogSectionReducer.js.map

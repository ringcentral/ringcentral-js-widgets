'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCallLogSectionReducer;

var _ramda = require('ramda');

var _redux = require('redux');

var _getModuleStatusReducer = require('ringcentral-integration/lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallsSavingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        identify = _ref.identify;

    switch (type) {
      case types.saving:
        return (0, _ramda.assoc)(identify, true, state);
      case types.saveSuccess:case types.saveError:
        return (0, _ramda.assoc)(identify, false, state);
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

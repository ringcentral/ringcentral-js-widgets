"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCallLogSectionReducer;

var _ramda = require("ramda");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("ringcentral-integration/lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallsSavingStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        identify = _ref.identify;

    switch (type) {
      case types.saving:
        return (0, _ramda.assoc)(identify, true, state);

      case types.saveSuccess:
      case types.saveError:
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
    status: (0, _getModuleStatusReducer.default)(types),
    callsSavingStatus: getCallsSavingStatusReducer(types)
  });
}
//# sourceMappingURL=getCallLogSectionReducer.js.map

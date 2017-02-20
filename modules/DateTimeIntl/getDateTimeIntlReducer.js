'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateTimeIntlStatusReducer = getDateTimeIntlStatusReducer;
exports.getLastErrorReducer = getLastErrorReducer;
exports.default = getDateTimeIntlReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _dateTimeIntlStatus = require('./dateTimeIntlStatus');

var _dateTimeIntlStatus2 = _interopRequireDefault(_dateTimeIntlStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDateTimeIntlStatusReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _dateTimeIntlStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case actionTypes.fetch:
        return _dateTimeIntlStatus2.default.fetching;
      case actionTypes.fetchSuccess:
      case actionTypes.fetchError:
        return _dateTimeIntlStatus2.default.idle;
      default:
        return state;
    }
  };
}

function getLastErrorReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        error = _ref2.error;

    switch (type) {

      case actionTypes.fetchError:
        return error;

      case actionTypes.reset:
        return null;

      default:
        return state;
    }
  };
}

function getDateTimeIntlReducer(actionTypes) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(actionTypes),
    dateTimeIntlstatus: getDateTimeIntlStatusReducer(actionTypes),
    lastError: getLastErrorReducer(actionTypes)
  });
}
//# sourceMappingURL=getDateTimeIntlReducer.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusReducer = getStatusReducer;
exports.getCountryCodeReducer = getCountryCodeReducer;
exports.getAreaCodeReducer = getAreaCodeReducer;
exports.default = getRegionSettingsReducer;

var _redux = require('redux');

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatus2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.init:
        return _moduleStatus2.default.initializing;
      case types.initSuccess:
        return _moduleStatus2.default.ready;
      case types.reset:
        return _moduleStatus2.default.pending;
      default:
        return state;
    }
  };
}

function getCountryCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        _ref2$countryCode = _ref2.countryCode,
        countryCode = _ref2$countryCode === undefined ? state : _ref2$countryCode;

    if (type === types.setData) return countryCode;
    return state;
  };
}

function getAreaCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref3 = arguments[1];
    var type = _ref3.type,
        _ref3$areaCode = _ref3.areaCode,
        areaCode = _ref3$areaCode === undefined ? state : _ref3$areaCode;

    if (type === types.setData) return areaCode;
    return state;
  };
}

function getRegionSettingsReducer(types) {
  return (0, _redux.combineReducers)({
    status: getStatusReducer(types)
  });
}
//# sourceMappingURL=getRegionSettingsReducer.js.map

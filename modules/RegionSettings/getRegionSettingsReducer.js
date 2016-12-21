'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountryCodeReducer = getCountryCodeReducer;
exports.getAreaCodeReducer = getAreaCodeReducer;
exports.default = getRegionSettingsReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCountryCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        _ref$countryCode = _ref.countryCode,
        countryCode = _ref$countryCode === undefined ? state : _ref$countryCode;

    if (type === types.setData) return countryCode;
    return state;
  };
}

function getAreaCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref2 = arguments[1];
    var type = _ref2.type,
        _ref2$areaCode = _ref2.areaCode,
        areaCode = _ref2$areaCode === undefined ? state : _ref2$areaCode;

    if (type === types.setData) return areaCode;
    return state;
  };
}

function getRegionSettingsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getRegionSettingsReducer.js.map

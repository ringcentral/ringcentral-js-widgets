"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountryCodeReducer = getCountryCodeReducer;
exports.getAreaCodeReducer = getAreaCodeReducer;
exports.default = getRegionSettingsReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCountryCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$countryCode = _ref.countryCode,
        countryCode = _ref$countryCode === void 0 ? state : _ref$countryCode;

    if (type === types.setData) return countryCode;
    return state;
  };
}

function getAreaCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        _ref2$areaCode = _ref2.areaCode,
        areaCode = _ref2$areaCode === void 0 ? state : _ref2$areaCode;

    if (type === types.setData) return areaCode;
    return state;
  };
}

function getRegionSettingsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.default)(types)
  });
}
//# sourceMappingURL=getRegionSettingsReducer.js.map

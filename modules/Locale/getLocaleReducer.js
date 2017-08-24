'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentLocaleReducer = getCurrentLocaleReducer;
exports.default = getLocaleReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _detectDefaultLocale = require('../../lib/detectDefaultLocale');

var _detectDefaultLocale2 = _interopRequireDefault(_detectDefaultLocale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrentLocaleReducer(_ref) {
  var defaultLocale = _ref.defaultLocale,
      types = _ref.types;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _detectDefaultLocale2.default)(defaultLocale);
    var _ref2 = arguments[1];
    var type = _ref2.type,
        locale = _ref2.locale;

    if (type === types.setLocale) return locale;
    return state;
  };
}

function getLocaleReducer(_ref3) {
  var defaultLocale = _ref3.defaultLocale,
      types = _ref3.types;

  return (0, _redux.combineReducers)({
    currentLocale: getCurrentLocaleReducer({ defaultLocale: defaultLocale, types: types }),
    status: (0, _getModuleStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getLocaleReducer.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentLocaleReducer = getCurrentLocaleReducer;
exports.default = getProxyReducer;

var _redux = require('redux');

var _detectDefaultLocale = require('../../lib/detectDefaultLocale');

var _detectDefaultLocale2 = _interopRequireDefault(_detectDefaultLocale);

var _getProxyStatusReducer = require('../../lib/getProxyStatusReducer');

var _getProxyStatusReducer2 = _interopRequireDefault(_getProxyStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrentLocaleReducer(_ref) {
  var defaultLocale = _ref.defaultLocale,
      types = _ref.types;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _detectDefaultLocale2.default)(defaultLocale);
    var _ref2 = arguments[1];
    var type = _ref2.type,
        locale = _ref2.locale;

    if (type === types.syncProxyLocale) return locale;
    return state;
  };
}

function getProxyReducer(_ref3) {
  var defaultLocale = _ref3.defaultLocale,
      types = _ref3.types;

  return (0, _redux.combineReducers)({
    currentLocale: getCurrentLocaleReducer({ defaultLocale: defaultLocale, types: types }),
    status: (0, _getProxyStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getProxyReducer.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusReducer = getStatusReducer;
exports.getCurrentLocaleReducer = getCurrentLocaleReducer;
exports.default = getLocaleReducer;

var _redux = require('redux');

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _detectDefaultLocale = require('../../lib/detectDefaultLocale');

var _detectDefaultLocale2 = _interopRequireDefault(_detectDefaultLocale);

var _localeRegExp = require('../../lib/localeRegExp');

var _localeRegExp2 = _interopRequireDefault(_localeRegExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatus2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    if (type === types.init) return _moduleStatus2.default.ready;
    return state;
  };
}

function getCurrentLocaleReducer(_ref2) {
  var defaultLocale = _ref2.defaultLocale,
      types = _ref2.types;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _detectDefaultLocale2.default)(defaultLocale);
    var _ref3 = arguments[1];
    var type = _ref3.type,
        locale = _ref3.locale;

    if (type === types.setLocale && _localeRegExp2.default.test(locale)) return locale;
    return state;
  };
}

function getLocaleReducer(_ref4) {
  var defaultLocale = _ref4.defaultLocale,
      types = _ref4.types;

  return (0, _redux.combineReducers)({
    currentLocale: getCurrentLocaleReducer({ defaultLocale: defaultLocale, types: types }),
    status: getStatusReducer(types)
  });
}
//# sourceMappingURL=getLocaleReducer.js.map

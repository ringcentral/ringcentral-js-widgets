"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsErrorMessage = containsErrorMessage;
exports.ensureLogin = ensureLogin;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

var _WaitUtil = require("./WaitUtil");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function containsErrorMessage(errorArray, errorMessageString) {
  return errorArray.find(function (element) {
    if (element.message === errorMessageString) {
      return element;
    }

    return null;
  });
}

function ensureLogin(auth, account) {
  return regeneratorRuntime.async(function ensureLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(auth.login(_objectSpread({}, account)));

        case 2:
          return _context.abrupt("return", (0, _WaitUtil.waitUntilNotNull)(function () {
            return auth.ownerId;
          }, 'Login Success', 6));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}
//# sourceMappingURL=HelpUtil.js.map

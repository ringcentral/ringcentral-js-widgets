"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsErrorMessage = containsErrorMessage;
exports.ensureLogin = ensureLogin;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.find");

require("core-js/fn/array/find");

var _WaitUtil = require("./WaitUtil");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function containsErrorMessage(errorArray, errorMessageString) {
  return errorArray.find(function (element) {
    if (element.message === errorMessageString) {
      return element;
    }

    return null;
  });
}

function ensureLogin(_x, _x2) {
  return _ensureLogin.apply(this, arguments);
}

function _ensureLogin() {
  _ensureLogin = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(auth, account) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return auth.login(_objectSpread({}, account));

          case 2:
            _context.next = 4;
            return (0, _WaitUtil.waitUntilNotNull)(function () {
              return auth.ownerId;
            }, 'Login Success', 6);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ensureLogin.apply(this, arguments);
}
//# sourceMappingURL=HelpUtil.js.map

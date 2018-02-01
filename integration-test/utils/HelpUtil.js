'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureLogin = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var ensureLogin = exports.ensureLogin = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(auth, account) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            auth.login((0, _extends3.default)({}, account));
            _context.next = 3;
            return (0, _WaitUtil.waitUntilNotNull)(function () {
              return auth.ownerId;
            }, 'Login Success', 6);

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function ensureLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.containsErrorMessage = containsErrorMessage;

require('core-js/fn/array/find');

var _WaitUtil = require('./WaitUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function containsErrorMessage(errorArray, errorMessageString) {
  return errorArray.find(function (element) {
    if (element.message === errorMessageString) {
      return element;
    }
    return null;
  });
}
//# sourceMappingURL=HelpUtil.js.map

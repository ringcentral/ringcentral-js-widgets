"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntil = waitUntil;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _sleep = _interopRequireDefault(require("./sleep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function waitUntil(_x) {
  return _waitUntil.apply(this, arguments);
}

function _waitUntil() {
  _waitUntil = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn) {
    var interval,
        waitTime,
        t,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            interval = _args.length > 1 && _args[1] !== undefined ? _args[1] : 300;
            waitTime = _args.length > 2 && _args[2] !== undefined ? _args[2] : 10000;
            t = 0;

          case 3:
            if (!(t < waitTime && !fn())) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return (0, _sleep["default"])(interval);

          case 6:
            t += interval;
            _context.next = 3;
            break;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _waitUntil.apply(this, arguments);
}
//# sourceMappingURL=waitUntil.js.map

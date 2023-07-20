"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.time = void 0;
require("regenerator-runtime/runtime");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * let you can calculate the time when run that method,
 *
 * ### that time not calculate in `process.env.NODE_ENV !== 'production'`
 * @param title
 */
var time = function time(title) {
  // eslint-disable-next-line func-names
  return function (target, name, descriptor) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof descriptor.value !== 'function' && typeof descriptor.initializer !== 'function') {
        throw new Error("@time decorated '".concat(name, "' is not a method"));
      }
      var fn = descriptor.value;
      var initializer = descriptor.initializer;
      // eslint-disable-next-line func-names
      var trackedFn = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _len,
            args,
            _key,
            result,
            _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (typeof initializer === 'function') {
                    fn = initializer.call(this);
                  }
                  if (!(typeof fn !== 'function')) {
                    _context.next = 3;
                    break;
                  }
                  throw new Error("@time decorated '".concat(name, "' is not a function"));
                case 3:
                  console.time("[Time Decorator] ".concat(title, ": "));
                  for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = _args[_key];
                  }
                  _context.next = 7;
                  return fn.apply(this, args);
                case 7:
                  result = _context.sent;
                  console.timeEnd("[Time Decorator] ".concat(title, ": "));
                  return _context.abrupt("return", result);
                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
        return function trackedFn() {
          return _ref.apply(this, arguments);
        };
      }();

      // the any type is just to be compatible with babel and tsc.
      return {
        enumerable: true,
        configurable: true,
        value: trackedFn
      };
    }
    return descriptor;
  };
};
exports.time = time;
//# sourceMappingURL=time.js.map

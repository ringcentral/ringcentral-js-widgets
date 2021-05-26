"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rateLimitThrottle = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var rateLimitThrottle = function rateLimitThrottle(_ref) {
  var fn = _ref.fn,
      pool = _ref.pool,
      poolWindow = _ref.poolWindow;
  var resetPromise = null;
  var count = 0;

  function getResetPromise() {
    if (!resetPromise) {
      resetPromise = new Promise(function (resolve) {
        setTimeout(function () {
          resetPromise = null;
          count = 0;
          resolve();
        }, poolWindow);
      });
    }

    return resetPromise;
  }

  function throttled() {
    return _throttled.apply(this, arguments);
  }

  function _throttled() {
    _throttled = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var resetPromise,
          _len,
          args,
          _key,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              resetPromise = getResetPromise();

            case 1:
              if (!(count >= pool)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return resetPromise;

            case 4:
              resetPromise = getResetPromise();
              _context.next = 1;
              break;

            case 7:
              count += 1;

              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              return _context.abrupt("return", fn.apply(this, args));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    return _throttled.apply(this, arguments);
  }

  return throttled;
};

exports.rateLimitThrottle = rateLimitThrottle;
//# sourceMappingURL=rateLimitThrottle.js.map

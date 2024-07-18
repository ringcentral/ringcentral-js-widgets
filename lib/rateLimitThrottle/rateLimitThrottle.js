"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rateLimitThrottle = void 0;
require("regenerator-runtime/runtime");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var rateLimitThrottle = function rateLimitThrottle(_ref) {
  var fn = _ref.fn,
    pool = _ref.pool,
    poolWindow = _ref.poolWindow;
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Promise<voi... Remove this comment to see the full error message
  var resetPromise = null;
  var count = 0;
  function getResetPromise() {
    if (!resetPromise) {
      resetPromise = new Promise(function (resolve) {
        setTimeout(function () {
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Promise<voi... Remove this comment to see the full error message
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

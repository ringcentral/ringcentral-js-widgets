"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raceTimeout = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var raceTimeout = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn) {
    var _ref2,
        _ref2$timeout,
        timeout,
        _ref2$onTimeout,
        onTimeout,
        _ref2$finalize,
        finalize,
        timeoutId,
        result,
        timeoutResolve,
        err,
        hasError,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$timeout = _ref2.timeout, timeout = _ref2$timeout === void 0 ? 30 * 1000 : _ref2$timeout, _ref2$onTimeout = _ref2.onTimeout, onTimeout = _ref2$onTimeout === void 0 ? function (reject) {
              reject(null);
            } : _ref2$onTimeout, _ref2$finalize = _ref2.finalize, finalize = _ref2$finalize === void 0 ? function () {} : _ref2$finalize;
            timeoutId = null;
            hasError = false;
            _context.prev = 3;
            _context.next = 6;
            return Promise.race([fn, new Promise(function (resolve, reject) {
              timeoutResolve = resolve; // here use resolve for easy to use.

              timeoutId = setTimeout(function () {
                return resolve(onTimeout(resolve, reject));
              }, timeout);
            })]);

          case 6:
            result = _context.sent;
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            hasError = true;
            err = _context.t0;

          case 13:
            _context.prev = 13;
            timeoutResolve();
            clearTimeout(timeoutId);
            finalize();
            return _context.finish(13);

          case 18:
            if (!hasError) {
              _context.next = 20;
              break;
            }

            throw err;

          case 20:
            return _context.abrupt("return", result);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9, 13, 18]]);
  }));

  return function raceTimeout(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.raceTimeout = raceTimeout;
//# sourceMappingURL=raceTimeout.js.map

"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raceTimeout = exports.handleToClockTime = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.map");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var handleToClockTime = function handleToClockTime(time) {
  // const hour = Math.floor(time / 1000 / 3600);
  var rest = time / 1000 % 3600;
  var minute = parseInt("".concat(rest / 60), 10);
  var second = parseInt("".concat(rest % 60), 10);
  return [minute, second].map(function (time) {
    return "".concat(String(time).length < 2 ? '0' : '').concat(time);
  }).join(':');
};

exports.handleToClockTime = handleToClockTime;

var raceTimeout = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn) {
    var _ref2,
        _ref2$timeout,
        timeout,
        _ref2$callback,
        callback,
        timeoutId,
        timeoutResolve,
        result,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$timeout = _ref2.timeout, timeout = _ref2$timeout === void 0 ? 30 * 1000 : _ref2$timeout, _ref2$callback = _ref2.callback, callback = _ref2$callback === void 0 ? function () {} : _ref2$callback;
            timeoutId = null;
            timeoutResolve = null;
            _context.next = 5;
            return Promise.race([fn, new Promise(function (resolve, reject) {
              timeoutResolve = resolve;
              timeoutId = setTimeout(function () {
                return reject(callback());
              }, timeout);
            })]);

          case 5:
            result = _context.sent;
            timeoutResolve();
            clearTimeout(timeoutId);
            return _context.abrupt("return", result);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function raceTimeout(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.raceTimeout = raceTimeout;
//# sourceMappingURL=time.js.map

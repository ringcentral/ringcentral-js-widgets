"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForSubscribe = exports.waitWithCheck = exports.polling = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("regenerator-runtime/runtime");

var _sleep = _interopRequireDefault(require("./sleep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var polling = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn, interval) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof fn !== 'function')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.next = 4;
            return fn();

          case 4:
            if (!_context.sent) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.next = 8;
            return (0, _sleep["default"])(interval);

          case 8:
            _context.next = 10;
            return polling(fn, interval);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function polling(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.polling = polling;

var waitWithCheck = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fn) {
    var _ref3,
        _ref3$interval,
        interval,
        _ref3$timeout,
        timeout,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref3 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, _ref3$interval = _ref3.interval, interval = _ref3$interval === void 0 ? 100 : _ref3$interval, _ref3$timeout = _ref3.timeout, timeout = _ref3$timeout === void 0 ? 1000 * 5 : _ref3$timeout;

            if (!(typeof fn !== 'function')) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            _context2.next = 5;
            return Promise.race([polling(fn, interval), new Promise(function (_, reject) {
              return setTimeout(reject, timeout);
            })]);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function waitWithCheck(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.waitWithCheck = waitWithCheck;

var waitForSubscribe = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _sleep["default"])(2.5 * 1000);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function waitForSubscribe() {
    return _ref4.apply(this, arguments);
  };
}();

exports.waitForSubscribe = waitForSubscribe;
//# sourceMappingURL=time.js.map

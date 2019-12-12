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

var polling = function polling(fn, interval) {
  return regeneratorRuntime.async(function polling$(_context) {
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
          return regeneratorRuntime.awrap(fn());

        case 4:
          if (!_context.sent) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap((0, _sleep["default"])(interval));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(polling(fn, interval));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.polling = polling;

var waitWithCheck = function waitWithCheck(fn) {
  var _ref,
      _ref$interval,
      interval,
      _ref$timeout,
      timeout,
      _args2 = arguments;

  return regeneratorRuntime.async(function waitWithCheck$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _ref = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, _ref$interval = _ref.interval, interval = _ref$interval === void 0 ? 100 : _ref$interval, _ref$timeout = _ref.timeout, timeout = _ref$timeout === void 0 ? 1000 * 5 : _ref$timeout;

          if (!(typeof fn !== 'function')) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return");

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(Promise.race([polling(fn, interval), new Promise(function (_, reject) {
            return setTimeout(reject, timeout);
          })]));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.waitWithCheck = waitWithCheck;

var waitForSubscribe = function waitForSubscribe() {
  return regeneratorRuntime.async(function waitForSubscribe$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _sleep["default"])(2.5 * 1000));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.waitForSubscribe = waitForSubscribe;
//# sourceMappingURL=time.js.map

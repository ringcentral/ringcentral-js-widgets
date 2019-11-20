"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntil = waitUntil;

require("regenerator-runtime/runtime");

var _sleep = _interopRequireDefault(require("./sleep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function waitUntil(fn) {
  var interval,
      waitTime,
      t,
      _args = arguments;
  return regeneratorRuntime.async(function waitUntil$(_context) {
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
          return regeneratorRuntime.awrap((0, _sleep["default"])(interval));

        case 6:
          t += interval;
          _context.next = 3;
          break;

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}
//# sourceMappingURL=waitUntil.js.map

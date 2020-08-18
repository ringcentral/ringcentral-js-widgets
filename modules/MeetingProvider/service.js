"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeetingProvider = getMeetingProvider;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getMeetingProvider(_x) {
  return _getMeetingProvider.apply(this, arguments);
}

function _getMeetingProvider() {
  _getMeetingProvider = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.service.platform().get('/restapi/v1.0/account/~/extension/~/video-configuration');

          case 2:
            res = _context.sent;
            return _context.abrupt("return", res.json());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getMeetingProvider.apply(this, arguments);
}
//# sourceMappingURL=service.js.map

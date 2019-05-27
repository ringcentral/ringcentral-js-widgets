"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _errorMessages = _interopRequireDefault(require("../..//modules/RateLimiter/errorMessages"));

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(auth, alert, account, client, rateLimiter) {
  describe('RateLimiter',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var conditionalDescribe, isLoginSuccess;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            this.timeout(20000);
            conditionalDescribe = describe;
            _context3.next = 4;
            return (0, _HelpUtil.ensureLogin)(auth, account);

          case 4:
            isLoginSuccess = _context3.sent;

            if (!isLoginSuccess) {
              conditionalDescribe = describe.skip;
              console.error('Skip test case as failed to login with credential ', account);
            }

            conditionalDescribe('Should Allow Alert', function () {
              this.timeout(20000);
              beforeEach(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var isAlertClear;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _WaitUtil.waitUntilEqual)(function () {
                          alert.dismissAll();
                          return alert.state.messages.length;
                        }, 'Alert', 0, 5);

                      case 2:
                        isAlertClear = _context.sent;

                        if (!isAlertClear) {
                          console.error('Alert is not cleared after dismissAll');
                          this.skip();
                        }

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })));
              describe('Should Prompt Alerts when rateLimiter occurs', function () {
                it('Should Prompt Alert of rateLimiter',
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          rateLimiter._requestErrorHandler(new Error('Request rate exceeded'));

                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _errorMessages["default"].rateLimitReached)).to.not.equal(undefined);

                        case 2:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })));
              });
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
};

exports["default"] = _default;
//# sourceMappingURL=rateLimiter.js.map

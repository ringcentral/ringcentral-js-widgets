"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _errorMessages = _interopRequireDefault(require("../..//modules/RateLimiter/errorMessages"));

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(auth, alert, account, client, rateLimiter) {
  describe('RateLimiter', function _callee3() {
    var conditionalDescribe, isLoginSuccess;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _this.timeout(20000);

            conditionalDescribe = describe;
            _context3.next = 4;
            return regeneratorRuntime.awrap((0, _HelpUtil.ensureLogin)(auth, account));

          case 4:
            isLoginSuccess = _context3.sent;

            if (!isLoginSuccess) {
              conditionalDescribe = describe.skip;
              console.error('Skip test case as failed to login with credential ', account);
            }

            conditionalDescribe('Should Allow Alert', function () {
              var _this2 = this;

              this.timeout(20000);
              beforeEach(function _callee() {
                var isAlertClear;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return regeneratorRuntime.awrap((0, _WaitUtil.waitUntilEqual)(function () {
                          alert.dismissAll();
                          return alert.state.messages.length;
                        }, 'Alert', 0, 5));

                      case 2:
                        isAlertClear = _context.sent;

                        if (!isAlertClear) {
                          console.error('Alert is not cleared after dismissAll');

                          _this2.skip();
                        }

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              });
              describe('Should Prompt Alerts when rateLimiter occurs', function () {
                it('Should Prompt Alert of rateLimiter', function _callee2() {
                  return regeneratorRuntime.async(function _callee2$(_context2) {
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
                  });
                });
              });
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=rateLimiter.js.map

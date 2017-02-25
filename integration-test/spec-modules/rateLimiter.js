'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _errorMessages = require('../..//modules/RateLimiter/errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

var _HelpUtil = require('../utils/HelpUtil');

var _WaitUtil = require('../utils/WaitUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (auth, alert, account, client, rateLimiter) {
  describe('RateLimiter', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    var conditionalDescribe, isLoginSuccess;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
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
              beforeEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var isAlertClear;
                return _regenerator2.default.wrap(function _callee$(_context) {
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
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })));
              describe('Should Prompt Alerts when rateLimiter occurs', function () {
                it('Should Prompt Alert of rateLimiter', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          rateLimiter._requestErrorHandler(new Error('Request rate exceeded'));
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _errorMessages2.default.rateLimitReached)).to.not.equal(undefined);

                        case 2:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                })));
              });
            });

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
};
//# sourceMappingURL=rateLimiter.js.map

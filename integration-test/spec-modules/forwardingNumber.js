"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var mock = _interopRequireWildcard(require("../mock"));

var _this = void 0;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var authzProfileBody = require('../mock/data/authzProfile');

var _default = function _default(auth, client, forwardingNumber, account) {
  describe('ForwardingNumber:', function () {
    _this.timeout(20000);

    mock.mockClient(client);
    var isLoginSuccess; // const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    describe('When has ReadUserForwardingFlipNumbers permission', function () {
      before(function _callee() {
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mock.restore();
                mock.mockForLogin();
                _context.next = 4;
                return regeneratorRuntime.awrap((0, _HelpUtil.ensureLogin)(auth, account));

              case 4:
                isLoginSuccess = _context.sent;

                if (!isLoginSuccess) {
                  console.error('Skip test case as failed to login with credential ', account);

                  _this.skip();
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        });
      });
      after(function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(auth.logout());

              case 2:
                _context2.next = 4;
                return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        });
      });
      it('Should load numbers', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.retries(2);

                _context3.next = 3;
                return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

              case 3:
                expect(forwardingNumber.numbers.length).equal(2);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        });
      });
      it('Should get flip numbers correctly', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this.retries(2);

                _context4.next = 3;
                return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

              case 3:
                expect(forwardingNumber.flipNumbers.length).equal(2);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        });
      });
      it('Should get forwarding numbers correctly', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.retries(2);

                _context5.next = 3;
                return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

              case 3:
                expect(forwardingNumber.forwardingNumbers.length).equal(1);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        });
      });
    });
    describe("When doesn't have ReadUserForwardingFlipNumbers permission", function () {
      before(function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                mock.restore();
                mock.mockForLogin({
                  mockAuthzProfile: false
                });
                mock.authzProfile({
                  permissions: authzProfileBody.permissions.filter(function (p) {
                    return p.permission.id !== 'ReadUserForwardingFlipNumbers';
                  })
                });
                _context6.next = 5;
                return regeneratorRuntime.awrap((0, _HelpUtil.ensureLogin)(auth, account));

              case 5:
                isLoginSuccess = _context6.sent;

                if (!isLoginSuccess) {
                  console.error('Skip test case as failed to login with credential ', account);

                  _this.skip();
                }

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        });
      });
      after(function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(auth.logout());

              case 2:
                _context7.next = 4;
                return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        });
      });
      it('Should not load numbers', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this.retries(2);

                _context8.next = 3;
                return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

              case 3:
                expect(forwardingNumber.numbers.length).equal(0);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        });
      });
      it('Should not load flip numbers', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this.retries(2);

                _context9.next = 3;
                return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

              case 3:
                expect(forwardingNumber.flipNumbers.length).equal(0);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        });
      });
      it('Should not load forwarding numbers', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _this.retries(2);

                _context10.next = 3;
                return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

              case 3:
                expect(forwardingNumber.forwardingNumbers.length).equal(0);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        });
      });
    });
    it('Should show insufficientPrivilege when get 403', function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              mock.restore();
              mock.mockForLogin({
                mockForwardingNumber: false
              });
              mock.mockForbidden({
                url: 'begin:http://whatever/restapi/v1.0/account/~/extension/~/forwarding-number'
              });
              _context11.next = 5;
              return regeneratorRuntime.awrap((0, _HelpUtil.ensureLogin)(auth, account));

            case 5:
              isLoginSuccess = _context11.sent;

              if (!isLoginSuccess) {
                console.error('Skip test case as failed to login with credential ', account);

                _this.skip();
              }

              _context11.next = 9;
              return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

            case 9:
              expect(forwardingNumber.numbers.length).equal(0);
              _context11.next = 12;
              return regeneratorRuntime.awrap(auth.logout());

            case 12:
              _context11.next = 14;
              return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

            case 14:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=forwardingNumber.js.map

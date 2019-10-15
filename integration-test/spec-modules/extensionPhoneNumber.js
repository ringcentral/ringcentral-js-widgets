"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var _ClientHistoryRequest = _interopRequireDefault(require("../utils/ClientHistoryRequest"));

var mock = _interopRequireWildcard(require("../mock"));

var _this = void 0;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authzProfileBody = require('../mock/data/authzProfile');

var _default = function _default(auth, client, extensionPhoneNumber, account) {
  describe('ExtensionPhoneNumber:', function () {
    _this.timeout(20000);

    mock.mockClient(client);
    var isLoginSuccess;
    var clientHistoryRequest = new _ClientHistoryRequest["default"](new Map(), client);
    describe('When has ReadUserPhoneNumbers permission', function () {
      before(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mock.restore();
                mock.mockForLogin();
                _context.next = 4;
                return (0, _HelpUtil.ensureLogin)(auth, account);

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
        }, _callee);
      })));
      after(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return auth.logout();

              case 2:
                _context2.next = 4;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
      it('Should load numbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.retries(2);

                _context3.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.numbers.length).equal(5);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
      it('Should load mainCompanyNumber',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this.retries(2);

                _context4.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.mainCompanyNumber.usageType).equal('MainCompanyNumber');

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
      it('Should load companyNumbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.retries(2);

                _context5.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.companyNumbers.length).equal(1);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
      it('Should load directNumbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this.retries(2);

                _context6.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.directNumbers.length).equal(3);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })));
      it('Should load callerIdNumbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this.retries(2);

                _context7.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.callerIdNumbers.length).equal(5);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      })));
      it('Should load smsSenderNumbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this.retries(2);

                _context8.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.smsSenderNumbers.length).equal(5);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      })));
    });
    describe("When doesn't have ReadUserPhoneNumbers permission", function () {
      before(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                mock.restore();
                mock.mockForLogin({
                  mockAuthzProfile: false
                });
                mock.authzProfile({
                  permissions: authzProfileBody.permissions.filter(function (p) {
                    return p.permission.id !== 'ReadUserPhoneNumbers';
                  })
                });
                _context9.next = 5;
                return (0, _HelpUtil.ensureLogin)(auth, account);

              case 5:
                isLoginSuccess = _context9.sent;

                if (!isLoginSuccess) {
                  console.error('Skip test case as failed to login with credential ', account);

                  _this.skip();
                }

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      })));
      after(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return auth.logout();

              case 2:
                _context10.next = 4;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      })));
      it('Should not load numbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _this.retries(2);

                _context11.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.numbers.length).equal(0);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      })));
      it('Should not load mainCompanyNumber',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _this.retries(2);

                _context12.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.mainCompanyNumber).equal(undefined);

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      })));
      it('Should not load companyNumbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _this.retries(2);

                _context13.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.companyNumbers.length).equal(0);

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      })));
      it('Should not load directNumbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _this.retries(2);

                _context14.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.directNumbers.length).equal(0);

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      })));
      it('Should not load callerIdNumbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _this.retries(2);

                _context15.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.callerIdNumbers.length).equal(0);

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      })));
      it('Should not load smsSenderNumbers',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16() {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _this.retries(2);

                _context16.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(extensionPhoneNumber.smsSenderNumbers.length).equal(0);

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      })));
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=extensionPhoneNumber.js.map

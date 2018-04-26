'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _HelpUtil = require('../utils/HelpUtil');

var _WaitUtil = require('../utils/WaitUtil');

var _ClientHistoryRequest = require('../utils/ClientHistoryRequest');

var _ClientHistoryRequest2 = _interopRequireDefault(_ClientHistoryRequest);

var _mock = require('../mock');

var mock = _interopRequireWildcard(_mock);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authzProfileBody = require('../mock/data/authzProfile');

exports.default = function (auth, client, forwardingNumber, account) {
  describe('ForwardingNumber:', function () {
    var _this3 = this;

    this.timeout(20000);
    mock.mockClient(client);

    var isLoginSuccess = void 0;
    // const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    describe('When has ReadUserForwardingFlipNumbers permission', function () {
      var _this = this;

      before((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
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
                  this.skip();
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      })));

      after((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return auth.logout();

              case 2:
                _context2.next = 4;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      })));

      it('Should load numbers', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.retries(2);
                _context3.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(forwardingNumber.numbers.length).equal(2);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      })));

      it('Should get flip numbers correctly', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this.retries(2);
                _context4.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(forwardingNumber.flipNumbers.length).equal(2);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      })));

      it('Should get forwarding numbers correctly', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.retries(2);
                _context5.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(forwardingNumber.forwardingNumbers.length).equal(1);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this);
      })));
    });

    describe("When doesn't have ReadUserForwardingFlipNumbers permission", function () {
      var _this2 = this;

      before((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                mock.restore();
                mock.mockForLogin({ mockAuthzProfile: false });
                mock.authzProfile({
                  permissions: authzProfileBody.permissions.filter(function (p) {
                    return p.permission.id !== 'ReadUserForwardingFlipNumbers';
                  })
                });
                _context6.next = 5;
                return (0, _HelpUtil.ensureLogin)(auth, account);

              case 5:
                isLoginSuccess = _context6.sent;

                if (!isLoginSuccess) {
                  console.error('Skip test case as failed to login with credential ', account);
                  this.skip();
                }

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      })));

      after((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return auth.logout();

              case 2:
                _context7.next = 4;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      })));

      it('Should not load numbers', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this2.retries(2);
                _context8.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(forwardingNumber.numbers.length).equal(0);

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this2);
      })));

      it('Should not load flip numbers', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this2.retries(2);
                _context9.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(forwardingNumber.flipNumbers.length).equal(0);

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this2);
      })));

      it('Should not load forwarding numbers', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _this2.retries(2);
                _context10.next = 3;
                return (0, _WaitUtil.waitInSeconds)(1);

              case 3:
                expect(forwardingNumber.forwardingNumbers.length).equal(0);

              case 4:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, _this2);
      })));
    });

    it('Should show insufficientPrivilege when get 403', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              mock.restore();
              mock.mockForLogin({ mockForwardingNumber: false });
              mock.mockForbidden({ url: 'begin:http://whatever/restapi/v1.0/account/~/extension/~/forwarding-number' });
              _context11.next = 5;
              return (0, _HelpUtil.ensureLogin)(auth, account);

            case 5:
              isLoginSuccess = _context11.sent;

              if (!isLoginSuccess) {
                console.error('Skip test case as failed to login with credential ', account);
                _this3.skip();
              }
              _context11.next = 9;
              return (0, _WaitUtil.waitInSeconds)(1);

            case 9:
              expect(forwardingNumber.numbers.length).equal(0);
              _context11.next = 12;
              return auth.logout();

            case 12:
              _context11.next = 14;
              return (0, _WaitUtil.waitInSeconds)(1);

            case 14:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, _this3);
    })));
  });
};
//# sourceMappingURL=forwardingNumber.js.map

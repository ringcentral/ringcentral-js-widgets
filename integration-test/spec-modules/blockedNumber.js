'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _HelpUtil = require('../utils/HelpUtil');

var _WaitUtil = require('../utils/WaitUtil');

var _ClientHistoryRequest = require('../utils/ClientHistoryRequest');

var _ClientHistoryRequest2 = _interopRequireDefault(_ClientHistoryRequest);

var _mock = require('../mock');

var mock = _interopRequireWildcard(_mock);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authzProfileBody = require('../mock/data/authzProfile');

exports.default = function (auth, client, blockedNumber, account) {
  describe('BlockedNumber:', function () {
    var _this = this;

    this.timeout(20000);
    mock.mockClient(client);

    var isLoginSuccess = void 0;
    var clientHistoryRequest = new _ClientHistoryRequest2.default(new _map2.default(), client);

    afterEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return auth.logout();

            case 2:
              _context.next = 4;
              return (0, _WaitUtil.waitInSeconds)(1);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    it('Should load numbers when there is ReadBlockedNumbers permission', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mock.restore();
              mock.mockForLogin();
              _context2.next = 4;
              return (0, _HelpUtil.ensureLogin)(auth, account);

            case 4:
              isLoginSuccess = _context2.sent;

              if (!isLoginSuccess) {
                console.error('Skip test case as failed to login with credential ', account);
                _this.skip();
              }
              _this.retries(2);
              _context2.next = 9;
              return (0, _WaitUtil.waitInSeconds)(1);

            case 9:
              expect(blockedNumber.numbers.length).equal(1);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    })));

    it("Should not load numbers when there isn't ReadBlockedNumbers permission", (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mock.restore();
              mock.mockForLogin({ mockAuthzProfile: false });
              mock.authzProfile({
                permissions: authzProfileBody.permissions.filter(function (p) {
                  return p.permission.id !== 'ReadBlockedNumbers';
                })
              });
              _context3.next = 5;
              return (0, _HelpUtil.ensureLogin)(auth, account);

            case 5:
              isLoginSuccess = _context3.sent;

              if (!isLoginSuccess) {
                console.error('Skip test case as failed to login with credential ', account);
                _this.skip();
              }
              _this.retries(2);
              _context3.next = 10;
              return (0, _WaitUtil.waitInSeconds)(1);

            case 10:
              expect(blockedNumber.numbers.length).equal(0);

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    })));
  });
};
//# sourceMappingURL=blockedNumber.js.map

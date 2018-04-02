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

var _subscriptionStatus = require('../../modules/Subscription/subscriptionStatus');

var _subscriptionStatus2 = _interopRequireDefault(_subscriptionStatus);

var _pubnub = require('pubnub');

var _pubnub2 = _interopRequireDefault(_pubnub);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (auth, client, subscription, account) {
  describe('Subscription:', function () {
    var _this = this;

    this.timeout(20000);
    mock.mockClient(client);

    var isLoginSuccess = void 0;
    var clientHistoryRequest = new _ClientHistoryRequest2.default(new _map2.default(), client);
    beforeEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              localStorage.clear();

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    })));
    afterEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!auth.loggedIn) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return auth.logout();

            case 3:
              _context2.next = 5;
              return (0, _WaitUtil.waitInSeconds)(1);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    })));
    it('Should create subscription successfully', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mock.restore();
              mock.mockForLogin();
              _context3.next = 4;
              return (0, _HelpUtil.ensureLogin)(auth, account);

            case 4:
              isLoginSuccess = _context3.sent;

              if (!isLoginSuccess) {
                console.error('Skip test case as failed to login with credential ', account);
                _this.skip();
              }
              _this.retries(2);
              _context3.next = 9;
              return (0, _WaitUtil.waitInSeconds)(3);

            case 9:
              expect(subscription.subscriptionStatus).equal(_subscriptionStatus2.default.subscribed);
              expect(subscription._subscription).not.equal(null);

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    })));
    it('Should reset cache subscription to null when subscribe error', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mock.restore();
              mock.mockForbidden({ method: 'POST', url: 'begin:http://whatever/restapi/v1.0/subscription' });
              mock.mockForLogin({ mockSubscription: false });
              _context4.next = 5;
              return (0, _HelpUtil.ensureLogin)(auth, account);

            case 5:
              isLoginSuccess = _context4.sent;

              if (!isLoginSuccess) {
                console.error('Skip test case as failed to login with credential ', account);
                _this.skip();
              }

              _context4.next = 9;
              return (0, _WaitUtil.waitInSeconds)(3);

            case 9:
              expect(subscription.subscriptionStatus).equal(_subscriptionStatus2.default.notSubscribed);
              expect(subscription.cachedSubscription).equal(null);

            case 11:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    })));
  });
};
//# sourceMappingURL=subscription.js.map

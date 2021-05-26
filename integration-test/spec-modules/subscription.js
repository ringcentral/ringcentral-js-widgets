"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _subscriptionStatus = require("../../modules/Subscription/subscriptionStatus");

var mock = _interopRequireWildcard(require("../mock"));

var _ClientHistoryRequest = _interopRequireDefault(require("../utils/ClientHistoryRequest"));

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(auth, client, subscription, account) {
  describe('Subscription:', function () {
    _this.timeout(20000);

    mock.mockClient(client);
    var isLoginSuccess;
    var clientHistoryRequest = new _ClientHistoryRequest["default"](new Map(), client);
    beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              localStorage.clear();

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('Should create subscription successfully', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
              expect(subscription.subscriptionStatus).equal(_subscriptionStatus.subscriptionStatus.subscribed);
              expect(subscription._subscription).not.equal(null);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should reset cache subscription to null when subscribe error', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mock.restore();
              mock.mockForbidden({
                method: 'POST',
                url: 'begin:http://whatever/restapi/v1.0/subscription'
              });
              mock.mockForLogin({
                mockSubscription: false
              });
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
              expect(subscription.subscriptionStatus).equal(_subscriptionStatus.subscriptionStatus.notSubscribed);
              expect(subscription.cachedSubscription).equal(null);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
};

exports["default"] = _default;
//# sourceMappingURL=subscription.js.map

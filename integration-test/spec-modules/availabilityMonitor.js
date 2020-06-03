"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var mock = _interopRequireWildcard(require("../mock"));

var _this = void 0;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/** global describe */
var _default = function _default(_ref) {
  var auth = _ref.auth,
      alert = _ref.alert,
      client = _ref.client,
      presence = _ref.presence,
      availabilityMonitor = _ref.availabilityMonitor,
      messageStore = _ref.messageStore,
      callLog = _ref.callLog,
      account = _ref.account;
  describe('AvailabilityMonitor:', function () {
    _this.timeout(20000);

    mock.mockClient(client);
    var isLoginSuccess;
    beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
    afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              availabilityMonitor._switchToNormalMode();

              mock.logout();
              _context2.next = 4;
              return auth.logout();

            case 4:
              localStorage.clear();
              _context2.next = 7;
              return (0, _WaitUtil.waitInSeconds)(1);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should switch to limited availability mode when user action occurs limited availability error', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mock.mockLimited({
                method: 'PUT',
                path: '/restapi/v1.0/account/~/extension/~/presence'
              }); // expect(presence.setBusy).to.throw();

              _context3.next = 3;
              return presence.setBusy();

            case 3:
              expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should switch to limited availability mode when background long polling occurs limited availability error', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mock.restore();
              mock.mockLimited({
                method: 'GET',
                url: 'begin:http://whatever/restapi/v1.0/account/~/extension/~/call-log-sync'
              });
              _context4.next = 4;
              return callLog._sync('ISync');

            case 4:
              expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should stay in limited availability mode when health check returns 5xx', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              mock.restore();
              mock.mockLimited({
                method: 'GET',
                url: 'begin:http://whatever/restapi/v1.0/account/~/extension/~/call-log-sync'
              });
              mock.mockLimited({
                method: 'GET',
                path: '/restapi/v1.0/status'
              });
              _context5.next = 5;
              return callLog._sync('ISync');

            case 5:
              expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);
              _context5.next = 8;
              return (0, _WaitUtil.waitInSeconds)(15);

            case 8:
              expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should switch to normal mode when health check returns 200', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              // this.timeout(20000);
              mock.restore();
              mock.mockLimited({
                method: 'GET',
                url: 'begin:http://whatever/restapi/v1.0/account/~/extension/~/call-log-sync'
              });
              mock.mockApi({
                method: 'GET',
                path: '/restapi/v1.0/status'
              });
              _context6.next = 5;
              return callLog._sync('ISync');

            case 5:
              expect(availabilityMonitor.isLimitedAvailabilityMode).equal(true);
              _context6.next = 8;
              return (0, _WaitUtil.waitInSeconds)(15);

            case 8:
              expect(availabilityMonitor.isLimitedAvailabilityMode).equal(false);

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
};

exports["default"] = _default;
//# sourceMappingURL=availabilityMonitor.js.map

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var mock = _interopRequireWildcard(require("../mock"));

var _authzProfile = _interopRequireDefault(require("../mock/data/authzProfile"));

var _ClientHistoryRequest = _interopRequireDefault(require("../utils/ClientHistoryRequest"));

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(auth, client, presence, account) {
  describe('Presence:', function () {
    _this.timeout(20000);

    mock.mockClient(client);
    var isLoginSuccess;
    var clientHistoryRequest = new _ClientHistoryRequest["default"](new Map(), client);
    afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return auth.logout();

            case 2:
              _context.next = 4;
              return (0, _WaitUtil.waitInSeconds)(1);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('Should load presenceStatus when there is ReadPresenceStatus permission', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
              expect(presence.presenceStatus).equal('Available');

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("Should not load presenceStatus when there isn't ReadPresenceStatus permission", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mock.restore();
              mock.mockForLogin({
                mockAuthzProfile: false
              });
              mock.authzProfile({
                permissions: _authzProfile["default"].permissions.filter(function (p) {
                  return p.permission.id !== 'ReadPresenceStatus';
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
              expect(presence.presenceStatus).equal(null);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
};

exports["default"] = _default;
//# sourceMappingURL=presence.js.map

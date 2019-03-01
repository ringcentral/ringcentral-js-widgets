"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var _ClientHistoryRequest = _interopRequireDefault(require("../utils/ClientHistoryRequest"));

var mock = _interopRequireWildcard(require("../mock"));

var _permissionsMessages = _interopRequireDefault(require("../../modules/RolesAndPermissions/permissionsMessages"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authzProfileBody = require('../mock/data/authzProfile');

var _default = function _default(auth, client, rolesAndPermissions, account, alert) {
  describe('RolesAndPermissions:', function () {
    var _this = this;

    this.timeout(20000);
    mock.mockClient(client);
    var isLoginSuccess;
    var clientHistoryRequest = new _ClientHistoryRequest.default(new Map(), client);
    afterEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!auth.loggedIn) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return auth.logout();

            case 3:
              _context.next = 5;
              return (0, _WaitUtil.waitInSeconds)(1);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('Should load permissions successfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
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
              expect(rolesAndPermissions.permissions.ReadUserInfo).equal(true);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('Should not include ReadExtensions permission',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mock.restore();
              mock.mockForLogin({
                mockAuthzProfile: false
              });
              mock.authzProfile({
                permissions: authzProfileBody.permissions.filter(function (p) {
                  return p.permission.id !== 'ReadExtensions';
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
              expect(rolesAndPermissions.permissions.ReadExtensions).equal(undefined);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should show insufficientPrivilege when get 403',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mock.restore();
              mock.mockForLogin({
                mockAuthzProfile: false
              });
              mock.mockForbidden({
                path: '/restapi/v1.0/account/~/extension/~/authz-profile'
              });
              _context4.next = 5;
              return auth.login(_objectSpread({}, account));

            case 5:
              _context4.next = 7;
              return (0, _WaitUtil.waitInSeconds)(3);

            case 7:
              expect(auth.loggedIn).equal(false);
              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _permissionsMessages.default.insufficientPrivilege)).to.not.equal(undefined);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
};

exports.default = _default;
//# sourceMappingURL=rolesAndPermissions.js.map

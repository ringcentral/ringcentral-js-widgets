"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

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

var _permissionsMessages = _interopRequireDefault(require("../../modules/RolesAndPermissions/permissionsMessages"));

var _this = void 0;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var authzProfileBody = require('../mock/data/authzProfile');

var _default = function _default(auth, client, rolesAndPermissions, account, alert) {
  describe('RolesAndPermissions:', function () {
    _this.timeout(20000);

    mock.mockClient(client);
    var isLoginSuccess;
    var clientHistoryRequest = new _ClientHistoryRequest["default"](new Map(), client);
    afterEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!auth.loggedIn) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(auth.logout());

            case 3:
              _context.next = 5;
              return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    it('Should load permissions successfully', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mock.restore();
              mock.mockForLogin();
              _context2.next = 4;
              return regeneratorRuntime.awrap((0, _HelpUtil.ensureLogin)(auth, account));

            case 4:
              isLoginSuccess = _context2.sent;

              if (!isLoginSuccess) {
                console.error('Skip test case as failed to login with credential ', account);

                _this.skip();
              }

              _this.retries(2);

              _context2.next = 9;
              return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

            case 9:
              expect(rolesAndPermissions.permissions.ReadUserInfo).equal(true);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
    it('Should not include ReadExtensions permission', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
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
              return regeneratorRuntime.awrap((0, _HelpUtil.ensureLogin)(auth, account));

            case 5:
              isLoginSuccess = _context3.sent;

              if (!isLoginSuccess) {
                console.error('Skip test case as failed to login with credential ', account);

                _this.skip();
              }

              _this.retries(2);

              _context3.next = 10;
              return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(1));

            case 10:
              expect(rolesAndPermissions.permissions.ReadExtensions).equal(undefined);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it('Should show insufficientPrivilege when get 403', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
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
              return regeneratorRuntime.awrap(auth.login(_objectSpread({}, account)));

            case 5:
              _context4.next = 7;
              return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(3));

            case 7:
              expect(auth.loggedIn).equal(false);
              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _permissionsMessages["default"].insufficientPrivilege)).to.not.equal(undefined);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=rolesAndPermissions.js.map

"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("regenerator-runtime/runtime");

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var _ClientHistoryRequest = _interopRequireDefault(require("../utils/ClientHistoryRequest"));

var mock = _interopRequireWildcard(require("../mock"));

var _dialingPlan = _interopRequireDefault(require("../mock/data/dialingPlan"));

var _extensionInfo = _interopRequireDefault(require("../mock/data/extensionInfo"));

var _this = void 0;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(auth, client, regionSettings, account) {
  describe('Region Settings:',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var isLoginSuccess, clientHistoryRequest;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _this.timeout(20000);

            mock.mockClient(client);
            clientHistoryRequest = new _ClientHistoryRequest["default"](new Map(), client);
            before(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      mock.mockForLogin();
                      _context.next = 3;
                      return (0, _HelpUtil.ensureLogin)(auth, account);

                    case 3:
                      isLoginSuccess = _context.sent;

                      if (!isLoginSuccess) {
                        console.error('Skip test case as failed to login with credential ', account);

                        _this.skip();
                      }

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
            it('should be ready in 2 seconds after login',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _this.retries(2);

                      _context2.next = 3;
                      return (0, _WaitUtil.waitInSeconds)(2);

                    case 3:
                      expect(regionSettings.availableCountries).to.have.length.above(0);
                      expect(regionSettings.countryCode).to.equal(_extensionInfo["default"].regionalSettings.homeCountry.isoCode);
                      expect(regionSettings.showReginSetting).to.equal(true);

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));
            it('Record fetched from SDK should be the same as RawData', function () {
              expect(regionSettings.availableCountries.length).to.equal(_dialingPlan["default"].records.length);
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
};

exports["default"] = _default;
//# sourceMappingURL=regionSetting.js.map

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

exports.default = function (auth, client, regionSettings, account) {
  describe('Should Load Region Settings after Login', function () {
    var _this = this;

    this.timeout(20000);
    mock.mockClient(client);
    var isLoginSuccess = void 0;
    var clientHistoryRequest = new _ClientHistoryRequest2.default(new _map2.default(), client);
    before((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
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
                this.skip();
              }

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })));

    it('Region Settings should be ready in 2 seconds after login', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.retries(2);
              _context2.next = 3;
              return (0, _WaitUtil.waitInSeconds)(2);

            case 3:
              expect(regionSettings.availableCountries).to.have.length.above(0);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    })));

    it('Record fetched from SDK should be the same as RawData', function () {
      expect(regionSettings.availableCountries.length).to.equal(clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.dialingPlan).records.length);
    });
  });
};
//# sourceMappingURL=regionSetting.js.map

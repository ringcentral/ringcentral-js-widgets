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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (auth, client, regionSettings, account) {
  describe('Should Load Region Settings after Login', function () {
    this.timeout(20000);
    var isLoginSuccess = void 0;
    var clientHistoryRequest = new _ClientHistoryRequest2.default(new _map2.default(), client);
    before((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _HelpUtil.ensureLogin)(auth, account);

            case 2:
              isLoginSuccess = _context.sent;

              if (!isLoginSuccess) {
                console.error('Skip test case as failed to login with credential ', account);
                this.skip();
              }

            case 4:
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
              this.retries(2);
              _context2.next = 3;
              return (0, _WaitUtil.waitInSeconds)(2);

            case 3:
              expect(regionSettings.availableCountries).to.have.length.above(0);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));

    it('Record fetched from SDK should be the same as RawData', function () {
      expect(regionSettings.availableCountries.length).to.equal(clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.dialingPlan).records.length);
    });
  });
};
//# sourceMappingURL=regionSetting.js.map

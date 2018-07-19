'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _HelpUtil = require('../utils/HelpUtil');

var _WaitUtil = require('../utils/WaitUtil');

var _mock = require('../mock');

var mock = _interopRequireWildcard(_mock);

var _ClientHistoryRequest = require('../utils/ClientHistoryRequest');

var _ClientHistoryRequest2 = _interopRequireDefault(_ClientHistoryRequest);

var _conferenceCallErrors = require('../../modules/ConferenceCall/conferenceCallErrors');

var _conferenceCallErrors2 = _interopRequireDefault(_conferenceCallErrors);

var _conferenceCallStatus = require('../../modules/ConferenceCall/conferenceCallStatus');

var _conferenceCallStatus2 = _interopRequireDefault(_conferenceCallStatus);

var _callingOptions = require('../../modules/CallingSettings/callingOptions');

var _callingOptions2 = _interopRequireDefault(_callingOptions);

var _callDirections = require('../../enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (auth, client, conferenceCall, alert, account) {
  describe('ConferenceCall:', function () {
    var _this2 = this;

    this.timeout(20000);
    mock.mockClient(client);
    var clientHistoryRequest = new _ClientHistoryRequest2.default(new _map2.default(), client);
    var isLoginSuccess = void 0;

    describe('Should Init Successfully with Default Setting', function () {
      it('Should Have Empty Records of Conferences By Default', function () {
        expect(conferenceCall.state.conferences).to.be.an('object').that.is.empty;
      });
      it('Should Be Idle By Default', function () {
        expect(conferenceCall.state.conferenceCallStatus).to.equal(_conferenceCallStatus2.default.idle);
      });
    });

    describe('Should Update Conference Successfully', function () {
      var _this = this;

      after((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
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

      before((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mock.restore();
                mock.mockForLogin({
                  mockAuthzProfile: false
                });
                _context2.next = 4;
                return (0, _HelpUtil.ensureLogin)(auth, account);

              case 4:
                isLoginSuccess = _context2.sent;


                if (!isLoginSuccess) {
                  console.error('Skip test case as failed to login with credential ', account);
                  this.skip();
                }
                mock.conferenceCall();
                mock.numberParse({}, 'US');

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      })));

      it('Should Update Records of Conferences When Request One', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var sessionData, rawRequest;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sessionData = void 0;
                _context3.next = 3;
                return conferenceCall._makeConference();

              case 3:
                sessionData = _context3.sent;
                rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.conferenceCall);

                expect((0, _stringify2.default)(sessionData)).to.equal((0, _stringify2.default)(rawRequest.session));
                // FIXME: because we are unable to mock sip.js instance, so skip the session assertation below:        
                // expect(conferenceCall.conferences).to.have.key(rawRequest.session.id);

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      })));

      it('Should Not Have Failure Alert', function () {
        (0, _values2.default)(_conferenceCallErrors2.default).forEach(function (err) {
          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, err)).to.equal(undefined);
        });
      });
    });

    describe('Should Failed to Update Conference', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              after((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return auth.logout();

                      case 2:
                        _context4.next = 4;
                        return (0, _WaitUtil.waitInSeconds)(1);

                      case 4:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, this);
              })));

              before((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        conferenceCall._reset();
                        mock.restore();
                        mock.mockForLogin({
                          mockAuthzProfile: false
                        });
                        _context5.next = 5;
                        return (0, _HelpUtil.ensureLogin)(auth, account);

                      case 5:
                        isLoginSuccess = _context5.sent;


                        if (!isLoginSuccess) {
                          console.error('Skip test case as failed to login with credential ', account);
                          this.skip();
                        }
                        mock.mockForbidden({
                          method: 'POST',
                          path: _ClientHistoryRequest2.default.endPoints.conferenceCall
                        });
                        mock.numberParse({}, 'US');

                      case 9:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, this);
              })));

              it('Should Have No Records of Conference', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return conferenceCall._makeConference(false);

                      case 2:
                        expect(conferenceCall.conferences).to.be.an('object').that.is.empty;

                      case 3:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, _this2);
              })));

              it('Should Have A Failure Alert', function () {
                expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _conferenceCallErrors2.default.makeConferenceFailed)).to.not.equal(undefined);
              });

              it('Should Not Bring Session into Non-existent Conference', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return conferenceCall.bringInToConference(Math.random(), {
                          direction: _callDirections2.default.outbound
                        });

                      case 3:
                        _context7.next = 7;
                        break;

                      case 5:
                        _context7.prev = 5;
                        _context7.t0 = _context7['catch'](0);

                      case 7:
                        expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _conferenceCallErrors2.default.makeConferenceFailed)).to.not.equal(undefined);

                      case 8:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, _this2, [[0, 5]]);
              })));

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this2);
    })));
  });
};
//# sourceMappingURL=conferenceCall.js.map

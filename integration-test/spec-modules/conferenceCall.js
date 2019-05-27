"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var mock = _interopRequireWildcard(require("../mock"));

var _ClientHistoryRequest = _interopRequireDefault(require("../utils/ClientHistoryRequest"));

var _conferenceCallErrors = _interopRequireDefault(require("../../modules/ConferenceCall/conferenceCallErrors"));

var _conferenceCallStatus = _interopRequireDefault(require("../../modules/ConferenceCall/conferenceCallStatus"));

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(auth, client, conferenceCall, alert, account) {
  describe('ConferenceCall:', function () {
    this.timeout(20000);
    mock.mockClient(client);
    var clientHistoryRequest = new _ClientHistoryRequest["default"](new Map(), client);
    var isLoginSuccess;
    describe('Should Init Successfully with Default Setting', function () {
      it('Should Have Empty Records of Conferences By Default', function () {
        expect(conferenceCall.state.conferences).to.be.an('object').that.is.empty;
      });
      it('Should Be Idle By Default', function () {
        expect(conferenceCall.state.conferenceCallStatus).to.equal(_conferenceCallStatus["default"].idle);
      });
    });
    describe('Should Update Conference Successfully', function () {
      after(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
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
      before(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      })));
      it('Should Update Records of Conferences When Request One',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var sessionData, rawRequest;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return conferenceCall._makeConference();

              case 2:
                sessionData = _context3.sent;
                rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest["default"].endPoints.conferenceCall);
                expect(JSON.stringify(sessionData)).to.equal(JSON.stringify(rawRequest.session)); // FIXME: because we are unable to mock sip.js instance, so skip the session assertation below:        
                // expect(conferenceCall.conferences).to.have.key(rawRequest.session.id);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
      it('Should Not Have Failure Alert', function () {
        Object.values(_conferenceCallErrors["default"]).forEach(function (err) {
          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, err)).to.equal(undefined);
        });
      });
    });
    describe('Should Failed to Update Conference',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              after(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return auth.logout();

                      case 2:
                        _context4.next = 4;
                        return (0, _WaitUtil.waitInSeconds)(1);

                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              })));
              before(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
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
                          path: _ClientHistoryRequest["default"].endPoints.conferenceCall
                        });
                        mock.numberParse({}, 'US');

                      case 9:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, this);
              })));
              it('Should Have No Records of Conference',
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return conferenceCall._makeConference(false);

                      case 2:
                        expect(conferenceCall.conferences).to.be.an('object').that.is.empty;

                      case 3:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              })));
              it('Should Have A Failure Alert', function () {
                expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _conferenceCallErrors["default"].makeConferenceFailed)).to.not.equal(undefined);
              });
              it('Should Not Bring Session into Non-existent Conference',
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return conferenceCall.bringInToConference(Math.random(), {
                          direction: _callDirections["default"].outbound
                        });

                      case 3:
                        _context7.next = 7;
                        break;

                      case 5:
                        _context7.prev = 5;
                        _context7.t0 = _context7["catch"](0);

                      case 7:
                        expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _conferenceCallErrors["default"].makeConferenceFailed)).to.not.equal(undefined);

                      case 8:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, null, [[0, 5]]);
              })));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
};

exports["default"] = _default;
//# sourceMappingURL=conferenceCall.js.map

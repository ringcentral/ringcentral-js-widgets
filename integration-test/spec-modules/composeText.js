'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _loginStatus = require('../../modules/Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _messageSenderMessages = require('../../modules/MessageSender/messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

var _HelpUtil = require('../utils/HelpUtil');

var _WaitUtil = require('../utils/WaitUtil');

var _ClientHistoryRequest = require('../utils/ClientHistoryRequest');

var _ClientHistoryRequest2 = _interopRequireDefault(_ClientHistoryRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (auth, client, account, alert, regionSettings, composeText, messageSender) {
  describe('ComposeText', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee41() {
    var _this = this;

    var conditionalDescribe, clientHistoryRequest;
    return _regenerator2.default.wrap(function _callee41$(_context41) {
      while (1) {
        switch (_context41.prev = _context41.next) {
          case 0:
            this.timeout(20000);
            conditionalDescribe = describe;
            clientHistoryRequest = new _ClientHistoryRequest2.default(new _map2.default(), client);


            before((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
              var isLoginSuccess;
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _HelpUtil.ensureLogin)(auth, account);

                    case 2:
                      isLoginSuccess = _context.sent;

                      if (!isLoginSuccess) {
                        conditionalDescribe = describe.skip;
                        console.error('Skip test case as failed to login with credential ', account);
                      }
                      _context.next = 6;
                      return (0, _WaitUtil.waitUntilNotNull)(function () {
                        return messageSender.senderNumbersList[0].phoneNumber;
                      }, 'First number in senderNumberList', 3);

                    case 6:
                      _context.next = 8;
                      return (0, _WaitUtil.waitUntilObjectSizeGreaterThan)(function () {
                        return composeText.senderNumber;
                      }, 'Sender Number', 0, 3);

                    case 8:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            })));

            conditionalDescribe('Should Init Successfully with Default Setting', function () {
              _this.timeout(20000);
              it('Should Set Sender Number with First SmsSender Phone Number by Default', function () {
                expect(composeText.senderNumber).to.equals(messageSender.senderNumbersList[0].phoneNumber);
              });
            });

            conditionalDescribe('Should Save Sender Number', function () {
              _this.timeout(20000);
              it('Should Update Sender Number After User Change Sender Number', function () {
                composeText.updateSenderNumber(messageSender.senderNumbersList[1].phoneNumber);
                expect(composeText.senderNumber).to.equals(messageSender.senderNumbersList[1].phoneNumber);
              });

              it('Should Remember Sender Number After Logout', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        composeText.updateSenderNumber(messageSender.senderNumbersList[1].phoneNumber);
                        auth.logout();
                        _context2.next = 4;
                        return (0, _WaitUtil.waitUntilEqual)(function () {
                          return auth.loginStatus;
                        }, 'LoginStatus', _loginStatus2.default.notLoggedIn, 3);

                      case 4:
                        auth.login((0, _extends3.default)({}, account));
                        _context2.next = 7;
                        return (0, _WaitUtil.waitUntilEqual)(function () {
                          return auth.loginStatus;
                        }, 'LoginStatus', _loginStatus2.default.loggedIn, 3);

                      case 7:
                        (0, _WaitUtil.waitInSeconds)(2);
                        expect(composeText.senderNumber).to.equals(messageSender.senderNumbersList[1].phoneNumber);

                      case 9:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              })));
            });

            conditionalDescribe('Should Update Typing Number', function () {
              _this.timeout(20000);
              it('Should Update Typing Number When User Typing Number', function () {
                composeText.updateTypingToNumber('123');
                expect(composeText.typingToNumber).to.equals('123');
              });

              it('Should Clean Typing Number When User Click Clean Button', function () {
                composeText.updateTypingToNumber('123');
                composeText.cleanTypingToNumber();
                expect(composeText.typingToNumber).to.equals('');
              });
            });

            conditionalDescribe('Should Update Message Text', function () {
              _this.timeout(20000);
              it('Should Update Message Text When User Type', function () {
                composeText.updateMessageText('1234');
                expect(composeText.messageText).to.equals('1234');
              });
            });

            conditionalDescribe('Should Update ToNumbers', function () {
              _this.timeout(20000);
              beforeEach(function () {
                composeText.clean();
              });

              it('Should Add Number to Selected Number List to ToNumbers When User Add it', function () {
                composeText.addToNumber({ phoneNumber: '+18558990011' });
                expect(composeText.toNumbers).to.deep.equals([{ phoneNumber: '+18558990011' }]);
              });

              it('Should Not Repeat Add Number to Selected Number List When User had add it', function () {
                composeText.addToNumber({ phoneNumber: '+18558990011' });
                composeText.addToNumber({ phoneNumber: '+18558990011' });
                expect(composeText.toNumbers).to.deep.equals([{ phoneNumber: '+18558990011' }]);
              });

              it('Should Remove ToNumber from Selected Number List When User Click Remove Button', function () {
                composeText.addToNumber({ phoneNumber: '+18558990011' });
                composeText.removeToNumber({ phoneNumber: '+18558990011' });
                expect(composeText.toNumbers).to.deep.equals([]);
              });
            });

            conditionalDescribe('Should Clean All Inputs After User Submit', function () {
              _this.timeout(20000);
              it('Should Clean All Inputs', function () {
                composeText.updateTypingToNumber('123');
                composeText.addToNumber({ phoneNumber: '+18558990011' });
                composeText.updateMessageText('1234');
                composeText.clean();
                expect(composeText.toNumbers).to.deep.equals([]);
                expect(composeText.typingToNumber).to.equals('');
                expect(composeText.messageText).to.equals('');
              });
            });

            conditionalDescribe('Should Send Message', function () {
              _this.timeout(20000);
              beforeEach(function () {
                composeText.clean();
              });

              it('Should SMS Message Successfully', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                var responses, rawRequest;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        composeText.addToNumber({ phoneNumber: '+18558990011' });
                        composeText.updateMessageText('test');
                        _context3.next = 4;
                        return composeText.send();

                      case 4:
                        responses = _context3.sent;

                        expect(responses[0]).to.include.keys('id', 'conversation');
                        expect(responses[0].type).to.equals('SMS');
                        expect(responses[0].subject).to.equals('test');
                        rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.sms);

                        expect((0, _stringify2.default)(responses[0])).to.equal((0, _stringify2.default)(rawRequest));

                      case 10:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              })));

              it('Should Send Pager Message Successfully', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                var responses, rawRequest;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        composeText.addToNumber({ phoneNumber: '101' });
                        composeText.updateMessageText('test 2');
                        _context4.next = 4;
                        return composeText.send();

                      case 4:
                        responses = _context4.sent;

                        expect(responses[0]).to.include.keys('id', 'conversation');
                        expect(responses[0].type).to.equals('Pager');
                        expect(responses[0].subject).to.equals('test 2');
                        rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.companyPager);

                        expect((0, _stringify2.default)(responses[0])).to.equal((0, _stringify2.default)(rawRequest));

                      case 10:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, _this);
              })));

              it('Should Send SMS and Pager Message Together Successfully', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
                var responses, smsRequest, pagerRequest;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        composeText.addToNumber({ phoneNumber: '+18558990011' });
                        composeText.addToNumber({ phoneNumber: '101' });
                        composeText.updateMessageText('test 3');
                        _context5.next = 5;
                        return composeText.send();

                      case 5:
                        responses = _context5.sent;

                        expect(responses[0]).to.include.keys('id', 'conversation');
                        expect(responses[0].subject).to.equals('test 3');
                        expect(responses[1].subject).to.equals('test 3');
                        smsRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.sms);
                        pagerRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.companyPager);

                        expect(smsRequest.type).to.equals('SMS');
                        expect(smsRequest.subject).to.equals('test 3');
                        expect(pagerRequest.type).to.equals('Pager');
                        expect(pagerRequest.subject).to.equals('test 3');

                      case 15:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, _this);
              })));

              it('Should Send Pager Message Successfully with Typing Number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
                var responses, rawRequest;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        composeText.updateTypingToNumber('101');
                        composeText.updateMessageText('test 4');
                        _context6.next = 4;
                        return composeText.send();

                      case 4:
                        responses = _context6.sent;

                        expect(responses[0]).to.include.keys('id', 'conversation');
                        expect(responses[0].type).to.equals('Pager');
                        expect(responses[0].subject).to.equals('test 4');
                        rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.companyPager);

                        expect((0, _stringify2.default)(responses[0])).to.equal((0, _stringify2.default)(rawRequest));

                      case 10:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, _this);
              })));
            });

            conditionalDescribe('Validation', function () {
              _this.timeout(20000);
              beforeEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
                var isAlertClear;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        composeText.clean();
                        _context7.next = 3;
                        return (0, _WaitUtil.waitUntilEqual)(function () {
                          alert.dismissAll();
                          return alert.state.messages.length;
                        }, 'Alert', 0, 5);

                      case 3:
                        isAlertClear = _context7.sent;

                        if (!isAlertClear) {
                          console.error('Alert is not cleared after dismissAll');
                          conditionalDescribe = describe.skip;
                        }

                      case 5:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, this);
              })));

              conditionalDescribe('Text Validation', function () {
                it('Should Alert of textEmpty When Text Is Empty', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
                  return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          composeText.updateTypingToNumber('+18558990011');
                          composeText.updateMessageText('');
                          _context8.next = 4;
                          return composeText.send();

                        case 4:
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.textEmpty)).to.not.equal(undefined);

                        case 5:
                        case 'end':
                          return _context8.stop();
                      }
                    }
                  }, _callee8, _this);
                })));

                it('Should Alert of textTooLong When Message Text length more than 1000', function () {
                  var str = Array(1002).join('x');
                  composeText.updateMessageText(str);
                  expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.textTooLong)).to.not.equal(undefined);
                  expect(composeText.messageText).to.equals('');
                });

                it('Should Alert of textEmpty When Text Is Empty with Space', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
                  var response;
                  return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          composeText.updateTypingToNumber('+18558990011');
                          composeText.updateMessageText('   ');
                          _context9.next = 4;
                          return composeText.send();

                        case 4:
                          response = _context9.sent;

                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.textEmpty)).to.not.equal(undefined);
                          expect(messageSender.idle).to.equals(true);
                          expect(response).to.equals(null);

                        case 8:
                        case 'end':
                          return _context9.stop();
                      }
                    }
                  }, _callee9, _this);
                })));
              });

              conditionalDescribe('Numbers Validation', function () {
                conditionalDescribe('Basic Validation', function () {
                  it('Should Alert of recipientsEmpty - Not Input Recepiant Number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
                    return _regenerator2.default.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            composeText.updateMessageText('test sender');
                            _context10.next = 3;
                            return composeText.send();

                          case 3:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.recipientsEmpty)).to.not.equal(undefined);

                          case 4:
                          case 'end':
                            return _context10.stop();
                        }
                      }
                    }, _callee10, _this);
                  })));

                  it('Should Alert of noToNumber - Typing Number is not number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
                    return _regenerator2.default.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            composeText.addToNumber({ phoneNumber: "iamn%@onedi!@$%^&()_=\\][';/.,~nu><.,,?/mber#*" });
                            composeText.updateMessageText('test sender');
                            _context11.next = 4;
                            return composeText.send();

                          case 4:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);

                          case 8:
                          case 'end':
                            return _context11.stop();
                        }
                      }
                    }, _callee11, _this);
                  })));

                  it('Should Alert of noToNumber - Valid Special Char but No Digital Number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
                    return _regenerator2.default.wrap(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            composeText.addToNumber({ phoneNumber: '+#' });
                            composeText.updateMessageText('test sender');
                            _context12.next = 4;
                            return composeText.send();

                          case 4:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);

                          case 8:
                          case 'end':
                            return _context12.stop();
                        }
                      }
                    }, _callee12, _this);
                  })));

                  it('Should Alert of recipientNumberInvalids - Typing Number Length more than 30', function () {
                    var str = Array(32).join('x');
                    composeText.updateTypingToNumber(str);
                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.recipientNumberInvalids)).to.not.equal(undefined);
                    expect(composeText.typingToNumber).to.equals('');
                  });

                  it('Should Alert of noToNumber - Send With wrong Typing Number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
                    var response;
                    return _regenerator2.default.wrap(function _callee13$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            composeText.updateTypingToNumber('test');
                            composeText.updateMessageText('test 5');
                            _context13.next = 4;
                            return composeText.send();

                          case 4:
                            response = _context13.sent;

                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.not.equal(undefined);
                            expect(response).to.equals(null);

                          case 7:
                          case 'end':
                            return _context13.stop();
                        }
                      }
                    }, _callee13, _this);
                  })));

                  it('Should Alert of noToNumber - one of toNumber is not number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
                    return _regenerator2.default.wrap(function _callee14$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                            composeText.addToNumber({ phoneNumber: '101' });
                            composeText.addToNumber({ phoneNumber: 'test' });
                            composeText.updateMessageText('test sender');
                            _context14.next = 5;
                            return composeText.send();

                          case 5:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);

                          case 9:
                          case 'end':
                            return _context14.stop();
                        }
                      }
                    }, _callee14, _this);
                  })));

                  it('Should Not Alert Anything - to Number in E.164 Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
                    var response;
                    return _regenerator2.default.wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            composeText.addToNumber({ phoneNumber: '+18558990011' });
                            composeText.updateMessageText('test');
                            _context15.next = 4;
                            return composeText.send();

                          case 4:
                            response = _context15.sent;

                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);

                          case 9:
                          case 'end':
                            return _context15.stop();
                        }
                      }
                    }, _callee15, _this);
                  })));
                });

                conditionalDescribe('Validation with US/CA Local Number Format', function () {
                  beforeEach(function () {
                    regionSettings.setData({ countryCode: 'US', areaCode: '' });
                  });

                  it('Should Not Alert Anything - To Number in (xxx)xxx-xxxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16() {
                    var responses;
                    return _regenerator2.default.wrap(function _callee16$(_context16) {
                      while (1) {
                        switch (_context16.prev = _context16.next) {
                          case 0:
                            composeText.updateTypingToNumber('(855)899-0011');
                            composeText.updateMessageText('test');
                            _context16.next = 4;
                            return composeText.send();

                          case 4:
                            responses = _context16.sent;

                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case 'end':
                            return _context16.stop();
                        }
                      }
                    }, _callee16, _this);
                  })));

                  it('Should Not Alert Anything - to Number in (xxx) xxx-xxxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17() {
                    var responses;
                    return _regenerator2.default.wrap(function _callee17$(_context17) {
                      while (1) {
                        switch (_context17.prev = _context17.next) {
                          case 0:
                            composeText.updateTypingToNumber('(855) 899-0011');
                            composeText.updateMessageText('test');
                            _context17.next = 4;
                            return composeText.send();

                          case 4:
                            responses = _context17.sent;

                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case 'end':
                            return _context17.stop();
                        }
                      }
                    }, _callee17, _this);
                  })));

                  it('Should Not Alert Anything - to Number in (xxx)xxx-xxxx*xxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18() {
                    var responses;
                    return _regenerator2.default.wrap(function _callee18$(_context18) {
                      while (1) {
                        switch (_context18.prev = _context18.next) {
                          case 0:
                            composeText.updateTypingToNumber('(888)349-5556*101');
                            composeText.updateMessageText('test');
                            _context18.next = 4;
                            return composeText.send();

                          case 4:
                            responses = _context18.sent;

                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case 'end':
                            return _context18.stop();
                        }
                      }
                    }, _callee18, _this);
                  })));

                  it('Should Not Alert Anything - to Number in (xxx) xxx-xxxx*xxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19() {
                    var responses;
                    return _regenerator2.default.wrap(function _callee19$(_context19) {
                      while (1) {
                        switch (_context19.prev = _context19.next) {
                          case 0:
                            composeText.updateTypingToNumber('(888) 349-5556*101');
                            composeText.updateMessageText('test');
                            _context19.next = 4;
                            return composeText.send();

                          case 4:
                            responses = _context19.sent;

                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case 'end':
                            return _context19.stop();
                        }
                      }
                    }, _callee19, _this);
                  })));

                  it('Should Not Alert Anything - to Number in xxx-xxx-xxxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20() {
                    var responses;
                    return _regenerator2.default.wrap(function _callee20$(_context20) {
                      while (1) {
                        switch (_context20.prev = _context20.next) {
                          case 0:
                            composeText.updateTypingToNumber('855-899-0011');
                            composeText.updateMessageText('test');
                            _context20.next = 4;
                            return composeText.send();

                          case 4:
                            responses = _context20.sent;

                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case 'end':
                            return _context20.stop();
                        }
                      }
                    }, _callee20, _this);
                  })));

                  it('Should Not Alert Anything - to Number in xxx-xxx-xxxx*xxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21() {
                    var responses;
                    return _regenerator2.default.wrap(function _callee21$(_context21) {
                      while (1) {
                        switch (_context21.prev = _context21.next) {
                          case 0:
                            composeText.updateTypingToNumber('888-349-5556*101');
                            composeText.updateMessageText('test');
                            _context21.next = 4;
                            return composeText.send();

                          case 4:
                            responses = _context21.sent;

                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case 'end':
                            return _context21.stop();
                        }
                      }
                    }, _callee21, _this);
                  })));
                });

                conditionalDescribe('Validation with Region Setting', function () {
                  it('Should Alert of noAreaCode - Typing Number length is 7 and no areaCode', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22() {
                    var response;
                    return _regenerator2.default.wrap(function _callee22$(_context22) {
                      while (1) {
                        switch (_context22.prev = _context22.next) {
                          case 0:
                            regionSettings.setData({ countryCode: 'CA', areaCode: '' });
                            composeText.updateTypingToNumber('6545672');
                            composeText.updateMessageText('test 6');
                            _context22.next = 5;
                            return composeText.send();

                          case 5:
                            response = _context22.sent;

                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.not.equal(undefined);
                            expect(response).to.equals(null);

                          case 8:
                          case 'end':
                            return _context22.stop();
                        }
                      }
                    }, _callee22, _this);
                  })));

                  it('Should Alert of No AreaCode - toNumber is 7 Digital Number with US Dialing Plan without Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23() {
                    return _regenerator2.default.wrap(function _callee23$(_context23) {
                      while (1) {
                        switch (_context23.prev = _context23.next) {
                          case 0:
                            regionSettings.setData({ countryCode: 'US', areaCode: '' });
                            composeText.addToNumber({ phoneNumber: '8990011' });
                            composeText.updateMessageText('test sender');
                            _context23.next = 5;
                            return composeText.send();

                          case 5:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                          case 9:
                          case 'end':
                            return _context23.stop();
                        }
                      }
                    }, _callee23, _this);
                  })));

                  it('Should Alert of No AreaCode - toNumber is 7 Digital Number with CA Dialing Plan without Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24() {
                    return _regenerator2.default.wrap(function _callee24$(_context24) {
                      while (1) {
                        switch (_context24.prev = _context24.next) {
                          case 0:
                            regionSettings.setData({ countryCode: 'CA', areaCode: '' });
                            composeText.addToNumber({ phoneNumber: '8990011' });
                            composeText.updateMessageText('test sender');
                            _context24.next = 5;
                            return composeText.send();

                          case 5:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                          case 9:
                          case 'end':
                            return _context24.stop();
                        }
                      }
                    }, _callee24, _this);
                  })));

                  it('Should Not Alert of Anything - toNumber is 7 Digital Number with CA Dialing Plan with Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee25() {
                    var rawRequest;
                    return _regenerator2.default.wrap(function _callee25$(_context25) {
                      while (1) {
                        switch (_context25.prev = _context25.next) {
                          case 0:
                            regionSettings.setData({ countryCode: 'CA', areaCode: '855' });
                            composeText.addToNumber({ phoneNumber: '8990011' });
                            composeText.updateMessageText('test sender');
                            _context25.prev = 3;
                            _context25.next = 6;
                            return composeText.send();

                          case 6:
                            _context25.next = 11;
                            break;

                          case 8:
                            _context25.prev = 8;
                            _context25.t0 = _context25['catch'](3);

                            console.debug('message sender e:', _context25.t0);

                          case 11:
                            rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.sms);

                            expect(rawRequest.to[0].phoneNumber).to.equal('+18558990011');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);
                            expect(messageSender.idle).to.equals(true);

                          case 18:
                          case 'end':
                            return _context25.stop();
                        }
                      }
                    }, _callee25, _this, [[3, 8]]);
                  })));

                  it('Should Not Alert of Anything - toNumber is 7 Digital Number with US Dialing Plan with Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee26() {
                    var rawRequest;
                    return _regenerator2.default.wrap(function _callee26$(_context26) {
                      while (1) {
                        switch (_context26.prev = _context26.next) {
                          case 0:
                            regionSettings.setData({ countryCode: 'US', areaCode: '855' });
                            composeText.addToNumber({ phoneNumber: '8990011' });
                            composeText.updateMessageText('test sender');
                            _context26.prev = 3;
                            _context26.next = 6;
                            return composeText.send();

                          case 6:
                            _context26.next = 11;
                            break;

                          case 8:
                            _context26.prev = 8;
                            _context26.t0 = _context26['catch'](3);

                            console.debug('message sender e:', _context26.t0);

                          case 11:
                            rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.sms);

                            expect(rawRequest.to[0].phoneNumber).to.equal('+18558990011');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                          case 17:
                          case 'end':
                            return _context26.stop();
                        }
                      }
                    }, _callee26, _this, [[3, 8]]);
                  })));
                });

                conditionalDescribe('Extension/Special Validation', function () {
                  conditionalDescribe('Not Included In Extension List', function () {
                    it('Should Alert of notAnExtension - Typing Number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee27() {
                      return _regenerator2.default.wrap(function _callee27$(_context27) {
                        while (1) {
                          switch (_context27.prev = _context27.next) {
                            case 0:
                              composeText.updateTypingToNumber('11111');
                              composeText.updateMessageText('test sender');
                              _context27.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 8:
                            case 'end':
                              return _context27.stop();
                          }
                        }
                      }, _callee27, _this);
                    })));

                    it('Should Alert of notAnExtension - To Number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee28() {
                      return _regenerator2.default.wrap(function _callee28$(_context28) {
                        while (1) {
                          switch (_context28.prev = _context28.next) {
                            case 0:
                              composeText.addToNumber({ phoneNumber: '11111' });
                              composeText.updateMessageText('test sender');
                              _context28.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 8:
                            case 'end':
                              return _context28.stop();
                          }
                        }
                      }, _callee28, _this);
                    })));

                    it('Should Alert of notAnExtension - To Number (xxx)xxx-xxxx*xxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee29() {
                      return _regenerator2.default.wrap(function _callee29$(_context29) {
                        while (1) {
                          switch (_context29.prev = _context29.next) {
                            case 0:
                              composeText.addToNumber({ phoneNumber: '(888) 349-5556*999' });
                              composeText.updateMessageText('test sender');
                              _context29.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 8:
                            case 'end':
                              return _context29.stop();
                          }
                        }
                      }, _callee29, _this);
                    })));
                  });

                  conditionalDescribe('GB Dialing Plan', function () {
                    beforeEach(function () {
                      regionSettings.setData({ countryCode: 'GB', areaCode: '' });
                    });

                    it('Should Alert Special Number - toNumber 101 (Existed Extension/Special Number)', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee30() {
                      return _regenerator2.default.wrap(function _callee30$(_context30) {
                        while (1) {
                          switch (_context30.prev = _context30.next) {
                            case 0:
                              composeText.addToNumber({ phoneNumber: '101' });
                              composeText.updateMessageText('test sender');
                              _context30.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 8:
                            case 'end':
                              return _context30.stop();
                          }
                        }
                      }, _callee30, _this);
                    })));

                    it('Should Alert notAnExtension - toNumber 998 (No Extension)', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee31() {
                      return _regenerator2.default.wrap(function _callee31$(_context31) {
                        while (1) {
                          switch (_context31.prev = _context31.next) {
                            case 0:
                              composeText.addToNumber({ phoneNumber: '998' });
                              composeText.updateMessageText('test sender');
                              _context31.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 8:
                            case 'end':
                              return _context31.stop();
                          }
                        }
                      }, _callee31, _this);
                    })));

                    it('Should Alert Special Number - toNumber 999', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee32() {
                      return _regenerator2.default.wrap(function _callee32$(_context32) {
                        while (1) {
                          switch (_context32.prev = _context32.next) {
                            case 0:
                              composeText.addToNumber({ phoneNumber: '999' });
                              composeText.updateMessageText('test sender');
                              _context32.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 8:
                            case 'end':
                              return _context32.stop();
                          }
                        }
                      }, _callee32, _this);
                    })));

                    it('Should Not Alert Special Number - toNumber 911', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee33() {
                      return _regenerator2.default.wrap(function _callee33$(_context33) {
                        while (1) {
                          switch (_context33.prev = _context33.next) {
                            case 0:
                              regionSettings.setData({ countryCode: 'GB', areaCode: '' });
                              composeText.addToNumber({ phoneNumber: '911' });
                              composeText.updateMessageText('test sender');
                              _context33.next = 5;
                              return composeText.send();

                            case 5:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);

                            case 6:
                            case 'end':
                              return _context33.stop();
                          }
                        }
                      }, _callee33, _this);
                    })));
                  });

                  conditionalDescribe('US Dialing Plan', function () {
                    beforeEach(function () {
                      regionSettings.setData({ countryCode: 'US', areaCode: '' });
                    });

                    it('Should Alert notAnExtension - toNumber 102 (No Extension/Not Special Number) with US Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee34() {
                      return _regenerator2.default.wrap(function _callee34$(_context34) {
                        while (1) {
                          switch (_context34.prev = _context34.next) {
                            case 0:
                              composeText.addToNumber({ phoneNumber: '102' });
                              composeText.updateMessageText('test sender');
                              _context34.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 8:
                            case 'end':
                              return _context34.stop();
                          }
                        }
                      }, _callee34, _this);
                    })));

                    it('Should Alert notAnExtension - toNumber 998 (No Extension)', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee35() {
                      return _regenerator2.default.wrap(function _callee35$(_context35) {
                        while (1) {
                          switch (_context35.prev = _context35.next) {
                            case 0:
                              composeText.addToNumber({ phoneNumber: '998' });
                              composeText.updateMessageText('test sender');
                              _context35.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 8:
                            case 'end':
                              return _context35.stop();
                          }
                        }
                      }, _callee35, _this);
                    })));

                    it('Should Alert Special Number - toNumber is 911', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee36() {
                      return _regenerator2.default.wrap(function _callee36$(_context36) {
                        while (1) {
                          switch (_context36.prev = _context36.next) {
                            case 0:
                              composeText.addToNumber({ phoneNumber: '911' });
                              composeText.updateMessageText('test sender');
                              _context36.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 8:
                            case 'end':
                              return _context36.stop();
                          }
                        }
                      }, _callee36, _this);
                    })));

                    it('Should Not Alert Special Number - toNumber 999', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee37() {
                      return _regenerator2.default.wrap(function _callee37$(_context37) {
                        while (1) {
                          switch (_context37.prev = _context37.next) {
                            case 0:
                              composeText.addToNumber({ phoneNumber: '999' });
                              composeText.updateMessageText('test sender');
                              _context37.next = 4;
                              return composeText.send();

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);

                            case 5:
                            case 'end':
                              return _context37.stop();
                          }
                        }
                      }, _callee37, _this);
                    })));

                    it('Should Not Alert Anything - toNumber 101 (Existed Extension/Not Special Number)', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee38() {
                      var rawRequest;
                      return _regenerator2.default.wrap(function _callee38$(_context38) {
                        while (1) {
                          switch (_context38.prev = _context38.next) {
                            case 0:
                              regionSettings.setData({ countryCode: 'US', areaCode: '' });
                              composeText.addToNumber({ phoneNumber: '101' });
                              composeText.updateMessageText('test sender');
                              _context38.prev = 3;
                              _context38.next = 6;
                              return composeText.send();

                            case 6:
                              _context38.next = 11;
                              break;

                            case 8:
                              _context38.prev = 8;
                              _context38.t0 = _context38['catch'](3);

                              console.debug('message sender e:', _context38.t0);

                            case 11:
                              rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest2.default.endPoints.companyPager);

                              expect(rawRequest.to[0].extensionNumber).to.equal('101');
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                            case 17:
                            case 'end':
                              return _context38.stop();
                          }
                        }
                      }, _callee38, _this, [[3, 8]]);
                    })));
                  });
                });
              });

              conditionalDescribe('Validate after Send Api', function () {
                it('Should Alert of recipientNumberInvalids - toNumber is invalid', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee39() {
                  return _regenerator2.default.wrap(function _callee39$(_context39) {
                    while (1) {
                      switch (_context39.prev = _context39.next) {
                        case 0:
                          composeText.addToNumber({ phoneNumber: '19999999' });
                          composeText.updateMessageText('test sender');
                          _context39.prev = 2;
                          _context39.next = 5;
                          return composeText.send();

                        case 5:
                          _context39.next = 10;
                          break;

                        case 7:
                          _context39.prev = 7;
                          _context39.t0 = _context39['catch'](2);

                          console.debug('message sender e:', _context39.t0);

                        case 10:
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.recipientNumberInvalids)).to.not.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                        case 15:
                        case 'end':
                          return _context39.stop();
                      }
                    }
                  }, _callee39, _this, [[2, 7]]);
                })));
                it('Should Alert of internationalSMSNotSupported - select international phone number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee40() {
                  return _regenerator2.default.wrap(function _callee40$(_context40) {
                    while (1) {
                      switch (_context40.prev = _context40.next) {
                        case 0:
                          regionSettings.setData({ countryCode: 'FR', areaCode: '' });
                          composeText.addToNumber({ phoneNumber: '855899001' });
                          composeText.updateMessageText("test sender");
                          _context40.prev = 3;
                          _context40.next = 6;
                          return composeText.send();

                        case 6:
                          _context40.next = 11;
                          break;

                        case 8:
                          _context40.prev = 8;
                          _context40.t0 = _context40['catch'](3);

                          console.debug('message sender e:', _context40.t0);

                        case 11:
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.internationalSMSNotSupported)).to.not.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noAreaCode)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.specialNumber)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.notAnExtension)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages2.default.noToNumber)).to.equal(undefined);

                        case 16:
                        case 'end':
                          return _context40.stop();
                      }
                    }
                  }, _callee40, _this, [[3, 8]]);
                })));
              });
            });

          case 12:
          case 'end':
            return _context41.stop();
        }
      }
    }, _callee41, this);
  })));
};
//# sourceMappingURL=composeText.js.map

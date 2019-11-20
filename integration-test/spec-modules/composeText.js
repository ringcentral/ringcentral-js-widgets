"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("regenerator-runtime/runtime");

var _loginStatus = _interopRequireDefault(require("../../modules/Auth/loginStatus"));

var _messageSenderMessages = _interopRequireDefault(require("../../modules/MessageSender/messageSenderMessages"));

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var _ClientHistoryRequest = _interopRequireDefault(require("../utils/ClientHistoryRequest"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(auth, client, account, alert, regionSettings, composeText, messageSender) {
  describe('ComposeText', function _callee41() {
    var conditionalDescribe, clientHistoryRequest;
    return regeneratorRuntime.async(function _callee41$(_context41) {
      while (1) {
        switch (_context41.prev = _context41.next) {
          case 0:
            _this.timeout(20000);

            conditionalDescribe = describe;
            clientHistoryRequest = new _ClientHistoryRequest["default"](new Map(), client);
            before(function _callee() {
              var isLoginSuccess;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap((0, _HelpUtil.ensureLogin)(auth, account));

                    case 2:
                      isLoginSuccess = _context.sent;

                      if (!isLoginSuccess) {
                        conditionalDescribe = describe.skip;
                        console.error('Skip test case as failed to login with credential ', account);
                      }

                      _context.next = 6;
                      return regeneratorRuntime.awrap((0, _WaitUtil.waitUntilNotNull)(function () {
                        return messageSender.senderNumbersList[0].phoneNumber;
                      }, 'First number in senderNumberList', 3));

                    case 6:
                      _context.next = 8;
                      return regeneratorRuntime.awrap((0, _WaitUtil.waitUntilObjectSizeGreaterThan)(function () {
                        return composeText.senderNumber;
                      }, 'Sender Number', 0, 3));

                    case 8:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
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
              it('Should Remember Sender Number After Logout', function _callee2() {
                return regeneratorRuntime.async(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        composeText.updateSenderNumber(messageSender.senderNumbersList[1].phoneNumber);
                        auth.logout();
                        _context2.next = 4;
                        return regeneratorRuntime.awrap((0, _WaitUtil.waitUntilEqual)(function () {
                          return auth.loginStatus;
                        }, 'LoginStatus', _loginStatus["default"].notLoggedIn, 3));

                      case 4:
                        auth.login(_objectSpread({}, account));
                        _context2.next = 7;
                        return regeneratorRuntime.awrap((0, _WaitUtil.waitUntilEqual)(function () {
                          return auth.loginStatus;
                        }, 'LoginStatus', _loginStatus["default"].loggedIn, 3));

                      case 7:
                        _context2.next = 9;
                        return regeneratorRuntime.awrap((0, _WaitUtil.waitInSeconds)(2));

                      case 9:
                        expect(composeText.senderNumber).to.equals(messageSender.senderNumbersList[1].phoneNumber);

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              });
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
                composeText.addToNumber({
                  phoneNumber: '+18558990011'
                });
                expect(composeText.toNumbers).to.deep.equals([{
                  phoneNumber: '+18558990011'
                }]);
              });
              it('Should Not Repeat Add Number to Selected Number List When User had add it', function () {
                composeText.addToNumber({
                  phoneNumber: '+18558990011'
                });
                composeText.addToNumber({
                  phoneNumber: '+18558990011'
                });
                expect(composeText.toNumbers).to.deep.equals([{
                  phoneNumber: '+18558990011'
                }]);
              });
              it('Should Remove ToNumber from Selected Number List When User Click Remove Button', function () {
                composeText.addToNumber({
                  phoneNumber: '+18558990011'
                });
                composeText.removeToNumber({
                  phoneNumber: '+18558990011'
                });
                expect(composeText.toNumbers).to.deep.equals([]);
              });
            });
            conditionalDescribe('Should Clean All Inputs After User Submit', function () {
              _this.timeout(20000);

              it('Should Clean All Inputs', function () {
                composeText.updateTypingToNumber('123');
                composeText.addToNumber({
                  phoneNumber: '+18558990011'
                });
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
              it('Should SMS Message Successfully', function _callee3() {
                var responses, rawRequest;
                return regeneratorRuntime.async(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        composeText.addToNumber({
                          phoneNumber: '+18558990011'
                        });
                        composeText.updateMessageText('test');
                        _context3.next = 4;
                        return regeneratorRuntime.awrap(composeText.send());

                      case 4:
                        responses = _context3.sent;
                        expect(responses[0]).to.include.keys('id', 'conversation');
                        expect(responses[0].type).to.equals('SMS');
                        expect(responses[0].subject).to.equals('test');
                        rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest["default"].endPoints.sms);
                        expect(JSON.stringify(responses[0])).to.equal(JSON.stringify(rawRequest));

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                });
              });
              it('Should Send Pager Message Successfully', function _callee4() {
                var responses, rawRequest;
                return regeneratorRuntime.async(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        composeText.addToNumber({
                          phoneNumber: '101'
                        });
                        composeText.updateMessageText('test 2');
                        _context4.next = 4;
                        return regeneratorRuntime.awrap(composeText.send());

                      case 4:
                        responses = _context4.sent;
                        expect(responses[0]).to.include.keys('id', 'conversation');
                        expect(responses[0].type).to.equals('Pager');
                        expect(responses[0].subject).to.equals('test 2');
                        rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest["default"].endPoints.companyPager);
                        expect(JSON.stringify(responses[0])).to.equal(JSON.stringify(rawRequest));

                      case 10:
                      case "end":
                        return _context4.stop();
                    }
                  }
                });
              });
              it('Should Send SMS and Pager Message Together Successfully', function _callee5() {
                var responses, smsRequest, pagerRequest;
                return regeneratorRuntime.async(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        composeText.addToNumber({
                          phoneNumber: '+18558990011'
                        });
                        composeText.addToNumber({
                          phoneNumber: '101'
                        });
                        composeText.updateMessageText('test 3');
                        _context5.next = 5;
                        return regeneratorRuntime.awrap(composeText.send());

                      case 5:
                        responses = _context5.sent;
                        expect(responses[0]).to.include.keys('id', 'conversation');
                        expect(responses[0].subject).to.equals('test 3');
                        expect(responses[1].subject).to.equals('test 3');
                        smsRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest["default"].endPoints.sms);
                        pagerRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest["default"].endPoints.companyPager);
                        expect(smsRequest.type).to.equals('SMS');
                        expect(smsRequest.subject).to.equals('test 3');
                        expect(pagerRequest.type).to.equals('Pager');
                        expect(pagerRequest.subject).to.equals('test 3');

                      case 15:
                      case "end":
                        return _context5.stop();
                    }
                  }
                });
              });
              it('Should Send Pager Message Successfully with Typing Number', function _callee6() {
                var responses, rawRequest;
                return regeneratorRuntime.async(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        composeText.updateTypingToNumber('101');
                        composeText.updateMessageText('test 4');
                        _context6.next = 4;
                        return regeneratorRuntime.awrap(composeText.send());

                      case 4:
                        responses = _context6.sent;
                        expect(responses[0]).to.include.keys('id', 'conversation');
                        expect(responses[0].type).to.equals('Pager');
                        expect(responses[0].subject).to.equals('test 4');
                        rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest["default"].endPoints.companyPager);
                        expect(JSON.stringify(responses[0])).to.equal(JSON.stringify(rawRequest));

                      case 10:
                      case "end":
                        return _context6.stop();
                    }
                  }
                });
              });
            });
            conditionalDescribe('Validation', function () {
              _this.timeout(20000);

              beforeEach(function _callee7() {
                var isAlertClear;
                return regeneratorRuntime.async(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        composeText.clean();
                        _context7.next = 3;
                        return regeneratorRuntime.awrap((0, _WaitUtil.waitUntilEqual)(function () {
                          alert.dismissAll();
                          return alert.state.messages.length;
                        }, 'Alert', 0, 5));

                      case 3:
                        isAlertClear = _context7.sent;

                        if (!isAlertClear) {
                          console.error('Alert is not cleared after dismissAll');
                          conditionalDescribe = describe.skip;
                        }

                      case 5:
                      case "end":
                        return _context7.stop();
                    }
                  }
                });
              });
              conditionalDescribe('Text Validation', function () {
                it('Should Alert of textEmpty When Text Is Empty', function _callee8() {
                  return regeneratorRuntime.async(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          composeText.updateTypingToNumber('+18558990011');
                          composeText.updateMessageText('');
                          _context8.next = 4;
                          return regeneratorRuntime.awrap(composeText.send());

                        case 4:
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].textEmpty)).to.not.equal(undefined);

                        case 5:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  });
                });
                it('Should Alert of textTooLong When Message Text length more than 1000', function () {
                  var str = Array(1002).join('x');
                  composeText.updateMessageText(str);
                  expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].textTooLong)).to.not.equal(undefined);
                  expect(composeText.messageText).to.equals('');
                });
                it('Should Alert of textEmpty When Text Is Empty with Space', function _callee9() {
                  var response;
                  return regeneratorRuntime.async(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          composeText.updateTypingToNumber('+18558990011');
                          composeText.updateMessageText('   ');
                          _context9.next = 4;
                          return regeneratorRuntime.awrap(composeText.send());

                        case 4:
                          response = _context9.sent;
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].textEmpty)).to.not.equal(undefined);
                          expect(messageSender.idle).to.equals(true);
                          expect(response).to.equals(null);

                        case 8:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  });
                });
              });
              conditionalDescribe('Numbers Validation', function () {
                conditionalDescribe('Basic Validation', function () {
                  it('Should Alert of recipientsEmpty - Not Input Recepiant Number', function _callee10() {
                    return regeneratorRuntime.async(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            composeText.updateMessageText('test sender');
                            _context10.next = 3;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 3:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].recipientsEmpty)).to.not.equal(undefined);

                          case 4:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    });
                  });
                  it('Should Alert of noToNumber - Typing Number is not number', function _callee11() {
                    return regeneratorRuntime.async(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            composeText.addToNumber({
                              phoneNumber: "iamn%@onedi!@$%^&()_=\\][';/.,~nu><.,,?/mber#*"
                            });
                            composeText.updateMessageText('test sender');
                            _context11.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);

                          case 8:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    });
                  });
                  it('Should Alert of noToNumber - Valid Special Char but No Digital Number', function _callee12() {
                    return regeneratorRuntime.async(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            composeText.addToNumber({
                              phoneNumber: '+#'
                            });
                            composeText.updateMessageText('test sender');
                            _context12.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);

                          case 8:
                          case "end":
                            return _context12.stop();
                        }
                      }
                    });
                  });
                  it('Should Alert of recipientNumberInvalids - Typing Number Length more than 30', function () {
                    var str = Array(32).join('x');
                    composeText.updateTypingToNumber(str);
                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].recipientNumberInvalids)).to.not.equal(undefined);
                    expect(composeText.typingToNumber).to.equals('');
                  });
                  it('Should Alert of noToNumber - Send With wrong Typing Number', function _callee13() {
                    var response;
                    return regeneratorRuntime.async(function _callee13$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            composeText.updateTypingToNumber('test');
                            composeText.updateMessageText('test 5');
                            _context13.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            response = _context13.sent;
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.not.equal(undefined);
                            expect(response).to.equals(null);

                          case 7:
                          case "end":
                            return _context13.stop();
                        }
                      }
                    });
                  });
                  it('Should Alert of noToNumber - one of toNumber is not number', function _callee14() {
                    return regeneratorRuntime.async(function _callee14$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                            composeText.addToNumber({
                              phoneNumber: '101'
                            });
                            composeText.addToNumber({
                              phoneNumber: 'test'
                            });
                            composeText.updateMessageText('test sender');
                            _context14.next = 5;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 5:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);

                          case 9:
                          case "end":
                            return _context14.stop();
                        }
                      }
                    });
                  });
                  it('Should Not Alert Anything - to Number in E.164 Format', function _callee15() {
                    var response;
                    return regeneratorRuntime.async(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            composeText.addToNumber({
                              phoneNumber: '+18558990011'
                            });
                            composeText.updateMessageText('test');
                            _context15.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            response = _context15.sent;
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);

                          case 9:
                          case "end":
                            return _context15.stop();
                        }
                      }
                    });
                  });
                });
                conditionalDescribe('Validation with US/CA Local Number Format', function () {
                  beforeEach(function () {
                    regionSettings.setData({
                      countryCode: 'US',
                      areaCode: ''
                    });
                  });
                  it('Should Not Alert Anything - To Number in (xxx)xxx-xxxx Format', function _callee16() {
                    var responses;
                    return regeneratorRuntime.async(function _callee16$(_context16) {
                      while (1) {
                        switch (_context16.prev = _context16.next) {
                          case 0:
                            composeText.updateTypingToNumber('(855)899-0011');
                            composeText.updateMessageText('test');
                            _context16.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            responses = _context16.sent;
                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case "end":
                            return _context16.stop();
                        }
                      }
                    });
                  });
                  it('Should Not Alert Anything - to Number in (xxx) xxx-xxxx Format', function _callee17() {
                    var responses;
                    return regeneratorRuntime.async(function _callee17$(_context17) {
                      while (1) {
                        switch (_context17.prev = _context17.next) {
                          case 0:
                            composeText.updateTypingToNumber('(855) 899-0011');
                            composeText.updateMessageText('test');
                            _context17.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            responses = _context17.sent;
                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case "end":
                            return _context17.stop();
                        }
                      }
                    });
                  });
                  it('Should Not Alert Anything - to Number in (xxx)xxx-xxxx*xxx Format', function _callee18() {
                    var responses;
                    return regeneratorRuntime.async(function _callee18$(_context18) {
                      while (1) {
                        switch (_context18.prev = _context18.next) {
                          case 0:
                            composeText.updateTypingToNumber('(866)211-8665*101');
                            composeText.updateMessageText('test');
                            _context18.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            responses = _context18.sent;
                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case "end":
                            return _context18.stop();
                        }
                      }
                    });
                  });
                  it('Should Not Alert Anything - to Number in (xxx) xxx-xxxx*xxx Format', function _callee19() {
                    var responses;
                    return regeneratorRuntime.async(function _callee19$(_context19) {
                      while (1) {
                        switch (_context19.prev = _context19.next) {
                          case 0:
                            composeText.updateTypingToNumber('(866) 211-8665*101');
                            composeText.updateMessageText('test');
                            _context19.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            responses = _context19.sent;
                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case "end":
                            return _context19.stop();
                        }
                      }
                    });
                  });
                  it('Should Not Alert Anything - to Number in xxx-xxx-xxxx Format', function _callee20() {
                    var responses;
                    return regeneratorRuntime.async(function _callee20$(_context20) {
                      while (1) {
                        switch (_context20.prev = _context20.next) {
                          case 0:
                            composeText.updateTypingToNumber('866-211-8665');
                            composeText.updateMessageText('test');
                            _context20.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            responses = _context20.sent;
                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case "end":
                            return _context20.stop();
                        }
                      }
                    });
                  });
                  it('Should Not Alert Anything - to Number in xxx-xxx-xxxx*xxx Format', function _callee21() {
                    var responses;
                    return regeneratorRuntime.async(function _callee21$(_context21) {
                      while (1) {
                        switch (_context21.prev = _context21.next) {
                          case 0:
                            composeText.updateTypingToNumber('866-211-8665*101');
                            composeText.updateMessageText('test');
                            _context21.next = 4;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 4:
                            responses = _context21.sent;
                            expect(responses[0]).to.include.keys('id', 'conversation');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notSmsToExtension)).to.equal(undefined);

                          case 11:
                          case "end":
                            return _context21.stop();
                        }
                      }
                    });
                  });
                });
                conditionalDescribe('Validation with Region Setting', function () {
                  it('Should Alert of noAreaCode - Typing Number length is 7 and no areaCode', function _callee22() {
                    var response;
                    return regeneratorRuntime.async(function _callee22$(_context22) {
                      while (1) {
                        switch (_context22.prev = _context22.next) {
                          case 0:
                            regionSettings.setData({
                              countryCode: 'CA',
                              areaCode: ''
                            });
                            composeText.updateTypingToNumber('6545672');
                            composeText.updateMessageText('test 6');
                            _context22.next = 5;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 5:
                            response = _context22.sent;
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.not.equal(undefined);
                            expect(response).to.equals(null);

                          case 8:
                          case "end":
                            return _context22.stop();
                        }
                      }
                    });
                  });
                  it('Should Alert of No AreaCode - toNumber is 7 Digital Number with US Dialing Plan without Area Code', function _callee23() {
                    return regeneratorRuntime.async(function _callee23$(_context23) {
                      while (1) {
                        switch (_context23.prev = _context23.next) {
                          case 0:
                            regionSettings.setData({
                              countryCode: 'US',
                              areaCode: ''
                            });
                            composeText.addToNumber({
                              phoneNumber: '8990011'
                            });
                            composeText.updateMessageText('test sender');
                            _context23.next = 5;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 5:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                          case 9:
                          case "end":
                            return _context23.stop();
                        }
                      }
                    });
                  });
                  it('Should Alert of No AreaCode - toNumber is 7 Digital Number with CA Dialing Plan without Area Code', function _callee24() {
                    return regeneratorRuntime.async(function _callee24$(_context24) {
                      while (1) {
                        switch (_context24.prev = _context24.next) {
                          case 0:
                            regionSettings.setData({
                              countryCode: 'CA',
                              areaCode: ''
                            });
                            composeText.addToNumber({
                              phoneNumber: '8990011'
                            });
                            composeText.updateMessageText('test sender');
                            _context24.next = 5;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 5:
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.not.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                          case 9:
                          case "end":
                            return _context24.stop();
                        }
                      }
                    });
                  });
                  it('Should Not Alert of Anything - toNumber is 7 Digital Number with CA Dialing Plan with Area Code', function _callee25() {
                    var rawRequest;
                    return regeneratorRuntime.async(function _callee25$(_context25) {
                      while (1) {
                        switch (_context25.prev = _context25.next) {
                          case 0:
                            regionSettings.setData({
                              countryCode: 'CA',
                              areaCode: '855'
                            });
                            composeText.addToNumber({
                              phoneNumber: '8990011'
                            });
                            composeText.updateMessageText('test sender');
                            _context25.prev = 3;
                            _context25.next = 6;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 6:
                            _context25.next = 11;
                            break;

                          case 8:
                            _context25.prev = 8;
                            _context25.t0 = _context25["catch"](3);
                            console.debug('message sender e:', _context25.t0);

                          case 11:
                            rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest["default"].endPoints.sms);
                            expect(rawRequest.to[0].phoneNumber).to.equal('+18558990011');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);
                            expect(messageSender.idle).to.equals(true);

                          case 18:
                          case "end":
                            return _context25.stop();
                        }
                      }
                    }, null, null, [[3, 8]]);
                  });
                  it('Should Not Alert of Anything - toNumber is 7 Digital Number with US Dialing Plan with Area Code', function _callee26() {
                    var rawRequest;
                    return regeneratorRuntime.async(function _callee26$(_context26) {
                      while (1) {
                        switch (_context26.prev = _context26.next) {
                          case 0:
                            regionSettings.setData({
                              countryCode: 'US',
                              areaCode: '855'
                            });
                            composeText.addToNumber({
                              phoneNumber: '8990011'
                            });
                            composeText.updateMessageText('test sender');
                            _context26.prev = 3;
                            _context26.next = 6;
                            return regeneratorRuntime.awrap(composeText.send());

                          case 6:
                            _context26.next = 11;
                            break;

                          case 8:
                            _context26.prev = 8;
                            _context26.t0 = _context26["catch"](3);
                            console.debug('message sender e:', _context26.t0);

                          case 11:
                            rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest["default"].endPoints.sms);
                            expect(rawRequest.to[0].phoneNumber).to.equal('+18558990011');
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                            expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                          case 17:
                          case "end":
                            return _context26.stop();
                        }
                      }
                    }, null, null, [[3, 8]]);
                  });
                });
                conditionalDescribe('Extension/Special Validation', function () {
                  conditionalDescribe('Not Included In Extension List', function () {
                    it('Should Alert of notAnExtension - Typing Number', function _callee27() {
                      return regeneratorRuntime.async(function _callee27$(_context27) {
                        while (1) {
                          switch (_context27.prev = _context27.next) {
                            case 0:
                              composeText.updateTypingToNumber('11111');
                              composeText.updateMessageText('test sender');
                              _context27.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 8:
                            case "end":
                              return _context27.stop();
                          }
                        }
                      });
                    });
                    it('Should Alert of notAnExtension - To Number', function _callee28() {
                      return regeneratorRuntime.async(function _callee28$(_context28) {
                        while (1) {
                          switch (_context28.prev = _context28.next) {
                            case 0:
                              composeText.addToNumber({
                                phoneNumber: '11111'
                              });
                              composeText.updateMessageText('test sender');
                              _context28.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 8:
                            case "end":
                              return _context28.stop();
                          }
                        }
                      });
                    });
                    it('Should Alert of notAnExtension - To Number (xxx)xxx-xxxx*xxx Format', function _callee29() {
                      return regeneratorRuntime.async(function _callee29$(_context29) {
                        while (1) {
                          switch (_context29.prev = _context29.next) {
                            case 0:
                              composeText.addToNumber({
                                phoneNumber: '(888) 349-5556*999'
                              });
                              composeText.updateMessageText('test sender');
                              _context29.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 8:
                            case "end":
                              return _context29.stop();
                          }
                        }
                      });
                    });
                  });
                  conditionalDescribe('GB Dialing Plan', function () {
                    beforeEach(function () {
                      regionSettings.setData({
                        countryCode: 'GB',
                        areaCode: ''
                      });
                    });
                    it('Should Alert Special Number - toNumber 101 (Existed Extension/Special Number)', function _callee30() {
                      return regeneratorRuntime.async(function _callee30$(_context30) {
                        while (1) {
                          switch (_context30.prev = _context30.next) {
                            case 0:
                              composeText.addToNumber({
                                phoneNumber: '101'
                              });
                              composeText.updateMessageText('test sender');
                              _context30.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 8:
                            case "end":
                              return _context30.stop();
                          }
                        }
                      });
                    });
                    it('Should Alert notAnExtension - toNumber 998 (No Extension)', function _callee31() {
                      return regeneratorRuntime.async(function _callee31$(_context31) {
                        while (1) {
                          switch (_context31.prev = _context31.next) {
                            case 0:
                              composeText.addToNumber({
                                phoneNumber: '998'
                              });
                              composeText.updateMessageText('test sender');
                              _context31.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 8:
                            case "end":
                              return _context31.stop();
                          }
                        }
                      });
                    });
                    it('Should Alert Special Number - toNumber 999', function _callee32() {
                      return regeneratorRuntime.async(function _callee32$(_context32) {
                        while (1) {
                          switch (_context32.prev = _context32.next) {
                            case 0:
                              composeText.addToNumber({
                                phoneNumber: '999'
                              });
                              composeText.updateMessageText('test sender');
                              _context32.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 8:
                            case "end":
                              return _context32.stop();
                          }
                        }
                      });
                    });
                    it('Should Not Alert Special Number - toNumber 911', function _callee33() {
                      return regeneratorRuntime.async(function _callee33$(_context33) {
                        while (1) {
                          switch (_context33.prev = _context33.next) {
                            case 0:
                              regionSettings.setData({
                                countryCode: 'GB',
                                areaCode: ''
                              });
                              composeText.addToNumber({
                                phoneNumber: '911'
                              });
                              composeText.updateMessageText('test sender');
                              _context33.next = 5;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 5:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);

                            case 6:
                            case "end":
                              return _context33.stop();
                          }
                        }
                      });
                    });
                  });
                  conditionalDescribe('US Dialing Plan', function () {
                    beforeEach(function () {
                      regionSettings.setData({
                        countryCode: 'US',
                        areaCode: ''
                      });
                    });
                    it('Should Alert notAnExtension - toNumber 102 (No Extension/Not Special Number) with US Dialing Plan', function _callee34() {
                      return regeneratorRuntime.async(function _callee34$(_context34) {
                        while (1) {
                          switch (_context34.prev = _context34.next) {
                            case 0:
                              composeText.addToNumber({
                                phoneNumber: '102'
                              });
                              composeText.updateMessageText('test sender');
                              _context34.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 8:
                            case "end":
                              return _context34.stop();
                          }
                        }
                      });
                    });
                    it('Should Alert notAnExtension - toNumber 998 (No Extension)', function _callee35() {
                      return regeneratorRuntime.async(function _callee35$(_context35) {
                        while (1) {
                          switch (_context35.prev = _context35.next) {
                            case 0:
                              composeText.addToNumber({
                                phoneNumber: '998'
                              });
                              composeText.updateMessageText('test sender');
                              _context35.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 8:
                            case "end":
                              return _context35.stop();
                          }
                        }
                      });
                    });
                    it('Should Alert Special Number - toNumber is 911', function _callee36() {
                      return regeneratorRuntime.async(function _callee36$(_context36) {
                        while (1) {
                          switch (_context36.prev = _context36.next) {
                            case 0:
                              composeText.addToNumber({
                                phoneNumber: '911'
                              });
                              composeText.updateMessageText('test sender');
                              _context36.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.not.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 8:
                            case "end":
                              return _context36.stop();
                          }
                        }
                      });
                    });
                    it('Should Not Alert Special Number - toNumber 999', function _callee37() {
                      return regeneratorRuntime.async(function _callee37$(_context37) {
                        while (1) {
                          switch (_context37.prev = _context37.next) {
                            case 0:
                              composeText.addToNumber({
                                phoneNumber: '999'
                              });
                              composeText.updateMessageText('test sender');
                              _context37.next = 4;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 4:
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);

                            case 5:
                            case "end":
                              return _context37.stop();
                          }
                        }
                      });
                    });
                    it('Should Not Alert Anything - toNumber 101 (Existed Extension/Not Special Number)', function _callee38() {
                      var rawRequest;
                      return regeneratorRuntime.async(function _callee38$(_context38) {
                        while (1) {
                          switch (_context38.prev = _context38.next) {
                            case 0:
                              regionSettings.setData({
                                countryCode: 'US',
                                areaCode: ''
                              });
                              composeText.addToNumber({
                                phoneNumber: '101'
                              });
                              composeText.updateMessageText('test sender');
                              _context38.prev = 3;
                              _context38.next = 6;
                              return regeneratorRuntime.awrap(composeText.send());

                            case 6:
                              _context38.next = 11;
                              break;

                            case 8:
                              _context38.prev = 8;
                              _context38.t0 = _context38["catch"](3);
                              console.debug('message sender e:', _context38.t0);

                            case 11:
                              rawRequest = clientHistoryRequest.getRawResponse(_ClientHistoryRequest["default"].endPoints.companyPager);
                              expect(rawRequest.to[0].extensionNumber).to.equal('101');
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                              expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                            case 17:
                            case "end":
                              return _context38.stop();
                          }
                        }
                      }, null, null, [[3, 8]]);
                    });
                  });
                });
              });
              conditionalDescribe('Validate after Send Api', function () {
                it('Should Alert of recipientNumberInvalids - toNumber is invalid', function _callee39() {
                  return regeneratorRuntime.async(function _callee39$(_context39) {
                    while (1) {
                      switch (_context39.prev = _context39.next) {
                        case 0:
                          composeText.addToNumber({
                            phoneNumber: '19999999'
                          });
                          composeText.updateMessageText('test sender');
                          _context39.prev = 2;
                          _context39.next = 5;
                          return regeneratorRuntime.awrap(composeText.send());

                        case 5:
                          _context39.next = 10;
                          break;

                        case 7:
                          _context39.prev = 7;
                          _context39.t0 = _context39["catch"](2);
                          console.debug('message sender e:', _context39.t0);

                        case 10:
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].recipientNumberInvalids)).to.not.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                        case 15:
                        case "end":
                          return _context39.stop();
                      }
                    }
                  }, null, null, [[2, 7]]);
                });
                it('Should Alert of internationalSMSNotSupported - select international phone number', function _callee40() {
                  return regeneratorRuntime.async(function _callee40$(_context40) {
                    while (1) {
                      switch (_context40.prev = _context40.next) {
                        case 0:
                          regionSettings.setData({
                            countryCode: 'FR',
                            areaCode: ''
                          });
                          composeText.addToNumber({
                            phoneNumber: '855899001'
                          });
                          composeText.updateMessageText('test sender');
                          _context40.prev = 3;
                          _context40.next = 6;
                          return regeneratorRuntime.awrap(composeText.send());

                        case 6:
                          _context40.next = 11;
                          break;

                        case 8:
                          _context40.prev = 8;
                          _context40.t0 = _context40["catch"](3);
                          console.debug('message sender e:', _context40.t0);

                        case 11:
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].internationalSMSNotSupported)).to.not.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noAreaCode)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].specialNumber)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].notAnExtension)).to.equal(undefined);
                          expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _messageSenderMessages["default"].noToNumber)).to.equal(undefined);

                        case 16:
                        case "end":
                          return _context40.stop();
                      }
                    }
                  }, null, null, [[3, 8]]);
                });
              });
            });

          case 12:
          case "end":
            return _context41.stop();
        }
      }
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=composeText.js.map

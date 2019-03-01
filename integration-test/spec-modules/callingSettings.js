"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _callingOptions = _interopRequireDefault(require("../../modules/CallingSettings/callingOptions"));

var _callingModes = _interopRequireDefault(require("../../modules/CallingSettings/callingModes"));

var _callingSettingsMessages = _interopRequireDefault(require("../..//modules/CallingSettings/callingSettingsMessages"));

var _loginStatus = _interopRequireDefault(require("../../modules/Auth/loginStatus"));

var _HelpUtil = require("../utils/HelpUtil");

var _WaitUtil = require("../utils/WaitUtil");

var mock = _interopRequireWildcard(require("../mock"));

var _authzProfile = _interopRequireDefault(require("../mock/data/authzProfile"));

var _extensionInfo = _interopRequireDefault(require("../mock/data/extensionInfo"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(auth, client, alert, account, callingSettings, extensionPhoneNumber, extensionInfo) {
  describe('Calling Settings',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee22() {
    var isLoginSuccess;
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            this.timeout(20000);
            mock.mockClient(client);
            describe('When has permission',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee19() {
              return regeneratorRuntime.wrap(function _callee19$(_context19) {
                while (1) {
                  switch (_context19.prev = _context19.next) {
                    case 0:
                      this.timeout(20000);
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
                                  this.skip();
                                }

                              case 5:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee, this);
                      })));
                      it('Should Be Make Call with Softphone by Default',
                      /*#__PURE__*/
                      _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee2() {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                expect(callingSettings.callWith).to.equals(_callingOptions.default.softphone);
                                expect(callingSettings.callingMode).to.equals(_callingModes.default.softphone);

                              case 2:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2);
                      })));
                      describe('Should Save Calling Mode', function () {
                        this.timeout(20000);
                        it('Should Save My RingCentral Phone',
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee3() {
                          return regeneratorRuntime.wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  callingSettings.setData({
                                    callWith: _callingOptions.default.myphone
                                  });
                                  expect(callingSettings.callWith).to.equals(_callingOptions.default.myphone);
                                  expect(callingSettings.callingMode).to.equals(_callingModes.default.ringout);

                                case 3:
                                case "end":
                                  return _context3.stop();
                              }
                            }
                          }, _callee3);
                        })));
                        it('Should Save Other Phone',
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee4() {
                          return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  callingSettings.setData({
                                    callWith: _callingOptions.default.otherphone
                                  });
                                  expect(callingSettings.callWith).to.equals(_callingOptions.default.otherphone);
                                  expect(callingSettings.callingMode).to.equals(_callingModes.default.ringout);

                                case 3:
                                case "end":
                                  return _context4.stop();
                              }
                            }
                          }, _callee4);
                        })));
                        it('Should Save Custom Phone',
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee5() {
                          return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  callingSettings.setData({
                                    callWith: _callingOptions.default.customphone
                                  });
                                  expect(callingSettings.callWith).to.equals(_callingOptions.default.customphone);
                                  expect(callingSettings.callingMode).to.equals(_callingModes.default.ringout);

                                case 3:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5);
                        })));
                      });
                      describe('Should Save Options in RingOut Mode', function () {
                        this.timeout(20000);
                        it('Should Save From Number',
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee6() {
                          return regeneratorRuntime.wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  callingSettings.setData({
                                    myLocation: '123'
                                  });
                                  expect(callingSettings.myLocation).to.equals('123');

                                case 2:
                                case "end":
                                  return _context6.stop();
                              }
                            }
                          }, _callee6);
                        })));
                        it('Should Save RingoutPrompt',
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee7() {
                          return regeneratorRuntime.wrap(function _callee7$(_context7) {
                            while (1) {
                              switch (_context7.prev = _context7.next) {
                                case 0:
                                  callingSettings.setData({
                                    ringoutPrompt: '123'
                                  });
                                  expect(callingSettings.ringoutPrompt).to.equals('123');

                                case 2:
                                case "end":
                                  return _context7.stop();
                              }
                            }
                          }, _callee7);
                        })));
                      });
                      describe('Should Allow Alert', function () {
                        this.timeout(20000);
                        beforeEach(
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee8() {
                          var isAlertClear;
                          return regeneratorRuntime.wrap(function _callee8$(_context8) {
                            while (1) {
                              switch (_context8.prev = _context8.next) {
                                case 0:
                                  _context8.next = 2;
                                  return (0, _WaitUtil.waitUntilEqual)(function () {
                                    alert.dismissAll();
                                    return alert.state.messages.length;
                                  }, 'Alert', 0, 5);

                                case 2:
                                  isAlertClear = _context8.sent;

                                  if (!isAlertClear) {
                                    console.error('Alert is not cleared after dismissAll');
                                    this.skip();
                                  }

                                case 4:
                                case "end":
                                  return _context8.stop();
                              }
                            }
                          }, _callee8, this);
                        })));
                        describe('Should Prompt Alerts when withPrompt Equals True', function () {
                          it('Should Prompt Alert of saveSuccessWithSoftphone',
                          /*#__PURE__*/
                          _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee9() {
                            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                              while (1) {
                                switch (_context9.prev = _context9.next) {
                                  case 0:
                                    callingSettings.setData({
                                      callWith: _callingOptions.default.softphone
                                    }, true);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccessWithSoftphone)).to.not.equal(undefined);

                                  case 2:
                                  case "end":
                                    return _context9.stop();
                                }
                              }
                            }, _callee9);
                          })));
                          it('Should Prompt Alert of saveSuccess when Calling Option is Other Phone',
                          /*#__PURE__*/
                          _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee10() {
                            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                              while (1) {
                                switch (_context10.prev = _context10.next) {
                                  case 0:
                                    callingSettings.setData({
                                      callWith: _callingOptions.default.otherphone
                                    }, true);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccess)).to.not.equal(undefined);

                                  case 2:
                                  case "end":
                                    return _context10.stop();
                                }
                              }
                            }, _callee10);
                          })));
                          it('Should Prompt Alert of saveSuccess when Calling Option is My RingCentral Phone',
                          /*#__PURE__*/
                          _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee11() {
                            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                              while (1) {
                                switch (_context11.prev = _context11.next) {
                                  case 0:
                                    callingSettings.setData({
                                      callWith: _callingOptions.default.myphone
                                    }, true);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccess)).to.not.equal(undefined);

                                  case 2:
                                  case "end":
                                    return _context11.stop();
                                }
                              }
                            }, _callee11);
                          })));
                          it('Should Prompt Alert of saveSuccess when Calling Option is Custom Phone',
                          /*#__PURE__*/
                          _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee12() {
                            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                              while (1) {
                                switch (_context12.prev = _context12.next) {
                                  case 0:
                                    callingSettings.setData({
                                      callWith: _callingOptions.default.customphone
                                    }, true);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccess)).to.not.equal(undefined);

                                  case 2:
                                  case "end":
                                    return _context12.stop();
                                }
                              }
                            }, _callee12);
                          })));
                        });
                        describe('Should Not Prompt Alerts when withPrompt Equals False', function () {
                          it('Should Not Prompt Alert when Calling Option is Softphone',
                          /*#__PURE__*/
                          _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee13() {
                            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                              while (1) {
                                switch (_context13.prev = _context13.next) {
                                  case 0:
                                    callingSettings.setData({
                                      callWith: _callingOptions.default.softphone
                                    }, false);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccess)).to.equal(undefined);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccessWithSoftphone)).to.equal(undefined);

                                  case 3:
                                  case "end":
                                    return _context13.stop();
                                }
                              }
                            }, _callee13);
                          })));
                          it('Should Not Prompt Alert when Calling Option is My RingCentral Phone',
                          /*#__PURE__*/
                          _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee14() {
                            return regeneratorRuntime.wrap(function _callee14$(_context14) {
                              while (1) {
                                switch (_context14.prev = _context14.next) {
                                  case 0:
                                    callingSettings.setData({
                                      callWith: _callingOptions.default.myphone
                                    }, false);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccess)).to.equal(undefined);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccessWithSoftphone)).to.equal(undefined);

                                  case 3:
                                  case "end":
                                    return _context14.stop();
                                }
                              }
                            }, _callee14);
                          })));
                          it('Should Not Prompt Alert when Calling Option is Other Phone',
                          /*#__PURE__*/
                          _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee15() {
                            return regeneratorRuntime.wrap(function _callee15$(_context15) {
                              while (1) {
                                switch (_context15.prev = _context15.next) {
                                  case 0:
                                    callingSettings.setData({
                                      callWith: _callingOptions.default.otherphone
                                    }, false);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccess)).to.equal(undefined);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccessWithSoftphone)).to.equal(undefined);

                                  case 3:
                                  case "end":
                                    return _context15.stop();
                                }
                              }
                            }, _callee15);
                          })));
                          it('Should Not Prompt Alert when Calling Option is Custom Phone',
                          /*#__PURE__*/
                          _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee16() {
                            return regeneratorRuntime.wrap(function _callee16$(_context16) {
                              while (1) {
                                switch (_context16.prev = _context16.next) {
                                  case 0:
                                    callingSettings.setData({
                                      callWith: _callingOptions.default.customphone
                                    }, false);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccess)).to.equal(undefined);
                                    expect((0, _HelpUtil.containsErrorMessage)(alert.state.messages, _callingSettingsMessages.default.saveSuccessWithSoftphone)).to.equal(undefined);

                                  case 3:
                                  case "end":
                                    return _context16.stop();
                                }
                              }
                            }, _callee16);
                          })));
                        });
                      });
                      describe('Should Remember after Logout', function () {
                        this.timeout(20000);
                        it('Should Remember Calling Settings after Re-login',
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee17() {
                          return regeneratorRuntime.wrap(function _callee17$(_context17) {
                            while (1) {
                              switch (_context17.prev = _context17.next) {
                                case 0:
                                  this.timeout(20000);
                                  callingSettings.setData({
                                    callWith: _callingOptions.default.customphone,
                                    myLocation: '456',
                                    ringoutPrompt: '456'
                                  });
                                  auth.logout();
                                  _context17.next = 5;
                                  return (0, _WaitUtil.waitUntilEqual)(function () {
                                    return auth.loginStatus;
                                  }, 'LoginStatus', _loginStatus.default.notLoggedIn, 3);

                                case 5:
                                  mock.restore();
                                  mock.mockForLogin();
                                  _context17.next = 9;
                                  return (0, _HelpUtil.ensureLogin)(auth, account);

                                case 9:
                                  expect(callingSettings.ringoutPrompt).to.equals('456');
                                  expect(callingSettings.myLocation).to.equals('456');
                                  expect(callingSettings.callWith).to.equals(_callingOptions.default.customphone);
                                  expect(callingSettings.callingMode).to.equals(_callingModes.default.ringout);

                                case 13:
                                case "end":
                                  return _context17.stop();
                              }
                            }
                          }, _callee17, this);
                        })));
                      });
                      describe('Should Have Required Phone Numbers', function () {
                        this.timeout(20000);
                        it('Should Have My Phone Numbers',
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee18() {
                          var myPhoneNumbers, mainCompanyNumber, extensionNumber;
                          return regeneratorRuntime.wrap(function _callee18$(_context18) {
                            while (1) {
                              switch (_context18.prev = _context18.next) {
                                case 0:
                                  myPhoneNumbers = extensionPhoneNumber.directNumbers.map(function (item) {
                                    return item.phoneNumber;
                                  });
                                  mainCompanyNumber = extensionPhoneNumber.mainCompanyNumber;
                                  extensionNumber = extensionInfo.extensionNumber;

                                  if (mainCompanyNumber && extensionNumber) {
                                    myPhoneNumbers.push("".concat(mainCompanyNumber.phoneNumber, "*").concat(extensionNumber));
                                  }

                                  expect(callingSettings.myPhoneNumbers.length).to.equal(myPhoneNumbers.length);
                                  callingSettings.myPhoneNumbers.forEach(function (number) {
                                    expect(myPhoneNumbers).to.include(number);
                                  });

                                case 6:
                                case "end":
                                  return _context18.stop();
                              }
                            }
                          }, _callee18);
                        }))); //TODO: Add test cases for Other Phone Numbers
                      });

                    case 8:
                    case "end":
                      return _context19.stop();
                  }
                }
              }, _callee19, this);
            })));
            it('Should only include softphone when ReadUserPhoneNumbers is false',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee20() {
              return regeneratorRuntime.wrap(function _callee20$(_context20) {
                while (1) {
                  switch (_context20.prev = _context20.next) {
                    case 0:
                      mock.restore();
                      mock.mockForLogin({
                        mockAuthzProfile: false
                      });
                      mock.authzProfile({
                        permissions: _authzProfile.default.permissions.filter(function (p) {
                          return p.permission.id !== 'ReadUserPhoneNumbers';
                        })
                      });
                      _context20.next = 5;
                      return (0, _HelpUtil.ensureLogin)(auth, account);

                    case 5:
                      expect(callingSettings.callWithOptions).to.deep.equals([_callingOptions.default.softphone]);
                      expect(callingSettings.callingMode).to.equals(_callingModes.default.softphone);

                    case 7:
                    case "end":
                      return _context20.stop();
                  }
                }
              }, _callee20);
            })));
            it('Should only include softphone when ReadUserForwardingFlipNumbers is false',
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee21() {
              return regeneratorRuntime.wrap(function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      mock.restore();
                      mock.mockForLogin({
                        mockExtensionInfo: false
                      });
                      mock.extensionInfo({
                        serviceFeatures: _extensionInfo.default.serviceFeatures.filter(function (p) {
                          return p.featureName !== 'WebPhone';
                        }).concat({
                          featureName: "WebPhone",
                          enabled: false
                        })
                      });
                      _context21.next = 5;
                      return (0, _HelpUtil.ensureLogin)(auth, account);

                    case 5:
                      expect(callingSettings.callWithOptions).to.deep.equals([_callingOptions.default.softphone, _callingOptions.default.myphone, _callingOptions.default.otherphone, _callingOptions.default.customphone]);

                    case 6:
                    case "end":
                      return _context21.stop();
                  }
                }
              }, _callee21);
            })));

          case 5:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, this);
  })));
};

exports.default = _default;
//# sourceMappingURL=callingSettings.js.map

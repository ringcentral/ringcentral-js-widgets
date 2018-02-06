'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _HelpUtil = require('../utils/HelpUtil');

var _callErrors = require('../../modules/Call/callErrors');

var _callErrors2 = _interopRequireDefault(_callErrors);

var _WaitUtil = require('../utils/WaitUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Auth, Alert, Client, RegionSettings, Call, accountWithMultiDP) {
  Call._makeCall = function (_ref) {
    var toNumber = _ref.toNumber;

    Call.__toNumber = toNumber;
  };
  describe('Number Validation when Making Phone Call', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee30() {
    var conditionalDescribe, isLoginSuccess;
    return _regenerator2.default.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            this.timeout(10000);
            conditionalDescribe = describe;
            _context30.next = 4;
            return (0, _HelpUtil.ensureLogin)(Auth, accountWithMultiDP);

          case 4:
            isLoginSuccess = _context30.sent;

            if (!isLoginSuccess) {
              conditionalDescribe = describe.skip;
              console.error('Skip test case as failed to login with credential ', accountWithMultiDP);
            }
            conditionalDescribe('Basic Validation', function () {
              var _this = this;

              this.timeout(10000);
              beforeEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var isAlertClear;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _WaitUtil.waitUntilEqual)(function () {
                          Alert.dismissAll();
                          return Alert.state.messages.length;
                        }, 'Alert', 0, 5);

                      case 2:
                        isAlertClear = _context.sent;

                        if (!isAlertClear) {
                          console.error('Alert is not cleared after dismissAll');
                        }

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })));
              it('Should Alert Invalid Number - Invalid Char in ToNumber', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return Call.call({ phoneNumber: "iamn%@onedi!@$%^&()_=\\][';/.,~nu><.,,?/mber#*" });

                      case 3:
                        _context2.next = 8;
                        break;

                      case 5:
                        _context2.prev = 5;
                        _context2.t0 = _context2['catch'](0);

                        console.error(_context2.t0);

                      case 8:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.not.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 12:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this, [[0, 5]]);
              })));
              it('Should Alert Invalid Number - Valid Special Char but No Digital Number', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return Call.call({ phoneNumber: '+#' });

                      case 3:
                        _context3.next = 8;
                        break;

                      case 5:
                        _context3.prev = 5;
                        _context3.t0 = _context3['catch'](0);

                        console.error(_context3.t0);

                      case 8:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.not.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 12:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this, [[0, 5]]);
              })));
              it('Should Not Alert Anything - Call Number in E.164 Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return Call.call({ phoneNumber: '+13065221112' });

                      case 3:
                        _context4.next = 8;
                        break;

                      case 5:
                        _context4.prev = 5;
                        _context4.t0 = _context4['catch'](0);

                        console.error(_context4.t0);

                      case 8:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 12:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, _this, [[0, 5]]);
              })));
            });

            conditionalDescribe('Validation with US/CA Local Number Format', function () {
              var _this2 = this;

              this.timeout(10000);
              beforeEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
                var isAlertClear;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return (0, _WaitUtil.waitUntilEqual)(function () {
                          Alert.dismissAll();
                          return Alert.state.messages.length;
                        }, 'Alert', 0, 5);

                      case 2:
                        isAlertClear = _context5.sent;

                        if (!isAlertClear) {
                          console.error('Alert is not cleared after dismissAll');
                          this.skip();
                        }

                      case 4:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, this);
              })));
              it('Should Not Alert Anything - Call Number in (xxx)xxx-xxxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context6.prev = 1;
                        _context6.next = 4;
                        return Call.call({ phoneNumber: '(650)827-5672' });

                      case 4:
                        _context6.next = 9;
                        break;

                      case 6:
                        _context6.prev = 6;
                        _context6.t0 = _context6['catch'](1);

                        console.error(_context6.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, _this2, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call Number in (xxx) xxx-xxxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context7.prev = 1;
                        _context7.next = 4;
                        return Call.call({ phoneNumber: '(650) 827-5672' });

                      case 4:
                        _context7.next = 9;
                        break;

                      case 6:
                        _context7.prev = 6;
                        _context7.t0 = _context7['catch'](1);

                        console.error(_context7.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, _this2, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call Number in (xxx)xxx-xxxx*xxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context8.prev = 1;
                        _context8.next = 4;
                        return Call.call({ phoneNumber: '(650)827-5672*101' });

                      case 4:
                        _context8.next = 9;
                        break;

                      case 6:
                        _context8.prev = 6;
                        _context8.t0 = _context8['catch'](1);

                        console.error(_context8.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, _this2, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call Number in (xxx) xxx-xxxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context9.prev = 1;
                        _context9.next = 4;
                        return Call.call({ phoneNumber: '(650) 827-5672*101' });

                      case 4:
                        _context9.next = 9;
                        break;

                      case 6:
                        _context9.prev = 6;
                        _context9.t0 = _context9['catch'](1);

                        console.error(_context9.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                }, _callee9, _this2, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call Number in xxx-xxx-xxxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context10.prev = 1;
                        _context10.next = 4;
                        return Call.call({ phoneNumber: '650-827-5672' });

                      case 4:
                        _context10.next = 9;
                        break;

                      case 6:
                        _context10.prev = 6;
                        _context10.t0 = _context10['catch'](1);

                        console.error(_context10.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, _callee10, _this2, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call Number in xxx-xxx-xxxx*xxx Format', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context11.prev = 1;
                        _context11.next = 4;
                        return Call.call({ phoneNumber: '650-827-5672*101' });

                      case 4:
                        _context11.next = 9;
                        break;

                      case 6:
                        _context11.prev = 6;
                        _context11.t0 = _context11['catch'](1);

                        console.error(_context11.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, _callee11, _this2, [[1, 6]]);
              })));
            });

            conditionalDescribe('Validation with Region Setting', function () {
              var _this3 = this;

              this.timeout(10000);
              beforeEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
                var isAlertClear;
                return _regenerator2.default.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return (0, _WaitUtil.waitUntilEqual)(function () {
                          Alert.dismissAll();
                          return Alert.state.messages.length;
                        }, 'Alert', 0, 5);

                      case 2:
                        isAlertClear = _context12.sent;

                        if (!isAlertClear) {
                          console.error('Alert is not cleared after dismissAll');
                          this.skip();
                        }

                      case 4:
                      case 'end':
                        return _context12.stop();
                    }
                  }
                }, _callee12, this);
              })));
              it('Should Alert No AreaCode - Call 7 Digital Number with US Dialing Plan without Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
                return _regenerator2.default.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context13.prev = 1;
                        _context13.next = 4;
                        return Call.call({ phoneNumber: '6545672' });

                      case 4:
                        _context13.next = 9;
                        break;

                      case 6:
                        _context13.prev = 6;
                        _context13.t0 = _context13['catch'](1);

                        console.error(_context13.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.not.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context13.stop();
                    }
                  }
                }, _callee13, _this3, [[1, 6]]);
              })));
              it('Should Alert No AreaCode - Call 7 Digital Number with CA Dialing Plan without Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
                return _regenerator2.default.wrap(function _callee14$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'CA', areaCode: '' });
                        _context14.prev = 1;
                        _context14.next = 4;
                        return Call.call({ phoneNumber: '6545672' });

                      case 4:
                        _context14.next = 9;
                        break;

                      case 6:
                        _context14.prev = 6;
                        _context14.t0 = _context14['catch'](1);

                        console.error(_context14.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.not.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context14.stop();
                    }
                  }
                }, _callee14, _this3, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call 7 Digital Number with US Dialing Plan and Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
                return _regenerator2.default.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '650' });
                        _context15.prev = 1;
                        _context15.next = 4;
                        return Call.call({ phoneNumber: '6545672' });

                      case 4:
                        _context15.next = 9;
                        break;

                      case 6:
                        _context15.prev = 6;
                        _context15.t0 = _context15['catch'](1);

                        console.error(_context15.t0);

                      case 9:
                        expect(Call.__toNumber).to.equal('+16506545672');
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 14:
                      case 'end':
                        return _context15.stop();
                    }
                  }
                }, _callee15, this, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call 7 Digital Number with CA Dialing Plan and Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16() {
                return _regenerator2.default.wrap(function _callee16$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'CA', areaCode: '250' });
                        _context16.prev = 1;
                        _context16.next = 4;
                        return Call.call({ phoneNumber: '6545672' });

                      case 4:
                        _context16.next = 9;
                        break;

                      case 6:
                        _context16.prev = 6;
                        _context16.t0 = _context16['catch'](1);

                        console.error(_context16.t0);

                      case 9:
                        expect(Call.__toNumber).to.equal('+12506545672');
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 14:
                      case 'end':
                        return _context16.stop();
                    }
                  }
                }, _callee16, this, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call 7 Digital Number with non US/CA Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17() {
                return _regenerator2.default.wrap(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
                        _context17.prev = 1;
                        _context17.next = 4;
                        return Call.call({ phoneNumber: '6545672' });

                      case 4:
                        _context17.next = 9;
                        break;

                      case 6:
                        _context17.prev = 6;
                        _context17.t0 = _context17['catch'](1);

                        console.error(_context17.t0);

                      case 9:
                        expect(Call.__toNumber).to.equal('+446545672');
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 14:
                      case 'end':
                        return _context17.stop();
                    }
                  }
                }, _callee17, this, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call greater than 7 Digital Number with US Dialing Plan and Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18() {
                return _regenerator2.default.wrap(function _callee18$(_context18) {
                  while (1) {
                    switch (_context18.prev = _context18.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '650' });
                        _context18.prev = 1;
                        _context18.next = 4;
                        return Call.call({ phoneNumber: '2501234567' });

                      case 4:
                        _context18.next = 9;
                        break;

                      case 6:
                        _context18.prev = 6;
                        _context18.t0 = _context18['catch'](1);

                        console.error(_context18.t0);

                      case 9:
                        expect(Call.__toNumber).to.equal('+12501234567');
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 14:
                      case 'end':
                        return _context18.stop();
                    }
                  }
                }, _callee18, this, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call greater than 7 Digital Number with CA Dialing Plan and Area Code', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19() {
                return _regenerator2.default.wrap(function _callee19$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'CA', areaCode: '250' });
                        _context19.prev = 1;
                        _context19.next = 4;
                        return Call.call({ phoneNumber: '6501234567' });

                      case 4:
                        _context19.next = 9;
                        break;

                      case 6:
                        _context19.prev = 6;
                        _context19.t0 = _context19['catch'](1);

                        console.error(_context19.t0);

                      case 9:
                        expect(Call.__toNumber).to.equal('+16501234567');
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 14:
                      case 'end':
                        return _context19.stop();
                    }
                  }
                }, _callee19, this, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call greater than 7 Digital Number with non US/CA Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20() {
                return _regenerator2.default.wrap(function _callee20$(_context20) {
                  while (1) {
                    switch (_context20.prev = _context20.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
                        _context20.prev = 1;
                        _context20.next = 4;
                        return Call.call({ phoneNumber: '1234567890' });

                      case 4:
                        _context20.next = 9;
                        break;

                      case 6:
                        _context20.prev = 6;
                        _context20.t0 = _context20['catch'](1);

                        console.error(_context20.t0);

                      case 9:
                        expect(Call.__toNumber).to.equal('+441234567890');
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 14:
                      case 'end':
                        return _context20.stop();
                    }
                  }
                }, _callee20, this, [[1, 6]]);
              })));
              it('Should Alert Special Number - Call 911 with US Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21() {
                return _regenerator2.default.wrap(function _callee21$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context21.prev = 1;
                        _context21.next = 4;
                        return Call.call({ phoneNumber: '911' });

                      case 4:
                        _context21.next = 9;
                        break;

                      case 6:
                        _context21.prev = 6;
                        _context21.t0 = _context21['catch'](1);

                        console.error(_context21.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.not.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context21.stop();
                    }
                  }
                }, _callee21, this, [[1, 6]]);
              })));
              it('Should Alert Special Number - Call 999 with GB Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22() {
                return _regenerator2.default.wrap(function _callee22$(_context22) {
                  while (1) {
                    switch (_context22.prev = _context22.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
                        _context22.prev = 1;
                        _context22.next = 4;
                        return Call.call({ phoneNumber: '999' });

                      case 4:
                        _context22.next = 9;
                        break;

                      case 6:
                        _context22.prev = 6;
                        _context22.t0 = _context22['catch'](1);

                        console.error(_context22.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.not.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context22.stop();
                    }
                  }
                }, _callee22, this, [[1, 6]]);
              })));
              it('Should Not Alert Special Number - Call 999 with US Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23() {
                return _regenerator2.default.wrap(function _callee23$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context23.prev = 1;
                        _context23.next = 4;
                        return Call.call({ phoneNumber: '999' });

                      case 4:
                        _context23.next = 9;
                        break;

                      case 6:
                        _context23.prev = 6;
                        _context23.t0 = _context23['catch'](1);

                        console.error(_context23.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);

                      case 10:
                      case 'end':
                        return _context23.stop();
                    }
                  }
                }, _callee23, this, [[1, 6]]);
              })));
              it('Should Not Alert Special Number - Call 911 with GB Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24() {
                return _regenerator2.default.wrap(function _callee24$(_context24) {
                  while (1) {
                    switch (_context24.prev = _context24.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
                        _context24.prev = 1;
                        _context24.next = 4;
                        return Call.call({ phoneNumber: '911' });

                      case 4:
                        _context24.next = 9;
                        break;

                      case 6:
                        _context24.prev = 6;
                        _context24.t0 = _context24['catch'](1);

                        console.error(_context24.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);

                      case 10:
                      case 'end':
                        return _context24.stop();
                    }
                  }
                }, _callee24, this, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call 101(Existed Extension/Not Special Number) with US Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee25() {
                return _regenerator2.default.wrap(function _callee25$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context25.prev = 1;
                        _context25.next = 4;
                        return Call.call({ phoneNumber: '101' });

                      case 4:
                        _context25.next = 9;
                        break;

                      case 6:
                        _context25.prev = 6;
                        _context25.t0 = _context25['catch'](1);

                        console.error(_context25.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context25.stop();
                    }
                  }
                }, _callee25, this, [[1, 6]]);
              })));
              it('Should Alert Special Number - Call 101(Existed Extension/Speical Number) with GB Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee26() {
                return _regenerator2.default.wrap(function _callee26$(_context26) {
                  while (1) {
                    switch (_context26.prev = _context26.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
                        _context26.prev = 1;
                        _context26.next = 4;
                        return Call.call({ phoneNumber: '101' });

                      case 4:
                        _context26.next = 9;
                        break;

                      case 6:
                        _context26.prev = 6;
                        _context26.t0 = _context26['catch'](1);

                        console.error(_context26.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.not.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context26.stop();
                    }
                  }
                }, _callee26, this, [[1, 6]]);
              })));
              it('Should Not Alert Anything - Call 102(Existed Extension) with GB Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee27() {
                return _regenerator2.default.wrap(function _callee27$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
                        _context27.prev = 1;
                        _context27.next = 4;
                        return Call.call({ phoneNumber: '102' });

                      case 4:
                        _context27.next = 9;
                        break;

                      case 6:
                        _context27.prev = 6;
                        _context27.t0 = _context27['catch'](1);

                        console.error(_context27.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.equal(undefined);

                      case 13:
                      case 'end':
                        return _context27.stop();
                    }
                  }
                }, _callee27, this, [[1, 6]]);
              })));
              it('Should Alert Not An Extension - Call 998(Non Extension) with US Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee28() {
                return _regenerator2.default.wrap(function _callee28$(_context28) {
                  while (1) {
                    switch (_context28.prev = _context28.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
                        _context28.prev = 1;
                        _context28.next = 4;
                        return Call.call({ phoneNumber: '998' });

                      case 4:
                        _context28.next = 9;
                        break;

                      case 6:
                        _context28.prev = 6;
                        _context28.t0 = _context28['catch'](1);

                        console.error(_context28.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.not.equal(undefined);

                      case 13:
                      case 'end':
                        return _context28.stop();
                    }
                  }
                }, _callee28, this, [[1, 6]]);
              })));
              it('Should Alert Not An Extension - Call 998(Non Extension) with GB Dialing Plan', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee29() {
                return _regenerator2.default.wrap(function _callee29$(_context29) {
                  while (1) {
                    switch (_context29.prev = _context29.next) {
                      case 0:
                        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
                        _context29.prev = 1;
                        _context29.next = 4;
                        return Call.call({ phoneNumber: '998' });

                      case 4:
                        _context29.next = 9;
                        break;

                      case 6:
                        _context29.prev = 6;
                        _context29.t0 = _context29['catch'](1);

                        console.error(_context29.t0);

                      case 9:
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noToNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.noAreaCode)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.specialNumber)).to.equal(undefined);
                        expect((0, _HelpUtil.containsErrorMessage)(Alert.state.messages, _callErrors2.default.notAnExtension)).to.not.equal(undefined);

                      case 13:
                      case 'end':
                        return _context29.stop();
                    }
                  }
                }, _callee29, this, [[1, 6]]);
              })));
            });

          case 9:
          case 'end':
            return _context30.stop();
        }
      }
    }, _callee30, this);
  })));
};
//# sourceMappingURL=numValidInCall.js.map

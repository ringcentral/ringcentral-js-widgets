"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

var _rcui = require("@ringcentral-integration/rcui");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _testUtils = require("react-dom/test-utils");

var _RecipientsInput = require("ringcentral-widgets/components/Rcui/RecipientsInput");

var _DialerPanel = require("./DialerPanel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var wrapper;
var currentLocale = 'en-US';
var size = 'medium';

function setup() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$toNumber = _ref.toNumber,
      toNumber = _ref$toNumber === void 0 ? '' : _ref$toNumber,
      _ref$setToNumber = _ref.setToNumber,
      setToNumber = _ref$setToNumber === void 0 ? function () {} : _ref$setToNumber,
      _ref$dialout = _ref.dialout,
      dialout = _ref$dialout === void 0 ? function () {} : _ref$dialout,
      _ref$hasDialer = _ref.hasDialer,
      hasDialer = _ref$hasDialer === void 0 ? true : _ref$hasDialer,
      _ref$dialoutStatus = _ref.dialoutStatus,
      dialoutStatus = _ref$dialoutStatus === void 0 ? 'idle' : _ref$dialoutStatus,
      _ref$goToManualDialSe = _ref.goToManualDialSettings,
      goToManualDialSettings = _ref$goToManualDialSe === void 0 ? function () {} : _ref$goToManualDialSe,
      _ref$hangup = _ref.hangup,
      hangup = _ref$hangup === void 0 ? function () {} : _ref$hangup,
      _ref$checkOnCall = _ref.checkOnCall,
      checkOnCall = _ref$checkOnCall === void 0 ? function () {} : _ref$checkOnCall;

  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_rcui.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_DialerPanel.DialerPanel, {
    currentLocale: currentLocale,
    dialout: dialout,
    toNumber: toNumber,
    size: size,
    hasDialer: hasDialer,
    setToNumber: setToNumber,
    goToManualDialSettings: goToManualDialSettings,
    dialoutStatus: dialoutStatus,
    hangup: hangup,
    checkOnCall: checkOnCall
  })));
}

var getCallButton = function getCallButton() {
  return wrapper.find('[data-sign="callButton"]').at(0);
};

var getDeleteButton = function getDeleteButton() {
  return wrapper.find('[data-sign="deleteButton"]').at(0);
};

afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          wrapper.unmount();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
describe('<DialerPanel />', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
  return regeneratorRuntime.wrap(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          it('Has no dialer permission', function () {
            wrapper = setup({
              hasDialer: false
            });
            expect(wrapper.text()).toBe('');
          });
          [{
            toNumber: '',
            desc: 'with no number filled'
          }, {
            toNumber: '6508652493',
            desc: 'without number filled'
          }].forEach(function (_ref4) {
            var toNumber = _ref4.toNumber,
                desc = _ref4.desc;
            it("Default state of dialpad(".concat(desc, "): Call Button be highlighted and can be clicked to dialout"), function () {
              var dialout = jest.fn(function () {});
              wrapper = setup({
                toNumber: toNumber,
                dialout: dialout
              });
              var recipientsInput = wrapper.find(_RecipientsInput.RecipientsInput).at(0);
              var callButton = getCallButton();
              expect(recipientsInput.prop('value')).toBe(toNumber);
              expect(callButton.prop('color').join(',')).toBe(['semantic', 'positive'].join(','));
              expect(callButton.prop('data-icon')).toBe('answer');
              expect(callButton.prop('disabled')).toBe(false);
              callButton.simulate('click');
              expect(dialout).toBeCalled();
            });
          });
          it('User can manually input numbers in the recipientsInput', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var toNumber, setToNumber, recipientsInput, eventObj;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    toNumber = '';
                    setToNumber = jest.fn(function () {});
                    wrapper = setup({
                      toNumber: toNumber,
                      setToNumber: setToNumber
                    });
                    recipientsInput = wrapper.find(_RecipientsInput.RecipientsInput).at(0);
                    eventObj = {
                      target: {
                        value: '1243'
                      }
                    };
                    recipientsInput.find('input').at(0).simulate('change', eventObj);
                    expect(setToNumber).toBeCalledWith('1243');

                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          })));
          it('Click Delete Button', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var toNumber, setToNumber, deleteButton;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    toNumber = '6508652493';
                    setToNumber = jest.fn(function () {});
                    wrapper = setup({
                      toNumber: toNumber,
                      setToNumber: setToNumber
                    });
                    deleteButton = getDeleteButton();
                    deleteButton.simulate('mouseDown');
                    deleteButton.simulate('mouseUp');
                    expect(setToNumber).toBeCalledWith(toNumber.slice(0, -1));

                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          })));
          it('Long press Delete Button', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var toNumber, setToNumber, deleteButton;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    jest.useFakeTimers();
                    toNumber = '6508652493';
                    setToNumber = jest.fn(function () {});
                    wrapper = setup({
                      toNumber: toNumber,
                      setToNumber: setToNumber
                    });
                    deleteButton = getDeleteButton();
                    _context5.next = 7;
                    return (0, _testUtils.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                      return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              deleteButton.simulate('mouseDown');
                              jest.advanceTimersByTime(1100); // here will hiden deleteButton when clear toNumber, so we don't need mouseUp
                              // deleteButton.simulate('mouseUp');

                            case 2:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    })));

                  case 7:
                    expect(setToNumber).toBeCalledWith('');

                  case 8:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          })));
          it('Delete button show switch', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var deleteButton;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    wrapper = setup({
                      toNumber: ''
                    });
                    deleteButton = getDeleteButton();
                    expect(deleteButton.exists()).toBeFalsy();
                    wrapper = setup({
                      toNumber: '6508652493'
                    });
                    deleteButton = getDeleteButton();
                    expect(deleteButton.exists()).toBeTruthy();

                  case 6:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          })));
          it("Dialpad is not allowed to dialout in the state of dialing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var toNumber, dialoutStatus, dialout, callButton;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    toNumber = '6508652493';
                    dialoutStatus = 'dialing';
                    dialout = jest.fn(function () {});
                    wrapper = setup({
                      toNumber: toNumber,
                      dialout: dialout,
                      dialoutStatus: dialoutStatus
                    });
                    callButton = getCallButton();
                    expect(callButton.prop('disabled')).toBe(true);
                    expect(callButton.prop('data-icon')).toBe('hand-up');
                    callButton.simulate('click');
                    expect(dialout).not.toBeCalled();

                  case 9:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          })));
          it("User can hangup a call in the state of callConnected", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var toNumber, dialoutStatus, dialout, hangup, callButton;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    toNumber = '6508652493';
                    dialoutStatus = 'callConnected';
                    dialout = jest.fn(function () {});
                    hangup = jest.fn(function () {});
                    wrapper = setup({
                      toNumber: toNumber,
                      dialout: dialout,
                      hangup: hangup,
                      dialoutStatus: dialoutStatus
                    });
                    callButton = getCallButton();
                    expect(callButton.prop('disabled')).toBe(false);
                    expect(callButton.prop('data-icon')).toBe('hand-up');
                    callButton.simulate('click');
                    expect(dialout).not.toBeCalled();
                    expect(hangup).toBeCalled();

                  case 11:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          })));
          it('User clicks manualDialSettings', function () {
            var goToManualDialSettings = jest.fn(function () {});
            wrapper = setup({
              goToManualDialSettings: goToManualDialSettings
            });
            var manualDialSettings = wrapper.find('[data-sign="manualDialSettings"]').at(0);
            manualDialSettings.find('span').at(0).simulate('click');
            expect(goToManualDialSettings).toBeCalled();
          });
          it("User can use digit virtual keyboard to input numbers, and press zero for 1 second will typing '+'", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
            var toNumber, setToNumber, dialPad, digitButtons, typingIcons, buttonZero;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    jest.useFakeTimers();
                    toNumber = '1234';
                    setToNumber = jest.fn(function () {});
                    wrapper = setup({
                      toNumber: toNumber,
                      setToNumber: setToNumber
                    });
                    dialPad = wrapper.find('DialPad').at(0);
                    digitButtons = dialPad.find('button');
                    typingIcons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
                    digitButtons.forEach(function (button, i) {
                      button.simulate('mousedown');
                      button.simulate('mouseup');
                      expect(setToNumber).toBeCalledWith("".concat(toNumber).concat(typingIcons[i]));
                    });
                    buttonZero = digitButtons.at(10);
                    buttonZero.simulate('mousedown');
                    _context10.next = 12;
                    return (0, _testUtils.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                      return regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                          switch (_context9.prev = _context9.next) {
                            case 0:
                              jest.advanceTimersByTime(1100);

                            case 1:
                            case "end":
                              return _context9.stop();
                          }
                        }
                      }, _callee9);
                    })));

                  case 12:
                    buttonZero.simulate('mouseup');
                    expect(setToNumber).toBeCalledWith('1234+');

                  case 14:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10);
          })));

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  }, _callee11);
})));
//# sourceMappingURL=DialerPanel.spec.js.map

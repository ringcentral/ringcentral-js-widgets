"use strict";

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _testUtils = require("@ringcentral-integration/test-utils/lib/test-utils");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

var _testUtils2 = require("react-dom/test-utils");

var _DialerPanel = require("../DialerPanel");

var _createDialerPanel = require("./createDialerPanel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mockAudio = function mockAudio() {
  window.HTMLMediaElement.prototype.play = function () {
    return new Promise(function (resolve) {
      resolve();
    });
  };
};

mockAudio();
describe('<DialerPanel />', function () {
  var wrapper;

  var getCallButton = function getCallButton() {
    return wrapper.find('[data-sign="callButton"]').at(0);
  };

  var getDeleteButton = function getDeleteButton() {
    return wrapper.find('button[data-sign="deleteButton"]').last();
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
  [{
    toNumber: '',
    desc: 'with no number filled'
  }, {
    toNumber: '6508652493',
    desc: 'without number filled'
  }].forEach(function (_ref2) {
    var toNumber = _ref2.toNumber,
        desc = _ref2.desc;
    it("Default state of dialpad(".concat(desc, "): Call Button be highlighted and can be clicked to dialout"), function () {
      var dialout = jest.fn(function () {});
      wrapper = (0, _createDialerPanel.createDialerPanel)({
        toNumber: toNumber,
        dialout: dialout
      });
      var recipientsInput = wrapper.find(_juno.RcDialTextField).at(0);
      var callButton = getCallButton();
      expect(recipientsInput.prop('value')).toBe(toNumber);
      expect(callButton.prop('color')).toBe('success.b03');
      expect(callButton.prop('data-icon')).toBe('answer');
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
            wrapper = (0, _createDialerPanel.createDialerPanel)({
              toNumber: toNumber,
              setToNumber: setToNumber
            });
            recipientsInput = wrapper.find(_juno.RcDialTextField).at(0);
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
  it('dialButtonDisabled can set dial button disable attribute', function () {
    var getDialButtonDisabled = function getDialButtonDisabled() {
      return getCallButton().render().attr('disabled');
    };

    wrapper = (0, _createDialerPanel.createDialerPanel)({
      dialButtonDisabled: true
    });
    expect(getDialButtonDisabled()).toBe('disabled');
    wrapper = (0, _createDialerPanel.createDialerPanel)({
      dialButtonDisabled: false
    });
    expect(getDialButtonDisabled()).toBe(undefined);
  });
  it('Delete button show switch', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var deleteButton;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = (0, _createDialerPanel.createDialerPanel)({
              toNumber: ''
            });
            deleteButton = getDeleteButton();
            expect(deleteButton.exists()).toBeFalsy();
            wrapper = (0, _createDialerPanel.createDialerPanel)({
              toNumber: '6508652493'
            });
            deleteButton = getDeleteButton();
            expect(deleteButton.exists()).toBeTruthy();

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it("Dialpad is not allowed to dialout in the state of dialing", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var toNumber, dialoutStatus, dialout, callButton;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            toNumber = '6508652493';
            dialoutStatus = 'dialing';
            dialout = jest.fn(function () {});
            wrapper = (0, _createDialerPanel.createDialerPanel)({
              toNumber: toNumber,
              dialout: dialout,
              dialoutStatus: dialoutStatus
            });
            callButton = getCallButton();
            expect(callButton.prop('data-icon')).toBe('hand-up');
            callButton.simulate('click');
            expect(dialout).not.toBeCalled();

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it("User can hangup a call in the state of callConnected", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var toNumber, dialoutStatus, dialout, hangup, callButton;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            toNumber = '6508652493';
            dialoutStatus = 'callConnected';
            dialout = jest.fn(function () {});
            hangup = jest.fn(function () {});
            wrapper = (0, _createDialerPanel.createDialerPanel)({
              toNumber: toNumber,
              dialout: dialout,
              hangup: hangup,
              dialoutStatus: dialoutStatus
            });
            callButton = getCallButton();
            expect(callButton.prop('data-icon')).toBe('hand-up');
            callButton.simulate('click');
            expect(dialout).not.toBeCalled();
            expect(hangup).toBeCalled();

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('User clicks manualDialSettings', function () {
    var goToManualDialSettings = jest.fn(function () {});
    wrapper = (0, _createDialerPanel.createDialerPanel)({
      goToManualDialSettings: goToManualDialSettings
    });
    var manualDialSettings = wrapper.find('[data-sign="manualDialSettings"]').at(0);
    manualDialSettings.simulate('click');
    expect(goToManualDialSettings).toBeCalled();
  });
});
describe('<DialerPanel />', function () {
  it("User can use digit virtual keyboard to input numbers, and press zero for 1 second will typing '+'", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var toNumber, setToNumber, _render, container, typingIcons, button;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            toNumber = '1234';
            setToNumber = jest.fn(function () {});
            _render = (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_DialerPanel.DialerPanel, {
              currentLocale: "en-US",
              dialout: function dialout() {},
              toNumber: toNumber,
              size: "small",
              dialButtonDisabled: false,
              hasDialer: true,
              setToNumber: setToNumber,
              goToManualDialSettings: function goToManualDialSettings() {},
              dialoutStatus: "idle",
              hangup: function hangup() {}
            })), container = _render.container;
            typingIcons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
            typingIcons.forEach(function (key, i) {
              var button = container.querySelector("[data-dial-button=\"".concat(key, "\"]"));

              _testUtils.fireEvent.mouseDown(button);

              _testUtils.fireEvent.mouseUp(button);

              expect(setToNumber).toBeCalledWith("".concat(toNumber).concat(typingIcons[i]));
            });
            jest.useFakeTimers();
            button = container.querySelector("[data-dial-button=\"0\"]");

            _testUtils.fireEvent.mouseDown(button);

            _context7.next = 10;
            return (0, _testUtils2.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      jest.advanceTimersByTime(1100);

                    case 1:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            })));

          case 10:
            _testUtils.fireEvent.mouseUp(button);

            expect(setToNumber).toBeCalledWith('1234+');

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('Click Delete Button', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var toNumber, setToNumber, _render2, container, deleteButton;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            toNumber = '6508652493';
            setToNumber = jest.fn(function () {});
            _render2 = (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_DialerPanel.DialerPanel, {
              currentLocale: "en-US",
              dialout: function dialout() {},
              toNumber: toNumber,
              size: "small",
              dialButtonDisabled: false,
              hasDialer: true,
              setToNumber: setToNumber,
              goToManualDialSettings: function goToManualDialSettings() {},
              dialoutStatus: "idle",
              hangup: function hangup() {}
            })), container = _render2.container;
            deleteButton = container.querySelector('button');

            _testUtils.fireEvent.mouseDown(deleteButton);

            _testUtils.fireEvent.mouseUp(deleteButton);

            expect(setToNumber).toBeCalledWith(toNumber.slice(0, -1));

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('Long press Delete Button', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var toNumber, setToNumber, _render3, container, deleteButton;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            jest.useFakeTimers();
            toNumber = '6508652493';
            setToNumber = jest.fn(function () {});
            _render3 = (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_DialerPanel.DialerPanel, {
              currentLocale: "en-US",
              dialout: function dialout() {},
              toNumber: toNumber,
              size: "small",
              dialButtonDisabled: false,
              hasDialer: true,
              setToNumber: setToNumber,
              goToManualDialSettings: function goToManualDialSettings() {},
              dialoutStatus: "idle",
              hangup: function hangup() {}
            })), container = _render3.container;
            deleteButton = container.querySelector('button');

            _testUtils.fireEvent.mouseDown(deleteButton);

            _context10.next = 8;
            return (0, _testUtils2.act)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      jest.advanceTimersByTime(1100); // here will hidden deleteButton when clear toNumber, so we don't need mouseUp
                      // deleteButton.simulate('mouseUp');

                    case 1:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9);
            })));

          case 8:
            expect(setToNumber).toBeCalledWith('');

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
});
//# sourceMappingURL=DialerPanel.spec.js.map

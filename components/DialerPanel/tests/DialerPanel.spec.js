"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _createDialerPanel = require("./createDialerPanel");
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
            callButton.simulate('click');
            expect(dialout).not.toBeCalled();
          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
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
  it('Check Disabled Allow Manual Calls', function () {
    /* RCI-3899: Check Disabled Allow Manual Calls
      https://test_it_domain/test-cases/RCI-3899
    */
    wrapper = (0, _createDialerPanel.createDialerPanel)({
      hasDialer: true
    });
    var manualDialSettings = wrapper.find('[data-sign="manualDialSettings"]').at(0);
    var callButtonTip = wrapper.find('[data-sign="callButtonTip"]').at(0);
    var recipientsInput = wrapper.find(_juno.RcDialTextField).at(0);
    expect(recipientsInput.exists()).toBeTruthy();
    expect(manualDialSettings.exists()).toBeTruthy();
    expect(callButtonTip.exists()).toBeTruthy();
    var noDialerWrapper = (0, _createDialerPanel.createDialerPanel)({
      hasDialer: false
    });
    var noManualDialSettings = noDialerWrapper.find('[data-sign="manualDialSettings"]').at(0);
    var noCallButtonTip = noDialerWrapper.find('[data-sign="callButtonTip"]').at(0);
    var noRecipientsInput = noDialerWrapper.find(_juno.RcDialTextField).at(0);
    expect(noRecipientsInput.exists()).toBeFalsy();
    expect(noManualDialSettings.exists()).toBeFalsy();
    expect(noCallButtonTip.exists()).toBeFalsy();
  });
});
//# sourceMappingURL=DialerPanel.spec.js.map

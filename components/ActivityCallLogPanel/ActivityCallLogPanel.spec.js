"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _enzyme = require("enzyme");

var _ActivityCallLogPanel = require("./ActivityCallLogPanel");

var _i18n = _interopRequireDefault(require("../SmallCallControl/i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var wrapper;
var currentLocale = 'en-US';
var defaultCurrentEvCall = {
  queue: {
    name: 'dadaqueue'
  },
  dnis: '6508653454',
  uii: '934579223556776',
  termParty: 'call termed',
  termReason: 'a term reason',
  timestamp: 1579223556776
};
var defaultCurrentLog = {
  call: {
    direction: 'INBOUND',
    from: {
      name: 'aermin',
      phoneNumber: '6508655678'
    },
    to: {
      name: 'Amy liu',
      phoneNumber: '6508651234'
    }
  }
};
var defaultIVRAlertData = [{
  subject: 'I am subject 1',
  body: 'I am body 1'
}, {
  subject: 'I am subject 2',
  body: 'I am body 2'
}, {
  subject: 'I am subject 3',
  body: 'I am body 3'
}];

function setup() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$currentEvCall = _ref.currentEvCall,
      currentEvCall = _ref$currentEvCall === void 0 ? defaultCurrentEvCall : _ref$currentEvCall,
      _ref$currentLog = _ref.currentLog,
      currentLog = _ref$currentLog === void 0 ? defaultCurrentLog : _ref$currentLog,
      _ref$disposeCall = _ref.disposeCall,
      disposeCall = _ref$disposeCall === void 0 ? function () {
    return null;
  } : _ref$disposeCall,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? 'active' : _ref$status,
      _ref$saveStatus = _ref.saveStatus,
      saveStatus = _ref$saveStatus === void 0 ? 'submit' : _ref$saveStatus,
      _ref$goToRequeueCallP = _ref.goToRequeueCallPage,
      goToRequeueCallPage = _ref$goToRequeueCallP === void 0 ? function () {} : _ref$goToRequeueCallP,
      _ref$goToTransferCall = _ref.goToTransferCallPage,
      goToTransferCallPage = _ref$goToTransferCall === void 0 ? function () {} : _ref$goToTransferCall,
      _ref$onMute = _ref.onMute,
      onMute = _ref$onMute === void 0 ? function () {} : _ref$onMute,
      _ref$onUnmute = _ref.onUnmute,
      onUnmute = _ref$onUnmute === void 0 ? function () {} : _ref$onUnmute,
      _ref$onHangup = _ref.onHangup,
      onHangup = _ref$onHangup === void 0 ? function () {} : _ref$onHangup,
      _ref$onReject = _ref.onReject,
      onReject = _ref$onReject === void 0 ? function () {} : _ref$onReject,
      _ref$onHold = _ref.onHold,
      onHold = _ref$onHold === void 0 ? function () {} : _ref$onHold,
      _ref$onUnHold = _ref.onUnHold,
      onUnHold = _ref$onUnHold === void 0 ? function () {} : _ref$onUnHold,
      _ref$isOnMute = _ref.isOnMute,
      isOnMute = _ref$isOnMute === void 0 ? false : _ref$isOnMute,
      _ref$isOnHold = _ref.isOnHold,
      isOnHold = _ref$isOnHold === void 0 ? false : _ref$isOnHold,
      _ref$smallCallControl = _ref.smallCallControlSize,
      smallCallControlSize = _ref$smallCallControl === void 0 ? 'medium' : _ref$smallCallControl,
      _ref$isInComingCall = _ref.isInComingCall,
      isInComingCall = _ref$isInComingCall === void 0 ? false : _ref$isInComingCall,
      _ref$disableDispose = _ref.disableDispose,
      disableDispose = _ref$disableDispose === void 0 ? false : _ref$disableDispose,
      _ref$disableHold = _ref.disableHold,
      disableHold = _ref$disableHold === void 0 ? false : _ref$disableHold,
      _ref$disableHangup = _ref.disableHangup,
      disableHangup = _ref$disableHangup === void 0 ? false : _ref$disableHangup,
      _ref$disableMute = _ref.disableMute,
      disableMute = _ref$disableMute === void 0 ? false : _ref$disableMute,
      _ref$disableActive = _ref.disableActive,
      disableActive = _ref$disableActive === void 0 ? false : _ref$disableActive,
      _ref$disableTransfer = _ref.disableTransfer,
      disableTransfer = _ref$disableTransfer === void 0 ? false : _ref$disableTransfer,
      _ref$currentCallContr = _ref.currentCallControlPermission;

  _ref$currentCallContr = _ref$currentCallContr === void 0 ? {} : _ref$currentCallContr;
  var _ref$currentCallContr2 = _ref$currentCallContr.allowTransferCall,
      allowTransferCall = _ref$currentCallContr2 === void 0 ? true : _ref$currentCallContr2,
      _ref$currentCallContr3 = _ref$currentCallContr.allowRequeueCall,
      allowRequeueCall = _ref$currentCallContr3 === void 0 ? true : _ref$currentCallContr3,
      _ref$isOnActive = _ref.isOnActive,
      isOnActive = _ref$isOnActive === void 0 ? false : _ref$isOnActive,
      _ref$disableInternalT = _ref.disableInternalTransfer,
      disableInternalTransfer = _ref$disableInternalT === void 0 ? false : _ref$disableInternalT,
      _ref$onActive = _ref.onActive,
      onActive = _ref$onActive === void 0 ? function () {} : _ref$onActive,
      _ref$showMuteButton = _ref.showMuteButton,
      showMuteButton = _ref$showMuteButton === void 0 ? false : _ref$showMuteButton,
      _ref$ivrAlertData = _ref.ivrAlertData,
      ivrAlertData = _ref$ivrAlertData === void 0 ? defaultIVRAlertData : _ref$ivrAlertData,
      _ref$showSmallCallCon = _ref.showSmallCallControl,
      showSmallCallControl = _ref$showSmallCallCon === void 0 ? true : _ref$showSmallCallCon;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_ActivityCallLogPanel.ActivityCallLogPanel, {
    isInbound: true,
    currentLocale: currentLocale,
    currentEvCall: currentEvCall,
    currentLog: currentLog,
    disposeCall: disposeCall,
    status: status,
    saveStatus: saveStatus,
    goToRequeueCallPage: goToRequeueCallPage,
    goToTransferCallPage: goToTransferCallPage,
    onMute: onMute,
    onUnmute: onUnmute,
    onHangup: onHangup,
    onReject: onReject,
    onHold: onHold,
    onUnHold: onUnHold,
    isOnMute: isOnMute,
    isOnHold: isOnHold,
    smallCallControlSize: smallCallControlSize,
    isInComingCall: isInComingCall,
    disableDispose: disableDispose,
    disableHold: disableHold,
    disableHangup: disableHangup,
    disableMute: disableMute,
    disableActive: disableActive,
    disableTransfer: disableTransfer,
    currentCallControlPermission: {
      allowTransferCall: allowTransferCall,
      allowRequeueCall: allowRequeueCall
    },
    isOnActive: isOnActive,
    onActive: onActive,
    goBack: function goBack() {},
    disableInternalTransfer: disableInternalTransfer,
    showMuteButton: showMuteButton,
    ivrAlertData: ivrAlertData,
    onCopySuccess: function onCopySuccess() {},
    showSmallCallControl: showSmallCallControl
  })));
}

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

var getDispositionButton = function getDispositionButton() {
  var button = wrapper.find('RcButton[data-sign="submit"]');
  var isExist = button.length > 0;
  return {
    isExist: isExist,
    click: function click() {
      return isExist && button.find('button').simulate('click');
    },
    isInLoadingStatus: isExist && button.find('RcCircularProgress').length > 0,
    isDisabled: isExist && button.prop('disabled')
  };
};

var getControlButton = function getControlButton(type) {
  var button = wrapper.find(type);
  var isExist = button.length > 0;
  return {
    isExist: isExist,
    click: function click() {
      return isExist && button.find('button').simulate('click');
    },
    title: isExist && button.find('CircleIconButton').prop('title'),
    isActive: isExist && button.find('button').hasClass('buttonActive'),
    isDisabled: isExist && !!button.find('button').render().attr('disabled')
  };
};

describe('<ActivityCallLogPanel />:: Call Disposition', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var status;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          status = 'callEnd';
          it('When call is ended, user will on disposition page and can dispose the call', function () {
            var disposeCall = jest.fn();
            wrapper = setup({
              disposeCall: disposeCall,
              status: status,
              saveStatus: 'submit'
            });
            var dispositionButton = getDispositionButton();
            expect(dispositionButton.isExist).toBe(true);
            dispositionButton.click();
            expect(disposeCall).toBeCalled();
          });
          it('When User click the Disposition Button, Submit Button is in loading status and cannot be clicked', function () {
            var disposeCall = jest.fn();
            wrapper = setup({
              disposeCall: disposeCall,
              status: status,
              saveStatus: 'saving',
              disableDispose: true
            });
            var dispositionButton = getDispositionButton();
            expect(dispositionButton.isInLoadingStatus).toBe(true);
            expect(dispositionButton.isDisabled).toBe(true);
            dispositionButton.click();
            expect(disposeCall).not.toBeCalled();
          });
          it('When disposition is saved, Submit Button is back in normal state: enabled and can be clicked', function () {
            var disposeCall = jest.fn();
            wrapper = setup({
              disposeCall: disposeCall,
              status: status,
              saveStatus: 'saved'
            });
            var dispositionButton = getDispositionButton();
            expect(dispositionButton.isInLoadingStatus).toBe(false);
            expect(dispositionButton.isDisabled).toBe(false);
            dispositionButton.click();
            expect(disposeCall).toBeCalled();
          });
          it('When disableDispose, Disposition Button should be disabled and cannot be clicked', function () {
            var disposeCall = jest.fn();
            wrapper = setup({
              status: status,
              saveStatus: 'saved',
              disableDispose: true
            });
            var dispositionButton = getDispositionButton();
            expect(dispositionButton.isDisabled).toBe(true);
            dispositionButton.click();
            expect(disposeCall).not.toBeCalled();
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
describe('<ActivityCallLogPanel />', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          it('When call is onHold, HoldCallButton should display and work correctly', function () {
            var onHold = jest.fn();
            var onUnHold = jest.fn();
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              onHold: onHold,
              onUnHold: onUnHold,
              isOnHold: true
            });
            var holdButton = getControlButton('HoldCallButton');
            holdButton.click();
            expect(holdButton.title).toBe(_i18n["default"].getString('onHold'));
            expect(holdButton.isActive).toBe(true);
            expect(onUnHold).toBeCalled();
            expect(onHold).not.toBeCalled();
          });
          it('When call is unHold, HoldCallButton should display and work correctly', function () {
            var onHold = jest.fn();
            var onUnHold = jest.fn();
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              onHold: onHold,
              onUnHold: onUnHold,
              isOnHold: false
            });
            var holdButton = getControlButton('HoldCallButton');
            holdButton.click();
            expect(holdButton.title).toBe(_i18n["default"].getString('hold'));
            expect(holdButton.isActive).toBe(false);
            expect(onUnHold).not.toBeCalled();
            expect(onHold).toBeCalled();
          });
          [{
            isIntegratedSoftphone: true,
            muteCallButtonNumber: 1
          }, {
            isIntegratedSoftphone: false,
            muteCallButtonNumber: 0
          }].map(function (_ref5) {
            var isIntegratedSoftphone = _ref5.isIntegratedSoftphone,
                muteCallButtonNumber = _ref5.muteCallButtonNumber;
            return it("When the call is IntegratedSoftphone is ".concat(isIntegratedSoftphone, ", can see ").concat(muteCallButtonNumber, " mute button"), function () {
              wrapper = setup({
                showMuteButton: isIntegratedSoftphone
              });
              expect(wrapper.find('MuteCallButton').find('button').length).toBe(muteCallButtonNumber);
            });
          });
          it('When call is OnMute, MuteCallButton should display and work correctly', function () {
            var onMute = jest.fn();
            var onUnmute = jest.fn();
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              onMute: onMute,
              onUnmute: onUnmute,
              isOnMute: true,
              showMuteButton: true
            });
            var muteButton = getControlButton('MuteCallButton');
            muteButton.click();
            expect(muteButton.title).toBe(_i18n["default"].getString('unmute'));
            expect(muteButton.isActive).toBe(true);
            expect(onUnmute).toBeCalled();
            expect(onMute).not.toBeCalled();
          });
          it('When call is unMute, MuteCallButton should display and work correctly', function () {
            var onMute = jest.fn();
            var onUnmute = jest.fn();
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              onMute: onMute,
              onUnmute: onUnmute,
              isOnMute: false,
              showMuteButton: true
            });
            var muteButton = getControlButton('MuteCallButton');
            muteButton.click();
            expect(muteButton.title).toBe(_i18n["default"].getString('mute'));
            expect(muteButton.isActive).toBe(false);
            expect(onUnmute).not.toBeCalled();
            expect(onMute).toBeCalled();
          });
          it('User can transfer an Call', function () {
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit'
            });
            expect(getControlButton('TransferCallButton').isDisabled).toBe(false);
          });
          it('When User has mutiple calls, should hightlight transfer button', function () {
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              isOnActive: true
            });
            var transferButton = getControlButton('TransferCallButton');
            expect(transferButton.isActive).toBe(true);
            expect(transferButton.isDisabled).toBe(false);
          });
          it("When not allow to transfer or requeue a call, then shouldn't be able to", function () {
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              disableTransfer: true
            });
            expect(getControlButton('TransferCallButton').isDisabled).toBe(true);
          });
          it('when user not allow to Requeue a Call', function () {
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              currentCallControlPermission: {
                allowRequeueCall: false
              }
            });
            getControlButton('TransferCallButton').click();
            expect(wrapper.find('RcMenuItem[data-sign="transferItem-queueTransfer"]').prop('disabled')).toBe(true); // for simulate issue: https://github.com/enzymejs/enzyme/issues/386
          });
          it('when user not allow to Transfer a Call', function () {
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              currentCallControlPermission: {
                allowTransferCall: false
              }
            });
            getControlButton('TransferCallButton').click();
            expect(wrapper.find('RcMenuItem[data-sign="transferItem-internalTransfer"]').prop('disabled')).toBe(true); // for simulate issue: https://github.com/enzymejs/enzyme/issues/386
          });
          it('When user has multiple calls, display ActiveCallButton, not HandUpButton', function () {
            var onActive = jest.fn();
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              isOnActive: true,
              onActive: onActive
            });
            expect(wrapper.find('ActiveCallButton')).toHaveLength(1);
            expect(getControlButton('HandUpButton').isExist).toBe(false);
            expect(wrapper.find('ActiveCallButton').find('button').hasClass('buttonActive')).toBe(true);
            wrapper.find('ActiveCallButton').find('button').simulate('click');
            expect(onActive).toBeCalled();
          });
          it('When user on the InComing Call, can see the Reject Button', function () {
            var onReject = jest.fn();
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              isInComingCall: true,
              onReject: onReject
            });
            var hangupButton = getControlButton('HandUpButton');
            expect(hangupButton.title).toBe(_i18n["default"].getString('reject'));
            hangupButton.click();
            expect(onReject).toBeCalled();
          });
          it('When the call is not InComing Call, can see the Hangup button', function () {
            var onHangup = jest.fn();
            wrapper = setup({
              status: 'active',
              saveStatus: 'submit',
              isInComingCall: false,
              onHangup: onHangup
            });
            var hangupButton = getControlButton('HandUpButton');
            expect(hangupButton.title).toBe(_i18n["default"].getString('hangup'));
            hangupButton.click();
            expect(onHangup).toBeCalled();
          });
          [{
            disableControl: 'disableHold',
            domTag: 'HoldCallButton'
          }, {
            disableControl: 'disableHangup',
            domTag: 'HandUpButton'
          }, {
            disableControl: 'disableMute',
            domTag: 'MuteCallButton'
          }, {
            disableControl: 'disableActive',
            domTag: 'ActiveCallButton'
          }].map(function (_ref6) {
            var disableControl = _ref6.disableControl,
                domTag = _ref6.domTag;
            return it("Verify permission of ".concat(disableControl), function () {
              var _setup;

              wrapper = setup((_setup = {
                status: 'active',
                saveStatus: 'submit'
              }, _defineProperty(_setup, disableControl, true), _defineProperty(_setup, "isOnActive", disableControl === 'disableActive'), _defineProperty(_setup, "showMuteButton", true), _setup));
              expect(wrapper.find(domTag).find('button').prop('disabled')).toBe(true);
            });
          });
          [{
            ivrAlertData: []
          }, {
            ivrAlertData: [{
              subject: 'I am subject 1',
              body: 'I am body 1'
            }],
            subject: 'I am subject 1'
          }, {
            ivrAlertData: [{
              subject: 'I am subject 1',
              body: 'I am body 1'
            }, {
              subject: 'I am subject 2',
              body: 'I am body 2'
            }],
            subject: 'I am subject 1 +1'
          }, {
            ivrAlertData: [{
              subject: 'I am subject 1',
              body: 'I am body 1'
            }, {
              subject: 'I am subject 2',
              body: 'I am body 2'
            }, {
              subject: 'I am subject 3',
              body: 'I am body 3'
            }],
            subject: 'I am subject 1 +2'
          }].map(function (_ref7) {
            var ivrAlertData = _ref7.ivrAlertData,
                subject = _ref7.subject;
            it("Verify ivr panel display of ".concat(subject), function () {
              wrapper = setup({
                ivrAlertData: ivrAlertData
              });

              if (ivrAlertData.length === 0) {
                expect(wrapper.find('.ivrPanel').exists()).toBeFalsy();
              } else {
                var item = wrapper.find('.item');

                for (var i = 0; i < ivrAlertData.length; i++) {
                  if (i !== 0) {
                    expect(item.at(i).find('.subject').text()).toBe(ivrAlertData[i].subject);
                    expect(item.at(i).find('.body').text()).toBe(ivrAlertData[i].body);
                  } else {
                    expect(item.at(0).find('.body').text()).toBe(ivrAlertData[0].body);
                  }
                }

                expect(wrapper.find(_juno.RcExpansionPanelSummary).text()).toBe(subject);
              }
            });
            it('When the call is end, ivr panel should be shrunk', function () {
              wrapper = setup({
                status: 'active'
              });
              wrapper.find(_juno.RcExpansionPanelSummary).find('RcIcon').simulate('click');
              wrapper.update();
              expect(wrapper.find(_juno.RcExpansionPanel).find('.expanded').exists()).toBeTruthy();
              wrapper = setup({
                status: 'callEnd'
              });
              wrapper.update();
              expect(wrapper.find(_juno.RcExpansionPanel).find('.expanded').exists()).toBeFalsy();
            });
            return null;
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
//# sourceMappingURL=ActivityCallLogPanel.spec.js.map

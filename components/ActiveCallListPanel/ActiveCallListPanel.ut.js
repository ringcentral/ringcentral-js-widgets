"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapperUnmount = exports.UTUnholdRender = exports.UTUnMuteRender = exports.UTNoCall = exports.UTMuteRender = exports.UTHoldRender = exports.UTHangUpRender = exports.UTGoBackPage = void 0;
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../SmallCallControl/i18n"));
var _ActiveCallListPanel = require("./ActiveCallListPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var wrapper;
var currentLocale = 'en-US';
var defaultCallList = [{
  session: {
    sessionId: '5001'
  },
  isHold: true
}, {
  session: {
    sessionId: '5002'
  },
  isHold: false
}, {
  session: {
    sessionId: '5003'
  },
  isHold: false
}];
function setup() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$goBack = _ref.goBack,
    goBack = _ref$goBack === void 0 ? function () {} : _ref$goBack,
    _ref$callList = _ref.callList,
    callList = _ref$callList === void 0 ? defaultCallList : _ref$callList,
    _ref$onHangup = _ref.onHangup,
    onHangup = _ref$onHangup === void 0 ? function () {} : _ref$onHangup,
    _ref$onUnHold = _ref.onUnHold,
    onUnHold = _ref$onUnHold === void 0 ? function () {} : _ref$onUnHold,
    _ref$onHold = _ref.onHold,
    onHold = _ref$onHold === void 0 ? function () {} : _ref$onHold,
    _ref$onMute = _ref.onMute,
    onMute = _ref$onMute === void 0 ? function () {} : _ref$onMute,
    _ref$onUnmute = _ref.onUnmute,
    onUnmute = _ref$onUnmute === void 0 ? function () {} : _ref$onUnmute,
    _ref$isOnMute = _ref.isOnMute,
    isOnMute = _ref$isOnMute === void 0 ? false : _ref$isOnMute,
    _ref$showMuteButton = _ref.showMuteButton,
    showMuteButton = _ref$showMuteButton === void 0 ? true : _ref$showMuteButton,
    _ref$userName = _ref.userName,
    userName = _ref$userName === void 0 ? '' : _ref$userName,
    _ref$isInbound = _ref.isInbound,
    isInbound = _ref$isInbound === void 0 ? false : _ref$isInbound;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_ActiveCallListPanel.ActiveCallListPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    callList: callList,
    onHangup: onHangup,
    onUnHold: onUnHold,
    onHold: onHold,
    onMute: onMute,
    onUnmute: onUnmute,
    isOnMute: isOnMute,
    showMuteButton: showMuteButton,
    userName: userName,
    isInbound: isInbound
  })));
}
var wrapperUnmount = function wrapperUnmount() {
  wrapper.unmount();
};
exports.wrapperUnmount = wrapperUnmount;
var getControlButton = function getControlButton(_ref2) {
  var itemIndex = _ref2.itemIndex,
    buttonType = _ref2.buttonType,
    dataIcon = _ref2.dataIcon;
  var callItem = wrapper.find('[data-sign="callItem"]').at(itemIndex);
  var button = callItem.find(buttonType).find('button');
  return {
    title: button.prop('title'),
    click: function click() {
      return button.simulate('click');
    }
  };
};
var UTGoBackPage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var goBack;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            goBack = jest.fn();
            wrapper = setup({
              goBack: goBack
            });
            wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
            expect(goBack).toHaveBeenCalled();
            wrapperUnmount();
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function UTGoBackPage() {
    return _ref3.apply(this, arguments);
  };
}();
exports.UTGoBackPage = UTGoBackPage;
var UTNoCall = function UTNoCall() {
  var callList = [];
  wrapper = setup({
    callList: callList
  });
  expect(wrapper.find('[data-sign="callList"]').text()).toBe('');
  wrapperUnmount();
};
exports.UTNoCall = UTNoCall;
var UTHoldRender = function UTHoldRender() {
  var onHold = jest.fn();
  var onUnHold = jest.fn();
  var itemIndex = 0;
  wrapper = setup({
    onHold: onHold,
    onUnHold: onUnHold
  });
  var holdButton = getControlButton({
    itemIndex: itemIndex + 1,
    buttonType: 'HoldCallButton',
    dataIcon: 'hold'
  });
  expect(holdButton.title).toBe(_i18n["default"].getString('onHold'));
  holdButton.click();
  expect(onHold).not.toHaveBeenCalled();
  expect(onUnHold).toHaveBeenCalledWith(defaultCallList[itemIndex]);
  wrapperUnmount();
};
exports.UTHoldRender = UTHoldRender;
var UTUnholdRender = function UTUnholdRender() {
  var onHold = jest.fn();
  var onUnHold = jest.fn();
  var itemIndex = 2;
  wrapper = setup({
    onHold: onHold,
    onUnHold: onUnHold
  });
  var holdButton = getControlButton({
    itemIndex: itemIndex + 1,
    buttonType: 'HoldCallButton',
    dataIcon: 'hold'
  });
  expect(holdButton.title).toBe(_i18n["default"].getString('hold'));
  holdButton.click();
  expect(onHold).toHaveBeenCalledWith(defaultCallList[itemIndex]);
  expect(onUnHold).not.toHaveBeenCalled();
  wrapperUnmount();
};
exports.UTUnholdRender = UTUnholdRender;
var UTHangUpRender = function UTHangUpRender() {
  var onHangup = jest.fn();
  var itemIndex = 0;
  wrapper = setup({
    onHangup: onHangup
  });
  var HangUpButton = getControlButton({
    itemIndex: itemIndex,
    buttonType: 'HangUpButton',
    dataIcon: 'hand-up'
  });
  expect(HangUpButton.title).toBe(_i18n["default"].getString('hangup'));
  HangUpButton.click();
  expect(onHangup).toHaveBeenCalledWith(defaultCallList[itemIndex]);
  wrapperUnmount();
};
exports.UTHangUpRender = UTHangUpRender;
var UTMuteRender = function UTMuteRender() {
  var onMute = jest.fn();
  wrapper = setup({
    onMute: onMute,
    isOnMute: false,
    showMuteButton: true
  });
  var muteButton = getControlButton({
    itemIndex: 2,
    buttonType: 'MuteCallButton',
    dataIcon: 'mic'
  });
  expect(muteButton.title).toBe(_i18n["default"].getString('mute'));
  muteButton.click();
  expect(onMute).toHaveBeenCalledTimes(1);
  wrapperUnmount();
};
exports.UTMuteRender = UTMuteRender;
var UTUnMuteRender = function UTUnMuteRender() {
  var onUnmute = jest.fn();
  wrapper = setup({
    onUnmute: onUnmute,
    isOnMute: true,
    showMuteButton: true
  });
  var unMuteButton = getControlButton({
    itemIndex: 2,
    buttonType: 'MuteCallButton',
    dataIcon: 'mic-off'
  });
  expect(unMuteButton.title).toBe(_i18n["default"].getString('unmute'));
  unMuteButton.click();
  expect(onUnmute).toHaveBeenCalledTimes(1);
  wrapperUnmount();
};
exports.UTUnMuteRender = UTUnMuteRender;
//# sourceMappingURL=ActiveCallListPanel.ut.js.map

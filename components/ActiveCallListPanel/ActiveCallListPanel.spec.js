"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _rcui = require("@ringcentral-integration/rcui");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _i18n = _interopRequireDefault(require("../SmallCallControl/i18n"));

var _ActiveCallListPanel = require("./ActiveCallListPanel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  isHold: true
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
      onHold = _ref$onHold === void 0 ? function () {} : _ref$onHold;

  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_rcui.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_ActiveCallListPanel.ActiveCallListPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    callList: callList,
    onHangup: onHangup,
    onUnHold: onUnHold,
    onHold: onHold
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

var getHoldButton = function getHoldButton(itemIndex) {
  var callItem = wrapper.find('[data-sign="callItem"]').at(itemIndex);
  var button = callItem.find('HoldCallButton').find('button');
  return {
    title: callItem.find('CircleIconButton[data-icon="hold"]').prop('title'),
    click: function click() {
      return button.simulate('click');
    }
  };
};

var getHandUpButton = function getHandUpButton(itemIndex) {
  var callItem = wrapper.find('[data-sign="callItem"]').at(itemIndex);
  var button = callItem.find('HandUpButton').find('button');
  return {
    title: callItem.find('CircleIconButton[data-icon="hand-up"]').prop('title'),
    click: function click() {
      return button.simulate('click');
    }
  };
};

describe('<ActiveCallListPanel />', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          it('Display Back Button and when user click it, function goBack will be called', function () {
            var goBack = jest.fn();
            wrapper = setup({
              goBack: goBack
            });
            wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
            expect(goBack).toBeCalled();
          });
          it('When there is no call, can render corrently', function () {
            var callList = [];
            wrapper = setup({
              callList: callList
            });
            expect(wrapper.find('[data-sign="callList"]').text()).toBe('');
          });
          it('when call is onhold can render correctly', function () {
            var onHold = jest.fn();
            var onUnHold = jest.fn();
            var itemIndex = 2;
            wrapper = setup({
              onHold: onHold,
              onUnHold: onUnHold
            });
            var holdButton = getHoldButton(itemIndex);
            expect(holdButton.title).toBe(_i18n["default"].getString('onHold'));
            holdButton.click();
            expect(onHold).not.toBeCalled();
            expect(onUnHold).toBeCalledWith(defaultCallList[itemIndex]);
          });
          it('when call is unhold can render correctly', function () {
            var onHold = jest.fn();
            var onUnHold = jest.fn();
            var itemIndex = 1;
            wrapper = setup({
              onHold: onHold,
              onUnHold: onUnHold
            });
            var holdButton = getHoldButton(itemIndex);
            expect(holdButton.title).toBe(_i18n["default"].getString('hold'));
            holdButton.click();
            expect(onHold).toBeCalledWith(defaultCallList[itemIndex]);
            expect(onUnHold).not.toBeCalled();
          });
          it('HandUpButton can render correctly', function () {
            var onHangup = jest.fn();
            var itemIndex = 0;
            wrapper = setup({
              onHangup: onHangup
            });
            var handUpButton = getHandUpButton(itemIndex);
            expect(handUpButton.title).toBe(_i18n["default"].getString('hangup'));
            handUpButton.click();
            expect(onHangup).toBeCalledWith(defaultCallList[itemIndex]);
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
//# sourceMappingURL=ActiveCallListPanel.spec.js.map

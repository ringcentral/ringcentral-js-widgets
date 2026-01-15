"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapperUnmount = exports.UTUnholdRender = exports.UTUnMuteRender = exports.UTNoCall = exports.UTMuteRender = exports.UTHoldRender = exports.UTHangUpRender = exports.UTGoBackPage = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../SmallCallControl/i18n"));
var _ActiveCallListPanel = require("./ActiveCallListPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
  return (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_ActiveCallListPanel.ActiveCallListPanel, {
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
var wrapperUnmount = exports.wrapperUnmount = function wrapperUnmount() {
  wrapper.unmount();
};
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
var UTGoBackPage = exports.UTGoBackPage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var goBack;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          goBack = jest.fn();
          wrapper = setup({
            goBack: goBack
          });
          wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
          expect(goBack).toHaveBeenCalled();
          wrapperUnmount();
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function UTGoBackPage() {
    return _ref3.apply(this, arguments);
  };
}();
var UTNoCall = exports.UTNoCall = function UTNoCall() {
  var callList = [];
  wrapper = setup({
    callList: callList
  });
  expect(wrapper.find('[data-sign="callList"]').text()).toBe('');
  wrapperUnmount();
};
var UTHoldRender = exports.UTHoldRender = function UTHoldRender() {
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
var UTUnholdRender = exports.UTUnholdRender = function UTUnholdRender() {
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
var UTHangUpRender = exports.UTHangUpRender = function UTHangUpRender() {
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
var UTMuteRender = exports.UTMuteRender = function UTMuteRender() {
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
var UTUnMuteRender = exports.UTUnMuteRender = function UTUnMuteRender() {
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
//# sourceMappingURL=ActiveCallListPanel.ut.js.map

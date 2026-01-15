"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _testUtils = require("react-dom/test-utils");
var _WorkingStateSelect = require("./WorkingStateSelect");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var wrapper;
var agentStates = [{
  agentAuxState: 'Available',
  agentState: 'AVAILABLE',
  rank: '1',
  color: 'green'
}, {
  agentAuxState: 'Working',
  agentState: 'WORKING',
  rank: '2',
  color: 'yellow'
}, {
  agentAuxState: 'Away',
  agentState: 'AWAY',
  rank: '3',
  color: 'grey'
}, {
  agentAuxState: 'On Break',
  agentState: 'ON-BREAK',
  rank: '4',
  color: 'grey'
}, {
  agentAuxState: 'Lunch',
  agentState: 'LUNCH',
  rank: '5',
  color: 'grey'
}, {
  agentAuxState: 'Allow Offhook',
  agentState: 'AUX-UNAVAIL-OFFHOOK',
  rank: '7',
  color: 'red'
}, {
  agentAuxState: 'Disconnect Offhook',
  agentState: 'AUX-UNAVAIL-NO-OFFHOOK',
  rank: '8',
  color: 'red'
}, {
  agentAuxState: 'Napping',
  agentState: 'AWAY',
  rank: '11',
  color: 'grey'
}, {
  agentAuxState: '"Training"',
  agentState: 'TRAINING',
  rank: '13',
  color: 'yellow'
}, {
  agentAuxState: 'Meeting',
  agentState: 'WORKING',
  rank: '41',
  color: 'yellow'
}];
function setup() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$getStateColor = _ref.getStateColor,
    getStateColor = _ref$getStateColor === void 0 ? function () {
      return '';
    } : _ref$getStateColor,
    _ref$handleWithInterv = _ref.handleWithIntervalTime,
    handleWithIntervalTime = _ref$handleWithInterv === void 0 ? function () {} : _ref$handleWithInterv,
    _ref$stateText = _ref.stateText,
    stateText = _ref$stateText === void 0 ? 'Available' : _ref$stateText,
    _ref$time = _ref.time,
    time = _ref$time === void 0 ? Date.now() : _ref$time,
    _ref$currentStateInde = _ref.currentStateIndex,
    currentStateIndex = _ref$currentStateInde === void 0 ? 0 : _ref$currentStateInde,
    _ref$getTimerText = _ref.getTimerText,
    getTimerText = _ref$getTimerText === void 0 ? function (time) {
      return time;
    } : _ref$getTimerText,
    _ref$changeWorkingSta = _ref.changeWorkingState,
    changeWorkingState = _ref$changeWorkingSta === void 0 ? function () {} : _ref$changeWorkingSta,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  return (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_WorkingStateSelect.WorkingStateSelect, {
    agentStates: agentStates,
    getStateColor: getStateColor,
    handleWithIntervalTime: handleWithIntervalTime,
    stateText: stateText,
    time: time,
    currentStateIndex: currentStateIndex,
    getTimerText: getTimerText,
    changeWorkingState: changeWorkingState,
    disabled: disabled
  })));
}
afterEach(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        wrapper.unmount();
      case 1:
        return _context.a(2);
    }
  }, _callee);
})));
var getAgentStateButton = function getAgentStateButton() {
  var RcButtonBase = wrapper.find('RcButtonBase').at(0);
  return {
    button: RcButtonBase,
    click: function click() {
      return RcButtonBase.simulate('click');
    },
    text: RcButtonBase.find('[data-sign="stateName"]').text()
  };
};
var getAgentStateList = function getAgentStateList() {
  return wrapper.find('RcMenu').at(0).find('RcMenuItem');
};
function getSelectedItem() {
  return getAgentStateList().find('li.Mui-selected');
}
describe('<WorkingStateSelect />', function () {
  it('when no initiative agent state', function () {
    var stateText = null;
    var currentStateIndex = -1;
    wrapper = setup({
      stateText: stateText,
      currentStateIndex: currentStateIndex
    });
    var agentStateButton = getAgentStateButton();
    expect(agentStateButton.text).toBe('');
    agentStateButton.click();
    var selectedItems = getSelectedItem();
    expect(selectedItems).toHaveLength(0);
  });
  it('Can display initiative agent state', function () {
    var currentStateIndex = 3;
    var stateText = 'haha';
    wrapper = setup({
      currentStateIndex: currentStateIndex,
      stateText: stateText
    });
    var agentStateButton = getAgentStateButton();
    expect(agentStateButton.text).toBe(stateText);
    agentStateButton.click();
    var agentStateList = getAgentStateList();
    expect(agentStateList).toHaveLength(agentStates.length);
    var selectedItems = getSelectedItem();
    expect(selectedItems).toHaveLength(1);
    expect(agentStateList.at(currentStateIndex).prop('selected')).toBeTruthy();
  });
  it('User can select from agent state list to change', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var changeWorkingState, currentStateIndex, currentState;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          jest.useFakeTimers();
          changeWorkingState = jest.fn(function () {});
          currentStateIndex = 3;
          wrapper = setup({
            changeWorkingState: changeWorkingState
          });
          (0, _testUtils.act)(function () {
            return jest.advanceTimersByTime(2100);
          });
          getAgentStateButton().click();
          getAgentStateList().at(currentStateIndex).simulate('click');
          currentState = agentStates[currentStateIndex];
          expect(changeWorkingState).toHaveBeenCalledWith(currentState);
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  })));
  it('Time label will update itself in every minute', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var handleWithIntervalTime, time, timer, calledIntervalTime1, calledIntervalTime2, calledIntervalTime3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          jest.useFakeTimers();
          handleWithIntervalTime = jest.fn(function () {});
          time = Date.now();
          wrapper = setup({
            time: time,
            handleWithIntervalTime: handleWithIntervalTime
          });
          timer = wrapper.find('[data-sign="timer"]');
          (0, _testUtils.act)(function () {
            return jest.runOnlyPendingTimers();
          });
          calledIntervalTime1 = Number(timer.text());
          (0, _testUtils.act)(function () {
            return jest.runOnlyPendingTimers();
          });
          calledIntervalTime2 = Number(timer.text());
          (0, _testUtils.act)(function () {
            return jest.runOnlyPendingTimers();
          });
          calledIntervalTime3 = Number(timer.text());
          expect(calledIntervalTime2).toBeGreaterThan(calledIntervalTime1);
          expect(calledIntervalTime3).toBeGreaterThan(calledIntervalTime2);
        case 1:
          return _context3.a(2);
      }
    }, _callee3);
  })));
  it('When disabled, click WorkingStateButton should has no response', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var agentStateButton;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          jest.useFakeTimers();
          wrapper = setup({
            disabled: true
          });
          agentStateButton = getAgentStateButton();
          expect(agentStateButton.button.prop('disabled')).toBe(true);
          agentStateButton.click();
          expect(getAgentStateList()).toHaveLength(0);
        case 1:
          return _context4.a(2);
      }
    }, _callee4);
  })));
});
//# sourceMappingURL=WorkingStateSelect.spec.js.map

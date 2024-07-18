"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _testUtils = require("react-dom/test-utils");
var _WorkingStateSelect = require("./WorkingStateSelect");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_WorkingStateSelect.WorkingStateSelect, {
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
  it('User can select from agent state list to change', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var changeWorkingState, currentStateIndex, currentState;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
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
          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Time label will update itself in every minute', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var handleWithIntervalTime, time, timer, calledIntervalTime1, calledIntervalTime2, calledIntervalTime3;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('When disabled, click WorkingStateButton should has no response', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var agentStateButton;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            jest.useFakeTimers();
            wrapper = setup({
              disabled: true
            });
            agentStateButton = getAgentStateButton();
            expect(agentStateButton.button.prop('disabled')).toBe(true);
            agentStateButton.click();
            expect(getAgentStateList()).toHaveLength(0);
          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});
//# sourceMappingURL=WorkingStateSelect.spec.js.map

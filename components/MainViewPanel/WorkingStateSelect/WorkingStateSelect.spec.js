"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _testUtils = require("react-dom/test-utils");

var _juno = require("@ringcentral/juno");

var _WorkingStateSelect = require("./WorkingStateSelect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
            expect(changeWorkingState).toBeCalledWith(currentState);

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

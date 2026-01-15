"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitCountDownOver = exports.CheckCountDownTimer = exports.CheckCountDownShows = exports.CheckCountDownButtonTooltip = void 0;
require("core-js/modules/es.date.now.js");
require("core-js/modules/web.timers.js");
var _ = require(".");
var _juno = require("@ringcentral/juno");
var _react = require("@testing-library/react");
var _react2 = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function setup(_ref) {
  var _ref$currentLocale = _ref.currentLocale,
    currentLocale = _ref$currentLocale === void 0 ? 'en-US' : _ref$currentLocale,
    _ref$onRestartTimer = _ref.onRestartTimer,
    onRestartTimer = _ref$onRestartTimer === void 0 ? function () {} : _ref$onRestartTimer,
    _ref$onResumeRecord = _ref.onResumeRecord,
    onResumeRecord = _ref$onResumeRecord === void 0 ? function () {} : _ref$onResumeRecord,
    _ref$recordPauseCount = _ref.recordPauseCount,
    recordPauseCount = _ref$recordPauseCount === void 0 ? 10 : _ref$recordPauseCount,
    _ref$timeStamp = _ref.timeStamp,
    timeStamp = _ref$timeStamp === void 0 ? Date.now() : _ref$timeStamp,
    _ref$dataSign = _ref.dataSign,
    dataSign = _ref$dataSign === void 0 ? 'CountDown' : _ref$dataSign;
  return (0, _react.render)(/*#__PURE__*/_react2["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react2["default"].createElement(_.CountDownButton, {
    currentLocale: currentLocale,
    onRestartTimer: onRestartTimer,
    onResumeRecord: onResumeRecord,
    recordPauseCount: recordPauseCount,
    timeStamp: timeStamp,
    dataSign: dataSign
  })));
}
var CheckCountDownButtonTooltip = exports.CheckCountDownButtonTooltip = function CheckCountDownButtonTooltip() {
  var _setup = setup({}),
    container = _setup.container;
  var node = container.querySelector('[data-sign="CountDown"]');
  expect(node).toBeTruthy;
  expect(node.title).toBe('Restart timer');
};
var CheckCountDownShows = exports.CheckCountDownShows = function CheckCountDownShows(_ref2) {
  var secondsToPause = _ref2.secondsToPause;
  var _render = (0, _react.render)(/*#__PURE__*/_react2["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react2["default"].createElement(_.CountDown, {
      data: secondsToPause
    }))),
    container = _render.container;
  var node = container.querySelector('[data-sign="CountDownText"]');
  expect(node.textContent).toEqual(secondsToPause > 99 ? '99+' : secondsToPause);
};
var CheckCountDownTimer = exports.CheckCountDownTimer = function CheckCountDownTimer() {
  jest.useFakeTimers('legacy');
  var _setup2 = setup({
      recordPauseCount: 3
    }),
    container = _setup2.container;
  var node = container.querySelector('[data-sign="CountDown"]');
  expect(node.textContent).toEqual('3');
  expect(setInterval).toHaveBeenCalledTimes(1);
  jest.useRealTimers();
};
var WaitCountDownOver = exports.WaitCountDownOver = function WaitCountDownOver(_ref3) {
  var secondsToPause = _ref3.secondsToPause;
  jest.useFakeTimers();
  jest.advanceTimersByTime(secondsToPause * 1000);
  jest.useRealTimers();
};
//# sourceMappingURL=CountDownButton.ut.js.map

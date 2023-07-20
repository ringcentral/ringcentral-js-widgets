"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountDownButton = exports.CountDown = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _utils = require("@ringcentral-integration/commons/utils");
var _juno = require("@ringcentral/juno");
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var CountDown = function CountDown(_ref) {
  var data = _ref.data;
  var count = data > 99 ? '99+' : data;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "danger.f02",
    variant: "subheading1",
    "data-sign": "CountDownText"
  }, count);
};
exports.CountDown = CountDown;
var CountDownButton = function CountDownButton(_ref2) {
  var currentLocale = _ref2.currentLocale,
    onRestartTimer = _ref2.onRestartTimer,
    onResumeRecord = _ref2.onResumeRecord,
    size = _ref2.size,
    className = _ref2.className,
    dataSign = _ref2.dataSign,
    recordPauseCount = _ref2.recordPauseCount,
    timeStamp = _ref2.timeStamp;
  var _useState = (0, _react.useState)(recordPauseCount),
    _useState2 = _slicedToArray(_useState, 2),
    intervalTime = _useState2[0],
    setIntervalTime = _useState2[1];
  (0, _react.useEffect)(function () {
    if (!timeStamp) return;
    var clearTimerSet = function clearTimerSet() {};
    var handleTime = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var time;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                time = Math.ceil(recordPauseCount + (timeStamp - Date.now()) / 1000);
                if (!(time < 0)) {
                  _context.next = 7;
                  break;
                }
                clearTimerSet();
                // to handle other tabs had not execute this part code because this Component destroyed
                _context.next = 5;
                return (0, _utils.sleep)(1000);
              case 5:
                onResumeRecord();
                return _context.abrupt("return");
              case 7:
                setIntervalTime(time);
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function handleTime() {
        return _ref3.apply(this, arguments);
      };
    }();
    var intervalId = setInterval(handleTime, 1000);
    handleTime();
    clearTimerSet = function clearTimerSet() {
      clearInterval(intervalId);
    };
    return clearTimerSet;
  }, [timeStamp, recordPauseCount]);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": dataSign,
    color: "danger.f02",
    symbol: function symbol() {
      return /*#__PURE__*/_react["default"].createElement(CountDown, {
        data: intervalTime
      });
    },
    variant: "round",
    title: _i18n["default"].getString('restartTimer', currentLocale),
    onClick: onRestartTimer,
    size: size,
    className: className,
    shouldPersistBg: true
  });
};
exports.CountDownButton = CountDownButton;
CountDownButton.defaultProps = {
  currentLocale: 'en-US',
  dataSign: 'CountDown'
};
//# sourceMappingURL=CountDownButton.js.map

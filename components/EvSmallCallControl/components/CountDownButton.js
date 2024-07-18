"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountDownButton = exports.CountDown = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/commons/utils");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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

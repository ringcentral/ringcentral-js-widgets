"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogDialpad = void 0;
var _juno = require("@ringcentral/juno");
var _clsx4 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _CloseDialpad = _interopRequireDefault(require("../../../assets/images/CloseDialpad.svg"));
var _DialPad = _interopRequireDefault(require("../../DialPad"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var cleanRegex = /[^\d*#]/g;
var filter = function filter(value) {
  return value.replace(cleanRegex, '');
};
var MAX_PASTE_LENGTH = 15;
var CallLogDialpad = function CallLogDialpad(_ref) {
  var onChange = _ref.onChange,
    onClose = _ref.onClose,
    className = _ref.className,
    isWide = _ref.isWide;
  var _React$useState = _react["default"].useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  var audioRef = _react["default"].useRef(null);
  _react["default"].useEffect(function () {
    if (typeof document !== 'undefined' && document.createElement) {
      // @ts-expect-error TS(2540): Cannot assign to 'current' because it is a read-on... Remove this comment to see the full error message
      audioRef.current = document.createElement('audio');
    }
    return function () {
      if (audioRef.current) {
        audioRef.current.remove();
        // @ts-expect-error TS(2540): Cannot assign to 'current' because it is a read-on... Remove this comment to see the full error message
        audioRef.current = null;
      }
    };
  }, []);
  var playAudio = function playAudio(value) {
    if (audioRef.current && _juno.RcDialerPadSoundsMPEG[value]) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
      audioRef.current.src = _juno.RcDialerPadSoundsMPEG[value];
      audioRef.current.currentTime = 0;
      audioRef.current.play()["catch"](function (error) {
        console.error('playAudio error:', error);
      });
    }
  };
  var onButtonOutput = function onButtonOutput(key) {
    setValue(value + key);
    onChange(key);
  };
  var sendDTMFKeys = function sendDTMFKeys(keys) {
    // @ts-expect-error TS(2367): This condition will always return 'false' since th... Remove this comment to see the full error message
    if (keys === '') {
      return;
    }
    onChange(keys);
    keys.split('').forEach(function (key, index) {
      setTimeout(function () {
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        playAudio(key);
      }, 100 * index);
    });
  };
  var onInputChange = function onInputChange(e) {
    var value = filter(e.currentTarget.value);
    setValue(value);
  };
  var onKeyDown = function onKeyDown(e) {
    var value = filter(e.key);
    sendDTMFKeys(value);
  };
  var onPaste = function onPaste(e) {
    var item = e.clipboardData.items[0];
    item.getAsString(function (data) {
      var filteredValue = filter(data.replace(/<[^>]*>/g, '')); // remove HTML tag in firefox
      var keys = filteredValue;
      if (filteredValue.length > MAX_PASTE_LENGTH) {
        keys = filteredValue.slice(0, MAX_PASTE_LENGTH);
      }
      sendDTMFKeys(keys);
      if (filteredValue.length > MAX_PASTE_LENGTH) {
        setValue(value.replace(filteredValue, keys));
      }
    });
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "callLogDialPad",
    className: (0, _clsx4["default"])(_styles["default"].root, className, _defineProperty({}, _styles["default"].classic, !isWide))
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].closeBtn,
    onClick: onClose,
    "data-sign": "closeBtn"
  }, /*#__PURE__*/_react["default"].createElement(_CloseDialpad["default"], null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx4["default"])(_styles["default"].dialInput, _defineProperty({}, _styles["default"].classic, !isWide))
  }, /*#__PURE__*/_react["default"].createElement("input", {
    "data-sign": "input",
    className: _styles["default"].input,
    value: value,
    onChange: onInputChange,
    onKeyDown: onKeyDown,
    onPaste: onPaste,
    autoFocus: true // eslint-disable-line
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx4["default"])(_styles["default"].keypadContainer, _defineProperty({}, _styles["default"].classic, !isWide))
  }, /*#__PURE__*/_react["default"].createElement(_DialPad["default"], {
    dataSign: "keypad",
    className: _styles["default"].dialPad,
    onButtonOutput: onButtonOutput
  })));
};
exports.CallLogDialpad = CallLogDialpad;
//# sourceMappingURL=CallLogDialpad.js.map

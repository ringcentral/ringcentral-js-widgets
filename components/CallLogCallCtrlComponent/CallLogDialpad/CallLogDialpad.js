"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _react = _interopRequireDefault(require("react"));
var _classnames4 = _interopRequireDefault(require("classnames"));
var _CloseDialpad = _interopRequireDefault(require("../../../assets/images/CloseDialpad.svg"));
var _audios = require("../../DialButton/audios");
var _DialPad = _interopRequireDefault(require("../../DialPad"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
    if (audioRef.current && audioRef.current.canPlayType('audio/ogg') !== '' && _audios.audios[value]) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
      audioRef.current.src = _audios.audios[value];
      audioRef.current.currentTime = 0;
      audioRef.current.play();
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
    className: (0, _classnames4["default"])(_styles["default"].root, className, _defineProperty({}, _styles["default"].classic, !isWide))
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].closeBtn,
    onClick: onClose
  }, /*#__PURE__*/_react["default"].createElement(_CloseDialpad["default"], null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].dialInput, _defineProperty({}, _styles["default"].classic, !isWide))
  }, /*#__PURE__*/_react["default"].createElement("input", {
    "data-sign": "input",
    className: _styles["default"].input,
    value: value,
    onChange: onInputChange,
    onKeyDown: onKeyDown,
    onPaste: onPaste,
    autoFocus: true // eslint-disable-line
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].keypadContainer, _defineProperty({}, _styles["default"].classic, !isWide))
  }, /*#__PURE__*/_react["default"].createElement(_DialPad["default"], {
    dataSign: "keypad",
    className: _styles["default"].dialPad,
    onButtonOutput: onButtonOutput
  })));
};
exports.CallLogDialpad = CallLogDialpad;
//# sourceMappingURL=CallLogDialpad.js.map

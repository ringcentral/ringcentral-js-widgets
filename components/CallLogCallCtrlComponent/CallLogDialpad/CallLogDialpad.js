"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogDialpad = void 0;

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.replace");

var _react = _interopRequireDefault(require("react"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _CloseDialpad = _interopRequireDefault(require("../../../assets/images/CloseDialpad.svg"));

var _audios = require("../../DialButton/audios");

var _DialPad = _interopRequireDefault(require("../../DialPad"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
      audioRef.current = document.createElement('audio');
    }

    return function () {
      if (audioRef.current) {
        audioRef.current.remove();
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
    if (keys === '') {
      return;
    }

    onChange(keys);
    keys.split('').forEach(function (key, index) {
      setTimeout(function () {
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

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingTone = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _react = _interopRequireWildcard(require("react"));

var _useIsMounted = require("../../react-hooks/useIsMounted");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AudioFileReader = function AudioFileReader(_ref) {
  var currentLocale = _ref.currentLocale,
      defaultFileName = _ref.defaultFileName,
      defaultDataUrl = _ref.defaultDataUrl,
      _ref$fileName = _ref.fileName,
      fileName = _ref$fileName === void 0 ? null : _ref$fileName,
      _ref$dataUrl = _ref.dataUrl,
      dataUrl = _ref$dataUrl === void 0 ? null : _ref$dataUrl,
      _onChange = _ref.onChange,
      onReset = _ref.onReset;
  var isMountedRef = (0, _useIsMounted.useIsMounted)();
  var audioElRef = (0, _react.useRef)(null);
  var inputElRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      playState = _useState2[0],
      setPlayState = _useState2[1];

  (0, _react.useEffect)(function () {
    audioElRef.current.pause();
    audioElRef.current.currentTime = 0;
    setPlayState(false);
  }, [dataUrl]);
  var resetButton = fileName !== defaultFileName || dataUrl !== defaultDataUrl ? /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: onReset
  }, _i18n["default"].getString('reset', currentLocale)) : null;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, "File: ", fileName), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      if (inputElRef.current) {
        inputElRef.current.click();
      }
    }
  }, _i18n["default"].getString('upload', currentLocale)), resetButton, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!audioElRef.current) {
                _context.next = 14;
                break;
              }

              if (!playState) {
                _context.next = 5;
                break;
              }

              audioElRef.current.pause();
              _context.next = 14;
              break;

            case 5:
              _context.prev = 5;
              audioElRef.current.currentTime = 0;
              _context.next = 9;
              return audioElRef.current.play();

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](5);

              if (isMountedRef.current) {
                console.log(_context.t0);
                console.log('Failed to play audio, please select a different file');
              }

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 11]]);
    }))
  }, playState ? _i18n["default"].getString('stop', currentLocale) : _i18n["default"].getString('play', currentLocale))), /*#__PURE__*/_react["default"].createElement("input", {
    ref: inputElRef,
    className: _styles["default"].hidden,
    type: "file",
    onChange: function onChange(_ref3) {
      var currentTarget = _ref3.currentTarget;

      if (currentTarget.files.length) {
        var file = currentTarget.files[0]; // const canPlayType = audioElRef.current?.canPlayType(file.type);
        // if (canPlayType !== '') {}

        var reader = new FileReader();

        reader.onload = function () {
          if (isMountedRef.current) {
            _onChange({
              fileName: file.name,
              dataUrl: reader.result
            }); // reset input


            currentTarget.value = null;
          }
        };

        reader.readAsDataURL(file);
      }
    }
  }), /*#__PURE__*/_react["default"].createElement("audio", {
    ref: audioElRef,
    className: _styles["default"].hidden,
    src: dataUrl,
    onPlay: function onPlay() {
      setPlayState(true);
    },
    onPause: function onPause() {
      setPlayState(false);
    }
  }));
};

var RingTone = function RingTone(_ref4) {
  var currentLocale = _ref4.currentLocale,
      incomingAudio = _ref4.incomingAudio,
      incomingAudioFile = _ref4.incomingAudioFile,
      outgoingAudio = _ref4.outgoingAudio,
      outgoingAudioFile = _ref4.outgoingAudioFile,
      defaultIncomingAudio = _ref4.defaultIncomingAudio,
      defaultIncomingAudioFile = _ref4.defaultIncomingAudioFile,
      defaultOutgoingAudio = _ref4.defaultOutgoingAudio,
      defaultOutgoingAudioFile = _ref4.defaultOutgoingAudioFile,
      showRingToneSettings = _ref4.showRingToneSettings,
      setIncomingAudio = _ref4.setIncomingAudio,
      setOutgoingAudio = _ref4.setOutgoingAudio,
      resetIncomingAudio = _ref4.resetIncomingAudio,
      resetOutgoingAudio = _ref4.resetOutgoingAudio;

  if (showRingToneSettings) {
    return (
      /*#__PURE__*/
      // newline
      _react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, "".concat(_i18n["default"].getString('ringtones', currentLocale), " (Technical Preview)")), /*#__PURE__*/_react["default"].createElement("div", null, _i18n["default"].getString('incomingRingtone', currentLocale)), /*#__PURE__*/_react["default"].createElement(AudioFileReader, {
        currentLocale: currentLocale,
        fileName: incomingAudioFile,
        dataUrl: incomingAudio,
        defaultFileName: defaultIncomingAudioFile,
        defaultDataUrl: defaultIncomingAudio,
        onChange: function onChange(_ref5) {
          var fileName = _ref5.fileName,
              dataUrl = _ref5.dataUrl;
          setIncomingAudio({
            fileName: fileName,
            dataUrl: dataUrl
          });
        },
        onReset: resetIncomingAudio
      }), /*#__PURE__*/_react["default"].createElement("div", null, _i18n["default"].getString('outgoingRingtone', currentLocale)), /*#__PURE__*/_react["default"].createElement(AudioFileReader, {
        currentLocale: currentLocale,
        fileName: outgoingAudioFile,
        dataUrl: outgoingAudio,
        defaultFileName: defaultOutgoingAudioFile,
        defaultDataUrl: defaultOutgoingAudio,
        onChange: function onChange(_ref6) {
          var fileName = _ref6.fileName,
              dataUrl = _ref6.dataUrl;
          setOutgoingAudio({
            fileName: fileName,
            dataUrl: dataUrl
          });
        },
        onReset: resetOutgoingAudio
      }))
    );
  }

  return null;
};

exports.RingTone = RingTone;
//# sourceMappingURL=Ringtone.js.map

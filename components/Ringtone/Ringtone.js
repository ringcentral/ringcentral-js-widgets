"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingTone = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _juno = require("@ringcentral/juno");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
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
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /* istanbul ignore file */ // TODO: that component still not completely yet, view in calling settings, layout style issue, still in Technical Preview
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
  var isMountedRef = (0, _juno.useMountState)();
  var inputElRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    playing = _useState2[0],
    setPlaying = _useState2[1];
  var audio = (0, _juno.useAudio)(function (audio) {
    audio.onplay = function () {
      return setPlaying(true);
    };
    audio.onpause = function () {
      return setPlaying(false);
    };
    if (dataUrl) {
      audio.src = dataUrl;
    }
  });
  (0, _react.useEffect)(function () {
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
    if (dataUrl) {
      audio.src = dataUrl;
    }
  }, [audio, dataUrl]);
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
              if (!playing) {
                _context.next = 4;
                break;
              }
              audio.pause();
              _context.next = 13;
              break;
            case 4:
              _context.prev = 4;
              audio.currentTime = 0;
              _context.next = 8;
              return audio.play();
            case 8:
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](4);
              if (isMountedRef.current) {
                console.log(_context.t0);
                console.log('Failed to play audio, please select a different file');
              }
            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 10]]);
    }))
  }, playing ? _i18n["default"].getString('stop', currentLocale) : _i18n["default"].getString('play', currentLocale))), /*#__PURE__*/_react["default"].createElement("input", {
    ref: inputElRef,
    className: _styles["default"].hidden,
    type: "file",
    onChange: function onChange(_ref3) {
      var _currentTarget$files;
      var currentTarget = _ref3.currentTarget;
      if (currentTarget === null || currentTarget === void 0 ? void 0 : (_currentTarget$files = currentTarget.files) === null || _currentTarget$files === void 0 ? void 0 : _currentTarget$files.length) {
        var file = currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function () {
          if (isMountedRef.current) {
            _onChange({
              fileName: file.name,
              dataUrl: reader.result
            });
            // reset input
            currentTarget.value = '';
          }
        };
        reader.readAsDataURL(file);
      }
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
          setIncomingAudio === null || setIncomingAudio === void 0 ? void 0 : setIncomingAudio({
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
          setOutgoingAudio === null || setOutgoingAudio === void 0 ? void 0 : setOutgoingAudio({
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

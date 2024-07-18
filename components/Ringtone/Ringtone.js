"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingTone = void 0;
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
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
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* istanbul ignore file */ // TODO: that component still not completely yet, view in calling settings, layout style issue, still in Technical Preview
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

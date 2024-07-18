"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingtoneUploadButton = void 0;
require("regenerator-runtime/runtime");
var _AudioSettings = require("@ringcentral-integration/commons/modules/AudioSettings");
var _RingtoneConfiguration = require("@ringcentral-integration/commons/modules/RingtoneConfiguration");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _helper = require("../helper");
var _i18n = require("../i18n");
var _styles = _interopRequireDefault(require("../styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var RingtoneUploadButton = function RingtoneUploadButton(_ref) {
  var customRingtoneNameList = _ref.customRingtoneNameList,
    isButtonDisabled = _ref.isButtonDisabled,
    onUploadRingtone = _ref.onUploadRingtone,
    showAlert = _ref.showAlert,
    onClickAddButton = _ref.onClickAddButton;
  var isMountedRef = (0, _juno.useMountState)();
  var inputElRef = (0, _react.useRef)(null);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    key: "add",
    "data-sign": "addRingtone",
    className: _styles["default"].addRingtoneItem,
    onClick: function onClick() {
      if (inputElRef.current) {
        inputElRef.current.click();
      }
      onClickAddButton();
    },
    disabled: isButtonDisabled
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    symbol: _junoIcon.ZoomIn,
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    titleWhenOverflow: true,
    flexFull: true
  }, (0, _i18n.t)('add')), /*#__PURE__*/_react["default"].createElement("input", {
    ref: inputElRef,
    className: _styles["default"].hidden,
    type: "file",
    "data-sign": "uploadRingtoneInput",
    accept: ".mp3, .wav",
    onChange: ( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var currentTarget, _currentTarget$files, file, isValidFile, audioInfo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentTarget = _ref2.currentTarget;
                _context.prev = 1;
                if (!((currentTarget === null || currentTarget === void 0 ? void 0 : (_currentTarget$files = currentTarget.files) === null || _currentTarget$files === void 0 ? void 0 : _currentTarget$files.length) && isMountedRef.current)) {
                  _context.next = 21;
                  break;
                }
                file = currentTarget.files[0]; // duplicate file
                if (!customRingtoneNameList.includes(file.name)) {
                  _context.next = 7;
                  break;
                }
                showAlert(_AudioSettings.audioSettingsErrors.duplicateRingtone);
                return _context.abrupt("return");
              case 7:
                if (!(file.size > _RingtoneConfiguration.MAX_RINGTONE_SIZE)) {
                  _context.next = 10;
                  break;
                }
                showAlert(_AudioSettings.audioSettingsErrors.ringtoneSizeOverLimit);
                return _context.abrupt("return");
              case 10:
                _context.next = 12;
                return (0, _helper.isAudioFile)(file);
              case 12:
                isValidFile = _context.sent;
                if (isValidFile) {
                  _context.next = 16;
                  break;
                }
                showAlert(_AudioSettings.audioSettingsErrors.uploadRingtoneFailed);
                return _context.abrupt("return");
              case 16:
                _context.next = 18;
                return (0, _helper.readAudioFile)(file);
              case 18:
                audioInfo = _context.sent;
                onUploadRingtone(audioInfo);
                // reset input
                currentTarget.value = '';
              case 21:
                _context.next = 27;
                break;
              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](1);
                console.error('upload ringtone failed', _context.t0);
                showAlert(_AudioSettings.audioSettingsErrors.uploadRingtoneFailed);
              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 23]]);
      }));
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }())
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcDivider, {
    "aria-hidden": true,
    tabIndex: -1,
    className: _styles["default"].addRingtoneDivider
  }));
};
exports.RingtoneUploadButton = RingtoneUploadButton;
//# sourceMappingURL=RingtoneUploadButton.js.map

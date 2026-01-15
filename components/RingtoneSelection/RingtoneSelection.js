"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingtoneSelection = void 0;
require("regenerator-runtime/runtime");
var _RingtoneConfiguration = require("@ringcentral-integration/commons/modules/RingtoneConfiguration");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _RemoveRingtoneDialog = require("./components/RemoveRingtoneDialog");
var _RingtoneUploadButton = require("./components/RingtoneUploadButton");
var _i18n = require("./i18n");
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
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var RingtoneSelection = function RingtoneSelection(_ref) {
  var label = _ref.label,
    volume = _ref.volume,
    isDisabled = _ref.isDisabled,
    ringtoneList = _ref.ringtoneList,
    ringtoneDeviceId = _ref.ringtoneDeviceId,
    selectedRingtoneId = _ref.selectedRingtoneId,
    enableCustomRingtone = _ref.enableCustomRingtone,
    isUploadRingtoneDisabled = _ref.isUploadRingtoneDisabled,
    updateCurrentRingtone = _ref.updateCurrentRingtone,
    uploadCustomRingtone = _ref.uploadCustomRingtone,
    removeCustomRingtone = _ref.removeCustomRingtone,
    _showAlert = _ref.showAlert;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    playing = _useState2[0],
    setPlaying = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    playingId = _useState4[0],
    setPlayingId = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    open = _useState6[0],
    setOpen = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    audioUrl = _useState8[0],
    setAudioUrl = _useState8[1];
  var _useState9 = (0, _react.useState)({
      id: '',
      name: ''
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    ringtonePlanToRemoved = _useState10[0],
    setRingtonePlanToRemoved = _useState10[1];
  var audio = (0, _juno.useAudio)(function (audio) {
    var resetPlaying = function resetPlaying() {
      setPlaying(false);
      setPlayingId('');
    };
    audio.onplay = function () {
      return setPlaying(true);
    };
    audio.onpause = resetPlaying;
    audio.onended = resetPlaying;
    audio.onerror = resetPlaying;
    if (volume !== undefined) {
      audio.volume = volume;
    }
    if (audioUrl) {
      audio.src = audioUrl;
    }
    if (ringtoneDeviceId) {
      var _audio$setSinkId;
      (_audio$setSinkId = audio.setSinkId) === null || _audio$setSinkId === void 0 ? void 0 : _audio$setSinkId.call(audio, ringtoneDeviceId);
    }
  });
  var turnOffAudio = (0, _react.useCallback)(function () {
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio, playing]);
  var customRingtoneNameList = (0, _react.useMemo)(function () {
    var customRingtoneList = ringtoneList.filter(function (ringtone) {
      return ringtone.type === 'custom';
    });
    return customRingtoneList.map(function (ringtone) {
      return ringtone.name;
    });
  }, [ringtoneList]);
  (0, _react.useEffect)(function () {
    if (volume !== undefined) {
      audio.volume = volume;
    }
    if (ringtoneDeviceId) {
      var _audio$setSinkId2;
      (_audio$setSinkId2 = audio.setSinkId) === null || _audio$setSinkId2 === void 0 ? void 0 : _audio$setSinkId2.call(audio, ringtoneDeviceId);
    }
  }, [audio, volume, ringtoneDeviceId]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].ringtoneContainer,
    "data-sign": "ringtoneSelectionContainer"
  }, enableCustomRingtone && /*#__PURE__*/_react["default"].createElement(_RemoveRingtoneDialog.RemoveRingtoneDialog, {
    name: (0, _RingtoneConfiguration.getFileNameWithoutExt)(ringtonePlanToRemoved.name),
    open: !!(ringtonePlanToRemoved.id && ringtonePlanToRemoved.name),
    onCancel: function onCancel() {
      return setRingtonePlanToRemoved({
        id: '',
        name: ''
      });
    },
    onConfirm: function onConfirm() {
      setRingtonePlanToRemoved({
        id: '',
        name: ''
      });
      removeCustomRingtone(ringtonePlanToRemoved.id);
    }
  }), label ? /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    "data-sign": "ringtoneSelectionLabel",
    variant: "body2",
    color: "neutral.f06"
  }, label) : null, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    displayEmpty: true,
    fullWidth: true,
    disabled: isDisabled,
    MenuProps: {
      PopoverClasses: {
        paper: _styles["default"].ringtonePopover
      }
    },
    open: open,
    variant: "box",
    "data-sign": "ringtoneSelection",
    value: selectedRingtoneId,
    onOpen: function onOpen() {
      return setOpen(true);
    },
    onClose: function onClose() {
      turnOffAudio();
      setOpen(false);
    }
  }, enableCustomRingtone && /*#__PURE__*/_react["default"].createElement(_RingtoneUploadButton.RingtoneUploadButton, {
    isButtonDisabled: isUploadRingtoneDisabled,
    customRingtoneNameList: customRingtoneNameList,
    showAlert: function showAlert(message) {
      _showAlert(message);
      setOpen(false);
    },
    onUploadRingtone: function onUploadRingtone(info) {
      uploadCustomRingtone(info);
      setOpen(false);
    },
    onClickAddButton: turnOffAudio
  }), ringtoneList.map(function (ringtone) {
    var id = ringtone.id,
      type = ringtone.type,
      name = ringtone.name,
      url = ringtone.url;
    var isDefaultRingtone = type === 'default';
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: id,
      className: _styles["default"].ringtoneItem,
      value: id,
      onClick: function onClick(e) {
        e.stopPropagation();
        if (selectedRingtoneId !== id) {
          updateCurrentRingtone(id);
        }
        setOpen(false);
      }
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcText, null, isDefaultRingtone ? (0, _i18n.t)(id) : (0, _RingtoneConfiguration.getFileNameWithoutExt)(name)), url && /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].actionWrapper
    }, !isDefaultRingtone && /*#__PURE__*/_react["default"].createElement(_juno.RcTooltip, {
      title: (0, _i18n.t)('delete')
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      symbol: _junoIcon.Delete,
      size: "small",
      className: _styles["default"].deleteIcon,
      color: "action.grayDark",
      onClick: function onClick(e) {
        e.stopPropagation();
        turnOffAudio();
        setOpen(false);
        setRingtonePlanToRemoved({
          id: id,
          name: name
        });
      }
    })), /*#__PURE__*/_react["default"].createElement(_juno.RcTooltip, {
      title: (0, _i18n.t)('play')
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      symbol: _junoIcon.PlayCircleBorder,
      size: "small",
      color: playing && id === playingId ? 'action.primary' : 'action.grayDark',
      onClick: ( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e.stopPropagation();
                  _context.prev = 1;
                  turnOffAudio();
                  if (!(ringtoneDeviceId === 'off' || !ringtoneDeviceId)) {
                    _context.next = 5;
                    break;
                  }
                  return _context.abrupt("return");
                case 5:
                  setPlayingId(id);
                  audio.src = url;
                  setAudioUrl(url);
                  audio.play();
                  _context.next = 14;
                  break;
                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](1);
                  console.log(_context.t0);
                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 11]]);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }())
    }))));
  })));
};
exports.RingtoneSelection = RingtoneSelection;
//# sourceMappingURL=RingtoneSelection.js.map

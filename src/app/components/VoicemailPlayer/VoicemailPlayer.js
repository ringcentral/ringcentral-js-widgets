"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoicemailPlayer = void 0;
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _utils = require("@ringcentral-integration/utils");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _excluded = ["uri", "duration", "onStartLoad", "onDownload", "audioStatus", "updateAudioStatus", "loadSourceExternally"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var INVALID_DISPLAY = '00:00';

/**
 * player which support multiple instances
 *
 * with same `audioStatus` will only one instance can play at the same time
 */
var VoicemailPlayer = exports.VoicemailPlayer = function VoicemailPlayer(_ref) {
  var uri = _ref.uri,
    serverDuration = _ref.duration,
    onStartLoad = _ref.onStartLoad,
    onDownload = _ref.onDownload,
    audioStatusProp = _ref.audioStatus,
    updateAudioStatusProp = _ref.updateAudioStatus,
    _ref$loadSourceExtern = _ref.loadSourceExternally,
    loadSourceExternally = _ref$loadSourceExtern === void 0 ? false : _ref$loadSourceExtern,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useAudioPlayerWithEx = (0, _reactHooks.useAudioPlayerWithExternalStatus)({
      uri: uri,
      duration: serverDuration,
      status: audioStatusProp,
      onStatusChange: updateAudioStatusProp,
      loadSourceExternally: loadSourceExternally
    }),
    progress = _useAudioPlayerWithEx.progress,
    togglePlay = _useAudioPlayerWithEx.togglePlay,
    duration = _useAudioPlayerWithEx.duration,
    currentTime = _useAudioPlayerWithEx.currentTime,
    isPlaying = _useAudioPlayerWithEx.isPlaying,
    loading = _useAudioPlayerWithEx.loading,
    onProgressChange = _useAudioPlayerWithEx.onProgressChange,
    onProgressChangeCommitted = _useAudioPlayerWithEx.onProgressChangeCommitted;
  var currentTimeDisplay = (0, _components.useFormatDuration)(currentTime, INVALID_DISPLAY);
  var durationDisplay = (0, _components.useFormatDuration)(duration, INVALID_DISPLAY);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: "flex items-center justify-between"
  }, rest), /*#__PURE__*/_react["default"].createElement("div", {
    className: "min-w-8 grow-0 flex items-center justify-center shrink-0"
  }, loading ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "size-8 flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
    size: "small",
    "data-sign": "progress-indicator"
  })) : /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    symbol: isPlaying ? _springIcon.HoldFilledMd : _springIcon.PlayMd,
    size: "medium",
    iconSize: "small",
    variant: "inverted",
    shape: "squircle",
    "data-sign": isPlaying ? 'pause' : 'play',
    onClick: function onClick() {
      var result = togglePlay();
      if (result) {
        onStartLoad === null || onStartLoad === void 0 ? void 0 : onStartLoad(uri);
      }
    }
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "mx-2 min-w-[3rem] text-center",
    "data-sign": "current"
  }, currentTimeDisplay)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grow mx-2 leading-none",
    "data-sign": "progress"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Slider, {
    "aria-label": "audio slider",
    disabled: loading,
    value: progress,
    onClick: _utils.stopPropagation,
    onChange: function onChange(_, value) {
      onProgressChange(value);
    },
    onChangeCommitted: function onChangeCommitted(_, value) {
      onProgressChangeCommitted(value);
    },
    className: "min-w-full"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "min-w-6 grow-0 flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "mx-2 min-w-[3rem] text-center",
    "data-sign": "duration"
  }, durationDisplay), onDownload && /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    symbol: _springIcon.DownloadMd,
    color: "secondary",
    size: "small",
    variant: "icon",
    onClick: onDownload,
    "data-sign": "download"
  })));
};
//# sourceMappingURL=VoicemailPlayer.js.map

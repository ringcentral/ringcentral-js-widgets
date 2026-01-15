"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvironmentPanel = void 0;
require("core-js/modules/es.array.is-array.js");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _PageHeader = require("../BackHeader/PageHeader");
var _Button = require("../Button");
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _Line = _interopRequireDefault(require("../Line"));
var _Panel = _interopRequireDefault(require("../Panel"));
var _Switch = _interopRequireDefault(require("../Switch"));
var _TextInput = _interopRequireDefault(require("../TextInput"));
var _SettingGroup = require("../VideoPanel/SettingGroup");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var EnvironmentPanel = exports.EnvironmentPanel = function EnvironmentPanel(props) {
  var recordingHost = props.recordingHost,
    _props$defaultHidden = props.defaultHidden,
    defaultHidden = _props$defaultHidden === void 0 ? true : _props$defaultHidden,
    _props$useDataTrackin = props.useDataTrackingSetting,
    useDataTrackingSetting = _props$useDataTrackin === void 0 ? false : _props$useDataTrackin,
    onSetData = props.onSetData,
    enabled = props.enabled,
    allowDataTracking = props.allowDataTracking,
    server = props.server,
    _props$mfeDepsInfo = props.mfeDepsInfo,
    mfeDepsInfo = _props$mfeDepsInfo === void 0 ? '' : _props$mfeDepsInfo;
  var _useRefState = (0, _juno.useRefState)(server),
    _useRefState2 = _slicedToArray(_useRefState, 2),
    serverValueRef = _useRefState2[0],
    setServerValue = _useRefState2[1];
  var _useRefState3 = (0, _juno.useRefState)(mfeDepsInfo),
    _useRefState4 = _slicedToArray(_useRefState3, 2),
    mfeDepsInfoRef = _useRefState4[0],
    setMfeDepsInfo = _useRefState4[1];
  var _useRefState5 = (0, _juno.useRefState)(recordingHost),
    _useRefState6 = _slicedToArray(_useRefState5, 2),
    recordingHostValueRef = _useRefState6[0],
    setRecordingHostValue = _useRefState6[1];
  var _useRefState7 = (0, _juno.useRefState)(allowDataTracking),
    _useRefState8 = _slicedToArray(_useRefState7, 2),
    enabledDataTrackingRef = _useRefState8[0],
    setEnabledDataTracking = _useRefState8[1];
  var _useRefState9 = (0, _juno.useRefState)(enabled),
    _useRefState0 = _slicedToArray(_useRefState9, 2),
    enabledValueRef = _useRefState0[0],
    setEnabledValue = _useRefState0[1];
  var _useState = (0, _react.useState)(defaultHidden),
    _useState2 = _slicedToArray(_useState, 2),
    hidden = _useState2[0],
    setHidden = _useState2[1];
  (0, _juno.useChange)(function () {
    // when open panel, reset value again
    if (!hidden) {
      setServerValue(server, false);
      setMfeDepsInfo(mfeDepsInfo, false);
      setRecordingHostValue(recordingHost, false);
      setEnabledValue(enabled, false);
      setEnabledDataTracking(allowDataTracking, false);
    }
  }, function () {
    return hidden;
  });
  var onServerChange = function onServerChange(e) {
    setServerValue(e.currentTarget.value);
  };
  var onMfeDepsInfoChange = function onMfeDepsInfoChange(e) {
    setMfeDepsInfo(e.currentTarget.value);
  };
  var onRecordingHostChange = function onRecordingHostChange(e) {
    setRecordingHostValue(e.currentTarget.value);
  };
  var onToggleEnabled = function onToggleEnabled() {
    setEnabledValue(!enabledValueRef.current);
  };
  var onToggleDataTracking = function onToggleDataTracking() {
    setEnabledDataTracking(!enabledDataTrackingRef.current);
  };
  var toggleEnv = function toggleEnv() {
    setHidden(!hidden);
  };
  var onOk = function onOk() {
    onSetData({
      server: serverValueRef.current,
      mfeDepsInfo: mfeDepsInfoRef.current,
      recordingHost: recordingHostValueRef.current,
      enabled: enabledValueRef.current,
      allowDataTracking: enabledDataTrackingRef.current
    });
    toggleEnv();
  };
  var onCancel = function onCancel() {
    setServerValue(server);
    setMfeDepsInfo(mfeDepsInfo);
    setRecordingHostValue(recordingHost);
    setEnabledValue(enabled);
    setEnabledDataTracking(allowDataTracking);
    toggleEnv();
  };
  (0, _react.useEffect)(function () {
    if (typeof window !== 'undefined') {
      window.toggleEnv = toggleEnv;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var serverValue = serverValueRef.current;
  var mfeDepsInfoValue = mfeDepsInfoRef.current;
  var enabledValue = enabledValueRef.current;
  var enabledDataTrackingValue = enabledDataTrackingRef.current;
  var recordingHostValue = recordingHostValueRef.current;
  if (hidden) {
    return null;
  }
  var hasChanges = !(serverValue === server && mfeDepsInfoValue === mfeDepsInfo && enabledValue === enabled && recordingHostValue === recordingHost && enabledDataTrackingValue === allowDataTracking);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
    onClick: onCancel
  }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, "Environment"), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: _styles["default"].main
  }, /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
    dataSign: "server",
    summary: "Server setting"
  }, /*#__PURE__*/_react["default"].createElement(_Line["default"], null, "Server", /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
    dataSign: "envServerUrl",
    value: serverValue,
    onChange: onServerChange
  })), /*#__PURE__*/_react["default"].createElement(_Line["default"], null, "Recording Host", /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
    dataSign: "envRecordingHost",
    value: recordingHostValue,
    onChange: onRecordingHostChange
  })), /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    icon: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
      dataSign: "envToggle",
      checked: enabledValue,
      onChange: onToggleEnabled
    })
  }, "Enable")), mfeDepsInfo ? /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
    dataSign: "mfe",
    summary: "MFE setting"
  }, /*#__PURE__*/_react["default"].createElement(_Line["default"], null, "MFE setting", /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
    dataSign: "mfeDepsInfo",
    value: mfeDepsInfoValue,
    onChange: onMfeDepsInfoChange
  }))) : null, useDataTrackingSetting && /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
    dataSign: "analytics",
    summary: "Analytics setting"
  }, /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    icon: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
      dataSign: "dataTrackingToggle",
      checked: enabledDataTrackingValue,
      onChange: onToggleDataTracking
    })
  }, "Enable Data Tracking"), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].comment
  }, "After clicking save, remember to", ' ', /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement("h2", {
    style: {
      display: 'inline'
    }
  }, "refresh"), " to take effect"), "(all tabs need to be closed) when you enable that manually, the enable will take ", /*#__PURE__*/_react["default"].createElement("b", null, "two hours"), " enable, will auto close after", ' ', /*#__PURE__*/_react["default"].createElement("b", null, "two hours")))), /*#__PURE__*/_react["default"].createElement(_Line["default"], {
    className: _styles["default"].saveButtonLine
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    dataSign: "envSave",
    className: (0, _clsx["default"])(_styles["default"].saveButton, !hasChanges ? _styles["default"].disabled : null),
    onClick: onOk,
    disabled: !hasChanges
  }, "Save")));
};
//# sourceMappingURL=EnvironmentPanel.js.map

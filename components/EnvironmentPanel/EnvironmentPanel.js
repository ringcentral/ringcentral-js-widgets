"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvironmentPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _BackHeader = _interopRequireDefault(require("../BackHeader"));
var _Button = require("../Button");
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _Line = _interopRequireDefault(require("../Line"));
var _Panel = _interopRequireDefault(require("../Panel"));
var _Switch = _interopRequireDefault(require("../Switch"));
var _TextInput = _interopRequireDefault(require("../TextInput"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var EnvironmentPanel = function EnvironmentPanel(props) {
  var recordingHost = props.recordingHost,
    _props$defaultHidden = props.defaultHidden,
    defaultHidden = _props$defaultHidden === void 0 ? true : _props$defaultHidden,
    onSetData = props.onSetData,
    enabled = props.enabled,
    server = props.server;
  var _useRefState = (0, _juno.useRefState)(server),
    _useRefState2 = _slicedToArray(_useRefState, 2),
    serverValueRef = _useRefState2[0],
    setServerValue = _useRefState2[1];
  var _useRefState3 = (0, _juno.useRefState)(recordingHost),
    _useRefState4 = _slicedToArray(_useRefState3, 2),
    recordingHostValueRef = _useRefState4[0],
    setRecordingHostValue = _useRefState4[1];
  var _useRefState5 = (0, _juno.useRefState)(enabled),
    _useRefState6 = _slicedToArray(_useRefState5, 2),
    enabledValueRef = _useRefState6[0],
    setEnabledValue = _useRefState6[1];
  var _useState = (0, _react.useState)(defaultHidden),
    _useState2 = _slicedToArray(_useState, 2),
    hidden = _useState2[0],
    setHidden = _useState2[1];
  (0, _juno.useChange)(function () {
    // when open panel, reset value again
    if (!hidden) {
      setServerValue(server, false);
      setRecordingHostValue(recordingHost, false);
      setEnabledValue(enabled, false);
    }
  }, function () {
    return hidden;
  });
  var onServerChange = function onServerChange(e) {
    setServerValue(e.currentTarget.value);
  };
  var onRecordingHostChange = function onRecordingHostChange(e) {
    setRecordingHostValue(e.currentTarget.value);
  };
  var onToggleEnabled = function onToggleEnabled() {
    setEnabledValue(!enabledValueRef.current);
  };
  var toggleEnv = function toggleEnv() {
    setHidden(!hidden);
  };
  var onOk = function onOk() {
    onSetData({
      server: serverValueRef.current,
      recordingHost: recordingHostValueRef.current,
      enabled: enabledValueRef.current
    });
    toggleEnv();
  };
  var onCancel = function onCancel() {
    setServerValue(server);
    setRecordingHostValue(recordingHost);
    setEnabledValue(enabled);
    toggleEnv();
  };
  (0, _react.useEffect)(function () {
    if (typeof window !== 'undefined') {
      window.toggleEnv = toggleEnv;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var serverValue = serverValueRef.current;
  var enabledValue = enabledValueRef.current;
  var recordingHostValue = recordingHostValueRef.current;
  if (hidden) {
    return null;
  }
  var hasChanges = !(serverValue === server && enabledValue === enabled && recordingHostValue === recordingHost);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
    onBackClick: onCancel,
    buttons: []
  }, "Environment"), /*#__PURE__*/_react["default"].createElement(_Panel["default"], null, /*#__PURE__*/_react["default"].createElement(_Line["default"], null, "Server", /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
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
  }, "Enable"), /*#__PURE__*/_react["default"].createElement(_Line["default"], null, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    dataSign: "envSave",
    className: (0, _classnames["default"])(_styles["default"].saveButton, !hasChanges ? _styles["default"].disabled : null),
    onClick: onOk,
    disabled: !hasChanges
  }, "Save"))));
};
exports.EnvironmentPanel = EnvironmentPanel;
//# sourceMappingURL=EnvironmentPanel.js.map

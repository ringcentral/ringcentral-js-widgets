"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlertRenderer = getAlertRenderer;
var _react = _interopRequireDefault(require("react"));
var _EvAuthAlert = _interopRequireDefault(require("./EvAuthAlert"));
var _EvCallAlert = _interopRequireDefault(require("./EvCallAlert"));
var _EvCallDispositionAlert = _interopRequireDefault(require("./EvCallDispositionAlert"));
var _EvCallInfoAlert = _interopRequireDefault(require("./EvCallInfoAlert"));
var _EvIntegratedSoftphoneAlert = _interopRequireDefault(require("./EvIntegratedSoftphoneAlert"));
var _EvRequeueCallAlert = _interopRequireDefault(require("./EvRequeueCallAlert"));
var _EvSessionConfigAlert = _interopRequireDefault(require("./EvSessionConfigAlert"));
var _EvTransferCallAlert = _interopRequireDefault(require("./EvTransferCallAlert"));
var _EvWorkingStateAlert = _interopRequireDefault(require("./EvWorkingStateAlert"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function getAlertRenderer() {
  return function (message) {
    if (_EvAuthAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_EvAuthAlert["default"], props);
      };
    }
    if (_EvCallAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_EvCallAlert["default"], props);
      };
    }
    if (_EvWorkingStateAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_EvWorkingStateAlert["default"], props);
      };
    }
    if (_EvSessionConfigAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_EvSessionConfigAlert["default"], props);
      };
    }
    if (_EvCallDispositionAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_EvCallDispositionAlert["default"], props);
      };
    }
    if (_EvRequeueCallAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_EvRequeueCallAlert["default"], props);
      };
    }
    if (_EvTransferCallAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_EvTransferCallAlert["default"], props);
      };
    }
    if (_EvIntegratedSoftphoneAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_EvIntegratedSoftphoneAlert["default"], props);
      };
    }
    if (_EvCallInfoAlert["default"].handleMessage(message)) {
      return function (props) {
        return /*#__PURE__*/_react["default"].createElement(_EvCallInfoAlert["default"], props);
      };
    }

    /**
     * here should return null for AlertUI using.
     * ringcentral-js-widgets/ringcentral-widgets/modules/AlertUI/AlertUI.tsx:32
     */

    return null;
  };
}
//# sourceMappingURL=AlertRenderer.js.map

"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiNoteTip = void 0;
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var blockStyles = {
  root: 'bg-ai-accent bg-opacity-10'
};
var AiNoteTip = exports.AiNoteTip = function AiNoteTip(_ref) {
  var onView = _ref.onView,
    aiNoteTipType = _ref.aiNoteTipType,
    onCloseAiNoteTip = _ref.onCloseAiNoteTip;
  return /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
    classes: blockStyles
  }, aiNoteTipType === 'viewAiNote' ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center gap-2 typography-mainText text-neutral-b1 w-full"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    size: "small"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: require('./ai.gif'),
    alt: "ai"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 truncate",
    title: (0, _i18n.t)('viewAiNote')
  }, (0, _i18n.t)('viewAiNote')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "text",
    "data-sign": "aiNoteView",
    onClick: onView
  }, (0, _i18n.t)('viewLink')), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    symbol: _springIcon.Xsm,
    size: "medium",
    variant: "icon",
    color: "neutral",
    onClick: onCloseAiNoteTip,
    "data-sign": "aiNoteTipClose"
  })) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center gap-2 typography-mainText text-neutral-b1 w-full"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    title: (0, _i18n.t)('aiNoteStopped'),
    className: "typography-mainText text-neutral-b1 truncate flex-1"
  }, (0, _i18n.t)('aiNoteStopped')), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    symbol: _springIcon.Xsm,
    size: "medium",
    variant: "icon",
    color: "neutral",
    onClick: onCloseAiNoteTip,
    "data-sign": "aiNoteTipClose"
  })));
};
//# sourceMappingURL=AiNoteTip.js.map

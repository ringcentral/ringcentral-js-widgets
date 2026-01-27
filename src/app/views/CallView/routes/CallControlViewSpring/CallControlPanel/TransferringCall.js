"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferringCall = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _components2 = require("../../../../../components");
var _hooks2 = require("../../../../../hooks");
var _i18n = _interopRequireDefault(require("../../../../../hooks/useCallActionButtons/i18n"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var TransferringCallItem = function TransferringCallItem(_ref) {
  var call = _ref.call,
    active = _ref.active,
    dataSign = _ref.dataSign,
    onAction = _ref.onAction;
  var telephonySessionId = call.telephonySessionId;
  var _useContactRenderInfo = (0, _hooks2.useContactRenderInfoFromCall)(call, {
      phoneNumberDisplayMode: 'phoneNumber'
    }),
    DisplayName = _useContactRenderInfo.DisplayName,
    duration = _useContactRenderInfo.duration,
    holding = _useContactRenderInfo.holding;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement("li", {
    "data-telephony-session-id": telephonySessionId,
    className: "flex flex-nowrap gap-4",
    "data-sign": dataSign
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: (0, _clsx["default"])('flex flex-nowrap items-center flex-auto gap-2 rounded-full px-4 py-2 text-left typography-mainText hover:bg-neutral-b4/40', active ? 'bg-neutral-b4' : undefined),
    onClick: function onClick() {
      if (active) return;
      onAction('activeCall', telephonySessionId);
      onAction('unHold', telephonySessionId);
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-neutral-b0 flex-auto truncate w-0",
    "data-sign": "displayName"
  }, /*#__PURE__*/_react["default"].createElement(DisplayName, null)), /*#__PURE__*/_react["default"].createElement("span", {
    className: ""
  }, duration), /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    "data-sign": "".concat(holding ? 'holdIcon' : 'callIcon'),
    symbol: holding ? _springIcon.HoldFilledMd : _springIcon.CallFilledMd,
    size: "small"
  })), /*#__PURE__*/_react["default"].createElement(_springUi.CallButton, {
    variant: "end",
    size: "small",
    TooltipProps: {
      title: t(call.isConferenceCall ? 'leaveCall' : 'endCall')
    },
    "data-sign": "endCall",
    className: active ? undefined : 'invisible',
    onClick: function onClick() {
      onAction('hangUpWarmTransfer', telephonySessionId);
    }
  }));
};
var TransferringCall = exports.TransferringCall = function TransferringCall(_ref2) {
  var transferringCalls = _ref2.transferringCalls,
    expanded = _ref2.expanded,
    onAction = _ref2.onAction,
    onExpand = _ref2.onExpand,
    call = _ref2.call,
    children = _ref2.children;
  var _useLocale2 = (0, _hooks.useLocale)(_i18n2["default"]),
    t = _useLocale2.t;
  var activeTelephonySessionId = call.telephonySessionId;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "transferring-calls"
  }, /*#__PURE__*/_react["default"].createElement(_components.PageHeader, {
    className: "h-12",
    onBackClick: function onBackClick() {
      return onAction('back');
    },
    endAdornment: onExpand && typeof expanded === 'boolean' ? /*#__PURE__*/_react["default"].createElement(_components2.ExpandLogButton, {
      expanded: expanded,
      onExpand: onExpand
    }) : null
  }, t('transferTitle')), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "mx-4 space-y-1 mt-6"
  }, transferringCalls.map(function (transferringCall, index) {
    var currTelephonySessionId = transferringCall.telephonySessionId;
    return /*#__PURE__*/_react["default"].createElement(TransferringCallItem, {
      key: currTelephonySessionId,
      dataSign: "call-item-".concat(index),
      call: transferringCall,
      active: currTelephonySessionId === activeTelephonySessionId,
      onAction: onAction
    });
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col items-center mt-6 mb-12"
  }, children), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-center items-center relative"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    color: "success",
    size: "xxxlarge",
    iconSize: "large",
    TooltipProps: {
      title: t('completeTransfer')
    },
    variant: "contained",
    "data-sign": "completeWarnTransfer",
    symbol: _springIcon.TransferCallMd,
    onClick: function onClick() {
      onAction('completeWarmTransfer');
    }
  })));
};
//# sourceMappingURL=TransferringCall.js.map

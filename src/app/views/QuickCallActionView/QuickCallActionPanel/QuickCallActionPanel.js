"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickCallActionPanel = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _hooks2 = require("@ringcentral-integration/micro-phone/src/app/hooks");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _useContactRenderInfo2 = require("../../../hooks/useContactRenderInfo");
var _ActiveCallsPanel = require("../../CallView/routes/ActiveCallsViewSpring/ActiveCallsPanel");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var SingleCallInfo = function SingleCallInfo(_ref) {
  var call = _ref.call;
  var _useContactRenderInfo = (0, _useContactRenderInfo2.useContactRenderInfoFromCall)(call, {
      phoneNumberDisplayMode: 'phoneNumber'
    }),
    DisplayName = _useContactRenderInfo.DisplayName,
    duration = _useContactRenderInfo.duration,
    ringing = _useContactRenderInfo.ringing,
    OnOtherDevice = _useContactRenderInfo.OnOtherDevice;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center w-full"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    className: "size-9 flex items-center justify-center",
    size: "medium",
    "data-sign": "".concat(ringing ? 'ringing' : 'active', "-call-icon"),
    symbol: ringing ? _springIcon.IncomingCallMd : _springIcon.ActiveCallMd
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col mx-4 flex-auto w-0"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "typography-subtitle truncate"
  }, /*#__PURE__*/_react["default"].createElement(DisplayName, null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center flex-nowrap gap-1"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "typography-mainText"
  }, duration), OnOtherDevice && /*#__PURE__*/_react["default"].createElement(OnOtherDevice, {
    color: "secondary"
  }))));
};
var QuickCallActionPanel = exports.QuickCallActionPanel = function QuickCallActionPanel(_ref2) {
  var actions = _ref2.actions,
    currentCall = _ref2.currentCall,
    ringCalls = _ref2.ringCalls,
    holdingCalls = _ref2.holdingCalls,
    activeCalls = _ref2.activeCalls,
    swapCalls = _ref2.swapCalls,
    mergeCalls = _ref2.mergeCalls,
    swapMenuOpened = _ref2.swapMenuOpened,
    onSwapMenuOpen = _ref2.onSwapMenuOpen,
    mergeMenuOpened = _ref2.mergeMenuOpened,
    onMergeMenuOpen = _ref2.onMergeMenuOpen,
    onAction = _ref2.onAction;
  var swapMenuRef = (0, _react.useRef)(null);
  var mergeMenuRef = (0, _react.useRef)(null);
  var isConferenceCall = currentCall ? Boolean(currentCall.isConferenceCall) : false;
  var buttons = (0, _hooks2.useCallActionButtons)(actions, onAction, {
    isConferenceCall: isConferenceCall
  });
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var ringCallCount = ringCalls.length;
  var onHoldCallCount = holdingCalls.length;
  var activeCallCount = activeCalls.length;
  var allCallsCount = ringCallCount + onHoldCallCount + activeCallCount;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    _react["default"].createElement("div", {
      tabIndex: 0,
      role: "button",
      "data-sign": "QuickCallAction",
      className: "bg-gradient-mixed bg-base-primary-b-high-contrast bg-cover-neutral-b0/30 text-neutral-50 w-full py-2 pl-2 pr-4 flex items-center h-14",
      onClick: function onClick() {
        onAction('activeCall');
      }
    }, currentCall ? /*#__PURE__*/_react["default"].createElement(SingleCallInfo, {
      call: currentCall
    }) : /*#__PURE__*/_react["default"].createElement("div", {
      className: "ml-2"
    }, /*#__PURE__*/_react["default"].createElement("h3", {
      className: "typography-subtitle",
      "data-sign": "calls"
    }, t('calls', {
      count: allCallsCount
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "typography-mainText flex gap-2 items-center"
    }, ringCallCount > 0 && /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
      title: "".concat(ringCallCount, " ").concat(t('incoming'))
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex gap-1 text-success-f",
      "data-sign": "ring-calls"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      size: "small",
      symbol: _springIcon.IncomingCallMd
    }), /*#__PURE__*/_react["default"].createElement("span", null, ringCallCount))), onHoldCallCount > 0 && /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
      title: "".concat(onHoldCallCount, " ").concat(t('onHold'))
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex gap-1 text-warning-f",
      "data-sign": "hold-calls"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      size: "small",
      symbol: _springIcon.HoldMd
    }), /*#__PURE__*/_react["default"].createElement("span", null, onHoldCallCount))), activeCallCount > 0 && /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
      title: "".concat(activeCallCount, " ").concat(t('active'))
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex gap-1 text-danger-f",
      "data-sign": "active-calls"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      size: "small",
      symbol: _springIcon.CallMd
    }), /*#__PURE__*/_react["default"].createElement("span", null, activeCallCount))))), /*#__PURE__*/_react["default"].createElement("i", {
      className: "flex-auto"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex gap-1"
    }, /*#__PURE__*/_react["default"].createElement(_components.ActionMenuList, {
      buttons: buttons,
      variant: "plain",
      refMap: {
        swap: swapMenuRef,
        merge: mergeMenuRef
      },
      propsMap: {
        merge: {
          TooltipProps: {
            title: t('mergeCalls')
          }
        },
        unmute: {
          color: 'secondary',
          variant: 'outlined'
        }
      }
    })), /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
      anchorEl: swapMenuRef.current,
      onClose: function onClose() {
        return onSwapMenuOpen(false);
      },
      open: swapMenuOpened,
      onClick: function onClick(e) {
        // TODO: spring-ui issue, when click the backdrop will trigger the onClick event also UXSYS-3892
        e.stopPropagation();
      }
    }, /*#__PURE__*/_react["default"].createElement("h4", {
      className: "text-neutral-b2 typography-mainText mx-4"
    }, t('swapWith'), ":"), swapCalls.length > 0 && /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, null, swapCalls.map(function (call) {
      return /*#__PURE__*/_react["default"].createElement(_ActiveCallsPanel.ActiveCallInfoListItem, {
        key: call.telephonySessionId,
        call: call,
        onClick: function onClick() {
          onAction('startSwap', call.telephonySessionId);
          onSwapMenuOpen(false);
        }
      });
    }))), /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
      anchorEl: mergeMenuRef.current,
      onClose: function onClose() {
        return onMergeMenuOpen(false);
      },
      open: mergeMenuOpened,
      onClick: function onClick(e) {
        // TODO: spring-ui issue, when click the backdrop will trigger the onClick event also UXSYS-3892
        e.stopPropagation();
      },
      disableEnforceFocus: true
    }, /*#__PURE__*/_react["default"].createElement("h4", {
      className: "text-neutral-b2 typography-mainText mx-4"
    }, t('mergeWith'), ":"), mergeCalls.length > 0 && /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, null, mergeCalls.map(function (call) {
      return /*#__PURE__*/_react["default"].createElement(_ActiveCallsPanel.ActiveCallInfoListItem, {
        key: call.telephonySessionId,
        call: call,
        onClick: function onClick() {
          onAction('startMerge', call.telephonySessionId);
          onMergeMenuOpen(false);
        }
      });
    }))))
  );
};
//# sourceMappingURL=QuickCallActionPanel.js.map

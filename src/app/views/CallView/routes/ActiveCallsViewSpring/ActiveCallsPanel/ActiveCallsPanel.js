"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallsPanel = exports.ActiveCallInfoListItem = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _hooks2 = require("../../../../../hooks");
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["call", "children", "action", "tooltip"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ActiveCallInfoListItem = exports.ActiveCallInfoListItem = function ActiveCallInfoListItem(_ref) {
  var call = _ref.call,
    children = _ref.children,
    action = _ref.action,
    tooltip = _ref.tooltip,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useContactRenderInfo = (0, _hooks2.useContactRenderInfoFromCall)(call, {
      phoneNumberDisplayMode: 'phoneNumber'
    }),
    DisplayName = _useContactRenderInfo.DisplayName,
    duration = _useContactRenderInfo.duration,
    CallStatus = _useContactRenderInfo.CallStatus,
    Avatar = _useContactRenderInfo.Avatar,
    OnOtherDevice = _useContactRenderInfo.OnOtherDevice;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var displayNameSpan = /*#__PURE__*/_react["default"].createElement(DisplayName, null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    tooltipForceHide = _useState2[0],
    _setTooltipForceHide = _useState2[1];
  var rootRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(action, function () {
    return {
      setTooltipForceHide: function setTooltipForceHide(val) {
        if (!tooltip || val === tooltipForceHide) return;
        var root = rootRef.current;
        if (root) {
          // force hide tooltip when mouse leave or enter again for can re-calculate the mouse over timer
          if (val) {
            root.dispatchEvent(new MouseEvent('mouseleave'));
          } else {
            root.dispatchEvent(new MouseEvent('mouseenter'));
          }
          _setTooltipForceHide(val);
        }
      }
    };
  }, [tooltip, tooltipForceHide]);
  var item = /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, _extends({
    "data-tooltip-force-hide": tooltipForceHide,
    ref: rootRef,
    key: call.telephonySessionId,
    size: "large",
    className: "group",
    classes: {
      content: 'bg-inherit'
    }
  }, rest), /*#__PURE__*/_react["default"].createElement(Avatar, {
    size: "large"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
    "data-sign": "displayName",
    primary: OnOtherDevice ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center flex-nowrap gap-1"
    }, displayNameSpan, /*#__PURE__*/_react["default"].createElement(OnOtherDevice, {
      mode: "icon"
    })) : displayNameSpan,
    secondary: /*#__PURE__*/_react["default"].createElement(CallStatus, null, "(", duration, ")")
  }), children);
  return tooltip ? /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
    title: t('callScreen'),
    delay: 1000,
    tooltipForceHide: tooltipForceHide
  }, item) : item;
};
var ActiveCallItem = function ActiveCallItem(_ref2) {
  var call = _ref2.call,
    useActionsHandler = _ref2.useActionsHandler,
    useActiveCallItemActions = _ref2.useActiveCallItemActions;
  var actions = useActiveCallItemActions(call);
  var onAction = useActionsHandler(call.telephonySessionId);
  var isConferenceCall = Boolean(call.isConferenceCall);
  var buttons = (0, _hooks2.useCallActionButtons)(actions, onAction, {
    isConferenceCall: isConferenceCall
  });
  var _useLocale2 = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale2.t;
  var actionRef = (0, _react.useRef)(null);
  return /*#__PURE__*/_react["default"].createElement(ActiveCallInfoListItem, {
    call: call,
    onClick: function onClick() {
      return onAction('activeCall', call.telephonySessionId);
    },
    action: actionRef,
    tooltip: true
  }, /*#__PURE__*/_react["default"].createElement(_components2.ActionMenuList, {
    buttons: buttons,
    showIconAtMenuList: false,
    TooltipProps: {
      placement: 'top'
    },
    moreButtonProps: {
      size: 'medium',
      TooltipProps: {
        title: t('callActions')
      }
    },
    propsMap: {
      all: {
        size: 'medium',
        iconSize: 'small',
        onMouseOver: function onMouseOver() {
          var _actionRef$current;
          (_actionRef$current = actionRef.current) === null || _actionRef$current === void 0 ? void 0 : _actionRef$current.setTooltipForceHide(true);
        },
        onMouseLeave: function onMouseLeave() {
          var _actionRef$current2;
          (_actionRef$current2 = actionRef.current) === null || _actionRef$current2 === void 0 ? void 0 : _actionRef$current2.setTooltipForceHide(false);
        }
      }
    }
  }));
};
var ActiveCallsPanel = exports.ActiveCallsPanel = function ActiveCallsPanel(_ref3) {
  var backToCall = _ref3.backToCall,
    calls = _ref3.calls,
    useActionsHandler = _ref3.useActionsHandler,
    useActiveCallItemActions = _ref3.useActiveCallItemActions;
  var onAction = useActionsHandler(backToCall.telephonySessionId);
  var _useContactRenderInfo2 = (0, _hooks2.useContactRenderInfoFromCall)(backToCall, {
      phoneNumberDisplayMode: 'phoneNumber'
    }),
    DisplayName = _useContactRenderInfo2.DisplayName,
    holding = _useContactRenderInfo2.holding,
    ringing = _useContactRenderInfo2.ringing;
  var _useLocale3 = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale3.t;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppAnnouncement, null, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "top-active-call-bar",
    className: "bg-gradient-mixed bg-base-primary-b-high-contrast bg-cover-neutral-b0/30 text-neutral-50 w-full py-2 pl-2 pr-4 flex items-center h-14"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    "data-sign": "backButton",
    symbol: _springIcon.CaretLeftMd,
    variant: "inverted",
    color: "secondary",
    background: false,
    onClick: function onClick() {
      onAction('activeCall');
    }
  }), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
    className: "ml-2",
    primary: /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-neutral-base",
      "data-sign": "status"
    }, t(ringing ? 'incomingCall' : holding ? 'onHoldCall' : 'activeCall')),
    secondary: /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-neutral-b4",
      "data-sign": "displayName"
    }, /*#__PURE__*/_react["default"].createElement(DisplayName, null))
  }))), /*#__PURE__*/_react["default"].createElement(_springUi.List, {
    "data-sign": "active-calls-list"
  }, calls.map(function (call, index) {
    return /*#__PURE__*/_react["default"].createElement(ActiveCallItem, {
      key: "".concat(call.telephonySessionId, "-").concat(index),
      call: call,
      useActionsHandler: useActionsHandler,
      useActiveCallItemActions: useActiveCallItemActions
    });
  })));
};
//# sourceMappingURL=ActiveCallsPanel.js.map

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useThreadInfoDisplay = void 0;
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _components = require("@ringcentral-integration/micro-contacts/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var AlertBanner = function AlertBanner(_ref) {
  var _ref$severity = _ref.severity,
    severity = _ref$severity === void 0 ? 'info' : _ref$severity,
    title = _ref.title,
    actions = _ref.actions;
  return /*#__PURE__*/_react["default"].createElement(_springUi.Alert, {
    severity: severity,
    className: "m-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/_react["default"].createElement("h4", null, title), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-3"
  }, actions)));
};
var useThreadInfoDisplay = exports.useThreadInfoDisplay = function useThreadInfoDisplay(_ref2) {
  var _metadata$loading, _metadata$reopen, _threadState$showInpu, _threadInfo$owner;
  var threadInfo = _ref2.info,
    extensionId = _ref2.extensionId,
    onAction = _ref2.onAction,
    metadata = _ref2.metadata;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var isLoading = (_metadata$loading = metadata === null || metadata === void 0 ? void 0 : metadata.loading) !== null && _metadata$loading !== void 0 ? _metadata$loading : false;
  var isReopened = (_metadata$reopen = metadata === null || metadata === void 0 ? void 0 : metadata.reopen) !== null && _metadata$reopen !== void 0 ? _metadata$reopen : false;
  var threadState = (0, _react.useMemo)(function () {
    var _threadInfo$assignee, _threadInfo$assignee2, _threadInfo$assignee3, _threadInfo$assignee4, _threadInfo$assignee5;
    if (!threadInfo) {
      return null;
    }
    var isResolved = threadInfo.status === 'Resolved';
    var isAssigned = !!threadInfo.assignee;
    var currentExtensionId = extensionId === null || extensionId === void 0 ? void 0 : extensionId.toString();
    var isAssignedToMe = ((_threadInfo$assignee = threadInfo.assignee) === null || _threadInfo$assignee === void 0 ? void 0 : _threadInfo$assignee.extensionId) === currentExtensionId;
    var showInput = !isResolved && isAssignedToMe || isReopened;

    // Get assignee badge info
    var assigneeBadge = null;
    var assigneeName = (_threadInfo$assignee2 = threadInfo.assignee) === null || _threadInfo$assignee2 === void 0 ? void 0 : _threadInfo$assignee2.name;
    // Get tooltip text for assignee badge
    var assigneeBadgeTooltip;
    if (isAssigned && !isResolved && ((_threadInfo$assignee3 = threadInfo.assignee) === null || _threadInfo$assignee3 === void 0 ? void 0 : _threadInfo$assignee3.name)) {
      assigneeBadge = {
        children: (0, _components.getAvatarLetter)(assigneeName),
        color: isAssignedToMe ? 'warning' : 'primary',
        variant: isAssignedToMe ? 'filled' : 'outlined',
        className: isAssignedToMe ? 'border-none' : ''
      };
    } else if (isResolved) {
      var isExpired = threadInfo.statusReason === 'ThreadExpired';
      if (!isExpired) {
        assigneeBadge = {
          children: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
            symbol: _springIcon.CheckMd,
            size: "xsmall"
          }),
          color: 'primary'
        };
        assigneeBadgeTooltip = t('resolved');
      } else {
        assigneeBadge = {
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
            symbol: _springIcon.ClockMd,
            size: "xsmall"
          }), /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
            className: "ml-0.5",
            symbol: _springIcon.CheckMd,
            size: "xsmall"
          })),
          color: 'primary',
          className: 'border-none'
        };
        assigneeBadgeTooltip = t('autoResolved');
      }
    }
    if (isAssigned && !isResolved && ((_threadInfo$assignee4 = threadInfo.assignee) === null || _threadInfo$assignee4 === void 0 ? void 0 : _threadInfo$assignee4.name)) {
      if (isAssignedToMe) {
        assigneeBadgeTooltip = t('assignedToYouTooltip');
      } else {
        assigneeBadgeTooltip = t('assignedToOtherTooltip', {
          name: assigneeName || ''
        });
      }
    }
    return {
      isResolved: isResolved,
      isAssigned: isAssigned,
      isAssignedToMe: isAssignedToMe,
      assigneeName: (_threadInfo$assignee5 = threadInfo.assignee) === null || _threadInfo$assignee5 === void 0 ? void 0 : _threadInfo$assignee5.name,
      assigneeBadge: assigneeBadge,
      assigneeBadgeTooltip: assigneeBadgeTooltip,
      showInput: showInput,
      showResolvedBanner: isResolved,
      showUnassignedBanner: !isAssigned && !isResolved,
      showAssignedToOtherBanner: isAssigned && !isAssignedToMe && !isResolved
    };
  }, [threadInfo, extensionId, isReopened, t]);
  var bannerDisplay = (0, _react.useMemo)(function () {
    if (!threadState) return false;
    return threadState.showResolvedBanner || threadState.showUnassignedBanner || threadState.showAssignedToOtherBanner;
  }, [threadState]);
  var lastActionRef = (0, _react.useRef)(null);
  var showInput = (_threadState$showInpu = threadState === null || threadState === void 0 ? void 0 : threadState.showInput) !== null && _threadState$showInpu !== void 0 ? _threadState$showInpu : true;
  var ThreadBanner = (0, _react.useCallback)(function () {
    if (!threadState || !bannerDisplay) {
      return null;
    }
    if (threadState.showResolvedBanner) {
      var loading = isLoading && lastActionRef.current === 'assignToMe';
      return /*#__PURE__*/_react["default"].createElement(AlertBanner, {
        title: t('resolvedBanner'),
        actions: !showInput ? /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          variant: "contained",
          color: "secondary",
          size: "medium",
          loading: loading,
          disabled: isLoading && !loading,
          onClick: function onClick() {
            lastActionRef.current = 'assignToMe';
            return onAction === null || onAction === void 0 ? void 0 : onAction('assignToMe');
          }
        }, t('reply')) : undefined
      });
    }
    if (threadState.showUnassignedBanner) {
      var _loading = isLoading && lastActionRef.current === 'assignThread';
      var assignToMeLoading = isLoading && lastActionRef.current === 'assignToMe';
      return /*#__PURE__*/_react["default"].createElement(AlertBanner, {
        severity: "info",
        title: t('unassignedBannerText'),
        actions: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          variant: "contained",
          color: "secondary",
          size: "medium",
          loading: assignToMeLoading,
          disabled: isLoading && !assignToMeLoading,
          onClick: function onClick() {
            lastActionRef.current = 'assignToMe';
            return onAction === null || onAction === void 0 ? void 0 : onAction('assignToMe');
          }
        }, t('reply')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          variant: "text",
          color: "secondary",
          size: "medium",
          loading: _loading,
          disabled: isLoading && !_loading,
          onClick: function onClick() {
            lastActionRef.current = 'assignThread';
            return onAction === null || onAction === void 0 ? void 0 : onAction('assignThread');
          }
        }, t('assign')))
      });
    }
    if (threadState.showAssignedToOtherBanner) {
      var _loading2 = isLoading && lastActionRef.current === 'assignToMe';
      return /*#__PURE__*/_react["default"].createElement(AlertBanner, {
        title: /*#__PURE__*/_react["default"].createElement(_components2.FormattedMessage, {
          message: t('assignedToOtherBanner'),
          values: {
            name: threadState.assigneeName || ''
          }
        }),
        actions: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          variant: "contained",
          color: "secondary",
          size: "medium",
          loading: _loading2,
          disabled: isLoading && !_loading2,
          onClick: function onClick() {
            lastActionRef.current = 'assignToMe';
            return onAction === null || onAction === void 0 ? void 0 : onAction('assignToMe');
          }
        }, t('assignToMeText')))
      });
    }
    return null;
  }, [threadState, bannerDisplay, isLoading, t, showInput, onAction]);
  var ThreadStatus = (0, _react.useCallback)(function () {
    var assigneeBadge = threadState === null || threadState === void 0 ? void 0 : threadState.assigneeBadge;
    if (!assigneeBadge) {
      return null;
    }
    var tooltipTitle = threadState === null || threadState === void 0 ? void 0 : threadState.assigneeBadgeTooltip;
    var tagElement = /*#__PURE__*/_react["default"].createElement(_springUi.Tag, _extends({}, assigneeBadge, {
      className: (0, _clsx["default"])('flex items-center justify-center rounded-full', assigneeBadge.className),
      variant: assigneeBadge.variant || 'filled',
      "data-sign": "thread-status"
    }));
    if (tooltipTitle) {
      return /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
        title: tooltipTitle
      }, tagElement);
    }
    return tagElement;
  }, [threadState]);
  var queueName = threadInfo === null || threadInfo === void 0 ? void 0 : (_threadInfo$owner = threadInfo.owner) === null || _threadInfo$owner === void 0 ? void 0 : _threadInfo$owner.name;
  return {
    bannerDisplay: bannerDisplay,
    ThreadBanner: ThreadBanner,
    ThreadStatus: ThreadStatus,
    showInput: showInput,
    queueName: queueName
  };
};
//# sourceMappingURL=useThreadInfoDisplay.js.map

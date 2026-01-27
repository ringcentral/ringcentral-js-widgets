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
exports.PresenceSetting = void 0;
require("core-js/modules/es.array.is-array.js");
var _Presence = require("@ringcentral-integration/commons/modules/Presence");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("./i18n");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var PresenceSetting = exports.PresenceSetting = function PresenceSetting(_ref) {
  var _ref$showPresenceSett = _ref.showPresenceSettings,
    showPresenceSettings = _ref$showPresenceSett === void 0 ? false : _ref$showPresenceSett,
    toggleAcceptCallQueueCalls = _ref.toggleAcceptCallQueueCalls,
    isCallQueueMember = _ref.isCallQueueMember,
    dndStatusProp = _ref.dndStatus,
    presenceStatus = _ref.presenceStatus,
    setAvailable = _ref.setAvailable,
    setBusy = _ref.setBusy,
    setDoNotDisturb = _ref.setDoNotDisturb,
    setInvisible = _ref.setInvisible,
    enableAcceptQueueCallsControl = _ref.enableAcceptQueueCallsControl,
    onCallQueueManagementClick = _ref.onCallQueueManagementClick;
  var _useState = (0, _react.useState)(showPresenceSettings),
    _useState2 = _slicedToArray(_useState, 2),
    showSelects = _useState2[0],
    setShowSelects = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    statusAnchor = _useState4[0],
    setStatusAnchor = _useState4[1];
  var iconRef = (0, _react.useRef)(null);
  var toggleShow = function toggleShow() {
    setShowSelects(function (prev) {
      return !prev;
    });
  };
  var onCallQueueChange = function onCallQueueChange() {
    toggleAcceptCallQueueCalls();
  };
  var acceptQueueCalls = isCallQueueMember ? /*#__PURE__*/_react["default"].createElement(_components.Line, {
    "data-sign": "acceptQueueSwitch",
    endAdornment: /*#__PURE__*/_react["default"].createElement(_springUi.Switch, {
      "data-sign": "switch",
      disabled: dndStatusProp === _Presence.dndStatus.doNotAcceptAnyCalls || !enableAcceptQueueCallsControl,
      checked: dndStatusProp === _Presence.dndStatus.takeAllCalls,
      onChange: onCallQueueChange
    })
  }, (0, _i18n.t)('acceptQueueCalls'), !enableAcceptQueueCallsControl ? /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
    color: "neutral",
    placement: "bottom",
    title: (0, _i18n.t)('callQueueDisabledReason')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    size: "small",
    symbol: _springIcon.InfoMd,
    "data-sign": "call-queue-info"
  })) : null) : null;

  // don't show the management if dnd or do not accept department calls
  var showCallQueueManagement = enableAcceptQueueCallsControl && onCallQueueManagementClick && dndStatusProp !== _Presence.dndStatus.doNotAcceptAnyCalls && dndStatusProp !== _Presence.dndStatus.doNotAcceptDepartmentCalls;
  var callQueueManagement = showCallQueueManagement ? /*#__PURE__*/_react["default"].createElement(_components.LinkLine, {
    "data-sign": "callQueueManagement",
    onClick: onCallQueueManagementClick
  }, (0, _i18n.t)('callQueueManagement')) : null;
  var currentStatus = (0, _components.usePresenceText)({
    presenceStatus: presenceStatus,
    dndStatus: dndStatusProp
  });
  var _usePresenceItems = (0, _components.usePresenceItems)({
      presenceStatus: presenceStatus,
      dndStatus: dndStatusProp,
      divider: false,
      onChange: function onChange(type) {
        switch (type) {
          case 'available':
            setAvailable();
            break;
          case 'busy':
            setBusy();
            break;
          case 'DND':
            setDoNotDisturb();
            break;
          case 'offline':
            setInvisible();
            break;
          default:
            break;
        }
        setStatusAnchor(null);
        setShowSelects(false);
      }
    }),
    presenceElements = _usePresenceItems.elements,
    selectedItem = _usePresenceItems.selectedItem;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.Line, {
    "data-sign": "statusToggleShow",
    classes: {
      endAdornment: 'max-w-max'
    },
    endAdornment: /*#__PURE__*/_react["default"].createElement("span", {
      className: "flex gap-2 items-center"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.StatusIndicator, {
      size: "medium",
      variant: selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.variant
    }), /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "status",
      className: "typography-mainText text-nowrap"
    }, currentStatus), /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      "data-sign": "dropdownIcon",
      ref: iconRef,
      symbol: showSelects ? _springIcon.CaretUpMd : _springIcon.CaretDownMd
    })),
    onClick: function onClick() {
      setStatusAnchor(showSelects ? null : iconRef.current);
      toggleShow();
    },
    className: "cursor-pointer gap-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "label",
    className: "text-neutral-b1 truncate"
  }, (0, _i18n.t)('status'))), /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
    open: Boolean(statusAnchor),
    anchorEl: statusAnchor,
    onClose: function onClose() {
      setStatusAnchor(null);
      setShowSelects(false);
    }
  }, presenceElements), acceptQueueCalls, callQueueManagement);
};
//# sourceMappingURL=PresenceSetting.js.map

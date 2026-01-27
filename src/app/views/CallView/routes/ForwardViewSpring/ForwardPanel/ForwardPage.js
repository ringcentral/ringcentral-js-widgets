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
exports.ForwardPage = void 0;
require("core-js/modules/es.array.is-array.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components = require("@ringcentral-integration/next-widgets/components");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ForwardPage = exports.ForwardPage = function ForwardPage(props) {
  var _props$onAction = props.onAction,
    onAction = _props$onAction === void 0 ? _rxjs.noop : _props$onAction,
    _props$callVolume = props.callVolume,
    callVolume = _props$callVolume === void 0 ? 1 : _props$callVolume,
    _props$outputDeviceId = props.outputDeviceId,
    outputDeviceId = _props$outputDeviceId === void 0 ? '' : _props$outputDeviceId,
    toNumberProp = props.toNumber,
    onToNumberChange = props.onToNumberChange,
    recipientsProp = props.recipients,
    onRecipientsChange = props.onRecipientsChange,
    ToContactSearch = props.ContactSearch,
    actionButtonDisabled = props.actionButtonDisabled;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(toNumberProp, onToNumberChange),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    toNumber = _useAsyncState2[0],
    setToNumber = _useAsyncState2[1];
  var _useAsyncState3 = (0, _reactHooks.useAsyncState)(recipientsProp, onRecipientsChange),
    _useAsyncState4 = _slicedToArray(_useAsyncState3, 2),
    recipients = _useAsyncState4[0],
    setRecipients = _useAsyncState4[1];
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    contactSearchExpanded = _useState2[0],
    setContactSearchExpanded = _useState2[1];
  var clearRecipient = function clearRecipient() {
    setRecipients([]);
    setToNumber('');
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.PageHeader, {
    onBackClick: function onBackClick() {
      return onAction('activeCall');
    },
    "data-sign": "forwardPageHeader"
  }, t('forwardTitle')), /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "forwardPage",
    className: "flex flex-col items-center gap-8 pt-8 flex-auto"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Dialer, null, /*#__PURE__*/_react["default"].createElement(ToContactSearch, {
    defaultTab: "company",
    open: contactSearchExpanded,
    componentType: "DialTextField",
    inputValue: toNumber,
    recipient: recipients[0],
    onInputValueChange: onToNumberChange,
    onSelect: setRecipients,
    onRemove: clearRecipient,
    onExpanded: setContactSearchExpanded
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(contactSearchExpanded && 'hidden')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.DialPad, {
    "data-sign": "dialPad",
    volume: callVolume,
    sounds: _springUi.DialerPadSoundsMPEG,
    size: "medium",
    sinkId: outputDeviceId,
    className: "gap-y-2"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(contactSearchExpanded && 'hidden')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    TooltipProps: {
      title: t('forward')
    },
    symbol: _springIcon.ForwardMd,
    color: "success",
    variant: "contained",
    size: "xxxlarge",
    iconSize: "large",
    "data-sign": "forwardButton",
    disabled: actionButtonDisabled,
    onClick: function onClick() {
      onAction('startForward');
    }
  })))));
};
//# sourceMappingURL=ForwardPage.js.map

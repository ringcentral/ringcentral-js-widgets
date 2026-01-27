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
exports.AddCallPanel = void 0;
require("core-js/modules/es.array.is-array.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _PageHeader = require("@ringcentral-integration/next-widgets/deprecated/components/PageHeader");
var _CommunicationSetupPanel = require("@ringcentral-integration/widgets/components/CommunicationSetupPanel");
var _ContactSearchPanelEnum = require("@ringcentral-integration/widgets/components/ContactSearchPanel/ContactSearchPanelEnum");
var _RcDialerPadSoundsMPEG = _interopRequireDefault(require("@ringcentral/juno/es6/components/Dialer/DialPad/assets/RcDialerPadSoundsMPEG.json"));
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _Phone = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Phone.js"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
var _StyledAddCallPanelPanel = require("./StyledAddCallPanelPanel");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var AddCallPanel = exports.AddCallPanel = function AddCallPanel(props) {
  var onBack = props.onBack,
    autoFocus = props.autoFocus,
    children = props.children,
    _props$callVolume = props.callVolume,
    callVolume = _props$callVolume === void 0 ? 1 : _props$callVolume,
    _props$outputDeviceId = props.outputDeviceId,
    outputDeviceId = _props$outputDeviceId === void 0 ? '' : _props$outputDeviceId,
    controlBusy = props.controlBusy,
    ContactSearch = props.ContactSearch,
    onAddCall = props.onAddCall,
    currentLocale = props.currentLocale,
    hasCalls = props.hasCalls,
    triggerEventTracking = props.triggerEventTracking;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    toNumber = _useState2[0],
    setToNumber = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    recipients = _useState4[0],
    setRecipients = _useState4[1];
  var onToNumberChange = function onToNumberChange(toNumber) {
    setToNumber(toNumber);
  };
  var setRecipient = function setRecipient() {
    for (var _len = arguments.length, recipient = new Array(_len), _key = 0; _key < _len; _key++) {
      recipient[_key] = arguments[_key];
    }
    setRecipients(recipient);
    setToNumber('');
    onAddCall({
      recipient: recipient[0]
    });
  };
  var clearRecipient = function clearRecipient() {
    setRecipients([]);
    setToNumber('');
  };
  var onAddCallHandler = function onAddCallHandler() {
    onAddCall({
      phoneNumber: toNumber
    });
  };
  var noValue = toNumber === '' && recipients.length === 0;
  (0, _react.useEffect)(function () {
    if (!hasCalls) {
      onBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCalls]);
  return /*#__PURE__*/_react["default"].createElement(_StyledAddCallPanelPanel.AddCallPage, {
    "data-sign": "addCallPage"
  }, children, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
    onClick: onBack
  }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, t('addCall')), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement(_StyledAddCallPanelPanel.CommunicationSetupPanelWrap, null, /*#__PURE__*/_react["default"].createElement(_CommunicationSetupPanel.CommunicationSetupPanel, {
    triggerEventTracking: triggerEventTracking,
    ContactSearch: ContactSearch
    // To field
    ,
    recipients: recipients,
    toNumber: toNumber,
    onToNumberChange: onToNumberChange,
    setRecipient: setRecipient,
    clearRecipient: clearRecipient
    // eslint-disable-next-line jsx-a11y/no-autofocus
    ,
    autoFocus: autoFocus,
    showFromField: false,
    defaultTab: _ContactSearchPanelEnum.TabsEnum.thirdParty
    // Common
    ,
    currentLocale: currentLocale,
    directlyProceedType: "dial"
  }, /*#__PURE__*/_react["default"].createElement(_StyledAddCallPanelPanel.DialerWrapper, null, /*#__PURE__*/_react["default"].createElement(_StyledAddCallPanelPanel.StyledRcDialPad, {
    "data-sign": "dialPad",
    onChange: function onChange(value) {
      onToNumberChange(toNumber + value);
    },
    sounds: _RcDialerPadSoundsMPEG["default"],
    getDialPadButtonProps: function getDialPadButtonProps(v) {
      return {
        'data-test-id': "".concat(v),
        'data-sign': "dialPadBtn".concat(v)
      };
    },
    volume: callVolume,
    sinkId: outputDeviceId
  })), /*#__PURE__*/_react["default"].createElement(_StyledAddCallPanelPanel.BodyBottom, null, /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    "data-sign": "callButton",
    color: "success.b03",
    symbol: _Phone["default"],
    size: "large",
    variant: "contained",
    elevation: "0",
    activeElevation: "0",
    onClick: onAddCallHandler,
    disabled: controlBusy || noValue
  })))));
};
//# sourceMappingURL=AddCallPanel.js.map

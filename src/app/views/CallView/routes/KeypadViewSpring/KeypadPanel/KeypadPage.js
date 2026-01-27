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
exports.KeypadPage = void 0;
require("core-js/modules/es.array.is-array.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _KeypadOffSp = _interopRequireDefault(require("@ringcentral/juno-icon/es6/KeypadOffSp.js"));
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _CallControlPanel = require("../../CallControlViewSpring/CallControlPanel");
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var KeypadPage = exports.KeypadPage = function KeypadPage(props) {
  var call = props.call,
    _props$onAction = props.onAction,
    onAction = _props$onAction === void 0 ? _rxjs.noop : _props$onAction,
    _props$callVolume = props.callVolume,
    callVolume = _props$callVolume === void 0 ? 1 : _props$callVolume,
    _props$outputDeviceId = props.outputDeviceId,
    outputDeviceId = _props$outputDeviceId === void 0 ? '' : _props$outputDeviceId,
    toNumberProp = props.toNumber,
    onToNumberChange = props.onToNumberChange,
    actionButtonDisabled = props.actionButtonDisabled,
    expanded = props.expanded,
    onExpand = props.onExpand;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(toNumberProp, onToNumberChange),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    toNumber = _useAsyncState2[0],
    setToNumber = _useAsyncState2[1];
  var inputRef = (0, _react.useRef)(null);
  (0, _reactHooks.usePageAutoFocus)(inputRef);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var render = (0, _CallControlPanel.useCallControlLayout)(call, {
    main: /*#__PURE__*/_react["default"].createElement(_springUi.Dialer, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex justify-center items-center mb-6 -mt-6"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.DialTextField, {
      inputRef: inputRef,
      variant: "quiet",
      keypadMode: true,
      fullWidth: true,
      value: toNumber,
      onChange: setToNumber,
      inputProps: {
        'data-sign': 'dialpad-input'
      },
      onEmit: function onEmit(newValue) {
        onAction('sendDTMF', newValue);
      },
      className: "max-w-[250px]"
    })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_springUi.DialPad, {
      "data-sign": "dialPad",
      volume: callVolume,
      sounds: _springUi.DialerPadSoundsMPEG,
      size: "medium",
      sinkId: outputDeviceId,
      className: "gap-y-2"
    }))),
    footer: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.CallButton, {
      className: "-mt-3",
      "data-sign": "sendDTMF",
      variant: "end",
      size: "medium",
      disabled: actionButtonDisabled,
      onClick: function onClick() {
        return onAction('hangUp');
      }
    }), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      className: "absolute flex-col translate-x-[80px] -translate-y-1",
      "data-sign": "hideKeypad",
      shape: "squircle",
      color: "secondary",
      TooltipProps: {
        title: t('hideKeypad')
      }
      // TODO: wait spring version icon
      ,
      symbol: _KeypadOffSp["default"],
      onClick: function onClick() {
        return onAction('activeCall');
      }
    })),
    onBack: function onBack() {
      onAction('back');
    },
    onConferenceClick: function onConferenceClick() {
      onAction('viewConferenceList');
    },
    expanded: expanded,
    onExpand: onExpand
  });
  return render;
};
//# sourceMappingURL=KeypadPage.js.map

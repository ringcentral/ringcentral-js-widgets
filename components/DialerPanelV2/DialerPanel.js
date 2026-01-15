"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPanel = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _commonStyles = require("../../lib/commonStyles");
var _CommunicationSetupPanel = require("../CommunicationSetupPanel");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
// copy from import type { ContactSearchEntity } from '@ringcentral-integration/micro-contacts/src/app/services'; widget should not import from next arch

var DialerPanelContainer = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  box-sizing: border-box;\n  background: ", ";\n"])), _commonStyles.fullSizeStyle, (0, _juno.palette2)('neutral', 'f01'));
var BodyBottom = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", ";\n  margin-bottom: ", ";\n"])), _juno.flexCenterStyle, (0, _juno.spacing)(7));
var StyledRcDialPad = (0, _juno.styled)(_juno.RcDialPad)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  [sf-classic] & {\n    height: 90%;\n  }\n"])));
var FlexWrapper = _juno.styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  ", ";\n  display: flex;\n  flex-direction: column;\n"])), _commonStyles.fullSizeStyle);

// TODO: check withTabs
var DialerWrapper = _juno.styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  margin: ", ";\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  [sf-classic] & {\n    height: 70%;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n"])), function (_ref) {
  var withTabs = _ref.withTabs;
  return withTabs ? (0, _juno.spacing)(0, 11) : (0, _juno.spacing)(2, 11);
});
var DialerPanel = exports.DialerPanel = function DialerPanel(props) {
  var currentLocale = props.currentLocale,
    onToNumberChange = props.onToNumberChange,
    toNumber = props.toNumber,
    fromNumber = props.fromNumber,
    fromNumbers = props.fromNumbers,
    changeFromNumber = props.changeFromNumber,
    formatPhone = props.formatPhone,
    isWebphoneMode = props.isWebphoneMode,
    showSpinner = props.showSpinner,
    recipients = props.recipients,
    setRecipient = props.setRecipient,
    clearRecipient = props.clearRecipient,
    autoFocus = props.autoFocus,
    _props$showFromField = props.showFromField,
    showFromField = _props$showFromField === void 0 ? true : _props$showFromField,
    _props$disableFromFie = props.disableFromField,
    disableFromField = _props$disableFromFie === void 0 ? false : _props$disableFromFie,
    children = props.children,
    showAnonymous = props.showAnonymous,
    callVolume = props.callVolume,
    outputDeviceId = props.outputDeviceId,
    onCallButtonClick = props.onCallButtonClick,
    callButtonDisabled = props.callButtonDisabled,
    withTabs = props.withTabs,
    ContactSearch = props.ContactSearch,
    triggerEventTracking = props.triggerEventTracking;

  // TODO: when have tag should check if need disable dial button
  // const hasTags = recipients.length > 0;
  var handleSelect = (0, _react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return setRecipient.apply(void 0, _args);
        case 1:
          onCallButtonClick();
        case 2:
          return _context.a(2);
      }
    }, _callee);
  })), [setRecipient, onCallButtonClick]);
  return /*#__PURE__*/_react["default"].createElement(DialerPanelContainer, null, /*#__PURE__*/_react["default"].createElement(_CommunicationSetupPanel.CommunicationSetupPanel, {
    ContactSearch: ContactSearch,
    triggerEventTracking: triggerEventTracking
    // To field
    ,
    recipients: recipients
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    ,
    toNumber: toNumber
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    onToNumberChange: onToNumberChange,
    setRecipient: handleSelect,
    clearRecipient: clearRecipient,
    autoFocus: autoFocus
    // From field
    ,
    showAnonymous: showAnonymous,
    fromNumber: fromNumber,
    fromNumbers: fromNumbers,
    changeFromNumber: changeFromNumber,
    formatPhone: formatPhone,
    showFromField: showFromField && isWebphoneMode,
    disableFromField: disableFromField
    // Common
    ,
    currentLocale: currentLocale
  }, /*#__PURE__*/_react["default"].createElement(FlexWrapper, null, /*#__PURE__*/_react["default"].createElement(DialerWrapper, {
    withTabs: withTabs
  }, /*#__PURE__*/_react["default"].createElement(StyledRcDialPad, {
    "data-sign": "dialPad",
    onChange: function onChange(value) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onToNumberChange(toNumber + value, true);
    },
    sounds: _juno.RcDialerPadSoundsMPEG,
    getDialPadButtonProps: function getDialPadButtonProps(v) {
      return {
        'data-test-id': "".concat(v),
        'data-sign': "dialPadBtn".concat(v)
      };
    },
    volume: callVolume,
    sinkId: outputDeviceId
  })), /*#__PURE__*/_react["default"].createElement(BodyBottom, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "callButton",
    color: "success.b03",
    symbol: _junoIcon.Phone,
    size: withTabs ? 'medium' : 'large',
    variant: "contained",
    elevation: "0",
    activeElevation: "0",
    onClick: function onClick() {
      return onCallButtonClick({
        clickDialerToCall: true
      });
    },
    disabled: callButtonDisabled
  })), showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, children)));
};
var Empty = function Empty() {
  return null;
};
DialerPanel.defaultProps = {
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: Empty,
  onToNumberChange: Empty,
  formatPhone: function formatPhone(phoneNumber) {
    return phoneNumber;
  },
  showSpinner: false,
  callVolume: 1,
  outputDeviceId: '',
  recipients: [],
  autoFocus: false,
  showFromField: true,
  disableFromField: false,
  withTabs: false,
  inConference: false,
  isLastInputFromDialpad: false,
  showAnonymous: true
};
//# sourceMappingURL=DialerPanel.js.map

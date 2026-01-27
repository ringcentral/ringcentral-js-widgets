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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyIconButton = void 0;
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _useRefState3 = require("@ringcentral/juno/es6/foundation/hooks/useRefState/useRefState.js");
var _useSleep2 = require("@ringcentral/juno/es6/foundation/hooks/useSleep/useSleep.js");
var _Check = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Check.js"));
var _Copy = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Copy.js"));
var _react = _interopRequireWildcard(require("react"));
var _reactUse = require("react-use");
var _hooks = require("../../hooks");
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["text", "getText", "onCopied", "disappearTime"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var preventFocus = function preventFocus(e) {
  return e.preventDefault();
};
var CopyIconButton = exports.CopyIconButton = function CopyIconButton(_ref) {
  var text = _ref.text,
    getText = _ref.getText,
    onCopied = _ref.onCopied,
    _ref$disappearTime = _ref.disappearTime,
    disappearTime = _ref$disappearTime === void 0 ? 3000 : _ref$disappearTime,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useCopyToClipboard = (0, _reactUse.useCopyToClipboard)(),
    _useCopyToClipboard2 = _slicedToArray(_useCopyToClipboard, 2),
    copy = _useCopyToClipboard2[1];
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useRefState = (0, _useRefState3.useRefState)(false),
    _useRefState2 = _slicedToArray(_useRefState, 2),
    copiedRef = _useRefState2[0],
    setCopied = _useRefState2[1];
  var _useSleep = (0, _useSleep2.useSleep)(),
    sleep = _useSleep.sleep;
  var copied = copiedRef.current;
  (0, _react.useEffect)(function () {
    if (!copied) return;
    sleep(disappearTime).then(function () {
      setCopied(false, true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copied]);
  return copied ? /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, _extends({
    variant: "plain",
    disableRipple: true,
    title: t('copied'),
    color: "success.f02",
    onMouseDown: preventFocus,
    size: "small",
    TooltipProps: {
      placement: 'top'
    },
    symbol: _Check["default"]
  }, rest)) : /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, _extends({
    variant: "plain",
    title: t('copy'),
    size: "small",
    onMouseDown: preventFocus,
    symbol: _Copy["default"],
    onClick: function onClick() {
      setCopied(true, false);
      var copyText = text || (getText === null || getText === void 0 ? void 0 : getText());
      if (process.env.NODE_ENV !== 'production' && !copyText) {
        console.warn('[CopyIconButton] cannot get correct text, make sure you have set `text` or `getText` prop');
        return;
      }
      var copiedText = copyText || '';
      copy(copiedText);
      onCopied === null || onCopied === void 0 ? void 0 : onCopied(copiedText);
    }
  }, rest));
};
//# sourceMappingURL=CopyIconButton.js.map

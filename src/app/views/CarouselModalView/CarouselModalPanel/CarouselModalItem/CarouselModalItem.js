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
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
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
exports.CarouselModalItem = void 0;
var _nextCore = require("@ringcentral-integration/next-core");
var _Backdrop = require("@ringcentral/juno/es6/components/Backdrop/Backdrop.js");
var _CircularProgress = require("@ringcentral/juno/es6/components/Progress/CircularProgress/CircularProgress.js");
var _Portal = require("@ringcentral/juno/es6/components/Portal/Portal.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _zIndex = require("@ringcentral/juno/es6/foundation/styles/zIndex.js");
var _react = _interopRequireWildcard(require("react"));
var _styles = require("./styles");
var _excluded = ["url", "title", "show", "size", "showLoading", "LoadingBackdropProps", "LoadingSpinnerProps", "getContainerSize", "onLoadFail"];
var _templateObject, _templateObject2;
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
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var TopRcBackdrop = (0, _styledComponents["default"])(_Backdrop.RcBackdrop)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  z-index: ", ";\n"])), (0, _zIndex.zIndex)('modal'));
var _CarouselModalItem = function _CarouselModalItem(props) {
  var url = props.url,
    title = props.title,
    show = props.show,
    forceSize = props.size,
    _props$showLoading = props.showLoading,
    showLoading = _props$showLoading === void 0 ? false : _props$showLoading,
    LoadingBackdropProps = props.LoadingBackdropProps,
    LoadingSpinnerProps = props.LoadingSpinnerProps,
    getContainerSize = props.getContainerSize,
    onLoadFail = props.onLoadFail,
    rest = _objectWithoutProperties(props, _excluded);
  var _useState = (0, _react.useState)(forceSize || {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }),
    _useState2 = _slicedToArray(_useState, 2),
    size = _useState2[0],
    setSize = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var handleLoad = function handleLoad(e) {
    if (forceSize) {
      setLoading(false);
      return;
    }
    var iframe = e.target;
    var size = getContainerSize(iframe.contentDocument);
    if (!size) {
      _nextCore.logger.warn('[CarouselModalItem]', 'getContainerSize not found size');
      onLoadFail === null || onLoadFail === void 0 ? void 0 : onLoadFail(e);
      return;
    }
    setSize(size);
    setLoading(false);
  };
  var handleError = function handleError(e) {
    onLoadFail === null || onLoadFail === void 0 ? void 0 : onLoadFail(e);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showLoading && show ? /*#__PURE__*/_react["default"].createElement(_Portal.RcPortal, null, /*#__PURE__*/_react["default"].createElement(TopRcBackdrop, _extends({}, LoadingBackdropProps, {
    open: loading
  }), /*#__PURE__*/_react["default"].createElement(_CircularProgress.RcCircularProgress, _extends({
    size: 32
  }, LoadingSpinnerProps)))) : null, show && /*#__PURE__*/_react["default"].createElement(_styles.CarouselModalDialogGlobalStyle, _extends({}, size, {
    loading: loading
  })), /*#__PURE__*/_react["default"].createElement("div", _extends({
    key: url
  }, rest), /*#__PURE__*/_react["default"].createElement("iframe", {
    key: url,
    tabIndex: -1,
    onLoad: handleLoad,
    onError: handleError,
    width: size.width,
    height: size.height,
    src: url,
    title: title
  })));
};
var CarouselModalItem = exports.CarouselModalItem = (0, _styledComponents["default"])(_CarouselModalItem)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", ";\n\n  iframe {\n    display: block;\n    line-height: 0;\n    border-radius: ", ";\n  }\n"])), function (_ref) {
  var show = _ref.show;
  return !show && _styles.outOfViewStyle;
}, (0, _spacing.spacing)(3));
//# sourceMappingURL=CarouselModalItem.js.map

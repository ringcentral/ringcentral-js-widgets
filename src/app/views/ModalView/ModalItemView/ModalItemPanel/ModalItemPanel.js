"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalItemPanel = exports.DrawerWithNextOpen = void 0;
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _Dialog = require("@ringcentral/juno/es6/components/Dialog/Dialog.js");
var _DialogContent = require("@ringcentral/juno/es6/components/Dialog/DialogContent/DialogContent.js");
var _Drawer = require("@ringcentral/juno/es6/components/Drawer/Drawer.js");
var _Loading = require("@ringcentral/juno/es6/components/Loading/Loading.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _useEventCallback = require("@ringcentral/juno/es6/foundation/hooks/useEventCallback/useEventCallback.js");
var _react = _interopRequireWildcard(require("react"));
var _styles = require("../../../../../styles");
var _hooks = require("../../../../hooks");
var _components = require("../../components");
var _contexts = require("../contexts");
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["open", "children"],
  _excluded2 = ["type", "childrenSize", "footer", "loadingOverlay", "loading", "confirmButtonText", "confirmButtonProps", "onConfirm", "cancelButtonText", "cancelButtonProps", "onCancel", "TitleProps", "ContentProps", "variant", "disableBackdropClick", "ActionsProps", "children", "onClose", "autoDisableBackdropClick", "open", "header"],
  _excluded3 = ["loadingMode", "payload", "footerText", "headerText"],
  _excluded4 = ["loadingMode", "payload", "footerText", "headerText"],
  _excluded5 = ["fullScreen"];
var _templateObject, _templateObject2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var Dialog = (0, _styledComponents["default"])(_Dialog.RcDialog)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n\n  ", " {\n    color: ", ";\n  }\n"])), (0, _styles.highContrastBorderStyle)('top'), _DialogContent.RcDialogContent, (0, _newPalette.palette2)('neutral', 'f06'));
var Drawer = (0, _styledComponents["default"])(_Drawer.RcDrawer)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", ";\n\n  ", " {\n    color: ", ";\n  }\n"])), (0, _styles.highContrastBorderStyle)('top'), _DialogContent.RcDialogContent, (0, _newPalette.palette2)('neutral', 'f06'));

/**
 * drawer will need the open change state, if init be open directly that will miss the animation
 */
var DrawerWithNextOpen = exports.DrawerWithNextOpen = function DrawerWithNextOpen(_ref) {
  var open = _ref.open,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    drawerOpen = _useState2[0],
    setDrawerOpen = _useState2[1];
  (0, _react.useLayoutEffect)(function () {
    setDrawerOpen(open || false);
  }, [open]);
  return /*#__PURE__*/_react["default"].createElement(Drawer, _extends({
    open: drawerOpen
  }, rest), children);
};
var ModalItemPanel = exports.ModalItemPanel = /*#__PURE__*/(0, _react.memo)(function (props) {
  var type = props.type,
    childrenSize = props.childrenSize,
    footerProp = props.footer,
    loadingOverlay = props.loadingOverlay,
    loading = props.loading,
    confirmButtonTextProp = props.confirmButtonText,
    confirmButtonProps = props.confirmButtonProps,
    onConfirm = props.onConfirm,
    cancelButtonTextProp = props.cancelButtonText,
    cancelButtonProps = props.cancelButtonProps,
    onCancel = props.onCancel,
    TitleProps = props.TitleProps,
    ContentProps = props.ContentProps,
    variant = props.variant,
    disableBackdropClickProp = props.disableBackdropClick,
    ActionsProps = props.ActionsProps,
    children = props.children,
    onClose = props.onClose,
    autoDisableBackdropClick = props.autoDisableBackdropClick,
    open = props.open,
    header = props.header,
    rest = _objectWithoutProperties(props, _excluded2);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var isBlockClose = autoDisableBackdropClick && (loading || loadingOverlay) || disableBackdropClickProp;
  var isLoading = loading || loadingOverlay || isBlockClose;
  var disableBackdropClick = disableBackdropClickProp || isLoading;
  var handleClose = (0, _useEventCallback.useEventCallback)(function (e, reason) {
    if (!open) return;
    if (reason === 'backdropClick' && disableBackdropClick) return;
    onClose === null || onClose === void 0 ? void 0 : onClose(e, reason);
    onCancel === null || onCancel === void 0 ? void 0 : onCancel(e, reason);
  });
  var _useMemo = (0, _react.useMemo)(function () {
      var _confirmButtonText, _confirmButtonText2, _cancelButtonText;
      var confirmButtonText = confirmButtonTextProp;
      var cancelButtonText = cancelButtonTextProp;
      switch (variant) {
        case 'alert':
          confirmButtonText = (_confirmButtonText = confirmButtonText) !== null && _confirmButtonText !== void 0 ? _confirmButtonText : t('ok');
          break;
        case 'confirm':
          confirmButtonText = (_confirmButtonText2 = confirmButtonText) !== null && _confirmButtonText2 !== void 0 ? _confirmButtonText2 : t('ok');
          cancelButtonText = (_cancelButtonText = cancelButtonText) !== null && _cancelButtonText !== void 0 ? _cancelButtonText : t('cancel');
          break;
        default:
          break;
      }
      return {
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
      };
    }, [confirmButtonTextProp, cancelButtonTextProp, variant, t]),
    confirmButtonText = _useMemo.confirmButtonText,
    cancelButtonText = _useMemo.cancelButtonText;
  var showDefaultFooter = cancelButtonText || confirmButtonText;
  var footer = showDefaultFooter ? /*#__PURE__*/_react["default"].createElement(_components.DefaultActionsFooter, null) : footerProp;
  var loadingMode = props.loadingMode,
    payload = props.payload,
    footerText = props.footerText,
    headerText = props.headerText,
    restProps = _objectWithoutProperties(props, _excluded3);
  var contextProps = {
    modalMode: true,
    props: _objectSpread(_objectSpread({
      disableEscapeKeyDown: isLoading,
      disableBackdropClick: disableBackdropClick
    }, restProps), {}, {
      loadingMode: loadingMode,
      payload: payload,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      footer: footerText,
      header: headerText,
      // as any for we change onEvent callback reason value os must to do that.
      onClose: handleClose,
      onCancel: onCancel
    }),
    action: {
      close: function close(reason) {
        onClose === null || onClose === void 0 ? void 0 : onClose({}, reason);
      },
      cancel: function cancel(reason) {
        onCancel === null || onCancel === void 0 ? void 0 : onCancel({}, reason);
      },
      confirm: function confirm(data) {
        onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm(data);
      }
    }
  };
  var loadingMode2 = rest.loadingMode,
    payload2 = rest.payload,
    footerText2 = rest.footerText,
    headerText2 = rest.headerText,
    restApplyProps = _objectWithoutProperties(rest, _excluded4);
  var render = /*#__PURE__*/_react["default"].createElement(_Loading.RcLoading, {
    loading: loadingOverlay
  }, header, /*#__PURE__*/_react["default"].createElement(_DialogContent.RcDialogContent, ContentProps, children), footer);
  var fullScreen = restApplyProps.fullScreen,
    restApplyDrawerProps = _objectWithoutProperties(restApplyProps, _excluded5);
  return /*#__PURE__*/_react["default"].createElement(_contexts.ModalItemViewContext.Provider, {
    value: contextProps
  }, type === 'drawer' ? /*#__PURE__*/_react["default"].createElement(DrawerWithNextOpen, _extends({
    disableEscapeKeyDown: isLoading,
    onClose: handleClose,
    anchor: "bottom",
    open: open,
    PaperProps: {
      role: 'dialog'
    }
  }, restApplyDrawerProps), render) : /*#__PURE__*/_react["default"].createElement(Dialog, _extends({
    childrenSize: childrenSize,
    disableEscapeKeyDown: isLoading,
    onClose: handleClose,
    open: open
  }, restApplyProps), render));
});
//# sourceMappingURL=ModalItemPanel.js.map

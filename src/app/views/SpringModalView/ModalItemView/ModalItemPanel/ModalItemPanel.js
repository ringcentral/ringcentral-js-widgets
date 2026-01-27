"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalItemPanel = void 0;
var _components = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../../../hooks");
var _i18n = _interopRequireDefault(require("../../../ModalView/ModalItemView/ModalItemPanel/i18n"));
var _contexts = require("../../../ModalView/ModalItemView/contexts");
var _components2 = require("../../components");
var _excluded = ["type", "childrenSize", "footer", "loadingOverlay", "loading", "confirmButtonText", "confirmButtonProps", "onConfirm", "cancelButtonText", "cancelButtonProps", "onCancel", "TitleProps", "variant", "disableBackdropClick", "ActionsProps", "className", "children", "onClose", "autoDisableBackdropClick", "open", "header", "isCompact"],
  _excluded2 = ["loadingMode", "payload", "footerText", "headerText"],
  _excluded3 = ["loadingMode", "payload", "footerText", "headerText", "container", "classes", "fullScreen", "disableRestoreFocus"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
    variant = props.variant,
    disableBackdropClickProp = props.disableBackdropClick,
    ActionsProps = props.ActionsProps,
    className = props.className,
    children = props.children,
    onClose = props.onClose,
    autoDisableBackdropClick = props.autoDisableBackdropClick,
    open = props.open,
    header = props.header,
    _props$isCompact = props.isCompact,
    isCompact = _props$isCompact === void 0 ? false : _props$isCompact,
    rest = _objectWithoutProperties(props, _excluded);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var isBlockClose = autoDisableBackdropClick && (loading || loadingOverlay) || disableBackdropClickProp;
  var isLoading = loading || loadingOverlay || isBlockClose;
  var disableBackdropClick = disableBackdropClickProp || isLoading;
  var handleClose = (0, _springUi.useEventCallback)(function (e, reason) {
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
  var footer = showDefaultFooter ? /*#__PURE__*/_react["default"].createElement(_components2.DefaultActionsFooter, null) : footerProp;
  var loadingMode = props.loadingMode,
    payload = props.payload,
    footerText = props.footerText,
    headerText = props.headerText,
    restProps = _objectWithoutProperties(props, _excluded2);
  var contextProps = {
    modalMode: true,
    props: _objectSpread(_objectSpread({
      disableEscapeKeyDown: isLoading,
      disableBackdropClick: disableBackdropClick
    }, restProps), {}, {
      ActionsProps: _objectSpread({
        className: isCompact ? "pr-0 ".concat(ActionsProps === null || ActionsProps === void 0 ? void 0 : ActionsProps.className) : ActionsProps === null || ActionsProps === void 0 ? void 0 : ActionsProps.className
      }, ActionsProps),
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
    container = rest.container,
    classes = rest.classes,
    fullScreen = rest.fullScreen,
    disableRestoreFocus = rest.disableRestoreFocus,
    restApplyProps = _objectWithoutProperties(rest, _excluded3);
  var render = /*#__PURE__*/_react["default"].createElement(_components.SpringSpinnerOverlay, {
    loading: loadingOverlay
  }, header, children, footer);
  return /*#__PURE__*/_react["default"].createElement(_contexts.ModalItemViewContext.Provider, {
    value: contextProps
  }, type === 'drawer' ? /*#__PURE__*/_react["default"].createElement(_components.Drawer, {
    open: open,
    onClose: handleClose,
    "data-sign": restApplyProps['data-sign'],
    bodyProps: {
      'aria-label': rest['aria-label']
    },
    disableEscapeKeyDown: isLoading,
    disableRestoreFocus: disableRestoreFocus,
    backdropProps: restApplyProps['BackdropProps']
  }, render) : /*#__PURE__*/_react["default"].createElement(_springUi.Dialog, {
    onClose: handleClose,
    open: open,
    "data-sign": restApplyProps['data-sign'],
    bodyProps: {
      'aria-label': rest['aria-label']
    },
    disableEscapeKeyDown: isLoading,
    disableRestoreFocus: disableRestoreFocus,
    backdropProps: restApplyProps['BackdropProps'],
    classes: {
      body: (0, _clsx["default"])('overflow-hidden', fullScreen && 'h-full w-full transform-none top-0 left-0 max-h-full max-w-full py-0 rounded-none', isCompact && 'left-3 right-3 w-[276px] max-w-none p-3', classes === null || classes === void 0 ? void 0 : classes.root),
      root: className
    }
  }, render));
});
//# sourceMappingURL=ModalItemPanel.js.map

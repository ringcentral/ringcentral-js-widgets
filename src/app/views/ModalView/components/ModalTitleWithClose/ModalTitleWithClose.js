"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalTitleWithClose = void 0;
var _DialogTitle = require("@ringcentral/juno/es6/components/Dialog/DialogTitle/DialogTitle.js");
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _Text = require("@ringcentral/juno/es6/components/Text/Text.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _Close = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Close.js"));
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../../../hooks");
var _i18n = _interopRequireDefault(require("../../ModalItemView/ModalItemPanel/i18n"));
var _contexts = require("../../ModalItemView/contexts");
var _styles = require("./styles");
var _excluded = ["children"];
var _templateObject, _templateObject2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var Title = (0, _styledComponents["default"])(_Text.RcText)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-right: ", ";\n"])), (0, _spacing.spacing)(3));
var _ModalTitleWithClose = /*#__PURE__*/(0, _react.forwardRef)(function (sourceProps, ref) {
  var children = sourceProps.children,
    rest = _objectWithoutProperties(sourceProps, _excluded);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useModalItemView = (0, _contexts.useModalItemView)(),
    props = _useModalItemView.props,
    action = _useModalItemView.action;
  var onClose = props.onClose,
    TitleProps = props.TitleProps;
  var _ref = TitleProps || {},
    _ref$disableTypograph = _ref.disableTypography,
    disableTypography = _ref$disableTypograph === void 0 ? true : _ref$disableTypograph,
    _ref$display = _ref.display,
    display = _ref$display === void 0 ? 'flex' : _ref$display,
    _ref$space = _ref.space,
    space = _ref$space === void 0 ? [0, 6] : _ref$space;
  return /*#__PURE__*/_react["default"].createElement(_DialogTitle.RcDialogTitle, _extends({}, TitleProps, {
    disableTypography: disableTypography,
    display: display,
    space: space,
    ref: ref
  }), /*#__PURE__*/_react["default"].createElement("div", rest, /*#__PURE__*/_react["default"].createElement(Title, {
    variant: "title2",
    component: "h2",
    flexFull: true
  }, children), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    title: t('close'),
    symbol: _Close["default"],
    onClick: function onClick() {
      var _action$close;
      return action === null || action === void 0 ? void 0 : (_action$close = action.close) === null || _action$close === void 0 ? void 0 : _action$close.call(action, 'programmatic');
    }
  }))));
});

/**
 * when you need title with close button can use this component in your view `title` method
 */
var ModalTitleWithClose = exports.ModalTitleWithClose = (0, _styledComponents["default"])(_ModalTitleWithClose)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", "\n"])), _styles.modalTitleWithCloseStyle);
//# sourceMappingURL=ModalTitleWithClose.js.map

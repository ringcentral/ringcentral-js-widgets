"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
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
exports.MergeCallConfirmation = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _Button = require("@ringcentral/juno/es6/components/Buttons/Button/Button.js");
var _Checkbox = require("@ringcentral/juno/es6/components/Forms/Checkbox/Checkbox.js");
var _DialogActions = require("@ringcentral/juno/es6/components/Dialog/DialogActions/DialogActions.js");
var _Drawer = require("@ringcentral/juno/es6/components/Drawer/Drawer.js");
var _Typography = require("@ringcentral/juno/es6/components/Typography/Typography.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var InnerContainer = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: grid;\n  gap: ", ";\n  padding: ", ";\n  margin: ", ";\n\n  ", " {\n    margin-top: ", ";\n    padding: 0;\n  }\n"])), (0, _spacing.spacing)(3), (0, _spacing.spacing)(0, 4), (0, _spacing.spacing)(4, 0), _DialogActions.RcDialogActions, (0, _spacing.spacing)(2));

/**
 * Default value for "Don't ask me again"
 */
var DEFAULT_DO_NOT_ASK = false;
var MergeCallConfirmation = exports.MergeCallConfirmation = function MergeCallConfirmation(_ref) {
  var isOpen = _ref.isOpen,
    contactName = _ref.contactName,
    isConferenceCall = _ref.isConferenceCall,
    _onClose = _ref.onClose,
    onCancel = _ref.onCancel,
    onMerge = _ref.onMerge;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useState = (0, _react.useState)(DEFAULT_DO_NOT_ASK),
    _useState2 = _slicedToArray(_useState, 2),
    doNotAsk = _useState2[0],
    setDoNotAsk = _useState2[1];
  (0, _react.useEffect)(function () {
    if (isOpen) {
      setDoNotAsk(DEFAULT_DO_NOT_ASK);
    }
  }, [isOpen]);
  return /*#__PURE__*/_react["default"].createElement(_Drawer.RcDrawer, {
    radius: "xl",
    anchor: "bottom",
    open: isOpen,
    onClose: function onClose() {
      _onClose === null || _onClose === void 0 ? void 0 : _onClose();
    },
    "data-sign": "mergeCallConfirmation"
  }, /*#__PURE__*/_react["default"].createElement(InnerContainer, null, /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
    variant: "subheading2"
  }, t('title')), /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
    variant: "body1",
    "data-sign": "confirmMessage"
  }, t('message', {
    contactName: isConferenceCall ? t('conferenceCall') : contactName
  })), /*#__PURE__*/_react["default"].createElement(_Checkbox.RcCheckbox, {
    label: t('doNotAsk'),
    "data-sign": "doNotAsk",
    formControlLabelProps: {
      labelPlacement: 'end'
    },
    checked: doNotAsk,
    onChange: function onChange(ev, checked) {
      setDoNotAsk(checked);
    }
  }), /*#__PURE__*/_react["default"].createElement(_DialogActions.RcDialogActions, {
    direction: "vertical",
    reverse: false
  }, /*#__PURE__*/_react["default"].createElement(_Button.RcButton, {
    "data-sign": "confirmMerge",
    variant: "contained",
    color: "primary",
    size: "xlarge",
    fullWidth: true,
    onClick: function onClick() {
      onMerge(doNotAsk);
    }
  }, t('merge')), /*#__PURE__*/_react["default"].createElement(_Button.RcButton, {
    "data-sign": "cancelMerge",
    variant: "text",
    size: "xlarge",
    fullWidth: true,
    onClick: function onClick() {
      onCancel();
    }
  }, t('cancel')))));
};
//# sourceMappingURL=MergeCallConfirmation.js.map

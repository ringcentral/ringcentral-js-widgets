"use strict";

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
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogFormPage = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _rjsfSpring = require("@ringcentral-integration/rjsf-spring");
var _springUi = require("@ringcentral/spring-ui");
var _validatorAjv = _interopRequireDefault(require("@rjsf/validator-ajv8"));
var _clsx = _interopRequireDefault(require("clsx"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _react = _interopRequireWildcard(require("react"));
var _InputSelectWidgetSpring = require("../../../components/InputSelectWidgetSpring");
var _ReferenceWidgetSpring = require("../../../components/ReferenceWidgetSpring");
var _SpringUIDateWidget = require("../../../components/SpringUIDateWidget");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var referenceWidgetName = "uif-reference-widget";
var inputSelectWidgetName = "input-select-widget";
var springuiDateWidgetName = "springui-date";
var fields = _defineProperty(_defineProperty(_defineProperty({}, referenceWidgetName, _ReferenceWidgetSpring.ReferenceWidget), inputSelectWidgetName, _InputSelectWidgetSpring.InputSelectWidget), springuiDateWidgetName, _SpringUIDateWidget.SpringUIDateWidget);
var _CallLogFormPage = function _CallLogFormPage(props) {
  var task = props.task,
    editSectionSchema = props.editSectionSchema,
    referenceFields = props.referenceFields,
    onUpdateCallLog = props.onUpdateCallLog,
    disabled = props.disabled,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'expanded' : _props$variant,
    children = props.children;
  var uiOrder = editSectionSchema.uiOrder,
    formSchema = editSectionSchema.uiSchema,
    renderSchema = editSectionSchema.renderSchema;
  var uiSchema = (0, _react.useMemo)(function () {
    var schema = _objectSpread({}, renderSchema);
    Object.keys(referenceFields).forEach(function (key) {
      var _referenceType;
      var referenceFieldProps = referenceFields[key];
      var referenceType = (_referenceType = referenceFieldProps.referenceType) !== null && _referenceType !== void 0 ? _referenceType : referenceWidgetName;
      schema[key] = {
        'ui:field': referenceType,
        'ui:options': _objectSpread(_objectSpread({}, referenceFieldProps), {}, {
          expandMode: variant === 'expanded'
        })
      };
    });
    return schema;
  }, [referenceFields, renderSchema, variant]);
  var _uiSchema = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, uiSchema), {}, {
      'ui:disabled': disabled,
      'ui:order': uiOrder,
      'ui:submitButtonOptions': {
        norender: true
      }
    });
  }, [disabled, uiOrder, uiSchema]);
  var innerFirstFieldKeys = (0, _react.useMemo)(function () {
    return Object.keys(formSchema.properties).filter(function (key) {
      var value = formSchema.properties[key];
      return value.type === 'string' && !('anyOf' in value) && !('items' in value);
    });
  }, [formSchema.properties]);

  /**
   * split the task into two parts, one part is the inner first fields, the other part is the outer directly fields
   *
   *  to avoid unnecessary re-render cause the input anchor to lose focus or position jump
   */
  var _useMemo = (0, _react.useMemo)(function () {
      var inner = (0, _pick["default"])(task, innerFirstFieldKeys);
      var outer = (0, _omit["default"])(task, innerFirstFieldKeys);
      return [inner, outer];
    }, [task, innerFirstFieldKeys]),
    _useMemo2 = _slicedToArray(_useMemo, 2),
    innerFirstState = _useMemo2[0],
    outerDirectlyState = _useMemo2[1];
  var _useAsyncState = (0, _reactHooks.useAsyncState)(innerFirstState),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    innerFirstFields = _useAsyncState2[0],
    setInnerFirstField = _useAsyncState2[1];
  var handleChange = (0, _springUi.useEventCallback)(function (_ref) {
    var formData = _ref.formData;
    onUpdateCallLog(formData);
    setInnerFirstField((0, _pick["default"])(formData, innerFirstFieldKeys));
  });
  var formData = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, innerFirstFields), outerDirectlyState);
  }, [innerFirstFields, outerDirectlyState]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('pb-2 px-4 flex-grow', variant === 'expanded' && 'overflow-y-auto overflow-x-hidden'),
    "data-sign": "call-log-panel"
  }, /*#__PURE__*/_react["default"].createElement(_rjsfSpring.Form, {
    schema: formSchema,
    validator: _validatorAjv["default"],
    fields: fields,
    onChange: handleChange,
    onSubmit: console.log,
    onError: console.error,
    formData: formData,
    uiSchema: _uiSchema
  })), children);
};
_CallLogFormPage.displayName = 'CallLogFormPage';
var CallLogFormPage = exports.CallLogFormPage = /*#__PURE__*/(0, _react.memo)(_CallLogFormPage);
//# sourceMappingURL=CallLogFormPage.js.map

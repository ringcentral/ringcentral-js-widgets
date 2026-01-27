"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIFCallLogForm = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _rjsfJuno = require("@ringcentral-integration/rjsf-juno");
var _validatorAjv = _interopRequireDefault(require("@rjsf/validator-ajv8"));
var _react = _interopRequireWildcard(require("react"));
var _ReferenceWidget = require("../ReferenceWidget");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var widgetName = "uif-reference-widget";
var fields = _defineProperty({}, widgetName, _ReferenceWidget.ReferenceWidget);
var UIFCallLogForm = exports.UIFCallLogForm = function UIFCallLogForm(props) {
  // @ts-ignore
  var _props$currentLog = props.currentLog,
    task = _props$currentLog.task,
    editSectionSchema = _props$currentLog.editSectionSchema,
    customLogFields = _props$currentLog.customLogFields,
    currentSessionId = _props$currentLog.currentSessionId;
  var uiOrder = editSectionSchema.uiOrder,
    formSchema = editSectionSchema.uiSchema,
    renderSchema = editSectionSchema.renderSchema;
  var formRef = props.formRef,
    referenceFieldOptions = props.referenceFieldOptions,
    onUpdateCallLog = props.onUpdateCallLog,
    disabled = props.disabled;
  var uiSchema = (0, _react.useMemo)(function () {
    var schema = _objectSpread({}, renderSchema);
    Object.keys(referenceFieldOptions).forEach(function (key) {
      var referenceFieldOption = referenceFieldOptions[key];
      schema[key] = {
        'ui:field': widgetName,
        'ui:options': _objectSpread(_objectSpread({}, props), {}, {
          referenceFieldOption: referenceFieldOption,
          fieldOption: customLogFields.find(function (field) {
            return field.value === key;
          })
        })
      };
    });
    return schema;
  }, [renderSchema, referenceFieldOptions, customLogFields, props]);
  return /*#__PURE__*/_react["default"].createElement(_rjsfJuno.Form, {
    schema: formSchema,
    validator: _validatorAjv["default"]
    // @ts-ignore
    ,
    fields: fields,
    onChange: function onChange(_ref) {
      var formData = _ref.formData;
      return onUpdateCallLog(formData, currentSessionId);
    },
    onSubmit: console.log,
    onError: console.error,
    formData: task,
    ref: formRef,
    uiSchema: _objectSpread(_objectSpread({}, uiSchema), {}, {
      'ui:disabled': disabled,
      'ui:order': uiOrder,
      'ui:submitButtonOptions': {
        norender: true
      }
    })
  });
};
//# sourceMappingURL=UIFCallLogForm.js.map

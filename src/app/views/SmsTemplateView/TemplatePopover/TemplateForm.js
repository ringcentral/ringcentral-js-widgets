"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateForm = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var TemplateForm = exports.TemplateForm = function TemplateForm(_ref) {
  var title = _ref.title,
    content = _ref.content,
    onTitleChange = _ref.onTitleChange,
    onContentChange = _ref.onContentChange,
    onSave = _ref.onSave,
    onCancel = _ref.onCancel,
    className = _ref.className,
    isLoading = _ref.isLoading,
    error = _ref.error;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var initDataRef = (0, _react.useRef)({
    title: title,
    content: content
  });
  var isDisabled = !title || !content;
  var initData = initDataRef.current;
  var isChanged = initData.title !== title || initData.content !== content;
  var scrollAnchorRef = (0, _react.useRef)(null);

  // when that display, scroll to the form for display the form
  (0, _react.useEffect)(function () {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({
        block: 'center'
      });
    }
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: scrollAnchorRef,
    "data-sign": "editTemplateForm",
    className: (0, _clsx["default"])('px-2 pb-2 border border-neutral-b4 relative rounded', className)
  }, /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    label: t('fieldTitle'),
    value: title,
    size: "medium",
    fullWidth: true,
    inputProps: {
      maxLength: 250,
      'data-sign': 'editTemplateTitleInput'
    },
    showCharacterCount: true,
    onChange: function onChange(e) {
      return onTitleChange(e.target.value);
    },
    placeholder: t('fieldTitlePlaceholder'),
    clearBtn: false,
    error: !!error,
    helperText: error
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Textarea, {
    label: t('fieldContent'),
    value: content,
    size: "medium",
    fullWidth: true,
    inputProps: {
      maxLength: 1000,
      'data-sign': 'editTemplateContentInput'
    },
    showCharacterCount: true,
    onChange: function onChange(e) {
      return onContentChange(e.target.value);
    },
    minRows: 2,
    maxRows: 10,
    placeholder: t('fieldContentPlaceholder'),
    clearBtn: false
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-2 mt-3 justify-end"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "outlined",
    size: "small",
    onClick: onCancel,
    "data-sign": "cancelEditTemplateButton",
    disabled: isLoading
  }, t('cancel')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "contained",
    size: "small",
    onClick: onSave,
    disabled: isDisabled || isLoading || !isChanged,
    "data-sign": "saveEditTemplateButton",
    loading: isLoading
  }, t('save'))));
};
//# sourceMappingURL=TemplateForm.js.map

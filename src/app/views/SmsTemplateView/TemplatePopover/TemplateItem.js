"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateItem = void 0;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.string.trim.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _TemplateForm = require("./TemplateForm");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable jsx-a11y/no-static-element-interactions */ /* eslint-disable jsx-a11y/click-events-have-key-events */
var actionButtonProps = {
  size: 'small',
  variant: 'icon',
  color: 'secondary'
};
var CUSTOM_HIGH_LIGHT_STYLE = {
  highlight: 'text-neutral-b0 font-bold bg-warning-f bg-opacity-40'
};
var TemplateItem = exports.TemplateItem = function TemplateItem(_ref) {
  var template = _ref.template,
    highlightWords = _ref.highlightWords,
    isExpanded = _ref.isExpanded,
    isEditing = _ref.isEditing,
    onTemplateClick = _ref.onTemplateClick,
    onApplyTemplate = _ref.onApplyTemplate,
    onCopyTemplate = _ref.onCopyTemplate,
    onEditTemplate = _ref.onEditTemplate,
    onUpdateTemplate = _ref.onUpdateTemplate,
    onDeleteTemplate = _ref.onDeleteTemplate,
    onCancelEdit = _ref.onCancelEdit,
    isLoading = _ref.isLoading;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    editTitle = _useState2[0],
    setEditTitle = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    editContent = _useState4[0],
    setEditContent = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  // Initialize edit values when editing starts
  (0, _react.useEffect)(function () {
    if (isEditing) {
      setEditTitle(template.title);
      setEditContent(template.content);
    }
  }, [isEditing, template.title, template.content]);
  var handleSave = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var title, content, result;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            title = editTitle.trim();
            content = editContent.trim();
            if (!(title && content)) {
              _context.n = 2;
              break;
            }
            _context.n = 1;
            return onUpdateTemplate(template.id, title, content);
          case 1:
            result = _context.v;
            if (typeof result === 'string') {
              setError(result);
            }
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleSave() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleCancel = function handleCancel() {
    setEditTitle('');
    setEditContent('');
    onCancelEdit();
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: template.id,
    className: (0, _clsx["default"])((isExpanded || isEditing) && 'm-2'),
    "data-sign": "templateItem"
  }, isEditing ?
  /*#__PURE__*/
  // Inline Edit Form
  _react["default"].createElement(_TemplateForm.TemplateForm, {
    title: editTitle,
    content: editContent,
    onTitleChange: function onTitleChange(value) {
      setEditTitle(value);
      setError(null);
    },
    onContentChange: setEditContent,
    onSave: handleSave,
    onCancel: handleCancel,
    isLoading: isLoading,
    error: error
  }) :
  /*#__PURE__*/
  // Regular Template Display
  _react["default"].createElement("div", {
    role: "button",
    tabIndex: 0,
    className: (0, _clsx["default"])('p-3 hover:bg-neutral-b5 cursor-pointer w-full text-left', isExpanded && 'border border-neutral-b4 rounded'),
    onClick: function onClick(e) {
      if (e.currentTarget.contains(e.target)) {
        onTemplateClick(template.id);
      }
    },
    onKeyDown: function onKeyDown(e) {
      var _target$dataset;
      var target = e.target;
      if (e.currentTarget.contains(target) && ((_target$dataset = target.dataset) === null || _target$dataset === void 0 ? void 0 : _target$dataset['sign']) !== 'applyTemplateButton' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        e.stopPropagation();
        onTemplateClick(template.id);
      }
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between items-center overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex justify-between ', isExpanded ? 'border-b border-neutral-b4 pb-1 mb-2 items-start' : 'items-center')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('typography-subtitle text-neutral-b0 truncate mb-1 break-words flex-auto', isExpanded ? 'overflow-hidden text-wrap' : 'truncate'),
    "data-sign": "templateTitle"
  }, highlightWords ? /*#__PURE__*/_react["default"].createElement(_components.TextWithHighlight, {
    text: template.title,
    highLightText: highlightWords,
    classes: CUSTOM_HIGH_LIGHT_STYLE
  }) : template.title), isExpanded && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-1 items-center",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, /*#__PURE__*/_react["default"].createElement(_components.ActionMenuList, {
    variant: "plain",
    displayCount: 3,
    propsMap: {
      all: actionButtonProps
    },
    moreButtonProps: actionButtonProps,
    buttons: [{
      actionType: 'apply',
      label: t('apply'),
      symbol: _springIcon.EnterMd,
      onClick: function onClick() {
        return onApplyTemplate(template.content);
      }
    }, {
      actionType: 'copy',
      label: t('copy'),
      symbol: _springIcon.CopyMd,
      onClick: function onClick() {
        return onCopyTemplate(template.content);
      }
    }, {
      actionType: 'edit',
      label: t('edit'),
      symbol: _springIcon.EditMd,
      onClick: function onClick() {
        return onEditTemplate(template.id);
      }
    }, {
      actionType: 'delete',
      label: t('delete'),
      symbol: _springIcon.TrashMd,
      onClick: function onClick() {
        return onDeleteTemplate(template.id);
      }
    }]
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('typography-descriptor text-neutral-b2 whitespace-pre-line break-words', !isExpanded && 'line-clamp-2'),
    "data-sign": "templateContent"
  }, highlightWords ? /*#__PURE__*/_react["default"].createElement(_components.TextWithHighlight, {
    text: template.content,
    highLightText: highlightWords,
    classes: CUSTOM_HIGH_LIGHT_STYLE
  }) : template.content)), !isExpanded && /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    size: "small",
    variant: "icon",
    color: "secondary",
    symbol: _springIcon.EnterMd,
    TooltipProps: {
      title: t('apply')
    },
    onClick: function onClick(e) {
      e.stopPropagation();
      onApplyTemplate(template.content);
    },
    "data-sign": "applyTemplateButton"
  }))));
};
//# sourceMappingURL=TemplateItem.js.map

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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplatePopover = void 0;
require("core-js/modules/es.array.every.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _Root = require("@ringcentral-integration/next-core/src/modules/Root");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _reactUse = require("react-use");
var _AddTemplateForm = require("./AddTemplateForm");
var _TemplateItem = require("./TemplateItem");
var _i18n = _interopRequireDefault(require("./i18n"));
var _useLeaveGuard2 = require("./useLeaveGuard");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var TemplatePopover = exports.TemplatePopover = function TemplatePopover(_ref) {
  var onApplyTemplate = _ref.onApplyTemplate,
    templatesProp = _ref.templates,
    onCopy = _ref.onCopy,
    onDelete = _ref.onDelete,
    onAddTemplate = _ref.onAddTemplate,
    onUpdateTemplate = _ref.onUpdateTemplate,
    isLoading = _ref.isLoading;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isAdding = _useState4[0],
    setIsAdding = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    editingId = _useState6[0],
    setEditingId = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    expandedId = _useState8[0],
    setExpandedId = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState0 = _slicedToArray(_useState9, 2),
    filterValue = _useState0[0],
    setFilterValue = _useState0[1];
  var anchorElRef = (0, _react.useRef)(null);
  var mounted = (0, _reactUse.usePromise)();
  var _useLeaveGuard = (0, _useLeaveGuard2.useLeaveGuard)({
      condition: function condition() {
        return isAdding || !!editingId;
      },
      onLeave: function onLeave() {
        setIsAdding(false);
        setEditingId(null);
        setFilterValue('');
        setIsOpen(false);
      }
    }),
    attemptLeave = _useLeaveGuard.attemptLeave,
    LeaveGuardDialog = _useLeaveGuard.LeaveGuardDialog;
  var handleToggle = function handleToggle() {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };
  var handleClose = function handleClose() {
    attemptLeave();
  };
  var handleClickAway = function handleClickAway() {
    handleClose();
  };
  var handleUpdateTemplate = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(id, title, content) {
      var result;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return mounted(onUpdateTemplate(id, title, content));
          case 1:
            result = _context.v;
            if (!(typeof result === 'string')) {
              _context.n = 2;
              break;
            }
            return _context.a(2, result);
          case 2:
            if (result) {
              _context.n = 3;
              break;
            }
            return _context.a(2);
          case 3:
            setEditingId(null);
            setExpandedId(null);
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleUpdateTemplate(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleEditTemplate = function handleEditTemplate(id) {
    setEditingId(id);
    setExpandedId(id);
  };
  var handleCancelEdit = function handleCancelEdit() {
    setEditingId(null);
  };
  var handleDeleteTemplate = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
      var success;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return mounted(onDelete(id));
          case 1:
            success = _context2.v;
            return _context2.a(2, success);
        }
      }, _callee2);
    }));
    return function handleDeleteTemplate(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleApplyTemplate = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(content) {
      var success;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return mounted(onApplyTemplate(content));
          case 1:
            success = _context3.v;
            if (success) {
              handleClose();
            }
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function handleApplyTemplate(_x5) {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleCopyTemplate = function handleCopyTemplate(content) {
    onCopy(content);
  };
  var handleTemplateClick = function handleTemplateClick(templateId) {
    setExpandedId(expandedId === templateId ? null : templateId);
  };
  var handleStartAdd = function handleStartAdd() {
    setIsAdding(true);
    setFilterValue('');
  };
  var highlightWords = (0, _react.useMemo)(function () {
    return filterValue.toLowerCase().split(' ').filter(Boolean);
  }, [filterValue]);
  var templates = (0, _react.useMemo)(function () {
    return templatesProp.filter(function (template) {
      var title = template.title.toLowerCase();
      var content = template.content.toLowerCase();
      return highlightWords.every(function (search) {
        return title.includes(search) || content.includes(search);
      });
    });
  }, [highlightWords, templatesProp]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    variant: "icon",
    size: "large",
    color: "secondary",
    className: "text-neutral-b2",
    ref: anchorElRef,
    TooltipProps: {
      title: t('useTemplate')
    },
    "data-sign": "templateButton",
    symbol: _springIcon.MasterTemplateMd,
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    },
    onClick: handleToggle
  }), isOpen && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "templatePopoverBackdrop",
    className: "absolute top-0 left-0 size-full z-modal",
    onClick: handleClickAway
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Popper, {
    placement: "top",
    className: "z-modal !w-full",
    anchorEl: anchorElRef.current,
    padding: 16,
    autoUpdate: {
      ancestorScroll: false,
      // Updates when parent scrolls
      ancestorResize: false,
      // Updates when parent resizes
      elementResize: true,
      // 🔑 Key: Auto-detects when popper content size changes
      animationFrame: false // Keep false for performance unless smooth animations needed
    },
    style: {
      maxWidth: _Root.DEFAULT_WIDTH - 32
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": t('useTemplate'),
    className: "border border-neutral-b0-t20 overflow-hidden rounded-sui-sm shadow-md bg-neutral-base"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col h-[350px]"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between px-3 py-1 border-b border-neutral-b4"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "typography-subtitle text-neutral-b1 truncate flex-1"
  }, t('title')), /*#__PURE__*/_react["default"].createElement("i", {
    className: "h-8"
  }), !isAdding && /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    variant: "icon",
    TooltipProps: {
      title: t('addTemplate')
    },
    size: "medium",
    color: "secondary",
    symbol: _springIcon.PlusMd,
    onClick: handleStartAdd,
    "data-sign": "addTemplateButton"
  })), !isAdding && templatesProp.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "border-b border-neutral-b4 flex gap-2 items-center typography-mainText text-neutral-b2",
    "data-sign": "searchTemplate"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "searchTemplate",
    className: "pl-3"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    size: "small",
    symbol: _springIcon.SearchMd
  })), /*#__PURE__*/_react["default"].createElement("input", {
    id: "searchTemplate",
    "data-sign": "searchTemplateInput",
    className: "w-full outline-none py-3 pr-3 text-neutral-b0 placeholder:text-neutral-b2 bg-transparent",
    placeholder: t('searchTemplate'),
    value: filterValue,
    onChange: function onChange(e) {
      setFilterValue(e.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 overflow-y-auto"
  }, isAdding && /*#__PURE__*/_react["default"].createElement(_AddTemplateForm.AddTemplateForm, {
    isLoading: isLoading,
    onAddTemplate: onAddTemplate,
    onAddingChange: setIsAdding
  }), templatesProp.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col items-center justify-center h-full py-8 px-3 text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-subtitle text-neutral-b0 mb-2"
  }, t('noTemplatesYet')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptor text-neutral-b2"
  }, t('createTemplatesHint'))) : templates.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col items-center justify-center h-full py-8 px-3 text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-subtitle text-neutral-b0"
  }, t('noResults'))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 overflow-hidden pb-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-1 overflow-y-auto"
  }, templates.map(function (template) {
    var isExpanded = expandedId === template.id;
    var isEditing = editingId === template.id;
    return /*#__PURE__*/_react["default"].createElement(_TemplateItem.TemplateItem, {
      key: template.id,
      template: template,
      highlightWords: highlightWords,
      isExpanded: isExpanded,
      isEditing: isEditing,
      onTemplateClick: handleTemplateClick,
      onApplyTemplate: handleApplyTemplate,
      onCopyTemplate: handleCopyTemplate,
      onEditTemplate: handleEditTemplate,
      onUpdateTemplate: handleUpdateTemplate,
      onDeleteTemplate: handleDeleteTemplate,
      onCancelEdit: handleCancelEdit,
      isLoading: isLoading
    });
  })))))))), /*#__PURE__*/_react["default"].createElement(LeaveGuardDialog, null));
};
//# sourceMappingURL=TemplatePopover.js.map

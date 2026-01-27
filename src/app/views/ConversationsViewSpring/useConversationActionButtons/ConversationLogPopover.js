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
exports.ConversationLogPopover = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.to-string.js");
var _ReferenceWidgetSpring = require("@ringcentral-integration/micro-phone/src/app/components/ReferenceWidgetSpring");
var _nextCore = require("@ringcentral-integration/next-core");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _reactUse = require("react-use");
var _i18n = require("./i18n");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ConversationLogPopover = exports.ConversationLogPopover = function ConversationLogPopover(_ref) {
  var anchorEl = _ref.anchorEl,
    onClose = _ref.onClose,
    opened = _ref.opened,
    conversation = _ref.conversation,
    onCreateEntity = _ref.onCreateEntity,
    createNewEntityTooltip = _ref.createNewEntityTooltip;
  var conversationLogPopoverOptions = (0, _nextCore.useContainer)('ConversationLogPopoverOptions');
  var mounted = (0, _reactUse.usePromise)();
  var integrationConfig = (0, _nextCore.useContainer)('IntegrationConfig');
  var handleCreateEntity = function handleCreateEntity() {
    var _ref2;
    (_ref2 = onCreateEntity || integrationConfig.onCreateEntity) === null || _ref2 === void 0 ? void 0 : _ref2();
  };
  var _ref3 = conversationLogPopoverOptions || {},
    maxLogRecordsCount = _ref3.maxLogRecordsCount;
  var conversationMatches = conversation.conversationMatches,
    matches = conversation.correspondentMatches,
    conversationId = conversation.conversationId,
    conversationLogId = conversation.conversationLogId;
  var thirdPartyMatches = (0, _react.useMemo)(function () {
    return matches.filter(function (_ref4) {
      var resourceType = _ref4.resourceType;
      return resourceType;
    });
  }, [matches]);
  var allDisplayList = [{
    label: (0, _i18n.t)('suggested'),
    values: thirdPartyMatches
  }];
  var formKey = 'conversationDetailViewPopover';
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];
  var _useAsyncState = (0, _reactHooks.useAsyncState)(conversationMatches),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    selectedEntities = _useAsyncState2[0],
    setSelectedEntities = _useAsyncState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    saving = _useState4[0],
    setSaving = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    searchOpened = _useState6[0],
    setSearchOpened = _useState6[1];
  var openSearchPage = (0, _react.useCallback)(function () {
    setSearchOpened(true);
  }, []);
  var closeSearchPage = (0, _react.useCallback)(function () {
    setSearchOpened(false);
  }, []);
  var selectedMap = (0, _react.useMemo)(function () {
    return selectedEntities.reduce(function (acc, item) {
      acc[item.id] = true;
      return acc;
    }, {});
  }, [selectedEntities]);
  var onSelectContact = conversationLogPopoverOptions === null || conversationLogPopoverOptions === void 0 ? void 0 : conversationLogPopoverOptions.onSelectContact;
  var referenceItemClickHandler = (0, _react.useCallback)(function (item, isSelected) {
    var newSelectedEntities = isSelected ? [].concat(_toConsumableArray(selectedEntities), [item]) : selectedEntities.filter(function (entity) {
      return entity.id !== item.id;
    });
    setSelectedEntities(_toConsumableArray(newSelectedEntities));
    onSelectContact === null || onSelectContact === void 0 ? void 0 : onSelectContact(conversationLogId, item);
  }, [selectedEntities, setSelectedEntities, onSelectContact, conversationLogId]);
  var reachMaxSelectCount = maxLogRecordsCount && selectedEntities.length > maxLogRecordsCount;
  var onPressEnter = (0, _react.useCallback)(function (e) {
    if (e.key === 'Enter') {
      if (inputValue.length < 3 || searchOpened) return;
      openSearchPage();
    }
  }, [inputValue, searchOpened, openSearchPage]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.Popover, {
    anchorEl: anchorEl,
    open: opened && !searchOpened,
    onClose: onClose,
    placement: "bottom",
    shadow: true,
    variant: "standard",
    bordered: true,
    "data-sign": "smsLogPopover",
    onClick: function onClick(e) {
      // TODO: spring-ui issue, click event will trigger the host item click event
      e.stopPropagation();
    }
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2 p-2 pl-3"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    fullWidth: true,
    value: inputValue,
    size: "medium",
    inputProps: {
      'data-sign': 'smsSearchInput'
    },
    onKeyDown: onPressEnter,
    onChange: function onChange(e) {
      e.stopPropagation();
      setInputValue(e.target.value);
    },
    placeholder: (0, _i18n.t)('search')
  }), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    TooltipProps: {
      title: createNewEntityTooltip
    },
    "data-sign": "addEntity",
    symbol: _springIcon.PlusMd,
    color: "secondary",
    variant: "icon",
    onClick: handleCreateEntity
  })), /*#__PURE__*/_react["default"].createElement(_ReferenceWidgetSpring.ReferenceMainContent, {
    filterTerm: inputValue,
    formKey: formKey,
    allDisplayList: allDisplayList,
    currentValue: selectedEntities,
    onItemClick: referenceItemClickHandler,
    searchFn: openSearchPage,
    errorHint: reachMaxSelectCount ? (0, _i18n.t)('logConversationMaxRecords', {
      count: maxLogRecordsCount
    }) : '',
    useMenuList: conversationLogPopoverOptions === null || conversationLogPopoverOptions === void 0 ? void 0 : conversationLogPopoverOptions.useMenuList,
    getIcon: conversationLogPopoverOptions === null || conversationLogPopoverOptions === void 0 ? void 0 : conversationLogPopoverOptions.getIcon
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between px-3 py-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-[135px]"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "text",
    size: "medium",
    fullWidth: true,
    "data-sign": "cancel-button",
    onClick: onClose
  }, (0, _i18n.t)('cancel'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-[135px]"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    size: "medium",
    fullWidth: true,
    "data-sign": "save-button",
    disabled: reachMaxSelectCount || selectedEntities.length === 0 || saving,
    loading: saving,
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var promise, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setSaving(true);
            promise = conversationLogPopoverOptions === null || conversationLogPopoverOptions === void 0 ? void 0 : conversationLogPopoverOptions.onSave(conversationId, selectedEntities);
            if (!promise) {
              _context.n = 1;
              break;
            }
            _context.n = 1;
            return mounted(promise);
          case 1:
            onClose();
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('save error');
          case 3:
            _context.p = 3;
            setSaving(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }))
  }, (0, _i18n.t)('save')))))), searchOpened && /*#__PURE__*/_react["default"].createElement(_ReferenceWidgetSpring.ReferenceSearchPanel, {
    closePageFn: closeSearchPage,
    onCreateEntity: handleCreateEntity,
    onBack: function onBack() {
      setInputValue('');
    },
    onItemClick: referenceItemClickHandler,
    selectedMap: selectedMap,
    searchFn: conversationLogPopoverOptions === null || conversationLogPopoverOptions === void 0 ? void 0 : conversationLogPopoverOptions.searchThirdPartyRecord,
    initValue: inputValue,
    useMenuList: conversationLogPopoverOptions === null || conversationLogPopoverOptions === void 0 ? void 0 : conversationLogPopoverOptions.useMenuList,
    getIcon: conversationLogPopoverOptions === null || conversationLogPopoverOptions === void 0 ? void 0 : conversationLogPopoverOptions.getIcon,
    addEntityTooltip: createNewEntityTooltip
  }));
};
//# sourceMappingURL=ConversationLogPopover.js.map

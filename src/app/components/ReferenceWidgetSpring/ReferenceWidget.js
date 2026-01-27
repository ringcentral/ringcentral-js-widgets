"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceWidget = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _ReferencePopper = require("./components/ReferencePopper");
var _ReferenceSearchPanel = require("./components/ReferenceSearchPanel");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
var ReferenceWidget = exports.ReferenceWidget = function ReferenceWidget(filedProps) {
  var props = filedProps.uiSchema['ui:options'],
    formData = filedProps.formData,
    schema = filedProps.schema;

  // Ensure currentValue is always an array
  var currentValue = (0, _react.useMemo)(function () {
    return Array.isArray(formData) ? formData : [];
  }, [formData]);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _ref = props,
    overrideLabel = _ref.overrideLabel,
    disabled = _ref.disabled,
    onChange = _ref.onChange,
    allDisplayList = _ref.allDisplayList,
    onCreateEntity = _ref.onCreateEntity,
    addEntityMenu = _ref.addEntityMenu,
    enableSearch = _ref.enableSearch,
    formKey = _ref.formKey,
    searchFn = _ref.searchFn,
    multiple = _ref.multiple,
    expandMode = _ref.expandMode,
    _ref$useMenuList = _ref.useMenuList,
    useMenuList = _ref$useMenuList === void 0 ? false : _ref$useMenuList,
    getIcon = _ref.getIcon,
    _ref$showChips = _ref.showChips,
    showChips = _ref$showChips === void 0 ? true : _ref$showChips,
    addEntityTooltip = _ref.addEntityTooltip,
    _ref$autoCloseOnSelec = _ref.autoCloseOnSelect,
    autoCloseOnSelect = _ref$autoCloseOnSelec === void 0 ? false : _ref$autoCloseOnSelec,
    _ref$clearBtnClearsSe = _ref.clearBtnClearsSelection,
    clearBtnClearsSelection = _ref$clearBtnClearsSe === void 0 ? false : _ref$clearBtnClearsSe;
  var withAddEntityButtonRef = (0, _react.useRef)(null);
  var inputRef = (0, _react.useRef)(null);
  var autocompleteRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    searchOpened = _useState4[0],
    setSearchOpened = _useState4[1];
  var matchedCount = allDisplayList.reduce(function (acc, list) {
    return acc + list.values.length;
  }, 0);
  var selectedMap = (0, _react.useMemo)(function () {
    return currentValue.reduce(function (acc, item) {
      if (item && item.id) {
        acc[item.id] = true;
      }
      return acc;
    }, {});
  }, [currentValue]);
  var fieldLabel = overrideLabel !== null && overrideLabel !== void 0 ? overrideLabel : schema.title;
  var referenceItemClickHandler = (0, _react.useCallback)(function (item, selected) {
    var newValues = [];
    if (!multiple) {
      newValues = selected ? [item] : [];
    } else {
      newValues = selected ? [].concat(_toConsumableArray(currentValue), [item]) : currentValue.filter(function (record) {
        return record.id !== item.id;
      });
    }
    onChange(newValues, {
      item: item,
      selected: selected
    });
    if (autoCloseOnSelect && selected && autocompleteRef.current) {
      var inputElement = inputRef.current;
      if (inputElement) {
        inputElement.blur();
      }
    }
  }, [onChange, currentValue, multiple, autoCloseOnSelect]);
  var openSearchPage = (0, _react.useCallback)(function () {
    setSearchOpened(true);
  }, []);
  var closeSearchPage = (0, _react.useCallback)(function () {
    setSearchOpened(false);
  }, []);
  var anchorEl = (0, _react.useCallback)(function () {
    return withAddEntityButtonRef.current;
  }, []);
  var CustomPopper = (0, _ReferencePopper.useReferencePopper)({
    filterTerm: inputValue,
    allDisplayList: allDisplayList,
    currentValue: currentValue,
    formKey: formKey,
    onItemClick: referenceItemClickHandler,
    enableSearch: enableSearch,
    searchFn: openSearchPage,
    useMenuList: useMenuList,
    getIcon: getIcon,
    anchorEl: anchorEl
  });
  var renderTags = (0, _react.useCallback)(function (values, getTagProps) {
    if (!showChips) {
      var _values$;
      if (!values || values.length === 0) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "typography-mainText text-neutral-b1 truncate",
        style: {
          maxWidth: '75%'
        } // tailwind css not computing max-w-[75%]
      }, ((_values$ = values[0]) === null || _values$ === void 0 ? void 0 : _values$.name) || '');
    }
    return values.map(function (item, index) {
      var tagProps = getTagProps(item, index);
      var _ref2 = item,
        id = _ref2.id,
        name = _ref2.name,
        type = _ref2.type;
      return /*#__PURE__*/_react["default"].createElement(_springUi.Chip, _extends({
        "data-sign": "chip-".concat(id !== null && id !== void 0 ? id : index),
        key: index
      }, tagProps, {
        label: name,
        onDelete: function onDelete() {
          referenceItemClickHandler(item, false);
        },
        truncate: true
      }));
    });
  }, [referenceItemClickHandler, showChips]);
  var showAddEntityButton = Boolean(onCreateEntity || addEntityMenu);

  // Ref and state for the add entity menu
  var addEntityButtonRef = (0, _react.useRef)(null);
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    menuOpen = _useState6[0],
    setMenuOpen = _useState6[1];
  var handleMenuOpen = function handleMenuOpen() {
    return setMenuOpen(true);
  };
  var handleMenuClose = function handleMenuClose() {
    return setMenuOpen(false);
  };
  var onPressEnter = (0, _react.useCallback)(function (e) {
    if (e.key === 'Enter') {
      if (!enableSearch || inputValue.length < 3 || searchOpened) return;
      // setSearchOpenedState(formKey);
      setSearchOpened(true);
    }
  }, [enableSearch, inputValue, searchOpened, setSearchOpened]);
  var ReferenceInput = /*#__PURE__*/_react["default"].createElement(_springUi.Autocomplete, {
    ref: autocompleteRef,
    inputRef: inputRef,
    RootProps: {
      'data-sign': formKey,
      className: 'max-w-full'
    },
    ClearButtonProps: _objectSpread({
      'data-sign': 'removeBtn'
    }, clearBtnClearsSelection && {
      onClick: function onClick() {
        setInputValue('');
        if (currentValue && currentValue.length > 0) {
          currentValue.forEach(function (item) {
            referenceItemClickHandler(item, false);
          });
        }
      }
    }),
    placeholder: t('matchedRecordsTips', {
      matchedCount: matchedCount
    }),
    disabled: disabled,
    clearBtn: !!inputValue.length || clearBtnClearsSelection && currentValue && currentValue.length > 0,
    multiple: true,
    toggleButton: true
    //@ts-ignore
    ,
    PopperComponent: CustomPopper,
    PopperProps: {
      anchorElType: 'root',
      placement: 'bottom'
    },
    value: currentValue,
    onClose: function onClose(e, reason) {
      if (reason === 'blur' || reason === 'escape') {
        setInputValue('');
      }
    },
    options: [],
    label: fieldLabel,
    inputValue: inputValue,
    onInputChange: function onInputChange(newInputValue) {
      setInputValue(newInputValue);
    },
    ToggleButtonProps: {
      disabled: false
    },
    renderTags: renderTags,
    inputVariant: "outlined",
    onKeyDown: onPressEnter,
    size: "medium"
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showAddEntityButton ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2",
    ref: withAddEntityButtonRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, ReferenceInput), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    "data-sign": "addEntity",
    className: "mt-6 flex-shrink-0",
    TooltipProps: {
      title: addEntityTooltip
    },
    symbol: _springIcon.PlusMd,
    color: "secondary",
    variant: "icon",
    ref: addEntityButtonRef,
    onClick: function onClick() {
      if (addEntityMenu) {
        handleMenuOpen();
      } else {
        onCreateEntity === null || onCreateEntity === void 0 ? void 0 : onCreateEntity();
      }
    },
    size: "medium"
  })) : ReferenceInput, addEntityMenu && /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
    open: menuOpen,
    anchorEl: function anchorEl() {
      return addEntityButtonRef.current;
    },
    onClose: handleMenuClose
  }, addEntityMenu.options.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      key: option.type,
      onClick: function onClick() {
        addEntityMenu.onSelect(option.type);
        handleMenuClose();
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "mr-2"
    }, option.icon), /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, option.label));
  })), searchOpened && /*#__PURE__*/_react["default"].createElement(_ReferenceSearchPanel.ReferenceSearchPanel, {
    expandMode: expandMode,
    onBack: function onBack() {
      var _inputRef$current;
      setInputValue('');
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    },
    closePageFn: closeSearchPage,
    onCreateEntity: onCreateEntity,
    addEntityMenu: addEntityMenu,
    onItemClick: referenceItemClickHandler,
    selectedMap: selectedMap,
    searchFn: searchFn,
    initValue: inputValue,
    useMenuList: useMenuList,
    getIcon: getIcon,
    addEntityTooltip: addEntityTooltip
  }));
};
//# sourceMappingURL=ReferenceWidget.js.map

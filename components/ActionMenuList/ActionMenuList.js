"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionMenuList = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.anchor.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.timers.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _Drawer = require("../Drawer");
var _HoverAction = require("../HoverAction");
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["actionType", "Component", "label", "tooltip", "isSubmenu", "submenuActions", "onClick"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * a wrapper component to ignore rest props pass into fragment
 */
var FragmentWrap = function FragmentWrap(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children);
};
var MORE_ACTION_TYPE = 'more';

/**
 * It displays a specified number of action buttons and groups the remaining actions into a menu.
 *
 * @returns {JSX.Element | null} The rendered ActionMenuList component or null if there are no visible actions.
 */
var ActionMenuList = exports.ActionMenuList = function ActionMenuList(_ref2) {
  var buttons = _ref2.buttons,
    displayCountProp = _ref2.displayCount,
    _ref2$variant = _ref2.variant,
    variant = _ref2$variant === void 0 ? 'hover' : _ref2$variant,
    _ref2$listVariant = _ref2.listVariant,
    listVariant = _ref2$listVariant === void 0 ? 'menu' : _ref2$listVariant,
    _ref2$showIconAtMenuL = _ref2.showIconAtMenuList,
    showIconAtMenuList = _ref2$showIconAtMenuL === void 0 ? true : _ref2$showIconAtMenuL,
    TooltipProps = _ref2.TooltipProps,
    moreButtonProps = _ref2.moreButtonProps,
    _ref2$MoreButtonCompo = _ref2.MoreButtonComponent,
    MoreButtonComponent = _ref2$MoreButtonCompo === void 0 ? _springUi.IconButton : _ref2$MoreButtonCompo,
    refMap = _ref2.refMap,
    propsMap = _ref2.propsMap,
    action = _ref2.action,
    forceActionsOpen = _ref2.forceActionsOpen;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var isPlain = variant === 'plain';
  var defaultDisplayCount = isPlain ? buttons.length : 3;
  var displayCount = displayCountProp !== null && displayCountProp !== void 0 ? displayCountProp : defaultDisplayCount;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchor = _useState2[0],
    setMenuAnchor = _useState2[1];
  var _useMemo = (0, _react.useMemo)(function () {
      var moreThenMaxDisplay = buttons.length > displayCount;
      if (!moreThenMaxDisplay) {
        return {
          visibleActions: buttons,
          menuActions: []
        };
      }

      // one space for the menu button
      var splitCount = displayCount - 1;
      return {
        visibleActions: buttons.slice(0, splitCount),
        menuActions: buttons.slice(splitCount)
      };
    }, [buttons, displayCount]),
    visibleActions = _useMemo.visibleActions,
    menuActions = _useMemo.menuActions;
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    keepActions = _useState4[0],
    setKeepActions = _useState4[1];

  // State for visible button submenus
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    visibleSubmenuAnchor = _useState6[0],
    setVisibleSubmenuAnchor = _useState6[1];
  var visibleActionButtons = visibleActions.map(function (_ref3) {
    var actionType = _ref3.actionType,
      _ref3$Component = _ref3.Component,
      Component = _ref3$Component === void 0 ? _springUi.IconButton : _ref3$Component,
      label = _ref3.label,
      tooltip = _ref3.tooltip,
      isSubmenu = _ref3.isSubmenu,
      submenuActions = _ref3.submenuActions,
      onClick = _ref3.onClick,
      rest = _objectWithoutProperties(_ref3, _excluded);
    var combineProps = _objectSpread(_objectSpread(_objectSpread({}, rest), propsMap === null || propsMap === void 0 ? void 0 : propsMap['all']), propsMap === null || propsMap === void 0 ? void 0 : propsMap[actionType]);
    var additionalProps = _objectSpread(_objectSpread({}, combineProps), {}, {
      TooltipProps: _objectSpread(_objectSpread({
        title: tooltip || label
      }, TooltipProps), combineProps.TooltipProps)
    });

    // Handle submenu for visible buttons
    if (isSubmenu && submenuActions && submenuActions.length > 0) {
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({
        key: actionType,
        size: "medium",
        "data-sign": actionType,
        ref: refMap === null || refMap === void 0 ? void 0 : refMap[actionType],
        onClick: function onClick(e) {
          setVisibleSubmenuAnchor({
            anchor: e.currentTarget,
            submenuActions: submenuActions
          });
          setKeepActions === null || setKeepActions === void 0 ? void 0 : setKeepActions(true);
          e.stopPropagation();
        }
      }, additionalProps));
    }
    return /*#__PURE__*/_react["default"].createElement(Component, _extends({
      key: actionType,
      "data-sign": actionType,
      ref: refMap === null || refMap === void 0 ? void 0 : refMap[actionType],
      onClick: onClick
    }, additionalProps));
  });
  var Container = isPlain ? FragmentWrap : _HoverAction.HoverAction;
  var open = Boolean(anchor);

  // TODO: Fix when spring UI supports positioning of Submenus
  //  https://jira_domain/browse/UXSYS-4114
  // Workaround for rendering the submenu in the view.
  // Fix submenu positioning to prevent overflow on the left side of viewport
  (0, _react.useEffect)(function () {
    if (!open) return;
    var fixSubmenuPosition = function fixSubmenuPosition() {
      var leftSubmenus = document.querySelectorAll('.sui-popper-menu[data-sui-popper-placement*="left"]');
      leftSubmenus.forEach(function (element) {
        var htmlElement = element;
        var currentTransform = htmlElement.style.transform;

        // Extract translate3d values: translate3d(x, y, z)
        var match = currentTransform.match(/translate3d\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);
        if (match) {
          var _match = _slicedToArray(match, 4),
            x = _match[1],
            y = _match[2],
            z = _match[3];
          var xValue = parseFloat(x);

          // If X offset is negative, submenu goes off-screen to the left
          // Reset X to 0 to keep submenu within viewport
          if (xValue < 0) {
            htmlElement.style.transform = "translate3d(6px, ".concat(y, ", ").concat(z, ")");
          }
        }
      });
    };

    // Fix positioning immediately after menu opens
    var timer = setTimeout(fixSubmenuPosition, 0);

    // Watch for dynamically added submenus (when user hovers over submenu items)
    var observer = new MutationObserver(fixSubmenuPosition);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style']
    });
    return function () {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [open]);
  var menuList = (0, _react.useMemo)(function () {
    return menuActions.map(function (_ref4) {
      var onClick = _ref4.onClick,
        disabled = _ref4.disabled,
        label = _ref4.label,
        symbol = _ref4.symbol,
        actionType = _ref4.actionType,
        isSubmenu = _ref4.isSubmenu,
        submenuActions = _ref4.submenuActions;
      // Render as SubMenu if isSubmenu is true and submenuActions are provided
      if (isSubmenu && submenuActions && submenuActions.length > 0) {
        return /*#__PURE__*/_react["default"].createElement(_springUi.SubMenu, {
          key: actionType,
          "data-sign": actionType,
          itemContent: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showIconAtMenuList && /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
            size: "small",
            symbol: symbol
          }), /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, label)),
          className: "h-8 px-1",
          classes: {
            container: 'py-0 h-8 min-h-0'
          }
        }, submenuActions.map(function (action) {
          return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, _extends({
            key: action.actionType,
            onClick: action.onClick,
            disabled: action.disabled,
            "data-sign": action.actionType
          }, propsMap === null || propsMap === void 0 ? void 0 : propsMap['all'], propsMap === null || propsMap === void 0 ? void 0 : propsMap[actionType]), action.customIcon ? action.customIcon : action.symbol ? /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
            size: "small",
            symbol: action.symbol
          }) : null, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, action.label));
        }));
      }

      // Regular MenuItem for non-submenu items
      return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, _extends({
        key: actionType,
        disabled: disabled,
        "data-sign": actionType,
        onClick: onClick,
        classes: {
          root: 'h-8 px-1',
          container: 'py-0 h-8 min-h-0'
        }
      }, propsMap === null || propsMap === void 0 ? void 0 : propsMap['all'], propsMap === null || propsMap === void 0 ? void 0 : propsMap[actionType]), showIconAtMenuList && /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
        size: "small",
        symbol: symbol
      }), /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, label));
    });
  }, [menuActions, propsMap, showIconAtMenuList]);
  var menu = (0, _react.useMemo)(function () {
    if (listVariant === 'drawer') {
      return /*#__PURE__*/_react["default"].createElement(_Drawer.Drawer, {
        bodyProps: {
          'data-sign': 'moreActionList'
        },
        open: open,
        onClose: function onClose() {
          setMenuAnchor(null);
        }
      }, /*#__PURE__*/_react["default"].createElement(_springUi.List, {
        tabIndex: 0,
        className: "my-2"
      }, menuList));
    }
    return /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
      open: open,
      anchorEl: anchor,
      onClose: function onClose() {
        setMenuAnchor(null);
      },
      onClick: function onClick(e) {
        // TODO: spring-ui issue, when click the backdrop will trigger the onClick event also UXSYS-3892
        e.stopPropagation();
      },
      onExitComplete: function onExitComplete() {
        setKeepActions === null || setKeepActions === void 0 ? void 0 : setKeepActions(false);
      },
      "data-sign": "moreActionList",
      classes: {
        paper: 'py-1'
      }
    }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, {
      nowrap: false
    }, menuList));
  }, [anchor, listVariant, menuList, open]);
  (0, _react.useImperativeHandle)(action, function () {
    return {
      getListOpened: function getListOpened() {
        return open;
      }
    };
  }, [open]);
  if (visibleActions.length === 0 && menuActions.length === 0) return null;
  var render = /*#__PURE__*/_react["default"].createElement(Container, {
    open: keepActions || forceActionsOpen
  }, visibleActionButtons, menuActions.length > 0 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(MoreButtonComponent, _extends({
    shape: "squircle",
    variant: "outlined",
    size: "medium",
    color: 'secondary',
    symbol: _springIcon.OverflowVerticalMd,
    "data-sign": MORE_ACTION_TYPE,
    ref: refMap === null || refMap === void 0 ? void 0 : refMap[MORE_ACTION_TYPE]
  }, moreButtonProps, {
    TooltipProps: _objectSpread(_objectSpread({
      title: t(MORE_ACTION_TYPE)
    }, TooltipProps), moreButtonProps === null || moreButtonProps === void 0 ? void 0 : moreButtonProps.TooltipProps),
    onClick: function onClick(e) {
      var _moreButtonProps$onCl;
      setMenuAnchor(e.currentTarget);
      setKeepActions === null || setKeepActions === void 0 ? void 0 : setKeepActions(true);
      e.stopPropagation();
      moreButtonProps === null || moreButtonProps === void 0 ? void 0 : (_moreButtonProps$onCl = moreButtonProps.onClick) === null || _moreButtonProps$onCl === void 0 ? void 0 : _moreButtonProps$onCl.call(moreButtonProps, e);
    }
  }, propsMap === null || propsMap === void 0 ? void 0 : propsMap[MORE_ACTION_TYPE])), menu));

  // Render visible button submenu
  var visibleSubmenuMenu = visibleSubmenuAnchor && /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
    open: true,
    anchorEl: visibleSubmenuAnchor.anchor,
    onClose: function onClose() {
      setVisibleSubmenuAnchor(null);
      setKeepActions === null || setKeepActions === void 0 ? void 0 : setKeepActions(false);
    },
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, visibleSubmenuAnchor.submenuActions.map(function (action) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      key: action.actionType,
      onClick: function onClick(e) {
        var _action$onClick;
        (_action$onClick = action.onClick) === null || _action$onClick === void 0 ? void 0 : _action$onClick.call(action, e);
        setVisibleSubmenuAnchor(null);
        setKeepActions === null || setKeepActions === void 0 ? void 0 : setKeepActions(false);
      },
      disabled: action.disabled,
      "data-sign": action.actionType
    }, action.customIcon ? action.customIcon : action.symbol ? /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      size: "small",
      symbol: action.symbol
    }) : null, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, action.label));
  }));

  // in test env, render the action type for debug test easier
  if (process.env.NODE_ENV === 'test') {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "actionTypes"
    }, buttons.map(function (b) {
      return b.actionType;
    }).join(',')), render, visibleSubmenuMenu);
  }
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, render, visibleSubmenuMenu);
};
//# sourceMappingURL=ActionMenuList.js.map

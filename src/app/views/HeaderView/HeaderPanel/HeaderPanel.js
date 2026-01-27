"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.define-property.js");
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
exports.HeaderPanel = void 0;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.function.name.js");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../../hooks");
var _Header = require("./Header");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var EMPTY_COMPONENT = function EMPTY_COMPONENT() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
};
var HeaderPanel = exports.HeaderPanel = function HeaderPanel(props) {
  var loginNumber = props.loginNumber,
    userContact = props.userContact,
    userStatus = props.userStatus,
    dndStatus = props.dndStatus,
    onPresenceChange = props.onPresenceChange,
    children = props.children,
    onActionClick = props.onActionClick,
    _props$ContactAvatar = props.ContactAvatar,
    ContactAvatar = _props$ContactAvatar === void 0 ? EMPTY_COMPONENT : _props$ContactAvatar,
    action = props.action;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var actionRef = (0, _react.useRef)(null);
  var currentStatus = (0, _components.usePresenceText)({
    // TODO: spring-ui, after all project migrate to spring-ui, rename this prop to presenceStatus
    presenceStatus: userStatus,
    dndStatus: dndStatus
  });
  var isMountedRef = (0, _springUi.useMountState)();
  var _usePresenceItems = (0, _components.usePresenceItems)({
      // TODO: spring-ui, after all project migrate to spring-ui, rename this prop to presenceStatus
      presenceStatus: userStatus,
      dndStatus: dndStatus,
      onChange: function onChange(type) {
        onPresenceChange === null || onPresenceChange === void 0 ? void 0 : onPresenceChange(type);
        setStatusAnchor(null);

        // TODO: spring inner issue, if close at same time, the menu will shirking
        // also close the full menu when select a status, base on designer requirement
        requestAnimationFrame(function () {
          var _actionRef$current;
          if (isMountedRef.current) (_actionRef$current = actionRef.current) === null || _actionRef$current === void 0 ? void 0 : _actionRef$current.closeMenu();
        });
      },
      divider: false,
      className: 'h-8 p-0'
    }),
    presenceElements = _usePresenceItems.elements,
    selectedItem = _usePresenceItems.selectedItem;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    statusAnchor = _useState2[0],
    setStatusAnchor = _useState2[1];
  var avatarRef = (0, _react.useRef)(null);
  var menuOpened = Boolean(statusAnchor);
  (0, _react.useImperativeHandle)(action, function () {
    return {
      closeMenu: function closeMenu() {
        setStatusAnchor(null);
        requestAnimationFrame(function () {
          var _actionRef$current2;
          if (isMountedRef.current) (_actionRef$current2 = actionRef.current) === null || _actionRef$current2 === void 0 ? void 0 : _actionRef$current2.closeMenu();
        });
      }
    };
  }, [isMountedRef]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col h-full flex-auto overflow-hidden bg-neutral-base"
  }, /*#__PURE__*/_react["default"].createElement(_Header.Header, {
    title: t('phone'),
    action: actionRef,
    menuHeader: /*#__PURE__*/_react["default"].createElement("div", {
      className: "px-3 py-1 typography-descriptor text-neutral-b2 flex items-center h-12"
    }, userContact && /*#__PURE__*/_react["default"].createElement(ContactAvatar, {
      contact: userContact,
      contactName: userContact.name,
      phoneNumber: userContact.phoneNumber,
      size: "medium",
      variant: "squircle",
      "aria-label": "User avatar"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "ml-3 flex-auto overflow-hidden"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "typography-subtitle text-neutral-b0 truncate",
      title: userContact === null || userContact === void 0 ? void 0 : userContact.name
    }, userContact === null || userContact === void 0 ? void 0 : userContact.name), /*#__PURE__*/_react["default"].createElement("p", {
      className: "typography-descriptor text-neutral-b2 truncate",
      title: loginNumber,
      "data-sign": "login-number"
    }, loginNumber))),
    menuList: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.MenuDivider, {
      className: "my-0.5"
    }), /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      autoClose: false,
      "aria-label": "change presence status",
      onClick: function onClick(e) {
        setStatusAnchor(function (prev) {
          return prev ? null : e.currentTarget;
        });
      },
      classes: {
        container: 'gap-3 p-0 min-h-4',
        root: 'px-3 py-2 h-8'
      }
    }, /*#__PURE__*/_react["default"].createElement(_springUi.StatusIndicator, {
      variant: selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.variant
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "typography-subtitleMini truncate",
      title: currentStatus
    }, currentStatus), /*#__PURE__*/_react["default"].createElement("i", {
      className: "flex-auto"
    }), /*#__PURE__*/_react["default"].createElement(_springUi.ExpandCollapseCaret, {
      expanded: !!statusAnchor,
      size: "xsmall"
    })),
    // TODO: spring-ui Menu in test show how never close, so we hide that in test
    (process.env.NODE_ENV === 'test' && menuOpened || process.env.NODE_ENV !== 'test') && /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
      PopperProps: {
        role: 'menu',
        'aria-label': 'presence status list'
      },
      open: menuOpened,
      anchorEl: statusAnchor,
      onClose: function onClose() {
        setStatusAnchor(null);
      }
    }, presenceElements)),
    onActionClick: onActionClick
  }, userContact && /*#__PURE__*/_react["default"].createElement(ContactAvatar, {
    size: "small",
    contact: userContact,
    contactName: userContact.name,
    phoneNumber: userContact.phoneNumber,
    variant: "circle",
    "aria-label": "User avatar",
    "data-presence-status": currentStatus,
    component: 'button',
    showStatusIndicator: true,
    avatarShapeRef: avatarRef,
    IndicatorProps: {
      variant: selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.variant,
      className: 'cursor-pointer',
      'data-sign': 'user-presence',
      onClick: function onClick() {
        var _avatarRef$current;
        // TODO: spring inner issue, the indicator not able to trigger the top level button click event
        (_avatarRef$current = avatarRef.current) === null || _avatarRef$current === void 0 ? void 0 : _avatarRef$current.click();
      }
    }
  })), children);
};
//# sourceMappingURL=HeaderPanel.js.map

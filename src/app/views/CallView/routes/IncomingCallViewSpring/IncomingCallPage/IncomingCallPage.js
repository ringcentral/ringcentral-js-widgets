"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
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
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallPage = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/micro-auth/src/app/components");
var _components2 = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components3 = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _framerMotion = require("framer-motion");
var _react = _interopRequireWildcard(require("react"));
var _components4 = require("../../../../../components");
var _hooks2 = require("../../../../../hooks");
var _services = require("../../../../../services");
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["TooltipProps", "className", "Component"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var MinComponent = function MinComponent(_ref) {
  var TooltipProps = _ref.TooltipProps,
    className = _ref.className,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? _springUi.IconButton : _ref$Component,
    itemRest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_components4.CallButtonContainer, {
    size: "large",
    className: className,
    label: (TooltipProps === null || TooltipProps === void 0 ? void 0 : TooltipProps.title) || ''
  }, /*#__PURE__*/_react["default"].createElement(Component, _extends({
    size: "xlarge"
  }, itemRest)));
};
var Minimized = function Minimized(_ref2) {
  var call = _ref2.call,
    onMinimized = _ref2.onMinimized,
    showCloseButton = _ref2.showCloseButton,
    onAction = _ref2.onAction,
    children = _ref2.children,
    classes = _ref2.classes;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useContactRenderInfo = (0, _hooks2.useContactRenderInfoFromCall)(call, {
      phoneNumberDisplayMode: 'phoneNumber',
      hideBlockedFromInfo: true
    }),
    DisplayName = _useContactRenderInfo.DisplayName,
    Avatar = _useContactRenderInfo.Avatar,
    OnOtherDevice = _useContactRenderInfo.OnOtherDevice;
  var _useAppContentRef = (0, _components2.useAppContentRef)(),
    mainContentRef = _useAppContentRef.mainContentRef;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('fixed top-0 left-0 w-full h-full pointer-events-none z-modal', classes === null || classes === void 0 ? void 0 : classes.miniContainer),
    "aria-label": "Incoming call popup"
  }, /*#__PURE__*/_react["default"].createElement(_framerMotion.motion.div, {
    drag: true,
    dragConstraints: mainContentRef,
    dragTransition: {
      power: 0
    },
    "data-sign": "IncomingCallCard",
    className: "absolute top-0 left-0 p-3 w-full pointer-events-auto",
    "data-draggable": true,
    ref:
    // in test env, set boundary to the main content ref for check the drag boundary
    process.env.NODE_ENV === 'test' ? function (elm) {
      if (elm) {
        var _mainContentRef$curre, _mainContentRef$curre2, _mainContentRef$curre3, _mainContentRef$curre4;
        elm.dataset.boundary = JSON.stringify({
          top: (_mainContentRef$curre = mainContentRef.current) === null || _mainContentRef$curre === void 0 ? void 0 : _mainContentRef$curre.clientTop,
          left: (_mainContentRef$curre2 = mainContentRef.current) === null || _mainContentRef$curre2 === void 0 ? void 0 : _mainContentRef$curre2.clientLeft,
          right: (_mainContentRef$curre3 = mainContentRef.current) === null || _mainContentRef$curre3 === void 0 ? void 0 : _mainContentRef$curre3.style.width,
          bottom: (_mainContentRef$curre4 = mainContentRef.current) === null || _mainContentRef$curre4 === void 0 ? void 0 : _mainContentRef$curre4.style.height
        });
      }
    } : undefined
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-neutral-base rounded-sui-sm shadow-sui-md border border-neutral-b4 overflow-hidden py-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex px-3"
  }, /*#__PURE__*/_react["default"].createElement(Avatar, {
    size: "xlarge"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
    primary: /*#__PURE__*/_react["default"].createElement(DisplayName, {
      displayControl: {
        viewable: true
      }
    }),
    "data-sign": "callInfoLabel",
    secondary: /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center flex-nowrap gap-1"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      "data-sign": "secondary-info"
    }, t('incomingCall')), OnOtherDevice && /*#__PURE__*/_react["default"].createElement(OnOtherDevice, {
      mode: "icon"
    }))
  }), /*#__PURE__*/_react["default"].createElement("i", {
    className: "flex-auto"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    symbol: _springIcon.FullScreenMd,
    size: "xsmall",
    iconSize: "medium",
    variant: "icon",
    color: "secondary",
    "data-sign": "expand-button",
    onClick: function onClick() {
      return onMinimized(false);
    }
  }), showCloseButton && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("i", {
    className: "ml-4"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    symbol: _springIcon.Xmd,
    size: "xsmall",
    iconSize: "medium",
    variant: "icon",
    color: "secondary",
    "data-sign": "close-button",
    onClick: function onClick() {
      return onAction('back');
    }
  }))), /*#__PURE__*/_react["default"].createElement("div", null, children))));
};
var Expanded = function Expanded(_ref3) {
  var call = _ref3.call,
    onAction = _ref3.onAction,
    expanded = _ref3.expanded,
    onExpand = _ref3.onExpand,
    children = _ref3.children;
  var _useLocale2 = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale2.t;
  var _useContactRenderInfo2 = (0, _hooks2.useContactRenderInfoFromCall)(call, {
      phoneNumberDisplayMode: 'unknown',
      hideBlockedFromInfo: true
    }),
    DisplayName = _useContactRenderInfo2.DisplayName,
    displayPhoneNumber = _useContactRenderInfo2.displayPhoneNumber,
    Avatar = _useContactRenderInfo2.Avatar,
    myCallerId = _useContactRenderInfo2.myCallerId,
    callQueueName = _useContactRenderInfo2.callQueueName,
    OnOtherDevice = _useContactRenderInfo2.OnOtherDevice;
  return (
    /*#__PURE__*/
    // <FocusTrap open>
    _react["default"].createElement("div", {
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex: 0,
      "data-sign": "IncomingCallPage",
      className: "flex flex-col absolute z-drawer top-0 left-0 bg-neutral-base size-full"
    }, /*#__PURE__*/_react["default"].createElement(_components3.PageHeader, {
      className: "h-12",
      onBackClick: function onBackClick() {
        return onAction('back');
      },
      endAdornment:
      // queue call will not show expand button in incoming page
      onExpand && typeof expanded === 'boolean' && !(0, _services.isQueueCall)(call) ? /*#__PURE__*/_react["default"].createElement(_components4.ExpandLogButton, {
        expanded: expanded,
        onExpand: onExpand,
        "data-sign": expanded ? 'folded' : 'unfolded'
      }) : undefined
    }), /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "callerInfo"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "mt-6 flex justify-center"
    }, /*#__PURE__*/_react["default"].createElement(Avatar, {
      size: "xxlarge"
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-auto flex flex-col gap-2 justify-center items-center mt-6 px-6 w-full",
      "data-sign": "callInfo"
    }, /*#__PURE__*/_react["default"].createElement("h2", {
      className: "typography-display2 truncate w-full text-center flex flex-col items-center gap-1",
      "data-sign": "callerName"
    }, /*#__PURE__*/_react["default"].createElement(DisplayName, {
      displayControl: {
        maybe: true,
        viewable: true,
        matchCounts: true,
        align: 'center'
      }
    })), displayPhoneNumber && /*#__PURE__*/_react["default"].createElement("p", {
      className: "typography-mainText",
      "data-sign": "callFromNumber"
    }, displayPhoneNumber), OnOtherDevice && /*#__PURE__*/_react["default"].createElement(OnOtherDevice, null), !callQueueName && myCallerId && /*#__PURE__*/_react["default"].createElement("p", {
      className: "typography-descriptorMini text-neutral-b2",
      "data-sign": "callToNumber"
    }, t('to'), ": ", myCallerId))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-col justify-center items-center mt-6"
    }, children), /*#__PURE__*/_react["default"].createElement(_components2.AppFooterNav, null)) // </FocusTrap>);
  );
};
var IncomingCallPage = exports.IncomingCallPage = function IncomingCallPage(props) {
  var actions = props.actions,
    minimized = props.minimized,
    mode = props.mode,
    forwardingNumbers = props.forwardingNumbers,
    onAction = props.onAction;
  var multiple = mode === 'multiple';
  var queue = mode === 'queue';
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    forwardOpen = _useState2[0],
    setForwardOpen = _useState2[1];
  var actionButtons = (0, _hooks2.useCallActionButtons)(actions, onAction);
  var buttons = (0, _react.useMemo)(function () {
    return actionButtons.map(function (button) {
      var Original = button.Component;
      return _objectSpread(_objectSpread({}, button), {}, {
        Component: Original ? function (props) {
          return /*#__PURE__*/_react["default"].createElement(MinComponent, _extends({
            Component: Original
          }, props));
        } : MinComponent
      });
    });
  }, [actionButtons]);
  var actionMenuList = (0, _react.useMemo)(function () {
    if (multiple) {
      var _onlyOneButton = buttons.length === 1;
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "multipleCallActions",
        className: (0, _clsx["default"])('grid', _onlyOneButton ? 'grid-cols-1' : 'grid-cols-6', minimized ? 'gap-y-4' : 'gap-y-6 w-11/12')
      }, /*#__PURE__*/_react["default"].createElement(_components3.ActionMenuList, {
        variant: "plain",
        listVariant: "drawer",
        buttons: buttons,
        displayCount: 5,
        MoreButtonComponent: MinComponent,
        moreButtonProps: {
          size: minimized ? 'small' : 'xxxlarge',
          shape: 'circular',
          variant: 'outlined',
          symbol: _springIcon.OverflowMd
        },
        propsMap: {
          ignore: {
            size: minimized ? 'large' : 'xlarge',
            className: 'col-start-2 col-span-2 order-1'
          },
          more: {
            size: minimized ? 'large' : 'xlarge',
            className: 'col-start-4 col-span-2 order-1'
          },
          endAndAnswer: {
            size: minimized ? 'large' : 'xlarge',
            className: 'col-span-2 order-2'
          },
          voicemail: {
            size: minimized ? 'xlarge' : 'xxxlarge',
            iconSize: 'large',
            className: 'col-span-2 order-2'
          },
          holdAndAnswer: {
            size: minimized ? 'large' : 'xlarge',
            className: 'col-span-2 order-2'
          },
          forward: {
            onClick: function onClick() {
              setForwardOpen(true);
            }
          }
        }
      }));
    }
    var twoColumnLayout = !minimized && buttons.length > 1;
    var minimizedTwoColumn = minimized && buttons.length === 2;
    var onlyOneButton = buttons.length === 1;
    return /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "singleCallActions",
      className: (0, _clsx["default"])(twoColumnLayout ? 'grid grid-cols-2' : "pt-3 px-3 flex flex-row\n              ".concat(onlyOneButton ? 'justify-center' : minimizedTwoColumn ? 'justify-center gap-2' : 'justify-between'), {
        'w-3/4 mt-16': !minimized && queue,
        'w-3/4 gap-y-6': !minimized && !queue
      })
    }, minimizedTwoColumn && /*#__PURE__*/_react["default"].createElement("div", null), /*#__PURE__*/_react["default"].createElement(_components3.ActionMenuList, {
      variant: "plain",
      listVariant: "drawer",
      buttons: buttons,
      displayCount: 4,
      MoreButtonComponent: MinComponent,
      moreButtonProps: {
        size: 'xlarge',
        shape: 'circular',
        variant: 'outlined',
        symbol: _springIcon.OverflowMd
      },
      propsMap: _objectSpread(_objectSpread({}, minimized ? undefined : {
        ignoreQueue: {
          size: 'xxxlarge',
          iconSize: 'large',
          className: 'order-1'
        },
        ignore: {
          size: 'xxxlarge',
          iconSize: 'large',
          className: 'order-1'
        },
        more: {
          size: 'xxxlarge',
          iconSize: 'large',
          className: 'order-1'
        },
        voicemail: {
          size: 'xxxlarge',
          iconSize: 'large',
          className: 'order-2'
        },
        answer: {
          size: 'xxxlarge',
          iconSize: 'large',
          className: 'order-2'
        }
      }), {}, {
        forward: {
          onClick: function onClick() {
            setForwardOpen(true);
          }
        }
      })
    }), minimizedTwoColumn && /*#__PURE__*/_react["default"].createElement("div", null));
  }, [buttons, minimized, multiple, queue]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, minimized ?
  /*#__PURE__*/
  // use portal to render the minimized view to avoid the z-index issue
  _react["default"].createElement(_springUi.Portal, null, /*#__PURE__*/_react["default"].createElement(Minimized, props, actionMenuList)) : /*#__PURE__*/_react["default"].createElement(Expanded, props, actionMenuList), /*#__PURE__*/_react["default"].createElement(_components3.Drawer, {
    open: forwardOpen,
    onClose: function onClose() {
      setForwardOpen(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_springUi.List, {
    tabIndex: 0,
    className: "my-2",
    "data-sign": "forwardList"
  }, forwardingNumbers.map(function (item) {
    var isCustomOption = item.phoneNumber === 'custom';
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      onClick: function onClick() {
        if (isCustomOption) {
          onAction('forward');
          return;
        }
        onAction('startForward', item.phoneNumber);
        setForwardOpen(false);
      },
      key: item.phoneNumber,
      "data-value": item.phoneNumber,
      "data-sign": item.phoneNumber
    }, /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
      primary: item.label,
      secondary: isCustomOption ? undefined : /*#__PURE__*/_react["default"].createElement(_components.FormattedPhoneNumber, {
        phoneNumber: item.phoneNumber
      })
    }));
  }))));
};
//# sourceMappingURL=IncomingCallPage.js.map

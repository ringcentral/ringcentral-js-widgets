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
exports.MainViewPanel = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.regexp.exec.js");
var _Tooltip = require("@ringcentral-integration/widgets/components/Rcui/Tooltip");
var _TabNavigationView = _interopRequireDefault(require("@ringcentral-integration/widgets/components/TabNavigationView"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _iconPvcConnecting = _interopRequireDefault(require("../../assets/icons/icon-pvc-connecting.svg"));
var _iconPvcDisabled = _interopRequireDefault(require("../../assets/icons/icon-pvc-disabled.svg"));
var _iconPvcDisconnecting = _interopRequireDefault(require("../../assets/icons/icon-pvc-disconnecting.svg"));
var _iconPvcOff = _interopRequireDefault(require("../../assets/icons/icon-pvc-off.svg"));
var _iconPvcOn = _interopRequireDefault(require("../../assets/icons/icon-pvc-on.svg"));
var _WorkingStateSelect = require("./WorkingStateSelect");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var CustomIcon = function CustomIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, _extends({
    className: _styles["default"].icon
  }, props));
};
var MainViewPanel = exports.MainViewPanel = function MainViewPanel(_ref) {
  var currentPath = _ref.currentPath,
    goTo = _ref.goTo,
    agentStates = _ref.agentStates,
    changeWorkingState = _ref.changeWorkingState,
    currentStateIndex = _ref.currentStateIndex,
    getStateColor = _ref.getStateColor,
    handleWithIntervalTime = _ref.handleWithIntervalTime,
    stateText = _ref.stateText,
    time = _ref.time,
    getTimerText = _ref.getTimerText,
    disabled = _ref.disabled,
    children = _ref.children,
    currentLocale = _ref.currentLocale,
    isOffHookDisable = _ref.isOffHookDisable,
    offhookState = _ref.offhookState,
    offhook = _ref.offhook,
    isWide = _ref.isWide,
    isOffhooking = _ref.isOffhooking,
    hideOffHookBtn = _ref.hideOffHookBtn;
  var tabs = [{
    icon: function icon() {
      return /*#__PURE__*/_react["default"].createElement(CustomIcon, {
        symbol: _junoIcon.PhoneBorder
      });
    },
    activeIcon: function activeIcon() {
      return /*#__PURE__*/_react["default"].createElement(CustomIcon, {
        symbol: _junoIcon.Phone
      });
    },
    label: _i18n["default"].getString('dialpadLabel', currentLocale),
    path: '/dialer',
    isActive: function isActive(currentPath) {
      return currentPath === '/dialer' || /^\/activityCallLog/.test(currentPath);
    },
    className: _styles["default"].tab
  }, {
    icon: function icon() {
      return /*#__PURE__*/_react["default"].createElement(CustomIcon, {
        symbol: _junoIcon.TimeBorder
      });
    },
    activeIcon: function activeIcon() {
      return /*#__PURE__*/_react["default"].createElement(CustomIcon, {
        symbol: _junoIcon.Time
      });
    },
    label: _i18n["default"].getString('historyLabel', currentLocale),
    path: '/history',
    isActive: function isActive(currentPath) {
      return /^\/history/.test(currentPath);
    },
    className: _styles["default"].tab
  }, {
    icon: function icon() {
      return /*#__PURE__*/_react["default"].createElement(CustomIcon, {
        symbol: _junoIcon.SettingsBorder
      });
    },
    activeIcon: function activeIcon() {
      return /*#__PURE__*/_react["default"].createElement(CustomIcon, {
        symbol: _junoIcon.Settings
      });
    },
    label: _i18n["default"].getString('settingsLabel', currentLocale),
    path: '/settings',
    isActive: function isActive(currentPath) {
      return /^\/settings/.test(currentPath);
    },
    className: _styles["default"].tab
  }];
  var offHookIcon = (0, _react.useMemo)(function () {
    var className;
    var symbol;
    var title;
    if (isOffHookDisable && !isOffhooking) {
      className = _styles["default"].offHookIcon;
      symbol = _iconPvcDisabled["default"];
      title = _i18n["default"].getString('disabled', currentLocale);
    } else {
      switch (offhookState) {
        case 'connecting':
          className = _styles["default"].loading;
          symbol = _iconPvcConnecting["default"];
          title = _i18n["default"].getString('disabled', currentLocale);
          break;
        case 'disconnecting':
          className = _styles["default"].loading;
          symbol = _iconPvcDisconnecting["default"];
          title = _i18n["default"].getString('disabled', currentLocale);
          break;
        case 'disconnected':
          className = _styles["default"].offHookIcon;
          symbol = _iconPvcOff["default"];
          title = _i18n["default"].getString('turnOn', currentLocale);
          break;
        case 'connected':
        default:
          className = _styles["default"].offHookIcon;
          symbol = _iconPvcOn["default"];
          title = _i18n["default"].getString('turnOff', currentLocale);
      }
    }
    return /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
      title: title
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      className: className,
      symbol: symbol
    }));
  }, [offhookState, isOffHookDisable]);
  return /*#__PURE__*/_react["default"].createElement(_TabNavigationView["default"], {
    goTo: goTo,
    currentPath: currentPath,
    tabNavigationViewClassName: _styles["default"].tabNavigationView,
    navBarClassName: _styles["default"].navigationBar,
    className: _styles["default"].mainView,
    tabs: tabs
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].header
  }, /*#__PURE__*/_react["default"].createElement(_WorkingStateSelect.WorkingStateSelect, {
    handleWithIntervalTime: handleWithIntervalTime,
    getTimerText: getTimerText,
    time: time,
    stateText: stateText,
    getStateColor: getStateColor,
    currentStateIndex: currentStateIndex,
    changeWorkingState: changeWorkingState,
    agentStates: agentStates,
    disabled: disabled,
    isWide: isWide,
    hideOffHookBtn: hideOffHookBtn
  }), !hideOffHookBtn && /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])([_styles["default"].offHookState, isOffHookDisable ? _styles["default"].disabled : _styles["default"].enabled]),
    onClick: isOffHookDisable ? null : offhook
  }, offHookIcon)), children);
};
//# sourceMappingURL=MainViewPanel.js.map

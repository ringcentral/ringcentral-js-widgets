"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainViewPanel = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Tooltip = require("@ringcentral-integration/widgets/components/Rcui/Tooltip");

var _TabNavigationView = _interopRequireDefault(require("@ringcentral-integration/widgets/components/TabNavigationView"));

var _Icon = require("@ringcentral/juno/es6/components/Icon/Icon.js");

var _Phone = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Phone.js"));

var _PhoneBorder = _interopRequireDefault(require("@ringcentral/juno/es6/icon/PhoneBorder.js"));

var _Settings = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Settings.js"));

var _SettingsBorder = _interopRequireDefault(require("@ringcentral/juno/es6/icon/SettingsBorder.js"));

var _Time = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Time.js"));

var _TimeBorder = _interopRequireDefault(require("@ringcentral/juno/es6/icon/TimeBorder.js"));

var _iconPvcConnecting = _interopRequireDefault(require("../../assets/icons/icon-pvc-connecting.svg"));

var _iconPvcDisabled = _interopRequireDefault(require("../../assets/icons/icon-pvc-disabled.svg"));

var _iconPvcDisconnecting = _interopRequireDefault(require("../../assets/icons/icon-pvc-disconnecting.svg"));

var _iconPvcOff = _interopRequireDefault(require("../../assets/icons/icon-pvc-off.svg"));

var _iconPvcOn = _interopRequireDefault(require("../../assets/icons/icon-pvc-on.svg"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _WorkingStateSelect = require("./WorkingStateSelect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var CustomIcon = function CustomIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_Icon.RcIcon, _extends({
    className: _styles["default"].icon
  }, props));
};

var MainViewPanel = function MainViewPanel(_ref) {
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
        symbol: _PhoneBorder["default"]
      });
    },
    activeIcon: function activeIcon() {
      return /*#__PURE__*/_react["default"].createElement(CustomIcon, {
        symbol: _Phone["default"]
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
        symbol: _TimeBorder["default"]
      });
    },
    activeIcon: function activeIcon() {
      return /*#__PURE__*/_react["default"].createElement(CustomIcon, {
        symbol: _Time["default"]
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
        symbol: _SettingsBorder["default"]
      });
    },
    activeIcon: function activeIcon() {
      return /*#__PURE__*/_react["default"].createElement(CustomIcon, {
        symbol: _Settings["default"]
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
    }, /*#__PURE__*/_react["default"].createElement(_Icon.RcIcon, {
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
    className: (0, _classnames["default"])([_styles["default"].offHookState, isOffHookDisable ? _styles["default"].disabled : _styles["default"].enabled]),
    onClick: isOffHookDisable ? null : offhook
  }, offHookIcon)), children);
};

exports.MainViewPanel = MainViewPanel;
//# sourceMappingURL=MainViewPanel.js.map

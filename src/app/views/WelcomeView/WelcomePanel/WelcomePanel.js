"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WelcomePanel = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Skeleton = function Skeleton() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    role: "status"
    // total be 25px, same as the line-height of typography-title
    ,
    className: "my-[6.5px] h-3 bg-neutral-b0/10 rounded-full animate-pulse"
  });
};
var WelcomePanel = exports.WelcomePanel = function WelcomePanel(_ref) {
  var logoUrl = _ref.logoUrl,
    onGetStart = _ref.onGetStart,
    onCopy = _ref.onCopy,
    _ref$infos = _ref.infos,
    infos = _ref$infos === void 0 ? [] : _ref$infos,
    userName = _ref.userName;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;

  // use AppFooter for toast position calculation
  var _useAppFooter = (0, _components.useAppFooter)({
      defaultFooter: /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex-none p-4"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
        color: "primary",
        size: "xlarge",
        className: "rounded-2xl",
        variant: "contained",
        onClick: onGetStart,
        "data-sign": "startButton",
        fullWidth: true
      }, t('getStart'), /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
        symbol: _springIcon.ArrowRightMd,
        size: "large",
        className: "ml-2"
      }))),
      additionalFooterHeight: -16
    }),
    footer = _useAppFooter.footer;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "size-full flex flex-col overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-4 overflow-auto"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col items-center text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-10"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: logoUrl,
    alt: "logo",
    className: "h-[26px]"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-6 mb-4"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-2xl typography-mainText mb-4"
  }, t('welcome', {
    name: userName || ''
  })), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-neutral-b2 typography-subtitle"
  }, t('accountReady')))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-3 mb-3"
  }, infos.map(function (info, index) {
    if ('loading' in info) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index,
        className: "h-[110px] bg-neutral-b0/10 rounded-3xl animate-pulse"
      });
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: (0, _clsx["default"])(info.bgColor, 'rounded-3xl flex items-center h-[110px]'),
      "data-sign": info.title
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      symbol: info.icon,
      size: "xlarge",
      className: (0, _clsx["default"])(info.iconColor, 'px-6')
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-neutral-b0 space-y-1"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "typography-subtitle text-neutral-b2"
    }, info.title, ":"), info.mainText ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "typography-title"
    }, info.mainText) : /*#__PURE__*/_react["default"].createElement(Skeleton, null), info.subText ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "typography-title"
    }, info.subText) :
    // only when be empty should show the loading effect
    info.subText === '' ? /*#__PURE__*/_react["default"].createElement(Skeleton, null) : null));
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "contained",
    color: "secondary",
    fullWidth: true,
    startIcon: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      symbol: _springIcon.CopyMd,
      size: "small"
    }),
    onClick: onCopy
  }, t('copy')))), /*#__PURE__*/_react["default"].createElement("i", {
    className: "flex-auto"
  }), footer);
};
//# sourceMappingURL=WelcomePanel.js.map

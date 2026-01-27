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
exports.AutoCallLoggingSwitchLineItem = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var AutoCallLoggingSwitchLineItem = exports.AutoCallLoggingSwitchLineItem = function AutoCallLoggingSwitchLineItem(_ref) {
  var isAdmin = _ref.isAdmin,
    remoteAutoLog = _ref.remoteAutoLog,
    localAutoLog = _ref.localAutoLog,
    onChange = _ref.onChange,
    onAutoCallLogSettingLinkClick = _ref.onAutoCallLogSettingLinkClick,
    featureEnabled = _ref.featureEnabled,
    disableAutoLogControl = _ref.disableAutoLogControl;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var externalLinkTitle = (0, _react.useMemo)(function () {
    if (remoteAutoLog) return isAdmin ? t('adminLinkTitle') : t('seeAdminConfigurations');
    return t('endUserLinkTitle');
  }, [remoteAutoLog, isAdmin, t]);
  return /*#__PURE__*/_react["default"].createElement(_components.SwitchLine, {
    "data-sign": "AutoLogCall",
    checked:
    // when server side AAL is enabled, the switch line item should be checked
    remoteAutoLog || localAutoLog,
    disabled: remoteAutoLog || disableAutoLogControl,
    onChange: onChange
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-1"
  }, t('autoLogCalls'), remoteAutoLog && /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
    title: t('autoLogCallTooltipText')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    "data-sign": "AutoLogCall_tooltip",
    size: "small",
    symbol: _springIcon.InfoMd,
    onClick: function onClick(e) {
      e.preventDefault();
    }
  }))), featureEnabled && /*#__PURE__*/_react["default"].createElement(_springUi.Link, {
    onClick: onAutoCallLogSettingLinkClick,
    "data-sign": "aal-external-link",
    className: "flex items-center gap-1 mt-1 typography-descriptor"
  }, externalLinkTitle)));
};
//# sourceMappingURL=AutoCallLoggingSwitchLineItem.js.map

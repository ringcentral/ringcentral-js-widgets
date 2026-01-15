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
exports.useConversationTabData = useConversationTabData;
var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));
var _react = _interopRequireWildcard(require("react"));
var _TabTitle = require("./TabTitle");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function useConversationTabData(_ref) {
  var currentLocale = _ref.currentLocale,
    readVoicemailPermission = _ref.readVoicemailPermission,
    voiceUnreadCounts = _ref.voiceUnreadCounts,
    readFaxPermission = _ref.readFaxPermission,
    faxUnreadCounts = _ref.faxUnreadCounts,
    readTextPermission = _ref.readTextPermission,
    textUnreadCounts = _ref.textUnreadCounts;
  return (0, _react.useMemo)(function () {
    var tabs = [{
      icon: /*#__PURE__*/_react["default"].createElement(_TabTitle.TabTitle, {
        type: _messageTypes["default"].all,
        currentLocale: currentLocale
      }),
      label: _i18n["default"].getString(_messageTypes["default"].all, currentLocale),
      path: _messageTypes["default"].all,
      isActive: function isActive(path) {
        return path === _messageTypes["default"].all;
      }
    }];
    readVoicemailPermission && tabs.push({
      icon: /*#__PURE__*/_react["default"].createElement(_TabTitle.TabTitle, {
        type: _messageTypes["default"].voiceMail,
        currentLocale: currentLocale
      }),
      label: _i18n["default"].getString(_messageTypes["default"].voiceMail, currentLocale),
      path: _messageTypes["default"].voiceMail,
      isActive: function isActive(path) {
        return path === _messageTypes["default"].voiceMail;
      },
      noticeCounts: voiceUnreadCounts
    });
    readFaxPermission && tabs.push({
      icon: /*#__PURE__*/_react["default"].createElement(_TabTitle.TabTitle, {
        type: _messageTypes["default"].fax,
        currentLocale: currentLocale
      }),
      label: _i18n["default"].getString(_messageTypes["default"].fax, currentLocale),
      path: _messageTypes["default"].fax,
      isActive: function isActive(path) {
        return path === _messageTypes["default"].fax;
      },
      noticeCounts: faxUnreadCounts
    });
    readTextPermission && tabs.push({
      icon: /*#__PURE__*/_react["default"].createElement(_TabTitle.TabTitle, {
        type: _messageTypes["default"].text,
        currentLocale: currentLocale
      }),
      label: _i18n["default"].getString(_messageTypes["default"].text, currentLocale),
      path: _messageTypes["default"].text,
      isActive: function isActive(path) {
        return path === _messageTypes["default"].text;
      },
      noticeCounts: textUnreadCounts
    });
    return tabs;
  }, [currentLocale, faxUnreadCounts, readFaxPermission, readTextPermission, readVoicemailPermission, textUnreadCounts, voiceUnreadCounts]);
}
//# sourceMappingURL=useConversationTabData.js.map

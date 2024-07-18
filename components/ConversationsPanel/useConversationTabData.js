"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConversationTabData = useConversationTabData;
var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));
var _react = _interopRequireWildcard(require("react"));
var _TabTitle = require("./TabTitle");
var _i18n = _interopRequireDefault(require("./i18n"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
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

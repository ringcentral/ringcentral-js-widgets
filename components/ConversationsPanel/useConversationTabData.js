"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConversationTabData = useConversationTabData;
var _react = _interopRequireWildcard(require("react"));
var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _TabTitle = require("./TabTitle");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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

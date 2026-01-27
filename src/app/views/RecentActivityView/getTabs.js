"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabs = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
var _DynamicsFont = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/DynamicsFont/DynamicsFont.scss"));
var _Fax = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/Fax.svg"));
var _VoicemailIcon = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/VoicemailIcon.svg"));
var _RecentActivityCalls2 = _interopRequireDefault(require("@ringcentral-integration/widgets/components/RecentActivityCalls"));
var _RecentActivityMessages2 = _interopRequireDefault(require("@ringcentral-integration/widgets/components/RecentActivityMessages"));
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// TODO: fix type
var RecentActivityCalls = _RecentActivityCalls2["default"];
var RecentActivityMessages = _RecentActivityMessages2["default"];
// TODO: move to components folder

var getTabs = exports.getTabs = function getTabs(_ref) {
  var ready = _ref.ready,
    currentLocale = _ref.currentLocale,
    dateTimeFormatter = _ref.dateTimeFormatter,
    navigateTo = _ref.navigateTo,
    recentMessages = _ref.recentMessages,
    recentCalls = _ref.recentCalls,
    currentContact = _ref.currentContact,
    sessionId = _ref.sessionId,
    showRecentCalls = _ref.showRecentCalls,
    showRecentMessage = _ref.showRecentMessage,
    showFax = _ref.showFax,
    showVoiceMails = _ref.showVoiceMails;
  if (!ready) return [];
  var messages = [];
  var calls = [];
  if (currentContact && currentContact.id) {
    var contactId = currentContact.id;
    var activityCardId = sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId;
    if (recentMessages === null || recentMessages === void 0 ? void 0 : recentMessages.messages[activityCardId]) {
      messages = recentMessages.messages[activityCardId];
    }
    if (recentCalls.calls[activityCardId]) {
      calls = recentCalls.calls[activityCardId];
    }
  }
  return [showVoiceMails ? {
    icon: /*#__PURE__*/_react["default"].createElement(_VoicemailIcon["default"], {
      width: 21,
      height: 21
    }),
    label: (0, _i18n.t)('voicemail'),
    path: 'voicemails',
    isActive: function isActive(path) {
      return path === 'voicemails';
    },
    view: null,
    getData: function getData() {
      //
    },
    cleanUp: function cleanUp() {
      //
    }
  } : null, showRecentMessage && recentMessages ? {
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: _DynamicsFont["default"].composeText
    }),
    label: (0, _i18n.t)('text'),
    path: 'recentMessages',
    isActive: function isActive(path) {
      return path === 'recentMessages';
    },
    view: /*#__PURE__*/_react["default"].createElement(RecentActivityMessages, {
      messages: messages,
      navigateTo: navigateTo,
      dateTimeFormatter: dateTimeFormatter,
      currentLocale: currentLocale,
      isMessagesLoaded: recentMessages.isMessagesLoaded
    }),
    getData: function getData() {
      recentMessages.getMessages({
        currentContact: currentContact,
        sessionId: sessionId
      });
    },
    cleanUp: function cleanUp() {
      return recentMessages.cleanUpMessages({
        contact: currentContact,
        sessionId: sessionId
      });
    }
  } : null, showFax ? {
    icon: /*#__PURE__*/_react["default"].createElement(_Fax["default"], {
      width: 21,
      height: 21
    }),
    label: (0, _i18n.t)('fax'),
    path: 'faxes',
    isActive: function isActive(path) {
      return path === 'faxes';
    },
    view: null,
    getData: function getData() {
      //
    },
    cleanUp: function cleanUp() {
      //
    }
  } : null, showRecentCalls ? {
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: _DynamicsFont["default"].active
    }),
    label: (0, _i18n.t)('call'),
    path: 'recentCalls',
    isActive: function isActive(path) {
      return path === 'recentCalls';
    },
    view: /*#__PURE__*/_react["default"].createElement(RecentActivityCalls, {
      calls: calls,
      dateTimeFormatter: dateTimeFormatter,
      currentLocale: currentLocale,
      isCallsLoaded: recentCalls.isCallsLoaded
    }),
    getData: function getData() {
      recentCalls.getCalls({
        currentContact: currentContact,
        sessionId: sessionId
      });
    },
    cleanUp: function cleanUp() {
      return recentCalls.cleanUpCalls({
        contact: currentContact,
        sessionId: sessionId
      });
    }
  } : null].filter(function (item) {
    return item !== null;
  });
};
//# sourceMappingURL=getTabs.js.map

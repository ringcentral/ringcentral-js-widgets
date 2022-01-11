"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackTabsMap = exports.getTabs = void 0;

require("core-js/modules/es6.array.filter");

var _react = _interopRequireDefault(require("react"));

var _Analytics = require("@ringcentral-integration/commons/modules/Analytics");

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _Fax = _interopRequireDefault(require("../../assets/images/Fax.svg"));

var _VoicemailIcon = _interopRequireDefault(require("../../assets/images/VoicemailIcon.svg"));

var _RecentActivityCalls = _interopRequireDefault(require("../../components/RecentActivityCalls"));

var _RecentActivityMessages = _interopRequireDefault(require("../../components/RecentActivityMessages"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var trackTabsMap = {
  recentCalls: _Analytics.trackEvents.clickRecentActivityCall,
  faxes: _Analytics.trackEvents.clickRecentActivityFaxes,
  recentMessages: _Analytics.trackEvents.clickRecentActivitySms,
  voicemails: _Analytics.trackEvents.clickRecentActivityVoicemails
};
exports.trackTabsMap = trackTabsMap;

var getTabs = function getTabs(_ref) {
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

    if (recentMessages.messages[activityCardId]) {
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
    label: _i18n["default"].getString('voicemail', currentLocale),
    path: 'voicemails',
    isActive: function isActive(path) {
      return path === 'voicemails';
    },
    view: null,
    getData: function getData() {},
    cleanUp: function cleanUp() {}
  } : null, showRecentMessage ? {
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: _DynamicsFont["default"].composeText
    }),
    label: _i18n["default"].getString('text', currentLocale),
    path: 'recentMessages',
    isActive: function isActive(path) {
      return path === 'recentMessages';
    },
    view: /*#__PURE__*/_react["default"].createElement(_RecentActivityMessages["default"], {
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
    label: _i18n["default"].getString('fax', currentLocale),
    path: 'faxes',
    isActive: function isActive(path) {
      return path === 'faxes';
    },
    view: null,
    getData: function getData() {},
    cleanUp: function cleanUp() {}
  } : null, showRecentCalls ? {
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: _DynamicsFont["default"].active
    }),
    label: _i18n["default"].getString('call', currentLocale),
    path: 'recentCalls',
    isActive: function isActive(path) {
      return path === 'recentCalls';
    },
    view: /*#__PURE__*/_react["default"].createElement(_RecentActivityCalls["default"], {
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

exports.getTabs = getTabs;
//# sourceMappingURL=getTabs.js.map

"use strict";

require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastCallInfoFromWebphoneSession = getLastCallInfoFromWebphoneSession;
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _calleeTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/calleeTypes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getLastCallInfoFromWebphoneSession(webphoneSession, contactMapping) {
  var sessionNumber = webphoneSession.direction === _callDirections["default"].outbound ? webphoneSession.to : webphoneSession.from;
  var sessionStatus = webphoneSession.callStatus;
  var matchedContact = webphoneSession.contactMatch;
  if (!matchedContact && contactMapping) {
    var matches = contactMapping[sessionNumber];
    if (matches === null || matches === void 0 ? void 0 : matches.length) {
      matchedContact = matches[0];
    }
  }
  var calleeType = matchedContact ? _calleeTypes["default"].contacts : _calleeTypes["default"].unknown;
  return {
    calleeType: calleeType,
    avatarUrl: matchedContact && matchedContact.profileImageUrl,
    lastCallContact: matchedContact,
    name: matchedContact && matchedContact.name,
    status: sessionStatus,
    phoneNumber: sessionNumber
  };
}
//# sourceMappingURL=CallControlUI.interface.js.map

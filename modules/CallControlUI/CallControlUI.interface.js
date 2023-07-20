"use strict";

require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastCallInfoFromWebphoneSession = getLastCallInfoFromWebphoneSession;
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _calleeTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/calleeTypes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function getLastCallInfoFromWebphoneSession(webphoneSession) {
  var sessionNumber = webphoneSession.direction === _callDirections["default"].outbound ? webphoneSession.to : webphoneSession.from;
  var sessionStatus = webphoneSession.callStatus;
  var matchedContact = webphoneSession.contactMatch;
  var calleeType = matchedContact ? _calleeTypes["default"].contacts : _calleeTypes["default"].unknown;
  return {
    calleeType: calleeType,
    avatarUrl: matchedContact && matchedContact.profileImageUrl,
    name: matchedContact && matchedContact.name,
    status: sessionStatus,
    phoneNumber: sessionNumber
  };
}
//# sourceMappingURL=CallControlUI.interface.js.map

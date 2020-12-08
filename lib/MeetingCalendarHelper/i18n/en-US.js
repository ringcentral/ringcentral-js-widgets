"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: '{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} ',
  rcvInviteMeetingContent: '{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}',
  rcvRCBrandInviteMeetingContent: '{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}',
  rcvInviteMeetingContentDial: '\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tAccess Code / Meeting ID: {pinNumber} ',
  rcvTeleconference: '\n\nInternational numbers available: {teleconference} ',
  doNotModify: '===== Do not modify this text =====',
  password: '\n\nPassword',
  passwordPstn: '\n\nDial-in password:'
};
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map

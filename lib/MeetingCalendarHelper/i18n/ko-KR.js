"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} 님이 회원님을 {brandName} 모임에 초대했습니다.\n\nPC, Mac, iOS 또는 Android에서 참가: {joinUri}{passwordTpl}\n\n또는 iPhone 한 번 탭:\n\t{mobileDialingNumberTpl}\n\n또는 전화:\n\t전화 걸기:{phoneDialingNumberTpl}\n\t모임 ID: {meetingId}\n\t사용 가능한 국제 번호:{teleconference} ",
  rcvInviteMeetingContent: "{accountName} 님이 회원님을 {brandName} 모임에 초대했습니다.\n\n다음 링크를 사용하여 참가하세요.\n\t{joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} 님이 회원님을 {productName} 모임에 초대했습니다.\n\n다음 링크를 사용하여 참가하세요.\n\t{joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\n스마트폰에서 오디오로만 참가하려면 한 번 탭하세요.\n\t{smartphones}\n\n또는 전화 걸기:\n\t전화 걸기: {dialNumber}\n\tPIN: {pinNumber} ",
  rcvTeleconference: "\n\n사용 가능한 국제 번호: {teleconference} ",
  doNotModify: "===== 이 텍스트를 수정하지 마세요. =====",
  password: "\n\n비밀번호",
  passwordPstn: "\n\n전화 접속 비밀번호:"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tPIN: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@

exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map

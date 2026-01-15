"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = {
  inviteMeetingContent: '{accountName} 님이 {brandName} 모임에 회원님을 초대 중입니다.\n\nPC, Mac, iOS 또는 Android에서 참가: {joinUri}{passwordTpl}\n\n또는 iPhone 한 번 탭:\n    {mobileDialingNumberTpl}\n\n또는 전화:\n    전화 걸기: {phoneDialingNumberTpl}\n    모임 ID: {meetingId}\n    사용 가능한 국제 번호: {teleconference} ',
  rcvE2EEInviteMeetingContent: '{accountName} 님이 엔드투엔드{rcvProductName} 모임에 초대했습니다.\n\n다음 링크로 참가하세요. 참고로 {brandName} 앱에 먼저 로그인해야 합니다.\n{joinUri}\n\n이 모임에는 전화 걸기 기능이 지원되지 않습니다.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}',
  e2EESupportLinkText: '{brandName}의 엔드투엔드에 대해 자세히 알아보십시오.',
  rcvInviteMeetingContentDial: '\n\n스마트폰에서 오디오로만 참가하려면 다음에서 한 번 탭하세요.\n    {smartphones}\n\n또는 전화 걸기: \n    전화 걸기: {dialNumber}\n    액세스 코드 / 모임 ID: {pinNumber} ',
  rcvInviteMeetingContentCountryDial: '\n\n스마트폰에서 오디오로만 참가하려면 다음에서 한 번 탭하세요\n    {smartphones}\n\n또는 전화 걸기:\n    {dialNumber}\n    액세스 코드 / 모임 ID: {pinNumber} ',
  rcvTeleconference: '\n\n이용 가능한 국제 번호: {teleconference} ',
  rcvSipHeader: '\n\nSIP로 참가:',
  rcvSipContentWithPwd: '\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP 비밀번호: {meetingPasswordPSTN}\n',
  rcvSipContentNoPwd: '\n    {meetingId}@sip.rcv.com\n',
  doNotModify: '----------------------------------수정하지 마세요 ----------------------------------',
  password: '\n\n비밀번호',
  passwordPstn: '\n\n전화 걸기 비밀번호:'
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
// @key: @#@"rcvE2EEInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to an end-to-end encrypted {rcvProductName} meeting.\n\nPlease join using this link. Note, you'll need to log in to the {brandName} app first:\n{joinUri}\n\nDial-in is not available for this meeting.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}"@#@
// @key: @#@"e2EESupportLinkText"@#@ @source: @#@"Find out more about {brandName}'s end-to-end encryption."@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvSipHeader"@#@ @source: @#@"\n\nJoin by SIP:"@#@
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@sip.rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"---------------------------------- Do Not Modify ----------------------------------"@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map

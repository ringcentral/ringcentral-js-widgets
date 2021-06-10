export default {
  inviteMeetingContent:
    '{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} ',
  rcvInviteMeetingContent:
    '{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}',
  rcvRCBrandInviteMeetingContent:
    '{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}',
  rcvInviteMeetingContentDial:
    '\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} ',
  rcvInviteMeetingContentCountryDial:
    '\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} ',
  rcvTeleconference: '\n\nInternational numbers available: {teleconference} ',
  rcvSipHeader: '\n\nJoin by SIP:',
  rcvSipContentWithPwd: '\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    SIP password: {meetingPasswordPSTN}\n',
  rcvSipContentNoPwd: '\n    {meetingId}@rcv.com\n',
  doNotModify: '===== Do not modify this text =====',
  password: '\n\nPassword',
  passwordPstn: '\n\nDial-in password:',
  'TELUS Business Connect': 'TELUS Business Connect',
};

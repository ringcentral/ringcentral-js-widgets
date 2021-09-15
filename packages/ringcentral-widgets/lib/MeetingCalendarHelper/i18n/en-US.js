export default {
  inviteMeetingContent:
    '{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} ',
  rcvInviteMeetingContent:
    '{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}',
  rcvTelusInviteMeetingContent:
    '{accountName} has invited you to a TELUS Business Connect Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}',
  rcvRCBrandInviteMeetingContent:
    '{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}',
  rcvE2EEInviteMeetingContent:
    "{accountName} has invited you to an end-to-end encrypted {rcvProductName} meeting.\n\nPlease join using this link. Note, you'll need to log in to the {brandName} app first:\n{joinUri}\n\nDial-in is not available for this meeting.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "Find out more about {brandName}'s end-to-end encryption.",
  rcvInviteMeetingContentDial:
    '\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} ',
  rcvInviteMeetingContentCountryDial:
    '\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} ',
  rcvTeleconference: '\n\nInternational numbers available: {teleconference} ',
  rcvSipHeader: '\n\nJoin by SIP:',
  rcvSipContentWithPwd: '\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP password: {meetingPasswordPSTN}\n',
  rcvSipContentNoPwd: '\n    {meetingId}@sip.rcv.com\n',
  doNotModify: '===== Do not modify this text =====',
  password: '\n\nPassword',
  passwordPstn: '\n\nDial-in password:',
  'TELUS Business Connect': 'TELUS Business Connect',
};

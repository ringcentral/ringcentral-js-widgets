export default {
  inviteMeetingContent: "{accountName} lädt Sie zu einer {brandName}-Besprechung ein.\n\nNehmen Sie mit einem PC, Mac, iOS- oder Android-Gerät teil: {joinUri}{passwordTpl}\n\nOder mit einmaligem Tippen auf dem iPhone: \n    {mobileDialingNumberTpl}\n\nOder per Telefon: \n    Wählen: {phoneDialingNumberTpl}\n    Besprechungs-ID: {meetingId}\n    Verfügbare internationale Nummern: {teleconference} ",
  rcvE2EEInviteMeetingContent: "{accountName} hat Sie zu einer End-to-End-verschlüsselten {rcvProductName}-Besprechung eingeladen.\n\nBitte nehmen Sie über folgenden Link teil. Beachten Sie, dass Sie sich zuerst bei der {brandName}-App anmelden müssen:\n{joinUri}\n\nFür diese Besprechung ist keine Einwahl möglich.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "Erfahren Sie mehr über die End-to-End-Verschlüsselung von {brandName}.",
  rcvInviteMeetingContentDial: "\n\nEinmal tippen und mit dem Smartphone teilnehmen (nur Audio):\n    {smartphones}\n\nOder wählen Sie:\n    Wählen Sie: {dialNumber}\n    Zugriffscode/Besprechungs-ID: {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nEinmal tippen und mit dem Smartphone teilnehmen (nur Audio):\n    {smartphones}\n\nOder wählen Sie:\n    {dialNumber}\n    Zugriffscode/Besprechungs-ID: {pinNumber} ",
  rcvTeleconference: "\n\nVerfügbare internationale Nummern: {teleconference} ",
  rcvSipHeader: "\n\nÜber SIP teilnehmen:",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP-Kennwort: {meetingPasswordPSTN}\n",
  rcvSipContentNoPwd: "\n    {meetingId}@sip.rcv.com\n",
  doNotModify: "---------------------------------- Nicht ändern ----------------------------------",
  password: "\n\nKennwort",
  passwordPstn: "\n\nEinwahlkennwort:"
};

// @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
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

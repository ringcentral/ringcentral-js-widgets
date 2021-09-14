export default {
  inviteMeetingContent: "{accountName} vous invite à une réunion {brandName}.\n\nS’y joindre sur PC, Mac, iOS ou Android : {joinUri}{passwordTpl}\n\nOu participer d’un seul toucher sur iPhone :\n    {mobileDialingNumberTpl}\n\nOu d’un téléphone :\n    Numéro à composer : {phoneDialingNumberTpl}\n    Code de réunion : {meetingId}\n    Numéros internationaux disponibles : {teleconference} ",
  rcvInviteMeetingContent: "{accountName} vous invite à une réunion {brandName}.\n\nVeuillez vous joindre à la réunion en suivant ce lien :\n    {joinUri}{passwordTpl}",
  rcvTelusInviteMeetingContent: "{accountName} vous invite à une réunion Connexion Affaires de TELUS.\n\nVeuillez vous joindre à la réunion en suivant ce lien :\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} vous invite à une réunion {productName}.\n\nVeuillez vous joindre à la réunion en suivant ce lien :\n    {joinUri}{passwordTpl}",
  rcvE2EEInviteMeetingContent: "{accountName} vous a invité à une réunion {rcvProductName} chiffrée de bout en bout.\n\nVeuillez vous joindre à la réunion à l’aide de ce lien. Remarque : Vous devrez d’abord vous connecter à l’application {brandName}.\n{joinUri}\n\nLa participation par appel téléphonique n’est pas disponible pour cette réunion.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "Obtenez plus de renseignements sur le chiffrement de bout en bout de {brandName}.",
  rcvInviteMeetingContentDial: "\n\nParticiper à la réunion en un clic sur votre téléphone intelligent (son seulement) :\n    {smartphones}\n\nOu composer le :\n    Numéro à composer : {dialNumber}\n    Code d’accès/code de réunion : {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nParticiper à la réunion en un clic sur votre téléphone intelligent (son seulement) :\n    {smartphones}\n\nOu composer le :\n    {dialNumber}\n    Code d’accès/code de réunion : {pinNumber} ",
  rcvTeleconference: "\n\nNuméros internationaux disponibles : {teleconference} ",
  rcvSipHeader: "\n\nParticiper à la réunion depuis un appareil SIP :",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    Mot de passe pour l’appareil SIP : {meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@sip.rcv.com",
  doNotModify: "===== Ne modifiez pas ce texto =====",
  password: "\n\nMot de passe",
  passwordPstn: "\n\nMot de passe à composer :",
  'TELUS Business Connect': "Connexion Affaires de TELUS"
};

// @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvTelusInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a TELUS Business Connect Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvE2EEInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to an end-to-end encrypted {rcvProductName} meeting.\n\nPlease join using this link. Note, you'll need to log in to the {brandName} app first:\n{joinUri}\n\nDial-in is not available for this meeting.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}"@#@
// @key: @#@"e2EESupportLinkText"@#@ @source: @#@"Find out more about {brandName}'s end-to-end encryption."@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvSipHeader"@#@ @source: @#@"\n\nJoin by SIP:"@#@
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@sip.rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
// @key: @#@"'TELUS Business Connect'"@#@ @source: @#@"TELUS Business Connect"@#@

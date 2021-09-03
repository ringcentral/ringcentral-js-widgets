export default {
  inviteMeetingContent: "{accountName} vous invite à une réunion {brandName}.\n\nRejoindre à partir d’un PC, d’un Mac, d’iOS ou d’Android : {joinUri}{passwordTpl}\n\nOu avec une pression sur iPhone :\n    {mobileDialingNumberTpl}\n\nOu par téléphone :\n    Composer : {phoneDialingNumberTpl}\n    ID de réunion : {meetingId}\n     Numéros internationaux disponibles : {teleconference} ",
  rcvInviteMeetingContent: "{accountName} vous a invité à une réunion {brandName}.\n\nVeuillez rejoindre la réunion à l’aide de ce lien :\n    {joinUri}{passwordTpl}",
  rcvTelusInviteMeetingContent: "{accountName} vous a invité à une réunion Connexion Affaires de TELUS.\n\nVeuillez rejoindre la réunion à l’aide de ce lien :\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} vous a invité à une réunion {productName}.\n\nVeuillez rejoindre la réunion à l’aide de ce lien :\n    {joinUri}{passwordTpl}",
  rcvE2EEInviteMeetingContent: "{accountName} Vous a invité à une réunion {rcvProductName} chiffrée de bout en bout.\n\nVeuillez rejoindre la réunion à l’aide de ce lien. Vous devrez tout d’abord vous connecter à l’application {brandName} :\n{joinUri}\n\nLa composition n’est pas disponible pour cette réunion.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "En savoir plus sur le chiffrement de bout en bout de {brandName}.",
  rcvInviteMeetingContentDial: "\n\nAppuyer une seule fois pour rejoindre l’audio uniquement à partir d’un smartphone :\n    {smartphones}\n\nOu composer :\n    Composer : {dialNumber}\n     Code d’accès/ID de réunion : {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nAppuyer une seule fois pour rejoindre l’audio uniquement à partir d’un smartphone :\n    {smartphones}\n\nOu composer :\n    {dialNumber}\n     Code d’accès/ID de réunion : {pinNumber} ",
  rcvTeleconference: "\n\nNuméros internationaux disponibles : {teleconference} ",
  rcvSipHeader: "\n\nRejoindre par SIP :",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    Mot de passe SIP : {meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@rcv.com",
  doNotModify: "===== Ne pas modifier ce texte =====",
  password: "\n\nMot de passe",
  passwordPstn: "\n\nMot de passe à composer :",
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
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
// @key: @#@"'TELUS Business Connect'"@#@ @source: @#@"TELUS Business Connect"@#@

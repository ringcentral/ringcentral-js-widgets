import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.browserNotSupported]: 'Appeler avec un navigateur est pris en charge uniquement sur Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'Il est possible d\'enregistrer jusqu\'à 5\xA0appels.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Votre extension n\'est actuellement pas autorisée à passer des appels sortants via un navigateur, veuillez contacter votre représentant de compte pour une mise à niveau.',
  [webphoneErrors.getSipProvisionError]: 'Vous n\'êtes pas autorisé à envoyer des messages.',
  [webphoneErrors.connected]: 'Web\xA0phone enregistré.',
  [webphoneErrors.toVoiceMailError]: 'Impossible de joindre la messagerie vocale à cause d\'une erreur interne',
  [webphoneErrors.muteError]: 'Le son de l\'appel ne peut pas être désactivé pour le moment.',
  [webphoneErrors.holdError]: 'L\'appel ne peut pas être mis en attente pour le moment.',
  [webphoneErrors.flipError]: 'Renvoi de l\'appel impossible. Veuillez réessayer plus tard.',
  [webphoneErrors.recordError]: 'Vous ne pouvez pas enregistrer l\'appel pour le moment. Code d\'erreur\xA0: {errorCode}',
  [webphoneErrors.recordDisabled]: 'Désolé, votre compte ne comprend pas la fonction permettant d\'enregistrer un appel. Veuillez contacter votre administrateur de compte.',
  [webphoneErrors.transferError]: 'Impossible de transférer l\'appel. Veuillez réessayer plus tard.',
  webphoneUnavailable: '{error}. Nous nous reconnectons au serveur. Si le problème persiste, veuillez le signaler à l\'assistance de {brandName}.',
  errorCode: 'Code d\'erreur interne\xA0: {errorCode}',
  occurs: 'Une erreur interne se produit',
};

// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Calling with browser is only supported on Chrome."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.notOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.getSipProvisionError]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"webphoneUnavailable"@#@ @source: @#@"{error}. We are reconnecting to server. If the error persists, please report this error to {brandName} Support."@#@
// @key: @#@"errorCode"@#@ @source: @#@"Internal error code: {errorCode}"@#@
// @key: @#@"occurs"@#@ @source: @#@"Internal error occurs"@#@

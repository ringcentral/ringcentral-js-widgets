import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
export default {
  [webphoneErrors.connectFailed]: "Désolé, les fonctionnalités du téléphone ne sont pas disponibles actuellement. Veuillez réessayer plus tard. ",
  [webphoneErrors.connected]: "Web phone enregistré.",
  [webphoneErrors.browserNotSupported]: "Désolé, passer des appels à l'aide de ce navigateur n'est pas pris en charge.",
  [webphoneErrors.webphoneCountOverLimit]: "Il est possible d'enregistrer jusqu'à 5 appels.",
  [webphoneErrors.checkDLError]: "Impossible de passer un appel sortant. Contactez {brandName} pour de l'aide si cette erreur persiste.",
  [webphoneErrors.noOutboundCallWithoutDL]: "Votre extension n'est actuellement pas autorisée à passer des appels sortants via un navigateur, veuillez contacter votre représentant de compte pour une mise à niveau.",
  [webphoneErrors.provisionUpdate]: "Désolé, une erreur s'est produite de notre côté. Nous allons automatiquement essayer de vous reconnecter sous peu.",
  [webphoneErrors.serverConnecting]: "Désolé, nous rencontrons un problème de connexion au serveur téléphonique.",
  [webphoneErrors.toVoiceMailError]: "Impossible de joindre la messagerie vocale à cause d'une erreur interne",
  [webphoneErrors.muteError]: "Le son de l'appel ne peut pas être désactivé pour le moment.",
  [webphoneErrors.holdError]: "L'appel ne peut pas être mis en attente pour le moment.",
  [webphoneErrors.flipError]: "Renvoi de l'appel impossible. Veuillez réessayer plus tard.",
  [webphoneErrors.recordError]: "Vous ne pouvez pas enregistrer l'appel pour le moment. Code d'erreur : {errorCode}",
  [webphoneErrors.recordDisabled]: "Désolé, votre compte ne comprend pas la fonction permettant d'enregistrer un appel. Veuillez contacter votre administrateur de compte.",
  [webphoneErrors.transferError]: "Impossible de transférer l'appel. Veuillez réessayer plus tard.",
  failWithStatusCode: "Désolé, nous avons rencontré une erreur : {errorCode}. Si le problème persiste, veuillez le signaler à l'assistance de {brandName}.",
  registeringWithStatusCode: "Désolé, un problème est survenu. Nous essayons de vous reconnecter. Si le problème persiste, veuillez le signaler à l'assistance de {brandName}. Code d'erreur : {errorCode}.",
  failWithoutStatusCode: "Désolé, une erreur s'est produite de notre côté. Si le problème persiste, veuillez le signaler à l'assistance de {brandName}.",
  registeringWithoutStatusCode: "Désolé, un problème est survenu. Nous essayons de vous reconnecter. Si le problème persiste, veuillez le signaler à l'assistance de {brandName}."
};

// @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Sorry, making calls using this browser is not supported."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.checkDLError]"@#@ @source: @#@"Unable to make outgoing call. Contact {brandName} for support if this error keeps showing."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.provisionUpdate]"@#@ @source: @#@"Sorry, something went wrong on our end. We will automatically try to reconnect shortly."@#@
// @key: @#@"[webphoneErrors.serverConnecting]"@#@ @source: @#@"Sorry, we are having an issue connecting to the phone server."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@

import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import webphoneMessages from '@ringcentral-integration/commons/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]: "Désolé, les fonctionnalités du téléphone sont actuellement indisponibles. Veuillez réessayer plus tard. ",
  [webphoneErrors.connected]: "Téléphone Web inscrit.",
  [webphoneErrors.browserNotSupported]: "Désolé, les appels via ce navigateur ne sont pas pris en charge.",
  [webphoneErrors.webphoneCountOverLimit]: "Cinq téléphones Web au maximum peuvent être enregistrés.",
  [webphoneErrors.checkDLError]: "Impossible de passer un appel téléphonique sortant. Communiquez avec {brandName} pour obtenir du soutien si cette erreur persiste.",
  [webphoneErrors.noOutboundCallWithoutDL]: "Votre poste n’est pas autorisé à faire des appels sortants avec le navigateur pour le moment. Veuillez communiquer avec votre représentant de compte pour obtenir une mise à niveau.",
  [webphoneErrors.provisionUpdate]: "Désolé, une erreur s’est produite de notre côté. Nous allons automatiquement essayer de vous reconnecter sous peu.",
  [webphoneErrors.serverConnecting]: "Désolé, nous rencontrons un problème de connexion au serveur téléphonique.",
  [webphoneErrors.toVoiceMailError]: "Impossible d’acheminer l’appel vers la messagerie vocale en raison d’une erreur interne",
  [webphoneErrors.muteError]: "Le son de l’appel ne peut être désactivé pour le moment.",
  [webphoneErrors.holdError]: "L’appel ne peut être mis en attente pour le moment.",
  [webphoneErrors.flipError]: "Impossible de renvoyer l’appel. Veuillez réessayer plus tard.",
  [webphoneErrors.recordError]: "Vous ne pouvez pas enregistrer l’appel pour le moment. Code d’erreur : {errorCode}",
  [webphoneErrors.pauseRecordError]: "Désolés, nous n’avons pas pu arrêter l’enregistrement de l’appel. Réessayez plus tard.",
  [webphoneErrors.recordDisabled]: "Désolé, votre compte ne possède pas la fonction d’enregistrement d’appel. Veuillez communiquer avec votre administrateur de compte.",
  [webphoneErrors.transferError]: "Impossible de transférer l’appel. Veuillez réessayer plus tard.",
  [webphoneMessages.parked]: "Votre appel est parqué à : {parkedNumber}",
  failWithStatusCode: "Désolé, nous avons rencontré une erreur : {errorCode}. Si le problème persiste, signalez au service de soutien de {brandName}.",
  registeringWithStatusCode: "Désolé, une erreur s’est produite. Nous essayons de vous reconnecter. Si le problème persiste, veuillez le signaler au service de soutien de {brandName}. Code d’erreur : {errorCode}.",
  failWithoutStatusCode: "Désolé, une erreur s’est produite de notre côté. Si l’erreur persiste, veuillez la signaler au service de soutien de {brandName}.",
  registeringWithoutStatusCode: "Désolé, une erreur s’est produite. Nous essayons de vous reconnecter. Si le problème persiste, veuillez le signaler au service de soutien de {brandName}."
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
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@

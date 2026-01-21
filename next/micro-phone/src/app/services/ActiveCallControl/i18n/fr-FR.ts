/* eslint-disable */
export default {
  muteConflictError:
    'Le son de cet appel a été désactivé sur un autre terminal. Veuillez activer le son de l’appel avant votre action dans l’application.',
  unMuteConflictError:
    'Le son de cet appel a été activé sur un autre terminal. Veuillez désactiver le son de l’appel avant votre action dans l’application.',
  recordError:
    'Vous ne pouvez pas enregistrer l’appel pour le moment. Code d’erreur : {errorCode}',
  recordErrorWithoutCode:
    'Vous ne pouvez pas enregistrer l’appel pour le moment.',
  pauseRecordError:
    'Nous n’avons pas pu arrêter l’enregistrement de l’appel. Réessayez plus tard.',
  holdConflictError:
    'Cet appel a été repris sur un autre terminal. Veuillez mettre en attente l’appel avant toute action au sein de l’application.',
  unHoldConflictError:
    'Cet appel a été mis en attente sur un autre terminal. Veuillez reprendre l’appel avant votre action dans l’application.',
  generalError:
    'Erreur de serveur inconnue. Veuillez réessayer ultérieurement.',
  replyCompleted: 'Message vocal envoyé.',
  transferCompleted: 'Appel transféré',
  toVoiceMailError:
    'Impossible de joindre la messagerie vocale à cause d’une erreur interne',
  transferError:
    'Impossible de transférer l’appel. Veuillez réessayer ultérieurement.',
  forwardSuccess: 'Appel renvoyé',
  somethingWentWrong: 'Un problème est survenu. Merci de réessayer.',
  noOutboundCallWithoutDL:
    'Votre extension n’est actuellement pas autorisée à passer des appels sortants via un navigateur, veuillez contacter votre représentant de compte pour une mise à niveau.',
  tooManyParticipants: 'Le nombre maximum de participants est atteint.',
  callsMerged: 'Appels fusionnés',
  failWithoutStatusCode:
    'Une erreur s’est produite de notre côté. Si le problème persiste, veuillez le signaler à l’assistance de {brandName}.',
  replyEmptyError: 'Vous ne pouvez pas envoyer de message vide.',
} as const;

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"recordError"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"recordErrorWithoutCode"@#@ @source: @#@"You cannot record the call at the moment."@#@
// @key: @#@"pauseRecordError"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"toVoiceMailError"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"transferError"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"noOutboundCallWithoutDL"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"replyEmptyError"@#@ @source: @#@"Sorry, you cannot send an empty message."@#@

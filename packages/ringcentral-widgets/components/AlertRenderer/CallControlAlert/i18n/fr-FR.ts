import { callControlError } from '@ringcentral-integration/commons/modules/ActiveCallControl';
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError,
  forwardSuccess,
  transferCompleted,
  replyCompleted
} = callControlError;
export default {
  [muteConflictError]: "Le son de cet appel a été désactivé sur un autre terminal. Veuillez activer le son de l’appel avant votre action dans l’application.",
  [unHoldConflictError]: "Cet appel a été mis en attente sur un autre terminal. Veuillez reprendre l’appel avant votre action dans l’application.",
  [unMuteConflictError]: "Le son de cet appel a été activé sur un autre terminal. Veuillez désactiver le son de l’appel avant votre action dans l’application.",
  [holdConflictError]: "Cet appel a été repris sur un autre terminal. Veuillez mettre en attente l’appel avant toute action au sein de l’application.",
  [generalError]: "Erreur de serveur inconnue. Veuillez réessayer ultérieurement.",
  [forwardSuccess]: "Appel renvoyé",
  [transferCompleted]: "Appel transféré",
  [replyCompleted]: "Message vocal envoyé."
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@

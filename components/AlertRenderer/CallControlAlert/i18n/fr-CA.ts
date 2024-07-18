import { callControlAlerts, callControlError } from '@ringcentral-integration/commons/modules/ActiveCallControl';
const {
  callsMerged,
  somethingWentWrong,
  tooManyParticipants
} = callControlAlerts;
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
  [callsMerged]: "Appels fusionnés",
  [somethingWentWrong]: "Une erreur s’est produite. Veuillez réessayer.",
  [tooManyParticipants]: "Le nombre maximal de participants est atteint.",
  [muteConflictError]: "Le son de cet appel a été désactivé sur un autre appareil. Veuillez activer le son de l’appel avant de contrôler cette application.",
  [unHoldConflictError]: "Cet appel a été mis en attente sur un autre appareil. Veuillez reprendre l’appel avant votre action dans cette application.",
  [unMuteConflictError]: "Le son de cet appel a été activé sur un autre appareil. Veuillez désactiver le son de l’appel avant de contrôler cette application.",
  [holdConflictError]: "Cet appel a été repris sur un autre appareil. Veuillez le mettre en attente avant votre action dans cette application.",
  [generalError]: "Une erreur de serveur inattendue s’est produite. Veuillez réessayer plus tard.",
  [forwardSuccess]: "Appel transféré",
  [transferCompleted]: "Appel transféré",
  [replyCompleted]: "Message vocal envoyé."
};

// @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@

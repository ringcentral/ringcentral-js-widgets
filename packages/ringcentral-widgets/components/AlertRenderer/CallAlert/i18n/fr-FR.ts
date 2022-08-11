import { callErrors } from '@ringcentral-integration/commons/modules/Call';
export default {
  [callErrors.emergencyNumber]: "L’appel d’urgence n’est pas disponible. Veuillez utiliser un autre téléphone pour contacter les services d’urgence.",
  [callErrors.noToNumber]: "Veuillez entrer un numéro de téléphone valide.",
  [callErrors.noAreaCode]: "Veuillez paramétrer l’{areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres.",
  [callErrors.connectFailed]: "Échec de la connexion. Veuillez réessayer ultérieurement.",
  [callErrors.internalError]: "Connexion impossible en raison d’erreurs internes. Veuillez réessayer ultérieurement.",
  [callErrors.notAnExtension]: "Le numéro de l’extension n’existe pas.",
  [callErrors.networkError]: "Connexion impossible en raison de problèmes de réseau. Veuillez réessayer ultérieurement.",
  [callErrors.noInternational]: "Vous n’êtes pas autorisé à passer des appels à l’international. Veuillez contacter votre administrateur de compte {brand} pour une mise à niveau.",
  [callErrors.noRingoutEnable]: "Votre extension est autorisée à passer des appels avec l’application logicielle.\n    Si vous souhaitez passer à d’autres options d’appel,\n    veuillez contacter votre administrateur de compte pour une mise à niveau.",
  [callErrors.numberParseError]: "Une erreur s’est produite de notre côté. Veuillez réessayer ultérieurement.",
  areaCode: "indicatif",
  telus911: "La composition d’urgence n’est pas prise en charge."
};

// @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@

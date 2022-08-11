import { callErrors } from '@ringcentral-integration/commons/modules/Call';
export default {
  [callErrors.emergencyNumber]: "L’appel d’urgence n’est pas disponible. Veuillez utiliser un autre téléphone pour communiquer avec les services d’urgence",
  [callErrors.noToNumber]: "Veuillez entrer un numéro de téléphone valide.",
  [callErrors.noAreaCode]: "Veuillez configurer l’{areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres.",
  [callErrors.connectFailed]: "Échec de la connexion. Veuillez réessayer plus tard.",
  [callErrors.internalError]: "Connexion impossible en raison d’erreurs internes. Veuillez réessayer plus tard.",
  [callErrors.notAnExtension]: "Le numéro de poste n’existe pas.",
  [callErrors.networkError]: "Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard.",
  [callErrors.noInternational]: "Vous n’êtes pas autorisé à faire des appels internationaux. Veuillez communiquer avec votre administrateur de compte {brand} pour obtenir une mise à jour.",
  [callErrors.noRingoutEnable]: "Votre poste est autorisé à effectuer des appels avec l’application pour ordinateur de bureau.\n    Si vous souhaitez passer à d’autres options d’appel,\n    veuillez communiquer avec votre administrateur de compte pour obtenir une mise à niveau.",
  [callErrors.numberParseError]: "Désolés, un problème est survenu de notre côté. Veuillez réessayer plus tard.",
  areaCode: "indicatif régional",
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

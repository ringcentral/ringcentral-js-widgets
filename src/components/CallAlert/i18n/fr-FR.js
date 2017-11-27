import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: 'Veuillez saisir un numéro de téléphone valide.',
  [callErrors.noAreaCode]: 'Veuillez paramétrer {areaCodeLink} pour utiliser des numéros de téléphone locaux à 7\xA0chiffres.',
  [callErrors.specialNumber]: 'La composition de numéros d\'urgence ou renvoyant à des services spéciaux n\'est pas prise en charge.',
  [callErrors.connectFailed]: 'Échec de la connexion. Veuillez réessayer plus tard.',
  [callErrors.internalError]: 'Connexion impossible en raison d\'erreurs internes. Veuillez réessayer plus tard.',
  [callErrors.notAnExtension]: 'Le numéro de l\'extension n\'existe pas.',
  [callErrors.networkError]: 'Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard.',
  [callErrors.noRingoutEnable]: 'Votre extension est autorisée à passer des appels avec l\'application pour ordinateur de bureau.\n    Si vous souhaitez passer à d\'autres options d\'appel,\n    veuillez contacter votre administrateur de compte pour une mise à niveau.',
  areaCode: 'indicatif régional',
  telus911: 'La composition d\'urgence n\'est pas prise en charge.',
};

// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@

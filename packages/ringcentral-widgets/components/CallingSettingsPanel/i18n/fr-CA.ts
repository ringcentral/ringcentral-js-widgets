import callingOptions from '@ringcentral-integration/commons/modules/CallingSettings/callingOptions';
export default {
  title: "Appel",
  [callingOptions.softphone]: "{brand} pour Desktop",
  [callingOptions.browser]: "Navigateur",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "Effectuer mes appels sortants avec",
  ringoutHint: "Appeler d’abord à mon emplacement, puis connecter le destinataire.",
  myLocationLabel: "Mon emplacement",
  press1ToStartCallLabel: "Me demander de composer le 1 avant d’établir la connexion",
  [`${callingOptions.browser}Tooltip`]: "Utilisez cette option pour faire et recevoir des appels au moyen du microphone et du haut-parleur de votre ordinateur.",
  [`${callingOptions.softphone}Tooltip`]: "Utilisez cette option pour faire et recevoir des appels au moyen de votre {brand}.",
  [`${callingOptions.ringout}Tooltip`]: "Utilisez cette option pour passer des appels en utilisant le numéro de téléphone que vous avez sélectionné ou entré.",
  [`${callingOptions.ringout}Tooltip1`]: "Pour l’appel que vous passez, ce téléphone sonnera d’abord puis celui de la personne que vous avez appelée.",
  [`${callingOptions.jupiter}Tooltip`]: "Utilisez cette option pour faire et recevoir des appels au moyen de votre {brand}."
};

// @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"[callingOptions.jupiter]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your selected or entered phone number."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.jupiter}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@

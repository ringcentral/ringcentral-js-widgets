import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: "Appel",
  [callingOptions.softphone]: "{brand} pour ordinateur de bureau",
  [callingOptions.myphone]: "Mon téléphone {brand}",
  [callingOptions.otherphone]: "Autre téléphone",
  [callingOptions.customphone]: "Téléphone personnalisé",
  [callingOptions.browser]: "Navigateur",
  makeCallsWith: "Effectuer mes appels sortants avec",
  ringoutHint: "Appeler d'abord à mon emplacement, puis connecter le destinataire.",
  myLocationLabel: "Mon emplacement",
  press1ToStartCallLabel: "Me demander de composer le 1 avant d'établir la connexion"
};

// @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.myphone]"@#@ @source: @#@"My {brand} Phone"@#@
// @key: @#@"[callingOptions.otherphone]"@#@ @source: @#@"Other Phone"@#@
// @key: @#@"[callingOptions.customphone]"@#@ @source: @#@"Custom Phone"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@

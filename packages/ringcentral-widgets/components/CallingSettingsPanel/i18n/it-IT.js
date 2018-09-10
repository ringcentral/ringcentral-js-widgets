import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: "Chiamata",
  [callingOptions.softphone]: "{brand} per desktop",
  [callingOptions.myphone]: "Il mio telefono {brand}",
  [callingOptions.otherphone]: "Altro telefono",
  [callingOptions.customphone]: "Telefono personalizzato",
  [callingOptions.browser]: "Browser",
  makeCallsWith: "Effettua chiamate con",
  ringoutHint: "Chiamami prima alla mia postazione, poi connetti la persona chiamata",
  myLocationLabel: "La mia postazione",
  press1ToStartCallLabel: "Chiedimi di comporre 1 prima di connettere la chiamata",
  [`${callingOptions.browser}Tooltip`]: "Usa questa opzione per effettuare e ricevere chiamate usando il microfono e l'altoparlante del computer.",
  [`${callingOptions.softphone}Tooltip`]: "Usa questa opzione per effettuare e ricevere chiamate usando l'app {brand} per desktop.",
  [`${callingOptions.myphone}Tooltip`]: "Usa questa opzione per effettuare chiamate usando il tuo telefono {brand}.",
  [`${callingOptions.myphone}Tooltip1`]: "Per la chiamata effettuata, squillerà prima il tuo telefono {brand} e poi quello della persona chiamata.",
  [`${callingOptions.otherphone}Tooltip`]: "Usa questa opzione per effettuare chiamate con i tuoi altri telefoni, ad esempio quello di casa o un cellulare che hai aggiunto al tuo interno {brand}.",
  [`${callingOptions.otherphone}Tooltip1`]: "Per la chiamata effettuata, squillerà prima questo telefono e poi quello della persona chiamata.",
  [`${callingOptions.customphone}Tooltip`]: "Usa questa opzione per effettuare chiamate con qualsiasi telefono inserendo un numero di telefono valido nel campo qui sotto.",
  [`${callingOptions.customphone}Tooltip1`]: "Per la chiamata effettuata, squillerà prima questo telefono e poi quello della persona chiamata."
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
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand} for Desktop app."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your {brand} phone."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip1`]"@#@ @source: @#@"For the call you make, your {brand} phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your other phones such as home or cell phones that you have added in your {brand} Extension."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using any phone of your choice by entering a valid phone number in the field below."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@

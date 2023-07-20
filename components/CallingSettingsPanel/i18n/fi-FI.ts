import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
export default {
  title: "Soittaminen",
  [callingOptions.softphone]: "{brand} -työpöytäsovellus",
  [callingOptions.browser]: "Selain",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "Soita puhelut sovelluksella",
  ringoutHint: "Soita ensin omaan sijaintiini ja yhdistä sitten puhelukumppani",
  myLocationLabel: "Oma sijainti",
  press1ToStartCallLabel: "Pyydä minua valitsemaan 1 ennen puhelun yhdistämistä",
  [`${callingOptions.browser}Tooltip`]: "Valitse tämä vaihtoehto, jos haluat soittaa ja vastaanottaa puheluita tietokoneen mikrofonin ja kaiuttimen avulla.",
  [`${callingOptions.softphone}Tooltip`]: "Valitse tämä vaihtoehto, jos haluat soittaa ja vastaanottaa puheluita sovelluksella {brand}.",
  [`${callingOptions.ringout}Tooltip`]: "Valitse tämä vaihtoehto, jos haluat soittaa puheluita valitsemastasi tai antamastasi puhelinnumerosta.",
  [`${callingOptions.ringout}Tooltip1`]: "Kun soitat puhelun, tämä puhelin soi ensin. Tämän jälkeen soitetaan puhelukumppanillesi.",
  [`${callingOptions.jupiter}Tooltip`]: "Valitse tämä vaihtoehto, jos haluat soittaa ja vastaanottaa puheluita sovelluksella {brand}."
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

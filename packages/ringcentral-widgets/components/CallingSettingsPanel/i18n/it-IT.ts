/* eslint-disable */
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
export default {
  title: 'Chiamata',
  [callingOptions.softphone]: '{brand} for Desktop',
  [callingOptions.browser]: 'Browser',
  [callingOptions.jupiter]: '{brand}',
  makeCallsWith: 'Effettua chiamate con',
  ringoutHint:
    'Chiamami prima alla mia postazione, poi connetti la persona chiamata',
  myLocationLabel: 'La mia postazione',
  press1ToStartCallLabel:
    'Chiedimi di comporre 1 prima di connettere la chiamata',
  [`${callingOptions.browser}Tooltip`]:
    "Usa questa opzione per effettuare e ricevere chiamate usando il microfono e l'altoparlante del computer.",
  [`${callingOptions.softphone}Tooltip`]:
    'Usa questa opzione per effettuare e ricevere chiamate usando {brand}.',
  [`${callingOptions.ringout}Tooltip`]:
    'Utilizza questa opzione per effettuare chiamate utilizzando il numero di telefono selezionato o inserito.',
  [`${callingOptions.ringout}Tooltip1`]:
    'Per la chiamata che effettui, squillerà prima questo telefono e poi quello della persona chiamata.',
  [`${callingOptions.jupiter}Tooltip`]:
    'Usa questa opzione per effettuare e ricevere chiamate usando {brand}.',
} as const;

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

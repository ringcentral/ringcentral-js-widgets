import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
export default {
  title: "Bellen",
  [callingOptions.softphone]: "{brand} voor desktop",
  [callingOptions.browser]: "Browser",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "Plaats mijn oproepen met",
  ringoutHint: "Bel me eerst op mijn locatie en verbind dan de gebelde partij",
  myLocationLabel: "Mijn locatie",
  press1ToStartCallLabel: "Vraag me om op 1 te drukken voordat ik de oproep tot stand breng",
  [`${callingOptions.browser}Tooltip`]: "Gebruik deze optie om te bellen en gebeld te worden met de microfoon en luidspreker van uw computer.",
  [`${callingOptions.softphone}Tooltip`]: "Gebruik deze optie om te bellen en gebeld te worden met {brand}.",
  [`${callingOptions.ringout}Tooltip`]: "Gebruik deze optie om te bellen met het door u geselecteerde of ingevoerde telefoonnummer.",
  [`${callingOptions.ringout}Tooltip1`]: "Voor deze oproep gaat deze telefoon eerst over en vervolgens de partij die u hebt gebeld.",
  [`${callingOptions.jupiter}Tooltip`]: "Gebruik deze optie om te bellen en gebeld te worden met {brand}."
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

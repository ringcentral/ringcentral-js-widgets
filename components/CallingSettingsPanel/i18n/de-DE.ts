import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
export default {
  title: "Anrufen",
  [callingOptions.softphone]: "{brand} für Desktop",
  [callingOptions.browser]: "Browser",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "Anrufe ausführen mit",
  ringoutHint: "Zunächst am Standort anklingeln, dann Verbindung zum Anrufempfänger herstellen",
  myLocationLabel: "Mein Standort",
  press1ToStartCallLabel: "Vor dem Verbinden des Anrufs zum Wählen von \"1\" auffordern",
  [`${callingOptions.browser}Tooltip`]: "Verwenden Sie diese Option, um Anrufe über das Mikrofon und die Lautsprecher Ihres Computers zu tätigen und entgegenzunehmen.",
  [`${callingOptions.softphone}Tooltip`]: "Verwenden Sie diese Option, um Anrufe über die {brand} zu tätigen und entgegenzunehmen.",
  [`${callingOptions.ringout}Tooltip`]: "Verwenden Sie diese Option, um Anrufe mit Ihrer gewählten oder eingegebenen Nummer zu tätigen.",
  [`${callingOptions.ringout}Tooltip1`]: "Bei einem Anruf, den Sie tätigen, klingelt zunächst dieses Telefon und dann das Telefon der angerufenen Person.",
  [`${callingOptions.jupiter}Tooltip`]: "Verwenden Sie diese Option, um Anrufe über die {brand} zu tätigen und entgegenzunehmen."
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

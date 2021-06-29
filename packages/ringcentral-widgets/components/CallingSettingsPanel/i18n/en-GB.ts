import callingOptions from '@ringcentral-integration/commons/modules/CallingSettings/callingOptions';
export default {
  title: "Calling",
  [callingOptions.softphone]: "{brand} for Desktop",
  [callingOptions.browser]: "Browser",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "Make my calls using",
  ringoutHint: "Ring me at my location first, then connect the called party",
  myLocationLabel: "My location",
  press1ToStartCallLabel: "Prompt me to dial 1 before connecting the call",
  [`${callingOptions.browser}Tooltip`]: "Use this option to make and receive calls using your computer's microphone and speaker.",
  [`${callingOptions.softphone}Tooltip`]: "Use this option to make and receive calls using your {brand}.",
  [`${callingOptions.ringout}Tooltip`]: "Use this option to make calls using your selected or entered phone number.",
  [`${callingOptions.ringout}Tooltip1`]: "For the call you make, this phone will ring first then the party you called.",
  [`${callingOptions.jupiter}Tooltip`]: "Use this option to make and receive calls using your {brand}."
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

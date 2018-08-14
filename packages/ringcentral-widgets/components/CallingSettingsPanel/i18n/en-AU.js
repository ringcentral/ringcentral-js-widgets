import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: "Calling",
  [callingOptions.softphone]: "{brand} for Desktop",
  [callingOptions.myphone]: "My {brand} Phone",
  [callingOptions.otherphone]: "Other Phone",
  [callingOptions.customphone]: "Custom Phone",
  [callingOptions.browser]: "Browser",
  makeCallsWith: "Make my calls using",
  ringoutHint: "Ring me at my location first, then connect the called party",
  myLocationLabel: "My Location",
  press1ToStartCallLabel: "Prompt me to dial 1 before connecting the call"
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

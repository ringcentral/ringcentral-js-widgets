import callErrors from '@ringcentral-integration/commons/modules/Call/callErrors';
export default {
  [callErrors.emergencyNumber]: "Emergency calling is not available. Please use another phone to contact emergency services",
  [callErrors.noToNumber]: "Please enter a valid phone number.",
  [callErrors.noAreaCode]: "Please set {areaCodeLink} to use 7-digit local phone numbers.",
  [callErrors.connectFailed]: "Connection failed. Please try again later.",
  [callErrors.internalError]: "Cannot connect due to internal errors. Please try again later.",
  [callErrors.notAnExtension]: "The extension number does not exist.",
  [callErrors.networkError]: "Cannot connect due to network issues. Please try again later.",
  [callErrors.noInternational]: "You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade.",
  [callErrors.noRingoutEnable]: "Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options,\n    please contact your account administrator for an upgrade.",
  areaCode: "area code",
  telus911: "Emergency dialling is not supported."
};

// @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@

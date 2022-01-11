import callErrors from '@ringcentral-integration/commons/modules/Call/callErrors';
export default {
  [callErrors.emergencyNumber]: "Noodoproepen zijn niet beschikbaar. Gebruik een andere telefoon om contact op te nemen met de nooddiensten",
  [callErrors.noToNumber]: "Voer een geldig telefoonnummer in.",
  [callErrors.noAreaCode]: "Stel {areaCodeLink} in om lokale telefoonnummers met 7 cijfers te gebruiken.",
  [callErrors.connectFailed]: "Verbinding mislukt. Probeer het later opnieuw.",
  [callErrors.internalError]: "Kan geen verbinding maken vanwege interne fouten. Probeer het later opnieuw.",
  [callErrors.notAnExtension]: "Het extensienummer bestaat niet.",
  [callErrors.networkError]: "Kan geen verbinding maken vanwege netwerkfouten. Probeer het later opnieuw.",
  [callErrors.noInternational]: "U hebt onvoldoende machtigingen om internationale oproepen te plaatsen. Neem contact op met uw {brand}-accountbeheerder voor een upgrade.",
  [callErrors.noRingoutEnable]: "Uw extensie mag bellen met de desktop-app.\n    Als u naar andere oproepopties wilt overschakelen,\n    neem dan contact op met uw accountbeheerder voor een upgrade.",
  areaCode: "netnummer",
  telus911: "Noodoproepen worden niet ondersteund."
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

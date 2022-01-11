import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import webphoneMessages from '@ringcentral-integration/commons/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]: "Telefoonfuncties zijn momenteel niet beschikbaar. Probeer het later opnieuw. ",
  [webphoneErrors.connected]: "Webtelefoon geregistreerd.",
  [webphoneErrors.browserNotSupported]: "Bellen met deze browser wordt niet ondersteund.",
  [webphoneErrors.webphoneCountOverLimit]: "Er kunnen maximaal vijf webtelefoons worden geregistreerd.",
  [webphoneErrors.checkDLError]: "Kan uitgaande oproep niet plaatsen. Neem contact op met {brandName} voor hulp als deze fout zich blijft voordoen.",
  [webphoneErrors.noOutboundCallWithoutDL]: "Uw extensie mag momenteel geen uitgaande oproepen plaatsen met de browser. Neem contact op met uw accountvertegenwoordiger voor een upgrade.",
  [webphoneErrors.provisionUpdate]: "Er is bij ons iets fout gegaan. We proberen over een ogenblik automatisch opnieuw verbinding te maken.",
  [webphoneErrors.serverConnecting]: "We kunnen geen verbinding maken met de telefoonserver.",
  [webphoneErrors.toVoiceMailError]: "Kan oproep niet naar voicemail verzenden vanwege een interne fout",
  [webphoneErrors.muteError]: "Oproep kan momenteel niet worden gedempt.",
  [webphoneErrors.holdError]: "Oproep kan momenteel niet in de wacht worden gezet.",
  [webphoneErrors.flipError]: "Kan de oproep niet omkeren. Probeer het later opnieuw.",
  [webphoneErrors.recordError]: "U kunt de oproep momenteel niet opnemen. Foutcode: {errorCode}",
  [webphoneErrors.pauseRecordError]: "We kunnen het opnemen van de oproep niet stoppen. Probeer het later opnieuw.",
  [webphoneErrors.recordDisabled]: "Uw account heeft niet de functie om een oproep op te nemen. Neem contact op met uw accountbeheerder.",
  [webphoneErrors.transferError]: "Kan de oproep niet doorschakelen. Probeer het later opnieuw.",
  [webphoneMessages.parked]: "Uw oproep is geparkeerd op locatie: {parkedNumber}",
  failWithStatusCode: "Er is een fout opgetreden: {errorCode}. Meld deze fout aan {brandName}-support als het probleem aanhoudt.",
  registeringWithStatusCode: "Er is iets fout gegaan. We proberen opnieuw verbinding te maken. Meld deze fout aan {brandName}-support als het probleem zich blijft voordoen. Foutcode: {errorCode}.",
  failWithoutStatusCode: "Er is bij ons iets fout gegaan. Meld deze fout aan {brandName}-support als de fout zich blijft voordoen.",
  registeringWithoutStatusCode: "Er is iets fout gegaan. We proberen opnieuw verbinding te maken. Meld deze fout aan {brandName}-support als het probleem zich blijft voordoen."
};

// @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Sorry, making calls using this browser is not supported."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.checkDLError]"@#@ @source: @#@"Unable to make outgoing call. Contact {brandName} for support if this error keeps showing."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.provisionUpdate]"@#@ @source: @#@"Sorry, something went wrong on our end. We will automatically try to reconnect shortly."@#@
// @key: @#@"[webphoneErrors.serverConnecting]"@#@ @source: @#@"Sorry, we are having an issue connecting to the phone server."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@

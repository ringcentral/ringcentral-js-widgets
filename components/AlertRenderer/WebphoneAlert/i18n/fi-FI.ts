import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import webphoneMessages from '@ringcentral-integration/commons/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]: "Puhelimen ominaisuudet eivät ole tällä hetkellä käytettävissä. Yritä myöhemmin uudelleen. ",
  [webphoneErrors.connected]: "Verkkopuhelin rekisteröity.",
  [webphoneErrors.browserNotSupported]: "Puhelujen soittamista tällä selaimella ei tueta.",
  [webphoneErrors.webphoneCountOverLimit]: "Voin rekisteröidä enintään 5 verkkopuhelinta.",
  [webphoneErrors.checkDLError]: "Puhelun soittaminen epäonnistui. Ota yhteyttä tukeen ({brandName}), jos näet tämän virheilmoituksen uudelleen.",
  [webphoneErrors.noOutboundCallWithoutDL]: "Alanumerostasi ei voi tällä hetkellä soittaa puheluita selaimella. Pyydä päivitystä tilisi järjestelmänvalvojalta.",
  [webphoneErrors.provisionUpdate]: "Jotakin meni vikaan palvelimellamme. Yritämme muodostaa yhteyden automaattisesti hetken kuluttua.",
  [webphoneErrors.serverConnecting]: "Puhelinpalvelinyhteydessä on ongelmia.",
  [webphoneErrors.toVoiceMailError]: "Puhelun lähettäminen vastaajaan epäonnistui sisäisen virheen vuoksi",
  [webphoneErrors.muteError]: "Puhelua ei voi mykistää tällä hetkellä.",
  [webphoneErrors.holdError]: "Puhelua ei voi asettaa pitoon tällä hetkellä.",
  [webphoneErrors.flipError]: "Puhelua ei voi kääntää. Yritä myöhemmin uudelleen.",
  [webphoneErrors.recordError]: "Puhelua ei voi tallentaa tällä hetkellä. Virhekoodi: {errorCode}",
  [webphoneErrors.pauseRecordError]: "Puhelun tallentamisen pysäyttäminen epäonnistui. Yritä myöhemmin uudelleen.",
  [webphoneErrors.recordDisabled]: "Puheluiden tallennus ei ole käytössä tililläsi. Ota yhteyttä tilisi järjestelmänvalvojaan.",
  [webphoneErrors.transferError]: "Soitonsiirto epäonnistui. Yritä myöhemmin uudelleen.",
  [webphoneMessages.parked]: "Puhelusi on siirretty säilytykseen tänne: {parkedNumber}",
  failWithStatusCode: "Tapahtui virhe: {errorCode}. Jos ongelma ei ratkea, ilmoita virheestä palvelun {brandName} tukeen.",
  registeringWithStatusCode: "Jotakin meni vikaan. Yritetään yhdistää uudelleen. Jos ongelma ei ratkea, ilmoita virheestä palvelun {brandName} tukeen. Virhekoodi: {errorCode}.",
  failWithoutStatusCode: "Jotakin meni vikaan palvelimellamme. Jos virhe ei korjaannu, ilmoita virheestä palvelun {brandName} tukeen.",
  registeringWithoutStatusCode: "Jotakin meni vikaan. Yritetään yhdistää uudelleen. Jos ongelma ei ratkea, ilmoita virheestä palvelun {brandName} tukeen."
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

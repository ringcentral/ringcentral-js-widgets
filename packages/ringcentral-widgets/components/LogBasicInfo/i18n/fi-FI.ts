import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
export default {
  [callDirections.inbound]: "Saapuva",
  [callDirections.outbound]: "Lähtevä",
  status: "Tila:",
  InboundNumber: "Soittajatunnus:",
  OutboundNumber: "Soitettiin:",
  InboundDirection: "Saapuva puhelu kohteesta:",
  OutboundDirection: "Lähtevä puhelu kohteeseen:",
  [telephonyStatuses.noCall]: "Yhteys katkaistu",
  [telephonyStatuses.callConnected]: "Yhdistetty",
  [telephonyStatuses.ringing]: "Soitetaan",
  [telephonyStatuses.onHold]: "Pidossa",
  [telephonyStatuses.parkedCall]: "Siirretty säilytykseen",
  [callResults.unknown]: "Tuntematon",
  [callResults.missed]: "Vastaamaton",
  [callResults.callAccepted]: "Vastattu",
  [callResults.accepted]: "Vastattu",
  [callResults.voicemail]: "Puhelinvastaaja",
  [callResults.rejected]: "Kieltäydytty",
  [callResults.reply]: "Vastaa",
  [callResults.received]: "Vastaanotettu",
  [callResults.faxReceiptError]: "Faksin vastaanottovirhe",
  [callResults.faxOnDemand]: "Faksi tarvittaessa",
  [callResults.partialReceive]: "Osittainen vastaanotto",
  [callResults.blocked]: "Estetty",
  [callResults.callConnected]: "Puhelu yhdistetty",
  [callResults.noAnswer]: "Ei vastausta",
  [callResults.internationalDisabled]: "Kansainväliset pois käytöstä",
  [callResults.busy]: "Varattu",
  [callResults.faxSendError]: "Faksin lähetysvirhe",
  [callResults.sent]: "Lähetetty",
  [callResults.callFailed]: "Puhelu epäonnistui",
  [callResults.internalError]: "Sisäinen virhe",
  [callResults.IPPhoneOffline]: "IP-puhelin offline-tilassa",
  [callResults.restrictedNumber]: "Rajoitettu numero",
  [callResults.wrongNumber]: "Väärä numero",
  [callResults.stopped]: "Pysäytetty",
  [callResults.suspendedAccount]: "Jäädytetty tili",
  [callResults.hangUp]: "Lopetettu",
  [callResults.HangUp]: "Lopetettu",
  [callResults.abandoned]: "Hylätty",
  [callResults.declined]: "Kieltäydytty",
  [callResults.faxReceipt]: "Faksin vastaanotto",
  [callResults.disconnected]: "Yhteys katkaistu",
  [callResults.notAllowed]: "Ei sallittu"
};

// @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
// @key: @#@"[callDirections.outbound]"@#@ @source: @#@"Outbound"@#@
// @key: @#@"status"@#@ @source: @#@"Status:"@#@
// @key: @#@"InboundNumber"@#@ @source: @#@"Caller Id:"@#@
// @key: @#@"OutboundNumber"@#@ @source: @#@"Called:"@#@
// @key: @#@"InboundDirection"@#@ @source: @#@"Inbound from:"@#@
// @key: @#@"OutboundDirection"@#@ @source: @#@"Outbound to:"@#@
// @key: @#@"[telephonyStatuses.noCall]"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"[telephonyStatuses.callConnected]"@#@ @source: @#@"Connected"@#@
// @key: @#@"[telephonyStatuses.ringing]"@#@ @source: @#@"Ringing"@#@
// @key: @#@"[telephonyStatuses.onHold]"@#@ @source: @#@"On Hold"@#@
// @key: @#@"[telephonyStatuses.parkedCall]"@#@ @source: @#@"Parked"@#@
// @key: @#@"[callResults.unknown]"@#@ @source: @#@"Unknown"@#@
// @key: @#@"[callResults.missed]"@#@ @source: @#@"Missed"@#@
// @key: @#@"[callResults.callAccepted]"@#@ @source: @#@"Answered"@#@
// @key: @#@"[callResults.accepted]"@#@ @source: @#@"Answered"@#@
// @key: @#@"[callResults.voicemail]"@#@ @source: @#@"Voicemail"@#@
// @key: @#@"[callResults.rejected]"@#@ @source: @#@"Declined"@#@
// @key: @#@"[callResults.reply]"@#@ @source: @#@"Reply"@#@
// @key: @#@"[callResults.received]"@#@ @source: @#@"Received"@#@
// @key: @#@"[callResults.faxReceiptError]"@#@ @source: @#@"Fax Receipt Error"@#@
// @key: @#@"[callResults.faxOnDemand]"@#@ @source: @#@"Fax on Demand"@#@
// @key: @#@"[callResults.partialReceive]"@#@ @source: @#@"Partial Receive"@#@
// @key: @#@"[callResults.blocked]"@#@ @source: @#@"Blocked"@#@
// @key: @#@"[callResults.callConnected]"@#@ @source: @#@"Call connected"@#@
// @key: @#@"[callResults.noAnswer]"@#@ @source: @#@"No Answer"@#@
// @key: @#@"[callResults.internationalDisabled]"@#@ @source: @#@"International Disabled"@#@
// @key: @#@"[callResults.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[callResults.faxSendError]"@#@ @source: @#@"Fax Send Error"@#@
// @key: @#@"[callResults.sent]"@#@ @source: @#@"Sent"@#@
// @key: @#@"[callResults.callFailed]"@#@ @source: @#@"Call Failed"@#@
// @key: @#@"[callResults.internalError]"@#@ @source: @#@"Internal Error"@#@
// @key: @#@"[callResults.IPPhoneOffline]"@#@ @source: @#@"IP Phone Offline"@#@
// @key: @#@"[callResults.restrictedNumber]"@#@ @source: @#@"Restricted Number"@#@
// @key: @#@"[callResults.wrongNumber]"@#@ @source: @#@"Wrong Number"@#@
// @key: @#@"[callResults.stopped]"@#@ @source: @#@"Stopped"@#@
// @key: @#@"[callResults.suspendedAccount]"@#@ @source: @#@"Suspended Account"@#@
// @key: @#@"[callResults.hangUp]"@#@ @source: @#@"Hung up"@#@
// @key: @#@"[callResults.HangUp]"@#@ @source: @#@"Hung up"@#@
// @key: @#@"[callResults.abandoned]"@#@ @source: @#@"Abandoned"@#@
// @key: @#@"[callResults.declined]"@#@ @source: @#@"Declined"@#@
// @key: @#@"[callResults.faxReceipt]"@#@ @source: @#@"Fax Receipt"@#@
// @key: @#@"[callResults.disconnected]"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"[callResults.notAllowed]"@#@ @source: @#@"Not Allowed"@#@

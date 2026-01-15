/* eslint-disable */
import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

export default {
  [messageSenderMessages.sendSuccess]: 'Onnistui!',
  [messageSenderMessages.sendError]: 'Jokin meni vikaan lähetettäessä viestiä.',
  [messageSenderMessages.numberValidateError]: 'Puhelinnumeron vahvistusvirhe.',
  [messageSenderMessages.textEmpty]: 'Anna lähetettävän viestin teksti.',
  [messageSenderMessages.noPermission]:
    'Sinulla ei ole lupaa lähettää viestiä.',
  [messageSenderMessages.senderEmpty]:
    'Sinun on valittava numero puhelinnumeroistasi lähettämistä varten',
  [messageSenderMessages.noToNumber]: 'Anna kelvollinen puhelinnumero.',
  [messageSenderMessages.recipientsEmpty]:
    'Anna kelvollinen vastaanottajan puhelinnumero.',
  [messageSenderMessages.textTooLong]:
    'Teksti on liian pitkä, rajoitus 1 000 merkkiä',
  [messageSenderMessages.multipartTextTooLong]:
    'Teksti on liian pitkä, rajoitus 5 000 merkkiä',
  [messageSenderMessages.recipientNumberInvalids]:
    'Anna kelvollinen puhelinnumero.',
  [messageSenderMessages.noAreaCode]:
    'Määritä {areaCodeLink} käyttämään 7-numeroisia paikallispuhelinnumeroita.',
  [messageSenderMessages.specialNumber]:
    'Tekstiviestien lähettämistä hätä-/erikoispalvelunumeroihin ei tueta.',
  [messageSenderMessages.connectFailed]:
    'Yhteys epäonnistui. Yritä myöhemmin uudelleen.',
  [messageSenderMessages.internalError]:
    'Ei voida yhdistää sisäisten virheiden takia. Yritä myöhemmin uudelleen.',
  [messageSenderMessages.notAnExtension]: 'Alanumeroa ei ole olemassa.',
  [messageSenderMessages.networkError]:
    'Ei voida yhdistää verkko-ongelmien takia. Yritä myöhemmin uudelleen.',
  [messageSenderMessages.senderNumberInvalid]:
    'Tarvitset kelvollisen puhelinnumeron, jotta voit lähettää tekstiviestejä yrityksen ulkopuolisille vastaanottajille. Lisää suora numero tiliisi ottamalla yhteyttä järjestelmänvalvojaasi.',
  [messageSenderMessages.notSmsToExtension]:
    'Ei voida lähettää alanumeroon pääpuhelinnumerolla. Jos haluat lähettää alanumeroon, anna vain alanumero.',
  [messageSenderMessages.internationalSMSNotSupported]:
    'Tekstiviestien lähettämistä kansainväliseen numeroon ei tueta.',
  [messageSenderMessages.noInternalSMSPermission]:
    'Sinulla ei ole lupaa lähettää viestejä. Pyydä päivitystä palvelun {brand} tilin järjestelmänvalvojalta.',
  [messageSenderMessages.noSMSPermission]:
    'Sinulla ei ole lupaa lähettää viestejä organisaatiosi ulkopuolisille vastaanottajille.',
  [messageSenderMessages.attachmentCountLimitation]:
    'Yhdessä viestissä voi olla enintään 10 liitettä',
  [messageSenderMessages.attachmentSizeLimitation]:
    'Liitteiden kokonaiskoko ei saa olla suurempi kuin 1,5 Mt viestiä kohden.',
  [messageSenderMessages.noAttachmentToExtension]:
    'Multimediaviestin lähettämistä alanumeroon ei tueta.',
  areaCode: 'suuntanumero',
  [messageSenderMessages.sending]:
    'Viestiä lähetetään… Lähetys voi kestää muutaman minuutin.',
  [messageSenderMessages.shortNumbersNotAvailable]:
    'SMS-viestien lähetys lyhytnumeroihin ei ole käytettävissä.',
} as const;

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"You can enter up to 1,000 characters."@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"You can enter up to 5,000 characters."@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Can't be more than 10 attachments per message"@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"The over all attachment size can't be larger than 1.5 MB per message."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@

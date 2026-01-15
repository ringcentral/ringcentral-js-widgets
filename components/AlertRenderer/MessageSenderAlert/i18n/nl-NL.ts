/* eslint-disable */
import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

export default {
  [messageSenderMessages.sendSuccess]: 'Verzonden.',
  [messageSenderMessages.sendError]:
    'Er is iets fout gegaan bij het verzenden van het bericht.',
  [messageSenderMessages.numberValidateError]: 'Validatiefout telefoonnummer.',
  [messageSenderMessages.textEmpty]: 'Voer de te verzenden tekst in.',
  [messageSenderMessages.noPermission]:
    'U hebt geen machtigingen om berichten te verzenden.',
  [messageSenderMessages.senderEmpty]:
    'U moet een nummer selecteren uit uw telefoonnummers om te verzenden',
  [messageSenderMessages.noToNumber]: 'Voer een geldig telefoonnummer in.',
  [messageSenderMessages.recipientsEmpty]:
    'Voer een geldig nummer van de ontvanger in.',
  [messageSenderMessages.textTooLong]:
    'Tekst is te lang, mag niet langer zijn dan 1000 tekens',
  [messageSenderMessages.multipartTextTooLong]:
    'Tekst is te lang, mag niet langer zijn dan 5000 tekens',
  [messageSenderMessages.recipientNumberInvalids]:
    'Voer een geldig telefoonnummer in.',
  [messageSenderMessages.noAreaCode]:
    'Stel {areaCodeLink} in om lokale telefoonnummers met 7 cijfers te gebruiken.',
  [messageSenderMessages.specialNumber]:
    'Het verzenden van berichten naar noodnummers/speciale servicenummers wordt niet ondersteund.',
  [messageSenderMessages.connectFailed]:
    'Verbinding mislukt. Probeer het later opnieuw.',
  [messageSenderMessages.internalError]:
    'Kan geen verbinding maken vanwege interne fouten. Probeer het later opnieuw.',
  [messageSenderMessages.notAnExtension]: 'Het extensienummer bestaat niet.',
  [messageSenderMessages.networkError]:
    'Kan geen verbinding maken vanwege netwerkfouten. Probeer het later opnieuw.',
  [messageSenderMessages.senderNumberInvalid]:
    'Een geldig telefoonnummer is vereist om tekstberichten te verzenden naar ontvangers buiten uw bedrijf. Neem contact op met uw beheerder om een direct nummer toe te voegen aan uw account.',
  [messageSenderMessages.notSmsToExtension]:
    'Kan niet verzenden naar een extensienummer met een hoofdtelefoonnummer. Voer het extensienummer in om hiernaar te verzenden.',
  [messageSenderMessages.internationalSMSNotSupported]:
    'Het verzenden van sms-berichten naar internationale telefoonnummers wordt niet ondersteund.',
  [messageSenderMessages.noInternalSMSPermission]:
    'U hebt geen machtigingen om berichten te verzenden. Neem contact op met uw {brand}-accountbeheerder voor een upgrade.',
  [messageSenderMessages.noSMSPermission]:
    'U hebt geen machtigingen om berichten te verzenden naar ontvangers buiten uw organisatie.',
  [messageSenderMessages.attachmentCountLimitation]:
    'Er kunnen niet meer dan 10 bijlagen per bericht zijn',
  [messageSenderMessages.attachmentSizeLimitation]:
    'De totale bijlage kan niet groter zijn dan 1,5 MB per bericht.',
  [messageSenderMessages.noAttachmentToExtension]:
    'Het verzenden van mms naar een extensie wordt niet ondersteund.',
  areaCode: 'netnummer',
  [messageSenderMessages.sending]:
    'Bericht wordt verzonden. Het kan een paar minuten duren voordat dit voltooid is.',
  [messageSenderMessages.shortNumbersNotAvailable]:
    "Het verzenden van sms'jes naar korte nummers is niet beschikbaar.",
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

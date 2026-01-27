/* eslint-disable */
export default {
  downloadFaxBackendError:
    'Jokin meni vikaan palvelussamme, ja faksin lataaminen epäonnistui. Yritä myöhemmin uudelleen.',
  downloadFaxNetworkIssue:
    'Faksin lataaminen epäonnistui. Tarkista verkkoyhteys ja yritä uudelleen.',
  recipientNumberInvalids: 'Anna kelvollinen puhelinnumero.',
  maxAttachmentSizeReached:
    'Liitetiedoston koon ei tule olla yli {maxAllowedSize} Mt.',
  maxAttachmentsSizeReached:
    'Liitetiedostojen koon ei tule olla yli {maxAllowedSize} Mt.',
  faxSuccessSubmitted: 'Faksi lähetetty.',
  faxSubmitFailed: 'Faksin lähetys epäonnistui.',
} as const;

// @key: @#@"downloadFaxBackendError"@#@ @source: @#@"Sorry, something went wrong on our end and we aren't able to download the fax. Try again later."@#@
// @key: @#@"downloadFaxNetworkIssue"@#@ @source: @#@"We weren't able to download the fax. Check your network connection, then try again."@#@
// @key: @#@"recipientNumberInvalids"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"maxAttachmentSizeReached"@#@ @source: @#@"Attached file should not exceed {maxAllowedSize} MB."@#@
// @key: @#@"maxAttachmentsSizeReached"@#@ @source: @#@"Attached files should not exceed {maxAllowedSize} MB."@#@
// @key: @#@"faxSuccessSubmitted"@#@ @source: @#@"Fax submitted."@#@
// @key: @#@"faxSubmitFailed"@#@ @source: @#@"Outbound fax failed."@#@

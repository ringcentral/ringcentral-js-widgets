/* eslint-disable */
export default {
  sending: 'Nachricht wird versendet … Dies kann einige Minuten dauern.',
  noSMSPermission:
    'Sie verfügen nicht über die Berechtigung zum Versenden von Nachrichten an Empfänger außerhalb des Unternehmens.',
  attachmentCountLimitation: 'Pro Nachricht sind maximal 10 Anhänge zulässig',
  attachmentSizeLimitation:
    'Die Gesamtgröße der Anhänge darf 1,5 MB pro Nachricht nicht überschreiten.',
} as const;

// @key: @#@"sending"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"noSMSPermission"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"attachmentCountLimitation"@#@ @source: @#@"Can't be more than 10 attachments per message"@#@
// @key: @#@"attachmentSizeLimitation"@#@ @source: @#@"The over all attachment size can't be larger than 1.5 MB per message."@#@

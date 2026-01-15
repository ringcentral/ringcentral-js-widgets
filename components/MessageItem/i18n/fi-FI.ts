/* eslint-disable */
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
export default {
  addLog: 'Loki',
  editLog: 'Muokkaa lokia',
  viewDetails: 'Näytä tiedot',
  addEntity: 'Luo uusi',
  call: 'Soita',
  text: 'Tekstiviesti',
  conversation: 'Keskustelu',
  groupConversation: 'Ryhmäkeskustelu',
  voiceMessage: 'Ääniviesti',
  [messageTypes.voiceMail]: 'Vastaajaviesti',
  [messageTypes.fax]: 'Faksi',
  mark: 'Merkitse lukemattomaksi',
  unmark: 'Merkitse luetuksi',
  delete: 'Poista',
  faxSent: 'Faksi lähetetty',
  faxReceived: 'Faksi vastaanotettu',
  pages: 'sivua',
  page: 'sivu',
  preview: 'Näytä',
  download: 'Lataa',
  mmsWithOneAttachment: 'Multimediaviesti ja 1 liite',
  mmsWithAttachments: 'Multimediaviesti ja {count} liitettä',
} as const;

// @key: @#@"addLog"@#@ @source: @#@"Log"@#@
// @key: @#@"editLog"@#@ @source: @#@"Edit Log"@#@
// @key: @#@"viewDetails"@#@ @source: @#@"View Details"@#@
// @key: @#@"addEntity"@#@ @source: @#@"Create New"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"conversation"@#@ @source: @#@"Conversation"@#@
// @key: @#@"groupConversation"@#@ @source: @#@"Group Conversation"@#@
// @key: @#@"voiceMessage"@#@ @source: @#@"Voice message"@#@
// @key: @#@"[messageTypes.voiceMail]"@#@ @source: @#@"Voice Mail"@#@
// @key: @#@"[messageTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"mark"@#@ @source: @#@"Mark as Unread"@#@
// @key: @#@"unmark"@#@ @source: @#@"Mark as Read"@#@
// @key: @#@"delete"@#@ @source: @#@"Delete"@#@
// @key: @#@"faxSent"@#@ @source: @#@"Fax sent"@#@
// @key: @#@"faxReceived"@#@ @source: @#@"Fax received"@#@
// @key: @#@"pages"@#@ @source: @#@"pages"@#@
// @key: @#@"page"@#@ @source: @#@"page"@#@
// @key: @#@"preview"@#@ @source: @#@"View"@#@
// @key: @#@"download"@#@ @source: @#@"Download"@#@
// @key: @#@"mmsWithOneAttachment"@#@ @source: @#@"MMS with 1 attachment"@#@
// @key: @#@"mmsWithAttachments"@#@ @source: @#@"MMS with {count} attachments"@#@

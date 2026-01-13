/* eslint-disable */
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
export default {
  addLog: 'Journal',
  editLog: 'Modifier le journal',
  viewDetails: 'Afficher les détails',
  addEntity: 'Créer nouveau',
  call: 'Appel',
  text: 'SMS',
  conversation: 'Conversation',
  groupConversation: 'Conversation de groupe',
  voiceMessage: 'Message vocal',
  [messageTypes.voiceMail]: 'Messagerie vocale',
  [messageTypes.fax]: 'Fax',
  mark: 'Marquer comme non lu',
  unmark: 'Marquer comme lu',
  delete: 'Supprimer',
  faxSent: 'Fax envoyé',
  faxReceived: 'Fax reçu',
  pages: 'pages',
  page: 'page',
  preview: 'Afficher',
  download: 'Télécharger',
  mmsWithOneAttachment: 'MMS avec 1 pièce jointe',
  mmsWithAttachments: 'MMS avec {count} pièces jointes',
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

import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';

export default {
  addLog: 'Log',
  editLog: 'Edit Log',
  viewDetails: 'View Details',
  addEntity: 'Create New',
  call: 'Call',
  text: 'Text',
  conversation: 'Conversation',
  groupConversation: 'Group Conversation',
  voiceMessage: 'Voice message',
  [messageTypes.voiceMail]: 'Voice Mail',
  [messageTypes.fax]: 'Fax',
  mark: 'Mark as Unread',
  unmark: 'Mark as Read',
  delete: 'Delete',
  faxSent: 'Fax sent',
  faxReceived: 'Fax received',
  pages: 'pages',
  page: 'page',
  preview: 'View',
  download: 'Download',
  imageAttachment: 'Attachment: {count} image',
  fileAttachment: 'Attachment: {count} file',
} as const;

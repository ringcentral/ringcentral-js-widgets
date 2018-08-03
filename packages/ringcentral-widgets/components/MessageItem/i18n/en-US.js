import messageTypes from 'ringcentral-integration/enums/messageTypes';

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
  mark: 'Mark as Unread',
  unmark: 'Mark as Read',
  delete: 'Delete',
  faxSent: 'Fax sent',
  faxReceived: 'Fax received',
  pages: 'pages',
  preview: 'View',
  download: 'Download',
  imageAttachment: 'Attachment: 1 image',
};

import messageTypes from 'ringcentral-integration/enums/messageTypes';

export default {
  addLog: 'Log',
  editLog: 'Edit Log',
  viewDetails: 'View Details',
  addEntity: 'Create New',
  call: 'Call',
  conversation: 'Conversation',
  groupConversation: 'Group Conversation',
  voiceMessage: 'Voice message',
  [messageTypes.voiceMail]: 'Voice Mail',
  mark: 'Mark',
  unmark: 'Unmark',
};

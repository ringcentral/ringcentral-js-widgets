/* eslint-disable */
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
export default {
  addLog: '記錄',
  editLog: '編輯記錄',
  viewDetails: '檢視詳細資訊',
  addEntity: '建立',
  call: '通話',
  text: '文字',
  conversation: '對話',
  groupConversation: '群組對話',
  voiceMessage: '語音訊息',
  [messageTypes.voiceMail]: '語音訊息',
  [messageTypes.fax]: '傳真',
  mark: '標示為未讀',
  unmark: '標示為已讀',
  delete: '刪除',
  faxSent: '已傳送傳真',
  faxReceived: '已接收傳真',
  pages: '頁',
  page: '頁',
  preview: '檢視',
  download: '下載',
  mmsWithOneAttachment: '多媒體訊息包含 1 個附件',
  mmsWithAttachments: '多媒體訊息包含 {count} 個附件',
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

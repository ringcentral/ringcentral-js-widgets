export const EvMessageTypes = {
  ACK: 'ACK',
  ADD_SESSION: 'ADD-SESSION',
  AGENT_DEBUG_EMAIL: 'AGENT-DEBUG-EMAIL',
  BARGE_IN: 'BARGE-IN',
  AGENT_STATE: 'AGENT-STATE',
  CALL_NOTES: 'CALL-NOTES',
  CALLBACK_PENDING: 'PENDING-CALLBACKS',
  CALLBACK_CANCEL: 'CANCEL-CALLBACK',
  CAMPAIGN_DISPOSITIONS: 'CAMPAIGN-DISPOSITIONS',
  CHAT_SEND: 'CHAT', // internal chat
  CHAT_ALIAS: 'CHAT-ALIAS', // internal chat
  CHAT_ROOM: 'CHAT-ROOM', // internal chat
  CHAT_ROOM_STATE: 'CHAT-ROOM-STATE', // internal chat
  CHAT_ACTIVE: 'CHAT-ACTIVE', // external chat
  CHAT_CANCELLED: 'CHAT-CANCELLED', // external chat
  CHAT_INACTIVE: 'CHAT-INACTIVE', // external chat
  CHAT_DISPOSITION: 'CHAT-DISPOSITION', // external chat
  CHAT_MESSAGE: 'CHAT-MESSAGE', // external chat
  CHAT_NEW: 'NEW-CHAT', // external chat
  CHAT_PRESENTED: 'CHAT-PRESENTED', // external chat
  CHAT_PRESENTED_RESPONSE: 'CHAT-PRESENTED-RESPONSE', // external chat
  CHAT_REQUEUE: 'CHAT-REQUEUE', // external chat
  CHAT_STATE: 'CHAT-STATE', // external chat
  CHAT_TYPING: 'CHAT-TYPING', // external chat
  MONITOR_CHAT: 'CHAT-MONITOR', // external chat
  CHAT_ADD_SESSION: 'ADD-CHAT-SESSION', // external chat
  STOP_MONITOR_CHAT: 'CHAT-DROP-MONITORING-SESSION', // external chat
  LEAVE_CHAT: 'CHAT-DROP-SESSION', // external chat
  CHAT_LIST: 'CHAT-LIST', // external chat
  CHAT_AGENT_END: 'CHAT-END', // external chat
  CHAT_CLIENT_RECONNECT: 'CHAT-CLIENT-RECONNECT', // external chat
  CHAT_MANUAL_SMS: 'MANUAL-SMS', // external chat
  PENDING_CHAT_DISP: 'PENDING-CHAT-DISP', // external chat
  DIAL_GROUP_CHANGE: 'DIAL_GROUP_CHANGE',
  DIAL_GROUP_CHANGE_PENDING: 'DIAL_GROUP_CHANGE_PENDING',
  DROP_SESSION: 'DROP-SESSION',
  EARLY_UII: 'EARLY_UII',
  END_CALL: 'END-CALL',
  GATES_CHANGE: 'GATES_CHANGE',
  GENERIC: 'GENERIC',
  HANGUP: 'HANGUP',
  HOLD: 'HOLD',
  INBOUND_DISPOSITION: 'INBOUND-DISPOSITION',
  LEAD_HISTORY: 'LEAD-HISTORY',
  LEAD_INSERT: 'LEAD-INSERT',
  LEAD_UPDATE: 'LEAD-UPDATE',
  LOGIN: 'LOGIN',
  LOGIN_PHASE_1: 'LOGIN-PHASE-1',
  LOGOUT: 'LOGOUT',
  NEW_CALL: 'NEW-CALL',
  OFFHOOK_INIT: 'OFF-HOOK-INIT',
  OFFHOOK_TERM: 'OFF-HOOK-TERM',
  ON_MESSAGE: 'ON-MESSAGE',
  ONE_TO_ONE_OUTDIAL: 'ONE-TO-ONE-OUTDIAL',
  ONE_TO_ONE_OUTDIAL_CANCEL: 'ONE-TO-ONE-OUTDIAL-CANCEL',
  OUTDIAL_DISPOSITION: 'OUTDIAL-DISPOSITION',
  PAUSE_RECORD: 'PAUSE-RECORD',
  PING_CALL: 'PING-CALL',
  PREVIEW_DIAL: 'PREVIEW-DIAL',
  PENDING_DISP: 'PENDING_DISP',
  PREVIEW_DIAL_ID: 'PREVIEW_DIAL',
  PREVIEW_LEAD_STATE: 'PREVIEW-LEAD-STATE',
  RECORD: 'RECORD',
  REQUEUE: 'RE-QUEUE',
  REVERSE_MATCH: 'REVERSE_MATCH',
  SCRIPT_CONFIG: 'SCRIPT-CONFIG',
  SCRIPT_RESULT: 'SCRIPT-RESULT',
  STATS: 'STATS',
  STATS_AGENT: 'AGENT',
  STATS_AGENT_DAILY: 'AGENTDAILY',
  STATS_CAMPAIGN: 'CAMPAIGN',
  STATS_QUEUE: 'GATE',
  STATS_CHAT: 'CHAT',
  SUPERVISOR_LIST: 'SUPERVISOR-LIST', // internal chat
  TCPA_SAFE: 'TCPA-SAFE',
  TCPA_SAFE_ID: 'TCPA_SAFE',
  TCPA_SAFE_LEAD_STATE: 'TCPA-SAFE-LEAD-STATE',
  XFER_COLD: 'COLD-XFER',
  XFER_WARM: 'WARM-XFER',
  XFER_WARM_CANCEL: 'WARM-XFER-CANCEL',
  DIRECT_AGENT_TRANSFER_LIST: 'DIRECT-AGENT-TRANSFER-LIST',
  DIRECT_AGENT_TRANSFER: 'DIRECT-AGENT-TRANSFER',
  DIRECT_AGENT_ROUTE: 'DIRECT-AGENT-ROUTE',
  UPDATE_DIAL_DESTINATION: 'UPDATE_DIAL_DESTINATION',
} as const;

export type EvMessageType =
  (typeof EvMessageTypes)[keyof typeof EvMessageTypes];

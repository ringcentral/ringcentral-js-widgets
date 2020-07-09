import {
  EvAddSessionNotification,
  EvAgentConfig,
  EvAgentStateResponse,
  EvBaseCall,
  EvDropSessionNotification,
  EvEndedCall,
  EvHoldResponse,
  EvOffhookInitResponse,
  EvReceivedTransferCall,
} from './EvSdkResponse.interface';

// TODO: link with `SdkResponse.interface`

export interface EvClientCallMapping {
  acknowledgeResponse: any;
  addSessionNotification: EvAddSessionNotification;
  agentDebugEmailNotification: any;
  agentStateResponse: EvAgentStateResponse;
  authenticateResponse: any;
  bargeInResponse: any;
  callbackCancelResponse: any;
  callbacksPendingResponse: any;
  callNotesResponse: any;
  campaignDispositionsResponse: any;
  chatResponse: any;
  chatActiveNotification: any;
  addChatSessionNotification: any;
  chatCancelledNotification: any;
  chatClientReconnectNotification: any;
  chatInactiveNotification: any;
  chatListResponse: any;
  chatMessageNotification: any;
  chatNewNotification: any;
  chatPresentedNotification: any;
  chatRoomStateResponse: any;
  chatStateResponse: any;
  stopAgentChatMonitorNotification: any;
  chatTypingNotification: any;
  closeResponse: any;
  coachResponse: any;
  configureResponse: any;
  dialGroupChangeNotification: any;
  dialGroupChangePendingNotification: any;
  directAgentTransferResponse: any;
  directAgentTransferListResponse: any;
  directAgentTransferNotification: EvReceivedTransferCall;
  dropSessionNotification: EvDropSessionNotification;
  earlyUiiNotification: any;
  endCallNotification: EvEndedCall;
  gatesChangeNotification: any;
  genericNotification: any;
  genericResponse: any;
  holdResponse: EvHoldResponse;
  leadHistoryResponse: any;
  leadInsertResponse: any;
  leadSearchResponse: any;
  leadUpdateResponse: any;
  loginResponse: any;
  loginPhase1Response: EvAgentConfig;
  multiSocketResponse: any;
  logoutResponse: any;
  logConsoleResultsResponse: any;
  logResultsResponse: any;
  newCallNotification: EvBaseCall;
  offhookInitResponse: EvOffhookInitResponse;
  offhookTermNotification: any;
  openResponse: { reconnect: boolean };
  pauseRecordResponse: any;
  pendingChatDispNotification: any;
  pendingDispNotification: any;
  previewFetchResponse: any;
  previewLeadStateNotification: any;
  recordResponse: any;
  requeueResponse: any;
  reverseMatchNotification: any;
  safeModeFetchResponse: any;
  safeModeSearchResponse: any;
  scriptConfigResponse: any;
  monitorResponse: any;
  agentStats: any;
  agentDailyStats: any;
  campaignStats: any;
  chatQueueStats: any;
  queueStats: any;
  supervisorListResponse: any;
  tcpaSafeLeadStateNotification: { leadState: any };
  webRtcInfoResponse: any;
  coldXferResponse: any;
  warmXferResponse: any;
  searchDirectoryResponse: any;
  extensionPresenceInfo: any;
  sipConnectedNotification: any;
  sipDialDestChangedNotification: any;
  sipEndedNotification: any;
  sipMuteResponse: any;
  sipRegisteredNotification: any;
  sipRegistrationFailedNotification: any;
  sipRingingNotification: {
    message: string;
    // This type from sip.js => IncomingRequest
    data: { request: { from: { displayName: string }; friendlyName: string } };
  };
  sipSwitchRegistrarNotification: any;
  sipUnmuteResponse: any;
  sipUnregisteredNotification: any;
}

export type EvClientCallBackValueType = keyof EvClientCallMapping;

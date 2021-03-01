import {
  DirectTransferNotificationTypes,
  DirectTransferStatues,
  DirectTransferTypes,
  AgentTypesType,
  OriginAgentTypesType,
} from '../../../enums';

export type EvTokenType = 'Bearer';
export type EvOkFail = 'OK' | 'FAILURE';
export type EvSessionType = 'AGENT' | 'OUTBOUND' | 'INBOUND';

export type EvBaseCall = {
  uii: string;
  agentId: string;
  dialDest: string;
  queueDts: string; // 2019-11-11 12:35:23
  queueTime: string;
  ani: string;
  dnis: string;
  callType: 'INBOUND' | 'OUTBOUND';
  appUrl: string;
  isMonitoring: boolean;
  allowHold: boolean;
  allowTransfer: boolean;
  allowManualInternationalTransfer: boolean;
  allowDirectAgentTransfer: string;
  allowHangup: boolean;
  allowRequeue: boolean;
  allowEndCallForEveryone: boolean;
  scriptId: string;
  scriptVersion: string;
  surveyId: string;
  surveyPopType: string;
  requeueType: string;
  hangupOnDisposition: boolean;
  queue: EvQueue;
  agentRecording: EvAgentRecording;
  outdialDispositions: EvOutdialDispositions;
  requeueShortcuts: any[];
  baggage: EvBaggage;
  scriptResponse: {};
  lead: EvLead;
  // sessionId: string;
  transferPhoneBook: EvTransferPhoneBookItem[];
};

export interface EvACKResponse {
  message: string;
  detail: string;
  uii: string;
  status: EvOkFail;
  type: string;
}

export interface EvEndedCall {
  message: string;
  detail: string;
  uii: string;
  sessionId: string;
  agentId: string;
  callDts: string;
  duration: string;
  termParty: string;
  termReason: string;
  recordingUrl: string;
  dispositionTimeout: string;
}
export interface EvTransferPhoneBookItem {
  name: string;
  destination: string;
  countryId: string;
}

export interface EvLead {
  leadPhone: string;
  showLeadInfo: string;
  extraData: {};
}

export interface EvScriptResponse {
  message: string;
  detail: string;
  status: boolean;
  scriptId: string;
  scriptName?: string;
  version: string;
  json: string; // format as: EvScriptResponseJSON
}

export interface EvBaggage {
  ani: string;
  dnis: string;
  uii: string;
  sourceId: string;
  sourceName: string;
  sourceDesc: string;
  sourceType: string;
  agentFirstName: string;
  agentLastName: string;
  agentExternalId: string;
  agentType: string;
  agentEmail: string;
  agentUserName: string;
  ivrCrmCaseId: string;
  ivrCrmRecordId: string;
  ivrCrmObjectValue: string;
  ivrCrmObjectType: string;
  ivrAlertSubject_1: string;
  ivrAlertBody_1: string;
  ivrAlertSubject_2: string;
  ivrAlertBody_2: string;
  ivrAlertSubject_3: string;
  ivrAlertBody_3: string;
}

export interface EvReceivedTransferCall {
  message: string;
  detail: string;
  status: DirectTransferNotificationTypes;
  agentId: string;
  uii: string;
  ani: string;
  dnis: string;
  sourceType: string;
  sourceId: string;
  sourceName: string;
  voicemailUrl: string;
}

export interface EvAgentRecording {
  default: string;
  pause: string;
  agentRecording: boolean;
}

export interface EvQueue {
  isCampaign: boolean;
  number: string;
  name: string;
  description: string;
}

export interface EvOutdialDispositions {
  type: string;
  dispositions: EvDisposition[];
}

export interface EvDisposition {
  contactForwarding: boolean;
  dispositionId: string;
  isComplete: boolean;
  isDefault: boolean;
  requireNote: boolean;
  saveSurvey: boolean;
  timeout: string;
  xfer: boolean;
  disposition: string;
}

export interface EvClientOptions {
  options: EvAgentOptions;
  callbacks?: {
    closeResponse: () => void;
    openResponse: (response: EvOpenSocketResult) => void;
  };
}

export type Deps = {
  evClientOptions: EvClientOptions;
};

export interface EvHoldResponse {
  message: string;
  detail: string;
  status: EvOkFail;
  holdState: boolean;
  sessionId: string;
  uii: string;
}

export interface EvDropSessionNotification {
  message: string;
  detail: string;
  status: EvOkFail;
  transferEnd: {
    sessionId: string;
    destination: string;
    uii: string;
  };
  sessionId: string;
  uii: string;
}

export interface EvAddSessionNotification {
  message: string;
  detail: string;
  status: EvOkFail;
  sessionId: string;
  uii: string;
  phone: string;
  sessionType: EvSessionType;
  sessionLabel: string;
  allowControl: boolean;
  monitoring: boolean;
  agentId: string;
  agentName: string;
  recordingUrl: string;
  transferSessions: {
    [P: string]: {
      sessionId: string;
      destination: string;
      uii: string;
    };
  };
}

export interface EvOpenSocketResult {
  reconnect?: boolean;
  error?: string;
}

export interface EvAgentInfo {
  type: string;
  data: EvAgentData;
}

export interface EvAgentData {
  authenticateResponse: EvAuthenticateAgentWithRcAccessTokenRes;
  agentConfig: EvAgentConfig;
}

export interface EvAgentOptions {
  authHost: string;
  localTesting: boolean;
  allowMultiSocket: boolean;
  isSecureSocket: boolean;
}

export type EvCallback = (messageType: any, response: any) => void;

export type EvMessageRes = {
  type: string;
  data: EvAgentConfig;
};

export interface EvOffhookInitResponse {
  detail: string;
  message: string;
  monitoring: boolean;
  status: string;
}

export interface EvOffhookTermResponse {
  detail: string;
  message: string;
  monitoring: boolean;
  status: string;
}

export interface EvAgentConfig {
  message: string;
  detail: string;
  status: string;
  agentSettings: EvAgentSettings;
  agentPermissions: EvAgentPermissions;
  applicationSettings: EvApplicationSettings;
  chatSettings: EvChatSettings;
  connectionSettings: EvConnectionSettings;
  inboundSettings: EvInboundSettings;
  outboundSettings: EvOutboundSettings;
  scriptSettings: EvScriptSettings;

  holdState?: boolean;
  sessionId?: string;
  uii?: string;
}

export interface EvScriptSettings {
  availableScripts: EvAvailableScript[];
  loadedScripts: EvAllowLeadUpdatesByCampaign;
}

export interface EvAvailableScript {
  scriptId: string;
  scriptName: string;
}

export interface EvOutboundSettings {
  availableCampaigns: any[];
  availableOutdialGroups: any[];
  insertCampaigns: any[];
  defaultDialGroup: string;
  outdialGroup: EvAllowLeadUpdatesByCampaign;
  previewDialLeads: any[];
  tcpaSafeLeads: any[];
  campaignDispositions: any[];
}

export interface EvInboundSettings {
  availableQueues: EvAvailableQueue[];
  availableSkillProfiles: EvAvailableSkillProfile[];
  queues: any[];
  skillProfile: EvAvailableSkillProfile;
  availableRequeueQueues: EvAvailableRequeueQueue[];
}

export interface EvAvailableSkillProfile {
  profileId: string;
  profileName: string;
  isDefault?: string;
  profileDesc?: string;
}

export interface EvAvailableRequeueQueue {
  gateGroupId: string;
  groupName: string;
  gates: EvGate[];
  skills: EvSkill[];
}

export interface EvSkill {
  skillDesc: string;
  skillId: string;
  skillName: string;
}

export interface EvGate {
  gateDesc: string;
  gateId: string;
  gateName: string;
}

export interface EvAvailableQueue {
  defaultDestOverride?: string;
  gateDesc?: string;
  gateId: string;
  gateName: string;
}

export interface EvConnectionSettings {
  hashCode?: any;
  reconnect: boolean;
}

export interface EvChatSettings {
  availableChatQueues: any[];
  availableChatRooms: EvAvailableChatRoom[];
  chatQueues: any[];
  alias: string;
  availableChatRequeueQueues: any[];
}

export interface EvAvailableChatRoom {
  roomDesc: string;
  roomId: string;
  roomName: string;
}

export interface EvApplicationSettings {
  availableCountries: EvAvailableCountry[];
  isLoggedInIS: boolean;
  socketConnected: boolean;
  socketDest: string;
  isTcpaSafeMode: boolean;
  pciEnabled: boolean;
}

export interface EvAvailableCountry {
  countryId: string;
  countryName: string;
}

export interface EvAgentPermissions {
  allowBlended: boolean;
  allowCallControl: boolean;
  allowChat: boolean;
  allowCrossQueueRequeue: boolean;
  allowInbound: boolean;
  allowLeadInserts: boolean;
  allowLeadSearch: boolean;
  allowLoginControl: boolean;
  allowLoginUpdates: boolean;
  allowManualCalls: boolean;
  allowManualPass: boolean;
  allowManualIntlCalls: boolean;
  allowManualOutboundGates: boolean;
  allowOffHook: boolean;
  allowOutbound: boolean;
  allowPreviewLeadFilters: boolean;
  allowLeadUpdatesByCampaign: EvAllowLeadUpdatesByCampaign;
  disableSupervisorMonitoring: boolean;
  progressiveEnabled: boolean;
  requireFetchedLeadsCalled: boolean;
  showLeadHistory: boolean;
  allowAutoAnswer: boolean;
  defaultAutoAnswerOn: boolean;
  allowHistoricalDialing: boolean;
  allowAgentStats: boolean;
  allowCampaignStats: boolean;
  allowGateStats: boolean;
  allowChatStats: boolean;
}

interface EvAllowLeadUpdatesByCampaign {}

export interface EvAgentSettings {
  accountId?: any;
  agentId: string;
  agentType: string;
  altDefaultLoginDest: string;
  availableAgentStates: EvAvailableAgentState[];
  callerIds: EvCallerId[];
  callState?: any;
  currentState: string;
  currentStateLabel: string;
  defaultLoginDest: string;
  dialDest: string;
  email: string;
  externalAgentId: string;
  firstName: string;
  guid: string;
  isLoggedIn: boolean;
  isOffhook: boolean;
  isMonitoring: boolean;
  initLoginState: string;
  initLoginStateLabel: string;
  isOutboundPrepay: boolean;
  lastName: string;
  loginDTS: string;
  loginType: string;
  maxBreakTime: string;
  maxLunchTime: string;
  onCall: boolean;
  onManualOutdial: boolean;
  outboundManualDefaultRingtime: string;
  pendingCallbacks: any[];
  pendingDialGroupChange: number;
  phoneLoginPin: string;
  realAgentType: string;
  supervisors: any[];
  totalCalls: number;
  transferNumber: string;
  updateDGFromAdminUI: boolean;
  updateLoginMode: boolean;
  username: string;
  wasMonitoring: boolean;
  agentPassword: string;
  autoAnswerCalls: boolean;
}

export interface EvCallerId {
  description: string;
  number: string;
}

export interface EvAvailableAgentState {
  agentAuxState: string;
  agentState: string;
  rank: string;
}

export interface RawEvAuthenticateAgentWithRcAccessTokenRes {
  platformId: string;
  rcAccessToken: string;
  tokenType: string;
  authType: string;
  accessToken: string;
  refreshToken?: any;
  socketUrl: string;
  socketPort: number;
  agents: RawEvAgent[];
  // Authenticate Error
  message?: string;
  type?: string;
}

export type EvAuthenticateAgentWithRcAccessTokenRes = Omit<
  RawEvAuthenticateAgentWithRcAccessTokenRes,
  'agents'
> & {
  agents: EvAgents;
};

export interface EvAuthenticateAgentWithEngageAccessTokenRes {
  platformId: string;
  tokenType: string;
  engageAccessToken: string;
  authType: string;
  accessToken: string;
  refreshToken: null;
  socketUrl: string;
  socketPort: number;
  agents: RawEvAgent[];
}

export type EvAgent = Omit<RawEvAgent, 'agentType'> & {
  agentType: AgentTypesType;
};

export type EvAgents = EvAgent[];

export interface RawEvAgent {
  agentId: string;
  firstName: string;
  lastName: string;
  email?: any;
  username: string;
  agentType: OriginAgentTypesType;
  rcUserId: number;
  accountId: string;
  accountName: string;
  agentGroupId?: any;
  externalAgentId?: any;
  location?: any;
  team?: any;
  allowLoginControl: boolean;
  allowLoginUpdates: boolean;
  password?: any;
  agentRank?: any;
  initLoginBaseState?: any;
  ghostRnaAction?: any;
  enableSoftphone?: any;
  altDefaultLoginDest?: any;
  phoneLoginPin?: any;
  manualOutboundDefaultCallerId?: any;
  directAgentExtension?: any;
  maxChats?: any;
}

export interface EvDispositionCallOptions {
  uii: string;
  dispId: string;
  notes?: string;
  callback?: boolean;
  callbackDTS?: string;
  contactForwardNumber?: string;
  survey?: string;
  externId?: string;
  leadId?: string;
  requestId?: string;
}

export interface EvLogoutAgentResponse {
  detail: string;
  message: string;
  status: string;
}

export interface EvDirectAgentListItem {
  agentAuxState: string;
  agentId: string;
  agentState: string;
  available: boolean;
  firstName: string;
  lastName: string;
  pendingDisp: boolean;
  stateDuration: string;
  username: string;
}

export interface EvDirectAgentListResponse {
  status: 'true' | 'false';
  message: EvOkFail;
  agents: EvDirectAgentListItem[];
}

export type EvDirectAgentTransferResponse = {
  message: string;
  detail: string;
  status: DirectTransferStatues;
  type: DirectTransferTypes;
};

export interface EvTransferCallResponse {
  agentId: string;
  uii: string;
  sessionId: string;
  status: EvOkFail;
  dialDest: string;
  message: string;
  detail: string;
}

export interface EvColdTransferCallResponse extends EvTransferCallResponse {}

export interface EvWarmTransferCallResponse extends EvTransferCallResponse {}

export interface EvColdTransferIntlCallResponse
  extends EvTransferCallResponse {}

export interface EvWarmTransferIntlCallResponse
  extends EvTransferCallResponse {}

export interface EvRequeueCallResponse {
  message: string;
  detail: string;
  status: EvOkFail;
  agentId: string;
  uii: string;
  queueId: string;
}

export interface EvConfigureAgentOptions {
  dialDest: string;
  queueIds?: string[];
  chatIds?: string[];
  skillProfileId?: string;
  dialGroupId?: string;
  updateFromAdminUI?: boolean;
  isForce?: boolean;
  callback?(): void;
}

export interface EvAgentState {
  agentAuxState: string;
  agentState: string;
}

export interface EvDispositionManualPassOptions {
  dispId: string;
  notes: string;
  callbackDTS?: string;
  leadId?: string;
  requestId?: string;
  externId?: string;
}

export interface EvAgentStateResponse {
  message: string;
  detail: string;
  status: string;
  agentId: string;
  previousState: string;
  currentState: string;
  previousAuxState: string;
  currentAuxState: string;
}

export interface EvAgentScriptResult {
  call: EvBaseCall;
  lead: {};
  model: EvAgentScriptResultModel;
  renderFormValid: boolean;
  scriptComplete: boolean;
}

export interface EvAgentScriptResultModel {
  [callId: string]: { value: any; leadField: string };
}

export interface EvCallDispositionItem {
  dispositionId: string;
  notes: string;
}

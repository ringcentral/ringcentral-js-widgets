import {
  CreateSubscriptionRequest,
  SubscriptionInfo,
  CreateDataExportTaskRequest,
  DataExportTask,
  CreateGlipConversationRequest,
  GlipConversationInfo,
  GlipPostTeamBody,
  GlipTeamInfo,
  GlipPostMembersListBody,
  GlipPostMembersIdsListBody,
  GlipPostPostBody,
  GlipPostInfo,
  GlipAdaptiveCardRequest,
  GlipAdaptiveCardShortInfo,
  GlipEventCreate,
  GlipEventInfo,
  GlipNoteCreate,
  GlipNoteInfo,
  GlipCreateTask,
  GlipTaskInfo,
  GlipCompleteTask,
  GlipWebhookInfo,
  PerformanceCallsAggregatesRequest,
  PerformanceCallsAggregatesResponse,
  InvalidRequestResponse,
  LoginToExtensionRequiredErrorResponse,
  ForbiddenRequestErrorResponse,
  InternalServerErrorResponse,
  PerformanceCallsTimelineRequest,
  PerformanceCallsTimelineResponse,
  AuthorizeRequest,
  RevokeTokenRequest,
  GetTokenRequest,
  TokenInfo,
  PersonalContactRequest,
  PersonalContactResource,
  SearchDirectoryEntriesRequest,
  DirectoryResource,
  ADGErrorResponse,
  AddBlockedAllowedPhoneNumber,
  BlockedAllowedPhoneNumberInfo,
  CreateForwardingNumberRequest,
  ForwardingNumberInfo,
  CreateAnsweringRuleRequest,
  CustomAnsweringRuleInfo,
  CompanyAnsweringRuleRequest,
  CompanyAnsweringRuleInfo,
  CreateCompanyGreetingRequest,
  CustomCompanyGreetingInfo,
  CreateCustomUserGreetingRequest,
  CustomUserGreetingInfo,
  CreateIVRPromptRequest,
  PromptInfo,
  IVRMenuInfo,
  BulkAccountCallRecordingsResource,
  CreateSMSMessageBatchRequest,
  MessageBatchInfo,
  ASGErrorResponse,
  OptOutBulkAssignRequest,
  OptOutBulkAssignResponse,
  ErrorResponse,
  CreateSipRegistrationRequest,
  CreateSipRegistrationResponse,
  CustomFieldCreateRequest,
  CustomFieldResource,
  MeetingRequestResource,
  MeetingResponseResource,
  CreateUserMeetingProfileImageRequest,
  CreateSMSMessage,
  GetSMSMessageInfoResponse,
  CreateMMSMessage,
  CreateInternalTextMessageRequest,
  GetInternalTextMessageInfoResponse,
  CreateFaxMessageRequest,
  FaxResponse,
  ParsePhoneNumberRequest,
  ParsePhoneNumberResponse,
  CreateMessageStoreReportRequest,
  MessageStoreReport,
  BulkAssignAutomaticLocationUpdatesUsers,
  CreateWirelessPoint,
  WirelessPointInfo,
  CreateNetworkRequest,
  NetworkInfo,
  AssignMultipleDevicesAutomaticLocationUpdates,
  CreateSwitchInfo,
  SwitchInfo,
  CreateMultipleSwitchesRequest,
  CreateMultipleSwitchesResponse,
  UpdateMultipleSwitchesRequest,
  UpdateMultipleSwitchesResponse,
  CreateMultipleWirelessPointsRequest,
  CreateMultipleWirelessPointsResponse,
  UpdateMultipleWirelessPointsRequest,
  UpdateMultipleWirelessPointsResponse,
  ValidateMultipleWirelessPointsRequest,
  ValidateMultipleWirelessPointsResponse,
  ValidateMultipleSwitchesRequest,
  ValidateMultipleSwitchesResponse,
  EmergencyLocationInfoRequest,
  CreateUserEmergencyLocationRequest,
  EmergencyLocationInfo,
  CreateUserProfileImageRequest,
  ExtensionCreationRequest,
  ExtensionCreationResponse,
  CallQueueBulkAssignResource,
  EditPagingGroupRequest,
  CreateCallMonitoringGroupRequest,
  CallMonitoringGroup,
  CallMonitoringBulkAssign,
  ExtensionBulkUpdateRequest,
  ExtensionBulkUpdateTaskResource,
  AddressBookBulkUploadRequest,
  AddressBookBulkUploadResponse,
  BulkRoleAssignResource,
  RoleResource,
  MakeRingOutRequest,
  GetRingOutStatusResponse,
  CreateUser,
  UserResponse,
  ScimErrorResponse,
  SearchRequest,
  UserSearchResponse,
  MakeCallOutRequest,
  CallSession,
  CallSessionObject,
  CallParty,
  IgnoreRequestBody,
  TransferTarget,
  BridgeTargetRequest,
  AnswerTarget,
  PickupTarget,
  ForwardTarget,
  CallPartyReply,
  ReplyParty,
  CallPartyFlip,
  AddPartyRequest,
  SuperviseCallSessionRequest,
  SuperviseCallSession,
  PartySuperviseRequest,
  PartySuperviseResponse,
} from '../interfaces';

export interface Post {
  '/restapi/v1.0/subscription': {
    parameters: {};
    requestBody: CreateSubscriptionRequest;
    responses: {
      /**
       * Created Subscription
       */
      200: SubscriptionInfo;
    };
  };
  '/restapi/v1.0/subscription/:subscriptionId/renew': {
    parameters: {
      /**
       *
       */
      subscriptionId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Renewed Subscription
       */
      200: SubscriptionInfo;
    };
  };
  '/restapi/v1.0/glip/data-export': {
    parameters: {};
    requestBody?: CreateDataExportTaskRequest;
    responses: {
      /**
       * OK
       */
      200: DataExportTask;
    };
  };
  '/restapi/v1.0/glip/conversations': {
    parameters: {};
    requestBody: CreateGlipConversationRequest;
    responses: {
      /**
       * Conversation is opened
       */
      200: GlipConversationInfo;

      /**
       * Conversation is created
       */
      201: GlipConversationInfo;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;
    };
  };
  '/restapi/v1.0/glip/teams': {
    parameters: {};
    requestBody: GlipPostTeamBody;
    responses: {
      /**
       * Created
       */
      201: GlipTeamInfo;

      /**
       * One of body parameters has invalid value.
       */
      400: any;
    };
  };
  '/restapi/v1.0/glip/teams/:chatId/join': {
    parameters: {
      /**
       * Internal identifier of a team to be joined.
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Reset Content
       */
      205: any;

      /**
       * Team status is not Active or Team is not public
       */
      403: any;

      /**
       * Team Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/teams/:chatId/leave': {
    parameters: {
      /**
       * Internal identifier of a team to be left.
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Reset Content.
       */
      205: any;

      /**
       * Team status is not Active.
       */
      403: any;

      /**
       * Team Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/teams/:chatId/add': {
    parameters: {
      /**
       * Internal identifier of a team to add members to.
       */
      chatId: string;
    };
    requestBody: GlipPostMembersListBody;
    responses: {
      /**
       * No Content.
       */
      204: any;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * User is not Team Admin.
       */
      403: any;

      /**
       * Team Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/teams/:chatId/remove': {
    parameters: {
      /**
       * Internal identifier of a team to remove members from.
       */
      chatId: string;
    };
    requestBody: GlipPostMembersIdsListBody;
    responses: {
      /**
       * No Content.
       */
      204: any;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * User is not Team Admin.
       */
      403: any;

      /**
       * Team Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/teams/:chatId/archive': {
    parameters: {
      /**
       * Internal identifier of a team to be archived.
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Reset Content
       */
      205: any;

      /**
       * User is not Team Admin
       */
      403: any;

      /**
       * Team Not Found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/teams/:chatId/unarchive': {
    parameters: {
      /**
       * Internal identifier of a team to be made active.
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Reset Content
       */
      205: any;

      /**
       * User is not Team Admin
       */
      403: any;

      /**
       * Team Not Found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/favorite': {
    parameters: {
      /**
       * Internal identifier of a chat to add to favorite list.
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Favorite chat list is limited to 250 unique chats
       */
      400: any;

      /**
       * User is not member of chat
       */
      403: any;

      /**
       * Chat not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/unfavorite': {
    parameters: {
      /**
       * Internal identifier of a chat to remove from favorite list.
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Chat not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/read': {
    parameters: {
      /**
       * Id of chat to be marked
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: any;

      /**
       * No Content
       */
      204: any;

      /**
       * You have no permissions to mark this chat
       */
      403: any;

      /**
       * Chat is not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/unread': {
    parameters: {
      /**
       * Id of chat to be marked
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: any;

      /**
       * No Content
       */
      204: any;

      /**
       * You have no permissions to mark this chat
       */
      403: any;

      /**
       * Chat is not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/posts': {
    parameters: {
      /**
       * Internal identifier of a chat.
       */
      chatId: string;
    };
    requestBody: GlipPostPostBody;
    responses: {
      /**
       * Success
       */
      201: GlipPostInfo;

      /**
       * One of body parameters has invalid value.
       */
      400: any;

      /**
       * Resource for parameter [chatId] is not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/adaptive-cards': {
    parameters: {
      /**
       * Internal identifier of a chat
       */
      chatId: string;
    };
    requestBody: GlipAdaptiveCardRequest;
    responses: {
      /**
       * Created
       */
      201: GlipAdaptiveCardShortInfo;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * You do not have permissions to create adaptive card in the specified chat.
       */
      403: any;

      /**
       * Specified chat ID doesn`t exist.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/events': {
    parameters: {};
    requestBody: GlipEventCreate;
    responses: {
      /**
       * Success
       */
      200: GlipEventInfo;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;
    };
  };
  '/restapi/v1.0/glip/groups/:groupId/events': {
    parameters: {
      /**
       * Internal identifier of a group
       */
      groupId: string;
    };
    requestBody: GlipEventCreate;
    responses: {
      /**
       * Success
       */
      200: GlipEventInfo;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/notes': {
    parameters: {
      /**
       * Internal identifier of a chat to create a note in
       */
      chatId: string;
    };
    requestBody: GlipNoteCreate;
    responses: {
      /**
       * OK
       */
      200: GlipNoteInfo;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * You do not have permissions to create note in the specified group.
       */
      403: any;

      /**
       * Group not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/notes/:noteId/lock': {
    parameters: {
      /**
       * Internal identifier of a note to be locked
       */
      noteId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Сontent
       */
      204: any;

      /**
       * Note is locked by another user
       */
      400: any;

      /**
       * You have no permissions to lock the note
       */
      403: any;

      /**
       * Note is not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/notes/:noteId/unlock': {
    parameters: {
      /**
       * Internal identifier of a note to be unlocked
       */
      noteId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Note is locked by another user
       */
      400: any;

      /**
       * You have no permissions to unlock the note
       */
      403: any;

      /**
       * Note is not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/notes/:noteId/publish': {
    parameters: {
      /**
       * Internal identifier of a note to be published
       */
      noteId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * User is not a creator of note
       */
      400: any;

      /**
       * Note is not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/tasks': {
    parameters: {
      /**
       * Internal identifier of a chat
       */
      chatId: string;
    };
    requestBody: GlipCreateTask;
    responses: {
      /**
       * Task information
       */
      201: GlipTaskInfo;

      /**
       * Invalid input parameter(-s)
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Specified chat ID doesn`t exist
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/tasks/:taskId/complete': {
    parameters: {
      /**
       * Internal identifier of a task
       */
      taskId: string;
    };
    requestBody: GlipCompleteTask;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Invalid input parameter(-s)
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Requested task ID doesn`t exist
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/groups/:groupId/webhooks': {
    parameters: {
      /**
       * Internal identifier of a group
       */
      groupId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipWebhookInfo;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;
    };
  };
  '/restapi/v1.0/glip/webhooks/:webhookId/activate': {
    parameters: {
      /**
       * Internal identifier of a webhook
       */
      webhookId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: any;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * Webhook not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/webhooks/:webhookId/suspend': {
    parameters: {
      /**
       * Internal identifier of a webhook
       */
      webhookId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: any;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * Webhook not found.
       */
      404: any;
    };
  };
  '/analytics/phone/performance/v1/accounts/:accountId/calls/aggregate': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * The current page number
       */
      page?: number;

      /**
       * Number of records displayed on a page
       */
      perPage?: number;
    };
    requestBody: PerformanceCallsAggregatesRequest;
    responses: {
      /**
       * Performance Calls Aggregates
       */
      200: PerformanceCallsAggregatesResponse;

      /**
       * Invalid Request
       */
      400: InvalidRequestResponse;

      /**
       * Authentication error
       */
      401: LoginToExtensionRequiredErrorResponse;

      /**
       * Forbidden error
       */
      403: ForbiddenRequestErrorResponse;

      /**
       * Server Error
       */
      500: InternalServerErrorResponse;
    };
  };
  '/analytics/phone/performance/v1/accounts/:accountId/calls/timeline': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Aggregation interval
       */
      interval: 'Hour' | 'Day' | 'Week' | 'Month';
    };
    requestBody: PerformanceCallsTimelineRequest;
    responses: {
      /**
       *
       */
      200: PerformanceCallsTimelineResponse;

      /**
       * Invalid Request
       */
      400: InvalidRequestResponse;

      /**
       * Authentication error
       */
      401: LoginToExtensionRequiredErrorResponse;

      /**
       * Forbidden error
       */
      403: ForbiddenRequestErrorResponse;

      /**
       * Server Error
       */
      500: InternalServerErrorResponse;
    };
  };
  '/restapi/oauth/authorize': {
    parameters: {};
    requestBody: AuthorizeRequest;
    responses: {
      /**
       * Found
       */
      302: any;
    };
  };
  '/restapi/oauth/revoke': {
    parameters: {};
    requestBody: RevokeTokenRequest;
    responses: {
      /**
       * OK
       */
      200: any;
    };
  };
  '/restapi/oauth/token': {
    parameters: {};
    requestBody?: GetTokenRequest;
    responses: {
      /**
       * Access/Refresh Tokens
       */
      200: TokenInfo;

      /**
       * 1. invalid_request: Unsupported grant type
       * 2. invalid_client: Bad Application Release Status: Blocked
       *
       */
      400: any;

      /**
       * Unsupported Media Type
       */
      415: any;

      /**
       * Request rate exceeded
       */
      429: any;

      /**
       * Forbidden
       */
      403: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/address-book/contact': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * A country code value complying with the [ISO 3166-1 alpha-2](https://ru.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. The default value is home country of the current extension
       */
      dialingPlan?: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody?: PersonalContactRequest;
    responses: {
      /**
       * New Contact
       */
      200: PersonalContactResource;

      /**
       * Contact cannot be created: max contacts count reached ($limit)
       */
      400: any;
    };
  };
  '/restapi/v1.0/account/:accountId/directory/entries/search': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody?: SearchDirectoryEntriesRequest;
    responses: {
      /**
       * Paged collection of all contacts information for a given account according to filtering and ordering. Records can be empty if no data found
       */
      200: DirectoryResource;

      /**
       * Current request cannot be processed due to error in its body and/or url
       */
      400: ADGErrorResponse;

      /**
       * Some unexpected error during current request processing.
       */
      500: ADGErrorResponse;

      /**
       * Network error during request
       */
      503: ADGErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/caller-blocking/phone-numbers': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      extensionId: string;
    };
    requestBody: AddBlockedAllowedPhoneNumber;
    responses: {
      /**
       * OK
       */
      200: BlockedAllowedPhoneNumberInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/forwarding-number': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody: CreateForwardingNumberRequest;
    responses: {
      /**
       * OK
       */
      200: ForwardingNumberInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/answering-rule': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody: CreateAnsweringRuleRequest;
    responses: {
      /**
       * OK
       */
      200: CustomAnsweringRuleInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/answering-rule': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CompanyAnsweringRuleRequest;
    responses: {
      /**
       * OK
       */
      200: CompanyAnsweringRuleInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/greeting': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CreateCompanyGreetingRequest;
    responses: {
      /**
       * OK
       */
      200: CustomCompanyGreetingInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/greeting': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Specifies whether to apply an answering rule or not. If set to true then `answeringRule` parameter is mandatory. If set to false, then the answering rule is not applied even if specified
       */
      apply?: boolean;
    };
    requestBody: CreateCustomUserGreetingRequest;
    responses: {
      /**
       * OK
       */
      200: CustomUserGreetingInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/ivr-prompts': {
    parameters: {
      /**
       *
       */
      accountId: string;
    };
    requestBody: CreateIVRPromptRequest;
    responses: {
      /**
       * OK
       */
      200: PromptInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/ivr-menus': {
    parameters: {
      /**
       *
       */
      accountId: string;
    };
    requestBody: IVRMenuInfo;
    responses: {
      /**
       * OK
       */
      200: IVRMenuInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/call-recording/bulk-assign': {
    parameters: {
      /**
       *
       */
      accountId: string;
    };
    requestBody: BulkAccountCallRecordingsResource;
    responses: {
      /**
       * Success
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/a2p-sms/batches': {
    parameters: {};
    requestBody?: CreateSMSMessageBatchRequest;
    responses: {
      /**
       * Message batch created
       */
      201: MessageBatchInfo;

      /**
       * Validation Failed, Invalid Request
       */
      400: ASGErrorResponse;

      /**
       * Unauthorized error
       */
      401: ASGErrorResponse;

      /**
       * Service is not available
       */
      500: ASGErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/a2p-sms/opt-outs/bulk-assign': {
    parameters: {};
    requestBody?: OptOutBulkAssignRequest;
    responses: {
      /**
       * The results of adding opt-outs and opt-ins.
       */
      200: OptOutBulkAssignResponse;

      /**
       * Invalid Request
       */
      400: ErrorResponse;

      /**
       * Service Unavailable
       */
      500: ErrorResponse;
    };
  };
  '/restapi/v1.0/client-info/sip-provision': {
    parameters: {};
    requestBody: CreateSipRegistrationRequest;
    responses: {
      /**
       * Success
       */
      200: CreateSipRegistrationResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/custom-fields': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody?: CustomFieldCreateRequest;
    responses: {
      /**
       * Custom Field
       */
      200: CustomFieldResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting': {
    parameters: {
      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody?: MeetingRequestResource;
    responses: {
      /**
       * Created Meeting
       */
      201: MeetingResponseResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting-configuration/profile-image': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody?: CreateUserMeetingProfileImageRequest;
    responses: {};
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/:meetingId/end': {
    parameters: {
      /**
       * Internal identifier of a RingCentral meeting
       */
      meetingId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       *
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/sms': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody: CreateSMSMessage;
    responses: {
      /**
       * Message information
       */
      200: GetSMSMessageInfoResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/mms': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody: CreateMMSMessage;
    responses: {
      /**
       * MMS Message
       */
      200: GetSMSMessageInfoResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/company-pager': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody: CreateInternalTextMessageRequest;
    responses: {
      /**
       * Created Text Message
       */
      200: GetInternalTextMessageInfoResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/fax': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account (integer) or tilde (~) to indicate the account which was logged-in within the current session.
       */
      accountId: string;

      /**
       * Internal identifier of an extension (integer) or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody: CreateFaxMessageRequest;
    responses: {
      /**
       * Fax Message
       */
      200: FaxResponse;
    };
  };
  '/restapi/v1.0/number-parser/parse': {
    parameters: {
      /**
       * Internal identifier of a home country. The default value is ISO code (ISO 3166) of the user's home country or brand country, if the user is undefined
       */
      homeCountry?: string;

      /**
       * The default value is 'False'. If 'True', the numbers that are closer to the home country are given higher priority
       */
      nationalAsPriority?: boolean;
    };
    requestBody: ParsePhoneNumberRequest;
    responses: {
      /**
       * Success
       */
      200: ParsePhoneNumberResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/message-store-report': {
    parameters: {
      /**
       *
       */
      accountId: string;
    };
    requestBody?: CreateMessageStoreReportRequest;
    responses: {
      /**
       * Success
       */
      202: MessageStoreReport;

      /**
       * Wrong request provided
       */
      400: any;

      /**
       * Internal error
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/users/bulk-assign': {
    parameters: {
      /**
       *
       */
      accountId: string;
    };
    requestBody?: BulkAssignAutomaticLocationUpdatesUsers;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/wireless-points': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CreateWirelessPoint;
    responses: {
      /**
       * Wireless Point
       */
      200: WirelessPointInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/networks': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CreateNetworkRequest;
    responses: {
      /**
       * Created Network
       */
      200: NetworkInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/devices/bulk-assign': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody?: AssignMultipleDevicesAutomaticLocationUpdates;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/switches': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CreateSwitchInfo;
    responses: {
      /**
       * Switch information
       */
      200: SwitchInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/switches-bulk-create': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CreateMultipleSwitchesRequest;
    responses: {
      /**
       * Multiple Switches Creation Task
       */
      202: CreateMultipleSwitchesResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/switches-bulk-update': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: UpdateMultipleSwitchesRequest;
    responses: {
      /**
       * Multiple Switches Update Task
       */
      202: UpdateMultipleSwitchesResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/wireless-points-bulk-create': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CreateMultipleWirelessPointsRequest;
    responses: {
      /**
       * Multiple Wireless Points Creation Task
       */
      202: CreateMultipleWirelessPointsResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/wireless-points-bulk-update': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: UpdateMultipleWirelessPointsRequest;
    responses: {
      /**
       * Multiple Wireless Points Update Task
       */
      202: UpdateMultipleWirelessPointsResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/wireless-points-bulk-validate': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: ValidateMultipleWirelessPointsRequest;
    responses: {
      /**
       * Success
       */
      200: ValidateMultipleWirelessPointsResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/switches-bulk-validate': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: ValidateMultipleSwitchesRequest;
    responses: {
      /**
       * Success
       */
      200: ValidateMultipleSwitchesResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-locations': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: EmergencyLocationInfoRequest;
    responses: {
      /**
       * Success
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/emergency-locations': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody: CreateUserEmergencyLocationRequest;
    responses: {
      /**
       * Emergency Location Information
       */
      200: EmergencyLocationInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/profile-image': {
    parameters: {
      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CreateUserProfileImageRequest;
    responses: {
      /**
       * No Content
       */
      204: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: ExtensionCreationRequest;
    responses: {
      /**
       * Success
       */
      200: ExtensionCreationResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/call-queues/:groupId/bulk-assign': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      groupId: string;
    };
    requestBody: CallQueueBulkAssignResource;
    responses: {
      /**
       * Success
       */
      204: any;

      /**
       * Extension of type [${extensionType}] cannot be included into call queue
       */
      400: any;
    };
  };
  '/restapi/v1.0/account/:accountId/paging-only-groups/:pagingOnlyGroupId/bulk-assign': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a paging group
       */
      pagingOnlyGroupId: string;
    };
    requestBody?: EditPagingGroupRequest;
    responses: {
      /**
       * Success
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/call-monitoring-groups': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CreateCallMonitoringGroupRequest;
    responses: {
      /**
       * Success
       */
      200: CallMonitoringGroup;
    };
  };
  '/restapi/v1.0/account/:accountId/call-monitoring-groups/:groupId/bulk-assign': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      groupId: string;
    };
    requestBody: CallMonitoringBulkAssign;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Extension of type [ParkLocation] could not be a member of [call monitoring]
       */
      400: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension-bulk-update': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: ExtensionBulkUpdateRequest;
    responses: {
      /**
       * Success
       */
      200: ExtensionBulkUpdateTaskResource;
    };
  };
  '/restapi/v1.0/account/:accountId/address-book-bulk-upload': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: AddressBookBulkUploadRequest;
    responses: {
      /**
       * Accepted
       */
      202: AddressBookBulkUploadResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/user-role/:roleId/bulk-assign': {
    parameters: {
      /**
       * Internal identifier of a role
       */
      roleId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody?: BulkRoleAssignResource;
    responses: {
      /**
       * successful operation
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/user-role': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody?: RoleResource;
    responses: {
      /**
       * successful operation
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/ring-out': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;
    };
    requestBody: MakeRingOutRequest;
    responses: {
      /**
       * Success
       */
      200: GetRingOutStatusResponse;
    };
  };
  '/scim/v2/Users': {
    parameters: {};
    requestBody?: CreateUser;
    responses: {
      /**
       * successfully created user
       */
      201: UserResponse;

      /**
       * bad request
       */
      400: ScimErrorResponse;

      /**
       * authorization failure
       */
      401: ScimErrorResponse;

      /**
       * permissions denied
       */
      403: ScimErrorResponse;

      /**
       * not found
       */
      404: ScimErrorResponse;

      /**
       * duplicate email
       */
      409: ScimErrorResponse;

      /**
       * too many requests
       */
      429: ScimErrorResponse;

      /**
       * internal server error
       */
      500: ScimErrorResponse;
    };
  };
  '/scim/v2/Users/.search': {
    parameters: {};
    requestBody?: SearchRequest;
    responses: {
      /**
       * successful operation
       */
      200: UserSearchResponse;

      /**
       * bad request
       */
      400: ScimErrorResponse;

      /**
       * authorization failure
       */
      401: ScimErrorResponse;

      /**
       * permissions denied
       */
      403: ScimErrorResponse;

      /**
       * too many requests
       */
      429: ScimErrorResponse;

      /**
       * internal server error
       */
      500: ScimErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/call-out': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: MakeCallOutRequest;
    responses: {
      /**
       * Created
       */
      201: CallSession;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/conference': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Created
       */
      201: CallSessionObject;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/hold': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CallParty;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/unhold': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CallParty;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/reject': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/ignore': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: IgnoreRequestBody;
    responses: {
      /**
       * No Content
       */
      204: any;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/transfer': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: TransferTarget;
    responses: {
      /**
       * Success
       */
      200: CallParty;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/bridge': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: BridgeTargetRequest;
    responses: {
      /**
       * Bridged Call Info
       */
      200: CallParty;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/answer': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: AnswerTarget;
    responses: {
      /**
       * Call Session Information
       */
      200: CallParty;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/pickup': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: PickupTarget;
    responses: {
      /**
       * Created
       */
      201: CallParty;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/forward': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: ForwardTarget;
    responses: {
      /**
       * Success
       */
      200: CallParty;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/reply': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: CallPartyReply;
    responses: {
      /**
       * Success
       */
      200: ReplyParty;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Server is unable to process request just now
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/flip': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: CallPartyFlip;
    responses: {
      /**
       * Success
       */
      200: any;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/park': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Created
       */
      201: CallParty;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/bring-in': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;
    };
    requestBody: AddPartyRequest;
    responses: {
      /**
       * Created
       */
      201: CallParty;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/recordings': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Created
       */
      201: any;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/supervise': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;
    };
    requestBody: SuperviseCallSessionRequest;
    responses: {
      /**
       * Created
       */
      201: SuperviseCallSession;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/supervise': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call session
       */
      telephonySessionId: string;

      /**
       * Internal identifier of a call party
       */
      partyId: string;
    };
    requestBody: PartySuperviseRequest;
    responses: {
      /**
       * Created
       */
      201: PartySuperviseResponse;

      /**
       * Bad Request
       */
      400: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Conflict
       */
      409: any;

      /**
       * Internal Server Error
       */
      500: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
}

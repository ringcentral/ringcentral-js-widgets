import type {
  GetPresenceInfo,
  AccountPresenceInfo,
  CallQueuePresence,
  ExtensionCallQueuePresenceList,
  RecordsCollectionResourceSubscriptionResponse,
  SubscriptionInfo,
  DataExportTaskList,
  DataExportTask,
  GlipChatsList,
  GlipChatInfo,
  GlipConversationsList,
  GlipConversationInfo,
  GlipTeamsList,
  GlipTeamInfo,
  GlipEveryoneInfo,
  GlipChatsListWithoutNavigation,
  GlipPostInfo,
  GlipPostsList,
  GlipAdaptiveCardInfo,
  GlipEventsInfo,
  GlipEventInfo,
  GlipNotesInfo,
  GetGlipNoteInfo,
  GlipTaskList,
  GlipTaskInfo,
  GlipPersonInfo,
  GlipCompany,
  GlipWebhookList,
  GlipPreferencesInfo,
  UnifiedPresence,
  UnifiedPresenceListEntry,
  ContactList,
  PersonalContactResource,
  AddressBookSync,
  FavoriteContactList,
  ContactResource,
  ADGErrorResponse,
  DirectoryResource,
  FederationResource,
  GetUserBusinessHoursResponse,
  CompanyBusinessHours,
  CallerBlockingSettings,
  BlockedAllowedPhoneNumbersList,
  BlockedAllowedPhoneNumberInfo,
  GetExtensionForwardingNumberListResponse,
  ForwardingNumberInfo,
  UserAnsweringRuleList,
  AnsweringRuleInfo,
  CompanyAnsweringRuleList,
  CompanyAnsweringRuleInfo,
  DictionaryGreetingList,
  DictionaryGreetingInfo,
  CustomUserGreetingInfo,
  IVRPrompts,
  PromptInfo,
  IVRMenuInfo,
  CallRecordingSettingsResource,
  CallRecordingExtensions,
  CallRecordingCustomGreetings,
  GetVersionsResponse,
  GetVersionResponse,
  MessageBatchListResponse,
  MessageDetailsResponse,
  ASGErrorResponse,
  MessageBatchInfo,
  MessageListResponse,
  OptOutListResponse,
  MessageStatusesResponse,
  UserCallLogResponse,
  CallLogSync,
  UserCallLogRecord,
  UserActiveCallsResponse,
  AccountCallLogResponse,
  AccountCallLogSyncResponse,
  CompanyCallLogRecord,
  CompanyActiveCallsResponse,
  GetCallRecordingResponse,
  CustomFieldsResource,
  GetDeviceInfoResponse,
  SipInfoResource,
  GetExtensionDevicesResponse,
  ListMeetingRecordingsResponse,
  MeetingsResource,
  MeetingUserSettingsResponse,
  AccountLockedSettingResponse,
  MeetingResponseResource,
  MeetingServiceInfoResource,
  AssistantsResource,
  AssistedUsersResource,
  PublicMeetingInvitationResponse,
  ListFaxCoverPagesResponse,
  GetMessageList,
  GetMessageInfoResponse,
  GetMessageInfoMultiResponse,
  GetMessageSyncResponse,
  MessageStoreConfiguration,
  MessageStoreReport,
  MessageStoreReportArchive,
  GetExtensionPhoneNumbersResponse,
  GetExtensionInfoResponse,
  ExtensionCallerIdInfo,
  GetExtensionGrantListResponse,
  AutomaticLocationUpdatesUserList,
  WirelessPointsList,
  WirelessPointInfo,
  NetworksList,
  NetworkInfo,
  ListDevicesAutomaticLocationUpdates,
  SwitchesList,
  SwitchInfo,
  AutomaticLocationUpdatesTaskInfo,
  EmergencyLocationList,
  EmergencyLocationInfo,
  EmergencyLocationsResource,
  NotificationSettings,
  GetConferencingInfoResponse,
  GetAccountInfoResponse,
  AccountBusinessAddressResource,
  GetServiceInfoResponse,
  LanguageList,
  LanguageInfo,
  GetCountryListResponse,
  GetCountryInfoDictionaryResponse,
  GetLocationListResponse,
  GetStateListResponse,
  GetStateInfoResponse,
  GetTimezoneListResponse,
  GetTimezoneInfoResponse,
  AccountPhoneNumbers,
  CompanyPhoneNumberInfo,
  GetExtensionListResponse,
  UserTemplates,
  TemplateInfo,
  UserVideoConfiguration,
  CallQueues,
  CallQueueDetails,
  CallQueueMembers,
  PagingOnlyGroupUsers,
  PagingOnlyGroupDevices,
  CallMonitoringGroups,
  FeatureList,
  CallMonitoringGroupMemberList,
  ExtensionBulkUpdateTaskResource,
  AddressBookBulkUploadResponse,
  AuthProfileResource,
  AuthProfileCheckResource,
  ExtensionWithRolesCollectionResource,
  AssignedRolesResource,
  RolesCollectionResource,
  RoleResource,
  PermissionCollectionResource,
  PermissionResource,
  PermissionCategoryCollectionResource,
  PermissionCategoryResource,
  GetRingOutStatusResponse,
  ServiceProviderConfig,
  UserSearchResponse,
  ScimErrorResponse,
  UserResponse,
  CallSessionObject,
  CallParty,
} from '../interfaces';

export interface Get {
  '/restapi/v1.0/account/:accountId/extension/:extensionId/presence': {
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
       * Whether to return detailed telephony state
       */
      detailedTelephonyState?: boolean;

      /**
       * Whether to return SIP data
       */
      sipData?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GetPresenceInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/presence': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Whether to return detailed telephony state
       */
      detailedTelephonyState?: boolean;

      /**
       * Whether to return SIP data
       */
      sipData?: boolean;

      /**
       * Page number for account presence information
       */
      page?: number;

      /**
       * Number for account presence information items per page
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: AccountPresenceInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/call-queues/:groupId/presence': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an call queue extension
       */
      groupId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: CallQueuePresence;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/call-queue-presence': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension
       */
      extensionId: string;

      /**
       * Filtering by the flag 'Allow members to change their Queue Status'. If 'true' only queues where user can change his availability status are returned
       */
      editableMemberStatus?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: ExtensionCallQueuePresenceList;
    };
  };
  '/restapi/v1.0/subscription': {
    parameters: {};
    requestBody: undefined;
    responses: {
      /**
       * List of Subscriptions
       */
      200: RecordsCollectionResourceSubscriptionResponse;
    };
  };
  '/restapi/v1.0/subscription/:subscriptionId': {
    parameters: {
      /**
       * Internal identifier of a subscription
       */
      subscriptionId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Existing Subscription
       */
      200: SubscriptionInfo;
    };
  };
  '/restapi/v1.0/glip/data-export': {
    parameters: {
      /**
       * Status of the task(s) to be returned. Multiple values are supported
       */
      status?: 'Accepted' | 'InProgress' | 'Completed' | 'Failed' | 'Expired';

      /**
       * Page number to be retrieved; value range is > 0
       */
      page?: number;

      /**
       * Number of records to be returned per page; value range is 1 - 250
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Data Export Task List
       */
      200: DataExportTaskList;
    };
  };
  '/restapi/v1.0/glip/data-export/:taskId': {
    parameters: {
      /**
       * Internal identifier of a task to be retrieved
       */
      taskId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: DataExportTask;
    };
  };
  '/restapi/v1.0/glip/data-export/:taskId/datasets/:datasetId': {
    parameters: {
      /**
       * Internal identifier of a task
       */
      taskId: string;

      /**
       * Internal identifier of a dataset
       */
      datasetId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Dataset Zip Archive
       */
      200: string;
    };
  };
  '/restapi/v1.0/glip/chats': {
    parameters: {
      /**
       * Type of chats to be fetched. By default all type of chats will be fetched
       */
      type?: ('Personal' | 'Direct' | 'Group' | 'Team' | 'Everyone')[];

      /**
       * Number of chats to be fetched by one request. The maximum value is 250, by default - 30.
       */
      recordCount?: number;

      /**
       * Pagination token.
       */
      pageToken?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipChatsList;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId': {
    parameters: {
      /**
       * Internal identifier of a chat. If tilda (~) is specified, then `/me` (Personal) chat will be returned
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipChatInfo;

      /**
       * Chat Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/conversations': {
    parameters: {
      /**
       * Number of conversations to be fetched by one request. The maximum value is 250, by default - 30
       */
      recordCount?: number;

      /**
       * Pagination token.
       */
      pageToken?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipConversationsList;
    };
  };
  '/restapi/v1.0/glip/conversations/:chatId': {
    parameters: {
      /**
       * Internal identifier of a conversation to be returned.
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GlipConversationInfo;

      /**
       * Conversation Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/teams': {
    parameters: {
      /**
       * Number of teams to be fetched by one request. The maximum value is 250, by default - 30
       */
      recordCount?: number;

      /**
       * Pagination token.
       */
      pageToken?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipTeamsList;
    };
  };
  '/restapi/v1.0/glip/teams/:chatId': {
    parameters: {
      /**
       * Internal identifier of a team to be returned.
       */
      chatId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GlipTeamInfo;

      /**
       * Team Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/everyone': {
    parameters: {};
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GlipEveryoneInfo;

      /**
       * Chat Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/recent/chats': {
    parameters: {
      /**
       * Type of chats to be fetched. By default all chat types are returned
       */
      type?: ('Everyone' | 'Group' | 'Personal' | 'Direct' | 'Team')[];

      /**
       * Max number of chats to be fetched by one request (Not more than 250).
       */
      recordCount?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GlipChatsListWithoutNavigation;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;
    };
  };
  '/restapi/v1.0/glip/favorites': {
    parameters: {
      /**
       * Max number of chats to be fetched by one request (Not more than 250).
       */
      recordCount?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GlipChatsListWithoutNavigation;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/posts/:postId': {
    parameters: {
      /**
       * Internal identifier of a chat.
       */
      chatId: string;

      /**
       * Internal identifier of a post.
       */
      postId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GlipPostInfo;

      /**
       * Post Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/posts': {
    parameters: {
      /**
       * Internal identifier of a chat
       */
      chatId: string;

      /**
       * Max number of posts to be fetched by one request (not more than 250)
       */
      recordCount?: number;

      /**
       * Pagination token.
       */
      pageToken?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipPostsList;
    };
  };
  '/restapi/v1.0/glip/adaptive-cards/:cardId': {
    parameters: {
      /**
       * Internal identifier of an adaptive card, or comma separated list of adaptive cards IDs.
       */
      cardId: string[];
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipAdaptiveCardInfo;

      /**
       * Multi-Status
       */
      207: any;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * Adaptive Card not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/events': {
    parameters: {
      /**
       * Number of groups to be fetched by one request. The maximum value is 250, by default - 30.
       */
      recordCount?: number;

      /**
       * Token of a page to be returned
       */
      pageToken?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipEventsInfo;
    };
  };
  '/restapi/v1.0/glip/events/:eventId': {
    parameters: {
      /**
       * event id or comma separated list of event ids.
       */
      eventId: string[];
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipEventInfo;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * Event not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/groups/:groupId/events': {
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
      200: GlipEventInfo;

      /**
       * Group with specified Id is not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/chats/:chatId/notes': {
    parameters: {
      /**
       * Internal identifier of a chat to fetch notes from.
       */
      chatId: string;

      /**
       * The end datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, e.g. 2019-03-10T18:23:45. The default value is Now.
       */
      creationTimeTo?: string;

      /**
       * The start datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone
       */
      creationTimeFrom?: string;

      /**
       * Internal identifier of the user that created the note. Multiple values are supported
       */
      creatorId?: string;

      /**
       * Status of notes to be fetched; if not specified all notes are fetched by default.
       */
      status?: 'Active' | 'Draft';

      /**
       * Pagination token
       */
      pageToken?: string;

      /**
       * Max number of notes to be fetched by one request; the value range is 1-250.
       */
      recordCount?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipNotesInfo;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * You do not have permissions to get such kind of information.
       */
      403: any;

      /**
       * Group Not Found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/notes/:noteId': {
    parameters: {
      /**
       * Internal identifier of a note to be fetched
       */
      noteId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GetGlipNoteInfo;

      /**
       * When note is not found.
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

      /**
       * The end datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, e.g. 2019-03-10T18:23:45Z
       */
      creationTimeTo?: string;

      /**
       * The start datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, e.g. 2016-02-23T00:00:00
       */
      creationTimeFrom?: string;

      /**
       * Internal identifier of a task creator
       */
      creatorId?: string[];

      /**
       * Task execution status
       */
      status?: ('Pending' | 'InProgress' | 'Completed')[];

      /**
       * Task assignment status
       */
      assignmentStatus?: 'Unassigned' | 'Assigned';

      /**
       * Internal identifier of a task assignee
       */
      assigneeId?: string[];

      /**
       * Task execution status by assignee(-s) specified in assigneeId
       */
      assigneeStatus?: 'Pending' | 'Completed';

      /**
       * Token of the current page. If token is omitted then the first page should be returned
       */
      pageToken?: string;

      /**
       * Number of records to be returned per screen
       */
      recordCount?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipTaskList;

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
  '/restapi/v1.0/glip/tasks/:taskId': {
    parameters: {
      /**
       * Internal identifier of a task, or comma separated list of task IDs
       */
      taskId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Task Information
       */
      200: GlipTaskInfo;

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
  '/restapi/v1.0/glip/persons/:personId': {
    parameters: {
      /**
       * Internal identifier of a user to be returned, the maximum number of IDs is 30
       */
      personId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GlipPersonInfo;

      /**
       * Mixed Result
       */
      207: any;

      /**
       * You do not have permissions to get such kind of information
       */
      403: any;

      /**
       * Person Not Found
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/companies/:companyId': {
    parameters: {
      /**
       * Internal identifier of an RC account/Glip company, or tilde (~) to indicate a company the current user belongs to.
       */
      companyId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GlipCompany;

      /**
       * Mixed Result
       */
      207: any;

      /**
       * You do not have permissions to get such kind of information
       */
      403: any;

      /**
       * Company Not Found
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
      200: GlipWebhookList;

      /**
       * Group with specified ID is not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/webhooks': {
    parameters: {};
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipWebhookList;
    };
  };
  '/restapi/v1.0/glip/webhooks/:webhookId': {
    parameters: {
      /**
       * Internal identifier of a webhook or comma separated list of webhooks IDs
       */
      webhookId: string[];
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GlipWebhookList;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * Webhooks not found.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/preferences': {
    parameters: {};
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GlipPreferencesInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/unified-presence': {
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
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: UnifiedPresence;

      /**
       * Multi-Status
       */
      207: UnifiedPresenceListEntry[];

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * Resource not found
       */
      404: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/address-book/contact': {
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
       * If specified, only contacts whose First name or Last name start with the mentioned substring are returned. Case-insensitive
       */
      startsWith?: string;

      /**
       * Sorts results by the specified property
       */
      sortBy?: ('FirstName' | 'LastName' | 'Company')[];

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       *
       */
      phoneNumber?: string[];
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: ContactList;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/address-book/contact/:contactId': {
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
       * Internal identifier of a contact record in the RingCentral database
       */
      contactId: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Contact
       */
      200: PersonalContactResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/address-book-sync': {
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
       * Type of synchronization
       */
      syncType?: 'FSync' | 'ISync';

      /**
       * Value of syncToken property of the last sync request response
       */
      syncToken?: string;

      /**
       * Number of records per page to be returned. The max number of records is 250, which is also the default. For 'FSync' if the number of records exceeds the parameter value (either specified or default), all of the pages can be retrieved in several requests. For 'ISync' if the number of records exceeds the page size, the number of incoming changes to this number is limited
       */
      perPage?: number;

      /**
       * Internal identifier of a page. It can be obtained from the 'nextPageId' parameter passed in response body
       */
      pageId?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: AddressBookSync;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/favorite': {
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
    requestBody: undefined;
    responses: {
      /**
       * Favorite Contact List
       */
      200: FavoriteContactList;
    };
  };
  '/restapi/v1.0/account/:accountId/directory/entries/:entryId': {
    parameters: {
      /**
       * Internal identifier of extension to read information for
       */
      entryId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Contact information for given parameters. If value doesn't found then empty body will be returned
       */
      200: ContactResource;

      /**
       * Current request cannot be processed due to error in its body and/or url
       */
      400: ADGErrorResponse;

      /**
       * Some unexpected error during current request processing
       */
      500: ADGErrorResponse;

      /**
       * Network error during request. One should check connection between ADG processing node and ADX data node
       */
      503: ADGErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/directory/entries': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * If 'True' then contacts of all accounts in federation are returned. If 'False' then only contacts of the current account are returned, and account section is eliminated in this case
       */
      showFederated?: boolean;

      /**
       * Type of an extension. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
       */
      type?:
        | 'User'
        | 'Department'
        | 'Announcement'
        | 'Voicemail'
        | 'SharedLinesGroup'
        | 'PagingOnly'
        | 'IvrMenu'
        | 'ParkLocation'
        | 'Limited';

      /**
       * Page number
       */
      page?: string;

      /**
       * Records count to be returned per one page. The default value is 1000. Specific keyword values: `all` - all records are returned in one page; `max` - maximum count of records that can be returned in one page
       */
      perPage?: number;

      /**
       * Internal identifier of the business site to which extensions belong
       */
      siteId?: string;

      /**
       * If-None-Match
       */
      'If-None-Match'?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Paged collection of all contacts information for a given account. Records can be empty if no data found.
       */
      200: DirectoryResource;

      /**
       * Current request cannot be processed due to error in its body and/or url.
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
  '/restapi/v1.0/account/:accountId/directory/federation': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * RCExtensionId
       */
      RCExtensionId?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * List of found federations. Records array can be empty if no data found
       */
      200: FederationResource;

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
  '/restapi/v1.0/account/:accountId/extension/:extensionId/business-hours': {
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
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GetUserBusinessHoursResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/business-hours': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: CompanyBusinessHours;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/caller-blocking': {
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
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: CallerBlockingSettings;
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

      /**
       *
       */
      page?: number;

      /**
       *
       */
      perPage?: number;

      /**
       *
       */
      status?: 'Blocked' | 'Allowed';
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: BlockedAllowedPhoneNumbersList;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/caller-blocking/phone-numbers/:blockedNumberId': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      extensionId: string;

      /**
       *
       */
      blockedNumberId: string;
    };
    requestBody: undefined;
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

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted.
       */
      page?: number;

      /**
       * Indicates the page size (number of items).
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GetExtensionForwardingNumberListResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/forwarding-number/:forwardingNumberId': {
    parameters: {
      /**
       *
       */
      forwardingNumberId: string;

      /**
       *
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

      /**
       * Filters custom call handling rules of the extension
       */
      type?: 'Custom';

      /**
       *
       */
      view?: 'Detailed' | 'Simple';

      /**
       * If true, then only active call handling rules are returned
       */
      enabledOnly?: boolean;

      /**
       *
       */
      page?: string;

      /**
       *
       */
      perPage?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: UserAnsweringRuleList;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/answering-rule/:ruleId': {
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
       * Internal identifier of an answering rule. The value can be standard digital ID or specific ID - either 'business-hours-rule' or 'after-hours-rule'
       */
      ruleId: string;

      /**
       * Indicates whether inactive numbers should be returned or not
       */
      showInactiveNumbers?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: AnsweringRuleInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/answering-rule': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items per page)
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: CompanyAnsweringRuleList;
    };
  };
  '/restapi/v1.0/account/:accountId/answering-rule/:ruleId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an answering rule. The value can be standard digital ID or specific ID - either 'business-hours-rule' or 'after-hours-rule'
       */
      ruleId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: CompanyAnsweringRuleInfo;
    };
  };
  '/restapi/v1.0/dictionary/greeting': {
    parameters: {
      /**
       * Indicates the page number to retrieve. Only positive number values are accepted.
       */
      page?: number;

      /**
       * Indicates the page size (number of items).
       */
      perPage?: number;

      /**
       * Type of a greeting, specifying the case when the greeting is played
       */
      type?:
        | 'Introductory'
        | 'Announcement'
        | 'ConnectingMessage'
        | 'ConnectingAudio'
        | 'Voicemail'
        | 'Unavailable'
        | 'HoldMusic'
        | 'Company';

      /**
       * Usage type of a greeting, specifying if the greeting is applied for user extension or department (call queue) extension
       */
      usageType?:
        | 'UserExtensionAnsweringRule'
        | 'ExtensionAnsweringRule'
        | 'DepartmentExtensionAnsweringRule'
        | 'CompanyAnsweringRule'
        | 'CompanyAfterHoursAnsweringRule'
        | 'VoicemailExtensionAnsweringRule'
        | 'AnnouncementExtensionAnsweringRule'
        | 'SharedLinesGroupAnsweringRule';
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: DictionaryGreetingList;
    };
  };
  '/restapi/v1.0/dictionary/greeting/:greetingId': {
    parameters: {
      /**
       *
       */
      greetingId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: DictionaryGreetingInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/greeting/:greetingId': {
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
       * Internal identifier of a greeting
       */
      greetingId: number;
    };
    requestBody: undefined;
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
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: IVRPrompts;
    };
  };
  '/restapi/v1.0/account/:accountId/ivr-prompts/:promptId': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      promptId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Prompt Information
       */
      200: PromptInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/ivr-prompts/:promptId/content': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      promptId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * IVR Prompt Media Data
       */
      200: string;
    };
  };
  '/restapi/v1.0/account/:accountId/ivr-menus/:ivrMenuId': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      ivrMenuId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: IVRMenuInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/call-recording': {
    parameters: {
      /**
       *
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: CallRecordingSettingsResource;
    };
  };
  '/restapi/v1.0/account/:accountId/call-recording/extensions': {
    parameters: {
      /**
       *
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Extension List
       */
      200: CallRecordingExtensions;
    };
  };
  '/restapi/v1.0/account/:accountId/call-recording/custom-greetings': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      type?: 'StartRecording' | 'StopRecording' | 'AutomaticRecording';
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CallRecordingCustomGreetings;
    };
  };
  '/restapi': {
    parameters: {};
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetVersionsResponse;
    };
  };
  '/restapi/:apiVersion': {
    parameters: {
      /**
       * API version to be requested, for example 'v1.0'
       */
      apiVersion: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * API Version
       */
      200: GetVersionResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/a2p-sms/batches': {
    parameters: {
      /**
       * The default is 24 hours before `dateTo`
       */
      dateFrom?: string;

      /**
       * The default is current time
       */
      dateTo?: string;

      /**
       * Current status of a message batch
       */
      status?: string[];

      /**
       * Phone number in E.164 format from which the messages are going to be sent
       */
      from?: string;

      /**
       * Token of the page to be retrieved
       */
      pageToken?: string;

      /**
       * Number of records to be returned for the page
       */
      perPage?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: MessageBatchListResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/a2p-sms/messages/:messageId': {
    parameters: {
      /**
       * Internal identifier of a message to be retrieved
       */
      messageId: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Message Infomation
       */
      200: MessageDetailsResponse;

      /**
       * Invalid request
       */
      400: ASGErrorResponse;

      /**
       * Unauthorized error
       */
      401: ASGErrorResponse;

      /**
       * The message is not found
       */
      404: ASGErrorResponse;

      /**
       * Service is not available
       */
      500: ASGErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/a2p-sms/batches/:batchId': {
    parameters: {};
    requestBody: undefined;
    responses: {
      /**
       * Message batch information
       */
      200: MessageBatchInfo;

      /**
       * Invalid request
       */
      400: ASGErrorResponse;

      /**
       * Unauthorized error
       */
      401: ASGErrorResponse;

      /**
       * The batch is not found
       */
      404: ASGErrorResponse;

      /**
       * Service is unavailable
       */
      500: ASGErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/a2p-sms/messages': {
    parameters: {
      /**
       * Internal identifier of a message batch used for filtering records
       */
      batchId?: string;

      /**
       * Direction of a message to filter the message list result. By default there is no filter applied - both Inbound and Outbound messages are returned
       */
      direction?: 'Inbound' | 'Outbound';

      /**
       * Indicates if the response has to be detailed, includes text in the response if detailed
       */
      view?: 'Simple' | 'Detailed';

      /**
       * Date to filter message list result. Messages with `creationTime` later than or equal to `dateFrom` value are returned. The default value is 1 day before the current datetime
       */
      dateFrom?: string;

      /**
       * Date to filter message list result. Messages with `creationTime` earlier than `dateTo` value are returned. The default is the current datetime
       */
      dateTo?: string;

      /**
       * List of phone numbers (specified in 'to' or 'from' fields of a message) to filter the results. Maximum number of phone numbers allowed to be specified as filters is 15
       */
      phoneNumber?: string[];

      /**
       * Token of a page to be retrieved
       */
      pageToken?: string;

      /**
       * Number of messages to be returned per request
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * A2P SMS Message List
       */
      200: MessageListResponse;

      /**
       * Invalid Request
       */
      400: ASGErrorResponse;

      /**
       * Unauthorized
       */
      401: ASGErrorResponse;

      /**
       * No resource found for the account.
       */
      404: ASGErrorResponse;

      /**
       * Service Unavailable
       */
      500: ASGErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/a2p-sms/opt-outs': {
    parameters: {
      /**
       * The sender's phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format for filtering messages. The asterisk value "*" means any number in `from` field
       */
      from?: string;

      /**
       * The reciever's phone number (`to` field) in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format for filtering messages
       */
      to?: string;

      /**
       * Token of the page to be retrieved
       */
      pageToken?: string;

      /**
       * Number of records to be returned for the page
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * The list of opt records for the account filtered by the search criteria provided as query param
       */
      200: OptOutListResponse;

      /**
       * Invalid Request
       */
      400: ASGErrorResponse;

      /**
       * Unauthorized
       */
      401: ASGErrorResponse;

      /**
       * No resource found for the account
       */
      404: ASGErrorResponse;

      /**
       * Service Unavailable
       */
      500: ASGErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/a2p-sms/statuses': {
    parameters: {
      /**
       * Date to filter message list result. Messages with `creationTime` later than or equal to `dateFrom` value are returned. The default value is 1 day before the current datetime
       */
      dateFrom?: string;

      /**
       * Date to filter message list result. Messages with `creationTime` earlier than `dateTo` value are returned. The default is the current datetime
       */
      dateTo?: string;

      /**
       * Identifier of a message batch used for filtering records
       */
      batchId?: string;

      /**
       * Direction of a message to filter the message list result. By default there is no filter applied - both Inbound and Outbound messages are returned
       */
      direction?: 'Inbound' | 'Outbound';

      /**
       * List of phone numbers (specified in 'to' or 'from' fields of a message) to filter the results. Maximum number of phone numbers allowed to be specified as filters is 15
       */
      phoneNumber?: string[];
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: MessageStatusesResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/call-log': {
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
       * Extension number of a user. If specified, returns call log for a particular extension only
       */
      extensionNumber?: string;

      /**
       * If 'True' then calls from/to blocked numbers are returned
       */
      showBlocked?: boolean;

      /**
       * Phone number of a caller/callee in e.164 format without a plus sign '+'. If specified, all incoming and outcoming calls with this phone number are returned
       */
      phoneNumber?: string;

      /**
       * The direction for the resulting records. If not specified, both inbound and outbound records are returned. Multiple values are accepted
       */
      direction?: ('Inbound' | 'Outbound')[];

      /**
       * Internal identifier of a session
       */
      sessionId?: string;

      /**
       * Call type of a record. It is allowed to specify more than one type. If not specified, all call types are returned. Multiple values are accepted
       */
      type?: ('Voice' | 'Fax')[];

      /**
       * Call transport type. 'PSTN' specifies that a call leg is initiated from the PSTN network provider; 'VoIP' - from an RC phone. By default this filter is disabled
       */
      transport?: ('PSTN' | 'VoIP')[];

      /**
       * View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync
       */
      view?: 'Simple' | 'Detailed';

      /**
       * **Deprecated**. Supported for compatibility reasons. `True` if only recorded calls are returned. If both `withRecording` and `recordingType` are specified, then `withRecording` is ignored
       */
      withRecording?: boolean;

      /**
       * Type of a call recording. If not specified, then calls without recordings are also returned
       */
      recordingType?: 'Automatic' | 'OnDemand' | 'All';

      /**
       * The end datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time
       */
      dateTo?: string;

      /**
       * The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours
       */
      dateFrom?: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are allowed
       */
      page?: number;

      /**
       * Indicates the page size (number of items). The default value is 100. The maximum value is 1000, for detailed call log - 250
       */
      perPage?: number;

      /**
       * If 'True' then deleted calls are returned
       */
      showDeleted?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: UserCallLogResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/call-log-sync': {
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
       * Type of synchronization
       */
      syncType?: 'FSync' | 'ISync';

      /**
       * Value of syncToken property of last sync request response
       */
      syncToken?: string;

      /**
       * The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is the current moment
       */
      dateFrom?: string;

      /**
       * For 'FSync' the parameter is mandatory, it limits the number of records to be returned in response. For 'ISync' it specifies with how many records to extend sync Frame to the past, the maximum number of records is 250
       */
      recordCount?: number;

      /**
       * Type of calls to be returned. The default value is 'All'
       */
      statusGroup?: ('Missed' | 'All')[];

      /**
       * View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync
       */
      view?: 'Simple' | 'Detailed';

      /**
       * Supported for ISync. If 'True' then deleted call records are returned
       */
      showDeleted?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CallLogSync;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/call-log/:callRecordId': {
    parameters: {
      /**
       *
       */
      callRecordId: string[];

      /**
       * View of call records. The view value specified for 'FSync' will also be applied for 'ISync' by default, since it cannot be changed for ISync
       */
      view?: 'Simple' | 'Detailed';

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Call Log Record
       */
      200: UserCallLogRecord;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/active-calls': {
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
       * The direction for the result records. If not specified, both inbound and outbound records are returned. Multiple values are accepted
       */
      direction?: ('Inbound' | 'Outbound')[];

      /**
       * View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync
       */
      view?: 'Simple' | 'Detailed';

      /**
       * Call type of a record. If not specified, all call types are returned. Multiple values are accepted
       */
      type?: ('Voice' | 'Fax')[];

      /**
       * Indicates the page number to retrieve. Only positive number values are allowed
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: UserActiveCallsResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/call-log': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Extension number of a user. If specified, returns call log for a particular extension only
       */
      extensionNumber?: string;

      /**
       * Phone number of a caller/callee in e.164 format without a plus sign '+'. If specified, all incoming and outcoming calls with this phone number are returned. Cannot be specified together with the `extensionNumber` filter
       */
      phoneNumber?: string;

      /**
       * The direction for the result records. If not specified, both inbound and outbound records are returned. Multiple values are accepted
       */
      direction?: ('Inbound' | 'Outbound')[];

      /**
       * Call type of a record. If not specified, all call types are returned. Multiple values are accepted
       */
      type?: ('Voice' | 'Fax')[];

      /**
       * View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync
       */
      view?: 'Simple' | 'Detailed';

      /**
       * **Deprecated**. Supported for compatibility reasons only. `true` if only recorded calls are returned. The default value is `false`. If both `withRecording` and `recordingType` are specified, `withRecording` is ignored
       */
      withRecording?: boolean;

      /**
       * Type of a call recording. If not specified, then calls without recordings are also returned
       */
      recordingType?: 'Automatic' | 'OnDemand' | 'All';

      /**
       * The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601]  format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours
       */
      dateFrom?: string;

      /**
       * The end datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601]  format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time
       */
      dateTo?: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       * Internal identifier of a call session
       */
      sessionId?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: AccountCallLogResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/call-log-sync': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Type of synchronization.
       */
      syncType?: 'FSync' | 'ISync';

      /**
       * Value of syncToken property of last sync request response
       */
      syncToken?: string;

      /**
       * The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601]  format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is the current moment
       */
      dateFrom?: string;

      /**
       * For 'FSync' the parameter is mandatory, it limits the number of records to be returned in response. For 'ISync' it specifies with how many records to extend sync frame to the past, the maximum number of records is 250
       */
      recordCount?: number;

      /**
       * Type of calls to be returned.
       */
      statusGroup?: string[];

      /**
       * View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync
       */
      view?: 'Simple' | 'Detailed';

      /**
       * Supported for ISync. If 'True' then deleted call records are returned
       */
      showDeleted?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: AccountCallLogSyncResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/call-log/:callRecordId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call log record
       */
      callRecordId: string;

      /**
       * View of call records. The view value specified for 'FSync' will also be applied for 'ISync' by default, since it cannot be changed for ISync
       */
      view?: 'Simple' | 'Detailed';
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CompanyCallLogRecord;
    };
  };
  '/restapi/v1.0/account/:accountId/active-calls': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * The direction for the result records. If not specified, both inbound and outbound records are returned. Multiple values are accepted
       */
      direction?: ('Inbound' | 'Outbound')[];

      /**
       * View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync
       */
      view?: 'Simple' | 'Detailed';

      /**
       * Call type of a record. If not specified, all call types are returned. Multiple values are accepted
       */
      type?: ('Voice' | 'Fax')[];

      /**
       * Call transport type. 'PSTN' specifies that a call leg is initiated from the PSTN network provider; 'VoIP' - from an RC phone. By default this filter is disabled
       */
      transport?: ('PSTN' | 'VoIP')[];

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CompanyActiveCallsResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/recording/:recordingId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a recording (returned in Call Log)
       */
      recordingId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetCallRecordingResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/recording/:recordingId/content': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a recording (returned in Call Log)
       */
      recordingId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Call Recording Media Data
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/custom-fields': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Custom Field List
       */
      200: CustomFieldsResource;
    };
  };
  '/restapi/v1.0/account/:accountId/device/:deviceId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a device
       */
      deviceId: number;

      /**
       * Specifies if emergency address should be synchronized or not
       */
      syncEmergencyAddress?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * Account Device(s) Info
       */
      200: GetDeviceInfoResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/device/:deviceId/sip-info': {
    parameters: {
      /**
       * Internal identifier of a device
       */
      deviceId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Device SIP Information
       */
      200: SipInfoResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/device': {
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
       * Pooling type of a device
       */
      linePooling?: 'Host' | 'Guest' | 'None';

      /**
       * Device feature or multiple features supported
       */
      feature?: 'Intercom' | 'Paging' | 'BLA' | 'HELD';

      /**
       * Number of a page to be returned
       */
      page?: string;

      /**
       * Number of records per page to be returned
       */
      perPage?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetExtensionDevicesResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/meeting-recordings': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a meeting. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified
       */
      meetingId?: string;

      /**
       * Recordings of meetings started after the time specified will be returned. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified
       */
      meetingStartTimeFrom?: string;

      /**
       * Recordings of meetings started before the time specified will be returned. The default value is current time. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified
       */
      meetingStartTimeTo?: string;

      /**
       * Page number
       */
      page?: number;

      /**
       * Number of items per page. The `max` value is supported to indicate the maximum size - 300
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: ListMeetingRecordingsResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting-recordings': {
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
       * Internal identifier of a meeting. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified
       */
      meetingId?: string;

      /**
       * Recordings of meetings started after the time specified will be returned. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified
       */
      meetingStartTimeFrom?: string;

      /**
       * Recordings of meetings started before the time specified will be returned. The default value is current time. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified
       */
      meetingStartTimeTo?: string;

      /**
       * Page number
       */
      page?: number;

      /**
       * Number of items per page. The `max` value is supported to indicate the maximum size - 300
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: ListMeetingRecordingsResponse;
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
    requestBody: undefined;
    responses: {
      /**
       * OK: Scheduled Meeting List
       */
      200: MeetingsResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/user-settings': {
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
    requestBody: undefined;
    responses: {
      /**
       * OK: User Setting
       */
      200: MeetingUserSettingsResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/meeting/locked-settings': {
    parameters: {
      /**
       * Internal identifier of an account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK: Account Locked Meeting Settings
       */
      200: AccountLockedSettingResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/:meetingId': {
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
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK: Meeting Info
       */
      200: MeetingResponseResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/service-info': {
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
    requestBody: undefined;
    responses: {
      /**
       * OK: Meeting Service Info
       */
      200: MeetingServiceInfoResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meetings-configuration/assistants': {
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
    requestBody: undefined;
    responses: {
      /**
       * OK: Assistants Info
       */
      200: AssistantsResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meetings-configuration/assisted': {
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
    requestBody: undefined;
    responses: {
      /**
       * Assisted User Info
       */
      200: AssistedUsersResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/:meetingId/invitation': {
    parameters: {
      /**
       * Internal identifier of a RingCentral meeting
       */
      meetingId: number;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of an account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK: Meeting Invitation
       */
      200: PublicMeetingInvitationResponse;
    };
  };
  '/restapi/v1.0/dictionary/fax-cover-page': {
    parameters: {
      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * List of Fax Cover Pages
       */
      200: ListFaxCoverPagesResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store': {
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
       * Specifies the availability status for the resulting messages. Multiple values are accepted
       */
      availability?: ('Alive' | 'Deleted' | 'Purged')[];

      /**
       * Specifies the conversation identifier for the resulting messages
       */
      conversationId?: number;

      /**
       * The start datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours
       */
      dateFrom?: string;

      /**
       * The end datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time
       */
      dateTo?: string;

      /**
       * The direction for the resulting messages. If not specified, both inbound and outbound messages are returned. Multiple values are accepted
       */
      direction?: ('Inbound' | 'Outbound')[];

      /**
       * If 'True', then the latest messages per every conversation ID are returned
       */
      distinctConversations?: boolean;

      /**
       * The type of the resulting messages. If not specified, all messages without message type filtering are returned. Multiple values are accepted
       */
      messageType?: ('Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text')[];

      /**
       * The read status for the resulting messages. Multiple values are accepted
       */
      readStatus?: ('Read' | 'Unread')[];

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       * The phone number. If specified, messages are returned for this particular phone number only
       */
      phoneNumber?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetMessageList;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store/:messageId': {
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
       * Internal identifier of a message
       */
      messageId: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK
       */
      200: GetMessageInfoResponse;

      /**
       * Multi-Status
       */
      207: GetMessageInfoMultiResponse[];
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store/:messageId/content/:attachmentId': {
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
       * Internal identifier of a message attachment
       */
      attachmentId: number;

      /**
       * Internal identifier of a message
       */
      messageId: number;

      /**
       *
       */
      Range?: string;

      /**
       * Content disposition of a response
       */
      contentDisposition?: 'Inline' | 'Attachment';
    };
    requestBody: undefined;
    responses: {
      /**
       * Attachment Data
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/message-sync': {
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
       * Conversation identifier for the resulting messages. Meaningful for SMS and Pager messages only.
       */
      conversationId?: number;

      /**
       * The start datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours
       */
      dateFrom?: string;

      /**
       * The end datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time
       */
      dateTo?: string;

      /**
       * Direction for the resulting messages. If not specified, both inbound and outbound messages are returned. Multiple values are accepted
       */
      direction?: ('Inbound' | 'Outbound')[];

      /**
       * If 'True', then the latest messages per every conversation ID are returned
       */
      distinctConversations?: boolean;

      /**
       * Type for the resulting messages. If not specified, all types of messages are returned. Multiple values are accepted
       */
      messageType?: ('Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text')[];

      /**
       * Limits the number of records to be returned (works in combination with dateFrom and dateTo if specified)
       */
      recordCount?: number;

      /**
       * Value of syncToken property of last sync request response
       */
      syncToken?: string;

      /**
       * Type of message synchronization
       */
      syncType?: 'FSync' | 'ISync';
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetMessageSyncResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/message-store-configuration': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Successful operation
       */
      200: MessageStoreConfiguration;
    };
  };
  '/restapi/v1.0/account/:accountId/message-store-report/:taskId': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      taskId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: MessageStoreReport;
    };
  };
  '/restapi/v1.0/account/:accountId/message-store-report/:taskId/archive': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      taskId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: MessageStoreReportArchive;
    };
  };
  '/restapi/v1.0/account/:accountId/message-store-report/:taskId/archive/:archiveId': {
    parameters: {
      /**
       *
       */
      accountId: string;

      /**
       *
       */
      taskId: string;

      /**
       *
       */
      archiveId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Archived Data
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/phone-number': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Status of a phone number. Multiple values are supported
       */
      status?: 'Normal' | 'Pending' | 'PortedIn' | 'Temporary';

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Usage type of a phone number
       */
      usageType?: (
        | 'MainCompanyNumber'
        | 'AdditionalCompanyNumber'
        | 'CompanyNumber'
        | 'DirectNumber'
        | 'CompanyFaxNumber'
        | 'ForwardedNumber'
        | 'ForwardedCompanyNumber'
        | 'BusinessMobileNumber'
        | 'IntegrationNumber'
      )[];

      /**
       * Indicates the page number to retrieve. Only positive number values are allowed. Default value is '1'
       */
      page?: number;

      /**
       * Indicates the page size (number of items). If not specified, the value is '100' by default
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * OK: User Phone Number List
       */
      200: GetExtensionPhoneNumbersResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId': {
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
    requestBody: undefined;
    responses: {
      /**
       * Extension information
       */
      200: GetExtensionInfoResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/caller-id': {
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
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: ExtensionCallerIdInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/grant': {
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
       * Type of extension to be returned. Multiple values are supported. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
       */
      extensionType?:
        | 'User'
        | 'FaxUser'
        | 'VirtualUser'
        | 'DigitalUser'
        | 'Department'
        | 'Announcement'
        | 'Voicemail'
        | 'SharedLinesGroup'
        | 'PagingOnly'
        | 'IvrMenu'
        | 'ApplicationExtension'
        | 'ParkLocation'
        | 'Limited'
        | 'Bot'
        | 'Room';

      /**
       *
       */
      page?: string;

      /**
       *
       */
      perPage?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetExtensionGrantListResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/users': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Extension type. Multiple values are supported
       */
      type?: 'User' | 'Limited';

      /**
       * Filters entries containing the specified substring in user name, extension or department. The characters range is 0-64; not case-sensitive. If empty then the filter is ignored
       */
      searchString?: string;

      /**
       * Department name to filter the users. The value range is 0-64; not case-sensitive. If not specified then the parameter is ignored. Multiple values are supported
       */
      department?: string;

      /**
       * Internal identifier of a site. To filter users of Main Site (Company) `main-site` must be specified. Supported only If Multi-Site feature is enabled for the account. Multiple values are supported
       */
      siteId?: string;

      /**
       * Filters entries by their status of Automatic Location Updates feature
       */
      featureEnabled?: boolean;

      /**
       * Comma-separated list of fields to order results prefixed by plus sign '+' (ascending order) or minus sign '-' (descending order). Supported values: 'name', 'modelName', 'siteName', 'featureEnabled'
       */
      orderBy?: string;

      /**
       * Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page
       */
      perPage?: number;

      /**
       * Indicates the page number to retrieve. Only positive number values are supported
       */
      page?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * User List
       */
      200: AutomaticLocationUpdatesUserList;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/wireless-points': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a site. To filter Main Site (Company) 'main-site' must be specified. Supported only If multi-site feature is enabled for the account
       */
      siteId?: string;

      /**
       * Filters entries by the specified substring (search by chassis ID, switch name or address) The characters range is 0-64 (if empty the filter is ignored)
       */
      searchString?: string;

      /**
       * Comma-separated list of fields to order results prefixed by '+' sign (ascending order) or '-' sign (descending order). The default sorting is by `name`
       */
      orderBy?: string;

      /**
       * Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page
       */
      perPage?: number;

      /**
       * Indicates the page number to retrieve. Only positive number values are supported
       */
      page?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Wireless Points
       */
      200: WirelessPointsList;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/wireless-points/:pointId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      pointId: string;
    };
    requestBody: undefined;
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
    requestBody: undefined;
    responses: {
      /**
       * Networks List
       */
      200: NetworksList;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/networks/:networkId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      networkId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Network information
       */
      200: NetworkInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/devices': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a site. To filter devices of Main Site (Company) `main-site` must be specified. Supported only If Multi-Site feature is enabled for the account
       */
      siteId?: string;

      /**
       * Filters entries by their status of Automatic Location Updates feature
       */
      featureEnabled?: boolean;

      /**
       * Internal identifier of a device model for filtering. Multiple values are supported
       */
      model?: string;

      /**
       * Filters devices which support HELD protocol
       */
      compatibleOnly?: boolean;

      /**
       * Filters entries which have device name or model name containing the mentioned substring. The value should be split by spaces; the range is 0 - 64 characters, not case-sensitive. If empty the filter is ignored
       */
      searchString?: string;

      /**
       * Comma-separated list of fields to order results prefixed by plus sign '+' (ascending order) or minus sign '-' (descending order). Supported values: 'name', 'modelName', 'siteName', 'featureEnabled'
       */
      orderBy?: string;

      /**
       * Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page
       */
      perPage?: number;

      /**
       * Indicates the page number to retrieve. Only positive number values are supported
       */
      page?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Device List with their status of Automatic Location Updates feature
       */
      200: ListDevicesAutomaticLocationUpdates;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/switches': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a site. To filter Main Site (Company) main-site must be specified. Supported only If multi-site feature is enabled for the account
       */
      siteId?: string;

      /**
       * Filters entries by the specified substring (search by chassis ID, switch name or address) The characters range is 0-64 (if empty the filter is ignored)
       */
      searchString?: string;

      /**
       * Comma-separated list of fields to order results prefixed by '+' sign (ascending order) or '-' sign (descending order). The default sorting is by `name`
       */
      orderBy?: string;

      /**
       * Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page
       */
      perPage?: number;

      /**
       * Indicates the page number to retrieve. Only positive number values are supported
       */
      page?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Switches Map
       */
      200: SwitchesList;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/switches/:switchId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      switchId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Switch information
       */
      200: SwitchInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-address-auto-update/tasks/:taskId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      taskId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Task Information
       */
      200: AutomaticLocationUpdatesTaskInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-locations': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Filters entries containing the specified substring in address and name fields. The characters range is 0-64; not case-sensitive. If empty then the filter is ignored
       */
      searchString?: string;

      /**
       * Internal identifier of a site for filtering. To filter by Main Site (Company) `main-site` value should be specified
       */
      siteId?: string;

      /**
       *
       */
      addressStatus?: 'Valid' | 'Invalid';

      /**
       *
       */
      usageStatus?: 'Active' | 'Inactive';

      /**
       *
       */
      domesticCountryId?: string;

      /**
       * Comma-separated list of fields to order results prefixed by plus sign '+' (ascending order) or minus sign '-' (descending order). The default value is `+address`
       */
      orderBy?:
        | 'name'
        | 'siteName'
        | 'address'
        | 'addressStatus'
        | 'usageStatus';

      /**
       * Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page
       */
      perPage?: number;

      /**
       * Indicates the page number to retrieve. Only positive number values are supported
       */
      page?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Emergency Location List
       */
      200: EmergencyLocationList;
    };
  };
  '/restapi/v1.0/account/:accountId/emergency-locations/:locationId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of the emergency location
       */
      locationId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Emergency Location Information
       */
      200: EmergencyLocationInfo;
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

      /**
       * Internal identifier of a site. To filter Main Site (Company) main-site must be specified. Supported only If multi-site feature is enabled for the account
       */
      siteId?: string[];

      /**
       * Filters entries by the specified substring (search by chassis ID, switch name or address) The characters range is 0-64 (if empty the filter is ignored)
       */
      searchString?: string;

      /**
       *
       */
      domesticCountryId?: string;

      /**
       * Comma-separated list of fields to order results prefixed by plus sign '+' (ascending order) or minus sign '-' (descending order). The default value is `+visibility`, which means public ERLs will be returned first in the list, then - private ones
       */
      orderBy?:
        | 'name'
        | 'siteName'
        | 'address'
        | 'addressStatus'
        | 'usageStatus'
        | 'visibility';

      /**
       * Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page
       */
      perPage?: number;

      /**
       * Indicates the page number to retrieve. Only positive number values are supported
       */
      page?: number;

      /**
       * Specifies whether to return only private or only public (company) ERLs (Emergency Response Locations)
       */
      visibility?: 'Private' | 'Public';

      /**
       * Flag that provides matching the client 'etag' value with the server one
       */
      'If-None-Match'?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * User Emergency Location List
       */
      200: EmergencyLocationsResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/emergency-locations/:locationId': {
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
       * Internal identifier of emergency location
       */
      locationId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: EmergencyLocationInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/notification-settings': {
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
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: NotificationSettings;
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
    requestBody: undefined;
    responses: {
      /**
       * User Profile Image (Media Data)
       */
      200: any;

      /**
       * Not Modified
       */
      304: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/profile-image/:scaleSize': {
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
       * Dimensions of a profile image which will be returned in response. If this path parameter is not specified in request URI then
       */
      scaleSize: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * User Profile Image Media Data
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/conferencing': {
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
       * Internal identifier of a country. If not specified, the response is returned for the brand country
       */
      countryId?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetConferencingInfoResponse;
    };
  };
  '/restapi/v1.0/account/:accountId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetAccountInfoResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/business-address': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: AccountBusinessAddressResource;
    };
  };
  '/restapi/v1.0/account/:accountId/service-info': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetServiceInfoResponse;
    };
  };
  '/restapi/v1.0/dictionary/language': {
    parameters: {};
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: LanguageList;
    };
  };
  '/restapi/v1.0/dictionary/language/:languageId': {
    parameters: {
      /**
       * Internal identifier of a language
       */
      languageId: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: LanguageInfo;
    };
  };
  '/restapi/v1.0/dictionary/country': {
    parameters: {
      /**
       * Specifies whether login with the phone numbers of this country is enabled or not
       */
      loginAllowed?: boolean;

      /**
       * Indicates whether signup/billing is allowed for a country. If not specified all countries are returned (according to other filters specified if any)
       */
      signupAllowed?: boolean;

      /**
       * Specifies if RingCentral sells phone numbers of this country
       */
      numberSelling?: boolean;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       * Specifies if free phone line for softphone is available for a country or not
       */
      freeSoftphoneLine?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetCountryListResponse;
    };
  };
  '/restapi/v1.0/dictionary/country/:countryId': {
    parameters: {
      /**
       * Internal identifier of a country
       */
      countryId: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetCountryInfoDictionaryResponse;
    };
  };
  '/restapi/v1.0/dictionary/location': {
    parameters: {
      /**
       * Sorts results by the property specified
       */
      orderBy?: 'Npa' | 'City';

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       * Internal identifier of a state
       */
      stateId?: string;

      /**
       * Specifies if nxx codes are returned
       */
      withNxx?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetLocationListResponse;
    };
  };
  '/restapi/v1.0/dictionary/state': {
    parameters: {
      /**
       * If set to 'True' then states for all countries are returned and `countryId` is ignored, even if specified. If the value is empty then the parameter is ignored
       */
      allCountries?: boolean;

      /**
       * Internal identifier of a country
       */
      countryId?: number;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       * If 'True', the list of states with phone numbers available for buying is returned
       */
      withPhoneNumbers?: boolean;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetStateListResponse;
    };
  };
  '/restapi/v1.0/dictionary/state/:stateId': {
    parameters: {
      /**
       * Internal identifier of a state
       */
      stateId: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetStateInfoResponse;
    };
  };
  '/restapi/v1.0/dictionary/timezone': {
    parameters: {
      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: string;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetTimezoneListResponse;
    };
  };
  '/restapi/v1.0/dictionary/timezone/:timezoneId': {
    parameters: {
      /**
       * Internal identifier of a timezone
       */
      timezoneId: number;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: string;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetTimezoneInfoResponse;
    };
  };
  '/restapi/v1.0/dictionary/brand/:brandId/contracted-country/:contractedCountryId': {
    parameters: {
      /**
       * Internal identifier of a brand
       */
      brandId: string;

      /**
       * Internal identifier of a country
       */
      contractedCountryId: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetCountryListResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/phone-number': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       * Usage type of a phone number
       */
      usageType?: (
        | 'MainCompanyNumber'
        | 'AdditionalCompanyNumber'
        | 'CompanyNumber'
        | 'DirectNumber'
        | 'CompanyFaxNumber'
        | 'ForwardedNumber'
        | 'ForwardedCompanyNumber'
        | 'ContactCenterNumber'
        | 'ConferencingNumber'
        | 'MeetingsNumber'
        | 'BusinessMobileNumber'
        | 'IntegrationNumber'
      )[];

      /**
       * Status of a phone number. Multiple values are supported
       */
      status?: 'Normal' | 'Pending' | 'PortedIn' | 'Temporary';
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: AccountPhoneNumbers;
    };
  };
  '/restapi/v1.0/account/:accountId/phone-number/:phoneNumberId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a phone number
       */
      phoneNumberId: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CompanyPhoneNumberInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Number of extension to be retrieved
       */
      extensionNumber?: string;

      /**
       * Extension email address. Multiple values are accepted
       */
      email?: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are allowed
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       * Extension current state. Multiple values are supported. If 'Unassigned' is specified, then extensions without `extensionNumber` attribute are returned. If not specified, then all extensions are returned.
       */
      status?: ('Enabled' | 'Disabled' | 'NotActivated' | 'Unassigned')[];

      /**
       * Extension type. Multiple values are supported. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
       */
      type?: (
        | 'User'
        | 'FaxUser'
        | 'VirtualUser'
        | 'DigitalUser'
        | 'Department'
        | 'Announcement'
        | 'Voicemail'
        | 'SharedLinesGroup'
        | 'PagingOnly'
        | 'IvrMenu'
        | 'ApplicationExtension'
        | 'ParkLocation'
        | 'Limited'
        | 'Bot'
        | 'ProxyAdmin'
        | 'DelegatedLinesGroup'
      )[];
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetExtensionListResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/templates': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      type?: 'UserSettings' | 'CallHandling';

      /**
       *
       */
      page?: string;

      /**
       *
       */
      perPage?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: UserTemplates;
    };
  };
  '/restapi/v1.0/account/:accountId/templates/:templateId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      templateId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: TemplateInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/video-configuration': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the current session account
       */
      extensionId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * User Video Configuration
       */
      200: UserVideoConfiguration;
    };
  };
  '/restapi/v1.0/account/:accountId/call-queues': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       * Internal identifier of an extension that is a member of every group within the result
       */
      memberExtensionId?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CallQueues;
    };
  };
  '/restapi/v1.0/account/:accountId/call-queues/:groupId': {
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
    requestBody: undefined;
    responses: {
      /**
       * Call Queue Info
       */
      200: CallQueueDetails;
    };
  };
  '/restapi/v1.0/account/:accountId/call-queues/:groupId/members': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      groupId: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are allowed
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CallQueueMembers;
    };
  };
  '/restapi/v1.0/account/:accountId/paging-only-groups/:pagingOnlyGroupId/users': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a paging group
       */
      pagingOnlyGroupId: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: PagingOnlyGroupUsers;
    };
  };
  '/restapi/v1.0/account/:accountId/paging-only-groups/:pagingOnlyGroupId/devices': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a paging group
       */
      pagingOnlyGroupId: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are accepted
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: PagingOnlyGroupDevices;
    };
  };
  '/restapi/v1.0/account/:accountId/call-monitoring-groups': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are allowed
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;

      /**
       * Internal identifier of an extension that is a member of every group within the result
       */
      memberExtensionId?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CallMonitoringGroups;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/features': {
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
       *
       */
      availableOnly?: boolean;

      /**
       *
       */
      featureId?: string[];
    };
    requestBody: undefined;
    responses: {
      /**
       * Feature List
       */
      200: FeatureList;
    };
  };
  '/restapi/v1.0/account/:accountId/call-monitoring-groups/:groupId/members': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      groupId: string;

      /**
       * Indicates the page number to retrieve. Only positive number values are allowed
       */
      page?: number;

      /**
       * Indicates the page size (number of items)
       */
      perPage?: number;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CallMonitoringGroupMemberList;
    };
  };
  '/restapi/v1.0/account/:accountId/extension-bulk-update/tasks/:taskId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a task
       */
      taskId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: ExtensionBulkUpdateTaskResource;
    };
  };
  '/restapi/v1.0/account/:accountId/address-book-bulk-upload/tasks/:taskId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a task
       */
      taskId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: AddressBookBulkUploadResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/authz-profile': {
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
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: AuthProfileResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/authz-profile/check': {
    parameters: {
      /**
       *
       */
      permissionId?: string;

      /**
       *
       */
      targetExtensionId?: string;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Authorization Profile Resource
       */
      200: AuthProfileCheckResource;
    };
  };
  '/restapi/v1.0/account/:accountId/assigned-role': {
    parameters: {
      /**
       *
       */
      showHidden?: boolean;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: ExtensionWithRolesCollectionResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/assigned-role': {
    parameters: {
      /**
       *
       */
      showHidden?: boolean;

      /**
       * Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session
       */
      extensionId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Assigned Roles List
       */
      200: AssignedRolesResource;
    };
  };
  '/restapi/v1.0/account/:accountId/user-role/default': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: any;
    };
  };
  '/restapi/v1.0/dictionary/user-role': {
    parameters: {
      /**
       *
       */
      page?: string;

      /**
       *
       */
      perPage?: string;

      /**
       *
       */
      servicePlanId?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: RolesCollectionResource;
    };
  };
  '/restapi/v1.0/dictionary/user-role/:roleId': {
    parameters: {
      /**
       *
       */
      roleId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: RoleResource;
    };
  };
  '/restapi/v1.0/account/:accountId/user-role': {
    parameters: {
      /**
       * Specifies whether to return custom or predefined only roles. If not specified, all roles are returned
       */
      custom?: boolean;

      /**
       *
       */
      page?: string;

      /**
       *
       */
      perPage?: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Account User Role List
       */
      200: RolesCollectionResource;
    };
  };
  '/restapi/v1.0/account/:accountId/user-role/:roleId': {
    parameters: {
      /**
       *
       */
      roleId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: RoleResource;
    };
  };
  '/restapi/v1.0/dictionary/permission': {
    parameters: {
      /**
       *
       */
      page?: string;

      /**
       *
       */
      perPage?: string;

      /**
       *
       */
      assignable?: boolean;

      /**
       *
       */
      servicePlanId?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: PermissionCollectionResource;
    };
  };
  '/restapi/v1.0/dictionary/permission/:permissionId': {
    parameters: {
      /**
       *
       */
      permissionId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: PermissionResource;
    };
  };
  '/restapi/v1.0/dictionary/permission-category': {
    parameters: {
      /**
       *
       */
      page?: string;

      /**
       *
       */
      perPage?: string;

      /**
       *
       */
      servicePlanId?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: PermissionCategoryCollectionResource;
    };
  };
  '/restapi/v1.0/dictionary/permission-category/:permissionCategoryId': {
    parameters: {
      /**
       *
       */
      permissionCategoryId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: PermissionCategoryResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/administered-sites': {
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
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/ring-out/:ringoutId': {
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
       * Internal identifier of a RingOut call
       */
      ringoutId: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: GetRingOutStatusResponse;
    };
  };
  '/scim/v2/ServiceProviderConfig': {
    parameters: {};
    requestBody: undefined;
    responses: {
      /**
       * Service Provider Configuration
       */
      200: ServiceProviderConfig;
    };
  };
  '/scim/v2/Users': {
    parameters: {
      /**
       * only support 'userName' or 'email' filter expressions for now
       */
      filter?: string;

      /**
       * start index (1-based)
       */
      startIndex?: number;

      /**
       * page size
       */
      count?: number;
    };
    requestBody: undefined;
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
  '/scim/v2/Users/:id': {
    parameters: {
      /**
       * user id
       */
      id: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * successful operation
       */
      200: UserResponse;

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
       * too many requests
       */
      429: ScimErrorResponse;

      /**
       * internal server error
       */
      500: ScimErrorResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId': {
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
       * The date and time of a call session latest change
       */
      timestamp?: string;

      /**
       * The time frame of awaiting for a status change before sending the resulting one in response
       */
      timeout?: string;
    };
    requestBody: undefined;
    responses: {
      /**
       * Success
       */
      200: CallSessionObject;

      /**
       * Forbidden
       */
      403: any;

      /**
       * Not Found
       */
      404: any;

      /**
       * Service Temporary Unavailable
       */
      503: any;
    };
  };
  '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId': {
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

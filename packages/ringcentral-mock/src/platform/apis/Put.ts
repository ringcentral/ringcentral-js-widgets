import {
  PresenceInfoRequest,
  PresenceInfoResponse,
  CallQueueUpdatePresence,
  CallQueuePresence,
  ExtensionCallQueueUpdatePresenceList,
  ExtensionCallQueuePresenceList,
  ModifySubscriptionRequest,
  SubscriptionInfo,
  GlipAdaptiveCardRequest,
  GlipAdaptiveCardShortInfo,
  GlipEventCreate,
  GlipEventInfo,
  PersonalContactRequest,
  PersonalContactResource,
  FavoriteCollection,
  FavoriteContactList,
  UserBusinessHoursUpdateRequest,
  UserBusinessHoursUpdateResponse,
  CompanyBusinessHoursUpdateRequest,
  CompanyBusinessHours,
  CallerBlockingSettingsUpdate,
  CallerBlockingSettings,
  AddBlockedAllowedPhoneNumber,
  BlockedAllowedPhoneNumberInfo,
  UpdateForwardingNumberRequest,
  ForwardingNumberInfo,
  UpdateAnsweringRuleRequest,
  AnsweringRuleInfo,
  CompanyAnsweringRuleUpdate,
  CompanyAnsweringRuleInfo,
  UpdateIVRPromptRequest,
  PromptInfo,
  IVRMenuInfo,
  CallRecordingSettingsResource,
  CustomFieldUpdateRequest,
  CustomFieldResource,
  AccountDeviceUpdate,
  GetDeviceInfoResponse,
  MeetingRequestResource,
  MeetingResponseResource,
  UpdateMessageRequest,
  GetMessageInfoResponse,
  GetMessageInfoMultiResponse,
  MessageStoreConfiguration,
  ExtensionUpdateRequest,
  GetExtensionInfoResponse,
  ExtensionCallerIdInfoRequest,
  ExtensionCallerIdInfo,
  UpdateWirelessPoint,
  WirelessPointInfo,
  UpdateNetworkRequest,
  UpdateSwitchInfo,
  SwitchInfo,
  EmergencyLocationInfoRequest,
  EmergencyLocationInfo,
  NotificationSettingsUpdateRequest,
  NotificationSettings,
  UpdateUserProfileImageRequest,
  UpdateConferencingInfoRequest,
  GetConferencingInfoResponse,
  ModifyAccountBusinessAddressRequest,
  AccountBusinessAddressResource,
  UserVideoConfiguration,
  CallQueueUpdateDetails,
  CallQueueDetails,
  UserCallQueues,
  CreateCallMonitoringGroupRequest,
  CallMonitoringGroup,
  AssignedRolesResource,
  DefaultUserRoleRequest,
  RoleResource,
  BusinessSiteCollectionRequest,
  BusinessSiteCollectionResource,
  User,
  UserResponse,
  ScimErrorResponse,
} from '../interfaces';

export interface Put {
  '/restapi/v1.0/account/:accountId/extension/:extensionId/presence': {
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
    requestBody?: PresenceInfoRequest;
    responses: {
      /**
       * OK
       */
      200: PresenceInfoResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/call-queues/:groupId/presence': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call queue extension
       */
      groupId: string;
    };
    requestBody: CallQueueUpdatePresence;
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
    };
    requestBody: ExtensionCallQueueUpdatePresenceList;
    responses: {
      /**
       * OK
       */
      200: ExtensionCallQueuePresenceList;
    };
  };
  '/restapi/v1.0/subscription/:subscriptionId': {
    parameters: {
      /**
       * Internal identifier of a subscription
       */
      subscriptionId: string;
    };
    requestBody: ModifySubscriptionRequest;
    responses: {
      /**
       * Updated Subscription
       */
      200: SubscriptionInfo;
    };
  };
  '/restapi/v1.0/glip/adaptive-cards/:cardId': {
    parameters: {
      /**
       * Internal identifier of an adaptive card
       */
      cardId: string;
    };
    requestBody: GlipAdaptiveCardRequest;
    responses: {
      /**
       * OK
       */
      200: GlipAdaptiveCardShortInfo;

      /**
       * Some of parameters are missing or have invalid format.
       */
      400: any;

      /**
       * You do not have permissions to upadte specified adaptive card.
       */
      403: any;

      /**
       * Adaptive Card for update does not exist.
       */
      404: any;
    };
  };
  '/restapi/v1.0/glip/events/:eventId': {
    parameters: {
      /**
       * Internal identifier of an event
       */
      eventId: string;
    };
    requestBody: GlipEventCreate;
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
       * Event to update not exists.
       */
      404: any;
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

      /**
       * A country code value complying with the [ISO 3166-1 alpha-2](https://ru.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. The default value is home country of the current extension
       */
      dialingPlan?: string;
    };
    requestBody?: PersonalContactRequest;
    responses: {
      /**
       * Success
       */
      200: PersonalContactResource;
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
    requestBody?: FavoriteCollection;
    responses: {
      /**
       * Favorite Contact List
       */
      200: FavoriteContactList;
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
    requestBody: UserBusinessHoursUpdateRequest;
    responses: {
      /**
       * OK
       */
      200: UserBusinessHoursUpdateResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/business-hours': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: CompanyBusinessHoursUpdateRequest;
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
    requestBody?: CallerBlockingSettingsUpdate;
    responses: {
      /**
       * OK
       */
      200: CallerBlockingSettings;
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
    requestBody?: AddBlockedAllowedPhoneNumber;
    responses: {
      /**
       * OK
       */
      200: BlockedAllowedPhoneNumberInfo;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/forwarding-number/:forwardingNumberId': {
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
       * Internal identifier of a forwarding number; returned in response in the 'id' field
       */
      forwardingNumberId: string;
    };
    requestBody: UpdateForwardingNumberRequest;
    responses: {
      /**
       * OK
       */
      200: ForwardingNumberInfo;
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
       * Internal identifier of an answering rule
       */
      ruleId: string;
    };
    requestBody: UpdateAnsweringRuleRequest;
    responses: {
      /**
       * OK
       */
      200: AnsweringRuleInfo;
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
    requestBody: CompanyAnsweringRuleUpdate;
    responses: {
      /**
       * OK
       */
      200: CompanyAnsweringRuleInfo;
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
    requestBody?: UpdateIVRPromptRequest;
    responses: {
      /**
       * Updated Prompt Information
       */
      200: PromptInfo;
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
    requestBody: IVRMenuInfo;
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
    requestBody?: CallRecordingSettingsResource;
    responses: {
      /**
       * OK: Updated Call Recording Settings
       */
      200: CallRecordingSettingsResource;
    };
  };
  '/restapi/v1.0/account/:accountId/custom-fields/:fieldId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Custom field identifier
       */
      fieldId: string;
    };
    requestBody?: CustomFieldUpdateRequest;
    responses: {
      /**
       * Custom Field
       */
      200: CustomFieldResource;
    };
  };
  '/restapi/v1.0/account/:accountId/device/:deviceId': {
    parameters: {
      /**
       *
       */
      deviceId: string;

      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       *
       */
      prestatement?: boolean;
    };
    requestBody?: AccountDeviceUpdate;
    responses: {
      /**
       * successful operation
       */
      200: GetDeviceInfoResponse;
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
    requestBody?: MeetingRequestResource;
    responses: {
      /**
       * OK: Updated Meeting Info
       */
      200: MeetingResponseResource;
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
      messageId: number[];

      /**
       *
       */
      dateFrom?: string;

      /**
       *
       */
      type?: 'Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text' | 'All';
    };
    requestBody: UpdateMessageRequest;
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
  '/restapi/v1.0/account/:accountId/message-store-configuration': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: MessageStoreConfiguration;
    responses: {
      /**
       * Successful operation
       */
      200: MessageStoreConfiguration;
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
    requestBody: ExtensionUpdateRequest;
    responses: {
      /**
       * Success
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
    requestBody: ExtensionCallerIdInfoRequest;
    responses: {
      /**
       * Success
       */
      200: ExtensionCallerIdInfo;
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
    requestBody: UpdateWirelessPoint;
    responses: {
      /**
       * Wireless Point
       */
      200: WirelessPointInfo;
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
    requestBody: UpdateNetworkRequest;
    responses: {
      /**
       * Success
       */
      200: any;
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
    requestBody: UpdateSwitchInfo;
    responses: {
      /**
       * Switch information
       */
      200: SwitchInfo;
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
    requestBody: EmergencyLocationInfoRequest;
    responses: {
      /**
       * Emergency Location Information
       */
      200: EmergencyLocationInfo;
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
       * Internal identifier of an emergency response location to be deleted
       */
      locationId: string;
    };
    requestBody: EmergencyLocationInfo;
    responses: {
      /**
       * OK
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
    requestBody: NotificationSettingsUpdateRequest;
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
    requestBody?: UpdateUserProfileImageRequest;
    responses: {
      /**
       * No Content
       */
      204: any;
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
    };
    requestBody: UpdateConferencingInfoRequest;
    responses: {
      /**
       * Success
       */
      200: GetConferencingInfoResponse;
    };
  };
  '/restapi/v1.0/account/:accountId/business-address': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;
    };
    requestBody: ModifyAccountBusinessAddressRequest;
    responses: {
      /**
       * Success
       */
      200: AccountBusinessAddressResource;
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
    requestBody: UserVideoConfiguration;
    responses: {
      /**
       * Video Configuration
       */
      200: UserVideoConfiguration;
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
    requestBody: CallQueueUpdateDetails;
    responses: {
      /**
       * Updated Call Queue Info
       */
      200: CallQueueDetails;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/call-queues': {
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
    requestBody: UserCallQueues;
    responses: {
      /**
       * OK
       */
      200: UserCallQueues;
    };
  };
  '/restapi/v1.0/account/:accountId/call-monitoring-groups/:groupId': {
    parameters: {
      /**
       * Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session
       */
      accountId: string;

      /**
       * Internal identifier of a call monitoring group
       */
      groupId: string;
    };
    requestBody: CreateCallMonitoringGroupRequest;
    responses: {
      /**
       * Success
       */
      200: CallMonitoringGroup;

      /**
       * Value for group name is unacceptable.
       */
      400: any;

      /**
       * User has no permissions to create groups.
       */
      403: any;

      /**
       * Group with the given identifier doesn't belong to the account.
       */
      404: any;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/assigned-role': {
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
    requestBody?: AssignedRolesResource;
    responses: {
      /**
       * successful operation
       */
      200: AssignedRolesResource;
    };
  };
  '/restapi/v1.0/account/:accountId/extension/:extensionId/assigned-role/default': {
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
       * Assigned Roles Resource
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
    requestBody: DefaultUserRoleRequest;
    responses: {
      /**
       * Success
       */
      200: any;
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
    requestBody?: RoleResource;
    responses: {
      /**
       * successful operation
       */
      200: any;
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
    requestBody?: BusinessSiteCollectionRequest;
    responses: {
      /**
       * Success
       */
      200: BusinessSiteCollectionResource;
    };
  };
  '/scim/v2/Users/:id': {
    parameters: {
      /**
       * user id
       */
      id: string;
    };
    requestBody?: User;
    responses: {
      /**
       * successfully fully updated a user
       */
      200: UserResponse;

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
}

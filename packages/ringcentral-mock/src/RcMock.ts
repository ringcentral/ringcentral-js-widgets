import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import { telephonyStatus as telephonyStatuses } from '@ringcentral-integration/commons/enums/telephonyStatus';
import {
  createTelephonySession,
  makeTelephonySessionId,
  makeWebphoneSessionId,
  telephonySessionBuildersCache,
  clearTelephonySessionBuilders,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { RcvDelegator } from '@ringcentral-integration/commons/modules/RcVideo';
import { isConferenceSession } from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import type { MockRequest } from 'fetch-mock';
import { includes } from 'ramda';
import { PartyStatusCode } from 'ringcentral-call-control/lib/Session';

import type { PlatformMockOptions, ResponseData } from './PlatformMock';
import { PlatformMock } from './PlatformMock';
import type {
  ArraySchemaObject,
  MakeCallProps,
  MessageProps,
  SchemaObject,
} from './interface';
import { generateTelephonyState } from './lib/generateTelephonyState';
import accountBody from './platform/data/accountInfo.json';
import blockedNumberBody from './platform/data/blockedNumber.json';
import bringInToConferenceResponse from './platform/data/bringInToConferenceRes.json';
import callQueueBody from './platform/data/callQueue.json';
import clientInfoResponseBody from './platform/data/clientInfo.json';
import companyPagerResponse from './platform/data/companyPager.json';
import companyPagerInvalidResponse from './platform/data/companyPagerInvalid.json';
import conferenceCallResponse from './platform/data/conferenceCall.json';
import deviceBody from './platform/data/device.json';
import dialInNumbersBody from './platform/data/dialInNumbers.json';
import dialingPlanBody from './platform/data/dialingPlan.json';
import directoryEntries from './platform/data/directoryEntries.json';
import discoveryExternalBody from './platform/data/discoveryExternal.json';
import discoveryInitialBody from './platform/data/discoveryInitial.json';
import extensionInfoBody from './platform/data/extensionInfo.json';
import extensionsListBody from './platform/data/extensions.json';
import faxResponse from './platform/data/fax.json';
import featuresBody from './platform/data/features.json';
import forwardAllCallsBody from './platform/data/forwardAllCallsInfo.json';
import forwardParty from './platform/data/forwardParty.json';
import generateCodeBody from './platform/data/generateCode.json';
import grantBody from './platform/data/grant.json';
import invitationBridgesResponse from './platform/data/invitationBridges.json';
import postMeetingBody from './platform/data/meeting.json';
import meetingInvitation from './platform/data/meetingInvitation.json';
import messageThreadMessages2Body from './platform/data/message-thread-messages-2.json';
import messageThreadMessagesBody from './platform/data/message-thread-messages.json';
import messageThreads2Body from './platform/data/message-threads-2.json';
import messageThreads3Body from './platform/data/message-threads-3.json';
import messageThreadsEntriesFsyncBody from './platform/data/message-threads-entries-fsync.json';
import messageThreadsEntriesIsyncBody from './platform/data/message-threads-entries-isync.json';
import messageThreadsFsyncBody from './platform/data/message-threads-fsync.json';
import messageThreadsIsyncBody from './platform/data/message-threads-isync.json';
import messageThreadsBody from './platform/data/message-threads.json';
import mmsResponse from './platform/data/mms.json';
import parerPhoneNumbersResponse from './platform/data/numberParser.json';
import numberParserAPIResponse from './platform/data/numberParserV2.json';
import partySuperviseResponse from './platform/data/partySupervise.json';
import postRcvBridgesBody from './platform/data/postRcvBridges.json';
import presenceBody from './platform/data/presence.json';
import {
  RCV_INVITATION_BODY,
  RCV_INVITATION_START,
  RCV_INVITATION_END,
} from './platform/data/rcvInvitation';
import rcvMeetingSettingsBody from './platform/data/rcvMeetingSettings.json';
import rcvMeetingSettingsV2Body from './platform/data/rcvMeetingSettingsV2.json';
import ringOutBody from './platform/data/ringOut.json';
import sipProvisionBody from './platform/data/sipProvision.json';
import smsResponse from './platform/data/sms.json';
import smsRecipientsBody from './platform/data/smsRecipients.json';
import telephonySessionResponse from './platform/data/telephonySession.json';
import timezoneResponse from './platform/data/timezone.json';
import videoPersonalSettingsBody from './platform/data/videoPersonalSettings.json';
import videoPersonalSettingsBodyV2 from './platform/data/videoPersonalSettingsV2.json';
import videoPreferenceBody from './platform/data/videoPreference.json';
import wsTokenBody from './platform/data/ws/wstoken.json';
import type {
  AccountLockedSettingResponse,
  DetailedExtensionPresenceWithSIPEvent,
  FeatureList,
  GetRingOutStatusResponse,
  MeetingResponseResource,
  MeetingUserSettingsResponse,
  UserVideoConfiguration,
  CallLogSync,
  AssistedUsersResource,
  PublicMeetingInvitationResponse,
  GetExtensionPhoneNumbersResponse,
  GetMessageList,
  GetExtensionInfoResponse,
  GetPresenceInfo,
  GetAccountInfoResponse,
  UserCallLogResponse,
  PresenceInfoResponse,
  CallParty,
  CallSessionObject,
  GetSMSMessageInfoResponse,
  GetMMSMessageInfoResponse,
  FaxResponse,
  GetExtensionDevicesResponse,
  GetMessageSyncResponse,
  GetMessageInfoResponse,
  TokenInfo,
  ExtensionCallQueuePresenceList,
  GetCallRecordingResponse,
  PartySuperviseResponse,
  CallStatusInfo,
  ExtensionCallerIdInfo,
  GetExtensionForwardingNumberListResponse,
} from './platform/interfaces';
import type { PubnubMock, WebSocketMock } from './subscription';
import { WebphoneSessionMock } from './webphone';

export interface RcMockOptions extends PlatformMockOptions {
  /**
   * mock subscription for RcMock, it should be PubnubMock or WebSocketMock.
   */
  subscription: PubnubMock | WebSocketMock;

  /**
   * Enable separating accurate /message-sync mock for Voicemail, Sms, Fax modules.
   * False by default, which only enable /message-sync for all of them.
   * */
  enableSeparateMessageSyncMock?: boolean;
  /**
   * Skip hold and ring calls.
   * False by default.
   */
  skipHoldRingCalls?: boolean;
}

export interface PostOauthTokenProps {
  failure?: boolean;
  repeat?: number;
  failureCode?: 400 | 403 | 503;
}

interface CreateConferenceResponse {
  session: CallSessionObject;
}

type HttpStatusCode = 200 | 201 | 400 | 403 | 404 | 503 | 409 | 500;

export type EventData<T> = {
  event: string;
  timestamp: string;
  body: T;
};

/**
 * RcMock is a mock for Rc base business logic
 *
 * @example
 *
 * ```ts
 * import { RcMock, PubnubMock } from '@ringcentral-integration/mock';
 *
 * const rcMock = new RcMock({ subscription: new PubnubMock() });
 * rcMock.init();
 * fetch('http://example.com/restapi/v1.0/account/~/extension/~/caller-id');
 * expect(rcMock.fetchMock).toHaveFetchedTimes(1, 'http://example.com/restapi/v1.0/account/~/extension/~/caller-id');
 * ```
 */
export class RcMock extends PlatformMock {
  subscription: PubnubMock | WebSocketMock;

  /**
   * Skip hold and ring calls.
   * False by default.
   */
  skipHoldRingCalls: boolean;

  private _messageStoreTemplates!: {
    id: string;
    displayName: string;
    body: {
      text: string;
    };
    scope: string;
  }[];

  constructor({
    subscription,
    enableSeparateMessageSyncMock,
    skipHoldRingCalls = false,
    ...options
  }: RcMockOptions) {
    super(options);
    this.subscription = subscription;
    this.skipHoldRingCalls = skipHoldRingCalls;
    this.initMessageStoreTemplates();
    this.defaultInitMocks
      .add(this.getCheckPing)
      .add(this.postAuthentication)
      .add(this.postOauthToken)
      .add(this.putCallerId)
      .add(this.getCallerId)
      .add(this.getCallQueue)
      .add(this.getExtension)
      .add(this.getAccount)
      .add(this.getFeatures)
      .add(this.getForwardAllCalls)
      .add(this.postSubscription)
      .add(this.getDevice)
      .add(this.getBlockedNumber)
      .add(this.getAddressBookSync)
      .add(this.getPresence)
      .add(this.getInstances)
      .add(this.getPhoneNumber)
      .add(this.getForwardingNumber)
      .add(this.getContacts)
      .add(this.getContactsByPublicApi)
      .add(this.getDialingPlan)
      .add(this.getVideoConfiguration)
      .add(this.getActiveCalls)
      .add(this.getCallLogSync)
      .add(this.getMessageStore)
      .add(this.deleteMessage)
      .add(this.deleteConversation)
      .add(this.postSipProvision)
      .add(this.getClientInfo)
      .add(this.postAuthRevoke)
      .add(this.deleteSubscription)
      .add(this.getDiscoveryInitial)
      .add(this.getDiscoveryExternal)
      .add(this.getTimezone)
      .add(this.getDelegators)
      .add(this.getVideoPersonalSettings)
      .add(this.postRcvInvitation)
      .add(this.getDialInNumbers)
      .add(this.getPreferences)
      .add(this.patchPreferences)
      .add(this.getMeetingsConfigurationAssisted)
      .add(this.getMeetingServiceInfo)
      .add(this.getMeetingUserSettings)
      .add(this.getMeetingLockedSettings)
      .add(this.postMeeting)
      .add(this.getInvitation)
      .add(this.getRcvMeetingInfoV2)
      .add(this.deleteMeeting)
      .add(this.getMeeting)
      .add(this.getRcvMeetingInfo)
      .add(this.getVideoPersonalSettingsV2)
      .add(this.putMeeting)
      .add(this.getInteropGenerateCode)
      .add(this.postWsToken)
      .add(this.getTelephonyState)
      .add(this.getCallLog)
      .add(this.deleteCallLog)
      .add(this.deleteAllCallLog)
      .add(this.postSms)
      .add(this.postMms)
      .add(this.postFax)
      .add(this.getProfileImage)
      .add(this.getInvitationBridges)
      .add(this.postCompanyPager)
      .add(this.postNumberParserV2)
      .add(this.ringOut)
      .add(this.getMessageStoreTemplates)
      .add(this.postMessageStoreTemplates)
      .add(this.putMessageStoreTemplates)
      .add(this.deleteMessageStoreTemplates)
      .add(this.postPartyForward)
      .add(this.getExtensionGrants)
      .add(this.getCallQueues)
      .add(this.postMessageThreadAssign)
      .add(this.postMessageThreadResolve)
      .add(this.getMessageThreads)
      .add(this.getMessageThreadSync)
      .add(this.getMessageThreadEntriesSync)
      .add(this.getMessageThreadMessages)
      .add(this.getMessageThread)
      .add(this.getCallQueuesSmsRecipients);

    if (enableSeparateMessageSyncMock) {
      this.defaultInitMocks
        .add(this.getFaxMessageSync)
        .add(this.getVoicemailMessageSync)
        .add(this.getSmsMessageSync);
    } else {
      this.defaultInitMocks.add(this.getMessageSync);
    }
  }

  replaceDefaultInitMock(
    key: (...args: any[]) => any,
    value: (...args: any[]) => any,
  ) {
    const arr = [...this.defaultInitMocks];
    const index = arr.indexOf(key);
    if (index > -1) {
      arr.splice(index, 1, value);
      this.defaultInitMocks = new Set(arr);
    } else {
      throw new Error(`Can not find ${key} in defaultInitMocks`);
    }
  }

  removeWebphone?: () => void;

  override reset() {
    this.subscription.remove();
    this.removeWebphone?.();
    clearTelephonySessionBuilders();
    this.initMessageStoreTemplates();
    return super.reset();
  }

  getCheckPing() {
    this.mock('/integration/ping', 0, {
      method: 'HEAD',
    });
  }

  postAuthentication(
    handler?: (mockData: TokenInfo) => TokenInfo,
    repeat?: number,
  ) {
    this.post('/restapi/oauth/token', 200, {
      response: ({ mockData }) => {
        const data = {
          ...mockData,
          access_token: btoa(Math.random().toString()),
          refresh_token: btoa(Math.random().toString()),
          expires_in: 3600,
          refresh_token_expires_in: 60480,
          expireTime: Date.now() + 3600 * 1000,
          scope:
            'EditAccounts ReadMessages Faxes ReadPresence EditCallLog Meetings VoipCalling ReadClientInfo Interoperability VideoInternal WebSocket SubscriptionPubNub SubscriptionWebSocket Contacts SubscriptionGCM EditExtensions TelephonySessions ProblemReportsManagement RingOut SMS InternalMessages EditMessages EditPresence SendUsageInfo',
        };
        const result = handler?.(data) ?? data;
        return {
          body: result,
        };
      },
      repeat,
    });
  }

  postAuthRevoke({ repeat }: { repeat?: number } = {}) {
    this.post('/restapi/oauth/revoke', 200, { repeat });
  }

  getCallerId(
    handler?: (data: ExtensionCallerIdInfo) => ExtensionCallerIdInfo,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/caller-id',
      200,
      {
        repeat: 0,
        response: ({ mockData }) => {
          return {
            body: handler?.(mockData as any) ?? mockData,
          };
        },
      },
    );
  }

  getExtensionGrants(repeat = 0) {
    this.get('/restapi/v1.0/account/~/extension/~/grant' as any, 200, {
      repeat,
      response: () => {
        return {
          body: grantBody,
        };
      },
    });
  }

  getCallQueues(repeat = 0) {
    this.get('/restapi/v1.0/account/~/call-queues' as any, 200, {
      repeat,
      response: () => {
        return {
          body: callQueueBody,
        };
      },
    });
  }

  /**
   * Mock GET /restapi/v1.0/account/~/call-queues/:queueId/sms-recipients
   * Get SMS recipients for a call queue
   */
  getCallQueuesSmsRecipients() {
    this.get(
      '/restapi/v1.0/account/~/call-queues/:queueId/sms-recipients' as any,
      200,
      {
        repeat: 0,
        response: (res) => {
          const mockData = smsRecipientsBody;
          res.mockData = mockData;
          const processedData =
            this.processors[
              '/restapi/v1.0/account/~/call-queues/:queueId/sms-recipients'
            ](res);
          return {
            body: processedData.mockData,
          };
        },
      },
    );
  }

  putCallerId(repeat = 0, success = true) {
    this.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/caller-id',
      success ? 200 : undefined,
      {
        repeat,
        response: (({ mockData }) => {
          if (!success) {
            throw new Error('unknown error');
          }
          return {
            body: mockData,
          };
        }) as any,
      },
    );
  }

  getDevice(
    handler?: (
      mockData: GetExtensionDevicesResponse,
    ) => GetExtensionDevicesResponse,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/device',
      200,
      {
        repeat: 0,
        response: ({ mockData }) => {
          return {
            body: {
              ...mockData,
              ...(handler?.(deviceBody as any) ?? deviceBody),
            } as GetExtensionDevicesResponse,
          };
        },
      },
    );
  }

  ringOut(
    handler?: (mockData: GetRingOutStatusResponse) => GetRingOutStatusResponse,
  ) {
    this.post(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/ring-out',
      200,
      {
        response: ({ mockData }) => {
          return {
            body: {
              ...mockData,
              ...(handler?.(ringOutBody as any) ?? ringOutBody),
            } as GetRingOutStatusResponse,
          };
        },
      },
    );
  }

  ringOutUpdate(
    handler?: (mockData: GetRingOutStatusResponse) => GetRingOutStatusResponse,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/ring-out/:ringoutId',
      200,
      {
        response: ({ mockData }) => {
          return {
            body: {
              ...mockData,
              ...(handler?.(ringOutBody as any) ?? ringOutBody),
            } as GetRingOutStatusResponse,
          };
        },
      },
    );
  }

  getExtension({ repeat }: { repeat?: number } = {}) {
    // TODO: refactor with mockData
    this.get('/restapi/v1.0/account/:accountId/extension/:extensionId', 200, {
      response: {
        body: extensionInfoBody as GetExtensionInfoResponse,
      },
      repeat,
    });
  }

  getExtensionList() {
    this.get('/restapi/v1.0/account/:accountId/extension');
  }

  getFeatures(
    handler?: (mockData: FeatureList) => FeatureList,
    repeat?: number,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/features',
      200,
      {
        repeat: repeat ?? 1,
        response: ({ mockData }) => {
          return {
            body: {
              ...mockData,
              ...(handler?.(featuresBody as any) ?? featuresBody),
            } as FeatureList,
          };
        },
      },
    );
  }

  getBlockedNumber() {
    // TODO: update schema
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/blocked-number' as any,
      200,
      {
        response: {
          body: blockedNumberBody,
        },
      },
    );
  }

  getAddressBookSync() {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/address-book-sync',
      200,
      {
        response: ({ params, mockData }) => {
          mockData.syncInfo.syncTime = new Date(Date.now()).toISOString();
          if (typeof params.syncType === 'undefined') {
            throw new Error(`syncType should be 'FSync' or 'ISync'`);
          }
          mockData.syncInfo.syncType = params.syncType;
          mockData.nextPageId = 0;
          return { body: mockData };
        },
      },
    );
  }

  postPartyForward(handler?: (data: any) => any, repeat = 0) {
    this.post(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/forward',
      200,
      {
        repeat,
        response: () => {
          return {
            body: handler?.(forwardParty) ?? forwardParty,
          };
        },
      },
    );
  }

  getForwardAllCalls(
    handler?: (data: typeof forwardAllCallsBody) => typeof forwardAllCallsBody,
    repeat = 0,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/forward-all-calls' as any,
      200,
      {
        repeat,
        response: () => {
          return {
            body: handler?.(forwardAllCallsBody) ?? forwardAllCallsBody,
          };
        },
      },
    );
  }

  getInstances(handler = (data: any) => data) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/instances' as any,
      200,
      {
        response: () => {
          return handler?.({ records: [] }) ?? { records: [] };
        },
      },
    );
  }

  getPresence(repeat = 0, handler = (data: GetPresenceInfo) => data) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/presence',
      200,
      {
        repeat,
        response: ({ mockData }) => {
          return {
            body: handler({
              uri: mockData.uri,
              extension: mockData.extension,
              presenceStatus: 'Available',
              telephonyStatus: 'NoCall',
              userStatus: 'Available',
              dndStatus: 'TakeAllCalls',
              meetingStatus: 'Disconnected',
              allowSeeMyPresence: true,
              ringOnMonitoredCall: false,
              pickUpCallsOnHold: false,
            } as GetPresenceInfo),
          };
        },
      },
    );
  }

  getPhoneNumber(
    handler?: (
      mockData: GetExtensionPhoneNumbersResponse,
    ) => GetExtensionPhoneNumbersResponse,
    schema?: (schema: { mockData: SchemaObject }) => { mockData: SchemaObject },
    repeat?: number,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/phone-number',
      200,
      {
        schema,
        response: ({ mockData }) => {
          // make phone number have features that we always need
          mockData.records[0].features = ['CallerId', 'SmsSender', 'MmsSender'];
          // alway have main company number
          mockData.records[0].usageType = 'MainCompanyNumber';

          return {
            body: handler?.(mockData) ?? mockData,
          };
        },
        repeat,
      },
    );
  }

  getForwardingNumber(
    handler?: (
      mockData: GetExtensionForwardingNumberListResponse,
    ) => GetExtensionForwardingNumberListResponse,
    repeat?: number,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/forwarding-number',
      200,
      {
        repeat: repeat ?? 0,
        response: ({ mockData }) => {
          // always give first number have all features
          mockData.records[0].features = ['CallFlip', 'CallForwarding'];

          return {
            body: handler?.(mockData) ?? mockData,
          };
        },
      },
    );
  }

  getContacts(
    handler?: (
      contactData: typeof extensionsListBody,
    ) => typeof extensionsListBody,
    repeat?: number,
  ) {
    // TODO: update schema
    this.get(
      '/restapi/v1.0/account/:accountId/directory/contacts' as any,
      200,
      {
        repeat,
        response: {
          body: handler?.(extensionsListBody) ?? extensionsListBody,
        },
      },
    );
  }

  getContactsByPublicApi(
    handler?: (contactData: typeof directoryEntries) => typeof directoryEntries,
  ) {
    this.get('/restapi/v1.0/account/:accountId/directory/entries' as any, 200, {
      response: { body: handler?.(directoryEntries) ?? directoryEntries },
    });
  }

  getDialingPlan(
    handler?: (contactData: typeof dialingPlanBody) => typeof dialingPlanBody,
  ) {
    // TODO: update schema
    this.get('/restapi/v1.0/account/:accountId/dialing-plan' as any, 200, {
      response: {
        body: handler?.(dialingPlanBody) ?? dialingPlanBody,
      },
    });
  }

  getAccount({
    repeat,
    brandId,
    handler,
  }: {
    repeat?: number;
    brandId?: string;
    handler?: (accountInfo: typeof accountBody) => typeof accountBody;
  } = {}) {
    this.get('/restapi/v1.0/account/:accountId', 200, {
      repeat: repeat ?? 1,
      response: () => {
        accountBody.serviceInfo.brand.id = brandId ?? this.brandId;
        return {
          body: (handler?.(accountBody) ??
            accountBody) as GetAccountInfoResponse,
        };
      },
    });
  }

  getDiscoveryInitial() {
    // TODO: update schema
    this.get('/.well-known/entry-points/initial' as any, 200, {
      repeat: 0,
      response: {
        body: discoveryInitialBody,
      },
    });
  }

  getDiscoveryExternal() {
    // TODO: update schema
    this.get('/.well-known/entry-points/external' as any, 200, {
      repeat: 0,
      response: {
        body: discoveryExternalBody,
      },
    });
  }

  postSubscription(repeat = 1) {
    this.post('/restapi/v1.0/subscription', 200, {
      schema: (schema) => {
        schema.mockData.properties!.status.default = 'Active';
        schema.mockData.properties!.expiresIn.default = 899;
        schema.mockData.properties!.expirationTime.default = new Date(
          new Date().getTime() + 24 * 1000 * 3600 * 30,
        ).toString();
        schema.mockData.properties!.deliveryMode.properties!.encryptionAlgorithm.default =
          'AES';
        schema.mockData.properties!.deliveryMode.properties!.encryption.default =
          true;
        schema.mockData.properties!.deliveryMode.properties!.encryptionKey.default =
          '7mP+gPXHHWjP49kd5cN5cg==';
        schema.mockData.properties!.deliveryMode.properties!.address.default = `channelName_${new Date().getTime()}`;
        schema.mockData.properties!.deliveryMode.properties!.subscriberKey.default = `subscriberKey_${new Date().getTime()}`;
        return schema;
      },
      response: ({ mockData, body }) => {
        mockData.eventFilters = body.eventFilters;
        // TODO: check type issue
        // @ts-ignore
        mockData.deliveryMode.transportType = body.deliveryMode.transportType;
        (this.subscription as PubnubMock).encryptionKey =
          mockData.deliveryMode.encryptionKey;
        return {
          body: mockData,
        };
      },
      repeat,
    });
  }

  deleteSubscription() {
    this.delete('/restapi/v1.0/subscription/:subscriptionId');
  }

  getMessageSync(
    {
      message = '',
      type = 'SMS',
      readStatus = 'Read',
      availability = 'Alive',
      repeat = 1,
      query,
    }: MessageProps = {},
    handler?: (mockData: GetMessageSyncResponse) => GetMessageSyncResponse,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-sync',
      200,
      {
        query,
        schema: (schema) => {
          const { records } = schema.mockData.properties!;
          records.maxItems = 1;
          if (records.type === 'array') {
            records.items.properties!.availability.default = availability;
            records.items.properties!.readStatus.default = readStatus;
            records.items.properties!.type.default = type;
          }
          return schema;
        },
        response: async ({ params, mockData }) => {
          mockData.syncInfo.syncTime = new Date().toISOString();
          mockData.syncInfo.olderRecordsExist = false;
          if (typeof params.syncType === 'undefined') {
            throw new Error(`syncType should be 'FSync' or 'ISync'`);
          }
          mockData.syncInfo.syncType = params.syncType;
          if (message) {
            mockData.records[0].subject = message;
            mockData.records[0].attachments.length = 0;
          }
          for (const record of mockData.records) {
            // when to field length > 1, it is group message
            // 'True' specifies that message is sent exactly to this recipient
            // at least one of to number list should be the target number in group message
            if (record.direction === 'Inbound' && record.to.length > 1) {
              record.to[0].target = true;
            }
          }

          return {
            body: handler?.(mockData) ?? mockData,
          };
        },
        repeat,
      },
    );
  }

  getAdminConfiguration(
    props: MessageProps = { syncType: 'FSync' },
    handler?: (mockData: GetMessageSyncResponse) => GetMessageSyncResponse,
  ) {
    return this.getMessageSync(
      {
        ...props,
        query:
          props.syncType === 'ISync'
            ? {}
            : {
                ...props.query,
                messageType: 'Fax',
              },
      },
      handler,
    );
  }

  getFaxMessageSync(
    props: MessageProps = { syncType: 'FSync' },
    handler?: (mockData: GetMessageSyncResponse) => GetMessageSyncResponse,
  ) {
    return this.getMessageSync(
      {
        ...props,
        query:
          props.syncType === 'ISync'
            ? {}
            : {
                ...props.query,
                messageType: 'Fax',
              },
      },
      handler,
    );
  }

  getVoicemailMessageSync(
    props: MessageProps = { syncType: 'FSync' },
    handler?: (mockData: GetMessageSyncResponse) => GetMessageSyncResponse,
  ) {
    return this.getMessageSync(
      {
        ...props,
        query:
          props.syncType === 'ISync'
            ? {}
            : {
                ...props.query,
                messageType: 'VoiceMail',
              },
      },
      handler,
    );
  }

  getSmsMessageSync(
    props: MessageProps = { syncType: 'FSync' },
    handler?: (mockData: GetMessageSyncResponse) => GetMessageSyncResponse,
  ) {
    return this.getMessageSync(
      {
        ...props,
        query:
          props.syncType === 'ISync'
            ? {}
            : {
                ...props.query,
                messageType: ['SMS', 'Text'],
              },
      },
      handler,
    );
  }

  deleteMessage() {
    this.delete(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store/:messageId',
    );
  }

  deleteConversation() {
    this.delete(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store',
    );
  }

  getActiveCalls(repeat, { length = 0 } = {}) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/active-calls',
      200,
      {
        response: ({ mockData }) => {
          // * set default result always be "In Progress" to prevent not have any call in call history
          mockData.records[0].result = 'In Progress';
          mockData.records.length = length;
          return { body: mockData };
        },
        repeat,
      },
    );
  }

  postOauthToken({
    failure = false,
    repeat = 1,
    failureCode = 400,
  }: PostOauthTokenProps = {}) {
    if (failure) {
      let body;
      switch (failureCode) {
        case 403:
          body = {
            error: 'invalid_client',
            error_description: 'Account access restricted by RealmId',
            errors: [
              {
                errorCode: 'OAU-167',
                message: 'Account access restricted by RealmId',
              },
            ],
          };
          break;
        case 400:
          body = {
            error: 'invalid_grant',
            errors: [
              {
                errorCode: 'OAU-211',
                message: 'Token revoked',
              },
            ],
            error_description: 'Token revoked',
          };
          break;
        case 503:
          body = {
            message: 'Service Unavailable',
            error: 'service_unavailable',
            error_description: 'Service Unavailable',
          };
          break;
        default:
          body = {
            message: 'Wrong token',
            error_description: 'Wrong token',
            description: 'Wrong token',
          };
          break;
      }
      this.post('/restapi/oauth/token', failure ? failureCode : (200 as any), {
        repeat,
        response: {
          body,
        },
      });
      return;
    }
    this.post('/restapi/oauth/token', 200, {
      repeat,
      response: ({ mockData }) => {
        return {
          body: {
            ...mockData,
            access_token: btoa(Math.random().toString()),
            refresh_token: btoa(Math.random().toString()),
            expires_in: 3600,
            refresh_token_expires_in: 60480,
          },
        };
      },
    });
  }

  getCallLogSync(handler?: (mockData: CallLogSync) => CallLogSync, repeat = 1) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/call-log-sync',
      200,
      {
        repeat,
        schema: (schema) => {
          const { records } = schema.mockData.properties!;
          if (records.type === 'array') {
            records.items.properties!.startTime.faker = 'date.recent';
          }
          return schema;
        },
        response: ({ mockData }) => {
          // * set default result always be "Call connected" to prevent not have any call in call history
          mockData.records[0].result = 'Call connected';

          // be default mock, always set that be Voice to make normal open call log can be opened(fax could not be opened)
          mockData.records.forEach((x) => {
            x.type = 'Voice';
          });

          const body = handler?.(mockData) ?? mockData;
          return {
            body,
          };
        },
      },
    );
  }

  getCallLog(
    handler?: (mockData: UserCallLogResponse) => UserCallLogResponse,
    repeat?: number,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/call-log',
      200,
      {
        repeat,
        response: ({ mockData }) => {
          // * set default result always be "In Progress" to prevent not have any call in call history
          mockData.records[0].result = 'In Progress';

          const body = (handler?.(mockData) ?? mockData) as UserCallLogResponse;
          // log('🐞 ~ body:', body);
          return {
            body,
          };
        },
      },
    );
  }

  deleteAllCallLog(status = 200, repeat = 1) {
    this.delete(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/call-log' as any,
      status,
      {
        repeat,
        response: () => {
          return {
            body: {},
          };
        },
      },
    );
  }

  deleteCallLog(status = 200, repeat = 1) {
    this.delete(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/call-log/:id' as any,
      status,
      {
        repeat,
      },
    );
  }

  getMessageStore(
    handler?: (mockData: GetMessageList) => GetMessageList,
    repeat = 1,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store',
      200,
      {
        repeat,
        response: ({ mockData }) => {
          for (const record of mockData.records) {
            // when to field length > 1, it is group message
            // 'True' specifies that message is sent exactly to this recipient
            // at least one of to number list should be the target number in group message
            if (record.direction === 'Inbound' && record.to.length > 1) {
              record.to[0].target = true;
            }
          }
          return {
            body: handler?.(mockData) ?? mockData,
          };
        },
      },
    );
  }

  putMessageStore(
    handler?: (
      mockData: GetMessageInfoResponse,
      request?: MockRequest,
    ) => GetMessageInfoResponse,
    repeat = 1,
  ) {
    this.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store/:messageId',
      200,
      {
        repeat,
        response: ({ mockData, request }) => {
          return {
            body: handler?.(mockData, request) ?? mockData,
          };
        },
      },
    );
  }

  postSipProvision(
    handler?: (mockData: typeof sipProvisionBody) => typeof sipProvisionBody,
    repeat?: number,
    status = 200,
  ) {
    this.post('/restapi/v1.0/client-info/sip-provision', status as any, {
      repeat,
      response: ({ mockData }) => {
        const data = {
          ...sipProvisionBody,
          ...mockData,
        };
        return {
          body: handler?.(data) ?? data,
        };
      },
    });
  }

  getClientInfo(handler?: () => any, repeat = 0) {
    this.get('/restapi/v1.0/client-info' as any, 200, {
      repeat,
      response: {
        body: handler?.() ?? clientInfoResponseBody,
      },
    });
  }

  getTimezone(handler?: () => any, repeat = 0, status = 200) {
    this.get('/restapi/v1.0/dictionary/timezone' as any, status, {
      repeat: repeat ?? 0,
      response: {
        body: handler?.() ?? timezoneResponse,
      },
    });
  }

  getDelegators(handler?: () => RcvDelegator[], repeat?: number) {
    // TODO: update schema
    this.get(
      '/rcvideo/v1/accounts/:accountId/extensions/:extensionId/delegators' as any,
      200,
      {
        repeat: repeat ?? 0,
        response: {
          body: handler?.() ?? [],
        },
      },
    );
  }

  postRcvInvitation(handler?: (mockInvitationBody: string) => string) {
    this.post('/restapi/v1.0/uns/render-document' as any, 200, {
      repeat: 0,
      response: () => ({
        body: `${RCV_INVITATION_START}${
          handler?.(RCV_INVITATION_BODY) ?? RCV_INVITATION_BODY
        }${RCV_INVITATION_END}`,
      }),
    });
  }

  getInvitationBridges(
    handler?: (
      mockData: typeof invitationBridgesResponse,
    ) => typeof invitationBridgesResponse,
  ) {
    this.get('/rcvideo/v1/invitation/bridges/:bridgeId' as any, 200, {
      repeat: 0,
      response: () => ({
        body: handler?.(invitationBridgesResponse) ?? invitationBridgesResponse,
      }),
    });
  }

  getVideoPersonalSettings(
    handler?: (
      mockData: typeof videoPersonalSettingsBody,
    ) => typeof videoPersonalSettingsBody,
  ) {
    // TODO: update schema
    this.get('/rcvideo/v1/bridges' as any, 200, {
      query: {
        default: true,
      },
      repeat: 0,
      response: () => {
        const body =
          handler?.(videoPersonalSettingsBody) ?? videoPersonalSettingsBody;
        return {
          body,
        };
      },
    });
  }

  getDialInNumbers() {
    this.get('/rcvideo/v1/dial-in-numbers' as any, 200, {
      repeat: 0,
      response: {
        body: dialInNumbersBody,
      },
    });
  }

  postParerPhoneNumbers(
    handler?: (
      mockData: typeof parerPhoneNumbersResponse,
      body: {
        originalStrings: string[];
      },
    ) => typeof parerPhoneNumbersResponse,
    repeat?: number,
  ) {
    this.post('/restapi/v1.0/number-parser/parse', 200, {
      repeat,
      response: ({ body, mockData }) => {
        let res;
        if (handler) {
          res = handler(parerPhoneNumbersResponse, body);
        } else {
          const phoneNumbers = body.originalStrings.map((value) => ({
            ...parerPhoneNumbersResponse.phoneNumbers[0],
            originalString: value,
          }));

          res = {
            ...mockData,
            phoneNumbers,
          };
        }

        return {
          body: res,
        };
      },
    });
  }

  postNumberParserV2(
    handler?: (
      mockData: typeof numberParserAPIResponse,
    ) => typeof numberParserAPIResponse,
    repeat = 0,
    status = 200,
  ) {
    this.post('/restapi/v2/number-parser/parse' as any, status, {
      repeat,
      response: ({ body }) => {
        if (handler) {
          return {
            body: handler(numberParserAPIResponse),
          };
        }
        const numberParserResults = body.originalStrings.map(
          (originalString) => ({
            ...numberParserAPIResponse.results[0],
            formats: [
              {
                ...numberParserAPIResponse.results[0].formats[0],
                e164: originalString,
                e164Extended: originalString,
              },
            ],
          }),
        );
        return {
          body: {
            ...numberParserAPIResponse,
            results: numberParserResults,
          },
        };
      },
    });
  }

  postSms(
    handler?: (
      mockData: GetSMSMessageInfoResponse,
    ) => GetSMSMessageInfoResponse,
    repeat = 0,
    status: 200 | 401 = 200,
  ) {
    this.post(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/sms',
      status as any,
      {
        repeat,
        response: ({ mockData }) => {
          const defaultSender =
            global.app?.modules?.MessageSender?.senderNumbersList?.[0];

          const defaultData = {
            ...smsResponse,
            from: defaultSender
              ? {
                  phoneNumber: defaultSender.phoneNumber,
                  name: defaultSender.label,
                  location: defaultSender.location,
                }
              : smsResponse.from,
          };
          return {
            body: {
              ...mockData,
              ...(handler?.(defaultData as any) ?? defaultData),
            } as GetSMSMessageInfoResponse,
          };
        },
      },
    );
  }

  postMms(
    handler?: (
      mockData: GetMMSMessageInfoResponse,
    ) => GetMMSMessageInfoResponse,
    repeat = 0,
    status: 200 | 401 = 200,
  ) {
    this.post(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/mms',
      status as any,
      {
        repeat,
        response: ({ mockData }) => {
          const defaultSender =
            global.app?.modules?.MessageSender?.senderNumbersList?.[0];

          const defaultData = {
            ...mmsResponse,
            from: defaultSender
              ? {
                  phoneNumber: defaultSender.phoneNumber,
                  name: defaultSender.label,
                  location: defaultSender.location,
                }
              : mmsResponse.from,
          };
          return {
            body: {
              ...mockData,
              ...(handler?.(defaultData as any) ?? defaultData),
            } as GetMMSMessageInfoResponse,
          };
        },
      },
    );
  }

  postFax(
    handler?: (mockData: FaxResponse) => FaxResponse,
    repeat = 0,
    status: 200 | 500 = 200,
  ) {
    this.post(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/fax',
      status as any,
      {
        repeat,
        response: ({ mockData }) => {
          return {
            body: {
              ...mockData,
              ...(handler?.(faxResponse as any) ?? faxResponse),
            } as FaxResponse,
          };
        },
      },
    );
  }

  postCompanyPager(
    handler: (
      mockData:
        | typeof companyPagerResponse
        | typeof companyPagerInvalidResponse,
    ) => typeof companyPagerResponse | typeof companyPagerInvalidResponse,
    repeat = 1,
    requestInvalid = false,
    responseCode = 200,
  ) {
    const responseBody = requestInvalid
      ? companyPagerInvalidResponse
      : companyPagerResponse;

    this.post(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/company-pager' as any,
      responseCode,
      {
        repeat,
        response: {
          body: handler?.(responseBody) ?? responseBody,
        },
      },
    );
  }

  postBridges(
    repeat = 0,
    handler?: (
      mockData: typeof postRcvBridgesBody,
    ) => typeof postRcvBridgesBody,
  ) {
    this.post('/rcvideo/v1/bridges' as any, 200, {
      repeat,
      response: ({ body }) => {
        const responseData = {
          ...postRcvBridgesBody,
          ...body,
        };
        return {
          body: handler?.(responseData) ?? responseData,
        };
      },
    });
  }

  getPreferences(
    handler?: (
      mockData: typeof videoPreferenceBody,
    ) => typeof videoPreferenceBody,
    status = 200,
  ) {
    this.get(
      '/rcvideo/v1/account/:accountId/extension/:extensionId/preferences' as any,
      status,
      {
        repeat: 0,
        response: {
          body: handler?.(videoPreferenceBody) ?? videoPreferenceBody,
        },
      },
    );
  }

  patchPreferences(status = 200, repeat = 0) {
    this.patch(
      '/rcvideo/v1/account/:accountId/extension/:extensionId/preferences/:preferenceId' as any,
      status,
      {
        repeat,
      },
    );
  }

  getMeetingsConfigurationAssisted(handler?: () => AssistedUsersResource) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/meetings-configuration/assisted',
      200,
      {
        response: ({ mockData }) => {
          return {
            body: (handler?.() ?? mockData) as AssistedUsersResource,
          };
        },
      },
    );
  }

  getMeetingServiceInfo() {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/service-info',
      200,
      {
        repeat: 0,
        schema: (schema) => {
          (
            schema.mockData.properties!.dialInNumbers as ArraySchemaObject
          ).items.properties!.country.properties!.isoCode.default = 'US';
          return schema;
        },
      },
    );
  }

  getRcvMeetingInfo(
    shortId?: string,
    handler?: (
      mockData: typeof rcvMeetingSettingsBody,
    ) => typeof rcvMeetingSettingsBody,
    repeat?: number,
  ) {
    const personalMeetingId = shortId ?? videoPersonalSettingsBody.shortId;
    this.get('/rcvideo/v1/bridges' as any, 200, {
      query: {
        shortId: personalMeetingId,
      },
      repeat: repeat ?? 0,
      response: () => {
        const body =
          handler?.(rcvMeetingSettingsBody) ?? rcvMeetingSettingsBody;
        body.shortId = personalMeetingId;
        return {
          body: handler?.(rcvMeetingSettingsBody) ?? rcvMeetingSettingsBody,
        };
      },
    });
  }

  getMeetingUserSettings(
    handler?: (
      mockData: MeetingUserSettingsResponse,
    ) => MeetingUserSettingsResponse,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/user-settings',
      200,
      {
        response: ({ mockData }) => {
          const audioOptions = [
            ['Phone'],
            ['ComputerAudio'],
            ['Phone', 'ComputerAudio'],
            ['ThirdParty'],
          ][
            Math.floor(Math.random() * 4)
          ] as MeetingResponseResource['audioOptions'];
          mockData.scheduleMeeting.audioOptions = audioOptions;
          const body = handler?.(mockData) ?? mockData;
          return {
            body,
          };
        },
      },
    );
  }

  getMeetingLockedSettings(
    handler?: (
      mockData: AccountLockedSettingResponse,
    ) => AccountLockedSettingResponse,
  ) {
    this.get('/restapi/v1.0/account/:accountId/meeting/locked-settings', 200, {
      repeat: 0,
      schema: (schema) => {
        schema.mockData.properties!.scheduleMeeting.properties!.audioOptions.type =
          'boolean';
        return schema;
      },
      response: ({ mockData }) => {
        const body = handler?.(mockData) ?? mockData;
        return {
          body,
        };
      },
    });
  }

  postMeeting(
    handler?: (mockData: MeetingResponseResource) => MeetingResponseResource,
  ) {
    this.post(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting',
      201,
      {
        repeat: 0,
        response: ({ body }) => {
          const responseData = {
            ...postMeetingBody,
            ...body,
          } as MeetingResponseResource;
          return {
            body: handler?.(responseData) ?? responseData,
          };
        },
      },
    );
  }

  getMeeting(
    handler?: (mockData: MeetingResponseResource) => MeetingResponseResource,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/:meetingId',
      200,
      {
        repeat: 0,
        schema: (schema) => {
          // meeting is login user's meeting by default
          schema.mockData.properties!.host.properties!.id.default = `${extensionInfoBody.id}`;
          schema.mockData.properties!.password.type = 'integer';
          schema.mockData.properties!.schedule.properties!.startTime.default =
            new Date().getTime();
          schema.mockData.properties!.schedule.properties!.durationInMinutes.type =
            'integer';
          return schema;
        },
        response: ({ mockData, params: { meetingId } }) => {
          const audioOptions = [
            ['Phone'],
            ['ComputerAudio'],
            ['Phone', 'ComputerAudio'],
            ['ThirdParty'],
          ][
            Math.floor(Math.random() * 4)
          ] as MeetingResponseResource['audioOptions'];
          mockData.audioOptions = audioOptions;
          const defaultBody = {
            ...mockData,
            id: meetingId,
          };
          return {
            body: handler?.(mockData) ?? defaultBody,
          };
        },
      },
    );
  }

  putMeeting() {
    this.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/:meetingId',
    );
  }

  deleteMeeting() {
    this.delete(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/:meetingId',
    );
  }

  getInvitation(
    handler?: (
      mockData: PublicMeetingInvitationResponse,
    ) => PublicMeetingInvitationResponse,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/:meetingId/invitation',
      200,
      {
        repeat: 0,
        response: ({ mockData }) => {
          return {
            body: handler?.(mockData) ?? meetingInvitation,
          };
        },
      },
    );
  }

  getVideoConfiguration(
    handler?: (mockData: UserVideoConfiguration) => UserVideoConfiguration,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/video-configuration',
      200,
      {
        repeat: 0,
        schema: (schema) => {
          schema.mockData.properties!.provider.default = 'RCVideo';
          schema.mockData.properties!.userLicenseType.default = 'Free';
          return schema;
        },
        response: ({ mockData }) => {
          const body = handler?.(mockData) ?? mockData;
          return {
            body,
          };
        },
      },
    );
  }

  getInteropGenerateCode() {
    this.post('/restapi/v1.0/interop/generate-code' as any, 200, {
      response: {
        body: generateCodeBody,
      },
      repeat: 0,
    });
  }

  postWsToken() {
    this.post('/restapi/oauth/wstoken' as any, 200, {
      response: {
        body: {
          ...wsTokenBody,
          uri: (this.subscription as WebSocketMock).url,
        },
      },
      repeat: 0,
    });
  }

  async receiveMessage(
    messageData: MessageProps,
    handler?: (mockData: GetMessageSyncResponse) => GetMessageSyncResponse,
  ) {
    this.getMessageSync(messageData, handler);
    const event = {
      ...(this.generateEvent('MessageEvent') as object),
      event: '/restapi/v1.0/account/~/extension/~/message-store',
      timestamp: new Date().toISOString(),
    };
    await this.subscription.trigger(event);
  }

  getTelephonyState({
    hasActiveCall = false,
    handler,
    repeat,
  }: {
    handler?: (telephonyState: any) => any;
    hasActiveCall?: boolean;
    repeat?: number;
  } = {}) {
    this.get(
      `/restapi/v1.0/account/:accountId/extension/:extensionId/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls` as any,
      200,
      {
        response: ({ mockData }) => {
          const state = generateTelephonyState({
            hasActiveCall,
            eventData: handler?.(mockData) ?? mockData,
          });
          return { body: state };
        },
        repeat: repeat ?? 1,
      },
    );
  }

  getTelephonySession(
    handler?: (res: CallSessionObject) => CallSessionObject,
    repeat?: number,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId',
      200,
      {
        response: {
          body: (handler?.(telephonySessionResponse as any) ??
            telephonySessionResponse) as CallSessionObject,
        },
        repeat,
      },
    );
  }

  postConferenceCall(
    handler?: (res: CreateConferenceResponse) => CreateConferenceResponse,
    repeat?: number,
  ) {
    this.post('/restapi/v1.0/account/:accountId/telephony/conference', 201, {
      repeat,
      response: () => {
        const conferenceCallRes: CreateConferenceResponse = {
          ...conferenceCallResponse,
          session: {
            ...conferenceCallResponse.session,
            creationTime: new Date().getTime().toString(),
          } as any,
        };
        return {
          body: handler?.(conferenceCallRes) ?? conferenceCallRes,
        } as any;
      },
    });
  }

  bringInToConference(
    handler?: (res: CallParty) => CallParty,
    repeat?: number,
    status: HttpStatusCode = 201,
  ) {
    this.post(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/bring-in',
      status as any,
      {
        response: {
          body:
            handler?.(bringInToConferenceResponse as any) ??
            (bringInToConferenceResponse as any),
        },
        repeat,
      },
    );
  }

  removePartyFromConference(repeat?: number, status: HttpStatusCode = 201) {
    this.delete(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId' as any,
      status,
      {
        response: async ({ params }) => {
          // currently only latest spring-ui project support correct mock of participant leaving
          if (process.env.THEME_SYSTEM === 'spring-ui') {
            const conferenceTelephonySessionId = params.telephonySessionId;

            const telephonySessionInstance = telephonySessionBuildersCache.find(
              (i) => i.getPeerId()?.partyId === params.partyId,
            );

            if (telephonySessionInstance) {
              const telephonySessionId =
                telephonySessionInstance.getTelephonySessionId();
              await this.hangUp(telephonySessionId);

              // remove the session
              telephonySessionBuildersCache.splice(
                telephonySessionBuildersCache.indexOf(telephonySessionInstance),
                1,
              );
            }

            const conferenceParticipants = telephonySessionBuildersCache.filter(
              (i) =>
                i.getStatus() !== PartyStatusCode.disconnected &&
                i.getPeerId()?.telephonySessionId ===
                  conferenceTelephonySessionId,
            );

            if (conferenceParticipants.length === 1) {
              // simulate the production will got after several render, so we need to wait for several render and not await
              Promise.resolve().then(async () => {
                const [hostTelephonySessionBuilder] = conferenceParticipants;
                hostTelephonySessionBuilder.setConnected();
                const event2 = hostTelephonySessionBuilder.done();
                await this.subscription.trigger(event2);

                hostTelephonySessionBuilder.setDisconnected();
                const event3 = hostTelephonySessionBuilder.done();
                hostTelephonySessionBuilder.relatedWebphoneSession.terminate();
                await this.subscription.trigger(event3);
              });
            }
          }
          return {
            body: {},
          };
        },
        repeat,
      },
    );
  }

  async triggerPresenceChanged(
    handler?: (eventData: GetPresenceInfo) => GetPresenceInfo,
  ) {
    const eventBody = {
      allowSeeMyPresence: true,
      dndStatus: 'TakeAllCalls',
      extensionId: 383295004,
      meetingStatus: 'Disconnected',
      pickUpCallsOnHold: false,
      presenceStatus: 'Available',
      ringOnMonitoredCall: false,
      sequence: 51,
      telephonyStatus: 'NoCall',
      userStatus: 'Available',
    } as any as GetPresenceInfo;

    const event = {
      event:
        '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
      timestamp: new Date().toISOString(),
      body: handler?.(eventBody) ?? eventBody,
    };
    await this.subscription.trigger(event);
  }

  async triggerActiveCallChanged({
    handler,
    sessions,
  }: {
    sessions?: NormalizedSession[];
    handler?: (
      eventData: EventData<GetPresenceInfo>,
    ) => EventData<GetPresenceInfo>;
  }) {
    const activeCalls = sessions
      ? this.generateActiveCalls(sessions, [], sessions.map((i) => i.id) as any)
      : [];
    const event: EventData<GetPresenceInfo> = {
      event:
        '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
      timestamp: new Date().toISOString(),
      body: {
        activeCalls,
        allowSeeMyPresence: true,
        dndStatus: 'TakeAllCalls',
        // @ts-ignore
        extensionId: 160751006,
        meetingsStatus: 'Disconnected',
        pickUpCallsOnHold: false,
        presenceStatus: 'Busy',
        ringOnMonitoredCall: false,
        sequence: 368997,
        telephonyStatus: 'Ringing',
        totalActiveCalls: activeCalls.length,
        userStatus: 'Available',
        // TODO: fix type for miss `uri, extension, message, meetingStatus`
      },
    };
    await this.subscription.trigger(handler?.(event) ?? event);
  }

  async receiveCall({
    direction = 'Inbound',
    phoneNumber,
    handler,
  }: {
    direction?: 'Inbound' | 'Outbound';
    phoneNumber?: string;
    handler?: (
      eventData: DetailedExtensionPresenceWithSIPEvent,
    ) => DetailedExtensionPresenceWithSIPEvent;
  }) {
    const eventData = this.generateEvent(
      'DetailedExtensionPresenceWithSIPEvent',
    ) as any;
    const event = generateTelephonyState({
      hasActiveCall: true,
      direction,
      phoneNumber,
      eventData: handler?.(eventData) ?? eventData,
    });
    await this.subscription.trigger(event);
  }

  async makeCall({
    phoneNumber,
    isWebRTC = true,
    useUserAgentSession = false,
    direction = callDirection.outbound,
    telephonySessionId = makeTelephonySessionId(),
    sessionId = makeWebphoneSessionId(),
    fromNumberData,
    toNumberData,
    startTime,
    mockUserAgentSessionPartyData = false,
    triggerWebphoneOnCallInit = false,
    callQueueName,
    fromUserName,
    toUserName,
    ...props
  }: MakeCallProps) {
    // TODO: refactor
    const telephonySessionBuilder = createTelephonySession({
      phoneNumber,
      telephonySessionId,
      direction,
      sessionId,
      status: PartyStatusCode.proceeding,
      fromNumberData,
      toNumberData,
      startTime,
      ...props,
    });

    const event = telephonySessionBuilder.done();
    await this.subscription.trigger(event);
    if (isWebRTC) {
      const webSession = new WebphoneSessionMock(
        telephonySessionBuilder.getTelephonySessionId(),
        telephonySessionBuilder.getPartyId(),
        telephonySessionBuilder.getSessionId(),
        callQueueName,
        fromUserName,
        toUserName,
        this,
      );
      const callEvent = 'invite';
      const webphone = webSession.webphone!;
      telephonySessionBuilder.setRelatedWebphoneSession(webSession);

      if (useUserAgentSession && direction === callDirection.inbound) {
        const session = webphone.userAgent.invite(
          phoneNumber || '',
          {
            fromNumber: fromNumberData?.phoneNumber,
          },
          // this mock is to make sure _findWebphoneSession get correct data
          mockUserAgentSessionPartyData
            ? {
                partyId: telephonySessionBuilder.getPartyId(),
                sessionId: telephonySessionBuilder.getTelephonySessionId(),
              }
            : undefined,
        );
        if (triggerWebphoneOnCallInit) {
          await global.app.modules.Webphone._onCallInit(session);
        }
      }
      // webphone.userAgent.sessions is an object, so latest call will not be the first one when multiple calls
      const sessionId =
        Object.keys(webphone.userAgent.sessions).find((id) =>
          id.includes(phoneNumber || ''),
        ) || Object.keys(webphone.userAgent.sessions)[0];
      const session = useUserAgentSession
        ? webphone.userAgent.sessions[sessionId]
        : webSession;
      webphone.userAgent.trigger(callEvent, session);

      this.removeWebphone = () => webSession.remove();
    }

    return telephonySessionBuilder.getTelephonySessionId();
  }

  async connectLatestCall() {
    const [telephonySessionBuilder] = telephonySessionBuildersCache.slice(-1);
    telephonySessionBuilder.setConnected();
    const event = telephonySessionBuilder.done();
    await this.subscription.trigger(event);
  }

  async disConnectLatestCall() {
    const [telephonySessionInstance] = telephonySessionBuildersCache.slice(-1);
    telephonySessionInstance?.setDisconnected();
    const event = telephonySessionInstance?.done();
    telephonySessionInstance?.relatedWebphoneSession?.terminate();
    await this.subscription.trigger(event);
  }

  async hangUp(telephonySessionId: string) {
    const telephonySessionInstance = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );

    if (telephonySessionInstance) {
      telephonySessionInstance.setDisconnected();
      const event = telephonySessionInstance.done();
      telephonySessionInstance.setGone();
      telephonySessionInstance.relatedWebphoneSession?.terminate();
      await this.subscription.trigger(event);
    }
  }

  async reject(telephonySessionId: string) {
    const telephonySessionInstance = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );
    if (telephonySessionInstance) {
      telephonySessionInstance.setDisconnected();
      const event = telephonySessionInstance.done();
      await this.subscription.trigger(event);
    }
  }

  async goneCall(telephonySessionId: string, shouldSetGone = true) {
    const telephonySessionInstance = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );

    if (telephonySessionInstance) {
      if (shouldSetGone) {
        telephonySessionInstance?.setGone();
      }
      const event = telephonySessionInstance.done();
      telephonySessionInstance.relatedWebphoneSession?.terminate();
      await this.subscription.trigger(event);
    }
  }

  async answer(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );

    if (telephonySessionBuilder) {
      await this.holdOtherCalls(telephonySessionId);
      telephonySessionBuilder.setConnected();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async holdOtherCalls(currentTelephonySessionId: string) {
    for (const builder of telephonySessionBuildersCache) {
      const isAllowedHold = this.skipHoldRingCalls
        ? builder.getStatus() !== PartyStatusCode.gone &&
          builder.getStatus() !== PartyStatusCode.proceeding
        : builder.getStatus() !== PartyStatusCode.gone;
      if (
        builder.getTelephonySessionId() !== currentTelephonySessionId &&
        isAllowedHold
      ) {
        builder.setHoldCall();
        const event = builder.done();
        await this.subscription.trigger(event);
      }
    }
  }

  async unholdCall(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );
    if (telephonySessionBuilder) {
      this.holdOtherCalls(telephonySessionId);
      telephonySessionBuilder.setConnected();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async holdCall(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );
    if (telephonySessionBuilder) {
      telephonySessionBuilder.setHoldCall();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async muteCall(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );
    if (telephonySessionBuilder) {
      telephonySessionBuilder.setMuteCall();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async unmuteCall(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );
    if (telephonySessionBuilder) {
      telephonySessionBuilder.setUnmuteCall();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async startRecord(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );
    if (telephonySessionBuilder) {
      telephonySessionBuilder.startRecord();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async stopRecord(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );
    if (telephonySessionBuilder) {
      telephonySessionBuilder.stopRecord();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  mockCallPresence(sessions: NormalizedSession[]) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/presence',
      200,
      {
        response: () => {
          const activeCalls = this.generateActiveCalls(sessions);
          return {
            body: {
              activeCalls,
              allowSeeMyPresence: true,
              dndStatus: 'TakeAllCalls',
              extensionId: 160751006,
              meetingsStatus: 'Disconnected',
              pickUpCallsOnHold: false,
              presenceStatus: 'Busy',
              ringOnMonitoredCall: false,
              sequence: 368997,
              telephonyStatus: 'OnHold',
              totalActiveCalls: activeCalls.length,
              userStatus: 'Available',
              // TODO: fix type for miss `uri, extension, message, meetingStatus`
            } as any as GetPresenceInfo,
          };
        },
      },
    );
  }

  completeWarmTransfer(status: 200 | 409 | 503 = 200, repeat = 0) {
    let body = {};
    switch (status) {
      case 200:
        // body =
        break;
      case 409:
        body = {
          errorCode: 'TAS-102',
          message: 'Incorrect State',
        };
        break;
      case 503:
        body = {
          errorCode: 'CMN-201',
          message: 'Service Temporary Unavailable',
        };
        break;
      default:
        break;
    }
    this.post(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/bridge',
      status,
      {
        response: {
          body,
        },
        repeat,
      },
    );
  }

  coldTransfer(status: 200 | 409 = 200, repeat = 0) {
    let body = {};
    switch (status) {
      case 200:
        // body =
        break;
      case 409:
        body = {
          errorCode: 'TAS-102',
          message: 'Incorrect State',
        };
        break;

      default:
        break;
    }
    this.post(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/transfer',
      status,
      {
        response: {
          body,
        },
        repeat,
      },
    );
  }

  presenceUpdate(
    handler?: (
      presenceBodyData: typeof presenceBody,
      request?: MockRequest,
    ) => typeof presenceBody,
    repeat?: number,
    status: 200 | 503 = 200,
  ) {
    this.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/presence',
      status,
      {
        repeat,
        response: ({ request }) => {
          return {
            body: (handler?.(presenceBody, request) ??
              presenceBody) as PresenceInfoResponse,
          };
        },
      },
    );
  }

  getCallQueue(
    handler?: (
      callQueueBody: ExtensionCallQueuePresenceList,
    ) => ExtensionCallQueuePresenceList,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/call-queue-presence',
      200,
      {
        response: ({ mockData }) => ({
          body: (handler?.(mockData) ??
            mockData) as ExtensionCallQueuePresenceList,
        }),
      },
    );
  }

  updateCallQueue(
    handler?: (
      callQueueBody: ExtensionCallQueuePresenceList,
    ) => ExtensionCallQueuePresenceList,
  ) {
    this.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/call-queue-presence',
      200,
      {
        response: ({ mockData }) => ({
          body: (handler?.(mockData) ??
            mockData) as ExtensionCallQueuePresenceList,
        }),
      },
    );
  }

  stopRecording(status: HttpStatusCode = 200) {
    let body = {};
    switch (status) {
      case 200:
        body = {
          active: false,
          id: extensionInfoBody.id,
        };
        break;
      case 403:
        body = {
          errorCode: 'TAS-115',
          message: 'ACR mute is not supported for this call',
        };
        break;

      default:
        break;
    }
    this.patch(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/recordings/:recordingId',
      status as any,
      {
        response: {
          body,
        },
        repeat: 0,
      },
    );
  }

  startRecording(status: HttpStatusCode = 200, errorCode?: string) {
    let body = {};
    switch (status) {
      case 200:
        body = {
          active: true,
          id: extensionInfoBody.id,
        };
        break;
      case 403:
        body = {
          errors: [
            {
              errorCode: errorCode || 'TAS-101',
              message: 'Incorrect State [WrongState]',
            },
          ],
        };
        break;

      default:
        break;
    }
    this.patch(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/recordings/:recordingId',
      status as any,
      {
        response: {
          body,
        },
        repeat: 0,
      },
    );
  }

  generateActiveCalls(
    webphoneSessions,
    mockOtherDevice = [],
    ringSessionIds = [],
  ) {
    // TODO: mock with faker and fix type
    const commons = {
      sipData: {
        toTag: 'pgrneavq66',
        fromTag: '10.74.2.218-5070-2a0553bd67c3401',
        remoteUri: 'sip:104@ringcentral.com',
        localUri: 'sip:105@ringcentral.com',
      },
      startTime: '2018-08-07T09:20:09.405Z',
    };
    return webphoneSessions.reduce((calls, session) => {
      const telephonyStatus = includes(session.id, ringSessionIds)
        ? telephonyStatuses.ringing
        : telephonyStatuses.onHold;
      if (isConferenceSession(session)) {
        return calls.concat({
          ...commons,
          id: session.callId,
          sessionId: session.id,
          direction: session.direction,
          telephonyStatus,
          fromName: 'FirstName 104 LastName',
          from: '104',
          toName: 'Conference',
          to: { phoneNumber: '' },
        });
      }
      if (session.direction === 'Inbound') {
        return calls.concat({
          ...commons,
          id: session.callId,
          sessionId: session.id,
          direction: session.direction,
          telephonyStatus,
          fromName: 'FirstName 104 LastName',
          from: '104',
          toName: 'FirstName 105 LastName',
          to: '105',
        });
      }
      if (session.direction === 'Outbound') {
        return calls.concat({
          ...commons,
          id: `call-${session.id}`,
          sessionId: session.id,
          direction: session.direction,
          telephonyStatus,
          fromName: 'FirstName 105 LastName',
          from: session.fromNumber,
          toName: 'Something1 New1',
          to: session.to,
        });
      }
      return calls;
    }, mockOtherDevice);
  }

  mute(status: HttpStatusCode = 200, repeat = 0) {
    this.patch(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId',
      status as any,
      {
        response: {
          body: {
            muted: true,
          },
        },
        repeat,
      },
    );
  }

  unmute(status: HttpStatusCode = 200, repeat = 0) {
    this.patch(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId',
      status as any,
      {
        response: {
          body: {
            muted: false,
          },
        },
        repeat,
      },
    );
  }
  getProfileImage() {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/profile-image/:scaleSize',
      200,
      {
        repeat: 0,
        body: new Blob(),
      },
    );
  }

  getConnectedCalendars(mockData: any = [], status = 200, repeat = 1) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/cloud-integrations/:providerId' as any,
      status,
      {
        repeat,
        response: () => ({
          body: mockData,
        }),
      },
    );
  }

  getAvailableCalendars(mockData: any = {}, status = 200, repeat = 1) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/cloud-calendars/:profileId/:provider/:subscriptionId' as any,
      status,
      {
        repeat,
        response: () => ({
          body: mockData,
        }),
      },
    );
  }

  replyWithMessage(status: 200 | 503 = 200) {
    let body = {};
    switch (status) {
      case 200:
        // body =
        break;
      case 503:
        body = {
          errorCode: 'CMN-201',
          message: 'Service Temporary Unavailable',
        };
        break;
      default:
        break;
    }
    this.post(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/reply',
      status,
      {
        response: {
          body,
        },
        repeat: 0,
      },
    );
  }

  partySupervise(
    supervise: 'hold' | 'unhold',
    status: HttpStatusCode = 200,
    handler?: (
      params: { partyId: string; telephonySessionId: string },
      partyInfo: PartySuperviseResponse,
    ) => PartySuperviseResponse,
    repeat = 0,
  ) {
    let callStatus: Partial<CallStatusInfo>;
    if (supervise === 'hold') {
      callStatus = {
        code: 'Hold',
      };
    } else if (supervise === 'unhold') {
      callStatus = {
        code: 'Answered',
      };
    } else {
      throw new Error(`Unsupported supervise ${supervise}`);
    }
    this.post(
      `/restapi/v1.0/account/~/telephony/sessions/:telephonySessionId/parties/:partyId/${supervise}` as any,
      status,
      {
        repeat,
        response: ({ params }) => {
          const body: PartySuperviseResponse = {
            ...partySuperviseResponse,
            id: params.partyId,
            status: callStatus,
          } as any;
          return {
            body: handler?.(params, body) ?? body,
          };
        },
      },
    );
  }

  holdParty(
    status: HttpStatusCode = 200,
    handler?: (
      params: { partyId: string; telephonySessionId: string },
      partyInfo: PartySuperviseResponse,
    ) => PartySuperviseResponse,
    repeat = 0,
  ) {
    this.partySupervise('hold', status, handler, repeat);
  }

  unholdParty(
    status: HttpStatusCode = 200,
    handler?: (
      params: { partyId: string; telephonySessionId: string },
      partyInfo: PartySuperviseResponse,
    ) => PartySuperviseResponse,
    repeat = 0,
  ) {
    this.partySupervise('unhold', status, handler, repeat);
  }

  getCallRecordingData(
    handler?: (
      recordingData: GetCallRecordingResponse,
    ) => GetCallRecordingResponse,
  ) {
    this.get('/restapi/v1.0/account/:accountId/recording/:recordingId', 200, {
      response: ({ mockData }) => ({
        body: (handler?.(mockData) ?? mockData) as GetCallRecordingResponse,
      }),
    });
  }

  getVideoPersonalSettingsV2(
    handler?: (
      mockData: typeof videoPersonalSettingsBodyV2,
    ) => typeof videoPersonalSettingsBodyV2,
    status = 200,
    repeat = 0,
  ) {
    this.get(
      '/rcvideo/v2/account/:accountId/extension/:extensionId/bridges/default' as any,
      status,
      {
        repeat,
        response: () => {
          const body =
            handler?.(videoPersonalSettingsBodyV2) ??
            videoPersonalSettingsBodyV2;
          return {
            body,
          };
        },
      },
    );
  }

  getRcvMeetingInfoV2(
    shortId: string,
    handler?: (
      mockData: typeof rcvMeetingSettingsV2Body,
    ) => typeof rcvMeetingSettingsV2Body,
    repeat?: number,
  ) {
    this.get('/rcvideo/v2/bridges/pin/web/:shortId' as any, 200, {
      repeat: repeat ?? 0,
      response: () => {
        const mockData = {
          ...rcvMeetingSettingsV2Body,
          pins: {
            pstn: {
              host: '330601514',
              participant: shortId,
            },
            web: shortId,
          },
        };
        return {
          body: handler?.(mockData) ?? mockData,
        };
      },
    });
  }

  postBridgesV2(
    repeat = 0,
    handler?: (
      mockData: typeof rcvMeetingSettingsV2Body,
    ) => typeof rcvMeetingSettingsV2Body,
  ) {
    this.post(
      '/rcvideo/v2/account/:accountId/extension/:extensionId/bridges' as any,
      200,
      {
        repeat,
        response: ({ body, params }) => {
          const { security, ...rest } = body;
          const responseData = {
            ...rcvMeetingSettingsV2Body,
            ...rest,
            security: {
              passwordProtected: security.passwordProtected,
              password: {
                plainText: security.password,
                pstn: '7739742613',
                joinQuery: '952f84acc6f4cc9886cb4338eb17e308',
              },
              noGuests: body.noGuests,
              sameAccount: body.sameAccount,
              e2ee: body.e2ee,
            },
            host: {
              accountId: `${params.accountId}`,
              extensionId: `${params.extensionId}`,
            },
          };
          return {
            body: handler?.(responseData) ?? responseData,
          };
        },
      },
    );
  }

  initMessageStoreTemplates() {
    this._messageStoreTemplates = [];
  }

  updateMessageStoreTemplates(data) {
    this._messageStoreTemplates = data;
  }

  getMessageStoreTemplates(handler?: (mockData: any) => any, repeat = 0) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store-templates' as any,
      200,
      {
        repeat,
        response: () => {
          const data = {
            records: this._messageStoreTemplates,
          };
          return {
            body: handler?.(data) ?? data,
          };
        },
      },
    );
  }

  postMessageStoreTemplates(
    handler?: (mockData: any) => any,
    repeat = 0,
    status: 200 | 400 = 200,
    responseBody?: any,
  ) {
    this.post(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store-templates' as any,
      status as any,
      {
        repeat,
        response: ({ body }) => {
          const requestBody = body as any;
          if (status !== 200) {
            return {
              body: responseBody ?? { message: 'Invalid request' },
            };
          }
          const newTemplate = {
            id: String(Math.round(Math.random() * 10 ** 10)),
            displayName: requestBody?.displayName,
            body: requestBody?.body,
            scope: 'Personal',
          };
          this._messageStoreTemplates.push(newTemplate);
          return {
            body: handler?.(newTemplate) ?? newTemplate,
          };
        },
      },
    );
  }

  putMessageStoreTemplates(
    handler?: (mockData: any) => any,
    repeat = 0,
    status: 200 | 400 = 200,
  ) {
    this.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store-templates/:id' as any,
      status as any,
      {
        repeat,
        response: ({ body, params }) => {
          if (status !== 200) {
            return {
              body: { message: 'Invalid request' },
            };
          }
          const requestBody = body as any;
          const { id } = params as { id: string };
          const template = this._messageStoreTemplates.find(
            (t) => t.id === String(id),
          );
          if (!template) {
            throw new Error(`template id ${id} not found.`);
          }
          Object.assign(template, {
            displayName: requestBody.displayName,
            body: requestBody.body,
            id: template.id,
            scope: template.scope,
          });
          return {
            body: handler?.(template) ?? template,
          };
        },
      },
    );
  }

  deleteMessageStoreTemplates(repeat = 0, status: 200 | 400 = 200) {
    this.delete(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store-templates/:id' as any,
      status as any,
      {
        repeat,
        response: ({ params }) => {
          if (status !== 200) {
            return {
              body: { message: 'Invalid request' },
            };
          }
          const { id } = params as { id: string };
          const templateIndex = this._messageStoreTemplates.findIndex(
            (t) => t.id === String(id),
          );
          if (templateIndex > -1) {
            this._messageStoreTemplates.splice(templateIndex, 1);
          }
          return {
            body: {},
          };
        },
      },
    );
  }

  get telephonySessionBuildersCache() {
    return telephonySessionBuildersCache;
  }

  processors = {
    '/restapi/v1.0/account/~/message-threads/sync': (
      data: ResponseData<any, any, any>,
    ) => data,
    '/restapi/v1.0/account/~/call-queues/:queueId/sms-recipients': (
      data: ResponseData<any, any, any>,
    ) => data,
    '/restapi/v1.0/account/~/message-threads/entries/sync': (
      data: ResponseData<any, any, any>,
    ) => data,
    '/restapi/v1.0/account/~/message-threads/messages': (
      data: ResponseData<any, any, any>,
    ) => data,
    '/restapi/v1.0/account/~/message-threads/:threadId/assign': (
      data: ResponseData<any, any, any>,
    ) => data,
    '/restapi/v1.0/account/~/message-threads/:threadId/resolve': (
      data: ResponseData<any, any, any>,
    ) => data,
    '/restapi/v1.0/account/~/message-threads': (
      data: ResponseData<any, any, any>,
    ) => data,
    '/restapi/v1.0/account/~/message-threads/:threadId': (
      data: ResponseData<any, any, any>,
    ) => data,
  };

  /**
   * Mock POST /restapi/v1.0/account/~/message-threads/:threadId/assign
   * Assign or unassign a message thread
   */
  postMessageThreadAssign() {
    this.post(
      '/restapi/v1.0/account/~/message-threads/:threadId/assign' as any,
      200,
      {
        repeat: 0,
        response: (res) => {
          const { params, body } = res;
          const threadId = (params as any).threadId;
          const requestBody = body as any;
          const mockData = {
            id: threadId,
            assignee: requestBody.assignee
              ? {
                  extensionId: requestBody.assignee.extensionId,
                  name: 'User',
                  extensionType: 'User',
                }
              : null,
            status: 'Open',
            lastModifiedTime: new Date().toISOString(),
          };
          res.mockData = mockData;
          const processedData =
            this.processors[
              '/restapi/v1.0/account/~/message-threads/:threadId/assign'
            ](res);
          return {
            body: processedData.mockData,
          };
        },
      },
    );
  }

  /**
   * Mock POST /restapi/v1.0/account/~/message-threads/:threadId/resolve
   * Resolve a message thread
   */
  postMessageThreadResolve() {
    this.post(
      '/restapi/v1.0/account/~/message-threads/:threadId/resolve' as any,
      200,
      {
        repeat: 0,
        response: (res) => {
          const { params } = res;
          const threadId = (params as any).threadId;
          const mockData = {
            id: threadId,
            status: 'Resolved',
            lastModifiedTime: new Date().toISOString(),
          };
          res.mockData = mockData;
          const processedData =
            this.processors[
              '/restapi/v1.0/account/~/message-threads/:threadId/resolve'
            ](res);
          return {
            body: processedData.mockData,
          };
        },
      },
    );
  }

  /**
   * Mock GET /restapi/v1.0/account/~/message-threads
   * List message threads
   */
  getMessageThreads() {
    this.get('/restapi/v1.0/account/~/message-threads' as any, 200, {
      repeat: 0,
      response: (res) => {
        const { url } = res;
        const urlObj = new URL(url, 'http://example.com');
        const page = urlObj.searchParams.get('page')
          ? Number(urlObj.searchParams.get('page'))
          : 1;
        let mockData;
        if (page === 1) {
          mockData = { ...messageThreadsBody };
        } else if (page === 2) {
          mockData = { ...messageThreads2Body };
        } else if (page === 3) {
          mockData = { ...messageThreads3Body };
        } else {
          mockData = { ...messageThreadsBody };
        }
        res.mockData = mockData;
        const processedData =
          this.processors['/restapi/v1.0/account/~/message-threads'](res);
        return {
          body: processedData.mockData,
        };
      },
    });
  }

  /**
   * Mock GET /restapi/v1.0/account/~/message-threads/:threadId
   * Get a single message thread
   */
  getMessageThread() {
    this.get('/restapi/v1.0/account/~/message-threads/:threadId' as any, 200, {
      repeat: 0,
      response: (res) => {
        const { params } = res;
        const threadId = (params as any).threadId;
        const mockData = {
          id: threadId,
          status: 'Open',
          creationTime: new Date().toISOString(),
          lastModifiedTime: new Date().toISOString(),
        };
        res.mockData = mockData;
        const processedData =
          this.processors['/restapi/v1.0/account/~/message-threads/:threadId'](
            res,
          );
        return {
          body: processedData.mockData,
        };
      },
    });
  }

  /**
   * Mock GET /restapi/v1.0/account/~/message-threads/sync
   * Sync message threads
   */
  getMessageThreadSync() {
    this.get('/restapi/v1.0/account/~/message-threads/sync' as any, 200, {
      repeat: 0,
      response: (res) => {
        const { params } = res;
        const syncType = params.syncType || 'FSync';
        const mockData =
          syncType === 'FSync'
            ? { ...messageThreadsFsyncBody }
            : { ...messageThreadsIsyncBody };
        mockData.syncInfo.syncTime = new Date().toISOString();
        res.mockData = mockData;
        const processedData =
          this.processors['/restapi/v1.0/account/~/message-threads/sync'](res);
        return {
          body: processedData.mockData,
        };
      },
    });
  }

  /**
   * Mock GET /restapi/v1.0/account/~/message-threads/entries/sync
   * Sync message thread entries
   */
  getMessageThreadEntriesSync() {
    this.get(
      '/restapi/v1.0/account/~/message-threads/entries/sync' as any,
      200,
      {
        repeat: 0,
        response: (res) => {
          const { params } = res;
          const syncType = params.syncType || 'FSync';
          const mockData =
            syncType === 'FSync'
              ? { ...messageThreadsEntriesFsyncBody }
              : { ...messageThreadsEntriesIsyncBody };
          mockData.syncInfo.syncTime = new Date().toISOString();
          res.mockData = mockData;
          const processedData =
            this.processors[
              '/restapi/v1.0/account/~/message-threads/entries/sync'
            ](res);
          return {
            body: processedData.mockData,
          };
        },
      },
    );
  }

  /**
   * Mock GET /restapi/v1.0/account/~/message-threads/messages
   * Get message thread messages
   */
  getMessageThreadMessages() {
    this.get('/restapi/v1.0/account/~/message-threads/messages' as any, 200, {
      repeat: 0,
      response: (res) => {
        const { url } = res;
        const urlObj = new URL(url, 'http://example.com');
        const page = urlObj.searchParams.get('page')
          ? Number(urlObj.searchParams.get('page'))
          : 1;
        const mockData =
          page === 1
            ? { ...messageThreadMessagesBody }
            : { ...messageThreadMessages2Body };
        res.mockData = mockData;
        const processedData =
          this.processors['/restapi/v1.0/account/~/message-threads/messages'](
            res,
          );
        return {
          body: processedData.mockData,
        };
      },
    });
  }
}

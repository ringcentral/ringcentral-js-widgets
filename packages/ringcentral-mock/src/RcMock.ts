import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import { telephonyStatus as telephonyStatuses } from '@ringcentral-integration/commons/enums/telephonyStatus';
import {
  createTelephonySession,
  makeTelephonySessionId,
  makeWebphoneSessionId,
  PartyStatusCode,
  telephonySessionBuildersCache,
  clearTelephonySessionBuilders,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { RcvDelegator } from '@ringcentral-integration/commons/modules/RcVideo';
import { isConferenceSession } from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import type { MockRequest } from 'fetch-mock';
import { includes } from 'ramda';

import type { PlatformMockOptions } from './PlatformMock';
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
import featuresBody from './platform/data/features.json';
import forwardAllCallsBody from './platform/data/forwardAllCallsInfo.json';
import generateCodeBody from './platform/data/generateCode.json';
import invitationBridgesResponse from './platform/data/invitationBridges.json';
import postMeetingBody from './platform/data/meeting.json';
import meetingInvitation from './platform/data/meetingInvitation.json';
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
import ringOutBody from './platform/data/ringOut.json';
import sipProvisionBody from './platform/data/sipProvision.json';
import smsResponse from './platform/data/sms.json';
import telephonySessionResponse from './platform/data/telephonySession.json';
import videoPersonalSettingsBody from './platform/data/videoPersonalSettings.json';
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

  constructor({
    subscription,
    enableSeparateMessageSyncMock,
    ...options
  }: RcMockOptions) {
    super(options);
    this.subscription = subscription;
    this.defaultInitMocks
      .add(this.getCheckPubsub)
      .add(this.postAuthentication)
      .add(this.postOauthToken)
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
      .add(this.getMeetingsConfigurationAssisted)
      .add(this.getMeetingServiceInfo)
      .add(this.getMeetingUserSettings)
      .add(this.getMeetingLockedSettings)
      .add(this.postMeeting)
      .add(this.getInvitation)
      .add(this.getRcvMeetingInfo)
      .add(this.deleteMeeting)
      .add(this.getMeeting)
      .add(this.putMeeting)
      .add(this.getInteropGenerateCode)
      .add(this.postWsToken)
      .add(this.getTelephonyState)
      .add(this.getCallLog)
      .add(this.deleteCallLog)
      .add(this.deleteAllCallLog)
      .add(this.postSms)
      .add(this.getProfileImage)
      .add(this.getInvitationBridges)
      .add(this.postCompanyPager)
      .add(this.postNumberParserV2)
      .add(this.ringOut);

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
    return super.reset();
  }

  getCheckPubsub() {
    this.get('/time/0' as any, 200, {
      response: () => {
        return { body: '' };
      },
    });
  }

  postAuthentication(handler?: (mockData: TokenInfo) => TokenInfo) {
    this.post('/restapi/oauth/token', 200, {
      response: ({ mockData }) => {
        const data = {
          ...mockData,
          access_token: btoa(Math.random().toString()),
          refresh_token: btoa(Math.random().toString()),
          expires_in: 3600,
          refresh_token_expires_in: 60480,
          expireTime: Date.now() + 3600 * 1000,
          scope: 'SMS RCM Foo Boo CallControl TelephonySessions',
        };
        return {
          body: handler?.(data) ?? data,
        };
      },
    });
  }

  postAuthRevoke() {
    this.post('/restapi/oauth/revoke');
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

  getExtension() {
    // TODO: refactor with mockData
    this.get('/restapi/v1.0/account/:accountId/extension/:extensionId', 200, {
      response: {
        body: extensionInfoBody as GetExtensionInfoResponse,
      },
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
      },
    );
  }

  getForwardingNumber(
    handler?: (
      mockData: GetExtensionForwardingNumberListResponse,
    ) => GetExtensionForwardingNumberListResponse,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/forwarding-number',
      200,
      {
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
  ) {
    // TODO: update schema
    this.get(
      '/restapi/v1.0/account/:accountId/directory/contacts' as any,
      200,
      {
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
        accountBody.serviceInfo.brand.id = brandId ?? '1210';
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
        response: ({ params, mockData }) => {
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
    handler?: (mockData: GetMessageInfoResponse) => GetMessageInfoResponse,
    repeat = 1,
  ) {
    this.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store/:messageId',
      200,
      {
        repeat,
        response: ({ mockData }) => {
          return {
            body: handler?.(mockData) ?? mockData,
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

  getTimezone() {
    this.get('/restapi/v1.0/dictionary/timezone');
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
          return {
            body: {
              ...mockData,
              ...(handler?.(smsResponse as any) ?? smsResponse),
            } as GetSMSMessageInfoResponse,
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
  ) {
    this.get(
      '/rcvideo/v1/account/:accountId/extension/:extensionId/preferences' as any,
      200,
      {
        repeat: 0,
        response: {
          body: handler?.(videoPreferenceBody) ?? videoPreferenceBody,
        },
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
    this.post(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId' as any,
      status,
      {
        response: {
          body: {},
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
      );
      const callEvent = 'invite';
      const webphone = webSession.webphone!;
      telephonySessionBuilder.setRelatedWebphoneSession(webSession);

      if (useUserAgentSession && direction === callDirection.inbound) {
        webphone.userAgent.invite(phoneNumber || '', {
          fromNumber: fromNumberData?.phoneNumber,
        });
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
      telephonySessionInstance?.relatedWebphoneSession?.terminate();
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

  async goneCall(telephonySessionId: string) {
    const telephonySessionInstance = telephonySessionBuildersCache.find(
      (s) => s.getTelephonySessionId() === telephonySessionId,
    );

    if (telephonySessionInstance) {
      telephonySessionInstance?.setGone();
      const event = telephonySessionInstance?.done();
      telephonySessionInstance?.relatedWebphoneSession?.terminate();
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
      if (
        builder.getTelephonySessionId() !== currentTelephonySessionId &&
        builder.getStatus() !== PartyStatusCode.gone
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

  coldTransfer(status: 200 | 409 = 200) {
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
        repeat: 0,
      },
    );
  }

  presenceUpdate(
    handler?: (
      presenceBodyData: typeof presenceBody,
      request?: MockRequest,
    ) => typeof presenceBody,
    repeat?: number,
  ) {
    this.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/presence',
      200,
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

  stopRecord(status: HttpStatusCode = 200) {
    let body = {};
    switch (status) {
      case 200:
        // body =
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

  mute(status: HttpStatusCode = 200) {
    this.patch(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId',
      status as any,
      {
        body: {
          muted: true,
        },
      },
    );
  }

  unmute(status: HttpStatusCode = 200) {
    this.patch(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId',
      status as any,
      {
        body: {
          muted: false,
        },
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
}

import { RcvDelegator } from '@ringcentral-integration/commons/modules/RcVideo';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import { telephonyStatus as telephonyStatuses } from '@ringcentral-integration/commons/enums/telephonyStatus';
import { isConferenceSession } from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import { includes } from 'ramda';
import {
  createTelephonySession,
  PartyStatusCode,
  telephonySessionBuildersCache,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import { PlatformMock, PlatformMockOptions } from './PlatformMock';
import { PubnubMock, WebSocketMock } from './subscription';
import { generateTelephonyState } from './lib/generateTelephonyState';
import {
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
} from './platform/interfaces';
import {
  ArraySchemaObject,
  MakeCallProps,
  MessageProps,
  SchemaObject,
} from './interface';
import accountBody from './platform/data/accountInfo.json';
import featuresBody from './platform/data/features.json';
import blockedNumberBody from './platform/data/blockedNumber.json';
import extensionsListBody from './platform/data/extensions.json';
import directoryEntries from './platform/data/directoryEntries.json';
import dialingPlanBody from './platform/data/dialingPlan.json';
import discoveryExternalBody from './platform/data/discoveryExternal.json';
import discoveryInitialBody from './platform/data/discoveryInitial.json';
import videoPersonalSettingsBody from './platform/data/videoPersonalSettings.json';
import rcvMeetingSettingsBody from './platform/data/rcvMeetingSettings.json';
import dialInNumbersBody from './platform/data/dialInNumbers.json';
import postRcvBridgesBody from './platform/data/postRcvBridges.json';
import videoPreferenceBody from './platform/data/videoPreference.json';
import extensionInfoBody from './platform/data/extensionInfo.json';
import postMeetingBody from './platform/data/meeting.json';
import presenceBody from './platform/data/presence.json';
import meetingInvitation from './platform/data/meetingInvitation.json';
import generateCodeBody from './platform/data/generateCode.json';
import ringOutBody from './platform/data/ringOut.json';
import wsTokenBody from './platform/data/ws/wstoken.json';
import parerPhoneNumbersResponse from './platform/data/numberParser.json';
import numberParserAPIResponse from './platform/data/numberParserV2.json';
import smsResponse from './platform/data/sms.json';
import conferenceCallResponse from './platform/data/conferenceCall.json';
import bringInToConferenceResponse from './platform/data/bringInToConferenceRes.json';
import telephonySessionResponse from './platform/data/telephonySession.json';
import deviceBody from './platform/data/device.json';
import companyPagerResponse from './platform/data/companyPager.json';
import invitationBridgesResponse from './platform/data/invitationBridges.json';
import companyPagerInvalidResponse from './platform/data/companyPagerInvalid.json';
import {
  RCV_INVITATION_BODY,
  RCV_INVITATION_START,
  RCV_INVITATION_END,
} from './platform/data/rcvInvitation';
import { WebphoneSessionMock } from './webphone';

export interface RcMockOptions extends PlatformMockOptions {
  /**
   * mock subscription for RcMock, it should be PubnubMock or WebSocketMock.
   */
  subscription: PubnubMock | WebSocketMock;
}

export interface PostOauthTokenProps {
  failure?: boolean;
  repeat?: number;
  failureCode?: 400 | 403;
}

type HttpStatusCode = 200 | 400 | 403 | 404 | 503 | 409 | 500;

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

  constructor({ subscription, ...options }: RcMockOptions) {
    super(options);
    this.subscription = subscription;
    this.defaultInitMocks
      .add(this.postAuthentication)
      .add(this.postOauthToken)
      .add(this.getCallerId)
      .add(this.getExtension)
      .add(this.getAccount)
      .add(this.getFeatures)
      .add(this.postSubscription)
      .add(this.getDevice)
      .add(this.getBlockedNumber)
      .add(this.getAddressBookSync)
      .add(this.getPresence)
      .add(this.getPhoneNumber)
      .add(this.getForwardingNumber)
      .add(this.getContacts)
      .add(this.getContactsByPublicApi)
      .add(this.getDialingPlan)
      .add(this.getVideoConfiguration)
      .add(this.getMessageSync)
      .add(this.getActiveCalls)
      .add(this.getCallLogSync)
      .add(this.getMessageStore)
      .add(this.deleteMessage)
      .add(this.postSipProvision)
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
      .add(this.postSms)
      .add(this.getProfileImage)
      .add(this.getInvitationBridges)
      .add(this.postCompanyPager)
      .add(this.postNumberParserV2)
      .add(this.ringOut);
  }

  removeWebphone?: () => void;

  override reset() {
    this.subscription.remove();
    this.removeWebphone?.();
    return super.reset();
  }

  postAuthentication() {
    this.post('/restapi/oauth/token', 200, {
      response: ({ mockData }) => {
        return {
          body: {
            ...mockData,
            access_token: btoa(Math.random().toString()),
            refresh_token: btoa(Math.random().toString()),
            expires_in: 3600,
            refresh_token_expires_in: 60480,
            expireTime: Date.now() + 3600 * 1000,
            scope: 'SMS RCM Foo Boo CallControl TelephonySessions',
          },
        };
      },
    });
  }

  postAuthRevoke() {
    this.post('/restapi/oauth/revoke');
  }

  getCallerId() {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/caller-id',
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

  getPresence(repeat: number = 1) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/presence',
      200,
      {
        repeat,
        response: ({ mockData }) => {
          return {
            body: {
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
            } as GetPresenceInfo,
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
          return {
            body: handler?.(mockData) ?? mockData,
          };
        },
      },
    );
  }

  getForwardingNumber() {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/forwarding-number',
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
      response: ({ mockData }) => {
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

  postSubscription(repeat: number = 1) {
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
    }: MessageProps = {},
    handler?: (mockData: GetMessageSyncResponse) => GetMessageSyncResponse,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-sync',
      200,
      {
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
          return {
            body: handler?.(mockData) ?? mockData,
          };
        },
        repeat,
      },
    );
  }

  deleteMessage() {
    this.delete(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store/:messageId',
    );
  }

  getActiveCalls(repeat, { length = 0 } = {}) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/active-calls',
      200,
      {
        response: ({ mockData }) => {
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
        default:
          body = {
            message: 'Wrong token',
            error_description: 'Wrong token',
            description: 'Wrong token',
          };
          break;
      }
      this.post('/restapi/oauth/token', failure ? failureCode : 200, {
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

  getCallLogSync(
    handler?: (mockData: CallLogSync) => CallLogSync,
    repeat: number = 1,
  ) {
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
          const body = (handler?.(mockData) ?? mockData) as UserCallLogResponse;
          return {
            body,
          };
        },
      },
    );
  }

  getMessageStore(
    handler?: (mockData: GetMessageList) => GetMessageList,
    repeat: number = 1,
  ) {
    this.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/message-store',
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

  putMessageStore(
    handler?: (mockData: GetMessageInfoResponse) => GetMessageInfoResponse,
    repeat: number = 1,
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

  postSipProvision() {
    this.post('/restapi/v1.0/client-info/sip-provision');
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
    repeat: number = 0,
    status: number = 200,
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
    repeat: number = 0,
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
    repeat: number = 1,
    requestInvalid: boolean = false,
    responseCode: number = 200,
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
    handler?: (
      mockData: typeof postRcvBridgesBody,
    ) => typeof postRcvBridgesBody,
  ) {
    this.post('/rcvideo/v1/bridges' as any, 200, {
      repeat: 0,
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
    const mockWsServer = 'ws://whatever';
    this.post('/restapi/oauth/wstoken' as any, 200, {
      response: {
        body: {
          ...wsTokenBody,
          uri: mockWsServer,
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
    handler?: (res: CallSessionObject) => CallSessionObject,
    repeat?: number,
  ) {
    const conferenceCallRes: CallSessionObject = {
      ...conferenceCallResponse,
      creationTime: new Date().getTime().toString(),
    } as any;
    this.post('/restapi/v1.0/account/:accountId/telephony/conference', 201, {
      response: {
        body: handler?.(conferenceCallRes) ?? conferenceCallRes,
      },
      repeat,
    });
  }

  bringInToConference(
    handler?: (res: CallParty) => CallParty,
    repeat?: number,
  ) {
    this.post(
      '/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/bring-in',
      201,
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

  async triggerActiveCallChanged({
    handler,
    sessions,
  }: {
    sessions?: NormalizedSession[];
    handler?: (eventData: GetPresenceInfo) => GetPresenceInfo;
  }) {
    const activeCalls = sessions
      ? this.generateActiveCalls(
          sessions,
          [],
          sessions.map((i) => i.id),
        )
      : [];
    const event = {
      event:
        '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
      timestamp: new Date().toISOString(),
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
        telephonyStatus: 'Ringing',
        totalActiveCalls: activeCalls.length,
        userStatus: 'Available',
        // TODO: fix type for miss `uri, extension, message, meetingStatus`
      } as any as GetPresenceInfo,
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
    telephonySessionId = new Date().getTime().toString(),
    sessionId = new Date().getTime().toString(),
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

    const telephoneSessionId = telephonySessionBuilder.telephoneSessionId;
    const event = telephonySessionBuilder.done();
    await this.subscription.trigger(event);
    if (isWebRTC) {
      const webSession = new WebphoneSessionMock(telephoneSessionId);
      const callEvent =
        direction === callDirection.inbound ? 'invite' : 'inviteSent';
      const { webphone } = webSession;
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
      await new Promise((r) => setTimeout(r, 1000));
    }
    return telephoneSessionId;
  }

  async connectLatestCall() {
    const [telephonySessionBuilder] = telephonySessionBuildersCache.slice(-1);
    telephonySessionBuilder.setConnected();
    const event = telephonySessionBuilder.done();
    await this.subscription.trigger(event);
  }

  async disConnectLatestCall() {
    const [telephonySessionInstance] = telephonySessionBuildersCache.slice(-1);
    telephonySessionInstance.setDisconnected();
    const event = telephonySessionInstance.done();
    telephonySessionInstance?.relatedWebphoneSession?.terminate();
    await this.subscription.trigger(event);
  }

  async hangUp(telephonySessionId: string) {
    const telephonySessionInstance = telephonySessionBuildersCache.find(
      (s: any) => s.telephoneSessionId === telephonySessionId,
    );

    if (telephonySessionInstance) {
      telephonySessionInstance.setDisconnected();
      const event = telephonySessionInstance.done();
      telephonySessionInstance?.relatedWebphoneSession?.terminate();
      await this.subscription.trigger(event);
    }
  }

  async goneCall(telephonySessionId: string) {
    const telephonySessionInstance = telephonySessionBuildersCache.find(
      (s: any) => s.telephoneSessionId === telephonySessionId,
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
      (s: any) => s.telephoneSessionId === telephonySessionId,
    );

    if (telephonySessionBuilder) {
      telephonySessionBuilder.setConnected();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async unholdCall(telephonySessionId: string, otherIds: string[]) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s: any) => s.telephoneSessionId === telephonySessionId,
    );

    const otherSessions = telephonySessionBuildersCache.filter((s: any) =>
      otherIds.includes(s.telephoneSessionId),
    );

    if (otherSessions.length) {
      for (const item of otherSessions) {
        item?.setHoldCall();
        const event = item.done();
        await this.subscription.trigger(event);
      }
    }

    if (telephonySessionBuilder) {
      telephonySessionBuilder.setConnected();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async holdCall(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s: any) => s.telephoneSessionId === telephonySessionId,
    );
    if (telephonySessionBuilder) {
      telephonySessionBuilder.setHoldCall();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async muteCall(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s: any) => s.telephoneSessionId === telephonySessionId,
    );
    if (telephonySessionBuilder) {
      telephonySessionBuilder.setMuteCall();
      const event = telephonySessionBuilder.done();
      await this.subscription.trigger(event);
    }
  }

  async startRecord(telephonySessionId: string) {
    const telephonySessionBuilder = telephonySessionBuildersCache.find(
      (s: any) => s.telephoneSessionId === telephonySessionId,
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
        response: ({ mockData }) => {
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

  completeWarmTransfer(status: 200 | 409 | 503 = 200) {
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
        repeat: 0,
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
    handler?: (presenceBodyData: typeof presenceBody) => typeof presenceBody,
  ) {
    this.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/presence',
      200,
      {
        response: {
          body: (handler?.(presenceBody) ??
            presenceBody) as PresenceInfoResponse,
        },
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
      status,
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
      status,
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
      status,
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
}

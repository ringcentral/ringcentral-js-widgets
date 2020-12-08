import { SDK } from '@ringcentral/sdk';
import fetchMock from 'fetch-mock';
import { RCV_PREFERENCES_IDS } from '../../modules/RcVideo/videoHelper';
import accountBody from './data/accountInfo.json';
import accountPhoneNumberBody from './data/accountPhoneNumber.json';
import activeCallsBody from './data/activeCalls.json';
import addressBookBody from './data/addressBook.json';
import apiInfoBody from './data/apiInfo.json';
import authzProfileBody from './data/authzProfile.json';
import blockedNumberBody from './data/blockedNumber.json';
import callerIdBody from './data/callerId.json';
import callLogBody from './data/callLog.json';
import conferenceCallBody from './data/conferenceCall.json';
import conferenceCallBringInBody from './data/conferenceCallBringIn.json';
import conferencingBody from './data/conferencing.json';
import deviceBody from './data/device.json';
import dialingPlanBody from './data/dialingPlan.json';
import extensionListBody from './data/extension.json';
import extensionBody from './data/extensionInfo.json';
import extensionsListBody from './data/extensions.json';
import fetchDLBody from './data/fetchDL.json';
import fetchDLWithNoRecordBody from './data/fetchDLWithNoRecord.json';
import forwardingNumberBody from './data/forwardingNumber.json';
import lockedSettingsBody from './data/lockedSettings.json';
import meetingBody from './data/meeting.json';
import meetingInvitationBody from './data/meetingInvitation.json';
import assistedUsersBody from './data/assistedUsers.json';
import delegatorsBody from './data/delegatorsBody.json';
import meetingProviderRcmBody from './data/meetingProviderRcm.json';
import meetingProviderRcvBody from './data/meetingProviderRcv.json';
import messageItemBody from './data/messageItem.json';
import messageListBody from './data/messageList.json';
import messageSyncBody from './data/messageSync.json';
import numberParseBody from './data/numberParse.json';
import numberParserBody from './data/numberParser.json';
import phoneNumberBody from './data/phoneNumber.json';
import presenceBody from './data/presence.json';
import ringOutBody from './data/ringOut.json';
import serviceInfoBody from './data/serviceInfo.json';
import sipProvisionBody from './data/sipProvision.json';
import smsBody from './data/sms.json';
import subscriptionBody from './data/subscription.json';
import timezoneBody from './data/timezone.json';
import updateConferenceCallBody from './data/updateConference.json';
import userSettingsBody from './data/userSettings.json';
import videoConfigurationBody from './data/videoConfiguration.json';
import meetingPreferenceBody from './data/videoPreference.json';
import featuresBody from './data/features.json';
import videoPersonalSettingsBody from './data/videoPersonalSettings.json';

export const mockServer = 'http://whatever';
export function createSDK(options = {}) {
  const opts = {
    clientId: 'test key',
    clientSecret: 'test secret',
    server: mockServer,
    Request: fetchMock.constructor.Request,
    Response: fetchMock.constructor.Response,
    Headers: fetchMock.constructor.Headers,
    fetch: fetchMock.fetchMock.bind(fetchMock),
    refreshDelayMs: 1,
    redirectUri: 'http://foo',
    cachePrefix: 'sdkPrefix',
    clearCacheOnRefreshError: false,
    ...options,
  };
  return new SDK(opts);
}

export function mockApi({
  method = 'GET',
  path,
  server = mockServer,
  url,
  body = {},
  status = 200,
  statusText = 'OK',
  headers,
  isOnce = true,
}) {
  let responseHeaders;
  const isJson = typeof body !== 'string';
  if (isJson && !headers) {
    responseHeaders = {
      'Content-Type': 'application/json',
    };
  } else {
    responseHeaders = headers;
  }
  let mockUrl;
  if (url) {
    mockUrl = url;
  } else {
    mockUrl = `${server}${path}`;
  }
  const mock = isOnce
    ? fetchMock.once.bind(fetchMock)
    : fetchMock.mock.bind(fetchMock);
  mock(
    mockUrl,
    {
      body: isJson ? JSON.stringify(body) : body,
      status,
      statusText,
      headers: responseHeaders,
      sendAsJson: false,
    },
    {
      method,
      times: isOnce ? 1 : 20,
    },
  );
}

export function authentication() {
  mockApi({
    method: 'POST',
    path: '/restapi/oauth/token',
    body: {
      access_token: 'ACCESS_TOKEN',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'REFRESH_TOKEN',
      refresh_token_expires_in: 60480,
      scope: 'SMS RCM Foo Boo',
      expireTime: new Date().getTime() + 3600000,
      owner_id: '23231231"',
      endpoint_id: '3213213131',
    },
  });
}

export function logout() {
  mockApi({
    method: 'POST',
    path: '/restapi/oauth/revoke',
    isOnce: false,
  });
}

export function tokenRefresh(failure) {
  if (!failure) {
    mockApi({
      method: 'POST',
      path: '/restapi/oauth/token',
      body: {
        access_token: 'ACCESS_TOKEN_FROM_REFRESH',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'REFRESH_TOKEN_FROM_REFRESH',
        refresh_token_expires_in: 60480,
        scope: 'SMS RCM Foo Boo',
      },
    });
  } else {
    mockApi({
      method: 'POST',
      path: '/restapi/oauth/token',
      body: {
        message: 'Wrong token',
        error_description: 'Wrong token',
        description: 'Wrong token',
      },
      status: 400,
    });
  }
}

export function presence(id, mockResponse = {}, isOnce = false) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/${id}/presence`,
    body: {
      uri: `https://platform.ringcentral.com/restapi/v1.0/account/123/extension/${id}/presence`,
      extension: {
        uri: `https://platform.ringcentral.com/restapi/v1.0/account/123/extension/${id}`,
        extensionNumber: '101',
        id,
      },
      activeCalls: [],
      presenceStatus: 'Available',
      telephonyStatus: 'Ringing',
      userStatus: 'Available',
      dndStatus: 'TakeAllCalls',
      extensionId: id,
      ...mockResponse,
    },
    isOnce,
  });
}

export function presenceUpdate(id, mockResponse = {}) {
  mockApi({
    path: `/restapi/v1.0/account/~/extension/${id}/presence`,
    method: 'PUT',
    body: {
      ...presenceBody,
      ...mockResponse,
    },
  });
}

export function dialingPlan(mockResponse = {}) {
  mockApi({
    path: '/restapi/v1.0/account/~/dialing-plan?perPage=MAX&page=1',
    body: {
      ...dialingPlanBody,
      ...mockResponse,
    },
  });
}

export function extensionInfo(mockResponse = {}) {
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~',
    body: {
      ...extensionBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function conferenceCallBringIn(id, mockResponse = {}) {
  mockApi({
    method: 'POST',
    path: `/restapi/v1.0/account/~/telephony/sessions/${id}/parties/bring-in`,
    body: {
      ...conferenceCallBringInBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function removeFromConference(id, partyId) {
  mockApi({
    method: 'DELETE',
    path: `/restapi/v1.0/account/~/telephony/sessions/${id}/parties/${partyId}`,
  });
}

export function extensionList(mockResponse = {}) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension?`,
    body: {
      ...extensionListBody,
      ...mockResponse,
    },
  });
}

export function companyContactList(mockResponse = {}) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/directory/contacts?`,
    body: {
      ...extensionsListBody,
      ...mockResponse,
    },
  });
}

export function accountInfo(mockResponse = {}) {
  mockApi({
    path: '/restapi/v1.0/account/~',
    body: {
      ...accountBody,
      ...mockResponse,
    },
  });
}

export function apiInfo(mockResponse = {}) {
  mockApi({
    path: '/restapi/v1.0',
    body: {
      ...apiInfoBody,
      ...mockResponse,
    },
  });
}

export function messageSync(mockResponse = {}, isOnce = false) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/message-sync`,
    body: {
      ...messageSyncBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function messageList(mockResponse = {}) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/message-store?`,
    body: {
      ...messageListBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function updateMessageStatus(mockResponse = {}, isOnce = true) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/message-store/`,
    method: 'PUT',
    body: {
      ...messageItemBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function authzProfile(mockResponse = {}) {
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/authz-profile',
    body: {
      ...authzProfileBody,
      ...mockResponse,
    },
  });
}

export function blockedNumber(mockResponse = {}) {
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/blocked-number',
    body: {
      ...blockedNumberBody,
      ...mockResponse,
    },
  });
}

export function forwardingNumber(mockResponse = {}) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/forwarding-number`,
    body: {
      ...forwardingNumberBody,
      ...mockResponse,
    },
  });
}

export function phoneNumber(mockResponse = {}) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/phone-number`,
    body: {
      ...phoneNumberBody,
      ...mockResponse,
    },
  });
}

export function accountPhoneNumber(mockResponse = {}) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/phone-number`,
    body: {
      ...accountPhoneNumberBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function subscription(mockResponse = {}) {
  mockApi({
    method: 'POST',
    url: `begin:${mockServer}/restapi/v1.0/subscription`,
    body: {
      ...subscriptionBody,
      ...mockResponse,
    },
    isOnce: false,
  });
  mockApi({
    method: 'PUT',
    url: `begin:${mockServer}/restapi/v1.0/subscription`,
    body: {
      ...subscriptionBody,
      ...mockResponse,
    },
    isOnce: false,
  });
  mockApi({
    method: 'DELETE',
    url: `begin:${mockServer}/restapi/v1.0/subscription`,
    body: {
      ...subscriptionBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function numberParser(mockResponse = {}, isOnce = true) {
  mockApi({
    method: 'POST',
    url: `begin:${mockServer}/restapi/v1.0/number-parser/`,
    body: {
      ...numberParserBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function sms(mockResponse = {}) {
  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/extension/~/sms',
    body: {
      ...smsBody,
      ...mockResponse,
    },
  });
}

export function addressBook(mockResponse = {}) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/address-book-sync`,
    body: {
      ...addressBookBody,
      ...{
        syncInfo: {
          syncType: addressBookBody.syncInfo.syncType,
          syncToken: addressBookBody.syncInfo.syncToken,
          syncTime: new Date(Date.now()).toISOString(),
        },
      },
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function callLog(mockResponse = {}) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/call-log-sync`,
    body: {
      ...callLogBody,
      records: [
        {
          ...callLogBody.records[0],
          startTime: new Date(Date.now()).toISOString(),
        },
        {
          ...callLogBody.records[1],
          startTime: new Date(Date.now()).toISOString(),
        },
      ],
      ...{
        syncInfo: {
          syncType: callLogBody.syncInfo.syncType,
          syncToken: callLogBody.syncInfo.syncToken,
          syncTime: new Date(Date.now()).toISOString(),
        },
      },
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function userSettings(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/account/~/extension/~/meeting/user-settings`,
    body: {
      ...userSettingsBody,
      ...mockResponse,
    },
  });
}

export function lockedSettings(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/account/~/meeting/locked-settings`,
    body: {
      ...lockedSettingsBody,
      ...mockResponse,
    },
  });
}

export function assistedUsers(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/account/~/extension/~/meetings-configuration/assisted`,
    body: mockResponse || assistedUsersBody,
  });
}

export function delegators(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/rcvideo/v1/accounts/~/extensions/~/delegators`,
    body: mockResponse || delegatorsBody,
  });
}

export function device(mockResponse = {}, isOnce = true) {
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/device`,
    body: {
      ...deviceBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function conferencing(mockResponse = {}) {
  mockApi({
    path: '/restapi/v1.0/account/~/extension/~/conferencing',
    body: {
      ...conferencingBody,
      ...mockResponse,
    },
  });
}

// TODO: replace it with numberParser
export function numberParse(mockResponse = {}, homeCountry) {
  mockApi({
    method: 'POST',
    path: `/restapi/v1.0/number-parser/parse?homeCountry=${homeCountry}`,
    body: {
      ...numberParseBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function conferenceCall(mockResponse = {}) {
  conferenceCallBody.session.on = () => {};
  mockApi({
    method: 'POST',
    path: '/restapi/v1.0/account/~/telephony/conference',
    body: {
      ...conferenceCallBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function updateConferenceCall(id, mockResponse = {}, isOnce = false) {
  mockApi({
    path: `/restapi/v1.0/account/~/telephony/sessions/${id}`,
    body: {
      // ...conferenceCallBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function terminateConferenceCall(id, mockResponse = {}) {
  mockApi({
    method: 'DELETE',
    path: `/restapi/v1.0/account/~/telephony/sessions/${id}`,
    body: {
      ...conferenceCallBody,
      ...mockResponse,
    },
  });
}

export function activeCalls(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/active-calls`,
    body: {
      ...activeCallsBody,
      ...mockResponse,
    },
  });
}

export function sipProvision(mockResponse = {}) {
  mockApi({
    method: 'POST',
    url: `begin:${mockServer}/restapi/v1.0/client-info/sip-provision`,
    body: {
      ...sipProvisionBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function fetchDL(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/device`,
    body: {
      ...fetchDLBody,
      ...mockResponse,
    },
  });
}

export function fetchDLWithNoRecord(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/device`,
    body: {
      ...fetchDLWithNoRecordBody,
      ...mockResponse,
    },
  });
}

export function restore() {
  fetchMock.restore();
}

export function reset() {
  fetchMock.reset();
}

export function mockForbidden({ method = 'GET', path, url, body = '' }) {
  mockApi({
    method,
    path,
    body,
    url,
    status: 403,
  });
}

export function mockLimited({ method = 'GET', path, url, headers }) {
  mockApi({
    method,
    path,
    url,
    status: 503,
    headers,
    body: {
      status: 503,
      errorCode: 'CMN-211',
      errors: [{ errorCode: 'CMN-211' }],
    },
  });
}

export function mockClient(client, options = {}) {
  client.service = createSDK(options);
}

export function ringOut(mockResponse = {}) {
  mockApi({
    isOnce: false,
    method: 'POST',
    url: `${mockServer}/restapi/v1.0/account/~/extension/~/ring-out`,
    body: {
      ...ringOutBody,
      ...mockResponse,
    },
  });
}

export function ringOutUpdate(mockResponse = {}) {
  mockApi({
    isOnce: false,
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension/~/ring-out/`,
    body: {
      ...ringOutBody,
      ...mockResponse,
    },
  });
}

export function meeting(mockResponse = {}, extra = {}) {
  mockApi({
    method: 'POST',
    url: `${mockServer}/restapi/v1.0/account/~/extension/~/meeting`,
    body: {
      ...meetingBody,
      ...mockResponse,
    },
    isOnce: false,
    ...extra,
  });
}

export function meetingInvitation(meetingId = null, mockResponse = {}) {
  const id = meetingId || meetingBody.id;
  mockApi({
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/account/~/extension/~/meeting/${id}/invitation`,
    body: {
      ...meetingInvitationBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function meetingInfo(
  meetingId = null,
  mockResponse = {},
  isOnce = false,
) {
  const id = meetingId || meetingBody.id;
  mockApi({
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/account/~/extension/~/meeting/${id}`,
    body: {
      ...meetingBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function videoPreference(useExtensionId = false) {
  const query = `id=${RCV_PREFERENCES_IDS.join('&id=')}`;
  const extensionId = useExtensionId ? extensionBody.id : '~';
  mockApi({
    method: 'GET',
    url: `${mockServer}/rcvideo/v1/account/${extensionId}/extension/${extensionId}/preferences?${query}`,
    body: meetingPreferenceBody,
    isOnce: false,
  });
}

export function videoPersonalSettings() {
  mockApi({
    method: 'GET',
    url: `${mockServer}/rcvideo/v1/bridges?default=true&accountId=${accountBody.id}&extensionId=${extensionBody.id}`,
    body: videoPersonalSettingsBody,
    isOnce: false,
  });
}

export function serviceInfo(mockResponse = {}, extensionId = '~') {
  mockApi({
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/account/~/extension/${extensionId}/meeting/service-info`,
    body: {
      ...serviceInfoBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function meetingProvider(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/account/~/extension/~/video-configuration`,
    body: {
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function meetingProviderRcm() {
  meetingProvider(meetingProviderRcmBody);
}

export function meetingProviderRcv() {
  meetingProvider(meetingProviderRcvBody);
}

export function recentActivity(mockResponse = {}, isOnce = false) {
  mockApi({
    method: 'GET',
    url: new RegExp(
      `${mockServer}/restapi/v1.0/account/~/extension/~/call-log`,
    ),
    body: {
      ...callLogBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function videoConfiguration(mockResponse = {}, isOnce = false) {
  mockApi({
    method: 'GET',
    url: new RegExp(
      `${mockServer}/restapi/v1.0/account/~/extension/~/video-configuration`,
    ),
    body: {
      ...videoConfigurationBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function callerId(mockResponse = {}, isOnce = false) {
  mockApi({
    method: 'GET',
    url: new RegExp(
      `${mockServer}/restapi/v1.0/account/~/extension/~/caller-id`,
    ),
    body: {
      ...callerIdBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function features(mockResponse = {}, isOnce = false) {
  mockApi({
    method: 'GET',
    url: new RegExp(
      `${mockServer}/restapi/v1.0/account/~/extension/~/features`,
    ),
    body: {
      ...featuresBody,
      ...mockResponse,
    },
  });
}

export function timezone(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/dictionary/timezone`,
    body: {
      ...timezoneBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function mockForLogin({
  mockAuthzProfile = true,
  mockExtensionInfo = true,
  mockForwardingNumber = true,
  mockMessageSync = true,
  mockConferencing = true,
  mockActiveCalls = true,
  mockUpdateConference = true,
  mockNumberParser = true,
  mockRecentActivity = true,
  mockMessageSyncOnce = false,
  mockVideoConfiguration = true,
  mockUserSetting = true,
  ...params
} = {}) {
  authentication();
  logout();
  tokenRefresh();
  presence('~');
  dialingPlan(params.dialingPlanData);
  if (mockExtensionInfo) {
    extensionInfo(params.extensionInfoData);
  }
  accountInfo(params.accountInfoData);
  apiInfo(params.apiInfoData);
  if (mockAuthzProfile) {
    authzProfile(params.authzProfileData);
  }
  device(params.deviceData);
  extensionList(params.extensionListData);
  companyContactList(params.extensionsListData);
  // accountPhoneNumber(params.accountPhoneNumberData);
  blockedNumber(params.blockedNumberData);
  if (mockForwardingNumber) {
    forwardingNumber(params.forwardingNumberData);
  }
  messageList(params.messageListData);

  if (mockMessageSync) {
    messageSync(params.messageSyncData, mockMessageSyncOnce);
  }
  phoneNumber(params.phoneNumberData);
  callerId(params.callerIdData);
  subscription(params.subscriptionData);
  callLog(params.callLogData);
  addressBook(params.addressBookData);
  sipProvision(params.sipProvisionData);
  fetchDL(params.fetchDLData);
  if (mockConferencing) {
    conferencing(params.conferencingData);
  }
  if (mockActiveCalls) {
    activeCalls(params.activeCallsData);
  }
  if (mockNumberParser) {
    numberParser(params.numberParseData, params.numberParseIsOnce);
  }
  if (mockUpdateConference) {
    conferenceCall();
    updateConferenceCall(updateConferenceCallBody.id, updateConferenceCallBody);
  }
  if (mockRecentActivity) {
    recentActivity();
  }
  if (mockVideoConfiguration) {
    videoConfiguration();
  }
  videoPreference();
  if (mockUserSetting) {
    userSettings(params.userSettingsData);
  }
  lockedSettings(params.lockedSettingsData);
  features(params.featuresData);
  assistedUsers(params.mockAssistedUsers);
  delegators();
  videoPersonalSettings();
}

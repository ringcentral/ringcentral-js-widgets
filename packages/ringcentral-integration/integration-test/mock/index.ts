import fetchMock from 'fetch-mock';
import WebSocket from 'isomorphic-ws';
import JestWebSocketMock from 'jest-websocket-mock';

import { SDK } from '@ringcentral/sdk';

import { RCV_PREFERENCES_IDS } from '../../modules/RcVideo/videoHelper';
import accountBody from './data/accountInfo.json';
import accountPhoneNumberBody from './data/accountPhoneNumber.json';
import activeCallsBody from './data/activeCalls.json';
import addressBookBody from './data/addressBook.json';
import apiInfoBody from './data/apiInfo.json';
import assistedUsersBody from './data/assistedUsers.json';
import authzProfileBody from './data/authzProfile.json';
import blockedNumberBody from './data/blockedNumber.json';
import callerIdBody from './data/callerId.json';
import callLogBody from './data/callLog.json';
import callLogList from './data/callLogList.json';
import conferenceCallBody from './data/conferenceCall.json';
import conferenceCallBringInBody from './data/conferenceCallBringIn.json';
import conferencingBody from './data/conferencing.json';
import deviceBody from './data/device.json';
import dialingPlanBody from './data/dialingPlan.json';
import dialInNumbersBody from './data/dialInNumbers.json';
import discoveryExternalBody from './data/discoveryExternal.json';
import discoveryInitialBody from './data/discoveryInitial.json';
import extensionListBody from './data/extension.json';
import extensionBody from './data/extensionInfo.json';
import extensionsListBody from './data/extensions.json';
import featuresBody from './data/features.json';
import fetchDLBody from './data/fetchDL.json';
import fetchDLWithNoRecordBody from './data/fetchDLWithNoRecord.json';
import forwardingNumberBody from './data/forwardingNumber.json';
import generateCodeBody from './data/generateCode.json';
import lockedSettingsBody from './data/lockedSettings.json';
import meetingBody from './data/meeting.json';
import meetingInvitationBody from './data/meetingInvitation.json';
import {
  RCV_INVITATION_BODY,
  RCV_INVITATION_START,
  RCV_INVITATION_END,
} from './data/rcvInvitation';
import meetingProviderRcmBody from './data/meetingProviderRcm.json';
import meetingProviderRcvBody from './data/meetingProviderRcv.json';
import messageItemBody from './data/messageItem.json';
import messageListBody from './data/messageList.json';
import messageSyncBody from './data/messageSync.json';
import numberParseBody from './data/numberParse.json';
import numberParserBody from './data/numberParser.json';
import phoneNumberBody from './data/phoneNumber.json';
import postRcvBridgesBody from './data/postRcvBridges.json';
import presenceBody from './data/presence.json';
import rcvMeetingSettingsBody from './data/rcvMeetingSettings.json';
import ringOutBody from './data/ringOut.json';
import serviceInfoBody from './data/serviceInfo.json';
import sipProvisionBody from './data/sipProvision.json';
import smsBody from './data/sms.json';
import subscriptionBody from './data/subscription.json';
import timezoneBody from './data/timezone.json';
import updateConferenceCallBody from './data/updateConference.json';
import userSettingsBody from './data/userSettings.json';
import videoConfigurationBody from './data/videoConfiguration.json';
import videoPersonalSettingsBody from './data/videoPersonalSettings.json';
import meetingPreferenceBody from './data/videoPreference.json';
import wsConnectionDetailsBody from './data/ws/connectionDetails.json';
import wsHeartbeatResponse from './data/ws/heartbeatResponse.json';
import wsSubscriptionResponse from './data/ws/subscriptionResponse.json';
import wsTokenBody from './data/ws/wstoken.json';
import { MockForLoginOptions } from './MockForLoginOptions.interface';

export * from './types';

export const mockWsServer = 'ws://whatever';
export const mockServer = 'http://whatever';
export function createSDK(options = {}) {
  const opts = {
    clientId: 'test key',
    clientSecret: 'test secret',
    server: mockServer,
    Request: fetchMock.constructor.Request,
    Response: fetchMock.constructor.Response,
    Headers: fetchMock.constructor.Headers,
    fetch: (url, opts) =>
      url instanceof fetchMock.constructor.Request
        ? fetchMock.fetchMock(url.url, url) // fetchMock doesn't fully support `Request` type
        : fetchMock.fetchMock(url, opts),
    refreshDelayMs: 1,
    redirectUri: 'http://foo',
    cachePrefix: 'sdkPrefix',
    clearCacheOnRefreshError: false,
    ...options,
  };
  return new SDK(opts);
}

// give you access to the parameters last passed in to fetch
export function lastOptions() {
  return fetchMock.lastOptions();
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
}: {
  method?: any;
  path?: any;
  server?: any;
  url?: any;
  body?: any;
  status?: any;
  statusText?: any;
  headers?: any;
  isOnce?: any;
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

function startWebSocketMockServer() {
  // mock WebSocket server
  const server = new JestWebSocketMock(mockWsServer);
  server.on('connection', (socket) => {
    // type: ConnectionDetails
    socket.send(JSON.stringify(wsConnectionDetailsBody));
    socket.on('message', (message) => {
      const [meta, body] = JSON.parse(message);
      // type: Heartbeat
      if (meta.type === 'Heartbeat') {
        socket.send(
          JSON.stringify([
            {
              ...wsHeartbeatResponse[0],
              ...meta,
            },
            body,
          ]),
        );
      }
      // type: ClientRequest
      else if (meta.type === 'ClientRequest') {
        switch (meta.path) {
          case '/restapi/v1.0/subscription':
            socket.send(JSON.stringify(wsSubscriptionResponse));
            break;
          // TODO: mock more path here
          default:
            console.warn(
              `[WebSocketMockServer] Unmatched ${meta.method || 'GET'} to ${
                meta.path
              }`,
            );
            break;
        }
      }
    });
  });

  // TODO: should find way to change that implementation
  // hook WebSocket
  WebSocket.prototype._onCreated = async () => {
    await server.connected;
  };
  const originalSend = WebSocket.prototype.send;
  WebSocket.prototype.send = async function newSend(...args) {
    await server.connected;
    originalSend.call(this, ...args);
    await server.nextMessage;
  };
}

let wsMockServerStarted = false;
export function wstoken() {
  if (!wsMockServerStarted) {
    startWebSocketMockServer();
    wsMockServerStarted = true;
  }
  mockApi({
    method: 'POST',
    path: '/restapi/oauth/wstoken',
    body: {
      ...wsTokenBody,
      uri: mockWsServer,
    },
    isOnce: false,
  });
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
      scope: 'SMS RCM Foo Boo CallControl TelephonySessions',
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

export function tokenRefresh(failure?: boolean) {
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

export function extensionInfo(mockResponse = {}, extId = '~') {
  mockApi({
    path: `/restapi/v1.0/account/~/extension/${extId}`,
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

export function extensionList(
  mockResponse = {},
  extraParams = {},
  isEmptyRes = false,
) {
  let query = '';
  // eslint-disable-next-line guard-for-in
  for (const key in extraParams) {
    query = query.concat(`${key}=${extraParams[key]}`);
  }
  mockApi({
    url: `begin:${mockServer}/restapi/v1.0/account/~/extension?${query}`,
    body: isEmptyRes
      ? {}
      : {
          ...extensionListBody,
          ...mockResponse,
        },
    isOnce: false,
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

export function userSettings(mockResponse = {}, extensionId = '~') {
  mockApi({
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/account/~/extension/${extensionId}/meeting/user-settings`,
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

export function delegators(mockResponse) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/rcvideo/v1/accounts/~/extensions/~/delegators`,
    body: mockResponse || [],
    isOnce: false,
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

export function meetingInvitation({
  status,
  meetingId = null,
  mockResponse = {},
  extraParams = {
    language: 'en-US',
  },
}: any = {}) {
  const id = meetingId || meetingBody.id;
  let query = '';
  // eslint-disable-next-line guard-for-in
  for (const key in extraParams) {
    query = query.concat(`${key}=${extraParams[key]}`);
  }

  mockApi({
    status,
    method: 'GET',
    url: `${mockServer}/restapi/v1.0/account/~/extension/~/meeting/${id}/invitation?${query}`,
    body: {
      ...meetingInvitationBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function rcvInvitation(mockInvitation = RCV_INVITATION_BODY) {
  mockApi({
    method: 'POST',
    url: `${mockServer}/restapi/v1.0/uns/render-document`,
    body: new Blob([RCV_INVITATION_START, mockInvitation, RCV_INVITATION_END]),
    isOnce: false,
  });
}
export function meetingInfo(
  meetingId: string = null,
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

export function videoPreference(extensionId = '~', mockResponse?: any[]) {
  const query = `id=${RCV_PREFERENCES_IDS.join('&id=')}`;
  mockApi({
    method: 'GET',
    url: `${mockServer}/rcvideo/v1/account/${accountBody.id}/extension/${extensionId}/preferences?${query}`,
    body: mockResponse || meetingPreferenceBody,
    isOnce: false,
  });
}

export function videoPersonalSettings(
  extensionId: number | string = extensionBody.id,
  mockResponse = {},
) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/rcvideo/v1/bridges?default=true&accountId=${accountBody.id}&extensionId=${extensionId}`,
    body: { ...videoPersonalSettingsBody, ...mockResponse },
    isOnce: false,
  });
}

export function getRcvMeetingInfo(
  shortId: string,
  extensionId: number | string = extensionBody.id,
  mockResponse = {},
  isOnce = false,
) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/rcvideo/v1/bridges?shortId=${shortId}&accountId=${accountBody.id}&extensionId=${extensionId}`,
    body: {
      ...rcvMeetingSettingsBody,
      ...mockResponse,
    },
    isOnce,
  });
}

export function patchRcvMeeting(meetingId: string, mockResponse = {}) {
  mockApi({
    method: 'PATCH',
    url: `${mockServer}/rcvideo/v1/bridges/${meetingId}`,
    body: { ...rcvMeetingSettingsBody, ...mockResponse },
    isOnce: false,
  });
}

export function postRcvBridges(mockResponse = {}, isOnce = false) {
  mockApi({
    method: 'POST',
    url: `${mockServer}/rcvideo/v1/bridges`,
    body: {
      ...postRcvBridgesBody,
      ...mockResponse,
    },
    isOnce,
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
      ...callLogList,
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

export function features(mockResponse = {}) {
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

export function dialInNumbers(mockResponse = {}) {
  mockApi({
    method: 'GET',
    url: `${mockServer}/rcvideo/v1/dial-in-numbers`,
    body: {
      ...dialInNumbersBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function discoveryInitial(mockResponse = {}) {
  mockApi({
    url: `begin:${mockServer}/.well-known/entry-points/initial`,
    body: {
      ...discoveryInitialBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function discoveryExternal(mockResponse = {}) {
  mockApi({
    path: `/.well-known/entry-points/external`,
    body: {
      ...discoveryExternalBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

export function generateCode(mockResponse = {}) {
  mockApi({
    method: 'POST',
    url: `${mockServer}/restapi/v1.0/interop/generate-code`,
    body: {
      ...generateCodeBody,
      ...mockResponse,
    },
    isOnce: false,
  });
}

interface MockStopRecordErrorProps {
  sessionId?: string;
  recordingId?: string;
  partyId?: string;
  status?: number;
}

// TODO: generate this mock function
export function MockStopRecordError({
  sessionId,
  recordingId,
  partyId,
  status = 403,
}: MockStopRecordErrorProps) {
  mockApi({
    path: `/restapi/v1.0/account/~/telephony/sessions/${sessionId}/parties/${partyId}/recordings/${recordingId}`,
    method: 'PATCH',
    body: {
      errorCode: 'TAS-115',
      message: 'ACR mute is not supported for this call',
    },
    isOnce: false,
    status,
  });
}

export function mockForLogin({
  mockWsServer = true,
  mockTimezone = false,
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
  mockGenerateCode = false,
  phoneNumberData = {},
  dialingPlanData,
  extensionInfoData,
  accountInfoData,
  apiInfoData,
  authzProfileData,
  deviceData,
  extensionListData,
  extensionListQuery,
  isExtensionListEmptyRes,
  extensionsListData,
  blockedNumberData,
  forwardingNumberData,
  messageListData,
  messageSyncData,
  callerIdData,
  subscriptionData,
  callLogData,
  addressBookData,
  sipProvisionData,
  fetchDLData,
  conferencingData,
  activeCallsData,
  numberParseData,
  numberParseIsOnce,
  userSettingsData,
  lockedSettingsData,
  featuresData,
  mockAssistedUsers,
  mockDelegators,
}: MockForLoginOptions = {}) {
  discoveryInitial();
  discoveryExternal();

  if (mockWsServer) wstoken();

  authentication();
  logout();
  tokenRefresh();
  presence('~');
  dialingPlan(dialingPlanData);
  if (mockExtensionInfo) {
    extensionInfo(extensionInfoData);
  }
  if (mockTimezone) {
    timezone();
  }
  accountInfo(accountInfoData);
  apiInfo(apiInfoData);
  if (mockAuthzProfile) {
    authzProfile(authzProfileData);
  }
  device(deviceData);
  extensionList(extensionListData, extensionListQuery, isExtensionListEmptyRes);
  companyContactList(extensionsListData);
  // accountPhoneNumber(accountPhoneNumberData);
  blockedNumber(blockedNumberData);
  if (mockForwardingNumber) {
    forwardingNumber(forwardingNumberData);
  }
  messageList(messageListData);

  if (mockMessageSync) {
    messageSync(messageSyncData, mockMessageSyncOnce);
  }
  phoneNumber(phoneNumberData);
  callerId(callerIdData);
  subscription(subscriptionData);
  callLog(callLogData);
  addressBook(addressBookData);
  sipProvision(sipProvisionData);
  fetchDL(fetchDLData);
  dialInNumbers(fetchDLData);
  if (mockConferencing) {
    conferencing(conferencingData);
  }
  if (mockActiveCalls) {
    activeCalls(activeCallsData);
  }
  if (mockNumberParser) {
    numberParser(numberParseData, numberParseIsOnce);
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
    userSettings(userSettingsData);
  }
  lockedSettings(lockedSettingsData);
  features(featuresData);
  assistedUsers(mockAssistedUsers);
  delegators(mockDelegators);
  videoPersonalSettings();
  if (mockGenerateCode) {
    generateCode();
  }
}

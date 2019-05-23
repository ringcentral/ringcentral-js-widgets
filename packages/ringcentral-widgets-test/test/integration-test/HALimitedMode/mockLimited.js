import {
  mockLimited,
  mockApi,
  mockServer,
} from 'ringcentral-integration/integration-test/mock';

const contentType = { 'Content-Type': 'application/json' };

export class HAMocks {
  static numberParser() {
    mockLimited({
      method: 'POST',
      path: `begin:${mockServer}/restapi/v1.0/number-parser/`,
      headers: {
        retryAfter: 1000,
        ...contentType,
      },
      isOnce: false,
    });
  }

  static checkStatus() {
    mockApi({
      method: 'GET',
      path: '/restapi/v1.0/status',
      status: 200,
      isOnce: false,
    });
  }

  /**
   * Mock limited status check API
   */
  static limitedStatus() {
    mockLimited({
      method: 'GET',
      path: '/restapi/v1.0/status',
      headers: {
        ...contentType,
      },
      isOnce: false,
    });
  }

  static sendSMS() {
    mockLimited({
      method: 'POST',
      path: '/restapi/v1.0/account/~/extension/~/sms',
      headers: {
        retryAfter: 1000,
        ...contentType,
      },
      isOnce: false,
    });
  }

  static changePresence(id = '~') {
    mockLimited({
      path: `/restapi/v1.0/account/~/extension/${id}/presence`,
      method: 'PUT',
      headers: {
        ...contentType,
      },
      isOnce: false,
    });
  }
}

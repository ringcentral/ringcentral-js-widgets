import {
  mockLimited,
  mockApi,
  mockServer,
} from 'ringcentral-integration/integration-test/mock';

const contentType = { 'Content-Type': 'application/json' };

function generateRetryAfter(retryAfter) {
  const retryAfterHeader = !retryAfter ? {} : { 'Retry-After': retryAfter };
  return retryAfterHeader;
}

export class HAMocks {
  static numberParser(retryAfter) {
    const retryAfterHeader = generateRetryAfter(retryAfter);

    mockLimited({
      method: 'POST',
      path: `begin:${mockServer}/restapi/v1.0/number-parser/`,
      headers: {
        ...contentType,
        ...retryAfterHeader,
      },
      isOnce: false,
    });
  }

  static checkStatus(retryAfter) {
    const retryAfterHeader = generateRetryAfter(retryAfter);

    mockApi({
      method: 'GET',
      path: '/restapi/v1.0/status',
      headers: {
        ...contentType,
        ...retryAfterHeader,
      },
      status: 200,
      isOnce: false,
    });
  }

  /**
   * Mock limited status check API
   */
  static limitedStatus(retryAfter) {
    const retryAfterHeader = generateRetryAfter(retryAfter);

    mockLimited({
      method: 'GET',
      path: '/restapi/v1.0/status',
      headers: {
        ...contentType,
        ...retryAfterHeader,
      },
      isOnce: false,
    });
  }

  static sendSMS(retryAfter) {
    const retryAfterHeader = generateRetryAfter(retryAfter);

    mockLimited({
      method: 'POST',
      path: '/restapi/v1.0/account/~/extension/~/sms',
      headers: {
        ...contentType,
        ...retryAfterHeader,
      },
      isOnce: false,
    });
  }

  /**
   * Mock retry-after
   * @param {*} id
   * @param {*} retryAfter type number, unit seconds
   */
  static changePresence(id = '~', retryAfter) {
    const retryAfterHeader = !retryAfter ? {} : { 'Retry-After': retryAfter };

    mockLimited({
      path: `/restapi/v1.0/account/~/extension/${id}/presence`,
      method: 'PUT',
      headers: {
        ...contentType,
        ...retryAfterHeader,
      },
      isOnce: false,
    });
  }
}

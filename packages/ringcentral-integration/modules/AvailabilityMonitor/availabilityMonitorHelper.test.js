import chai, { expect } from 'chai';
import {
  extractUrl,
  isHAError,
  generateRandomNumber,
  isHAEnabledAPI,
} from './availabilityMonitorHelper';
import { isIterable } from 'core-js';

describe('availabilityMonitorHelper', () => {
  describe('extractUrl', () => {
    it('should return filtered url when url contains ?', () => {
      const url =
        'https://api-xmnup.lab.nordigy.ru/restapi/v1.0/account/~/dialing-plan?perPage=MAX&page=1';
      expect(extractUrl({ url })).to.equal(
        '/restapi/v1.0/account/~/dialing-plan',
      );
    });

    it('should return filtered url when url not contains ?', () => {
      const url =
        'https://api-xmnup.lab.nordigy.ru/restapi/v1.0/account/~/dialing-plan';
      expect(extractUrl({ url })).to.equal(
        '/restapi/v1.0/account/~/dialing-plan',
      );
    });

    it('should return "" when url not contains ?', () => {
      const url = '';
      expect(extractUrl({ url })).to.equal('');
    });
  });

  describe('Check if response is HA Error', () => {
    // Test(s) for `isHAError`
    it('Test HA error, return true when HA Status & HA Code are all OK', () => {
      const haErrorCode = 'CMN-211';
      const error = {
        apiResponse: {
          _response: {
            status: 503,
          },
          _json: {
            errorCode: haErrorCode,
            errors: [haErrorCode],
          },
        },
      };

      expect(isHAError(error)).to.equal(true);
    });

    // Test(s) for `isHAError`
    it('Test HA error, return false when HA Status & HA code is not OK', () => {
      const haErrorCode = 'NOT-CMN-211';
      const haErrorStatus = 503;

      const error = {
        apiResponse: {
          _response: {
            status: haErrorStatus,
          },
          _json: {
            errorCode: haErrorCode,
            errors: [haErrorCode],
          },
        },
      };

      expect(isHAError(error)).to.equal(false);
    });

    // Test(s) for `isHAError`
    it('Test HA error, return false when HA status is not OK HA code is OK', () => {
      const haErrorCode = 'NOT-CMN-211';
      const haErrorStatus = 503;

      const error = {
        apiResponse: {
          _response: {
            status: haErrorStatus,
          },
          _json: {
            errorCode: haErrorCode,
            errors: [haErrorCode],
          },
        },
      };

      expect(isHAError(error)).to.equal(false);
    });

    // Test(s) for `isHAError`
    it('Test HA error, return false when HA status & HA code are all not OK', () => {
      const haErrorCode = 'NOT-CMN-211';
      const haErrorStatus = 200;

      const error = {
        apiResponse: {
          _response: {
            status: haErrorStatus,
          },
          _json: {
            errorCode: haErrorCode,
            errors: [haErrorCode],
          },
        },
      };

      expect(isHAError(error)).to.equal(false);
    });
  });

  describe('Generate random number', () => {
    it('Test generate random time between 0 ~ 3000 seconds', () => {
      const randomTime = generateRandomNumber();

      expect(randomTime).to.gte(0);
      expect(randomTime).to.lt(3000);

      const randomTime2 = generateRandomNumber();

      expect(randomTime2).to.gte(0);
      expect(randomTime2).to.lt(3000);

      const randomTime3 = generateRandomNumber();

      expect(randomTime3).to.gte(0);
      expect(randomTime3).to.lt(3000);
    });
  });

  describe('Check if an api is *High* or *Limited*', () => {
    it('Check if an api is *High* or *Limited*', () => {
      let testUrl = '/restapi/v1.0/internal/adg/extension/~';
      let isHigh = isHAEnabledAPI({ url: testUrl, method: 'GET' });
      expect(isHigh).to.equal(true);

      testUrl = '/restapi/v1.0/internal/billing-events/process-event';
      isHigh = isHAEnabledAPI({ url: '/restapi/v1.0/internal/billing-events/process-event', method: 'POST' });
      expect(isHigh).to.equal(false);

      testUrl = 'www.apple.com';
      isHigh = isHAEnabledAPI({ url: testUrl, method: 'GET' });
      expect(isHigh).to.equal(false);
    });
  });
});

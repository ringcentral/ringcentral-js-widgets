import { Subject } from 'rxjs';

import { CallerId } from '../../../src/app/services/CallerId';

const callerIdEndpoint = '/restapi/v1.0/account/~/extension/~/caller-id';

const createCallerId = ({
  byFeature = [],
  features = {},
}: {
  byFeature?: CallerId['byFeature'];
  features?: Record<string, { available: boolean }>;
} = {}) => {
  const callerId = Object.create(CallerId.prototype);

  Object.defineProperty(callerId, 'byFeature', {
    value: byFeature,
  });
  Object.defineProperty(callerId, '_extensionFeatures', {
    value: {
      features,
    },
  });

  return callerId as CallerId;
};

const createCallerIdWithData = (data: CallerId['data']) => {
  const callerId = Object.create(CallerId.prototype);

  Object.defineProperty(callerId, 'data', {
    value: data,
  });

  return callerId as CallerId;
};

describe('CallerId', () => {
  describe('defaultCallerId', () => {
    test('uses configured feature fallback order', () => {
      const callerId = createCallerId({
        byFeature: [
          {
            feature: 'Alternate',
            callerId: {
              type: 'PhoneNumber',
              phoneInfo: { phoneNumber: '+16505550105' },
            },
          },
          {
            feature: 'RingOut',
            callerId: {},
          },
          {
            feature: 'MobileApp',
            callerId: {
              type: 'PhoneNumber',
              phoneInfo: { phoneNumber: '+16505550103' },
            },
          },
          {
            feature: 'AdditionalSoftphone',
            callerId: {
              type: 'PhoneNumber',
              phoneInfo: { phoneNumber: '+16505550102' },
            },
          },
        ],
      });

      expect(callerId.defaultCallerId?.phoneInfo?.phoneNumber).toBe(
        '+16505550102',
      );
    });

    test('uses any set feature as final fallback', () => {
      const callerId = createCallerId({
        byFeature: [
          {
            feature: 'FaxNumber',
            callerId: {
              type: 'PhoneNumber',
              phoneInfo: { phoneNumber: '+16505550106' },
            },
          },
        ],
      });

      expect(callerId.defaultCallerId?.phoneInfo?.phoneNumber).toBe(
        '+16505550106',
      );
    });

    test('skips blocked caller id when blocked fallback is disabled', () => {
      const callerId = createCallerId({
        byFeature: [
          {
            feature: 'RingOut',
            callerId: {
              type: 'Blocked',
            },
          },
          {
            feature: 'AdditionalSoftphone',
            callerId: {
              type: 'PhoneNumber',
              phoneInfo: { phoneNumber: '+16505550102' },
            },
          },
        ],
      });

      expect(
        callerId.getDefaultCallerId({
          includeBlocked: false,
        })?.phoneInfo?.phoneNumber,
      ).toBe('+16505550102');
    });

    test('reads caller ID data through derived getters', () => {
      const byDevice = [
        {
          device: {
            id: 'device-1',
          },
        },
      ];
      const byFeature = [
        {
          feature: 'RingOut',
          callerId: {
            type: 'PhoneNumber',
            phoneInfo: {
              phoneNumber: '+16505550101',
            },
          },
        },
        {
          feature: 'FaxNumber',
          callerId: {
            type: 'PhoneNumber',
            phoneInfo: {
              phoneNumber: '+16505550199',
            },
          },
        },
        {
          feature: 'Alternate',
          callerId: {
            type: 'PhoneNumber',
            phoneInfo: {
              uri: '/restapi/v1.0/account/~/phone-number/123',
            },
          },
        },
      ];
      const callerId = createCallerIdWithData({
        byDevice,
        byFeature,
      } as CallerId['data']);

      expect(callerId.byDevice).toEqual(byDevice);
      expect(callerId.byFeature).toEqual(byFeature);
      expect(callerId.ringOut?.phoneInfo?.phoneNumber).toBe('+16505550101');
      expect(callerId.faxNumber).toBe('+16505550199');
      expect(
        callerId.getDefaultCallerId({
          features: ['Alternate'],
        })?.phoneInfo?.uri,
      ).toBe('/restapi/v1.0/account/~/phone-number/123');
    });
  });

  describe('permissions', () => {
    test('registers caller ID data source and fetches caller ID data', async () => {
      const response = {
        byFeature: [],
      };
      const get = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(response),
      });
      const dataFetcher = {
        getData: jest.fn(() => null),
        ready$: new Subject<void>(),
        register: jest.fn(),
      };
      const extensionFeatures = {
        ready: true,
        features: {
          ReadOutboundCallerId: {
            available: true,
          },
        },
      };

      new CallerId(
        {
          service: {
            platform: () => ({
              get,
            }),
          },
        } as any,
        extensionFeatures as any,
        dataFetcher as any,
      );

      const source = dataFetcher.register.mock.calls[0][0];

      expect(source.key).toBe('callerId');
      expect(source.cleanOnReset).toBe(true);
      expect(source.readyCheckFunction()).toBe(true);
      expect(source.permissionCheckFunction()).toBe(true);
      await expect(source.fetchFunction()).resolves.toBe(response);
      expect(get).toHaveBeenCalledWith(callerIdEndpoint);
    });

    test('checks read access from extension features', () => {
      const callerId = createCallerId({
        features: {
          ReadOutboundCallerId: { available: true },
        },
      });

      expect(callerId.hasReadAccess).toBe(true);
    });

    test('checks write access from extension features', () => {
      const callerId = createCallerId({
        features: {
          EditOutboundCallerId: { available: true },
        },
      });

      expect(callerId.hasWriteAccess).toBe(true);
    });

    test('blocks default caller ID update without write access', async () => {
      const put = jest.fn();
      const callerId = createCallerId();

      Object.defineProperty(callerId, '_client', {
        value: {
          service: {
            platform: () => ({
              put,
            }),
          },
        },
      });

      await expect(
        callerId.setDefaultCallerId('123', 'FaxNumber'),
      ).rejects.toThrow('No permission to edit outbound caller ID');
      expect(put).not.toHaveBeenCalled();
    });

    test('updates default caller ID with write access', async () => {
      const response = { byFeature: [] };
      const put = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(response),
        }),
      );
      const callerId = createCallerId({
        features: {
          EditOutboundCallerId: { available: true },
        },
      });
      callerId.updateData = jest.fn();

      Object.defineProperty(callerId, '_client', {
        value: {
          service: {
            platform: () => ({
              put,
            }),
          },
        },
      });

      await callerId.setDefaultCallerId('123', 'FaxNumber');

      expect(put).toHaveBeenCalledWith(callerIdEndpoint, {
        byFeature: [
          {
            feature: 'FaxNumber',
            callerId: { phoneInfo: { id: '123' } },
          },
        ],
      });
      expect(callerId.updateData).toHaveBeenCalledWith(response);
    });

    test('updates default caller ID with blocked caller ID payload', async () => {
      const response = { byFeature: [] };
      const put = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(response),
        }),
      );
      const callerId = createCallerId({
        features: {
          EditOutboundCallerId: { available: true },
        },
      });
      callerId.updateData = jest.fn();

      Object.defineProperty(callerId, '_client', {
        value: {
          service: {
            platform: () => ({
              put,
            }),
          },
        },
      });

      await callerId.setDefaultCallerId('0', 'RingOut');

      expect(put).toHaveBeenCalledWith(callerIdEndpoint, {
        byFeature: [
          {
            feature: 'RingOut',
            callerId: { type: 'Blocked' },
          },
        ],
      });
      expect(callerId.updateData).toHaveBeenCalledWith(response);
    });
  });
});

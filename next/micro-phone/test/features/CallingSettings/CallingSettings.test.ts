import { DriverType } from '@ringcentral-integration/next-core';

import { callingModes } from '../../../src/app/services/CallingSettings/callingModes';
import { callingOptions } from '../../../src/app/services/CallingSettings/callingOptions';
import {
  BLOCKED_ID_VALUE,
  CallingSettings,
} from '../../../src/app/services/CallingSettings/CallingSettings';

const callerIdNumbers = [
  {
    id: 101,
    uri: 'https://platform.ringcentral.com/restapi/v1.0/account/~/phone-number/101',
    phoneNumber: '+16505550101',
    usageType: 'DirectNumber',
    features: ['CallerId'],
  },
  {
    id: 102,
    uri: 'https://platform.ringcentral.com/restapi/v1.0/account/~/phone-number/102',
    phoneNumber: '+16505550102',
    usageType: 'MainCompanyNumber',
    features: ['CallerId'],
  },
];

type CallerIdValue = {
  type?: string;
  phoneInfo?: {
    id?: string;
    uri?: string;
    phoneNumber?: string;
  };
};

const createCallingSettingsModule = ({
  resolvedCallerId,
  isBlockedIdDisabled = false,
  fromNumber = null,
  appFeatures = {},
  extensionPhoneNumber = {},
  forwardingNumber = {},
  extensionDevice = {},
  extensionInfo = {},
  storage = {},
  webphone = {},
  softphone = {},
}: {
  resolvedCallerId?: CallerIdValue;
  isBlockedIdDisabled?: boolean;
  fromNumber?: string | null;
  appFeatures?: Record<string, unknown>;
  extensionPhoneNumber?: Record<string, unknown>;
  forwardingNumber?: Record<string, unknown>;
  extensionDevice?: Record<string, unknown>;
  extensionInfo?: Record<string, unknown>;
  storage?: Record<string, unknown>;
  webphone?: Record<string, unknown> | null;
  softphone?: Record<string, unknown> | null;
}) => {
  const module = Object.assign(Object.create(CallingSettings.prototype), {
    data: {
      callWith: null,
      ringoutPrompt: true,
      myLocation: '',
      timestamp: null,
      fromNumber,
      isCustomLocation: false,
    },
    initRingoutPrompt: false,
    _showCallWithJupiter: true,
    logger: {
      info: jest.fn(),
      warn: jest.fn(),
    },
    _appFeatures: {
      isCallingEnabled: true,
      isRingOutEnabled: true,
      isWebPhoneEnabled: true,
      isSoftphoneEnabled: true,
      isRingCentralAppEnabled: true,
      ...appFeatures,
    },
    _brand: {},
    _extensionDevice: {
      devices: [],
      ...extensionDevice,
    },
    _extensionFeatures: {
      features: {
        BlockingCallerId: {
          available: !isBlockedIdDisabled,
        },
      },
    },
    _extensionInfo: {
      extensionNumber: '101',
      ...extensionInfo,
    },
    _extensionPhoneNumber: {
      callerIdNumbers,
      directNumbers: [],
      mainCompanyNumber: null,
      numbers: callerIdNumbers,
      ...extensionPhoneNumber,
    },
    _forwardingNumber: {
      flipNumbers: [],
      ...forwardingNumber,
    },
    _softphone: softphone,
    _storage: {
      driver: DriverType.LocalStorage,
      ...storage,
    },
    _webphone: webphone,
    _callerId: {
      byFeature: [],
      getDefaultCallerIdWithFeature: jest.fn(() =>
        resolvedCallerId
          ? {
              feature: 'AdditionalSoftphone',
              callerId: resolvedCallerId,
            }
          : undefined,
      ),
    },
  });

  module.updateFromNumber = jest.fn(
    async (number: { phoneNumber?: string }) => {
      module.data.fromNumber = number?.phoneNumber ?? null;
    },
  );

  return module;
};

describe('CallingSettings', () => {
  describe('_initFromNumber', () => {
    test('uses default caller id matched by id', async () => {
      const module = createCallingSettingsModule({
        resolvedCallerId: {
          type: 'PhoneNumber',
          phoneInfo: {
            id: '102',
          },
        },
      });

      await CallingSettings.prototype._initFromNumber.call(module);

      expect(module.updateFromNumber).toHaveBeenCalledWith(callerIdNumbers[1]);
      expect(module.data.fromNumber).toBe('+16505550102');
    });

    test('requests non-blocked caller id when blocked caller id is disabled', async () => {
      const module = createCallingSettingsModule({
        resolvedCallerId: {
          type: 'PhoneNumber',
          phoneInfo: {
            id: '102',
          },
        },
        isBlockedIdDisabled: true,
      });

      await CallingSettings.prototype._initFromNumber.call(module);

      expect(
        module._callerId.getDefaultCallerIdWithFeature,
      ).toHaveBeenCalledWith({
        includeBlocked: false,
      });
      expect(module.updateFromNumber).toHaveBeenCalledWith(callerIdNumbers[1]);
      expect(module.data.fromNumber).toBe('+16505550102');
    });

    test('uses blocked caller id when blocked caller id is selectable', async () => {
      const module = createCallingSettingsModule({
        resolvedCallerId: {
          type: 'Blocked',
        },
      });

      await CallingSettings.prototype._initFromNumber.call(module);

      expect(module.updateFromNumber).toHaveBeenCalledWith({
        phoneNumber: BLOCKED_ID_VALUE,
      });
      expect(module.logger.info).toHaveBeenCalledWith(
        'default caller ID resolved to blocked',
        expect.objectContaining({
          selectedFromNumber: {
            phoneNumber: BLOCKED_ID_VALUE,
          },
        }),
      );
    });

    test.each([
      [
        'uri',
        {
          uri: callerIdNumbers[0].uri,
        },
        callerIdNumbers[0],
      ],
      [
        'phoneNumber',
        {
          phoneNumber: callerIdNumbers[1].phoneNumber,
        },
        callerIdNumbers[1],
      ],
    ])(
      'uses default caller id matched by %s',
      async (_matchedBy, phoneInfo, expectedNumber) => {
        const module = createCallingSettingsModule({
          resolvedCallerId: {
            type: 'PhoneNumber',
            phoneInfo,
          },
        });

        await CallingSettings.prototype._initFromNumber.call(module);

        expect(module.updateFromNumber).toHaveBeenCalledWith(expectedNumber);
        expect(module.logger.info).toHaveBeenCalledWith(
          'default caller ID matched from number',
          expect.objectContaining({
            selectedFromNumber: expect.objectContaining({
              id: expectedNumber.id,
            }),
          }),
        );
      },
    );

    test('logs warning when no default caller id is configured', async () => {
      const module = createCallingSettingsModule({});
      module._callerId.byFeature = [
        {
          feature: 'RingOut',
          callerId: {
            type: 'PhoneNumber',
            phoneInfo: {
              id: '101',
            },
          },
        },
      ];

      await CallingSettings.prototype._initFromNumber.call(module);

      expect(module.logger.warn).toHaveBeenCalledWith(
        'no configured default caller ID found; using first from number',
        expect.objectContaining({
          callerIdByFeature: [
            expect.objectContaining({
              feature: 'RingOut',
            }),
          ],
          fallbackFromNumber: expect.objectContaining({
            id: 101,
          }),
        }),
      );
      expect(module.updateFromNumber).toHaveBeenCalledWith(callerIdNumbers[0]);
    });

    test('logs warning when default caller id is not in available from numbers', async () => {
      const module = createCallingSettingsModule({
        resolvedCallerId: {
          type: 'PhoneNumber',
          phoneInfo: {
            id: '999',
          },
        },
      });

      await CallingSettings.prototype._initFromNumber.call(module);

      expect(module.logger.warn).toHaveBeenCalledWith(
        'default caller ID not available in from number list; using first from number',
        expect.objectContaining({
          callerIdFeature: 'AdditionalSoftphone',
          fallbackFromNumber: expect.objectContaining({
            id: 101,
          }),
        }),
      );
      expect(module.updateFromNumber).toHaveBeenCalledWith(callerIdNumbers[0]);
    });

    test('keeps existing from number unless blocked caller id becomes disabled', async () => {
      const existingModule = createCallingSettingsModule({
        fromNumber: '+16505550999',
      });

      await CallingSettings.prototype._initFromNumber.call(existingModule);

      expect(existingModule.updateFromNumber).not.toHaveBeenCalled();

      const blockedModule = createCallingSettingsModule({
        fromNumber: BLOCKED_ID_VALUE,
        isBlockedIdDisabled: true,
      });

      await CallingSettings.prototype._initFromNumber.call(blockedModule);

      expect(blockedModule.updateFromNumber).toHaveBeenCalledWith(
        callerIdNumbers[0],
      );
    });
  });

  describe('phone number and calling option getters', () => {
    test('builds phone number lists and location labels from extension data', () => {
      const module = createCallingSettingsModule({
        extensionDevice: {
          devices: [
            {
              name: 'Desk Phone',
              phoneLines: [
                {
                  phoneInfo: {
                    phoneNumber: '+16505550103',
                  },
                },
              ],
            },
          ],
        },
        extensionInfo: {
          extensionNumber: '123',
        },
        extensionPhoneNumber: {
          callerIdNumbers: [
            {
              phoneNumber: '+16505550105',
              usageType: 'CompanyNumber',
            },
            {
              phoneNumber: '+16505550101',
              usageType: 'DirectNumber',
            },
            {
              phoneNumber: '+16505550102',
              usageType: 'MainCompanyNumber',
            },
          ],
          directNumbers: [
            {
              phoneNumber: '+16505550101',
            },
            {
              phoneNumber: '+16505550103',
            },
          ],
          mainCompanyNumber: {
            phoneNumber: '+16505550102',
          },
          numbers: callerIdNumbers,
        },
        forwardingNumber: {
          flipNumbers: [
            {
              label: 'Other',
              phoneNumber: '+16505550105',
            },
            {
              label: 'Mobile',
              phoneNumber: '+16505550104',
            },
            {
              label: 'Ignored direct',
              phoneNumber: '+16505550101',
            },
          ],
        },
      });

      expect(module.myPhoneNumbers).toEqual([
        '+16505550101',
        '+16505550103',
        '+16505550102*123',
      ]);
      expect(module.otherPhoneNumbers).toEqual(['+16505550104']);
      expect(module.availableNumbers).toEqual([
        '+16505550101',
        '+16505550103',
        '+16505550102*123',
        '+16505550104',
      ]);
      expect(module.availableNumbersWithLabel).toEqual(
        expect.arrayContaining([
          {
            label: 'Desk Phone',
            value: '+16505550103',
          },
          {
            label: 'Main',
            value: '+16505550102*123',
          },
          {
            label: 'Mobile',
            value: '+16505550104',
          },
        ]),
      );
      expect(
        module.fromNumbers.map((item: { usageType: string }) => item.usageType),
      ).toEqual(['DirectNumber', 'MainCompanyNumber', 'CompanyNumber']);
      expect(module._getLocationLabel('+16505550103')).toBe('Desk Phone');
      expect(module._getLocationLabel('+16505550104')).toBe('Mobile');
      expect(module._getLocationLabel('+16505550102*123')).toBe('Main');
      expect(module._getLocationLabel('+16505550999')).toBe('Other');
    });

    test('filters call-with options and exposes mode-derived getters', () => {
      const module = createCallingSettingsModule({
        appFeatures: {
          isRingOutEnabled: true,
          isRingCentralAppEnabled: true,
        },
        extensionPhoneNumber: {
          numbers: callerIdNumbers,
        },
        softphone: {
          jupiterAppName: 'RingCentral App',
        },
        storage: {
          driver: DriverType.IndexedDB,
        },
      });

      module.data.callWith = callingOptions.browser;
      module.initRingoutPrompt = true;

      expect(module.callWithOptions).toEqual([
        callingOptions.browser,
        callingOptions.jupiter,
        callingOptions.softphone,
        callingOptions.ringout,
      ]);
      expect(module.callingOptions).toBe(callingOptions);
      expect(module.callingMode).toBe(callingModes.webphone);
      expect(module.defaultRingoutPrompt).toBe(true);
      expect(module.isWebphoneMode).toBe(true);
      expect(module.isChangeRingToneAllowed).toBe(true);
      expect(module.jupiterAppName).toBe('RingCentral App');
      expect(module.isBlockedIdDisabled).toBe(false);

      const softphoneOnlyModule = createCallingSettingsModule({
        extensionPhoneNumber: {
          numbers: [],
        },
      });

      expect(softphoneOnlyModule.callWithOptions).toEqual([
        callingOptions.softphone,
      ]);

      const noCallingOptionModule = createCallingSettingsModule({
        appFeatures: {
          isSoftphoneEnabled: false,
        },
        extensionPhoneNumber: {
          numbers: [],
        },
      });

      expect(noCallingOptionModule.callWithOptions).toEqual([]);
    });
  });
});

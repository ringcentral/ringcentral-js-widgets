import {
  AppFeatures,
  ExtensionFeatures,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { NumberValidate } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Brand,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  PortDetector,
  PortManager,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';

import { ActiveCallControl } from '../ActiveCallControl';
import { callingModes, CallingSettings } from '../CallingSettings';
import { Ringout } from '../Ringout';
import { Softphone } from '../Softphone';

import { Call } from './Call';

function createClientTabPortMocks() {
  const emit = jest.fn().mockResolvedValue([0, undefined]);
  const portDetector = {
    isClient: true,
    lastAction: { sequence: 0 },
    syncFullState: jest.fn().mockResolvedValue(undefined),
    transports: {
      client: {
        emit,
      },
    },
  };
  const portManager = {
    shared: true,
    isClient: true,
    isMainTab: false,
    checkMainTabMapping: new Map(),
    customClientDelegateNameMapping: new Map(),
    onServer: jest.fn(),
    transport: {
      emit: jest.fn(),
    },
  };

  return {
    emit,
    portDetector,
    portManager,
  };
}

describe('make call execution port', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('runs Call.call and Call._makeCall in the current client tab', async () => {
    const { emit, portDetector, portManager } = createClientTabPortMocks();
    const softphone = {
      makeCall: jest.fn().mockResolvedValue({ id: 'local-session' }),
    };

    const app = testBed({
      main: Call,
      modules: [
        { provide: Toast, useValue: { warning: jest.fn(), danger: jest.fn() } },
        { provide: StoragePlugin, useValue: { enable: jest.fn() } },
        {
          provide: Brand,
          useValue: {
            name: 'RingCentral',
            brandConfig: { allowRegionSettings: true },
          },
        },
        { provide: Softphone, useValue: softphone },
        { provide: Ringout, useValue: { makeCall: jest.fn() } },
        {
          provide: RegionSettings,
          useValue: {
            areaCode: '650',
            countryCode: 'US',
            homeCountryId: '1',
          },
        },
        {
          provide: CallingSettings,
          useValue: {
            callingMode: callingModes.softphone,
            isWebphoneMode: false,
            fromNumber: '+16505550100',
            myLocation: '+16505550100',
            ringoutPrompt: false,
          },
        },
        { provide: ExtensionFeatures, useValue: {} },
        { provide: NumberValidate, useValue: {} },
        { provide: AppFeatures, useValue: { isEDPEnabled: false } },
        { provide: PortManager, useValue: portManager },
        { provide: PortDetector, useValue: portDetector },
        { provide: ActiveCallControl, useValue: { makeCall: jest.fn() } },
      ],
    });
    const call = app.instance;

    jest.spyOn(call, 'connectOnServer').mockResolvedValue(true);
    jest.spyOn(call, 'connectSuccessOnServer').mockResolvedValue(undefined);
    jest
      .spyOn(call, 'setLastValidatedToNumberOnServer')
      .mockResolvedValue(undefined);
    jest.spyOn(call, 'connectErrorOnServer').mockResolvedValue(undefined);

    const session = await call.call({
      phoneNumber: '+16505550101',
      recipient: { phoneNumber: '+16505550101' },
      fromNumber: '+16505550100',
    });

    expect(session).toEqual({ id: 'local-session' });
    expect(softphone.makeCall).toHaveBeenCalledWith(
      '+16505550101',
      callingModes.softphone,
    );
    expect(emit).not.toHaveBeenCalled();
  });

  test('runs Softphone.makeCall in the current client tab instead of main client', async () => {
    const { emit, portDetector, portManager } = createClientTabPortMocks();
    const callHandler = jest.fn();

    const app = testBed({
      main: Softphone,
      modules: [
        {
          provide: Brand,
          useValue: {
            brandConfig: {
              allowJupiterUniversalLink: false,
              callWithJupiter: {
                link: 'https://app.example.test/',
                name: 'RingCentral App',
                protocol: 'rcapp://',
              },
              callWithSoftphone: {
                protocol: 'rcmobile://',
              },
            },
          },
        },
        {
          provide: 'SoftphoneOptions',
          useValue: {
            callHandler,
          },
        },
        { provide: PortManager, useValue: portManager },
        { provide: PortDetector, useValue: portDetector },
      ],
    });
    const softphone = app.instance;

    jest.spyOn(softphone, 'startToConnect').mockResolvedValue(undefined);
    jest.spyOn(softphone, 'connectComplete').mockResolvedValue(undefined);

    await softphone.makeCall('+16505550101', callingModes.softphone);

    expect(callHandler).toHaveBeenCalledWith({
      callingMode: callingModes.softphone,
      command: 'call?number=%2B16505550101',
      isJupiterUniversalLink: false,
      phoneNumber: '+16505550101',
      protocol: 'rcmobile://',
      uri: 'rcmobile://call?number=%2B16505550101',
    });
    expect(emit).not.toHaveBeenCalled();
  });
});

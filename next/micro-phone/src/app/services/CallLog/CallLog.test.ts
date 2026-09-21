import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import { callResults } from '@ringcentral-integration/commons/enums/callResults';
import { syncTypes } from '@ringcentral-integration/commons/enums/syncTypes';
import {
  AppFeatures,
  Auth,
  Client,
  ExtensionInfo,
  ExtensionPhoneNumber,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Initiator,
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';

import { CallMonitor } from '../CallMonitor';

import { CallLog } from './CallLog';

describe('CallLog side-loaded calls', () => {
  const systemNow = Date.parse('2026-05-31T00:00:00.000Z');
  const boundInstanceOptions = { bound: true };

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(systemNow);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  function createRecord(
    id: string,
    startTime: number,
    overrides: Record<string, unknown> = {},
  ) {
    return {
      id,
      uri: `https://example.test/${id}`,
      sessionId: `${startTime}${id.length}`,
      telephonySessionId: `${id}-telephony`,
      duration: 60,
      type: 'Voice',
      direction: 'Inbound',
      action: 'VoIP Call',
      result: 'Call connected',
      startTime,
      from: {
        phoneNumber: '+16505550101',
        name: 'Alice',
      },
      to: {
        phoneNumber: '+16505550102',
        name: 'Bob',
      },
      ...overrides,
    } as any;
  }

  function createCallLog(
    options: Record<string, unknown> = {},
    {
      bound,
      callMonitor = {
        getRecentCallDirection: jest.fn(() => undefined),
      },
    }: { bound?: boolean; callMonitor?: Record<string, unknown> } = {},
  ) {
    const storage = {
      enable: jest.fn(),
    };
    const subscription = {
      register: jest.fn(),
      fromMessage$: jest.fn(),
    };
    const auth = {
      loggedIn: true,
      ownerId: 'owner-id',
    };
    const extensionPhoneNumber = {
      numbers: [
        {
          usageType: 'MainCompanyNumber',
          phoneNumber: '+16505550100',
        },
        {
          usageType: 'CompanyFaxNumber',
          phoneNumber: '+16505550199',
        },
      ],
    };
    const appFeatures = {
      hasReadExtensionCallLog: true,
    };
    const callLogOptions = {
      enableSideLoadedCalls: true,
      ...options,
    };

    const callLog = bound
      ? testBed({
          main: CallLog,
          modules: [
            {
              provide: Initiator,
              useValue: { beforeInitialize: jest.fn(), shouldActivate: false },
            },
            { provide: SharedAppOptions, useValue: {} },
            { provide: Auth, useValue: auth },
            { provide: Client, useValue: {} },
            { provide: ExtensionPhoneNumber, useValue: extensionPhoneNumber },
            { provide: ExtensionInfo, useValue: {} },
            { provide: CallMonitor, useValue: callMonitor },
            { provide: 'Subscription', useValue: subscription },
            {
              provide: AppFeatures,
              useValue: appFeatures,
            },
            { provide: StoragePlugin, useValue: storage },
            {
              provide: 'CallLogOptions',
              useValue: callLogOptions,
            },
          ],
          devOptions: {
            autoComputed: true,
          },
        }).instance
      : new CallLog(
          auth as any,
          {} as any,
          extensionPhoneNumber as any,
          {} as any,
          callMonitor as any,
          subscription as any,
          appFeatures as any,
          storage as any,
          callLogOptions,
        );

    return {
      auth,
      callMonitor,
      callLog,
      extensionPhoneNumber,
      storage,
      subscription,
    };
  }

  it('merges side-loaded calls into the final call list without mutating persisted data', () => {
    const { callLog } = createCallLog();
    const realCall = createRecord('real-call', systemNow - 60_000);
    const mockCall = createRecord('mock-call', systemNow);

    callLog.data = {
      list: ['real-call'],
      map: {
        'real-call': realCall,
      },
      token: 'real-token',
      timestamp: systemNow,
    };
    (callLog as any)._sideLoadedData = {
      list: ['mock-call'],
      map: {
        'mock-call': mockCall,
      },
    };

    expect(callLog.data.list).toEqual(['real-call']);
    expect(callLog.calls.map((call) => call.id)).toEqual([
      'mock-call',
      'real-call',
    ]);
  });

  it('clears and ignores side-loaded calls when the capability is disabled', () => {
    const { callLog } = createCallLog({ enableSideLoadedCalls: false });
    const realCall = createRecord('real-call', systemNow - 60_000);
    const mockCall = createRecord('mock-call', systemNow);

    callLog.data = {
      list: ['real-call'],
      map: {
        'real-call': realCall,
      },
      token: 'real-token',
      timestamp: systemNow,
    };
    (callLog as any)._sideLoadedData = {
      list: ['mock-call'],
      map: {
        'mock-call': mockCall,
      },
    };

    expect(callLog.calls.map((call) => call.id)).toEqual(['real-call']);

    (callLog as any)._sideLoadedData = {
      list: [],
      map: {},
    };

    expect(callLog.calls.map((call) => call.id)).toEqual(['real-call']);
  });

  it('updates side-loaded data with action helpers and resets persisted state', () => {
    const { callLog } = createCallLog({}, boundInstanceOptions);
    const persistedCall = createRecord('persisted-call', systemNow - 60_000);
    const sideLoadedCall = createRecord('side-loaded-call', systemNow);

    callLog.data = {
      list: ['persisted-call'],
      map: {
        'persisted-call': persistedCall,
      },
      token: 'sync-token',
      timestamp: systemNow,
    };

    callLog.replaceSideLoadedCalls([
      sideLoadedCall,
      createRecord('', systemNow),
    ]);

    expect((callLog as any)._sideLoadedData).toMatchObject({
      list: ['side-loaded-call'],
      map: {
        'side-loaded-call': {
          id: 'side-loaded-call',
        },
      },
    });
    expect((callLog as any)._sideLoadedData.map['side-loaded-call'].uri).toBe(
      undefined,
    );

    callLog.clearToken();

    expect(callLog.data).toMatchObject({
      list: ['persisted-call'],
      token: null,
      timestamp: null,
    });

    callLog.clearSideLoadedCalls();

    expect((callLog as any)._sideLoadedData).toEqual({
      list: [],
      map: {},
    });

    callLog.resetData();

    expect(callLog.data).toEqual({
      list: [],
      map: {},
      token: null,
      timestamp: null,
    });
  });

  it('filters wrong-direction side-loaded calls before they reach consumers', () => {
    const callMonitor = {
      getRecentCallDirection: jest.fn((sessionId) =>
        sessionId === 'wrong-session' || sessionId === 'matching-session'
          ? callDirection.inbound
          : undefined,
      ),
    };
    const { callLog } = createCallLog({}, { bound: true, callMonitor });
    const wrongDirectionCall = createRecord('wrong-call', systemNow + 1_000, {
      sessionId: 'wrong-session',
      direction: callDirection.outbound,
    });
    const matchingDirectionCall = createRecord(
      'matching-call',
      systemNow + 2_000,
      {
        sessionId: 'matching-session',
        direction: callDirection.inbound,
      },
    );
    const unknownDirectionCall = createRecord(
      'unknown-call',
      systemNow + 3_000,
      {
        sessionId: 'unknown-session',
        direction: callDirection.outbound,
      },
    );

    callLog.replaceSideLoadedCalls([
      wrongDirectionCall,
      matchingDirectionCall,
      unknownDirectionCall,
    ]);

    expect((callLog as any)._sideLoadedData.list).toEqual([
      'matching-call',
      'unknown-call',
    ]);
    expect((callLog as any)._sideLoadedData.map['wrong-call']).toBeUndefined();
    expect(callLog.calls.map((call) => call.id)).toEqual([
      'unknown-call',
      'matching-call',
    ]);
  });

  it('filters expired records and merges sync results with supplements and deletions', () => {
    const { callLog } = createCallLog(
      { enableDeleted: true },
      boundInstanceOptions,
    );
    const freshCall = createRecord(
      'fresh-call',
      Date.parse('2026-05-30T00:00:00.000Z'),
    );
    const expiredCall = createRecord(
      'expired-call',
      Date.parse('2026-05-01T00:00:00.000Z'),
    );

    callLog.data = {
      list: ['fresh-call', 'expired-call'],
      map: {
        'fresh-call': freshCall,
        'expired-call': expiredCall,
      },
      token: 'old-token',
      timestamp: systemNow - 1_000,
    };

    callLog.filterExpiredCalls(7);

    expect(callLog.data.list).toEqual(['fresh-call']);
    expect(callLog.data.map['expired-call']).toBeUndefined();

    callLog.syncSuccess({
      timestamp: systemNow,
      syncToken: 'next-token',
      daySpan: 7,
      records: [
        createRecord('new-call', Date.parse('2026-05-30T12:00:00.000Z')),
        createRecord('deleted-call', Date.parse('2026-05-30T14:00:00.000Z'), {
          deleted: true,
        }),
      ],
      supplementRecords: [
        createRecord('supplement-call', Date.parse('2026-05-30T13:00:00.000Z')),
        createRecord('new-call', Date.parse('2026-05-30T12:00:00.000Z')),
      ],
    });

    expect(callLog.data).toMatchObject({
      list: ['fresh-call', 'new-call', 'supplement-call'],
      token: 'next-token',
      timestamp: systemNow,
    });
    expect(callLog.data.map['new-call']).toMatchObject({
      id: 'new-call',
    });
    expect(callLog.data.map['new-call'].uri).toBeUndefined();
    expect(callLog.data.map['supplement-call']).toMatchObject({
      id: 'supplement-call',
    });
    expect(callLog.data.map['deleted-call']).toBeUndefined();
  });

  it('filters wrong-direction synced calls from persisted data and visible calls', () => {
    const callMonitor = {
      getRecentCallDirection: jest.fn((sessionId) =>
        sessionId === 'existing-wrong-session' ||
        sessionId === 'new-wrong-session' ||
        sessionId === 'matching-session'
          ? callDirection.inbound
          : undefined,
      ),
    };
    const { callLog } = createCallLog({}, { bound: true, callMonitor });
    const existingWrongDirectionCall = createRecord(
      'existing-wrong-call',
      Date.parse('2026-05-30T00:00:00.000Z'),
      {
        sessionId: 'existing-wrong-session',
        direction: callDirection.outbound,
      },
    );

    callLog.data = {
      list: ['existing-wrong-call'],
      map: {
        'existing-wrong-call': existingWrongDirectionCall,
      },
      token: 'old-token',
      timestamp: systemNow - 1_000,
    };

    callLog.syncSuccess({
      timestamp: systemNow,
      syncToken: 'next-token',
      daySpan: 7,
      records: [
        createRecord('new-wrong-call', Date.parse('2026-05-30T12:00:00.000Z'), {
          sessionId: 'new-wrong-session',
          direction: callDirection.outbound,
        }),
        createRecord('matching-call', Date.parse('2026-05-30T13:00:00.000Z'), {
          sessionId: 'matching-session',
          direction: callDirection.inbound,
        }),
        createRecord('unknown-call', Date.parse('2026-05-30T14:00:00.000Z'), {
          sessionId: 'unknown-session',
          direction: callDirection.outbound,
        }),
      ],
    });

    expect(callLog.data.list).toEqual(['matching-call', 'unknown-call']);
    expect(callLog.data.map['existing-wrong-call']).toBeUndefined();
    expect(callLog.data.map['new-wrong-call']).toBeUndefined();
    expect(callLog.calls.map((call) => call.id)).toEqual([
      'unknown-call',
      'matching-call',
    ]);
  });

  it('uses option-backed getters and limits the visible call list', () => {
    const { callLog } = createCallLog({
      ttl: 1,
      refreshLock: 2,
      tokenExpiresIn: 3,
      timeToRetry: 4,
      limitDaySpan: false,
      polling: false,
      isLimitList: true,
      listRecordCount: 1,
      recordCount: 5,
      limitSupplementList: true,
      enableDeleted: true,
    });
    const originalThemeSystem = process.env.THEME_SYSTEM;

    expect(callLog.ttl).toBe(1);
    expect(callLog.refreshLock).toBe(2);
    expect(callLog.timeToRetry).toBe(4);
    expect((callLog as any)._tokenExpiresIn).toBe(3);
    expect((callLog as any)._daySpan).toBe(0);
    expect((callLog as any)._polling).toBe(false);
    expect((callLog as any)._recordCount).toBe(5);
    expect((callLog as any)._listRecordCount).toBe(1);
    expect((callLog as any)._isLimitList).toBe(true);
    expect((callLog as any)._limitSupplement).toBe(true);
    expect((callLog as any)._enableDeleted).toBe(true);
    expect(callLog.pollingInterval).toBe(1);

    callLog.data = {
      list: ['busy-call', 'visible-call'],
      map: {
        'busy-call': createRecord('busy-call', systemNow + 1_000, {
          result: callResults.busy,
        }),
        'visible-call': createRecord('visible-call', systemNow + 2_000),
      },
      token: 'token',
      timestamp: systemNow,
    };
    (callLog as any)._sideLoadedData = {
      list: ['side-loaded-call'],
      map: {
        'side-loaded-call': createRecord('side-loaded-call', systemNow + 3_000),
      },
    };

    expect(callLog.calls.map((call) => call.id)).toEqual(['side-loaded-call']);

    (callLog.data as any).list = [createRecord('old-shape-call', systemNow)];

    expect(callLog.calls).toEqual([]);

    expect(
      (callLog as any)._isCallVisibleInCallLogList(
        createRecord('no-session', systemNow, {
          telephonySessionId: undefined,
        }),
        null,
      ),
    ).toBe(true);

    process.env.THEME_SYSTEM = 'spring-ui';

    expect(
      (callLog as any)._isCallVisibleInCallLogList(
        createRecord('no-session', systemNow, {
          telephonySessionId: undefined,
        }),
        null,
      ),
    ).toBe(false);

    process.env.THEME_SYSTEM = originalThemeSystem;
  });

  it('initializes and resets according to auth, cache, and token state', async () => {
    const { auth, callLog, storage } = createCallLog(
      {
        disableCache: true,
        tokenExpiresIn: 10,
      },
      boundInstanceOptions,
    );

    expect(storage.enable).not.toHaveBeenCalled();
    expect((callLog as any)._shouldInit()).toBe(false);

    auth.loggedIn = false;

    expect((callLog as any)._shouldInit()).toBe(false);

    auth.loggedIn = true;
    callLog.data = {
      list: [createRecord('old-shape-call', systemNow)] as any,
      map: {
        'stale-call': createRecord('stale-call', systemNow - 60_000),
      },
      token: 'expired-token',
      timestamp: systemNow - 20,
    };
    jest.spyOn(callLog as any, 'initInternal').mockResolvedValue(undefined);

    await callLog.onInit();

    expect(callLog.data).toEqual({
      list: [],
      map: {},
      token: null,
      timestamp: null,
    });

    callLog.data = {
      list: ['active-call'],
      map: {
        'active-call': createRecord('active-call', systemNow),
      },
      token: 'sync-token',
      timestamp: systemNow,
    };
    (callLog as any)._sideLoadedData = {
      list: ['side-loaded-call'],
      map: {
        'side-loaded-call': createRecord('side-loaded-call', systemNow),
      },
    };
    (callLog as any)._promise = Promise.resolve();
    (callLog as any)._timeoutId = setTimeout(() => undefined, 1_000);

    callLog.onReset();

    expect(callLog.data).toEqual({
      list: [],
      map: {},
      token: null,
      timestamp: null,
    });
    expect((callLog as any)._sideLoadedData).toEqual({
      list: [],
      map: {},
    });
    expect((callLog as any)._promise).toBeNull();
  });

  it('builds sync parameters and exposes company numbers', () => {
    const { callLog } = createCallLog({
      daySpan: 5,
      recordCount: 9,
    });

    callLog.data = {
      list: [],
      map: {},
      token: 'sync-token',
      timestamp: systemNow,
    };

    expect(callLog.token).toBe('sync-token');
    expect(callLog.timestamp).toBe(systemNow);
    expect(callLog.mainCompanyNumbers).toEqual(['+16505550100']);
    expect((callLog as any)._getSyncParams()).toEqual({
      dateFrom: expect.any(String),
      recordCount: 9,
      syncType: syncTypes.fSync,
    });
  });
});

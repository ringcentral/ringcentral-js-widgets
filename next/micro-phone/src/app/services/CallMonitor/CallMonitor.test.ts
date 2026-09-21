import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import type { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';
import {
  AccountInfo,
  ExtensionInfo,
  NumberFormatter,
  Presence,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Initiator,
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';

import { ActiveCallControl } from '../ActiveCallControl';
import { PreinsertCall } from '../PreinsertCall';
import { Webphone } from '../Webphone';

import { CallMonitor } from './CallMonitor';
import { RECENT_CALL_DIRECTIONS_LIMIT } from './const';

describe('CallMonitor', () => {
  function createCallMonitor() {
    return testBed({
      main: CallMonitor,
      modules: [
        {
          provide: Initiator,
          useValue: { beforeInitialize: jest.fn(), shouldActivate: false },
        },
        { provide: SharedAppOptions, useValue: {} },
        {
          provide: AccountInfo,
          useValue: {
            ready: true,
          },
        },
        {
          provide: StoragePlugin,
          useValue: {
            enable: jest.fn(),
          },
        },
        {
          provide: Presence,
          useValue: {
            ready: true,
            calls: [],
          },
        },
        { provide: ExtensionInfo, useValue: {} },
        {
          provide: NumberFormatter,
          useValue: {
            normalizeNumber: (number: string) => number,
          },
        },
        {
          provide: ActiveCallControl,
          useValue: {
            sessions: [],
            transferCallMapping: {},
            _findWebphoneSession: jest.fn(),
            cleanCurrentWarmTransferData: jest.fn(),
          },
        },
        {
          provide: PreinsertCall,
          useValue: {
            isPreinsertStatusEnd: jest.fn(() => false),
            isPreinsertStatusIgnored: jest.fn(() => false),
          },
        },
        { provide: Webphone, useValue: {} },
      ],
    }).instance;
  }

  function createCall(
    sessionId: string,
    direction: NonNullable<ICall['direction']>,
  ) {
    return {
      sessionId,
      direction,
    } as ICall;
  }

  function setAllCalls(callMonitor: CallMonitor, calls: ICall[]) {
    Object.defineProperty(callMonitor, 'allCalls', {
      configurable: true,
      get: () => calls,
    });
  }

  it('stores direction when a new-call event is emitted', () => {
    const callMonitor = createCallMonitor();

    setAllCalls(callMonitor, [createCall('session-1', callDirection.inbound)]);
    callMonitor.handleCalls([]);

    expect(callMonitor.getRecentCallDirection('session-1')).toBe(
      callDirection.inbound,
    );
    expect((callMonitor as any)._recentCallDirectionMap).toEqual({
      'session-1': callDirection.inbound,
    });
    expect((callMonitor as any)._recentCallDirectionSessionIds).toEqual([
      'session-1',
    ]);
  });

  it('updates duplicate sessions without growing the eviction list', () => {
    const callMonitor = createCallMonitor();

    setAllCalls(callMonitor, [createCall('session-1', callDirection.inbound)]);
    callMonitor.handleCalls([]);

    setAllCalls(callMonitor, [createCall('session-1', callDirection.outbound)]);
    callMonitor.handleCalls([]);

    expect(callMonitor.getRecentCallDirection('session-1')).toBe(
      callDirection.outbound,
    );
    expect((callMonitor as any)._recentCallDirectionSessionIds).toEqual([
      'session-1',
    ]);
  });

  it('keeps only the latest 30 entries with map lookup and list eviction', () => {
    const callMonitor = createCallMonitor();

    Array.from({ length: RECENT_CALL_DIRECTIONS_LIMIT + 5 }, (_, index) => {
      setAllCalls(callMonitor, [
        createCall(
          `session-${index}`,
          index % 2 === 0 ? callDirection.inbound : callDirection.outbound,
        ),
      ]);
      callMonitor.handleCalls([]);
    });

    const sessionIds = (callMonitor as any)
      ._recentCallDirectionSessionIds as string[];
    const directionMap = (callMonitor as any)._recentCallDirectionMap;

    expect(sessionIds).toHaveLength(RECENT_CALL_DIRECTIONS_LIMIT);
    expect(sessionIds[0]).toBe('session-5');
    expect(sessionIds[sessionIds.length - 1]).toBe('session-34');
    expect(directionMap['session-0']).toBeUndefined();
    expect(callMonitor.getRecentCallDirection('session-34')).toBe(
      callDirection.inbound,
    );
  });

  function createSessionCall(remoteStatus = 'Proceeding') {
    return {
      sessionId: 'answered-session',
      direction: 'Outbound',
      telephonyStatus: 'CallConnected',
      telephonySession: {
        party: { direction: 'Outbound', status: { code: 'Answered' } },
        otherParties: [
          { direction: 'Inbound', status: { code: remoteStatus } },
        ],
      },
    } as ICall;
  }

  it('emits answered when only the remote party changes, once across updates and resume', () => {
    const callMonitor = createCallMonitor();
    const answered = jest.fn();
    callMonitor.onCallAnswered(answered);
    const ringing = createSessionCall();
    setAllCalls(callMonitor, [ringing]);
    callMonitor.handleCalls([]);
    expect(answered).not.toHaveBeenCalled();

    const connected = createSessionCall('Answered');
    setAllCalls(callMonitor, [connected]);
    callMonitor.handleCalls([ringing]);
    expect(answered).toHaveBeenCalledTimes(1);
    expect(answered).toHaveBeenCalledWith(connected);

    callMonitor.handleCalls([connected]);
    // A ready-state refresh also processes the calls with an empty previous list.
    callMonitor.handleCalls([]);
    const held = createSessionCall('Hold');
    setAllCalls(callMonitor, [held]);
    callMonitor.handleCalls([connected]);
    setAllCalls(callMonitor, [connected]);
    callMonitor.handleCalls([held]);
    expect(answered).toHaveBeenCalledTimes(1);
  });

  it('emits for an initially answered call and clears the record when it ends', () => {
    const callMonitor = createCallMonitor();
    const answered = jest.fn();
    callMonitor.onCallAnswered(answered);
    const connected = createSessionCall('Answered');
    setAllCalls(callMonitor, [connected]);
    callMonitor.handleCalls([]);
    expect(answered).toHaveBeenCalledTimes(1);

    setAllCalls(callMonitor, []);
    callMonitor.handleCalls([connected]);
    setAllCalls(callMonitor, [connected]);
    callMonitor.handleCalls([]);
    expect(answered).toHaveBeenCalledTimes(2);
  });
});

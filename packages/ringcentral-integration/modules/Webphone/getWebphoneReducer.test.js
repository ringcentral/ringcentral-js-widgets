import { expect } from 'chai';

import callDirections from '../../enums/callDirections';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import actionTypes from './actionTypes';
import connectionStatus from './connectionStatus';
import getWebphoneReducer, {
  getActiveSessionIdReducer,
  getConnectionStatusReducer,
  getConnectRetryCountsReducer,
  getErrorCodeReducer,
  getLastEndedSessionsReducer,
  getRingSessionIdReducer,
  getSessionsReducer,
  getStatusCodeReducer,
  getVideoElementPreparedReducer,
  getWebphoneDeviceReducer,
} from './getWebphoneReducer';
import sessionStatus from './sessionStatus';

describe('Webphone :: getVideoElementPreparedReducer', () => {
  it('getVideoElementPreparedReducer should be a function', () => {
    expect(getVideoElementPreparedReducer).to.be.a('function');
  });
  it('getVideoElementPreparedReducer should return a reducer', () => {
    expect(getVideoElementPreparedReducer()).to.be.a('function');
  });
  describe('videoElementPreparedReducer', () => {
    const reducer = getVideoElementPreparedReducer(actionTypes);
    it('should have initial state of false', () => {
      expect(reducer(undefined, {})).to.equal(false);
    });
    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });
    it('should return true when action.type is videoElementPrepared', () => {
      expect(reducer({}, { type: actionTypes.videoElementPrepared })).to.equal(
        true,
      );
    });
  });
});

describe('Webphone :: getConnectionStatusReducer', () => {
  it('getConnectionStatusReducer should be a function', () => {
    expect(getConnectionStatusReducer).to.be.a('function');
  });
  it('getConnectionStatusReducer should return a reducer', () => {
    expect(getConnectionStatusReducer()).to.be.a('function');
  });
  describe('connectionStatusReducer', () => {
    const reducer = getConnectionStatusReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(connectionStatus.disconnected);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });

    it('should return connecting when actionTypes is connect', () => {
      expect(reducer('foo', { type: actionTypes.connect })).to.equal(
        connectionStatus.connecting,
      );
    });

    it('should return reconnecting when actionTypes is reconnect', () => {
      expect(reducer('foo', { type: actionTypes.reconnect })).to.equal(
        connectionStatus.reconnecting,
      );
    });

    it('should return connected when actionTypes is registered', () => {
      expect(reducer('foo', { type: actionTypes.registered })).to.equal(
        connectionStatus.connected,
      );
    });

    it('should return connectError when actionTypes is connectError', () => {
      expect(reducer('foo', { type: actionTypes.connectError })).to.equal(
        connectionStatus.connectError,
      );
    });

    it('should return disconnected when actionTypes is unregistered', () => {
      expect(reducer('foo', { type: actionTypes.unregistered })).to.equal(
        connectionStatus.disconnected,
      );
    });

    it('should return disconnecting when actionTypes is disconnect', () => {
      expect(reducer('foo', { type: actionTypes.disconnect })).to.equal(
        connectionStatus.disconnecting,
      );
    });

    it('should return connectFailed when actionTypes is connectFailed', () => {
      expect(
        reducer('foo', {
          type: actionTypes.connectFailed,
        }),
      ).to.equal(connectionStatus.connectFailed);
    });
  });
});

describe('Webphone :: getWebphoneDeviceReducer', () => {
  it('getWebphoneDeviceReducer should be a function', () => {
    expect(getWebphoneDeviceReducer).to.be.a('function');
  });
  it('getWebphoneDeviceReducer should return a reducer', () => {
    expect(getWebphoneDeviceReducer()).to.be.a('function');
  });
  describe('webphoneDeviceReducer', () => {
    const reducer = getWebphoneDeviceReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });

    it('should return device when actionTypes is registered', () => {
      const device = {};
      expect(reducer('foo', { type: actionTypes.registered, device })).to.equal(
        device,
      );
    });

    it('should return null when actionTypes is unregistered, connectError etc', () => {
      [
        actionTypes.reconnect,
        actionTypes.connect,
        actionTypes.connectFailed,
        actionTypes.connectError,
        actionTypes.unregistered,
        actionTypes.disconnectOnInactive,
        actionTypes.unregisteredOnInactive,
        actionTypes.disconnect,
      ].forEach((type) => {
        expect(
          reducer('foo', {
            type,
          }),
        ).to.equal(null);
      });
    });
  });
});

describe('Webphone :: getConnectRetryCountsReducer', () => {
  it('getConnectRetryCountsReducer should be a function', () => {
    expect(getConnectRetryCountsReducer).to.be.a('function');
  });
  it('getConnectRetryCountsReducer should return a reducer', () => {
    expect(getConnectRetryCountsReducer()).to.be.a('function');
  });

  describe('connectRetryCountsReducer', () => {
    const reducer = getConnectRetryCountsReducer(actionTypes);
    it('should have initial state of zero', () => {
      expect(reducer(undefined, {})).to.equal(0);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });

    it('should return original state + 1 when actionTypes is reconnect or connect', () => {
      [actionTypes.reconnect, actionTypes.connect].forEach((type) => {
        expect(
          reducer(1, {
            type,
          }),
        ).to.equal(2);
      });
    });

    it('should return zero when actionTypes is registered or resetRetryCounts', () => {
      [actionTypes.registered, actionTypes.unregistered].forEach((type) => {
        expect(
          reducer('foo', {
            type,
          }),
        ).to.equal(0);
      });
    });

    it('should set retry counts when actionTypes is setRetryCounts', () => {
      const originalState = 1;
      expect(
        reducer(originalState, {
          type: actionTypes.setRetryCounts,
          retryCounts: 5,
        }),
      ).to.equal(5);
    });
  });
});

describe('Webphone :: getActiveSessionIdReducer', () => {
  it('getActiveSessionIdReducer should be a function', () => {
    expect(getActiveSessionIdReducer).to.be.a('function');
  });
  it('getActiveSessionIdReducer should return a reducer', () => {
    expect(getActiveSessionIdReducer()).to.be.a('function');
  });
  describe('activeSessionIdReducer', () => {
    const reducer = getActiveSessionIdReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });

    it('should return sessionId when actionTypes is callStart or callInit', () => {
      [actionTypes.callStart, actionTypes.callInit].forEach((type) => {
        const originalState = '1111';
        expect(
          reducer(originalState, {
            type,
            session: { id: '222' },
          }),
        ).to.equal('222');
      });
    });

    it(`should return original state when actionTypes is callEnd
        and sessionId is unequal original state`, () => {
      const originalState = '111';
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: { id: '222' },
        }),
      ).to.equal('111');
    });

    it(`should return null when actionTypes is callEnd
        and sessionId is equal original state`, () => {
      const originalState = '111';
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: { id: '111' },
        }),
      ).to.equal(null);
    });

    it(`should return onHoldSessionId when actionTypes is callEnd
        and sessionId is equal original state and there is one session on hold`, () => {
      const originalState = '111';
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: { id: '111' },
          sessions: [
            {
              id: '123',
              callStatus: sessionStatus.onHold,
            },
          ],
        }),
      ).to.equal('123');
    });

    it('should return null when actionTypes is disconnect', () => {
      const originalState = '111';
      expect(
        reducer(originalState, {
          type: actionTypes.disconnect,
          session: { id: '222' },
        }),
      ).to.equal(null);
    });
  });
});

describe('Webphone :: getRingSessionIdReducer', () => {
  it('getRingSessionIdReducer should be a function', () => {
    expect(getRingSessionIdReducer).to.be.a('function');
  });
  it('getRingSessionIdReducer should return a reducer', () => {
    expect(getRingSessionIdReducer()).to.be.a('function');
  });
  describe('ringSessionIdReducer', () => {
    const reducer = getRingSessionIdReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });

    it('should return sessionId when actionTypes is callRing', () => {
      const originalState = '1111';
      expect(
        reducer(originalState, {
          type: actionTypes.callRing,
          session: { id: '222' },
        }),
      ).to.equal('222');
    });

    it(`should return original state when actionTypes is callEnd and callStart
        and sessionId is unequal original state`, () => {
      [actionTypes.callStart, actionTypes.callEnd].forEach((type) => {
        const originalState = '111';
        expect(
          reducer(originalState, {
            type,
            session: { id: '222' },
          }),
        ).to.equal('111');
      });
    });

    it(`should return null when actionTypes is callEnd and callStart
        and sessionId is equal original state`, () => {
      [actionTypes.callStart, actionTypes.callEnd].forEach((type) => {
        const originalState = '111';
        expect(
          reducer(originalState, {
            type,
            session: { id: '111' },
          }),
        ).to.equal(null);
      });
    });

    it(`should return null when actionTypes is callEnd and callStart
        and sessionId is equal original state and there is another ring session`, () => {
      [actionTypes.callStart, actionTypes.callEnd].forEach((type) => {
        const originalState = '111';
        expect(
          reducer(originalState, {
            type,
            session: { id: '111' },
            sessions: [
              {
                id: '123',
                direction: callDirections.inbound,
                callStatus: sessionStatus.connecting,
              },
            ],
          }),
        ).to.equal('123');
      });
    });

    it('should return null when actionTypes is disconnect', () => {
      const originalState = '111';
      expect(
        reducer(originalState, {
          type: actionTypes.disconnect,
          session: { id: '222' },
        }),
      ).to.equal(null);
    });
  });
});

describe('Webphone :: getLastEndedSessionsReducer', () => {
  it('getLastEndedSessionsReducer should be a function', () => {
    expect(getLastEndedSessionsReducer).to.be.a('function');
  });
  it('getLastEndedSessionsReducer should return a reducer', () => {
    expect(getLastEndedSessionsReducer()).to.be.a('function');
  });

  describe('lastEndSessionsReducer', () => {
    const reducer = getLastEndedSessionsReducer(actionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });

    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });

    it('should return sessions include session when session has startTime on callEnd', () => {
      const originalState = [];
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: {
            id: '222',
            startTime: 1,
          },
        }),
      ).to.deep.equal([
        {
          id: '222',
          startTime: 1,
        },
      ]);
    });

    it('should return sessions include session when session is replied', () => {
      const originalState = [];
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: {
            id: '222',
            isReplied: true,
          },
        }),
      ).to.deep.equal([
        {
          id: '222',
          isReplied: true,
        },
      ]);
    });

    it('should return sessions include session when session is forward', () => {
      const originalState = [];
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: {
            id: '222',
            isForwarded: true,
          },
        }),
      ).to.deep.equal([
        {
          id: '222',
          isForwarded: true,
        },
      ]);
    });

    it('should return sessions include session when session is isToVoicemail', () => {
      const originalState = [];
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: {
            id: '222',
            isToVoicemail: true,
          },
        }),
      ).to.deep.equal([
        {
          id: '222',
          isToVoicemail: true,
        },
      ]);
    });

    it(`should not return sessions include session
        when session startTime is undefined on callEnd`, () => {
      const originalState = [];
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: {
            id: '222',
          },
        }),
      ).to.deep.equal([]);
    });

    it(`should not return sessions include duplicate sessions
        when session is included by originalState`, () => {
      const originalState = [
        {
          id: '222',
          startTime: 1,
        },
      ];
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: {
            id: '222',
            startTime: 1,
          },
        }),
      ).to.deep.equal([
        {
          id: '222',
          startTime: 1,
        },
      ]);
    });

    it('should not return sessions that length is over 5', () => {
      const originalState = [{}, {}, {}, {}, {}];
      expect(
        reducer(originalState, {
          type: actionTypes.callEnd,
          session: {
            id: '222',
            startTime: 1,
          },
        }).length,
      ).to.equal(5);
    });
  });
});

describe('Webphone :: getSessionsReducer', () => {
  it('getSessionsReducer should be a function', () => {
    expect(getSessionsReducer).to.be.a('function');
  });
  it('getSessionsReducer should return a reducer', () => {
    expect(getSessionsReducer()).to.be.a('function');
  });
  describe('sessionsReducer', () => {
    const reducer = getSessionsReducer(actionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state when actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });
    it('should return empty array when actionTypes is destroySessions', () => {
      const originalState = {};
      expect(
        reducer(originalState, { type: actionTypes.destroySessions }),
      ).to.deep.equal([]);
    });
    it('should return session array when actionTypes is updateSessions', () => {
      const originalState = [];
      const sessions = [
        {
          id: '123',
          direction: 'inbound',
          callStatus: 'test',
          request: {
            to: {
              uri: {
                user: 'test',
              },
              displayName: 'haha',
            },
            from: {
              uri: {
                user: 'test',
              },
              displayName: 'ha',
            },
          },
          startTime: 'Fri Apr 21 2017 13:39:34 GMT+0800',
          creationTime: 1492753174000,
          isOnHold: () => ({
            local: false,
          }),
          isOnMute: false,
          isOnRecord: false,
        },
      ];
      expect(
        reducer(originalState, { type: actionTypes.updateSessions, sessions }),
      ).to.equal(sessions);
    });
    it('should mark sessions cached=true when actionTypes is setSessionCaching', () => {
      const originalState = [
        {
          id: '123',
          cached: false,
        },
      ];
      expect(
        reducer(originalState, {
          type: actionTypes.setSessionCaching,
          cachingSessionIds: ['123'],
        }),
      ).to.deep.equal([
        {
          id: '123',
          cached: true,
        },
      ]);
    });
    it('should mark sessions cached=false when actionTypes is clearSessionCaching', () => {
      const originalState = [
        {
          id: '123',
          cached: true,
        },
      ];
      expect(
        reducer(originalState, {
          type: actionTypes.clearSessionCaching,
        }),
      ).to.deep.equal([
        {
          id: '123',
          cached: false,
        },
      ]);
    });
    it('should remove [cached=true and removed=true] sessions when actionTypes is clearSessionCaching', () => {
      const originalState = [
        {
          id: '123',
          cached: true,
          removed: true,
        },
      ];
      expect(
        reducer(originalState, {
          type: actionTypes.clearSessionCaching,
        }),
      ).to.deep.equal([]);
    });
    it('should remove onhold cached sessions when actionTypes is onholdCachedSession', () => {
      const originalState = [
        {
          id: '123',
          cached: true,
          isOnHold: false,
          callStatus: sessionStatus.connected,
        },
      ];
      expect(
        reducer(originalState, {
          type: actionTypes.onholdCachedSession,
        }),
      ).to.deep.equal([
        {
          id: '123',
          cached: true,
          isOnHold: true,
          callStatus: sessionStatus.onHold,
        },
      ]);
    });
  });
});

describe('getWebphoneReducer', () => {
  it('should be a function', () => {
    expect(getWebphoneReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getWebphoneReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getWebphoneReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const videoElementPreparedReducer =
      getVideoElementPreparedReducer(actionTypes);
    const connectionStatusReducer = getConnectionStatusReducer(actionTypes);
    const connectRetryCountsReducer = getConnectRetryCountsReducer(actionTypes);
    const activeSessionIdReducer = getActiveSessionIdReducer(actionTypes);
    const ringSessionIdReducer = getRingSessionIdReducer(actionTypes);
    const sessionsReducer = getSessionsReducer(actionTypes);
    const errorCodeReducer = getErrorCodeReducer(actionTypes);
    const statusCodeReducer = getStatusCodeReducer(actionTypes);
    const lastEndedSessionsReducer = getLastEndedSessionsReducer(actionTypes);
    const webphoneDeviceReducer = getWebphoneDeviceReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      videoElementPrepared: videoElementPreparedReducer(undefined, {}),
      connectionStatus: connectionStatusReducer(undefined, {}),
      connectRetryCounts: connectRetryCountsReducer(undefined, {}),
      activeSessionId: activeSessionIdReducer(undefined, {}),
      ringSessionId: ringSessionIdReducer(undefined, {}),
      sessions: sessionsReducer(undefined, {}),
      lastEndedSessions: lastEndedSessionsReducer(undefined, {}),
      errorCode: errorCodeReducer(undefined, {}),
      statusCode: statusCodeReducer(undefined, {}),
      device: webphoneDeviceReducer(undefined, {}),
    });
  });
});

import { expect } from 'chai';
import getAuthReducer, {
  getFreshLoginReducer,
  getLoginStatusReducer,
  getTokenReducer,
} from './getAuthReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import actionTypes from './actionTypes';
import loginStatus from './loginStatus';

describe('getLoginStatusReducer', () => {
  it('should be a function', () => {
    expect(getLoginStatusReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getLoginStatusReducer(actionTypes)).to.be.a('function');
  });
  describe('loginStatusReducer', () => {
    const reducer = getLoginStatusReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    describe('actionTypes => loginStatus', () => {
      it('actionTypes.login => loginStatus.loggingIn', () => {
        expect(reducer(null, {
          type: actionTypes.login,
        })).to.equal(loginStatus.loggingIn);
      });
      it('actionTypes.loginSuccess => loginStatus.loggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.loginSuccess,
        })).to.equal(loginStatus.loggedIn);
      });
      it('actionTypes.refreshSuccess => loginStatus.loggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.refreshSuccess,
        })).to.equal(loginStatus.loggedIn);
      });
      it('actionTypes.cancelLogout => loginStatus.loggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.cancelLogout,
        })).to.equal(loginStatus.loggedIn);
      });
      it('actionTypes.loginError => loginStatus.notLoggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.loginError,
        })).to.equal(loginStatus.notLoggedIn);
      });
      it('actionTypes.logoutSuccess => loginStatus.notLoggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.logoutSuccess,
        })).to.equal(loginStatus.notLoggedIn);
      });
      it('actionTypes.logoutError => loginStatus.notLoggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.logoutError,
        })).to.equal(loginStatus.notLoggedIn);
      });
      it('actionTypes.refreshError => refreshTokenValid ? state : loginStatus.notLoggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.refreshError,
          refreshTokenValid: false,
        })).to.equal(loginStatus.notLoggedIn);
        expect(reducer(loginStatus.loggedIn, {
          type: actionTypes.refreshError,
          refreshTokenValid: true,
        })).to.equal(loginStatus.loggedIn);
      });
      it('actionTypes.logout => loginStatus.loggingOut', () => {
        expect(reducer(null, {
          type: actionTypes.logout,
        })).to.equal(loginStatus.loggingOut);
      });
      it('actionTypes.beforeLogout => loginStatus.beforeLogout', () => {
        expect(reducer(null, {
          type: actionTypes.beforeLogout,
        })).to.equal(loginStatus.beforeLogout);
      });
      it('actionTypes.refresh => originalState', () => {
        const originalState = {};
        expect(reducer(originalState, {
          type: actionTypes.refresh,
        })).to.equal(originalState);
      });
      it('actionTypes.init => state', () => {
        expect(reducer('originalState', {
          type: actionTypes.init,
        })).to.equal('originalState');
      });
      it('actionTypes.initSuccess && !loggedIn => loginStatus.notLoggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.initSuccess,
          loggedIn: false,
        })).to.equal(loginStatus.notLoggedIn);
      });
      it('actionTypes.initSuccess && loggedIn => loginStatus.loggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.initSuccess,
          loggedIn: true,
        })).to.equal(loginStatus.loggedIn);
      });
      it('actionTypes.tabSync && !loggedIn => loginStatus.notLoggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.tabSync,
          loggedIn: false,
        })).to.equal(loginStatus.notLoggedIn);
      });
      it('actionTypes.tabSync && loggedIn => loginStatus.loggedIn', () => {
        expect(reducer(null, {
          type: actionTypes.tabSync,
          loggedIn: true,
        })).to.equal(loginStatus.loggedIn);
      });
    });
  });
});

describe('getTokenReducer', () => {
  it('should be a function', () => {
    expect(getTokenReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getTokenReducer(actionTypes)).to.be.a('function');
  });
  describe('endpointIdReducer', () => {
    const reducer = getTokenReducer(actionTypes);
    it('should have initial state of empty object', () => {
      expect(reducer(undefined, {})).to.deep.equal({});
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return token object on loginSuccess and refreshSuccess', () => {
      [
        actionTypes.loginSuccess,
        actionTypes.refreshSuccess,
      ].forEach(type => {
        expect(reducer(null, {
          type,
          token: {
            endpoint_id: 'foo',
            owner_id: 'owner',
            access_token: 'access token',
            expire_time: '1111',
            expires_in: '1234',
          },
        })).to.deep.equal({
          endpointId: 'foo',
          ownerId: 'owner',
          accessToken: 'access token',
          expireTime: '1111',
          expiresIn: '1234',
        });
      });
    });
    it('should return empty object on following auth action types', () => {
      [
        actionTypes.loginError,
        actionTypes.logoutSuccess,
        actionTypes.logoutError,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.be.deep.equal({});
      });
    });

    it('should return empty object on refreshError and refreshToken not Valid', () => {
      expect(reducer(null, {
        type: actionTypes.refreshError,
        token: {
          endpoint_id: 'foo',
        },
        refreshTokenValid: false,
      })).to.deep.equal({});
    });

    it('should return original state on refreshError and refreshToken Valid', () => {
      const originalState = {};
      expect(reducer(originalState, {
        type: actionTypes.refreshError,
        token: {
          endpoint_id: 'foo',
        },
        refreshTokenValid: true,
      })).to.equal(originalState);
    });

    it('should ignore other auth action types', () => {
      const originalState = {};
      [
        actionTypes.login,
        actionTypes.logout,
        actionTypes.refresh,
        actionTypes.beforeLogout,
        actionTypes.cancelLogout,
      ].forEach((type) => {
        expect(reducer(originalState, {
          type,
        })).to.equal(originalState);
      });
    });

    it('should return endpoint_id on initSuccess or tabSync with token', () => {
      [
        actionTypes.initSuccess,
        actionTypes.tabSync,
      ].forEach(type => {
        expect(reducer({}, {
          type,
          token: {
            endpoint_id: 'foo',
            owner_id: 'owner',
            access_token: 'access token',
            expire_time: '1111',
            expires_in: '1234',
          },
        })).to.deep.equal({
          endpointId: 'foo',
          ownerId: 'owner',
          accessToken: 'access token',
          expireTime: '1111',
          expiresIn: '1234',
        });
      });
    });

    it('should return empty object on initSuccess or tabSync without token', () => {
      [
        actionTypes.initSuccess,
        actionTypes.tabSync,
      ].forEach(type => {
        expect(reducer({}, {
          type,
        })).to.deep.equal({});
      });
    });
  });
});

describe('getFreshLoginReducer', () => {
  it('should be a function', () => {
    expect(getFreshLoginReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getFreshLoginReducer(actionTypes)).to.be.a('function');
  });
  describe('freshLoginReducer', () => {
    const reducer = getFreshLoginReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return true on login action type', () => {
      expect(reducer(null, {
        type: actionTypes.login,
      })).to.be.true;
    });
    it('should return null on following auth action types', () => {
      [
        actionTypes.loginError,
        actionTypes.logoutError,
        actionTypes.refreshError,
        actionTypes.logoutSuccess,
      ].forEach(type => {
        expect(reducer('foo', {
          type,
        })).to.equal(null);
      });
    });
    it('should ignore the following auth action types', () => {
      const originalState = {};
      [
        actionTypes.cancelLogout,
        actionTypes.loginSuccess,
        actionTypes.logout,
        actionTypes.refresh,
        actionTypes.refreshSuccess,
        actionTypes.beforeLogout,
        actionTypes.init,
      ].forEach(type => {
        expect(reducer(originalState, {
          type,
        })).to.equal(originalState);
      });
    });
    it('should return false on authActionType.initSuccess && loggedIn', () => {
      expect(reducer(null, {
        type: actionTypes.initSuccess,
        loggedIn: true,
      })).to.be.false;
    });
    it('should return null on authActionType.initSuccess && !loggedIn', () => {
      expect(reducer(null, {
        type: actionTypes.initSuccess,
        loggedIn: false,
      })).to.be.null;
    });
    it('should return false on authActionType.tabSync && loggedIn', () => {
      expect(reducer(null, {
        type: actionTypes.tabSync,
        loggedIn: true,
      })).to.be.false;
    });
    it('should return null on authActionType.tabSync && !loggedIn', () => {
      expect(reducer(null, {
        type: actionTypes.tabSync,
        loggedIn: false,
      })).to.be.null;
    });
  });
});


describe('getAuthReducer', () => {
  it('should be a function', () => {
    expect(getAuthReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getAuthReducer()).to.be.a('function');
  });
  describe('authReducer', () => {
    const reducer = getAuthReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const loginStatusReducer = getLoginStatusReducer(actionTypes);
    const freshLoginReducer = getFreshLoginReducer(actionTypes);
    const tokenReducer = getTokenReducer(actionTypes);
    it('should return combined state', () => {
      expect(reducer(undefined, {}))
        .to.deep.equal({
          status: statusReducer(undefined, {}),
          loginStatus: loginStatusReducer(undefined, {}),
          freshLogin: freshLoginReducer(undefined, {}),
          token: tokenReducer(undefined, {}),
        });
      const error = new Error('test');
      const token = {
        owner_id: 'foo',
        endpoint_id: 'foo',
      };
      [
        {
          type: actionTypes.login,
        },
        {
          type: actionTypes.loginSuccess,
          token,
        },
        {
          type: actionTypes.loginError,
          error,
        },
        {
          type: actionTypes.logout,
        },
        {
          type: actionTypes.logoutSuccess,
        },
        {
          type: actionTypes.logoutError,
          error,
        },
        {
          type: actionTypes.refresh,
        },
        {
          type: actionTypes.refreshSuccess,
          token,
        },
        {
          type: actionTypes.refreshError,
          error,
        },
        {
          type: actionTypes.beforeLogout,
        },
        {
          type: actionTypes.cancelLogout,
          error,
        },
        {
          type: actionTypes.init,
        },
        {
          type: actionTypes.initSuccess,
          loggedIn: true,
          token,
        },
        {
          type: actionTypes.initSuccess,
          loggedIn: false,
        },
        {
          type: actionTypes.tabSync,
          loggedIn: true,
          token,
        },
        {
          type: actionTypes.tabSync,
          loggedIn: false,
        },
      ].forEach((action) => {
        expect(reducer({
          status: 'status',
          loginStatus: 'loginStatus',
          freshLogin: 'freshLogin',
          token: {},
        }, action)).to.deep.equal({
          status: statusReducer('status', action),
          loginStatus: loginStatusReducer('loginStatus', action),
          freshLogin: freshLoginReducer('freshLogin', action),
          token: tokenReducer({}, action),
        });
      });
    });
  });
});

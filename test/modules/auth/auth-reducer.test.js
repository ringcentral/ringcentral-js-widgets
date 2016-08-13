import { expect } from 'chai';
import getAuthReducer from '../../../src/modules/auth/auth-reducer';
import authActions from '../../../src/modules/auth/auth-actions';
import loginStatus from '../../../src/modules/auth/login-status';
import { prefixActions } from '../../../src/lib/redux-helper';

describe('auth-reducer', () => {
  describe('getAuthReducer', () => {
    it('should be a function', () => {
      expect(getAuthReducer).to.be.a('function');
    });
    it('should return a reducer', () => {
      expect(getAuthReducer()).to.be.a('function');
    });
    it('should return a prefixed-reducer', () => {
      expect(getAuthReducer('test')).to.be.a('function');
    });
  });
  describe('reducer', () => {
    const reducer = getAuthReducer();
    it('should be a function', () => {
      expect(reducer).to.be.a('function');
    });
    it('should return a initial state', () => {
      expect(reducer()).to.deep.equal({
        status: loginStatus.pending,
        error: null,
      });
    });
    it('should handle init', () => {
      for (const key in loginStatus) {
        if (loginStatus.hasOwnProperty(key)) {
          expect(reducer({
            status: loginStatus.pending,
            error: null,
          }, {
            type: authActions.init,
            status: loginStatus[key],
          })).to.deep.equal({
            status: loginStatus[key],
            error: null,
          });
        }
      }
    });
    it('should handle login', () => {
      const initialState = reducer();
      expect(reducer(initialState, {
        type: authActions.login,
      })).to.deep.equal({
        status: loginStatus.loggingIn,
        error: null,
      });
    });
    it('should handle loginSuccess', () => {
      const initialState = reducer();
      expect(reducer(initialState, {
        type: authActions.loginSuccess,
      })).to.deep.equal({
        status: loginStatus.loggedIn,
        error: null,
      });
    });
    it('should handle loginError', () => {
      const initialState = reducer();
      const error = new Error('test');
      expect(reducer(initialState, {
        type: authActions.loginError,
        error,
      })).to.deep.equal({
        status: loginStatus.notLoggedIn,
        error,
      });
    });
    it('should handle logout', () => {
      const initialState = reducer();
      expect(reducer(initialState, {
        type: authActions.logout,
      })).to.deep.equal({
        status: loginStatus.loggingOut,
        error: null,
      });
    });
    it('should handle logoutSuccess', () => {
      const initialState = reducer();
      expect(reducer(initialState, {
        type: authActions.logoutSuccess,
      })).to.deep.equal({
        status: loginStatus.notLoggedIn,
        error: null,
      });
    });
    it('should handle logoutError', () => {
      const initialState = reducer();
      const error = new Error('logoutError');
      expect(reducer(initialState, {
        type: authActions.logoutError,
        error,
      })).to.deep.equal({
        status: loginStatus.loggedIn,
        error,
      });
    });
    it('should return original state if no action was supplied', () => {
      const initialState = reducer();
      expect(reducer(initialState)).to.equal(initialState);
    });
    it('should return original state if action is not recognized', () => {
      const initialState = reducer();
      expect(reducer(initialState, {
        type: 'unknownAction',
      })).to.equal(initialState);
    });
  });
  describe('prefixed reducer', () => {
    const prefix = 'eagle';
    const roguePrefix = 'rogue';
    const reducer = getAuthReducer('eagle');
    const prefixedActions = prefixActions(authActions, prefix);
    const rogueActions = prefixActions(authActions, roguePrefix);
    it('should handle an action with the same prefix', () => {
      const initialState = {
        status: loginStatus.loggedIn,
        error: null,
      };
      expect(reducer(initialState, {
        type: prefixedActions.logout,
      })).to.deep.equal({
        status: loginStatus.loggingOut,
        error: null,
      });
    });
    it('should ignore actions with the wrong prefix', () => {
      const initialState = {
        status: loginStatus.loggedIn,
        error: null,
      };
      expect(reducer(initialState, {
        type: rogueActions.logout,
      })).to.equal(initialState);
    });
  });
});

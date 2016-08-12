import { expect } from 'chai';
import getAuthReducer from '../../../src/modules/auth/auth-reducer';
import authActions from '../../../src/modules/auth/auth-actions';
import loginStatus from '../../../src/modules/auth/login-status';

describe('auth-reducer', () => {
  describe('getAuthReducer', () => {
    it('should be a function', () => {
      expect(getAuthReducer).to.be.a('function');
    });
    it('should return a reducer', () => {
      expect(getAuthReducer()).to.be.a('function');
    });
  });
  describe('reducer', () => {
    const reducer = getAuthReducer();
    it('should be a function', () => {
      expect(reducer).to.be.a('function');
    });
    it('should return a initial state', () => {
      let initA = null;
      let initB = null;
      expect(() => {
        initA = reducer();
      }).to.not.throw;
      expect(() => {
        initB = reducer();
      }).to.not.throw;
      expect(initA).to.deep.equal(initB);
    });
    it('should handle init', () => {
      const initialState = reducer();
      expect(reducer(initialState, {
        type: authActions.init,
        status: 'testState',
      })).to.deep.equal(Object.assign({}, initialState, {
        status: 'testState',
      }));
    });
    it('should handle login', () => {
      const initialState = reducer();
      expect(reducer(initialState, {
        type: authActions.login,
      })).to.deep.equal(Object.assign({}, initialState, {
        status: loginStatus.loggingIn,
      }));
    });
    it('should handle loginSuccess', () => {
      const initialState = reducer();
      expect(reducer(initialState, {
        type: authActions.loginSuccess,
      })).to.deep.equal(Object.assign({}, initialState, {
        status: loginStatus.loggedIn,
      }));
    });
    it('should handle loginError', () => {
      const initialState = reducer();
      const error = new Error('test');
      expect(reducer(initialState, {
        type: authActions.loginError,
        error,
      })).to.deep.equal(Object.assign({}, initialState, {
        status: loginStatus.notLoggedIn,
        error,
      }));
    });
    it('should handle logout', () => {
      const initialState = reducer();
      expect(reducer(initialState, {
        type: authActions.login,
      })).to.deep.equal(Object.assign({}, initialState, {
        status: loginStatus.loggingOut,
      }));
    });
  });
});

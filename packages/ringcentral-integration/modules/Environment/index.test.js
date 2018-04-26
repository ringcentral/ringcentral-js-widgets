import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import Environment from './index';
import getEnvironmentReducer from './getEnvironmentReducer';
import actionTypes from './actionTypes';


describe('Environment Unit Test', () => {
  let environment;
  let store;

  beforeEach(() => {
    environment = sinon.createStubInstance(Environment);
    store = createStore(getEnvironmentReducer(actionTypes));
    environment._store = store;
    environment._prefixedActionTypes = actionTypes;
    ['_shouldInit', '_initClientService', '_onStateChange', 'setData'].forEach((key) => {
      environment[key].restore();
    });
  });

  describe('_onStateChange', () => {
    it('_initClientService should be called once', () => {
      sinon.stub(environment, '_shouldInit').callsFake(() => true);
      sinon.stub(environment, '_initClientService');
      environment._onStateChange();
      sinon.assert.calledOnce(environment._initClientService);
    });

    it('_initClientService should Not be called', () => {
      sinon.stub(environment, '_shouldInit').callsFake(() => false);
      sinon.stub(environment, '_initClientService');
      environment._onStateChange();
      sinon.assert.notCalled(environment._initClientService);
    });
  });

  describe('_shouldInit', () => {
    it(`Should return true when environment is not ready and globalStorage is ready`, () => {
      environment._globalStorage = {
        ready: true
      };
      sinon.stub(environment, 'ready', { get: () => false });
      expect(environment._shouldInit()).to.equal(true);
    });
    it(`Should return false when environment is not ready and globalStorage is not ready`, () => {
      environment._globalStorage = {
        ready: false
      };
      sinon.stub(environment, 'ready', { get: () => false });
      expect(environment._shouldInit()).to.equal(false);
    });
    it(`Should return false when environment is ready and globalStorage is ready`, () => {
      environment._globalStorage = {
        ready: true
      };
      sinon.stub(environment, 'ready', { get: () => true });
      expect(environment._shouldInit()).to.equal(false);
    });
    it(`Should return false when environment is ready and globalStorage is not ready`, () => {
      environment._globalStorage = {
        ready: false
      };
      sinon.stub(environment, 'ready', { get: () => true });
      expect(environment._shouldInit()).to.equal(false);
    });
  });

  describe('setData', () => {
    describe(`_changeEnvironment should be called once when`, () => {
      it('environment is enabled and someone tries to disable it', () => {
        sinon.stub(environment, 'enabled', { get: () => true });
        environment.setData({
          enabled: false
        });
        sinon.assert.calledOnce(environment._changeEnvironment);
      });
      it('environment is disabled and someone tries to enable it', () => {
        sinon.stub(environment, 'enabled', { get: () => false });
        environment.setData({
          enabled: true
        });
        sinon.assert.calledOnce(environment._changeEnvironment);
      });
      it('environment is enabled and someone tries to change server config', () => {
        sinon.stub(environment, 'enabled', { get: () => true });
        sinon.stub(environment, 'server', { get: () => '123' });
        environment.setData({
          server: '345',
          enabled: true
        });
        sinon.assert.calledOnce(environment._changeEnvironment);
      });
    });
    describe(`_changeEnvironment should not be called when`, () => {
      it('environment is enabled and someone tries to enable it again with same server config', () => {
        sinon.stub(environment, 'enabled', { get: () => true });
        sinon.stub(environment, 'server', { get: () => '123' });
        environment.setData({
          enabled: true,
          server: '123'
        });
        sinon.assert.notCalled(environment._changeEnvironment);
      });
      it('environment is disabled and someone tries to change server config without enable it', () => {
        sinon.stub(environment, 'enabled', { get: () => false });
        sinon.stub(environment, 'server', { get: () => '123' });
        environment.setData({
          enabled: false,
          server: '456'
        });
        sinon.assert.notCalled(environment._changeEnvironment);
      });
    });
  });
});

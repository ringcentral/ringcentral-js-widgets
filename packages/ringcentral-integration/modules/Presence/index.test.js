import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import Presence from './index';
import getPresenceReducer from './getPresenceReducer';
import actionTypes from './actionTypes';

import presenceStatus from './presenceStatus';
import dndStatus from './dndStatus';

describe('Presence Unit Test', () => {
  let presence;
  let store;

  beforeEach(() => {
    presence = sinon.createStubInstance(Presence);
    store = createStore(getPresenceReducer(actionTypes));
    presence._store = store;
    presence._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldReset',
      '_init',
      '_reset',
      '_fetch',
      '_update',
      '_getUpdateStatusParams',
      'setAvailable',
      'setBusy',
      'setDoNotDisturb',
      'setInvisible',
      'toggleAcceptCallQueueCalls',
      '_subscriptionHandler',
    ].forEach(key => {
      presence[key].restore();
    });
  });

  describe('_onStateChange', async () => {
    it('_init should be called once when _shouldInit is true', async () => {
      sinon.stub(presence, '_shouldInit').callsFake(() => true);
      sinon.stub(presence, '_shouldReset').callsFake(() => false);
      sinon.stub(presence, '_init');
      sinon.stub(presence, '_reset');
      await presence._onStateChange();
      sinon.assert.calledOnce(presence._init);
      sinon.assert.notCalled(presence._reset);
    });

    it('_reset should be called once when _shouldReset is true', async () => {
      sinon.stub(presence, '_shouldInit').callsFake(() => false);
      sinon.stub(presence, '_shouldReset').callsFake(() => true);
      sinon.stub(presence, '_init');
      sinon.stub(presence, '_reset');
      await presence._onStateChange();
      sinon.assert.notCalled(presence._init);
      sinon.assert.calledOnce(presence._reset);
    });

    it('_subscriptionHandler should be called once when _shouldReset is true', async () => {
      sinon.stub(presence, '_shouldInit').callsFake(() => false);
      sinon.stub(presence, '_shouldReset').callsFake(() => false);
      sinon.stub(presence, '_init');
      sinon.stub(presence, '_reset');
      sinon.stub(presence, '_subscriptionHandler');
      sinon.stub(presence, 'ready', {
        get: () => true,
      });
      presence._subscription = {
        ready: true,
        message: 'Busy',
      };
      presence._lastMessage = null ;
      await presence._onStateChange();
      sinon.assert.notCalled(presence._init);
      sinon.assert.notCalled(presence._reset);
      sinon.assert.calledOnce(presence._subscriptionHandler);
    });

    it('_fetch should be called once when this._connectivity is true and this._rolesAndPermissions.hasPresencePermission is true', async () => {
      sinon.stub(presence, '_shouldInit').callsFake(() => false);
      sinon.stub(presence, '_shouldReset').callsFake(() => false);
      sinon.stub(presence, '_init');
      sinon.stub(presence, '_reset');
      sinon.stub(presence, '_subscriptionHandler');
      sinon.stub(presence, '_fetch');
      sinon.stub(presence, 'ready', {
        get: () => true,
      });
      presence._subscription = {
        ready: false,
      };
      presence._connectivityMonitor = {
        ready: true,
        connectivity:true
      };
      presence._connectivity = false ;
      presence._rolesAndPermissions = {
        hasPresencePermission:'rolesAndPermissions'
      } 
      await presence._onStateChange();
      sinon.assert.notCalled(presence._init);
      sinon.assert.notCalled(presence._reset);
      sinon.assert.notCalled(presence._subscriptionHandler);
      sinon.assert.calledOnce(presence._fetch);
    });
  });

  describe('setAvailable', async () => {
    it('_update and _getUpdateStatusParams should not be called once when this.userStatus === presenceStatus.available &&this.dndStatus !== dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, '_update');
      sinon.stub(presence, '_getUpdateStatusParams');
      sinon.stub(presence, 'userStatus', {
        get: () => presenceStatus.available,
      });
      sinon.stub(presence, 'dndStatus', { get: () => dndStatus.takeAllCalls });
      await presence.setAvailable();
      sinon.assert.notCalled(presence._update);
      sinon.assert.notCalled(presence._getUpdateStatusParams);
    });

    it('_update and _getUpdateStatusParams should be called once when this.userStatus !== presenceStatus.available &&this.dndStatus !== dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, 'userStatus', { get: () => presenceStatus.busy });
      sinon.stub(presence, 'dndStatus', { get: () => dndStatus.takeAllCalls });
      sinon.stub(presence, '_update');
      sinon.stub(presence, '_getUpdateStatusParams');
      await presence.setAvailable();
      sinon.assert.calledOnce(presence._update);
      sinon.assert.calledOnce(presence._getUpdateStatusParams);
    });

    it('_update and _getUpdateStatusParams should be called once when "this.userStatus === presenceStatus.available &&this.dndStatus === dndStatus.doNotAcceptAnyCalls" is false', async () => {
      sinon.stub(presence, 'userStatus', {
        get: () => presenceStatus.available,
      });
      sinon.stub(presence, 'dndStatus', {
        get: () => dndStatus.doNotAcceptAnyCalls,
      });
      sinon.stub(presence, '_update');
      sinon.stub(presence, '_getUpdateStatusParams');
      await presence.setAvailable();
      sinon.assert.calledOnce(presence._update);
      sinon.assert.calledOnce(presence._getUpdateStatusParams);
    });
  });

  describe('setBusy', async () => {
    it('_update and _getUpdateStatusParams should not be called once when this.userStatus === presenceStatus.busy && this.dndStatus !== dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, '_update');
      sinon.stub(presence, '_getUpdateStatusParams');
      sinon.stub(presence, 'userStatus', { get: () => presenceStatus.busy });
      sinon.stub(presence, 'dndStatus', { get: () => dndStatus.takeAllCalls });
      await presence.setBusy();
      sinon.assert.notCalled(presence._getUpdateStatusParams);
      sinon.assert.notCalled(presence._update);
    });

    it('_update and _getUpdateStatusParams should be called once when this.userStatus !== presenceStatus.busy && this.dndStatus !== dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, '_update');
      sinon.stub(presence, '_getUpdateStatusParams');
      sinon.stub(presence, 'userStatus', { get: () => presenceStatus.Offline });
      sinon.stub(presence, 'dndStatus', { get: () => dndStatus.takeAllCalls });
      await presence.setBusy();
      sinon.assert.calledOnce(presence._getUpdateStatusParams);
      sinon.assert.calledOnce(presence._update);
    });

    it('_update and _getUpdateStatusParams should be called once when this.userStatus === presenceStatus.busy && this.dndStatus === dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, '_update');
      sinon.stub(presence, '_getUpdateStatusParams');
      sinon.stub(presence, 'userStatus', { get: () => presenceStatus.busy });
      sinon.stub(presence, 'dndStatus', {
        get: () => dndStatus.doNotAcceptAnyCalls,
      });
      await presence.setBusy();
      sinon.assert.calledOnce(presence._getUpdateStatusParams);
      sinon.assert.calledOnce(presence._update);
    });
  });

  describe('setDoNotDisturb', async () => {
    it('_update should not be called once when this.dndStatus === dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, '_update');
      sinon.stub(presence, 'dndStatus', {
        get: () => dndStatus.doNotAcceptAnyCalls,
      });
      await presence.setDoNotDisturb();
      sinon.assert.notCalled(presence._update);
    });

    it('_update should be called once when when this.dndStatus !== dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, '_update');
      sinon.stub(presence, 'dndStatus', { get: () => dndStatus.TakeAllCalls });
      await presence.setDoNotDisturb();
      sinon.assert.calledOnce(presence._update);
    });
  });

  describe('setInvisible', async () => {
    it('_update and _getUpdateStatusParams should not be called once when this.userStatus === presenceStatus.busy && this.dndStatus !== dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, '_getUpdateStatusParams');
      sinon.stub(presence, '_update');
      sinon.stub(presence, 'userStatus', { get: () => presenceStatus.offline });
      sinon.stub(presence, 'dndStatus', { get: () => dndStatus.takeAllCalls });
      await presence.setInvisible();
      sinon.assert.notCalled(presence._getUpdateStatusParams);
      sinon.assert.notCalled(presence._update);
    });

    it('_update and _getUpdateStatusParams should be called once when this.userStatus !== presenceStatus.busy && this.dndStatus !== dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, '_getUpdateStatusParams');
      sinon.stub(presence, '_update');
      sinon.stub(presence, 'userStatus', { get: () => presenceStatus.busy });
      sinon.stub(presence, 'dndStatus', { get: () => dndStatus.takeAllCalls });
      await presence.setInvisible();
      sinon.assert.calledOnce(presence._getUpdateStatusParams);
      sinon.assert.calledOnce(presence._update);
    });

    it('_update and _getUpdateStatusParams should be called once when this.userStatus === presenceStatus.busy && this.dndStatus === dndStatus.doNotAcceptAnyCalls', async () => {
      sinon.stub(presence, '_getUpdateStatusParams');
      sinon.stub(presence, '_update');
      sinon.stub(presence, 'userStatus', {
        get: () => presenceStatus.offline,
      });
      sinon.stub(presence, 'dndStatus', {
        get: () => dndStatus.doNotAcceptAnyCalls,
      });
      await presence.setInvisible();
      sinon.assert.calledOnce(presence._getUpdateStatusParams);
      sinon.assert.calledOnce(presence._update);
    });
  });

  describe('toggleAcceptCallQueueCalls', async () => {
    it('_update should be called once when this.dndStatus === dndStatus.takeAllCalls', async () => {
      sinon.stub(presence, 'userStatus', {
        get: () => presenceStatus.offline,
      });
      sinon.stub(presence, '_update');
      sinon.stub(presence, 'dndStatus', {
        get: () => dndStatus.takeAllCalls,
      });
      await presence.toggleAcceptCallQueueCalls();
      sinon.assert.calledOnce(presence._update);
    });
    
    it('_update should be called once when this.dndStatus === dndStatus.doNotAcceptDepartmentCalls', async () => {
      sinon.stub(presence, 'userStatus', {
        get: () => presenceStatus.offline,
      });
      sinon.stub(presence, '_update');
      sinon.stub(presence, 'dndStatus', {
        get: () => dndStatus.doNotAcceptDepartmentCalls,
      });
      await presence.toggleAcceptCallQueueCalls();
      sinon.assert.calledOnce(presence._update);
    });
  });
});

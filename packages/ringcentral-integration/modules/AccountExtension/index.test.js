import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import AccountExtension from './index';
import {
  getDataReducer,
} from './getAccountExtensionReducer';
import actionTypes from './actionTypes';
import * as accountExtensionHelper from './accountExtensionHelper';

describe('AccountExtension Unit Test', () => {
  let accountExtension;
  let store;

  beforeEach(() => {
    accountExtension = sinon.createStubInstance(AccountExtension);
    store = createStore(getDataReducer(actionTypes));
    accountExtension._store = store;
    accountExtension._prefixedActionTypes = actionTypes;
    [
      'isAvailableExtension',
      '_processExtension',
      '_addExtension',
      '_deleteExtension',
      '_fetchExtensionData',
      '_subscriptionHandleFn',
      '_addOrDeleteExtension'
    ].forEach((key) => {
      accountExtension[key].restore();
    });
  });

  describe('isAvailableExtension', () => {
    it('Should return true when availableExtensions contains the extenionNumber', () => {
      const availableExtensions = [{ ext: 123 }];
      sinon.stub(accountExtension, 'availableExtensions', {
        get: () => availableExtensions
      });
      expect(accountExtension.isAvailableExtension(123)).to.equal(true);
    });
    it('Should return true when availableExtensions contains the extenionNumber', () => {
      const availableExtensions = [{ ext: 123 }];
      sinon.stub(accountExtension, 'availableExtensions', {
        get: () => availableExtensions
      });
      expect(accountExtension.isAvailableExtension(456)).to.equal(false);
    });
  });

  describe('_subscriptionHandleFn', () => {
    it('proccssExtension should not be called when message event is incorrect', async () => {
      const message = {
        event: 'abc',
        body: {
          extensions: [{}, {}]
        }
      };
      sinon.stub(accountExtension, '_processExtension');
      await accountExtension._subscriptionHandleFn(message);
      sinon.assert.notCalled(accountExtension._processExtension);
    });
    it('proccssExtension should not be called when got no extensions', async () => {
      const message = {
        event: 'abc',
        body: {}
      };
      sinon.stub(accountExtension, '_processExtension');
      await accountExtension._subscriptionHandleFn(message);
      sinon.assert.notCalled(accountExtension._processExtension);
    });
    it('proccssExtension should be called twice when got two extensions', async () => {
      const message = {
        event: '/extension',
        body: {
          extensions: [{}, {}]
        }
      };
      sinon.stub(accountExtension, '_processExtension');
      await accountExtension._subscriptionHandleFn(message);
      sinon.assert.calledTwice(accountExtension._processExtension);
    });
  });

  describe('_processExtension', () => {
    beforeEach(() => {
      sinon.stub(accountExtension, 'isAvailableExtension');
      sinon.stub(accountExtension, '_addOrDeleteExtension');
      sinon.stub(accountExtension, '_fetchExtensionData').callsFake(() => []);
    });
    it('deleteExtension should be called when eventType is Delete', () => {
      const item = {
        id: 1,
        eventType: 'Delete',
      };
      sinon.stub(accountExtension, '_deleteExtension');
      accountExtension._processExtension(item);
      sinon.assert.calledOnce(accountExtension._deleteExtension);
    });
    it('_addOrDeleteExtension should be called when eventType is Create', async () => {
      const item = {
        id: 1,
        eventType: 'Create',
      };
      await accountExtension._processExtension(item);
      sinon.assert.called(accountExtension._addOrDeleteExtension);
    });
    it('_addOrDeleteExtension should be called when eventType is Update', async () => {
      const item = {
        id: 1,
        eventType: 'Update',
      };
      await accountExtension._processExtension(item);
      sinon.assert.called(accountExtension._addOrDeleteExtension);
    });
  });

  describe('_addOrDeleteExtension', () => {
    beforeEach(() => {
      sinon.stub(accountExtension, '_addExtension');
      sinon.stub(accountExtension, '_deleteExtension');
    });
    it('_deleteExtension should be called when extension is not essential and extension is available', () => {
      accountExtension._addOrDeleteExtension(false, true);
      sinon.assert.called(accountExtension._deleteExtension);
    });
    it('_deleteExtension should not be called when extension is essential and extension is available', async () => {
      accountExtension._addOrDeleteExtension(true, true);
      sinon.assert.notCalled(accountExtension._deleteExtension);
    });
    it('_deleteExtension should not be called when extension is essential and extension is not available', async () => {
      accountExtension._addOrDeleteExtension(true, false);
      sinon.assert.notCalled(accountExtension._deleteExtension);
    });
    it('_deleteExtension should not be called when extension is not essential and extension is not available', async () => {
      accountExtension._addOrDeleteExtension(false, false);
      sinon.assert.notCalled(accountExtension._deleteExtension);
    });
    it('_addExtension should be called when extension is essential and extension is not available', async () => {
      accountExtension._addOrDeleteExtension(true, false);
      sinon.assert.called(accountExtension._addExtension);
    });
    it('_addExtension should not be called when extension is essential and extension is available', async () => {
      accountExtension._addOrDeleteExtension(true, true);
      sinon.assert.notCalled(accountExtension._addExtension);
    });
    it('_addExtension should not be called when extension is not essential and extension is available', async () => {
      accountExtension._addOrDeleteExtension(false, true);
      sinon.assert.notCalled(accountExtension._addExtension);
    });
    it('_addExtension should not be called when extension is not essential and extension is not available', async () => {
      accountExtension._addOrDeleteExtension(false, false);
      sinon.assert.notCalled(accountExtension._addExtension);
    });
  });
});

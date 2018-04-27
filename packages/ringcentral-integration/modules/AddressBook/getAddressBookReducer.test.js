import { expect } from 'chai';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import getAddressBookReducer, {
  getSyncStatusReducer,
  getContactListReducer,
  getSyncTokenReducer,
  getSyncTimestampReducer,
} from './getAddressBookReducer';

import actionTypes from './actionTypes';
import syncStatus from './syncStatus';

describe('getSyncStatusReducer', () => {
  it('should be a function', () => {
    expect(getSyncStatusReducer).to.be.a('function');
  });

  it('should return a reducer', () => {
    expect(getSyncStatusReducer(actionTypes)).to.be.a('function');
  });

  describe('syncStatusReducer', () => {
    const reducer = getSyncStatusReducer(actionTypes);
    it('should have initial state of idle', () => {
      expect(reducer(undefined, {})).to.equal(syncStatus.idle);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return syncing status on sync', () => {
      expect(reducer('foo', { type: actionTypes.sync })).to.equal(syncStatus.syncing);
    });

    it('should return idle status on sync error and sync success', () => {
      [
        actionTypes.syncError,
        actionTypes.syncSuccess,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(syncStatus.idle);
      });
    });
  });
});

describe('getContactListReducer', () => {
  it('should be a function', () => {
    expect(getContactListReducer).to.be.a('function');
  });

  it('should return a reducer', () => {
    expect(getContactListReducer(actionTypes)).to.be.a('function');
  });

  describe('contactListReducer', () => {
    const reducer = getContactListReducer(actionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return original status on syncSuccess and records is empty', () => {
      const originalState = [1];
      expect(reducer(originalState, {
        type: actionTypes.syncSuccess,
        records: [],
      })).to.equal(originalState);
    });

    it('should return new contact list successfully on sync success', () => {
      const originalState = [{
        availability: 'Alive',
        id: 2355305005,
        firstName: 'Sandy"',
        lastName: 'Fox',
      }];
      const records = [
        {
          uri: 'https.../account/1529881004/extension/1529881004/address-book/contact/2355305004',
          availability: 'Alive',
          id: 2355305004,
          firstName: 'Sandy"',
          lastName: 'Fox',
        }
      ];
      expect(reducer(originalState, {
        type: actionTypes.syncSuccess,
        records,
      })).to.deep.equal([
        {
          availability: 'Alive',
          id: 2355305005,
          firstName: 'Sandy"',
          lastName: 'Fox',
        },
        {
          availability: 'Alive',
          id: 2355305004,
          firstName: 'Sandy"',
          lastName: 'Fox',
        },
      ]);
    });

    it('should return new contact list successfully on sync success and contact existed', () => {
      const originalState = [{
        availability: 'Alive',
        id: 2355305004,
        firstName: 'Sandy"',
        lastName: 'Fox',
      }];
      const records = [
        {
          uri: 'https.../account/1529881004/extension/1529881004/address-book/contact/2355305004',
          availability: 'Alive',
          id: 2355305004,
          firstName: 'Sandy"',
          lastName: 'Fox1',
        }
      ];
      expect(reducer(originalState, {
        type: actionTypes.syncSuccess,
        records,
      })).to.deep.equal([
        {
          availability: 'Alive',
          id: 2355305004,
          firstName: 'Sandy"',
          lastName: 'Fox1',
        },
      ]);
    });

    it('should return new contact list without deleted item on sync success', () => {
      const originalState = [{
        availability: 'Alive',
        id: 2355305004,
        firstName: 'Sandy"',
        lastName: 'Fox',
      }];
      const records = [
        {
          uri: 'https.../account/1529881004/extension/1529881004/address-book/contact/2355305004',
          availability: 'Deleted',
          id: 2355305004,
          firstName: 'Sandy"',
          lastName: 'Fox',
        }
      ];
      expect(reducer(originalState, {
        type: actionTypes.syncSuccess,
        records,
      })).to.deep.equal([]);
    });
  });
});

describe('getSyncTokenReducer', () => {
  it('should be a function', () => {
    expect(getSyncTokenReducer).to.be.a('function');
  });

  it('should return a reducer', () => {
    expect(getSyncTokenReducer(actionTypes)).to.be.a('function');
  });

  describe('syncTokenReducer', () => {
    const reducer = getSyncTokenReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return syncToken on syncSuccess', () => {
      expect(reducer('foo', {
        type: actionTypes.syncSuccess,
        syncToken: 'token123',
      })).to.equal('token123');
    });

    it('should return null status on cleanUp', () => {
      expect(reducer('foo', {
        type: actionTypes.cleanUp,
      })).to.equal(null);
    });
  });
});

describe('getSyncTimestampReducer', () => {
  it('should be a function', () => {
    expect(getSyncTimestampReducer).to.be.a('function');
  });

  it('should return a reducer', () => {
    expect(getSyncTimestampReducer(actionTypes)).to.be.a('function');
  });

  describe('syncTimestampReducer', () => {
    const reducer = getSyncTimestampReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return syncTimestamp on syncSuccess', () => {
      expect(reducer('foo', {
        type: actionTypes.syncSuccess,
        syncTime: 'Fri Apr 21 2017 13:39:34 GMT+0800',
      })).to.equal(1492753174000);
    });

    it('should return null status on cleanUp', () => {
      expect(reducer('foo', {
        type: actionTypes.cleanUp,
      })).to.equal(null);
    });
  });
});

describe('getAddressBookReducer', () => {
  it('should be a function', () => {
    expect(getAddressBookReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getAddressBookReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getAddressBookReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const syncStatusReducer = getSyncStatusReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      syncStatus: syncStatusReducer(undefined, {}),
    });
  });
});

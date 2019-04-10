import { expect } from 'chai';
import {
  getDndStatusReducer,
  getLastNotDisturbDndStatusReducer,
  getPresenceStatusReducer,
  getUserStatusReducer,
} from './getPresenceReducer';
import dndStatuses from './dndStatus';
import actionTypes from './actionTypes';

describe('getDndStatusReducer', () => {
  it('should be a function', () => {
    expect(getDndStatusReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getDndStatusReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('dndStatusReducer', () => {
    const reducer = getDndStatusReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it(`should return action.dndStatus on fetchSuccess, notification,
        update, updateError and updateSuccess`, () => {
      [
        actionTypes.fetchSuccess,
        actionTypes.notification,
        actionTypes.updateSuccess,
        actionTypes.update,
        actionTypes.updateError,
      ].forEach((type) => {
        const dndStatus = {};
        expect(reducer(null, {
          type,
          data: { dndStatus },
        })).to.equal(dndStatus);
      });
    });
    it('should return null on reset', () => {
      const dndStatus = {};
      expect(reducer(null, {
        type: actionTypes.reset,
        data: { dndStatus },
      })).to.be.null;
    });
  });
});

describe('getLastNotDisturbDndStatusReducer', () => {
  it('should be a function', () => {
    expect(getLastNotDisturbDndStatusReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getLastNotDisturbDndStatusReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('lastNotDisturbDndStatusReducer', () => {
    const reducer = getLastNotDisturbDndStatusReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it(`should return action.lastDndStatus on fetchSuccess, notification,
        update, updateSuccess`, () => {
      [
        actionTypes.fetchSuccess,
        actionTypes.notification,
        actionTypes.updateSuccess,
        actionTypes.update,
      ].forEach((type) => {
        const dndStatus = {};
        const lastDndStatus = {};
        expect(reducer(null, {
          type,
          data: { dndStatus },
          lastDndStatus,
        })).to.equal(lastDndStatus);
      });
    });
    it(`should return origin state on fetchSuccess, notification,
        update, updateSuccess if dndStatus is equal as dndStatus`, () => {
      [
        actionTypes.fetchSuccess,
        actionTypes.notification,
        actionTypes.updateSuccess,
        actionTypes.update,
      ].forEach((type) => {
        const dndStatus = {};
        const lastDndStatus = dndStatus;
        const originalState = {};
        expect(reducer(originalState, {
          type,
          data: { dndStatus },
          lastDndStatus,
        })).to.equal(originalState);
      });
    });
    it(`should return origin state on fetchSuccess, notification,
        update, updateSuccess if lastDndStatus is doNotAcceptAnyCalls`, () => {
      [
        actionTypes.fetchSuccess,
        actionTypes.notification,
        actionTypes.updateSuccess,
        actionTypes.update,
      ].forEach((type) => {
        const dndStatus = {};
        const lastDndStatus = dndStatuses.doNotAcceptAnyCalls;
        const originalState = {};
        expect(reducer(originalState, {
          type,
          data: { dndStatus },
          lastDndStatus,
        })).to.equal(originalState);
      });
    });
    it('should return null on reset', () => {
      const dndStatus = {};
      expect(reducer(null, {
        type: actionTypes.resetSuccess,
        data: { dndStatus },
      })).to.be.null;
    });
  });
});

describe('getPresenceStatusReducer', () => {
  it('should be a function', () => {
    expect(getPresenceStatusReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getPresenceStatusReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('presenceStatusReducer', () => {
    const reducer = getPresenceStatusReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return presenceStatus on fetchSuccess, notification and updateSuccess', () => {
      [
        actionTypes.fetchSuccess,
        actionTypes.notification,
        actionTypes.updateSuccess,
      ].forEach((type) => {
        const presenceStatus = {};
        expect(reducer(null, {
          type,
          data: { presenceStatus },
        })).to.equal(presenceStatus);
      });
    });
    it('should return null on reset', () => {
      const presenceStatus = {};
      expect(reducer(null, {
        type: actionTypes.reset,
        data: { presenceStatus },
      })).to.be.null;
    });
  });
});

describe('getUserStatusReducer', () => {
  it('should be a function', () => {
    expect(getUserStatusReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getUserStatusReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('userStatusReducer', () => {
    const reducer = getUserStatusReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it(`should return userStatus on fetchSuccess, notification,
        update, updateError and updateSuccess`, () => {
      [
        actionTypes.fetchSuccess,
        actionTypes.notification,
        actionTypes.updateSuccess,
        actionTypes.update,
        actionTypes.updateError,
      ].forEach((type) => {
        const userStatus = {};
        expect(reducer(null, {
          type,
          data: { userStatus },
        })).to.equal(userStatus);
      });
    });
    it('should return null on reset', () => {
      const userStatus = {};
      expect(reducer(null, {
        type: actionTypes.reset,
        data: { userStatus },
      })).to.be.null;
    });
  });
});

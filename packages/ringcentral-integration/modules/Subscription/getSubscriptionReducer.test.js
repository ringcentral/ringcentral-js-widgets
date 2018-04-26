import { expect } from 'chai';
import getSubscriptionReducer, {
  getCachedSubscriptionReducer,
  getFiltersReducer,
  getMessageReducer,
  getSubscriptionStatusReducer,
} from './getSubscriptionReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import actionTypes from './actionTypes';
import subscriptionStatus from './subscriptionStatus';

describe('getMessageReducer', () => {
  it('should be a function', () => {
    expect(getMessageReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getMessageReducer(actionTypes)).to.be.a('function');
  });
  describe('messageReducer', () => {
    const reducer = getMessageReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return message on notification', () => {
      const message = {};
      expect(reducer(null, {
        type: actionTypes.notification,
        message,
      })).to.equal(message);
    });
    it('should return original state for all other actions', () => {
      const originalState = {};
      expect(reducer(originalState, {
        type: 'foo',
      })).to.equal(originalState);
    });
  });
});

describe('getFiltersReducer', () => {
  it('should be a function', () => {
    expect(getFiltersReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getFiltersReducer(actionTypes)).to.be.a('function');
  });
  describe('filtersReducer', () => {
    const reducer = getFiltersReducer(actionTypes);
    it('should have initial state of []', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return filters on setFilters', () => {
      const filters = [];
      expect(reducer(null, {
        type: actionTypes.setFilters,
        filters,
      })).to.equal(filters);
    });
    it('should add new filters on addFilters without duplicates', () => {
      expect(reducer([1, 2, 3], {
        type: actionTypes.addFilters,
        filters: [2, 3, 5],
      })).to.deep.equal([1, 2, 3, 5]);
    });
    it('should remove filters on removeFilters', () => {
      expect(reducer([1, 2, 3], {
        type: actionTypes.removeFilters,
        filters: [1, 2],
      })).to.deep.equal([3]);
    });
    it('should return [] on reset', () => {
      expect(reducer(null, {
        type: actionTypes.resetSuccess,
      })).to.deep.equal([]);
    });
  });
});

describe('getSubscriptionStatusReducer', () => {
  it('should be a function', () => {
    expect(getSubscriptionStatusReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getSubscriptionStatusReducer(actionTypes)).to.be.a('function');
  });
  describe('subscriptionStatusReducer', () => {
    const reducer = getSubscriptionStatusReducer(actionTypes);
    it('should have initial state of notSubscribed', () => {
      expect(reducer(undefined, {})).to.equal(subscriptionStatus.notSubscribed);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return subscribing on subscribe', () => {
      expect(reducer(undefined, {
        type: actionTypes.subscribe,
      }))
      .to.equal(subscriptionStatus.subscribing);
    });
    it('should return unsubscribing on remove', () => {
      expect(reducer(undefined, {
        type: actionTypes.remove,
      }))
      .to.equal(subscriptionStatus.unsubscribing);
    });
    it('should return subscribed on subscribeSuccess, renewSuccess', () => {
      [
        actionTypes.subscribeSuccess,
        actionTypes.renewSuccess,
      ].forEach(type => {
        expect(reducer(undefined, {
          type,
        }))
        .to.equal(subscriptionStatus.subscribed);
      });
    });
    it('should return notSubscribed on renewError, resetSuccess, removeSuccess, removeError, subscribeError', () => {
      [
        actionTypes.renewError,
        actionTypes.resetSuccess,
        actionTypes.removeSuccess,
        actionTypes.removeError,
        actionTypes.subscribeError,
      ].forEach(type => {
        expect(reducer(undefined, {
          type,
        }))
        .to.equal(subscriptionStatus.notSubscribed);
      });
    });
  });
});


describe('getCachedSubscriptionReducer', () => {
  it('should be a function', () => {
    expect(getCachedSubscriptionReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getCachedSubscriptionReducer(actionTypes)).to.be.a('function');
  });
  describe('cachedSubscriptionReducer', () => {
    const reducer = getCachedSubscriptionReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return subscription on renewSuccess and subscribeSuccess', () => {
      const subscription = {};
      expect(reducer(null, {
        type: actionTypes.renewSuccess,
        subscription,
      })).to.equal(subscription);
      expect(reducer(null, {
        type: actionTypes.subscribeSuccess,
        subscription,
      })).to.equal(subscription);
    });
    it('should return null for removeSuccess, subscribeError, renewError', () => {
      [
        actionTypes.renewError,
        actionTypes.removeSuccess,
        actionTypes.subscribeError,
      ].forEach(type => {
        expect(reducer('foo', {
          type,
        })).to.be.null;
      });
    });
  });
});

describe('getSubscriptionReducer', () => {
  it('should be a function', () => {
    expect(getSubscriptionReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getSubscriptionReducer(actionTypes)).to.be.a('function');
  });
  describe('subscriptionReducer', () => {
    const reducer = getSubscriptionReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const filtersReducer = getFiltersReducer(actionTypes);
    const messageReducer = getMessageReducer(actionTypes);
    const subscriptionStatusReducer = getSubscriptionStatusReducer(actionTypes);
    it('should return combined state', () => {
      expect(reducer(undefined, {}))
        .to.deep.equal({
          status: statusReducer(undefined, {}),
          filters: filtersReducer(undefined, {}),
          message: messageReducer(undefined, {}),
          subscriptionStatus: subscriptionStatusReducer(undefined, {}),
        });
    });
  });
});

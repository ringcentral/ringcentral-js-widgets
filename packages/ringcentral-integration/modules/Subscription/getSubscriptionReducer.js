import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import subscriptionStatus from './subscriptionStatus';

export function getCachedSubscriptionReducer(types) {
  return (state = null, { type, subscription }) => {
    switch (type) {
      case types.renewSuccess:
      case types.subscribeSuccess:
        return subscription;

      case types.removeSuccess:
      case types.subscribeError:
      case types.renewError:
        return null;

      default:
        return state;
    }
  };
}

export function getSubscriptionStatusReducer(types) {
  return (state = subscriptionStatus.notSubscribed, { type }) => {
    switch (type) {
      case types.subscribe:
        return subscriptionStatus.subscribing;

      case types.subscribeSuccess:
      case types.renewSuccess:
        return subscriptionStatus.subscribed;

      case types.renewError:
      case types.resetSuccess:
      case types.removeSuccess:
      case types.removeError:
      case types.subscribeError:
        return subscriptionStatus.notSubscribed;

      case types.remove:
        return subscriptionStatus.unsubscribing;

      default:
        return state;
    }
  };
}

export function getMessageReducer(types) {
  return (state = null, { type, message = state }) => {
    if (type === types.notification) {
      return message;
    } else if (type === types.resetSuccess) {
      return null;
    }
    return state;
  };
}


export function getFiltersReducer(types) {
  return (state = [], { type, filters }) => {
    switch (type) {
      case types.setFilters:
        return filters;

      case types.addFilters: {
        const filterMap = {};
        return state.concat(filters).filter((f) => {
          if (!filterMap[f]) {
            filterMap[f] = true;
            return true;
          }
          return false;
        });
      }
      case types.removeFilters: {
        const filterMap = {};
        filters.forEach((f) => {
          filterMap[f] = true;
        });
        return state.filter(f => !filterMap[f]);
      }
      case types.resetSuccess:
        return [];

      default:
        return state;
    }
  };
}


export default function getSubscriptionReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    message: getMessageReducer(types),
    filters: getFiltersReducer(types),
    subscriptionStatus: getSubscriptionStatusReducer(types),
  });
}

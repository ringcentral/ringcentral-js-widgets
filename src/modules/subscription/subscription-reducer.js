import { prefixActions } from '../../lib/redux-helper';
import subscriptionActions from './subscription-actions';
import { subscriptionEvents } from './subscription-events';

const initialState = {
  cacheKey: null,
  filters: [],
  status: subscriptionEvents.pending,
};

export default function getSubscriptionReducer(prefix) {
  const actions = prefixActions(subscriptionActions, prefix);
  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);
    if (!action) return state;
    switch (action.type) {
      case actions.updateStatus:
        return Object.assign(
          {},
          state,
          {
            status: action.status,
            subscription: actions.subscription,
          },
        );

      case actions.updateFilters:
        return Object.assign(
          {},
          state,
          {
            filters: action.filters.slice(),
          },
        );

      default:
        return state;
    }
  };
}

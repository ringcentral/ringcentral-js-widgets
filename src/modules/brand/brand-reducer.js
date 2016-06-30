import brandActions from './brand-actions';
import { prefixActions } from '../../lib/redux-helper';


export default function getReducer(initialState, prefix) {
  const actions = prefixActions(brandActions, prefix);
  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);

    if (!action) return state;
    switch (action.type) {
      case actions.setBrand:
        return Object.assign({}, state, {
          name: action.payload.name,
          id: action.payload.id,
        });
      default:
        return state;
    }
  };
}

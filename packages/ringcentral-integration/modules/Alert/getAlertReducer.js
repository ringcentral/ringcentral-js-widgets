import { combineReducers } from 'redux';
import 'core-js/fn/array/find';

export function getMessagesReducer(types) {
  return (state = [], {
    type,
    message,
    payload,
    ttl,
    level,
    ids,
    timestamp,
    id,
    allowDuplicates,
  }) => {
    switch (type) {
      case types.alert:
        if (!allowDuplicates && state.find(item => item.message === message)) {
          return state;
        }
        return [
          ...state,
          {
            id,
            message,
            payload,
            ttl,
            level,
            timestamp,
          },
        ];
      case types.dismiss:
        return state.filter(item => ids.indexOf(item.id) === -1);
      case types.dismissAll:
        return [];
      default:
        return state;
    }
  };
}

export default function getAlertReducer(types) {
  return combineReducers({
    messages: getMessagesReducer(types),
  });
}


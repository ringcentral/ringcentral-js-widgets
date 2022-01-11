import { combineReducers } from 'redux';

export function getSenderNumberReducer(types) {
  return (state = null, { type, number }) => {
    switch (type) {
      case types.updateSenderNumber:
        return number;
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

export default function getCacheReducer(types) {
  return combineReducers({
    senderNumber: getSenderNumberReducer(types),
  });
}

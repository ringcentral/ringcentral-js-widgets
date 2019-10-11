import { combineReducers } from 'redux';

export function getContactSearchReducer(types) {
  return (state = {}, { type, entities, sourceName, searchString, ttl }) => {
    switch (type) {
      case types.save: {
        const data = {};
        Object.keys(state).forEach((key) => {
          if (Date.now() - state[key].timestamp < ttl) {
            data[key] = state[key];
          }
        });
        const key = `${sourceName}-${searchString}`;
        data[key] = {
          entities,
          timestamp: Date.now(),
        };
        return data;
      }
      case types.initSuccess:
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

export default function getCacheReducer(types) {
  return combineReducers({
    contactSearch: getContactSearchReducer(types),
  });
}

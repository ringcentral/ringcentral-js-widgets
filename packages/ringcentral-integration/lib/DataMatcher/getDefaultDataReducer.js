
export default function getDefaultDataReducer(actionTypes) {
  return (state = {}, {
    type,
    data,
    name,
    ttl,
    timestamp,
    queries,
    shouldCleanUpAll = false,
  }) => {
    switch (type) {
      case actionTypes.matchSuccess: {
        const newState = { ...state };
        queries.forEach((query) => {
          if (data[query] && data[query].length) {
            newState[query] = {
              ...newState[query],
              [name]: {
                data: data[query],
                _t: timestamp,
              },
            };
          } else {
            // assume match not found if not in data
            newState[query] = {
              ...newState[query],
              [name]: {
                _t: timestamp, // for noMatchTtl check
                data: [],
              },
            };
          }
        });
        return newState;
      }
      case actionTypes.cleanUp: {
        if (shouldCleanUpAll) {
          return {};
        }
        const newState = {};
        let hasChanges = false;

        // optimize for large queries list
        const queriesMap = {};
        queries.forEach((query) => {
          queriesMap[query] = true;
        });
        Object.keys(state).forEach((query) => {
          if (!queriesMap[query]) {
            if (!state[query]._t) {
              // mark for deletion
              newState[query] = {
                ...state[query],
                _t: timestamp,
              };
              hasChanges = true;
            } else if (timestamp - state[query]._t < ttl) {
              // not expired yet
              newState[query] = state[query];
            } else {
              // entry is removed
              hasChanges = true;
            }
          } else if (state[query]._t) {
            // if entry shows up in queries again
            // remove the timestamp
            newState[query] = {
              ...state[query],
            };
            delete newState[query]._t;
            hasChanges = true;
          } else {
            newState[query] = state[query];
          }
        });
        return hasChanges ?
          newState :
          state;
      }
      case actionTypes.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

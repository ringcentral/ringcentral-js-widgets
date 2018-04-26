export function getDataReducer(types) {
  return (state = null, { type, data, id, }) => {
    switch (type) {
      case types.fetchSuccess:
        return Array.isArray(data) ?
          data.filter(item => item.status !== 'Disabled') :
          data;
      case types.add:
        return Array.isArray(state) ?
          [...state, data] :
          null;
      case types.delete:
        return Array.isArray(state) ?
          state.filter(item => item.id !== id) :
          null;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export function getTimestampReducer(types) {
  return (state = null, { type, timestamp }) => {
    switch (type) {
      case types.fetchSuccess:
      case types.add:
      case types.delete:
        return timestamp;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

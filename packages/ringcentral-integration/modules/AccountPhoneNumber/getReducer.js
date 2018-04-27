import removeUri from '../../lib/removeUri';

export function getDataReducer(types) {
  return (state = null, { type, data, hasPermission }) => {
    switch (type) {
      case types.fetchSuccess:
        return data && data.map(item => ({
          ...item,
          extension: removeUri(item.extension),
        }));
      case types.resetSuccess:
        return null;
      case types.initSuccess:
        if (hasPermission) {
          return state;
        }
        return null;
      default:
        return state;
    }
  };
}

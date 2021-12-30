import { reject } from 'ramda';

export function getDataReducer(types) {
  return (state = [], { type, data, contact }) => {
    switch (type) {
      case types.fetchSuccess:
        return data;
      case types.upsert:
        return [...reject((item) => item.id === contact.id, state), contact];
      case types.delete:
        return reject((item) => item.id === contact.id, state);
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getShowDisabledReducer(types, defaultValue = false) {
  return (state = defaultValue, { type, showDisabled }) => {
    switch (type) {
      case types.setShowDisabled:
        return showDisabled;
      default:
        return state;
    }
  };
}

export function getShowNotActivatedReducer(types, defaultValue = false) {
  return (state = defaultValue, { type, showNotActivated }) => {
    switch (type) {
      case types.setShowNotActivated:
        return showNotActivated;
      default:
        return state;
    }
  };
}

export function getExtensionTypeFiltersReducer(types, defaultValue = []) {
  return (state = [...defaultValue], { type, typeFilters }) => {
    switch (type) {
      case types.setExtensionTypeFilters:
        return typeFilters;
      default:
        return state;
    }
  };
}

export function getTimestampReducer(types) {
  return (state = null, { type, timestamp }) => {
    switch (type) {
      case types.fetchSuccess:
      case types.upsert:
      case types.delete:
        return timestamp;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

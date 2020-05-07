import { combineReducers } from 'redux';

export function getMessagesReducer(types) {
  return (
    state = [],
    {
      type,
      message,
      payload,
      ttl,
      level,
      ids,
      timestamp,
      id,
      allowDuplicates,
      loading,
      backdrop,
      classes,
      onBackdropClick,
      action,
    },
  ) => {
    switch (type) {
      case types.alert:
        if (
          !allowDuplicates &&
          state.find((item) => item.message === message && item.level === level)
        ) {
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
            loading,
            backdrop,
            classes,
            onBackdropClick,
            action,
          },
        ];
      case types.update:
        return state.map((item) =>
          item.id === id
            ? {
                ...item,
                message,
                loading,
                action,
              }
            : item,
        );

      case types.dismiss:
        return state.filter((item) => ids.indexOf(item.id) === -1);
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

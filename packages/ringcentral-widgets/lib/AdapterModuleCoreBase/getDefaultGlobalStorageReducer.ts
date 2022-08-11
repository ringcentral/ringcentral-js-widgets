import { combineReducers } from 'redux';

export function getClosedReducer(types: any) {
  return (state = false, { type, closed }: any) => {
    switch (type) {
      case types.syncClosed:
        return !!closed;
      case types.showAdapter:
        return false;
      default:
        return state;
    }
  };
}

export function getMinimizedReducer(types: any) {
  return (state = false, { type, minimized }: any) => {
    switch (type) {
      case types.syncMinimized:
        return !!minimized;
      case types.showAdapter:
        return false;
      default:
        return state;
    }
  };
}

export function getSizeReducer(types: any) {
  return (state = { width: 300, height: 500 }, { type, size = {} }: any) => {
    switch (type) {
      case types.syncSize:
        return {
          ...state,
          ...size,
        };
      default:
        return state;
    }
  };
}

export function getPositionReducer(types: any) {
  return (
    state = {
      translateX: null,
      translateY: null,
      minTranslateX: null,
      minTranslateY: null,
    },
    {
      type,

      position: {
        translateX = state.translateX,
        translateY = state.translateY,
        minTranslateX = state.minTranslateX,
        minTranslateY = state.minTranslateY,
      } = {},
    }: any,
  ) => {
    if (type === types.syncPosition) {
      return {
        translateX,
        translateY,
        minTranslateX,
        minTranslateY,
      };
    }
    return state;
  };
}

export default function getDefaultGlobalStorageReducer(types: any) {
  return combineReducers({
    closed: getClosedReducer(types),
    minimized: getMinimizedReducer(types),
    size: getSizeReducer(types),
    position: getPositionReducer(types),
  });
}

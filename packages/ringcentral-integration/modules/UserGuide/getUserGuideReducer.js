import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getGuidesReducer(types) {
  return (state = {}, { type, guides }) => {
    if (type === types.loadGuides) {
      return guides;
    }
    return state;
  };
}

export function getCarouselState(types) {
  return (
    state = {
      curIdx: 0,
      entered: false,
      playing: false,
    },
    {
      type,
      curIdx,
      entered,
      playing,
    }
  ) => {
    if (type === types.updateCarousel) {
      return { curIdx, entered, playing };
    }
    return state;
  };
}

export default function getUserGuideReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    carouselState: getCarouselState(types)
  });
}

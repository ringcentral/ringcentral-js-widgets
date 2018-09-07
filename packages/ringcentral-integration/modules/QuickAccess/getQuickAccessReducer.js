import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getupdatePageReducer(types) {
  return (state = false, { type, entered = state }) => {
    if (type === types.updatePage) {
      return entered;
    }
    return state;
  };
}


export default function getQuickAccessrReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    entered: getupdatePageReducer(types),
  });
}

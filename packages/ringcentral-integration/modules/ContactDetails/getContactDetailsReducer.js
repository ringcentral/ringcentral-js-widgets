import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getContactSearchConditions(types) {
  return (state = null, { type, condition }) => {
    switch (type) {
      case types.updateCondition:
        if (condition) return condition;
        return state;
      case types.resetCondition:
        return null;
      default:
        return state;
    }
  };
}

export default function getContactDetailsReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    condition: getContactSearchConditions(types),
  });
}

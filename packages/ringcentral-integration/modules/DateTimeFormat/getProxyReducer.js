import { combineReducers } from 'redux';
import getProxyStatusReducer from '../../lib/getProxyStatusReducer';

export default function getProxyReducer(types) {
  return combineReducers({
    status: getProxyStatusReducer(types),
  });
}

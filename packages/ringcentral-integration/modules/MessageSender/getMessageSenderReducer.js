import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import messageSenderStatus from './messageSenderStatus';

export function getMessageSenderStatusReducer(types) {
  return (state = messageSenderStatus.idle, { type }) => {
    switch (type) {
      case types.validate:
        return messageSenderStatus.validating;
      case types.send:
        return messageSenderStatus.sending;
      case types.sendOver:
      case types.sendError:
      case types.validateError:
      case types.validateOver:
        return messageSenderStatus.idle;
      default:
        return state;
    }
  };
}

export default function getMessageSenderReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    sendStatus: getMessageSenderStatusReducer(types),
  });
}

import 'core-js/fn/array/find';
import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getSenderNumber(types) {
  return (state = '', { type, number }) => {
    switch (type) {
      case types.updateSenderNumber:
        return number;
      default:
        return state;
    }
  };
}

export function getTypingToNumber(types) {
  return (state = '', { type, number }) => {
    switch (type) {
      case types.updateTypingToNumber:
        return number;
      case types.clean:
      case types.cleanTypingToNumber:
        return '';
      default:
        return state;
    }
  };
}

export function getToNumberEntityReducer(types) {
  return (state = '', { type, entityId }) => {
    switch (type) {
      case types.toNumberMatched:
        return entityId;
      case types.clean:
      case types.cleanTypingToNumber:
        return '';
      default:
        return state;
    }
  };
}

export function getToNumbers(types) {
  return (state = [], { type, number }) => {
    const newState = state.slice();
    switch (type) {
      case types.addToNumber:
        // known entity id eg. from click2SMS
        if (number.id) {
          const idx = newState.findIndex(item => (
            number.id === item.id || number.phoneNumber === item.phoneNumber
          ));
          if (idx > -1) {
            // replace old one if found
            newState[idx] = number;
            return newState;
          }
        } else {
          const oldNumber = newState.find(item => (
            number.phoneNumber === item.phoneNumber
          ));
          if (oldNumber) {
            return newState;
          }
        }
        newState.push(number);
        return newState;
      case types.removeToNumber:
        return state.filter(item => (
          item.phoneNumber !== number.phoneNumber
        ));
      case types.clean:
        return [];
      default:
        return state;
    }
  };
}

export function getMessageText(types) {
  return (state = '', { type, text }) => {
    switch (type) {
      case types.updateMessageText:
        return text;
      case types.clean:
        return '';
      default:
        return state;
    }
  };
}

export default function getComposeTextReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    senderNumber: getSenderNumber(types),
    typingToNumber: getTypingToNumber(types),
    toNumbers: getToNumbers(types),
    messageText: getMessageText(types),
    toNumberEntity: getToNumberEntityReducer(types),
  });
}

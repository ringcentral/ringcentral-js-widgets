import getDialerUIReducer from '../DialerUI/getReducer';

export function getLastSessionIdReducer(types) {
  return (state = null, { type, sessionId }) => {
    switch (type) {
      case types.setLastSessionId:
        return sessionId;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

export default function getReducer(types) {
  return getDialerUIReducer(types, {
    lastSessionId: getLastSessionIdReducer(types),
  });
}

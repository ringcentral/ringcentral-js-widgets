import { prefixEnum } from '../Enum';
import baseActionTypes from './baseActionTypes';

export default function getProxyServerReducer({ moduleReducer, transport, prefix }) {
  const actionTypes = prefixEnum({ enumMap: baseActionTypes, prefix });
  return (
    state = {
      target: moduleReducer(undefined, {
        type: actionTypes.initModule,
      }),
      lastAction: null,
      actionNumber: -1,
    },
    action,
  ) => {
    if (!action) return state;
    const nextActionNumber = state.actionNumber + 1;
    transport.push({
      payload: {
        type: actionTypes.action,
        action,
        actionNumber: nextActionNumber,
      },
    });
    return {
      target: moduleReducer(state.target, action),
      lastAction: action,
      actionNumber: nextActionNumber,
    };
  };
}

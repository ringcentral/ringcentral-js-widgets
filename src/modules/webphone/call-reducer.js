import callActions from './call-actions';
import callStatus from '../../enums/call-status';

const initialState = {
  status: null,
};

export default function (state, action) {
  if (typeof state === 'undefined') return Object.assign({}, initialState);
  if (!action) return state;
  switch (action.type) {

    case callActions.record:
      return Object.assign({}, state, {
        status: callStatus.record,
      });
    case callActions.stopRecord:
      return Object.assign({}, state, {
        status: null,
      });

    default:
      return state;
  }
}

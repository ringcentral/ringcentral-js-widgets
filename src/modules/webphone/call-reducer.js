import callActions from './call-actions';
import callStatus from '../../enums/call-status';

function contain(arr, ele) {
  return arr.indexOf(ele) > -1;
}

function remove(arr, ele) {
  if (contain(arr, ele)) {
    arr.splice(arr.indexOf(ele), 1);
  }
  return arr;
}

const initialState = {
  // operations which is enable
  status: [],
  // some operations will disable another, such as 'hold'
  disabled: [],
  // some operations have infomation need to be stored
  transferTaget: null,
  flipTarget: null,
  dtmfNumber: null,
  // operation error
  error: null,
};

export default function (state, action) {
  if (typeof state === 'undefined') return Object.assign({}, initialState);
  if (!action) return state;
  switch (action.type) {

    case callActions.error:
      return Object.assign({}, state, {
        error: action.error,
      });
    case callActions.clear:
      return Object.assign({}, initialState);
    case callActions.record:
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.recording) ?
                  state.status :
                  state.status.concat(callStatus.recording),
      });
    case callActions.stopRecord:
      return Object.assign({}, state, {
        status: remove(state.status, callStatus.recording),
      });
    case callActions.mute:
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.muted) ?
                  state.status :
                  state.status.concat(callStatus.muted),
      });
    case callActions.unmute:
      return Object.assign({}, state, {
        status: remove(state.status, callStatus.muted),
      });
    case callActions.hold:
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.holding) ?
                  state.status :
                  state.status.concat(callStatus.holding),
        disabled: ['park', 'record'],
      });
    case callActions.unhold:
      return Object.assign({}, state, {
        status: remove(state.status, callStatus.holding),
        disabled: [],
      });
    case callActions.park:
      // https://en.wikipedia.org/wiki/Call_parking
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.parker) ?
                  state.status :
                  state.status.concat(callStatus.parker),
      });
    case callActions.transfer:
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.transfered) ?
                  state.status :
                  state.status.concat(callStatus.transfered),
        transferTaget: action.payload.number,
      });
    case callActions.flip:
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.flip) ?
                  state.status :
                  state.status.concat(callStatus.flip),
        flipTarget: action.payload.number,
      });
    case callActions.dtmf:
      // TODO: clarify park action
      return Object.assign({}, state, {
        status: state.status.concat(callStatus.parked),
        dtmfNumber: action.payload.number,
      });

    default:
      return state;
  }
}

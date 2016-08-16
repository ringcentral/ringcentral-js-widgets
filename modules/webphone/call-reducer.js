'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = function (state, action) {
  if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
  if (!action) return state;
  switch (action.type) {

    case _callActions2.default.error:
      return (0, _assign2.default)({}, state, {
        error: action.error
      });
    case _callActions2.default.clear:
      return (0, _assign2.default)({}, initialState);
    case _callActions2.default.record:
      return (0, _assign2.default)({}, state, {
        status: contain(state.status, _callStatus2.default.recording) ? state.status : state.status.concat(_callStatus2.default.recording)
      });
    case _callActions2.default.stopRecord:
      return (0, _assign2.default)({}, state, {
        status: remove(state.status, _callStatus2.default.recording)
      });
    case _callActions2.default.mute:
      return (0, _assign2.default)({}, state, {
        status: contain(state.status, _callStatus2.default.muted) ? state.status : state.status.concat(_callStatus2.default.muted)
      });
    case _callActions2.default.unmute:
      return (0, _assign2.default)({}, state, {
        status: remove(state.status, _callStatus2.default.muted)
      });
    case _callActions2.default.hold:
      return (0, _assign2.default)({}, state, {
        status: contain(state.status, _callStatus2.default.holding) ? state.status : state.status.concat(_callStatus2.default.holding),
        disabled: ['park', 'record']
      });
    case _callActions2.default.unhold:
      return (0, _assign2.default)({}, state, {
        status: remove(state.status, _callStatus2.default.holding),
        disabled: []
      });
    case _callActions2.default.park:
      // https://en.wikipedia.org/wiki/Call_parking
      return (0, _assign2.default)({}, state, {
        status: contain(state.status, _callStatus2.default.parker) ? state.status : state.status.concat(_callStatus2.default.parker)
      });
    case _callActions2.default.transfer:
      return (0, _assign2.default)({}, state, {
        status: contain(state.status, _callStatus2.default.transfered) ? state.status : state.status.concat(_callStatus2.default.transfered),
        transferTaget: action.payload.number
      });
    case _callActions2.default.flip:
      return (0, _assign2.default)({}, state, {
        status: contain(state.status, _callStatus2.default.flip) ? state.status : state.status.concat(_callStatus2.default.flip),
        flipTarget: action.payload.number
      });
    case _callActions2.default.dtmf:
      // TODO: clarify park action
      return (0, _assign2.default)({}, state, {
        status: state.status.concat(_callStatus2.default.parked),
        dtmfNumber: action.payload.number
      });

    default:
      return state;
  }
};

var _callActions = require('./call-actions');

var _callActions2 = _interopRequireDefault(_callActions);

var _callStatus = require('./call-status');

var _callStatus2 = _interopRequireDefault(_callStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function contain(arr, ele) {
  return arr.indexOf(ele) > -1;
}

function remove(arr, ele) {
  if (contain(arr, ele)) {
    arr.splice(arr.indexOf(ele), 1);
  }
  return arr;
}

var initialState = {
  // operations which is enable
  status: [],
  // some operations will disable another, such as 'hold'
  disabled: [],
  // some operations have infomation need to be stored
  transferTaget: null,
  flipTarget: null,
  dtmfNumber: null,
  // operation error
  error: null
};
//# sourceMappingURL=call-reducer.js.map

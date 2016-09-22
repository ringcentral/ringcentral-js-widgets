'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getStorageReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _storageActions = require('./storage-actions');

var _storageActions2 = _interopRequireDefault(_storageActions);

var _storageStatus = require('./storage-status');

var _storageStatus2 = _interopRequireDefault(_storageStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStorageReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_storageActions2.default, prefix);
  var tmp = null;
  return function (state, action) {
    if (!state) {
      return {
        data: {},
        key: null,
        status: _storageStatus2.default.pending,
        error: null
      };
    }
    if (!action) {
      return state;
    }
    switch (action.type) {

      case actions.init:
        return {
          data: action.data,
          key: action.key,
          status: action.status,
          error: action.error
        };

      case actions.update:
        return (0, _extends3.default)({}, state, {
          data: (0, _extends3.default)({}, state.data, action.data),
          status: _storageStatus2.default.dirty
        });

      case actions.remove:
        tmp = (0, _extends3.default)({}, state.data);
        delete tmp[action.key];
        return (0, _extends3.default)({}, state, {
          data: tmp,
          status: _storageStatus2.default.dirty
        });

      case actions.save:
        return (0, _extends3.default)({}, state, {
          status: _storageStatus2.default.saving
        });

      case actions.saveSuccess:
        return (0, _extends3.default)({}, state, {
          status: _storageStatus2.default.saved
        });

      case actions.saveError:
        return (0, _extends3.default)({}, state, {
          status: _storageStatus2.default.dirty
        });

      case actions.reload:
        return (0, _extends3.default)({}, state, {
          status: _storageStatus2.default.reloading
        });

      case actions.reloadSuccess:
        return (0, _extends3.default)({}, state, {
          data: action.data,
          status: _storageStatus2.default.saved
        });

      case actions.reloadError:
        return (0, _extends3.default)({}, state, {
          error: action.error,
          status: _storageStatus2.default.dirty
        });

      case actions.reset:
        return {
          status: _storageStatus2.default.pending,
          data: {},
          key: null,
          error: null
        };

      default:
        return state;
    }
  };
}
//# sourceMappingURL=get-storage-reducer.js.map

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require("babel-runtime/helpers/extends");

var _extends5 = _interopRequireDefault(_extends4);

exports.default = getDefaultDataReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefaultDataReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        data = _ref.data,
        name = _ref.name,
        ttl = _ref.ttl,
        timestamp = _ref.timestamp,
        queries = _ref.queries;

    switch (type) {
      case actionTypes.matchSuccess:
        {
          var newState = (0, _extends5.default)({}, state);
          queries.forEach(function (query) {
            if (data[query] && data[query].length) {
              newState[query] = (0, _extends5.default)({}, newState[query], (0, _defineProperty3.default)({}, name, {
                data: data[query],
                _t: timestamp
              }));
            } else {
              // assume match not found if not in data
              newState[query] = (0, _extends5.default)({}, newState[query], (0, _defineProperty3.default)({}, name, {
                _t: timestamp, // for noMatchTtl check
                data: []
              }));
            }
          });
          return newState;
        }
      case actionTypes.cleanUp:
        {
          var _newState = {};
          var hasChanges = false;

          // optimize for large queries list
          var queriesMap = {};
          queries.forEach(function (query) {
            queriesMap[query] = true;
          });
          (0, _keys2.default)(state).forEach(function (query) {
            if (!queriesMap[query]) {
              if (!state[query]._t) {
                // mark for deletion
                _newState[query] = (0, _extends5.default)({}, state[query], {
                  _t: timestamp
                });
                hasChanges = true;
              } else if (timestamp - state[query]._t < ttl) {
                // not expired yet
                _newState[query] = state[query];
              } else {
                // entry is removed
                hasChanges = true;
              }
            } else if (state[query]._t) {
              // if entry shows up in queries again
              // remove the timestamp
              _newState[query] = (0, _extends5.default)({}, state[query]);
              delete _newState[query]._t;
              hasChanges = true;
            } else {
              _newState[query] = state[query];
            }
          });
          return hasChanges ? _newState : state;
        }
      case actionTypes.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}
//# sourceMappingURL=getDefaultDataReducer.js.map

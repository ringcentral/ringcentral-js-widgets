"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getDefaultDataReducer;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.name");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDefaultDataReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        data = _ref.data,
        name = _ref.name,
        ttl = _ref.ttl,
        timestamp = _ref.timestamp,
        queries = _ref.queries,
        _ref$shouldCleanUpAll = _ref.shouldCleanUpAll,
        shouldCleanUpAll = _ref$shouldCleanUpAll === void 0 ? false : _ref$shouldCleanUpAll;

    switch (type) {
      case actionTypes.matchSuccess:
      case actionTypes.insertMatchEntries:
        {
          var newState = _objectSpread({}, state);

          queries.forEach(function (query) {
            if (data[query] && data[query].length) {
              newState[query] = _objectSpread(_objectSpread({}, newState[query]), {}, _defineProperty({}, name, {
                data: data[query],
                _t: timestamp
              }));
            } else {
              // assume match not found if not in data
              newState[query] = _objectSpread(_objectSpread({}, newState[query]), {}, _defineProperty({}, name, {
                _t: timestamp,
                // for noMatchTtl check
                data: []
              }));
            }
          });
          return newState;
        }

      case actionTypes.cleanUp:
        {
          if (shouldCleanUpAll) {
            return {};
          }

          var _newState = {};
          var hasChanges = false; // optimize for large queries list

          var queriesMap = {};
          queries.forEach(function (query) {
            queriesMap[query] = true;
          });
          Object.keys(state).forEach(function (query) {
            if (!queriesMap[query]) {
              if (!state[query]._t) {
                // mark for deletion
                _newState[query] = _objectSpread(_objectSpread({}, state[query]), {}, {
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
              _newState[query] = _objectSpread({}, state[query]);
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

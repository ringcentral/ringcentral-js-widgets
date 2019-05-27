"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContactSearchReducer = getContactSearchReducer;
exports["default"] = getCacheReducer;

require("core-js/modules/es6.date.now");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

var _redux = require("redux");

function getContactSearchReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        entities = _ref.entities,
        sourceName = _ref.sourceName,
        searchString = _ref.searchString,
        ttl = _ref.ttl;

    switch (type) {
      case types.save:
        {
          var data = {};
          Object.keys(state).forEach(function (key) {
            if (Date.now() - state[key].timestamp < ttl) {
              data[key] = state[key];
            }
          });
          var key = "".concat(sourceName, "-").concat(searchString);
          data[key] = {
            entities: entities,
            timestamp: Date.now()
          };
          return data;
        }

      case types.initSuccess:
      case types.cleanUp:
        return {};

      default:
        return state;
    }
  };
}

function getCacheReducer(types) {
  return (0, _redux.combineReducers)({
    contactSearch: getContactSearchReducer(types)
  });
}
//# sourceMappingURL=getCacheReducer.js.map

"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProfileImagesReducer = getProfileImagesReducer;
exports.getContactPresencesReducer = getContactPresencesReducer;
exports.default = getContactsReducer;

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProfileImagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        imageId = _ref.imageId,
        imageUrl = _ref.imageUrl,
        ttl = _ref.ttl;

    switch (type) {
      case types.fetchImageSuccess:
        {
          var data = {};
          Object.keys(state).forEach(function (key) {
            if (Date.now() - state[key].timestamp < ttl) {
              data[key] = state[key];
            } else {
              URL.revokeObjectURL(state[key].imageUrl);
            }
          });
          data[imageId] = {
            imageUrl: imageUrl,
            timestamp: Date.now()
          };
          return data;
        }

      case types.resetSuccess:
        {
          Object.keys(state).forEach(function (key) {
            URL.revokeObjectURL(state[key].imageUrl);
          });
          return {};
        }

      default:
        return state;
    }
  };
}

function getContactPresencesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        _ref2$presenceMap = _ref2.presenceMap,
        presenceMap = _ref2$presenceMap === void 0 ? {} : _ref2$presenceMap,
        ttl = _ref2.ttl;

    switch (type) {
      case types.batchFetchPresenceSuccess:
        {
          var data = {};
          Object.keys(state).forEach(function (key) {
            if (Date.now() - state[key].timestamp < ttl) {
              data[key] = state[key];
            }
          });
          Object.keys(presenceMap).forEach(function (key) {
            data[key] = {
              presence: presenceMap[key],
              timestamp: Date.now()
            };
          });
          return data;
        }

      case types.resetSuccess:
        return {};

      default:
        return state;
    }
  };
}

function getContactsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.default)(types),
    profileImages: getProfileImagesReducer(types),
    presences: getContactPresencesReducer(types)
  });
}
//# sourceMappingURL=getReducer.js.map

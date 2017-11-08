'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.getProfileImagesReducer = getProfileImagesReducer;
exports.getContactPresencesReducer = getContactPresencesReducer;
exports.default = getContactsReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProfileImagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        imageId = _ref.imageId,
        imageUrl = _ref.imageUrl,
        ttl = _ref.ttl;

    switch (type) {
      case types.fetchImageSuccess:
        {
          var data = {};
          (0, _keys2.default)(state).forEach(function (key) {
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
          (0, _keys2.default)(state).forEach(function (key) {
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
    var _ref2 = arguments[1];
    var type = _ref2.type,
        _ref2$presenceMap = _ref2.presenceMap,
        presenceMap = _ref2$presenceMap === undefined ? {} : _ref2$presenceMap,
        ttl = _ref2.ttl;

    switch (type) {
      case types.batchFetchPresenceSuccess:
        {
          var data = {};
          (0, _keys2.default)(state).forEach(function (key) {
            if (Date.now() - state[key].timestamp < ttl) {
              data[key] = state[key];
            }
          });
          (0, _keys2.default)(presenceMap).forEach(function (key) {
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
    status: (0, _getModuleStatusReducer2.default)(types),
    profileImages: getProfileImagesReducer(types),
    presences: getContactPresencesReducer(types)
  });
}
//# sourceMappingURL=getReducer.js.map

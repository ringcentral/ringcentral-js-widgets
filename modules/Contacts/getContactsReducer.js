'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getProfileImages = getProfileImages;
exports.default = getContactsReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProfileImages(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        image = _ref.image;

    var newState = void 0;
    switch (type) {
      case types.fetchImageSuccess:
        newState = (0, _extends3.default)({}, state);
        newState[image.id] = { timestamp: Date.now(), url: image.url };
        return newState;
      default:
        return state;
    }
  };
}

function getContactsReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    profileImages: getProfileImages(types)
  });
}
//# sourceMappingURL=getContactsReducer.js.map

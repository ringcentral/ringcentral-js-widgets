'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGuidesReducer = getGuidesReducer;
exports.getFirstLoginReducer = getFirstLoginReducer;
exports.getCarouselState = getCarouselState;
exports.getPreLoadImageStatus = getPreLoadImageStatus;
exports.default = getUserGuideReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getGuidesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        guides = _ref.guides;

    if (type === types.loadGuides) {
      return guides;
    }
    return state;
  };
}

function getFirstLoginReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        firstLogin = _ref2.firstLogin;

    if (type === types.updateCarousel) {
      return firstLogin;
    }
    return state;
  };
}

function getCarouselState(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      curIdx: 0,
      entered: false,
      playing: false
    };
    var _ref3 = arguments[1];
    var type = _ref3.type,
        curIdx = _ref3.curIdx,
        entered = _ref3.entered,
        playing = _ref3.playing;

    if (type === types.updateCarousel) {
      return {
        curIdx: curIdx, entered: entered, playing: playing
      };
    }
    return state;
  };
}

function getPreLoadImageStatus(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref4 = arguments[1];
    var type = _ref4.type;

    if (type === types.preLoadImageStatus) {
      return true;
    }
    return state;
  };
}

function getUserGuideReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    carouselState: getCarouselState(types),
    firstLogin: getFirstLoginReducer(types),
    preLoadImageStatus: getPreLoadImageStatus(types)
  });
}
//# sourceMappingURL=getUserGuideReducer.js.map

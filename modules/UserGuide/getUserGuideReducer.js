'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGuidesReducer = getGuidesReducer;
exports.getCarouselState = getCarouselState;
exports.default = getUserGuideReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getGuidesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        guides = _ref.guides;

    if (type === types.loadGuides) {
      return guides;
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
    var _ref2 = arguments[1];
    var type = _ref2.type,
        curIdx = _ref2.curIdx,
        entered = _ref2.entered,
        playing = _ref2.playing;

    if (type === types.updateCarousel) {
      return { curIdx: curIdx, entered: entered, playing: playing };
    }
    return state;
  };
}

function getUserGuideReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    carouselState: getCarouselState(types)
  });
}
//# sourceMappingURL=getUserGuideReducer.js.map

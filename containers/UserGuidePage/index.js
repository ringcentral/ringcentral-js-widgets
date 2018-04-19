'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _UserGuide = require('../../components/UserGuide');

var _UserGuide2 = _interopRequireDefault(_UserGuide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      userGuide = _ref$phone.userGuide;
  var _userGuide$carouselSt = userGuide.carouselState,
      curIdx = _userGuide$carouselSt.curIdx,
      entered = _userGuide$carouselSt.entered,
      playing = _userGuide$carouselSt.playing;

  return {
    showSpinner: !(userGuide.ready && locale.ready),
    currentLocale: locale.currentLocale,
    curIdx: curIdx,
    entered: entered,
    playing: playing,
    guides: userGuide.guides
  };
}

function mapToFunctions(_, _ref2) {
  var userGuide = _ref2.phone.userGuide;

  return {
    updateCarousel: function updateCarousel() {
      return userGuide.updateCarousel.apply(userGuide, arguments);
    }
  };
}

exports.default = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_UserGuide2.default));
//# sourceMappingURL=index.js.map

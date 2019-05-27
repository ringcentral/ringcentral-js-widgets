"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _phoneContext = require("../../lib/phoneContext");

var _UserGuide = _interopRequireDefault(require("../../components/UserGuide"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      userGuide = _ref$phone.userGuide;
  var _userGuide$carouselSt = userGuide.carouselState,
      curIdx = _userGuide$carouselSt.curIdx,
      entered = _userGuide$carouselSt.entered,
      playing = _userGuide$carouselSt.playing;
  return {
    showSpinner: !(userGuide.ready && userGuide.preLoadImageStatus && locale.ready),
    currentLocale: locale.currentLocale,
    curIdx: curIdx,
    entered: entered,
    playing: playing,
    firstLogin: userGuide.state.firstLogin,
    guides: userGuide.guides
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      userGuide = _ref2$phone.userGuide,
      quickAccess = _ref2$phone.quickAccess;
  return {
    updateCarousel: function updateCarousel() {
      return userGuide.updateCarousel.apply(userGuide, arguments);
    },
    quickAccessEnter: function quickAccessEnter() {
      return quickAccess && quickAccess.enter();
    }
  };
}

var _default = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_UserGuide["default"]));

exports["default"] = _default;
//# sourceMappingURL=index.js.map

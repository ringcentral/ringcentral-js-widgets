"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserGuideUI = void 0;

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var UserGuideUI = (_dec = (0, _di.Module)({
  name: 'UserGuideUI',
  deps: ['RouterInteraction', 'Locale', 'UserGuide', {
    dep: 'QuickAccess',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(UserGuideUI, _RcUIModuleV);

  var _super = _createSuper(UserGuideUI);

  function UserGuideUI(deps) {
    _classCallCheck(this, UserGuideUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(UserGuideUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps = this._deps,
          locale = _this$_deps.locale,
          userGuide = _this$_deps.userGuide;
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
        firstLogin: userGuide.firstLogin,
        guides: userGuide.guides
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this$_deps2 = this._deps,
          userGuide = _this$_deps2.userGuide,
          quickAccess = _this$_deps2.quickAccess;
      var quickAccessEnter = quickAccess ? function () {
        return quickAccess.enter();
      } : undefined;
      return {
        updateCarousel: function updateCarousel() {
          return userGuide.updateCarousel.apply(userGuide, arguments);
        },
        quickAccessEnter: quickAccessEnter
      };
    }
  }]);

  return UserGuideUI;
}(_core.RcUIModuleV2)) || _class);
exports.UserGuideUI = UserGuideUI;
//# sourceMappingURL=UserGuideUI.js.map

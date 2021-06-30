"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallBadgeUI = void 0;

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallBadgeUI = (_dec = (0, _di.Module)({
  name: 'CallBadgeUI',
  deps: ['Locale', 'Webphone', {
    dep: 'CallBadgeUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(CallBadgeUI, _RcUIModuleV);

  var _super = _createSuper(CallBadgeUI);

  function CallBadgeUI(deps) {
    _classCallCheck(this, CallBadgeUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(CallBadgeUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var hidden = _ref.hidden,
          _ref$defaultOffsetX = _ref.defaultOffsetX,
          defaultOffsetX = _ref$defaultOffsetX === void 0 ? 0 : _ref$defaultOffsetX,
          _ref$defaultOffsetY = _ref.defaultOffsetY,
          defaultOffsetY = _ref$defaultOffsetY === void 0 ? 0 : _ref$defaultOffsetY;
      var currentSession = this._deps.webphone.activeSession || this._deps.webphone.ringSession || {};
      return {
        hidden: hidden,
        defaultOffsetX: defaultOffsetX,
        defaultOffsetY: defaultOffsetY,
        session: currentSession,
        currentLocale: this._deps.locale.currentLocale
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;

      var goToCallCtrl = _ref2.goToCallCtrl;
      return {
        goToCallCtrl: goToCallCtrl,
        toggleMinimized: function toggleMinimized(id) {
          return _this._deps.webphone.toggleMinimized(id);
        }
      };
    }
  }]);

  return CallBadgeUI;
}(_core.RcUIModuleV2)) || _class);
exports.CallBadgeUI = CallBadgeUI;
//# sourceMappingURL=CallBadgeUI.js.map

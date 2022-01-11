"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlipUI = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.replace");

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");

var _core = require("@ringcentral-integration/core");

var _dec, _dec2, _class, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var FlipUI = (_dec = (0, _di.Module)({
  name: 'FlipUI',
  deps: ['Locale', 'Webphone', 'ForwardingNumber', 'RegionSettings', 'RouterInteraction', {
    dep: 'FlipUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.sessionId, that._deps.webphone.sessions];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(FlipUI, _RcUIModuleV);

  var _super = _createSuper(FlipUI);

  function FlipUI(deps) {
    var _this;

    _classCallCheck(this, FlipUI);

    _this = _super.call(this, {
      deps: deps
    });
    _this.sessionId = null;
    return _this;
  }

  _createClass(FlipUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$session;

      var sessionId = _ref.params.sessionId;
      this.sessionId = sessionId;
      return {
        sessionId: sessionId,
        isOnFlip: (_this$session = this.session) === null || _this$session === void 0 ? void 0 : _this$session.isOnFlip,
        currentLocale: this._deps.locale.currentLocale,
        flipNumbers: this._deps.forwardingNumber.flipNumbers,
        session: this.session
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        onFlip: function onFlip() {
          var _this2$_deps$webphone;

          return (_this2$_deps$webphone = _this2._deps.webphone).flip.apply(_this2$_deps$webphone, arguments);
        },
        onComplete: function onComplete() {
          var _this2$_deps$webphone2;

          return (_this2$_deps$webphone2 = _this2._deps.webphone).hangup.apply(_this2$_deps$webphone2, arguments);
        },
        onBack: function onBack() {
          return _this2._deps.routerInteraction.goBack();
        },
        onCallEnd: function onCallEnd() {
          return _this2._deps.routerInteraction.replace('/dialer');
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._deps.regionSettings.areaCode,
            countryCode: _this2._deps.regionSettings.countryCode
          });
        }
      };
    }
  }, {
    key: "session",
    get: function get() {
      var _this3 = this;

      return this.sessionId && this._deps.webphone.sessions.find(function (s) {
        return s.id === _this3.sessionId;
      });
    }
  }]);

  return FlipUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "session", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "session"), _class2.prototype)), _class2)) || _class);
exports.FlipUI = FlipUI;
//# sourceMappingURL=FlipUI.js.map

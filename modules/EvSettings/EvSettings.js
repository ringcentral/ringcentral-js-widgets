"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSettings = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvSettings = (_dec = (0, _di.Module)({
  name: 'EvSettings',
  deps: ['EvClient', 'EvAuth', 'EvSessionConfig', 'Storage', {
    dep: 'EvSettingsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvSettings, _RcModuleV);

  var _super = _createSuper(EvSettings);

  function EvSettings(_ref) {
    var _this;

    var evClient = _ref.evClient,
        evAuth = _ref.evAuth,
        evSessionConfig = _ref.evSessionConfig,
        storage = _ref.storage,
        _ref$enableCache = _ref.enableCache,
        enableCache = _ref$enableCache === void 0 ? true : _ref$enableCache;

    _classCallCheck(this, EvSettings);

    _this = _super.call(this, {
      modules: {
        evClient: evClient,
        evAuth: evAuth,
        evSessionConfig: evSessionConfig,
        storage: storage
      },
      enableCache: enableCache,
      storageKey: 'EvSettings'
    });

    _initializerDefineProperty(_this, "isOffhook", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isManualOffhook", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isOffhooking", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "config", _descriptor4, _assertThisInitialized(_this));

    _this.getOffhookState = (0, _core.createSelector)(function () {
      return _this.isOffhooking;
    }, function () {
      return _this.isOffhook;
    }, function (isOffhooking, isOffhook) {
      if (isOffhooking) {
        return isOffhook ? 'disconnecting' : 'connecting';
      }

      return isOffhook ? 'connected' : 'disconnected';
    });
    return _this;
  }

  _createClass(EvSettings, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.state.config = config;
    }
  }, {
    key: "setIsManualOffhook",
    value: function setIsManualOffhook(isManualOffhook) {
      this.state.isManualOffhook = isManualOffhook;
    }
  }, {
    key: "setOffhook",
    value: function setOffhook(status) {
      this.state.isOffhook = status;
    }
  }, {
    key: "setOffhooking",
    value: function setOffhooking(offhooking) {
      this.state.isOffhooking = offhooking;
    }
  }, {
    key: "offhookInitHandle",
    value: function offhookInitHandle() {
      this.state.isOffhooking = false;
      this.state.isOffhook = true;
    }
  }, {
    key: "offhookTermHandle",
    value: function offhookTermHandle() {
      this.state.isOffhooking = false;
      this.state.isOffhook = false;
      this.state.isManualOffhook = false;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (this._modules.evAuth.isFreshLogin || this._modules.evSessionConfig.tabManagerEnabled && !this._modules.evSessionConfig.isConfigSuccessByLocal) {
        this.offhookTermHandle();
      }
    }
  }, {
    key: "offHook",
    value: function offHook() {
      this.setOffhooking(true);

      if (this.state.isOffhook) {
        this.setIsManualOffhook(false);

        this._modules.evClient.offhookTerm();
      } else {
        this.setIsManualOffhook(true);

        this._modules.evClient.offhookInit();
      }
    }
  }, {
    key: "loginType",
    get: function get() {
      return this._modules.evSessionConfig.loginType;
    }
  }]);

  return EvSettings;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isOffhook", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isManualOffhook", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isOffhooking", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "config", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsManualOffhook", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsManualOffhook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhook", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOffhooking", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOffhooking"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "offhookInitHandle", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "offhookInitHandle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "offhookTermHandle", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "offhookTermHandle"), _class2.prototype)), _class2)) || _class);
exports.EvSettings = EvSettings;
//# sourceMappingURL=EvSettings.js.map

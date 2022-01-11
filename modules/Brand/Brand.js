"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

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
exports.Brand = void 0;

require("core-js/modules/es6.function.name");

var _core = require("@ringcentral-integration/core");

var _i18n = require("@ringcentral-integration/i18n");

var _camelCase = require("../../lib/camelCase");

var _di = require("../../lib/di");

var _processI18n = require("../../lib/processI18n");

var _helpers = require("./helpers");

var _dec, _dec2, _dec3, _class, _class2, _descriptor;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Brand = (_dec = (0, _di.Module)({
  name: 'Brand',
  deps: ['BrandConfig', 'Locale', {
    dep: 'Prefix',
    optional: true
  }, {
    dep: 'BrandConfigOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.brandConfig];
}), _dec3 = (0, _core.computed)(function (_ref) {
  var dynamicConfig = _ref.dynamicConfig,
      locale = _ref._deps.locale;
  return [dynamicConfig, locale === null || locale === void 0 ? void 0 : locale.currentLocale, locale === null || locale === void 0 ? void 0 : locale.defaultLocale];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Brand, _RcModuleV);

  var _super = _createSuper(Brand);

  function Brand(deps) {
    var _this$_deps$brandConf;

    var _this;

    _classCallCheck(this, Brand);

    _this = _super.call(this, {
      deps: deps
    });
    _this._prefix = null;

    _initializerDefineProperty(_this, "dynamicConfig", _descriptor, _assertThisInitialized(_this));

    _this._prefix = "".concat(_this._deps.brandConfig.code, "-").concat((0, _camelCase.camelCase)((_this$_deps$brandConf = _this._deps.brandConfig.application) !== null && _this$_deps$brandConf !== void 0 ? _this$_deps$brandConf : ''));
    return _this;
  }

  _createClass(Brand, [{
    key: "setDynamicConfig",
    value: function setDynamicConfig(config) {
      this.dynamicConfig = config;
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      var _this$_deps$brandConf2;

      var brandConfig = this._deps.brandConfig;
      if (!(brandConfig === null || brandConfig === void 0 ? void 0 : brandConfig.assets)) return brandConfig;
      /**
       * use current window location.origin as origin
       * to avoid app inject into others page meet resource path issue
       * like chrome extension content page
       */

      return _objectSpread(_objectSpread({}, brandConfig), {}, {
        assets: (0, _helpers.processAssets)(brandConfig.assets, ((_this$_deps$brandConf2 = this._deps.brandConfigOptions) === null || _this$_deps$brandConf2 === void 0 ? void 0 : _this$_deps$brandConf2.assetOrigin) || window.location.origin)
      });
    }
  }, {
    key: "brandConfig",
    get: function get() {
      var _this$dynamicConfig, _this$_deps$locale$cu, _this$_deps$locale, _this$_deps$locale$de, _this$_deps$locale2;

      return (0, _processI18n.processI18n)((_this$dynamicConfig = this.dynamicConfig) !== null && _this$dynamicConfig !== void 0 ? _this$dynamicConfig : this.defaultConfig, (_this$_deps$locale$cu = (_this$_deps$locale = this._deps.locale) === null || _this$_deps$locale === void 0 ? void 0 : _this$_deps$locale.currentLocale) !== null && _this$_deps$locale$cu !== void 0 ? _this$_deps$locale$cu : _i18n.DEFAULT_LOCALE, (_this$_deps$locale$de = (_this$_deps$locale2 = this._deps.locale) === null || _this$_deps$locale2 === void 0 ? void 0 : _this$_deps$locale2.defaultLocale) !== null && _this$_deps$locale$de !== void 0 ? _this$_deps$locale$de : _i18n.DEFAULT_LOCALE);
    }
  }, {
    key: "prefix",
    get: function get() {
      var _this$_deps$prefix;

      return (_this$_deps$prefix = this._deps.prefix) !== null && _this$_deps$prefix !== void 0 ? _this$_deps$prefix : this._prefix;
    }
  }, {
    key: "id",
    get: function get() {
      return this.brandConfig.id;
    }
  }, {
    key: "code",
    get: function get() {
      return this.brandConfig.code;
    }
  }, {
    key: "name",
    get: function get() {
      return this.brandConfig.name;
    }
  }, {
    key: "shortName",
    get: function get() {
      var _this$brandConfig$sho;

      return (_this$brandConfig$sho = this.brandConfig.shortName) !== null && _this$brandConfig$sho !== void 0 ? _this$brandConfig$sho : this.brandConfig.name;
    }
  }, {
    key: "appName",
    get: function get() {
      return this.brandConfig.appName;
    }
  }, {
    key: "shortAppName",
    get: function get() {
      return this.brandConfig.shortAppName;
    }
  }, {
    key: "rcvProductName",
    get: function get() {
      return this.brandConfig.rcvProductName;
    }
  }, {
    key: "rcvE2EESupportUrl",
    get: function get() {
      return this.brandConfig.rcvE2EESupportUrl;
    }
  }, {
    key: "application",
    get: function get() {
      return this.brandConfig.application;
    }
  }, {
    key: "rcvTeleconference",
    get: function get() {
      return this.brandConfig.rcvTeleconference;
    }
  }, {
    key: "assets",
    get: function get() {
      return this.brandConfig.assets;
    }
  }]);

  return Brand;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dynamicConfig", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setDynamicConfig", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDynamicConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultConfig", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "brandConfig", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "brandConfig"), _class2.prototype)), _class2)) || _class);
exports.Brand = Brand;
//# sourceMappingURL=Brand.js.map

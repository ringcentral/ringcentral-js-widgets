"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theme = void 0;
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _defaultCssVariable = require("./defaultCssVariable");
var _dec, _dec2, _class, _class2, _descriptor;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var Theme = (_dec = (0, _di.Module)({
  name: 'Theme',
  deps: ['Brand', {
    dep: 'ThemeOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  var _that$_deps$brand$bra;
  return [(_that$_deps$brand$bra = that._deps.brand.brandConfig.theme) === null || _that$_deps$brand$bra === void 0 ? void 0 : _that$_deps$brand$bra.variable];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Theme, _RcModuleV);
  var _super = _createSuper(Theme);
  function Theme(deps) {
    var _this;
    _classCallCheck(this, Theme);
    _this = _super.call(this, {
      deps: deps,
      enableGlobalCache: true,
      storageKey: 'Theme'
    });
    _initializerDefineProperty(_this, "themeType", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(Theme, [{
    key: "setThemeType",
    value: function setThemeType(type) {
      this.themeType = type;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this$_deps$brand$bra,
        _this2 = this;
      var defaultThemeType = (_this$_deps$brand$bra = this._deps.brand.brandConfig.theme) === null || _this$_deps$brand$bra === void 0 ? void 0 : _this$_deps$brand$bra.defaultTheme;
      if (defaultThemeType) {
        this.setThemeType(defaultThemeType);
      }
      (0, _core.watch)(this, function () {
        return _this2._deps.brand.brandConfig.theme;
      }, function (newValue) {
        var newDefaultThemeType = newValue === null || newValue === void 0 ? void 0 : newValue.defaultTheme;
        if (newDefaultThemeType && newDefaultThemeType !== _this2.themeType) {
          _this2.setThemeType(newValue.defaultTheme);
        }
      });
    }
  }, {
    key: "theme",
    get: function get() {
      var _this$_deps$brand$bra2, _this$_deps$brand$bra3;
      var curr = (_this$_deps$brand$bra2 = this._deps.brand.brandConfig.theme) === null || _this$_deps$brand$bra2 === void 0 ? void 0 : (_this$_deps$brand$bra3 = _this$_deps$brand$bra2.themeMap) === null || _this$_deps$brand$bra3 === void 0 ? void 0 : _this$_deps$brand$bra3[this.themeType];
      return curr;
    }
  }, {
    key: "variable",
    get: function get() {
      var _this$_deps$brand$bra4;
      return _objectSpread(_objectSpread({}, _defaultCssVariable.defaultCssVariable), (_this$_deps$brand$bra4 = this._deps.brand.brandConfig.theme) === null || _this$_deps$brand$bra4 === void 0 ? void 0 : _this$_deps$brand$bra4.variable);
    }
  }]);
  return Theme;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "themeType", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setThemeType", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setThemeType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "variable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "variable"), _class2.prototype)), _class2)) || _class);
exports.Theme = Theme;
//# sourceMappingURL=Theme.js.map

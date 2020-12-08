"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brand = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

var _core = require("@ringcentral-integration/core");

var _brandHelper = require("./brandHelper");

var _di = require("../../lib/di");

var _dec, _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Brand = (_dec = (0, _di.Module)({
  name: 'Brand',
  deps: ['BrandConfig', {
    dep: 'Prefix',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Brand, _RcModuleV);

  var _super = _createSuper(Brand);

  function Brand(deps) {
    var _this;

    _classCallCheck(this, Brand);

    _this = _super.call(this, {
      deps: deps
    });
    _this._prefix = null;
    _this._prefix = "".concat(_this._deps.brandConfig.brandCode, "-").concat((0, _brandHelper.camelcase)(_this._deps.brandConfig.application));
    return _this;
  }

  _createClass(Brand, [{
    key: "prefix",
    get: function get() {
      var _this$_deps$prefix;

      return (_this$_deps$prefix = this._deps.prefix) !== null && _this$_deps$prefix !== void 0 ? _this$_deps$prefix : this._prefix;
    }
  }, {
    key: "id",
    get: function get() {
      return this._deps.brandConfig.id;
    }
  }, {
    key: "code",
    get: function get() {
      return this._deps.brandConfig.code;
    }
  }, {
    key: "name",
    get: function get() {
      return this._deps.brandConfig.name;
    }
  }, {
    key: "fullName",
    get: function get() {
      var _this$_deps$brandConf;

      return (_this$_deps$brandConf = this._deps.brandConfig.fullName) !== null && _this$_deps$brandConf !== void 0 ? _this$_deps$brandConf : this._deps.brandConfig.name;
    }
  }, {
    key: "shortName",
    get: function get() {
      var _this$_deps$brandConf2;

      return (_this$_deps$brandConf2 = this._deps.brandConfig.shortName) !== null && _this$_deps$brandConf2 !== void 0 ? _this$_deps$brandConf2 : this._deps.brandConfig.name;
    }
  }, {
    key: "application",
    get: function get() {
      return this._deps.brandConfig.application;
    }
  }, {
    key: "appName",
    get: function get() {
      return this._deps.brandConfig.appName;
    }
  }, {
    key: "brandConfig",
    get: function get() {
      return this._deps.brandConfig;
    }
  }]);

  return Brand;
}(_core.RcModuleV2), _temp)) || _class);
exports.Brand = Brand;
//# sourceMappingURL=Brand.js.map
